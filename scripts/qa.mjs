/**
 * Post-build QA sweep. Run against `next start`:
 *   node scripts/qa.mjs http://127.0.0.1:3000
 *
 * Checks every route for exactly one H1, a unique title and meta
 * description, a canonical URL, breadcrumbs on inner pages, enough internal
 * links, alt text on every image, and valid JSON-LD.
 */
const BASE = process.argv[2] ?? "http://127.0.0.1:3000";

const PAGES = [
  "/", "/about", "/services",
  "/services/monthly-bookkeeping", "/services/tax-planning", "/services/tax-preparation",
  "/services/back-taxes-compliance", "/services/irs-tax-problems",
  "/services/franchise-tax-reinstatement", "/services/refund-advances",
  "/tax-solutions-in-dallas", "/fort-worth-tax-services", "/remote-tax-services",
  "/faq", "/contact", "/privacy-policy", "/terms-and-disclaimer", "/sitemap",
  "/thank-you",
];

const REDIRECTS = [
  ["/firm-background", "/about"],
  ["/firm-background/meet-the-team", "/about"],
  ["/firm-background/referrals", "/about#referrals"],
  ["/firm-background/privacy-policy", "/privacy-policy"],
  ["/website-privacy-policy", "/privacy-policy"],
  ["/sms-terms-and-conditions", "/terms-and-disclaimer#sms-terms"],
  ["/back-taxes-compliance", "/services/back-taxes-compliance"],
  ["/services/monthly-bookkeeping-dallas", "/services/monthly-bookkeeping"],
  ["/virtual-assistant-bookkeeping-services", "/services/monthly-bookkeeping"],
  ["/services/tax-planning-services-dallas", "/services/tax-planning"],
  ["/tax-preparation-service-dallas", "/services/tax-preparation"],
  ["/services/irs-tax-problems-dallas", "/services/irs-tax-problems"],
  ["/franchise-tax-reinstatement-and-compliance", "/services/franchise-tax-reinstatement"],
  ["/services/franchise-tax-reinstatement-and-compliance", "/services/franchise-tax-reinstatement"],
  ["/refund-advances-eps-program", "/services/refund-advances"],
  ["/services/refund-advances-eps-program", "/services/refund-advances"],
  ["/frequently-asked-questions", "/faq"],
  ["/about-us/frequently-asked-questions", "/faq"],
  ["/business-tax-organizer", "/#downloads"],
  ["/track-refund", "/contact"],
  ["/tax-center/track-refund", "/contact"],
  ["/tax-center", "/services"],
  ["/tax-center/anything-else", "/services"],
  ["/reviews", "/about"],
  ["/appointments", "/contact"],
  // Legacy blog archive → index, but the site's own posts must NOT redirect.
  ["/blog", "/"],
  ["/blog/2019/05/some-syndicated-article", "/"],
  ["/blog/irs-notice-first-30-days", "/"],
];

const problems = [];
const titles = new Map();
const descriptions = new Map();

const count = (html, re) => (html.match(re) ?? []).length;
const pick = (html, re) => (html.match(re) ?? [])[1];

function fail(page, msg) {
  problems.push(`${page}: ${msg}`);
}

