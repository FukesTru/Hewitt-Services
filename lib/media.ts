import fs from "node:fs";
import path from "node:path";

/**
 * Every art-directed image on the site, resolved in three tiers.
 *
 *   1. A file in public/  (self-hosted). Always preferred.
 *   2. The signed Artlist CDN URL from image-manifest.json (interim), so the
 *      photography shows on a deploy before the files are committed.
 *   3. Neither, so a deep-green gradient panel. Nothing 404s.
 *
 * Tier 1 wins automatically, so `npm run fetch:images` + commit silently
 * upgrades the site from CDN to self-hosted with no code change.
 *
 * Tier 2 is deliberately a stopgap, not the destination: it makes the site
 * depend on a third-party CDN and on signed URLs that, while dated to 2036,
 * are outside the firm's control. See PRELAUNCH.md.
 */
export type Media = {
  src: string;
  alt: string;
  available: boolean;
  /** True when serving from the Artlist CDN rather than public/. */
  remote: boolean;
};

const PUBLIC_DIR = path.join(process.cwd(), "public");

/** Public-relative path ("/images/…") → signed CDN URL. */
const remoteSources: Map<string, string> = (() => {
  const map = new Map<string, string>();
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), "image-manifest.json"), "utf8");
    const manifest = JSON.parse(raw) as {
      images?: { path?: string; sourceUrl?: string }[];
    };
    for (const image of manifest.images ?? []) {
      if (!image.path || !image.sourceUrl) continue;
      // Manifest paths are repo-relative ("public/images/…"); strip the prefix.
      const publicPath = image.path.replace(/^public\//, "/");
      map.set(publicPath, image.sourceUrl);
    }
  } catch {
    // No manifest, or unreadable, so every image simply falls to the gradient.
  }
  return map;
})();

function localExists(src: string): boolean {
  try {
    return fs.statSync(path.join(PUBLIC_DIR, src)).size > 0;
  } catch {
    return false;
  }
}

export function media(src: string, alt: string): Media {
  if (localExists(src)) {
    return { src, alt, available: true, remote: false };
  }

  const remote = remoteSources.get(src);
  if (remote) {
    return { src: remote, alt, available: true, remote: true };
  }

  return { src, alt, available: false, remote: false };
}

/** Absolute URL for Open Graph / Twitter cards, which cannot use a relative path. */
export function absoluteMediaUrl(src: string, siteUrl: string): string {
  const resolved = media(src, "");
  return resolved.remote ? resolved.src : `${siteUrl}${src}`;
}

export const IMAGES = {
  homeHero: () =>
    media(
      "/images/hero/home-hero.jpg",
      "The downtown Dallas skyline at blue hour, seen across open ground"
    ),
  dallasHero: () =>
    media(
      "/images/hero/dallas-hero.jpg",
      "A Dallas office district in late afternoon light, with stone and glass facades"
    ),
  fortWorthHero: () =>
    media(
      "/images/hero/fort-worth-hero.jpg",
      "The Fort Worth skyline at dusk under a wide Texas sky"
    ),
  remoteHero: () =>
    media(
      "/images/hero/remote-hero.jpg",
      "A laptop, a stack of folders and a cup of coffee on an oak table by a window looking out over open Texas country at dusk"
    ),
  aboutOffice: () =>
    media(
      "/images/hero/about-office.jpg",
      "A small accounting office with an oak desk, a desk lamp and neatly stacked folders"
    ),
  faq: () =>
    media(
      "/images/hero/faq.jpg",
      "A deep navy fluted stone wall crossed by a single band of warm gold light"
    ),
  contact: () =>
    media(
      "/images/hero/contact.jpg",
      "A small office waiting area with two leather chairs and a brass floor lamp"
    ),
  ogDefault: () =>
    media(
      "/images/og/og-default.jpg",
      "Hewitt Services: tax and accounting services in Dallas, Texas"
    ),
} as const;

