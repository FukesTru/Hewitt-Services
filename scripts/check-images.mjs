/**
 * Runs before every build (npm `prebuild`), so a deploy that is missing its
 * photography says so loudly in the build log instead of quietly shipping
 * gradient panels.
 *
 * Deliberately does NOT fail the build: the gradient fallback is a designed
 * state, and the site should still deploy while the client's assets are
 * being finalised.
 */
import { readFile, stat } from "node:fs/promises";

const manifest = JSON.parse(
  await readFile(new URL("../image-manifest.json", import.meta.url), "utf8")
);

const missing = [];
for (const image of manifest.images) {
  try {
    if ((await stat(image.path)).size > 0) continue;
  } catch {
    /* falls through to missing */
  }
  missing.push(image.path);
}

const total = manifest.images.length;

if (missing.length === 0) {
  console.log(`✓ images: all ${total} present`);
} else {
  const line = "─".repeat(68);
  console.warn(`\n${line}`);
  console.warn(`  ⚠  ${missing.length} of ${total} images are missing from public/images/`);
  console.warn(`${line}`);
  console.warn("  Those slots will render the navy/gold gradient fallback.");
  console.warn("  The site builds and deploys fine — it just looks unfinished.\n");
  console.warn("  To fix, from a machine with normal internet access:\n");
  console.warn("      npm run fetch:images");
  console.warn("      git add public/images");
  console.warn('      git commit -m "Add site photography"');
  console.warn("      git push\n");
  console.warn("  The last three matter: downloading locally is not enough.");
  console.warn("  A hosted build only has what is committed to the repo.");
  if (missing.length <= 6) {
    console.warn(`\n  Missing: ${missing.join(", ")}`);
  }
  console.warn(`${line}\n`);
}
