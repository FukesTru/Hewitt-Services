# Hewitt Services

Marketing website for **Hewitt Services**, a Dallas, Texas tax and accounting
firm led by Demarcus Hewitt, EA.

Next.js 15 (App Router) · TypeScript · Tailwind CSS · statically generated.

> **Before launch:** read [`PRELAUNCH.md`](./PRELAUNCH.md). It lists every
> asset and fact the firm still has to supply, and where each one plugs in.

---

## Getting started

```bash
npm install
npm run fetch:images   # pulls the site photography into public/images
npm run dev            # http://localhost:3000
```

The photography currently streams from the firm's Artlist CDN, so the site
looks complete without anything in `public/images/`. To self-host it instead
— which is where this should end up — run `fetch:images` and commit the
result:

```bash
npm run images
```

That fetches, verifies, commits and pushes in one step. If the deployed site
still shows no photography, visit `/api/image-check` on it — that route says
whether the server can reach Artlist and what to do about it.

A local file always wins over the CDN, so that needs no code change. Every
build prints which tier each image is on (`scripts/check-images.mjs`).

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (33 routes, all prerendered) |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (flat config, `eslint.config.mjs`) |
| `npm run images` | Fetch the photography, then commit and push it (the one you want) |
| `npm run fetch:images` | Fetch only, no git |
| `npm run prebuild` | Report how many images are missing (runs automatically before `build`) |
| `npm run qa` | SEO / schema / redirect / accessibility sweep against a running build |

The QA sweeps expect a production build to be running:

```bash
npm run build && npm start &
npm run qa -- http://127.0.0.1:3000
# Layout sweep (optional — Playwright is not a project dependency)
npm i -D playwright && npx playwright install chromium
node scripts/responsive-check.mjs http://127.0.0.1:3000
```

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `CONTACT_WEBHOOK_URL` | Yes, in production | Where `/api/contact` posts submissions so they reach info@hewittservices.net. Unset, the route validates and logs but does not deliver. |
| `CRM_WEBHOOK_URL` | Optional | Commented slot in `app/api/contact/route.ts`. |

## Structure

```
app/
  layout.tsx              Root shell: fonts, header, footer, consent, chat-widget slot
  page.tsx                Home
  about/ services/ ...    One directory per page
  services/[slug]/        The 7 service pages, from lib/services.ts
  api/contact/route.ts    Form endpoint
  sitemap.ts robots.ts    sitemap.xml and robots.txt
components/               Header, Footer, PageHero, ServiceCard, ProcessTimeline,
                          FAQAccordion, CTABand, TrustStrip, ContactForm,
                          CalendlyEmbed, MapEmbed, RelatedLinks, …
lib/
  site.ts                 NAP, links, nav (single source of truth)
  services.ts             All 7 service pages' content
  faqs.ts                 Site-wide FAQ, grouped by topic
  routes.ts               Route registry driving both sitemaps
  schema.ts seo.ts        JSON-LD builders and per-page metadata
  media.ts                Image manifest + graceful fallback
```

**Content lives in `lib/`, not in JSX.** Editing a service page or an FAQ
means editing `lib/services.ts` or `lib/faqs.ts`.

## Design system

Green and white. `forest`, `forest-light`, `moss` and `moss-dark` are the four
greens of the logo mark, sampled from the file the client supplied;
`forest-dark` and `moss-light` are tints of them added where contrast needed
another step.

| Token | Value | Use |
|---|---|---|
| `forest` | `#1C4C23` | Primary dark — hero, header, footer, dark bands |
| `forest-dark` | `#13351A` | Utility bar, deepest bands, gradient base |
| `forest-light` | `#2E9C5A` | Mid green, gradients and hover fills |
| `moss` | `#86BF87` | Accents and buttons **on dark only** |
| `moss-dark` | `#14793A` | Green **text, links and rules on light** (contrast) |
| `moss-light` | `#BEDCBF` | Lightest accent — hover states on dark |
| `mist` | `#F2F6F0` | Alternating light sections |
| `ink` | `#37413A` | Body text on light |
| `chalk` | `#E3EAE2` | Body text on dark |

Playfair Display for headings, Inter for body and UI.

`moss` fails contrast as text on white — use `moss-dark` there.

`.btn-primary` reads its ground: dark green with white text by default, and
moss with dark text inside `.on-dark`. Put `.on-dark` on any dark green
section and the buttons, focus rings and link colours inside it follow.
`.btn-secondary` is for dark backgrounds, `.btn-secondary-light` for light.

`npm run contrast` checks every pairing the design actually uses against WCAG
2.1 AA and exits non-zero if one slips. Run it after touching the palette.

## Notes for whoever picks this up next

**Images resolve in three tiers** (`lib/media.ts`): a file under `public/`
wins; failing that, the signed Artlist CDN URL from `image-manifest.json`;
failing that, a navy/gold gradient panel. Nothing ever 404s, and dropping the
real files in upgrades the site from CDN to self-hosted with no code change.
Every `fill` image also renders the gradient *behind* the photograph, so a
slow or failed CDN fetch shows a designed panel rather than a broken-image
icon — that path was tested with the CDN unreachable. `lib/media.ts` uses
`node:fs`, so it must only ever be imported by server components; that is why
`BlogCard` takes its cover image as a prop rather than resolving it itself.

**The scroll reveal is CSS, not a JS animation library.** Content is visible
by default; an inline script in `<head>` adds a `js` class before first paint
and drives an IntersectionObserver. This matters: an animation library that
sets `opacity: 0` inline during SSR ships a page that is blank below the hero
until hydration completes, which is bad for a site whose whole job is search
and accessibility. There is also a 2.5s failsafe that un-hides everything if
the observer never runs. See `components/Reveal.tsx`.

**Redirect ordering.** `/tax-center/track-refund` has to be matched before
the `/tax-center/:path*` catch-all beneath it, or it lands on the wrong page.
`npm run qa` checks for exactly this.

**No em dashes.** The copy uses commas, colons and full stops instead.
`grep -rn "—" app components lib` should come back empty.

**No invented facts.** No testimonials, star ratings, review counts, years in
business, client numbers, savings figures, credential numbers or team members
appear anywhere, and no `aggregateRating` is emitted in schema. `npm run qa`
fails the build if rating markup shows up. Where a fact was missing the page
carries a neutral fallback and an entry in `PRELAUNCH.md`.

**Compliance language.** Service pages avoid outcome guarantees — "explore
options", "seek to reduce", "represent you", never "we will eliminate" or
"pennies on the dollar". Refund advance content stays general and carries the
EPS Financial disclosure placeholders until the client supplies real terms.

**Dependency pins are deliberate.** Next is on the 15.5 line, which is what
cleared the critical advisories behind CVE-2025-66478. ESLint is held at 9
because `eslint-config-next@15.5.x` caps its peer range there — ESLint 10
throws `Failed to patch ESLint` against it, so the npm deprecation warning on
install is cosmetic and unavoidable until the project moves to Next 16. Two
moderate/high postcss advisories remain inside Next's own bundled copy and
are only fixable by that major upgrade; see PRELAUNCH.md.

**Review gating is not implemented and should not be.** Everyone who wants to
leave a review goes to the same public Google link, whatever they intend to
say. Routing happy clients to Google and unhappy ones elsewhere breaches
Google's policies.
