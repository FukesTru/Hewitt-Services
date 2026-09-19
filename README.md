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

The photography is **not in the repository yet**. After `fetch:images`,
commit it — a hosted build only has what is committed:

```bash
git add public/images && git commit -m "Add site photography" && git push
```

Every build prints how many images are missing (`scripts/check-images.mjs`),
so a deploy without them is obvious in the build log. It is only a warning:
missing images render a navy/gold gradient panel and the site still ships.

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (33 routes, all prerendered) |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (flat config, `eslint.config.mjs`) |
| `npm run fetch:images` | Download the photography from `image-manifest.json` |
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
  blog/[slug]/            The 6 posts, from lib/posts.ts
  api/contact/route.ts    Form endpoint
  sitemap.ts robots.ts    sitemap.xml and robots.txt
components/               Header, Footer, PageHero, ServiceCard, ProcessTimeline,
                          FAQAccordion, CTABand, TrustStrip, ContactForm,
                          CalendlyEmbed, MapEmbed, RelatedLinks, BlogCard, …
lib/
  site.ts                 NAP, links, nav — single source of truth
  services.ts             All 7 service pages' content
  posts.ts                All 6 blog posts
  faqs.ts                 Site-wide FAQ, grouped by topic
  routes.ts               Route registry driving both sitemaps
  schema.ts seo.ts        JSON-LD builders and per-page metadata
  media.ts                Image manifest + graceful fallback
```

**Content lives in `lib/`, not in JSX.** Editing a service page, a blog post
or an FAQ means editing `lib/services.ts`, `lib/posts.ts` or `lib/faqs.ts`.

## Design system

| Token | Value | Use |
|---|---|---|
| `navy` | `#0B1F3A` | Primary dark |
| `navy-dark` | `#07142A` | Deeper bands, footer |
| `gold` | `#C9A84C` | Accents and buttons **on dark only** |
| `gold-dark` | `#8A6D1F` | Gold-coloured **text on light** (contrast) |
| `ivory` | `#F7F4EC` | Alternating light sections |
| `ink` | `#334155` | Body text on light |
| `chalk` | `#E5E7EB` | Body text on dark |

Playfair Display for headings, Inter for body and UI.

`gold` fails contrast as text on white — use `gold-dark` there. `.btn-secondary`
is for dark backgrounds, `.btn-secondary-light` for light ones.

## Notes for whoever picks this up next

**Images degrade gracefully.** `lib/media.ts` checks at build time whether a
file exists. If it does not, the component renders a navy/gold gradient panel
instead of a broken image. Drop the real file in at the manifest path and it
appears on the next build, no code change. `lib/media.ts` uses `node:fs`, so
it must only ever be imported by server components — that is why `BlogCard`
takes its cover image as a prop rather than resolving it itself.

**The scroll reveal is CSS, not a JS animation library.** Content is visible
by default; an inline script in `<head>` adds a `js` class before first paint
and drives an IntersectionObserver. This matters: an animation library that
sets `opacity: 0` inline during SSR ships a page that is blank below the hero
until hydration completes, which is bad for a site whose whole job is search
and accessibility. There is also a 2.5s failsafe that un-hides everything if
the observer never runs. See `components/Reveal.tsx`.

**Redirect ordering.** The legacy `/blog/*` rule in `next.config.mjs` must
stay last, and its negative-lookahead list must contain every slug in
`lib/posts.ts`. Add a post without adding its slug there and the post 301s to
the blog index. `npm run qa` checks for exactly this.

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
