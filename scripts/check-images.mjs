/**
 * Runs before every build (npm `prebuild`) and reports where the site's
 * photography is coming from, so the state is visible in the deploy log.
 *
 * Never fails the build: serving from the Artlist CDN is a working interim
 * state, and the gradient fallback is a designed one.
 */
import { readFile, stat } from "node:fs/promises";

const manifest = JSON.parse(
  await readFile(new URL("../image-manifest.json", import.meta.url), "utf8")
);

const local = [];
const remote = [];
const absent = [];

for (const image of manifest.images) {
  let hasLocal = false;
  try {
    hasLocal = (await stat(image.path)).size > 0;
  } catch {
    /* not local */
  }

  if (hasLocal) local.push(image.path);
  else if (image.sourceUrl) remote.push(image.path);
  else absent.push(image.path);
}

const total = manifest.images.length;
const line = "─".repeat(70);

if (local.length === total) {
  console.log(`✓ images: all ${total} served from public/ (self-hosted)`);
} else {
  console.log(`\n${line}`);
  console.log(`  images: ${local.length}/${total} self-hosted, ${remote.length} from the Artlist CDN`);
  if (absent.length) console.log(`          ${absent.length} missing entirely (gradient fallback)`);
  console.log(line);
  if (remote.length) {
    console.log("  The CDN-served images work, but they leave the site depending");
    console.log("  on a third-party host and on signed URLs outside the firm's");
    console.log("  control. To self-host them instead:\n");
    console.log("      npm run fetch:images");
    console.log("      git add public/images");
    console.log('      git commit -m "Self-host site photography"');
    console.log("      git push\n");
    console.log("  A local file always wins, so that switch needs no code change.");
  }
  console.log(`${line}\n`);
}
