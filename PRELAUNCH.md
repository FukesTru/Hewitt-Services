# Pre-launch checklist — Hewitt Services

Everything still open before hewittservices.net can go live. Each item says
where it lives in the code, so nothing has to be hunted for.

Nothing on this site invents a fact the firm has not supplied. Where a value
was missing, the page ships a neutral fallback and the gap is listed here —
it is never filled with a plausible guess.

---

## 1. Blocking — the site should not launch without these

### 1.1 Photography (23 images) — live, but on a borrowed host

All 23 images were generated with Artlist (Seedream 5.0, 2K) and live in the
firm's Artlist library. **They now render on the site**, served directly from
Artlist's CDN, so the deploy no longer looks unfinished.

That is an interim arrangement, not the finished state. Images resolve in
three tiers, in `lib/media.ts`:

1. A file under `public/images/` — self-hosted. **Always wins.**
2. The signed Artlist CDN URL from `image-manifest.json` — what is in use now.
3. Neither — a navy/gold gradient panel.

**Why tier 2 should not be the permanent answer.** It makes the site depend
on a third-party CDN the firm does not control, on signed URLs (dated
2036-09-16, but revocable by Artlist at any time), and it means Artlist can
see traffic patterns for the site. If those URLs ever stop resolving, every
photograph disappears at once.

**To move to tier 1**, from a machine with normal internet access:

```bash
npm run fetch:images          # writes all 23 into public/images/
git add public/images
git commit -m "Self-host site photography"
git push
```

Because a local file always wins, that switch needs **no code change**. Once
it is done, the `remotePatterns` entry for `cms-toolkit-artifacts.artlist.io`
in `next.config.mjs` can be deleted.

Every build prints which tier each image is on, so the state is visible in
the Vercel log rather than something to notice on the live site.

**Degradation was tested**, not assumed: with the CDN unreachable, pages
render the navy gradient behind every image slot — no broken-image icons, no
white holes, no layout shift. The `remotePatterns` config was verified too
(the allowed host reaches the fetch stage; an unlisted host is rejected with
400).

| Where | Files |
|---|---|
| Page heroes | `public/images/hero/` (8) |
| Service pages | `public/images/services/` (7) |
| Blog covers | `public/images/blog/` (6) |
| Social share card | `public/images/og/og-default.jpg` (1) |
| Artlist credits used | 2,300 |

If a signed URL has expired (403), the manifest also records each image's
Artlist `generationId` and the exact prompt, so it can be re-downloaded from
the library or regenerated.

### 1.2 Founder photograph — client to supply

`public/images/demarcus-hewitt.jpg`

**Deliberately not generated.** A synthetic or stock face standing in for a
real, named person would misrepresent the firm. Until the real photograph is
dropped in at that path, `components/FounderPortrait.tsx` renders a neutral
monogram card.

### 1.3 Logo and favicon — client to supply

