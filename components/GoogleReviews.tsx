import { site } from "@/lib/site";

/**
 * Google reviews block.
 *
 * Deliberately empty of content: no testimonials, names, star ratings or
 * review counts are invented anywhere on this site, and no AggregateRating is
 * emitted in schema. A live widget drops into the slot below once the client
 * supplies their Google Business Profile URL.
 */
export function GoogleReviews({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const url = site.links.googleReviews;

  return (
    <div
      className={`rounded-2xl border p-8 text-center sm:p-10 ${
        dark ? "border-white/15 bg-white/5" : "border-navy/10 bg-white"
      }`}
    >
      {/*
        ── Google reviews widget slot ──────────────────────────────────────
        Paste the review widget embed here (e.g. the client's chosen Google
        reviews provider). Keep the "Read our reviews on Google" link below
        as the fallback.
        PLACEHOLDER: Google Business Profile review URL still needed —
        set site.links.googleReviews in lib/site.ts.
        ────────────────────────────────────────────────────────────────────
      */}
      <p className={`font-serif text-xl font-semibold ${dark ? "text-white" : "text-navy"}`}>
        What our clients say
      </p>
      <p className={`mx-auto mt-3 max-w-xl text-sm leading-relaxed ${dark ? "text-chalk/80" : "text-ink"}`}>
        Our reviews live on our Google Business Profile, where they are written and verified by
        clients rather than reproduced by us.
      </p>

      <div className="mt-6">
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className={dark ? "btn-primary" : "btn-secondary-light"}>
            Read our reviews on Google
          </a>
        ) : (
          <a href={`mailto:${site.email}?subject=Reviews`} className={dark ? "btn-primary" : "btn-secondary-light"}>
            Ask us for our review page
          </a>
        )}
      </div>
    </div>
  );
}
