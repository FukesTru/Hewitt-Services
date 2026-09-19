import fs from "node:fs";
import path from "node:path";

/**
 * Every art-directed image on the site.
 *
 * The photography was generated with Artlist (Seedream 5.0) and lives in the
 * firm's Artlist library — see `image-manifest.json` in the project root for
 * the generation IDs and the exact prompts. The build session could not write
 * the binaries into the repo because Artlist's CDN hosts are outside its
 * egress allow-list, so `npm run fetch:images` (or a manual download) drops
 * them in at the paths below.
 *
 * Until a file is present, `media()` reports `available: false` and the
 * component renders a navy/gold gradient panel instead. Nothing 404s, and the
 * real photograph appears on the next build once the file exists.
 */
export type Media = {
  src: string;
  alt: string;
  available: boolean;
};

const PUBLIC_DIR = path.join(process.cwd(), "public");

function exists(src: string): boolean {
  try {
    return fs.existsSync(path.join(PUBLIC_DIR, src));
  } catch {
    return false;
  }
}

export function media(src: string, alt: string): Media {
  return { src, alt, available: exists(src) };
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
  aboutOffice: () =>
    media(
      "/images/hero/about-office.jpg",
      "A small accounting office with an oak desk, a desk lamp and neatly stacked folders"
    ),
  taxCenter: () =>
    media(
      "/images/hero/tax-center.jpg",
      "A desk calendar, a closed laptop and a brass desk clock arranged on a dark desk"
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
  reviews: () =>
    media(
      "/images/hero/reviews.jpg",
      "Two chairs angled toward each other across a low table after a conversation"
    ),
  blog: () =>
    media(
      "/images/hero/blog.jpg",
      "An open notebook, a fountain pen and a cup of coffee on a writing desk"
    ),
  ogDefault: () =>
    media(
      "/images/og/og-default.jpg",
      "Hewitt Services — tax and accounting services in Dallas, Texas"
    ),
} as const;

/** Blog post cover images, keyed by post slug. */
export function postImage(slug: string, alt: string): Media {
  return media(`/images/blog/${slug}.jpg`, alt);
}
