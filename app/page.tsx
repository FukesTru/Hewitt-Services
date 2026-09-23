import Link from "next/link";

import { CTABand } from "@/components/CTABand";
import { BlogCard } from "@/components/BlogCard";
import { FaqTeaser } from "@/components/FAQAccordion";
import { FounderPortrait } from "@/components/FounderPortrait";
import { GoogleReviews } from "@/components/GoogleReviews";
import { JsonLd } from "@/components/JsonLd";
import { LeadMagnetStrip } from "@/components/LeadMagnetStrip";
import { PageHero } from "@/components/PageHero";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { TrustStrip } from "@/components/TrustStrip";
import { homeFaqs } from "@/lib/faqs";
import { IMAGES, postImage } from "@/lib/media";
import { posts } from "@/lib/posts";
import { accountingServiceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Tax Services in Dallas, TX | ${site.name}`,
  description:
    "Dallas tax planning, monthly bookkeeping, back tax filing and IRS problem resolution led by Demarcus Hewitt, EA. Book your free discovery call today.",
  path: "/",
});

const HOME_SERVICES = [
  "monthly-bookkeeping",
  "tax-planning",
  "back-taxes-compliance",
  "irs-tax-problems",
  "franchise-tax-reinstatement",
  "refund-advances",
];

const WHO_WE_HELP = [
  {
    title: "Individuals and families",
    body: "Accurate returns, the credits and deductions you are actually entitled to, and someone to call when a letter arrives. Filing in person in Dallas or entirely online from anywhere in Texas.",
    href: "/services/tax-preparation",
    linkLabel: "Tax preparation",
  },
  {
    title: "Business owners",
    body: "Books kept current every month and tax strategy that runs all year instead of arriving in April. For established owners, CFO-level insight into profit, margin and cash flow.",
    href: "/services/tax-planning",
    linkLabel: "Tax planning",
  },
  {
    title: "Anyone facing an IRS or state tax problem",
    body: "Unfiled years, an IRS notice, a balance that has grown, or a Texas entity that has fallen out of good standing. We establish the facts, get you compliant, then work the options.",
    href: "/services/irs-tax-problems",
    linkLabel: "IRS tax problems",
  },
];

const WHY_US = [
  {
    title: "Available all year, not just in season",
    body: "Tax questions do not wait for filing season, and neither do IRS deadlines. We answer through the year and stay reachable between engagements.",
  },
  {
    title: "Compliance and accuracy come first",
    body: "Every account is reviewed before a return is filed. Accuracy is not a finishing touch here — it is the thing that prevents the letters, the amendments and the penalties.",
  },
  {
    title: "Secure, whether virtual or in person",
    body: "Documents move through an encrypted client portal with electronic signatures. Meet us in Dallas if you prefer; nothing about the work changes if you never come in.",
  },
  {
    title: "Local Dallas insight, statewide reach",
    body: "We know North Texas business and the Texas Comptroller's requirements first-hand, and we serve clients across the state virtually.",
  },
];

const HOW_WE_WORK = [
  {
    title: "Free discovery call",
    body: "Tell us where things stand. No documents, no preparation, no charge. You will leave the call knowing what you are dealing with.",
  },
  {
    title: "Review and roadmap",
    body: "We look at the returns, the books or the notices, then set out what needs doing, in what order, and what it will cost.",
  },
  {
    title: "We do the work",
    body: "Filing, cleanup, planning or representation — handled, with you kept informed at each step rather than chased for updates.",
  },
  {
    title: "Ongoing support",
    body: "Most clients stay. Books stay current, planning continues through the year, and there is someone to call when something arrives in the post.",
  },
];

export default function HomePage() {
  const featured = posts.slice(0, 3);

  return (
    <>
      <JsonLd data={accountingServiceSchema()} />

      <PageHero
        title="Your Trusted Partner for Tax Relief, Planning, and Precision"
        lede="Tax and accounting services for individuals and business owners in Dallas and across Texas."
        image={IMAGES.homeHero()}
        priority
        size="tall"
      >
        <div className="flex flex-wrap gap-4">
          <a href={site.links.booking} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book a Free Discovery Call
          </a>
          <a href={site.phone.href} className="btn-secondary">
            Call {site.phone.display}
          </a>
        </div>
        <div className="mt-10">
          <TrustStrip />
        </div>
      </PageHero>

      {/* Services */}
      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-moss-dark">What we do</p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-forest sm:text-4xl">
              Tax and accounting, handled properly
            </h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HOME_SERVICES.map((slug, i) => {
              const s = getService(slug);
              if (!s) return null;
              return (
                <Reveal key={slug} delay={i}>
                  <ServiceCard title={s.name} blurb={s.cardBlurb} href={`/services/${s.slug}`} />
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-10">
            <Link href="/services" className="btn-secondary-light">
              View all services
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Who we help */}
      <section className="section bg-mist">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-moss-dark">Who we help</p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-forest sm:text-4xl">
              Different situations, the same standard of care
            </h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {WHO_WE_HELP.map((item, i) => (
              <Reveal key={item.title} delay={i} className="border-t-2 border-moss-dark pt-6">
                <h3 className="font-serif text-xl font-semibold text-forest">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-ink">{item.body}</p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-moss-dark hover:underline"
                >
                  {item.linkLabel} <span aria-hidden="true">&rarr;</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why clients choose us */}
      <section className="on-dark section bg-forest">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-moss">Why clients choose us</p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
              Accuracy that ends in peace of mind
            </h2>
            <span className="accent-rule mt-5" aria-hidden="true" />
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {WHY_US.map((item, i) => (
              <Reveal key={item.title} delay={i} className="rounded-xl bg-white/5 p-7 ring-1 ring-white/10">
                <h3 className="font-serif text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-chalk/85">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section bg-white">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <FounderPortrait />
          </Reveal>

          <Reveal delay={1} className="lg:col-span-7">
            <p className="eyebrow text-moss-dark">Meet the founder</p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-forest sm:text-4xl">
              {site.founder.name}, {site.founder.credential}
            </h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />

            <p className="prose-body mt-6 max-w-prose">
              Hewitt Services is led by {site.founder.name}, an Enrolled Agent — a credential that
              carries federal authority to represent taxpayers before the IRS. The firm was built
              around a straightforward idea: get the details right the first time, and most of what
              people fear about taxes never happens.
            </p>

            <blockquote className="mt-8 border-l-4 border-moss-dark pl-6">
              <p className="font-serif text-xl italic leading-relaxed text-forest">
                &ldquo;{site.founder.quote}&rdquo;
              </p>
              <footer className="mt-3 text-sm text-ink">
                {site.founder.name}, {site.founder.jobTitle}
              </footer>
            </blockquote>

            <Link href="/about" className="btn-secondary-light mt-8">
              More about the firm
            </Link>
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section className="section bg-mist">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-moss-dark">How we work</p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-forest sm:text-4xl">
              Four steps, no surprises
            </h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
          </Reveal>
          <div className="mt-12">
            <ProcessTimeline steps={HOW_WE_WORK} />
          </div>
        </div>
      </section>

      {/*
        ── Firm video slot ─────────────────────────────────────────────────
        The previous site embedded https://www.youtube.com/embed/Db9xL1q1LCY.
        It is NOT rendered here because ownership of that video has not been
        confirmed (see PRELAUNCH.md). Once the client confirms it is theirs,
        drop a lazy-loaded iframe in here:

        <iframe
          src="https://www.youtube.com/embed/Db9xL1q1LCY"
          title="Hewitt Services"
          loading="lazy"
          allowFullScreen
          className="aspect-video w-full rounded-xl"
        />
        ────────────────────────────────────────────────────────────────────
      */}

      <LeadMagnetStrip />

      {/* Reviews */}
      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="mx-auto max-w-3xl">
            <GoogleReviews />
            <p className="mt-6 text-center text-sm">
              <Link href="/reviews" className="font-semibold text-moss-dark hover:underline">
                More about reviews <span aria-hidden="true">&rarr;</span>
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="section bg-mist">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-moss-dark">Questions</p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-forest sm:text-4xl">
              The things people ask first
            </h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1} className="lg:col-span-8">
            <FaqTeaser faqs={homeFaqs} count={4} />
          </Reveal>
        </div>
      </section>

      {/* Blog */}
      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow text-moss-dark">From the blog</p>
              <h2 className="mt-4 font-serif text-3xl font-bold text-forest sm:text-4xl">
                Practical guidance, plainly written
              </h2>
              <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
            </div>
            <Link href="/blog" className="text-sm font-semibold text-moss-dark hover:underline">
              All articles <span aria-hidden="true">&rarr;</span>
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {featured.map((post, i) => (
              <Reveal key={post.slug} delay={i}>
                <BlogCard post={post} cover={postImage(post.slug, post.imageAlt)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