async function checkPage(path) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  if (res.status !== 200) return fail(path, `expected 200, got ${res.status}`);
  const html = await res.text();

  // Exactly one H1
  const h1s = count(html, /<h1[\s>]/g);
  if (h1s !== 1) fail(path, `expected 1 <h1>, found ${h1s}`);

  // Unique title
  const title = pick(html, /<title>([^<]*)<\/title>/);
  if (!title) fail(path, "missing <title>");
  else if (titles.has(title)) fail(path, `duplicate <title> (also on ${titles.get(title)})`);
  else titles.set(title, path);

  // Unique meta description
  const desc = pick(html, /<meta name="description" content="([^"]*)"/);
  if (!desc) fail(path, "missing meta description");
  else if (descriptions.has(desc)) fail(path, `duplicate meta description (also on ${descriptions.get(desc)})`);
  else descriptions.set(desc, path);

  // Canonical
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/);
  const expected = path === "/" ? "https://hewittservices.net" : `https://hewittservices.net${path}`;
  if (canonical !== expected) fail(path, `canonical is "${canonical}", expected "${expected}"`);

  // Open Graph + Twitter
  if (!/property="og:title"/.test(html)) fail(path, "missing og:title");
  if (!/property="og:image"/.test(html)) fail(path, "missing og:image");
  if (!/name="twitter:card"/.test(html)) fail(path, "missing twitter:card");

  // noindex only on /thank-you
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  if (path === "/thank-you" && !noindex) fail(path, "should be noindex");
  if (path !== "/thank-you" && noindex) fail(path, "unexpectedly noindex");

  // Breadcrumbs on inner pages
  const inner = path !== "/" && path !== "/thank-you";
  if (inner) {
    if (!/aria-label="Breadcrumb"/.test(html)) fail(path, "missing visible breadcrumb nav");
    if (!/"@type":"BreadcrumbList"/.test(html)) fail(path, "missing BreadcrumbList schema");
  }

  // Internal links (unique, excluding self)
  const hrefs = new Set(
    [...html.matchAll(/href="(\/[^"#?][^"]*)"/g)].map((m) => m[1].split("#")[0]).filter((h) => h && h !== path)
  );
  if (hrefs.size < 3) fail(path, `only ${hrefs.size} unique internal links`);

  // Every <img> has alt
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => !/\salt="/.test(t));
  if (noAlt.length) fail(path, `${noAlt.length} <img> without alt`);

  // Skip link + main landmark
  if (!/href="#main"/.test(html)) fail(path, "missing skip-to-content link");
  if (!/id="main"/.test(html)) fail(path, "missing <main id=\"main\">");

  // JSON-LD parses
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      JSON.parse(m[1].replace(/\\u003c/g, "<"));
    } catch (e) {
      fail(path, `invalid JSON-LD: ${e.message}`);
    }
  }

  // Guardrail: no fabricated ratings anywhere.
  if (/aggregateRating|reviewCount|ratingValue/i.test(html)) {
    fail(path, "contains rating markup; no verified review data exists");
  }
}

async function checkRedirect(from, to) {
  const res = await fetch(BASE + from, { redirect: "manual" });
  if (res.status !== 308 && res.status !== 301) {
    return fail(`redirect ${from}`, `expected 301/308, got ${res.status}`);
  }
  const loc = res.headers.get("location");
  if (loc !== to) fail(`redirect ${from}`, `went to "${loc}", expected "${to}"`);
}

async function checkRetiredSectionsAreGone() {
  // The blog, the Tax Center and the reviews page were removed. Nothing under
  // them may 200, and every one of them has to land somewhere useful.
  for (const gone of ["/blog", "/blog/irs-notice-first-30-days", "/tax-center", "/reviews"]) {
    const res = await fetch(BASE + gone, { redirect: "manual" });
    if (res.status !== 301 && res.status !== 308) {
      fail(`retired ${gone}`, `expected a redirect, got ${res.status}`);
    }
  }
}

async function checkSitemapXml() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  const xml = await res.text();
  if (/thank-you/.test(xml)) fail("sitemap.xml", "must not list /thank-you");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urls.length !== 18) fail("sitemap.xml", `expected 18 URLs, found ${urls.length}`);
  const robots = await (await fetch(`${BASE}/robots.txt`)).text();
  if (!/Disallow: \/thank-you/.test(robots)) fail("robots.txt", "must disallow /thank-you");
  if (!/Sitemap: https:\/\/hewittservices\.net\/sitemap\.xml/.test(robots)) {
    fail("robots.txt", "missing sitemap reference");
  }
  return urls.length;
}

const urlCount = await checkSitemapXml();
for (const p of PAGES) await checkPage(p);
for (const [from, to] of REDIRECTS) await checkRedirect(from, to);
await checkRetiredSectionsAreGone();

console.log(`Pages checked:      ${PAGES.length}`);
console.log(`Redirects checked:  ${REDIRECTS.length}`);
console.log(`sitemap.xml URLs:   ${urlCount}`);
console.log(`Unique titles:      ${titles.size}`);
console.log(`Unique descriptions:${descriptions.size}`);

if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):`);
  for (const p of problems) console.log("  ✗ " + p);
  process.exit(1);
}
console.log("\nAll QA checks passed.");
