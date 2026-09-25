# Pre-launch checklist — Hewitt Services

Everything still open before hewittservices.net can go live. Each item says
where it lives in the code, so nothing has to be hunted for.

Nothing on this site invents a fact the firm has not supplied. Where a value
was missing, the page ships a neutral fallback and the gap is listed here —
it is never filled with a plausible guess.

---

## 1. Blocking — the site should not launch without these

### 1.1 Photography (15 images): live, but on a borrowed host

All 15 images were generated with Artlist (Seedream 5.0, 2K) and live in the
firm's Artlist library. **They now render on the site**, served directly from
Artlist's CDN, so the deploy no longer looks unfinished.

**Art direction predates the green palette.** The first 23 were briefed to the
original navy-and-gold scheme — deep navy skies, warm gold window light — and
the site is now green and white. They still read as dark, warm photographs
behind white headline text rather than clashing, but they are no longer
colour-matched to the brand. Worth a look on a real screen before launch. If
the client wants them re-shot to the green palette, regenerating all 24 costs
2,400 Artlist credits; the prompts are in `image-manifest.json` and only need
the colour clauses rewritten.

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

**To move to tier 1**, one command from a machine with normal internet
access:

```bash
npm run images
```

That downloads all 23 into `public/images`, verifies each is a real JPEG,
then commits and pushes. Because a local file always wins, it needs **no code
change** — and afterwards the `remotePatterns` entry for
`cms-toolkit-artifacts.artlist.io` in `next.config.mjs` and the
`/api/image-check` route can both be deleted.

If every download fails, this machine cannot reach Artlist either; the script
says so, commits nothing, and tells you what to do next.

**Diagnosing a deploy that shows no images.** Visit `/api/image-check` on the
deployed site. It reports how many images are self-hosted and whether that
server can actually reach Artlist, and gives a verdict. This exists because
the build environment cannot reach Artlist at all, so whether a hosted deploy
could was unknowable from there. It is excluded from `robots.txt` and should
be deleted once the images are self-hosted.

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
| Social share card | `public/images/og/og-default.jpg` (1) |
| Artlist credits used | 2,400 generated; 15 still in use |

If a signed URL has expired (403), the manifest also records each image's
Artlist `generationId` and the exact prompt, so it can be re-downloaded from
the library or regenerated.

### 1.2 Founder photograph — supplied ✅

`public/images/demarcus-hewitt.jpg` (1000×1250, 297 KB) is in the repo and
renders on the homepage founder feature and on `/about`. Because it is
committed, it appears on a deploy regardless of the Artlist situation above.

The supplied original was 1500×1500. It has been cropped to 4:5 around the
subject — the square framing included a stretch of office wall and a printer
on the right — and the mahogany panelling behind him was desaturated a little
so it sits with the green palette rather than fighting it. Nothing about the
subject was altered, and the original is recoverable from git history if the
client prefers it untouched.

Alt text: "Demarcus Hewitt, Founder and Enrolled Agent of Hewitt Services".
Served through the image optimizer — 297 KB source down to roughly 20 KB AVIF
at display size.

It was never generated: a synthetic or stock face standing in for a real,
named person would misrepresent the firm. The monogram fallback in
`components/FounderPortrait.tsx` remains for the case where the file is
missing.

### 1.3 Logo — supplied and in use ✅

`public/images/logo-hewitt-services.webp` (330×72) is the client's file,
unaltered, and it is what renders in the header and the footer.

Its wordmark is near-black, which would vanish on the dark green header, so on
the dark bands it sits on a white panel. The artwork itself is not recoloured,
cropped or redrawn.

`public/favicon.png` and `public/apple-touch-icon.png` are cropped from the
mark in that same file.

**Worth asking the client for a larger or vector original (AI, EPS, SVG or
PDF).** At 330×72 the file is displayed at 40px tall in the header, which is
sharp on a normal screen and adequate on a retina one, but there is no headroom
to go bigger, and the strapline "Where excellence is at its best" is only a few
pixels tall at that size. A vector original would also give a crisper favicon
and touch icon.

The palette follows the logo: `forest` `#1C4C23`, `forest-light` `#2E9C5A`,
`moss` `#86BF87` and `moss-dark` `#14793A` are its four greens.

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

### 1.6 LeadConnector form: consents to rebuild ⚠️

`components/LeadForm.tsx`

The contact form is now the firm's own LeadConnector form
(`6sdCYX21g6paqY5PPANN`), embedded as an iframe. The site no longer collects,
validates or transmits anything: fields, routing and delivery are all
configured in LeadConnector. `app/api/contact/route.ts` and its
`CONTACT_WEBHOOK_URL` are gone with it.

**Three things the old form carried have to be rebuilt in the LeadConnector
form builder, because the site can no longer enforce them from outside the
iframe:**

