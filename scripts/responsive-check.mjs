/**
 * Layout sweep: horizontal overflow, target sizes and heading structure at
 * 375 / 768 / 1280 px.
 *
 * Playwright is not a project dependency (its postinstall pulls ~200MB of
 * browsers), so install it just for this run:
 *
 *   npm i -D playwright && npx playwright install chromium
 *   npm run build && npm start &
 *   node scripts/responsive-check.mjs http://127.0.0.1:3000
 */
import { chromium } from "playwright";

const BASE = process.argv[2] ?? "http://127.0.0.1:3000";
const WIDTHS = [375, 768, 1280];
const PAGES = [
  "/", "/about", "/services", "/services/monthly-bookkeeping", "/services/irs-tax-problems",
  "/services/refund-advances", "/tax-solutions-in-dallas", "/fort-worth-tax-services",
  "/remote-tax-services",
  "/tax-center", "/faq", "/blog", "/blog/irs-notice-first-30-days", "/reviews",
  "/contact", "/privacy-policy", "/terms-and-disclaimer", "/sitemap", "/thank-you",
];

const browser = await chromium.launch(
  // Honour a preinstalled browser when one is provided, else let Playwright resolve its own.
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
);
const problems = [];

for (const width of WIDTHS) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();

  for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: "domcontentloaded" });

    const report = await page.evaluate((vw) => {
      const doc = document.documentElement;
      const overflow = doc.scrollWidth - vw;
      const wide = [];
      if (overflow > 1) {
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.right > vw + 1) {
            wide.push(`${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ")[0]} right=${Math.round(r.right)}`);
            if (wide.length >= 3) break;
          }
        }
      }
      // Target size.
      //
      // WCAG 2.2 AA (2.5.8) sets a 24x24 CSS px minimum for pointer targets,
      // but excepts inline links in flowing text and targets whose 24px
      // spacing circles do not overlap. So this checks two different things:
      //
      //  1. Standalone controls — buttons and links styled as buttons — must
      //     measure at least 24x24 themselves.
      //  2. Dense link lists (footer columns, breadcrumbs, in-page nav) are
      //     inline links, so they are checked on SPACING instead: adjacent
      //     links must sit at least 24px apart centre to centre.
      const small = [];
      const isButtonLike = (el) =>
        el.tagName === "BUTTON" || /(^|\s)btn(-|\s|$)/.test(el.className || "");

      for (const el of document.querySelectorAll("button, a")) {
        const r = el.getBoundingClientRect();
        const styles = getComputedStyle(el);
        if (r.width === 0 || styles.visibility === "hidden" || styles.display === "none") continue;
        if (el.closest(".sr-only") || el.classList.contains("sr-only")) continue;
        if (!isButtonLike(el)) continue;
        if (r.height < 24 || r.width < 24) {
          small.push(`${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 28)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
          if (small.length >= 3) break;
        }
      }

      // Spacing check for stacked inline links in chrome.
      const crowded = [];
      for (const list of document.querySelectorAll("header ul, footer ul, nav ul, nav ol")) {
        const links = [...list.querySelectorAll(":scope > li > a")]
          .map((a) => a.getBoundingClientRect())
          .filter((r) => r.width > 0);
        for (let i = 1; i < links.length; i++) {
          const prev = links[i - 1];
          const cur = links[i];
          // Only compare links stacked vertically, not ones sitting side by side.
          const stacked = cur.top >= prev.bottom - 1;
          if (!stacked) continue;
          const pitch = cur.top + cur.height / 2 - (prev.top + prev.height / 2);
          if (pitch < 24) {
            crowded.push(`list pitch ${Math.round(pitch)}px near "${list.querySelectorAll("a")[i]?.textContent.trim().slice(0, 20)}"`);
            break;
          }
        }
        if (crowded.length >= 2) break;
      }

      return { overflow, wide, small, crowded, h1: document.querySelectorAll("h1").length };
    }, width);

    if (report.overflow > 1) {
      problems.push(`${width}px ${path}: horizontal overflow ${report.overflow}px [${report.wide.join("; ")}]`);
    }
    if (report.small.length) {
      problems.push(`${width}px ${path}: undersized controls [${report.small.join("; ")}]`);
    }
    if (report.crowded.length) {
      problems.push(`${width}px ${path}: crowded link lists [${report.crowded.join("; ")}]`);
    }
    if (report.h1 !== 1) {
      problems.push(`${width}px ${path}: ${report.h1} h1 elements`);
    }
  }

  await context.close();
}

await browser.close();

if (problems.length) {
  console.log(`${problems.length} PROBLEM(S):`);
  for (const p of problems) console.log("  ✗ " + p);
  process.exit(1);
}
console.log(`No layout problems across ${PAGES.length} pages at ${WIDTHS.join(" / ")} px.`);
