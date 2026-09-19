import Link from "next/link";

import { CTABand } from "@/components/CTABand";
import { GoogleReviews } from "@/components/GoogleReviews";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { IMAGES } from "@/lib/media";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Client Reviews | ${site.name} Dallas`,
  description:
    "Read what clients say about Hewitt Services on Google, or share your own experience. Tax, bookkeeping and IRS help from Demarcus Hewitt, EA in Dallas.",
  path: "/reviews",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Reviews", path: "/reviews" },
];

const HOW_TO = [
  {
    title: "Open our Google profile",
    body: "Use the button above, or search for Hewitt Services in Dallas on Google or Google Maps.",
  },
  {
    title: "Choose a star rating and write a few lines",
    body: "What you came to us for and how it went is more useful to the next person than anything else you could write.",
  },
  {
    title: "Post it",
    body: "Your review appears publicly on Google under your account, not on this site. We cannot edit it or take it down.",
  },
];

export default function ReviewsPage() {
  /* Note for future edits: this page emits BreadcrumbList only. Do NOT add
     AggregateRating or Review schema — the firm has supplied no verified
     rating data, and marking up ratings that are not displayed (or not real)
     breaches Google's structured data policies. */
  const url = site.links.googleReviews;

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        title="Client Reviews for Hewitt Services"
        lede="Our reviews live on Google, written and verified by the people who wrote them."
        eyebrow="Reviews"
        crumbs={crumbs}
        image={IMAGES.reviews()}
        priority
      />

      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="mx-auto max-w-3xl">
            <p className="prose-body">
              We do not reproduce testimonials on this page. Anyone can type a glowing quote onto
              their own website, which is exactly why quotes on a firm&rsquo;s own website are worth
              so little. Reviews on our Google Business Profile are attached to real accounts, and we
              cannot edit or remove them.
            </p>
          </Reveal>

          <Reveal delay={1} className="mx-auto mt-10 max-w-3xl">
            <GoogleReviews />
          </Reveal>
        </div>
      </section>

      {/* Leave a review */}
      <section className="on-dark section bg-navy">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Leave us a review
            </h2>
            <span className="accent-rule mt-5" aria-hidden="true" />
            <p className="mt-6 text-base leading-relaxed text-chalk sm:text-lg">
              If we have worked together, a few honest lines on Google genuinely helps the next
              person deciding whether to call. Good or bad — the same link either way.
            </p>

            <div className="mt-8">
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Write a Google review
                </a>
              ) : (
                // PLACEHOLDER: Google Business Profile review URL still needed.
                <div>
                  <a href={`mailto:${site.email}?subject=Leaving%20a%20review`} className="btn-primary">
                    Ask us for the review link
                  </a>
                  <p className="mt-3 max-w-sm text-xs text-chalk/70">
                    Our direct Google review link is being finalised — email us and we will send it
                    straight over.
                  </p>
                </div>
              )}
            </div>

            <p className="mt-8 max-w-sm text-xs leading-relaxed text-chalk/60">
              Every client is sent to the same public Google link, whatever they intend to say. We do
              not screen or route feedback, because review gating breaches Google&rsquo;s policies and
              makes the ratings meaningless.
            </p>
          </Reveal>

          <Reveal delay={1} className="lg:col-span-7">
            <h3 className="font-serif text-xl font-semibold text-white">
              How to leave a Google review
            </h3>
            <ol className="mt-6 space-y-6">
              {HOW_TO.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-serif text-base font-bold text-navy"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white">
                      <span className="sr-only">Step {i + 1}: </span>
                      {step.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-chalk/85">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-12">
        <div className="wrap">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              { label: "About the firm", href: "/about" },
              { label: "Our services", href: "/services" },
              { label: "Contact us", href: "/contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-semibold text-gold-dark hover:underline">
                  {l.label} <span aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand heading="Thinking about working with us?" />
    </>
  );
}