1. **A required anti-solicitation confirmation.** "I confirm this is a service
   inquiry and not an advertising message or solicitation."
2. **Two separate, unchecked SMS opt-ins**, one for service messages and one
   for marketing, each carrying: "Message frequency may vary. Message and data
   rates may apply. Reply STOP to opt out." and "Text HELP to (972) 591-0008
   for help."
3. **Links to the Privacy Policy and the SMS Terms** from inside the form.

The site still publishes SMS Terms at `/terms-and-disclaimer#sms-terms` and a
privacy policy that describes SMS consent. If the firm texts clients, the
consent has to be taken somewhere, and the website form was where it used to
happen.

Two other things to set in LeadConnector: where submissions are delivered
(**info@hewittservices.net**), and the post-submit behaviour. `/thank-you` is
still built and still `noindex`, so the form can be pointed at it; otherwise
LeadConnector shows its own confirmation inside the iframe and `/thank-you`
becomes an orphan page that can be deleted.

The "do not send Social Security numbers or full tax documents" note sits on
the page around the iframe, where the site still controls it.

### 1.6a Chat widget

`app/layout.tsx`

The firm's LeadConnector chat widget (`6ab682b050fc24ace636505e`) loads on
every page with `strategy="lazyOnload"`, after everything that makes the page
usable. It owns the bottom-right corner; the mobile "Call Now" button is
bottom-left, so they do not collide.

**It is not gated behind the cookie banner.** GA4 is, because it is analytics.
The chat widget is treated as functional, on the grounds that it is the
service rather than measurement of it. Both LeadConnector embeds are now named
in the Privacy Policy's service-provider list. If the firm's counsel wants
chat gated too, it is a small change: move the `<Script>` behind the same
consent check `components/Analytics.tsx` uses.

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
| **Google Business Profile review URL** | `lib/site.ts` → `links.googleReviews` | Used only in the `sameAs` list of the firm's JSON-LD, which drops it while it is null. The reviews page was removed. |
| **Free Tax Organizer PDF** | `lib/site.ts` → `downloads.taxOrganizer` | The lead-magnet strip on the homepage offers "Request by email" instead of a download. |
| **Business Tax Organizer PDF** | `lib/site.ts` → `downloads.businessTaxOrganizer` | Same. |
| **Registered legal entity name** | `lib/site.ts` → `legalNote` | Uses "Hewitt Services" throughout. The old site mixed in "Hewitt Financial Services"; the brand is Hewitt Services everywhere here. |
| **Clients outside Texas** | `app/remote-tax-services/page.tsx` | The Remotely page claims Texas only — "our office is in Dallas and we do not keep premises anywhere else". Nothing nationwide was implied. Confirm whether out-of-state clients are accepted, and the page can be widened. |
| **Fort Worth in-person meetings** | `app/fort-worth-tax-services/page.tsx` | Page says "In-person in Fort Worth by appointment — ask us when you call" and states plainly that the firm has no Fort Worth office. Confirm whether in-person meetings there are actually offered. |
| **YouTube video ownership** | `app/page.tsx` | The old site embedded `youtube.com/embed/Db9xL1q1LCY`. **Not rendered** — ownership unconfirmed. A commented slot with the URL is ready on the homepage. |
| **Founder biography details** | `app/about/page.tsx` | Years of experience, education, prior employers, awards and client counts are all **absent**, with a commented placeholder listing them. None were invented. Supply them if the firm wants them published. |

---

## 3. Optional slots, wired and waiting

| Slot | Where |
|---|---|
| Third-party AI chat widget | `app/layout.tsx`, before `</body>`. Owns the bottom-**right** corner; the mobile "Call Now" button is pinned bottom-**left** so they never overlap. |
| CRM webhook | `app/api/contact/route.ts` |

---

## 4. Deliberately not carried over from the old site

- **The blog, in full.** The old platform's ~1,000 syndicated articles were
  never carried over, and the six original posts written for the new site
  have since been removed at the client's request. Every `/blog/*` URL 301s
  to the homepage.
- **The Tax Center.** `/tax-center` 301s to `/services`; the Free Tax
  Organizer strip it held now lives on the homepage at `/#downloads`.
- **The reviews page.** `/reviews` 301s to `/about`. No testimonials, star
  ratings or review counts appear anywhere on the site.
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

- **19 pages**, including `/thank-you`
- Exactly **one `<h1>` per page**; 19 unique titles, 19 unique meta descriptions
- Canonical, Open Graph and Twitter tags on every page
- `noindex` on `/thank-you` only; excluded from `sitemap.xml` and disallowed in `robots.txt`
- **28 legacy 301 redirects** verified, including that the retired blog, Tax Center and reviews URLs all land somewhere useful
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
- Re-check color contrast if the palette changes to match the supplied logo.
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
