/**
 * Downloads the site's photography from image-manifest.json into public/images.
 *
 * The images live in the firm's Artlist library. The session that built this
 * site could not fetch them (Artlist's CDN hosts are outside its network
 * egress allow-list), so run this once from a machine with normal internet
 * access:
 *
 *   npm run fetch:images
 *
 * Already-present files are skipped; pass --force to re-download everything.
 * If a signed URL has expired the download 403s — re-download that image from
 * the Artlist library using its generationId, or regenerate it from the prompt
 * recorded in the manifest.
 */
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const force = process.argv.includes("--force");
const manifest = JSON.parse(await readFile(new URL("../image-manifest.json", import.meta.url), "utf8"));

const exists = async (p) => {
  try {
    return (await stat(p)).size > 0;
  } catch {
    return false;
  }
};

let downloaded = 0;
let skipped = 0;
const failures = [];

for (const image of manifest.images) {
  if (!force && (await exists(image.path))) {
    skipped++;
    continue;
  }

  try {
    const res = await fetch(image.sourceUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const bytes = Buffer.from(await res.arrayBuffer());
    if (bytes.length < 1024) throw new Error(`suspiciously small (${bytes.length} bytes)`);

    await mkdir(dirname(image.path), { recursive: true });
    await writeFile(image.path, bytes);
    console.log(`  ✓ ${image.path} (${(bytes.length / 1024).toFixed(0)} KB)`);
    downloaded++;
  } catch (err) {
    console.error(`  ✗ ${image.path} — ${err.message}`);
    failures.push({ path: image.path, generationId: image.generationId, reason: err.message });
  }
}

console.log(`\nDownloaded ${downloaded}, skipped ${skipped}, failed ${failures.length}.`);

if (downloaded > 0) {
  console.log("\nNow commit them — a hosted build (Vercel and friends) only has");
  console.log("what is in the repo, so downloading locally is not enough:\n");
  console.log("    git add public/images");
  console.log('    git commit -m "Add site photography"');
  console.log("    git push");
}

if (failures.length) {
  console.log("\nRe-download these from the Artlist library by generation ID,");
  console.log("or regenerate them from the prompts in image-manifest.json:");
  for (const f of failures) console.log(`  ${f.generationId}  ->  ${f.path}`);
  process.exitCode = 1;
}