- `components/Logo.tsx` — currently a typographic wordmark ("Hewitt
  **Services**" with a gold rule). Replace the markup with the supplied file,
  keeping the `Link` wrapper and its accessible name.
- `public/favicon.svg` — placeholder navy/gold "H" tile.
- **If the logo's brand colours differ from the palette below, update
  `tailwind.config.ts`.** The current palette was specified in the brief, not
  taken from the logo.

### 1.4 EPS Financial disclosures — client to supply

`lib/services.ts` → `EPS_DISCLOSURE_PLACEHOLDER`

Four FAQ answers on `/services/refund-advances` currently render a visible
bracketed placeholder instead of terms:

- How quickly could I receive funds?
- Does approval depend on my credit?
- Is there a fee or interest?
- What happens if my refund is smaller or delayed?

No fee, interest, credit-check, funding-time or maximum-amount claim appears
anywhere on the site. The previous site's "no interest", "no credit check"
and "24 to 48 hours" claims were **not** carried over — confirm each against
EPS Financial's current terms before publishing any of them.

The standing note ("Refund advance is subject to approval and eligibility. It
is not your tax refund. Terms are provided by EPS Financial.") is already in
place on the service page and in the Professional Disclaimer.

### 1.5 Legal review — Privacy Policy and Terms

`app/privacy-policy/page.tsx` and `app/terms-and-disclaimer/page.tsx`

Both are written to describe accurately how this website actually behaves,
and both carry a `TODO(client)` to that effect. Neither has been reviewed by
an attorney. Have both reviewed before launch.

The SMS section already carries the required carrier language: two separate
unchecked opt-ins, message frequency, rates, STOP, HELP, and the explicit
statement that mobile opt-in data and consent are not shared with third
parties or affiliates for marketing.

Also in the privacy policy: `PLACEHOLDER` at the service-provider list —
replace the generic descriptions with the named vendors and links to their
policies once the final vendor list is settled.

### 1.6 Contact form delivery

`app/api/contact/route.ts`

Set the `CONTACT_WEBHOOK_URL` environment variable to the firm's form/email
service so submissions reach **info@hewittservices.net**. Until it is set the
route validates and logs the submission but does not deliver it — it warns
loudly in the server log rather than silently pretending to send.

A commented CRM webhook slot sits directly beneath it.

### 1.7 GA4 measurement ID

`lib/site.ts` → `analytics.ga4` is `G-XXXXXXXXXX`.

Swap in the real property ID. The tag is only injected after a visitor
accepts analytics cookies; while the ID is still the placeholder,
`components/Analytics.tsx` loads nothing at all.

---

## 2. Client to confirm — content is written but a fact is missing

| Item | Where | Current behaviour |
|---|---|---|
| **Business hours** | `lib/site.ts` → `hours` (currently `null`) | Footer, Dallas, Fort Worth and Contact pages all show "Hours available on request — call or email and we will confirm." No hours were invented. |
| **Google Business Profile review URL** | `lib/site.ts` → `links.googleReviews` | `/reviews` and the homepage reviews block fall back to an "ask us for our review page" email link. |
| **Free Tax Organizer PDF** | `lib/site.ts` → `downloads.taxOrganizer` | Lead-magnet strip and Tax Center offer "Request by email" instead of a download. |
| **Business Tax Organizer PDF** | `lib/site.ts` → `downloads.businessTaxOrganizer` | Same. |
| **Registered legal entity name** | `lib/site.ts` → `legalNote` | Uses "Hewitt Services" throughout. The old site mixed in "Hewitt Financial Services"; the brand is Hewitt Services everywhere here. |
| **Fort Worth in-person meetings** | `app/fort-worth-tax-services/page.tsx` | Page says "In-person in Fort Worth by appointment — ask us when you call" and states plainly that the firm has no Fort Worth office. Confirm whether in-person meetings there are actually offered. |
| **YouTube video ownership** | `app/page.tsx` | The old site embedded `youtube.com/embed/Db9xL1q1LCY`. **Not rendered** — ownership unconfirmed. A commented slot with the URL is ready on the homepage. |
| **Founder biography details** | `app/about/page.tsx` | Years of experience, education, prior employers, awards and client counts are all **absent**, with a commented placeholder listing them. None were invented. Supply them if the firm wants them published. |

---

## 3. Optional slots, wired and waiting

| Slot | Where |
|---|---|
| Third-party AI chat widget | `app/layout.tsx`, before `</body>`. Owns the bottom-**right** corner; the mobile "Call Now" button is pinned bottom-**left** so they never overlap. |
| Google reviews widget | `components/GoogleReviews.tsx` |
| Newsletter signup webhook | `app/blog/page.tsx` |
| CRM webhook | `app/api/contact/route.ts` |
| Native tax calculators | `app/tax-center/page.tsx`. The old site's third-party hosted calculators were deliberately not carried over. |

---

## 4. Deliberately not carried over from the old site

- **~1,000 syndicated blog articles.** Six original posts were written
  instead. Every other `/blog/*` URL 301s to `/blog`; the six own slugs are
  excluded from that rule in `next.config.mjs`.
- **Third-party hosted calculators** (old template platform).
- **The old AI chat bot** (old template platform).
- **The OLTPro preparer login.**
- **All old imagery.** Its stock photos are licensed through the old
  platform; nothing is hotlinked or reused.
- **Placeholder team bios.** The old team page was unfilled template text.
  Only Demarcus Hewitt appears here — no invented colleagues.
- **The old IRS Problems page copy**, which was bookkeeping boilerplate by
  mistake. `/services/irs-tax-problems` is written fresh and IRS-specific.

---

## 5. Verified before hand-off

Run against a production build (`npm run build && npm start`):

```bash
npm run qa          # SEO, schema, redirects, accessibility landmarks
node scripts/responsive-check.mjs http://127.0.0.1:3000
```

Currently passing:

- **27 pages** — the 20 briefed pages, `/thank-you`, and 6 blog posts
- Exactly **one `<h1>` per page**; 27 unique titles, 27 unique meta descriptions
- Canonical, Open Graph and Twitter tags on every page
- `noindex` on `/thank-you` only; excluded from `sitemap.xml` and disallowed in `robots.txt`
- **24 legacy 301 redirects** verified, including that the six own blog posts are *not* caught by the legacy `/blog/*` rule
- Breadcrumb nav + `BreadcrumbList` schema on every inner page
- All JSON-LD parses; **no `aggregateRating`, `reviewCount` or `ratingValue` anywhere**
- Skip link and `<main id="main">` on every page
- `alt` on every `<img>`
- No horizontal overflow at 375 / 768 / 1280 px
- Button-like controls ≥ 24×24 px; stacked nav links ≥ 24 px apart
- Page content is fully readable with **JavaScript disabled** — the scroll
  reveal is armed by CSS, not shipped as `opacity: 0` markup
- `prefers-reduced-motion: reduce` removes all motion without hiding anything

### Still worth doing manually

- Run Lighthouse against the deployed build once the real images are in
  place (image weight is the one thing these checks cannot judge).
- Re-check colour contrast if the palette changes to match the supplied logo.
- Screen-reader pass on the mega-menu and the FAQ accordions.
- Submit `sitemap.xml` in Google Search Console and confirm the 301s resolve
  on the live domain.

---

## 6. Dependencies and security

Deploy logs will show two npm **warnings**. Neither fails a build, but here
is what each one is and what was done about it.

### Resolved

**Next.js security advisory (CVE-2025-66478).** The project was initially
pinned to `next@15.1.6`, which npm flags as vulnerable. Upgraded to
**`next@15.5.25`** — npm's own `fixAvailable` for the advisory, and not a
major bump. That cleared the *critical* rating and every advisory in the
CVE-2025-66478 cluster, and dropped `sharp` out of the dependency tree
entirely (so one of the two `allow-scripts` warnings is gone too).

Verified after the upgrade: clean typecheck, clean lint, clean build, and
the full QA and layout sweeps still pass. `next/image` optimization was
tested end to end against a real JPEG — the endpoint serves AVIF and WebP
(20KB source → 3.4KB AVIF) with no sharp present and no optimizer warnings.

### Remaining, and why

**Two postcss advisories (1 moderate, 1 high)** live inside Next's own
bundled `next/node_modules/postcss`. `npm audit` reports the only fix as
`next@16.3.5`, a breaking major upgrade. Not taken here: a major framework
bump on a site about to launch is a bigger risk than the advisories, which
concern source-map handling in CSS processing at build time rather than
anything the deployed site exposes to visitors. Worth scheduling as its own
piece of work after launch.

**`npm warn deprecated eslint@9.x`.** ESLint 10 is current, but
`eslint-config-next@15.5.25` caps its peer range at ESLint 9 — installing 10
makes linting fail outright with `Failed to patch ESLint`. This was tested,
not assumed. The warning is cosmetic, ESLint is a devDependency Vercel does
not run, and it clears with the Next 16 upgrade above.

**`npm warn allow-scripts unrs-resolver`.** npm's supply-chain gate holding
back a postinstall script, from a transitive dependency of
`eslint-config-next`. Lint-time only, does not affect the build or the
deployed site, and safe to leave un-approved.

The lint setup moved to ESLint flat config (`eslint.config.mjs`) because
`next lint` is deprecated as of Next 15.5; `npm run lint` now calls the
ESLint CLI directly.

---

## 7. Content scope worth a client sanity check

The Tax Preparation page, and the bookkeeping, tax planning and back taxes
pages, were specified from the old site's homepage, services page, FAQ and
Dallas page rather than from their own pages (those hit a fetch limit during
the brief). The service scope described on each is a reasonable reading of
the firm's offering but is worth a quick read-through by Demarcus.

## 8. Optional expansion

Plano, Irving or other DFW city pages could be added if the firm confirms
which cities it actively serves — that would take the site to 21–23 pages.
Each would need genuinely distinct copy, as the Fort Worth page does; a
find-and-replace of the Dallas page would be worse than not having the page.
