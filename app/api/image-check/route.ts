import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Diagnostic: can THIS server reach the Artlist CDN?
 *
 * Visit /api/image-check on the deployed site. It reports, for a sample of
 * the manifest images, whether the file is self-hosted, and if not whether a
 * server-side fetch of the CDN URL succeeds.
 *
 * This exists because the build environment cannot reach Artlist at all, so
 * whether a hosted deploy can was unknowable from there. Delete this route
 * once the images are self-hosted.
 *
 * Signatures are redacted so the response does not hand out signed URLs.
 */
type Manifest = { images: { path: string; sourceUrl: string; generationId: string }[] };

function redact(url: string): string {
  try {
    const u = new URL(url);
    if (u.searchParams.has("Signature")) u.searchParams.set("Signature", "…redacted…");
    return u.toString();
  } catch {
    return "unparseable";
  }
}

export async function GET() {
  let manifest: Manifest;
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), "image-manifest.json"), "utf8");
    manifest = JSON.parse(raw) as Manifest;
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: `Could not read image-manifest.json: ${String(err)}` },
      { status: 500 }
    );
  }

  const publicDir = path.join(process.cwd(), "public");
  const selfHosted = manifest.images.filter((i) => {
    try {
      return fs.statSync(path.join(publicDir, i.path.replace(/^public\//, ""))).size > 0;
    } catch {
      return false;
    }
  });

  // Probe a small sample rather than all 23, to keep the response quick.
  const sample = manifest.images.slice(0, 3);
  const probes = await Promise.all(
    sample.map(async (image) => {
      const started = Date.now();
      try {
        const res = await fetch(image.sourceUrl, { method: "GET", cache: "no-store" });
        const buf = res.ok ? Buffer.from(await res.arrayBuffer()) : null;
        return {
          path: image.path,
          status: res.status,
          ok: res.ok,
          bytes: buf?.length ?? 0,
          looksLikeJpeg: buf ? buf[0] === 0xff && buf[1] === 0xd8 : false,
          ms: Date.now() - started,
          url: redact(image.sourceUrl),
        };
      } catch (err) {
        return {
          path: image.path,
          status: null,
          ok: false,
          error: err instanceof Error ? err.message : String(err),
          ms: Date.now() - started,
          url: redact(image.sourceUrl),
        };
      }
    })
  );

  const reachable = probes.filter((p) => p.ok).length;

  return NextResponse.json({
    totalImages: manifest.images.length,
    selfHosted: selfHosted.length,
    servedFromCdn: manifest.images.length - selfHosted.length,
    cdnReachableFromThisServer: reachable === probes.length,
    probes,
    verdict:
      selfHosted.length === manifest.images.length
        ? "All images are self-hosted. This route can be deleted."
        : reachable === probes.length
          ? "This server CAN reach Artlist. If images still do not show, the problem is the browser or a stale deploy."
          : "This server CANNOT reach Artlist. Hotlinking will never work here — run `npm run images` to self-host.",
  });
}
