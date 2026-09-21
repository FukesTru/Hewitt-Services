/**
 * One command to get the site photography self-hosted:
 *
 *     npm run images
 *
 * Downloads all 23 images from image-manifest.json into public/images,
 * stages them, commits and pushes. A hosted build only has what is in the
 * repo, so the commit is the step that actually makes them appear.
 *
 * Safe to re-run: files already present are skipped, and it does nothing if
 * there is nothing new to commit.
 */
import { execFileSync } from "node:child_process";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const run = (cmd, args) =>
  execFileSync(cmd, args, { stdio: "pipe", encoding: "utf8" }).trim();

const manifest = JSON.parse(
  await readFile(new URL("../image-manifest.json", import.meta.url), "utf8")
);

const exists = async (p) => {
  try {
    return (await stat(p)).size > 0;
  } catch {
    return false;
  }
};

console.log(`Fetching ${manifest.images.length} images…\n`);

let got = 0;
let skipped = 0;
const failed = [];

for (const image of manifest.images) {
  if (await exists(image.path)) {
    skipped++;
    continue;
  }
  try {
    const res = await fetch(image.sourceUrl);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const bytes = Buffer.from(await res.arrayBuffer());
    if (bytes.length < 1024) throw new Error(`only ${bytes.length} bytes`);
    if (bytes[0] !== 0xff || bytes[1] !== 0xd8) throw new Error("not a JPEG");

    await mkdir(dirname(image.path), { recursive: true });
    await writeFile(image.path, bytes);
    console.log(`  ✓ ${image.path} (${Math.round(bytes.length / 1024)} KB)`);
    got++;
  } catch (err) {
    console.error(`  ✗ ${image.path} — ${err.message}`);
    failed.push(image);
  }
}

console.log(`\nDownloaded ${got}, already had ${skipped}, failed ${failed.length}.`);

if (failed.length === manifest.images.length) {
  console.error(`
Every download failed, which means this machine cannot reach Artlist's CDN
either. Nothing was committed. Two options:

  1. Download the images from the Artlist library in your browser and drop
     them in at the paths listed in image-manifest.json.
  2. Tell Claude the downloads all failed — there is a fallback that embeds
     the images without any network access.
`);
  process.exit(1);
}

if (failed.length) {
  console.log("\nStill missing (re-download these from the Artlist library):");
  for (const f of failed) console.log(`  ${f.generationId}  ->  ${f.path}`);
}

if (got === 0) {
  console.log("\nNothing new to commit.");
  process.exit(0);
}

console.log("\nCommitting and pushing…");
try {
  run("git", ["add", "public/images"]);
  const staged = run("git", ["diff", "--cached", "--name-only"]);
  if (!staged) {
    console.log("Nothing staged — already committed.");
    process.exit(0);
  }
  run("git", ["commit", "-m", "Self-host site photography"]);
  const branch = run("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
  run("git", ["push", "origin", branch]);
  console.log(`\n✓ Pushed to ${branch}. The next deploy will serve the images from your own repo.`);
} catch (err) {
  console.error(`\nDownloaded fine, but git failed: ${err.message}`);
  console.error("Commit and push manually:\n  git add public/images && git commit -m 'Self-host site photography' && git push");
  process.exit(1);
}
