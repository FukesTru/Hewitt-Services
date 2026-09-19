import Link from "next/link";

import { CTABand } from "@/components/CTABand";
import { FounderPortrait } from "@/components/FounderPortrait";
import { JsonLd } from "@/components/JsonLd";
import { Media } from "@/components/Media";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { IMAGES } from "@/lib/media";
import { accountingServiceSchema, breadcrumbSchema, personSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `About Demarcus Hewitt, EA | ${site.name}`,
  description:
    "Meet Demarcus Hewitt, EA, founder of Hewitt Services. Dallas tax and accounting help for business owners and individuals, in person or virtual across Texas.",
  path: "/about",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const APPROACH = [
  {
    title: "Accuracy",
    body: "Every account reviewed, every figure traced to something real. Most of the trouble people have with the IRS begins as a small error nobody checked.",
  },
  {
    title: "Clear communication",
    body: "Plain English, not jargon. You should understand what we are doing and why well enough to explain it to someone else.",
  },
  {
    title: "Proactive strategy",
    body: "Planning through the year rather than reporting after it. By April, almost every decision that shaped the bill has already been made.",
  },
  {
    title: "Long-term support",
    body: "Most of our work is ongoing. We would rather keep your books right all year than rescue them each spring.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[personSchema(), accountingServiceSchema(), breadcrumbSchema(crumbs)]} />

      <PageHero
        title="About Hewitt Services and Demarcus Hewitt, EA"
        lede="A Dallas tax and accounting firm built on getting the details right the first time."
        eyebrow="About"
        crumbs={crumbs}
        image={IMAGES.aboutOffice()}
        priority
      />

      {/* The firm */}
      <section className="section bg-white">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="font-serif text-3xl font-bold text-navy sm:text-4xl">The firm</h2>
            <span className="accent-rule mt-5 bg-gold-dark" aria-hidden="true" />

            <div className="mt-6 max-w-prose space-y-5">
              <p className="prose-body">
                Hewitt Services is based in the Dallas-Fort Worth area and serves clients across
                Texas virtually. The office is on Estate Lane in Dallas; a good share of our clients
                have never been there, and their work is handled exactly the same way.
              </p>
              <p className="prose-body">
                Three things make up most of what we do. Back tax cleanup, for people with one
                unfiled year or a decade of them. IRS problem solving, from a first letter through
                audits, balances and enforcement. And proactive tax planning for business owners who
                want CFO-level insight rather than a return prepared once a year in silence.
              </p>
              <p className="prose-body">
                Alongside that, we prepare individual and family returns, keep monthly books, restore
                Texas entities to good standing with the Comptroller, and help eligible clients
                access refund advances through EPS Financial.
              </p>
              <p className="prose-body">
                The promise behind all of it is simple enough to hold us to: accuracy that ends in
                peace of mind.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1} className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-navy">
              <Media media={IMAGES.aboutOffice()} fill sizes="(min-width: 1024px) 30rem, 100vw" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Founder */}
      <section className="section bg-ivory">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy">
              <FounderPortrait />
            </div>
          </Reveal>

          <Reveal delay={1} className="lg:col-span-7">
            <p className="eyebrow text-gold-dark">Founder</p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-navy sm:text-4xl">
              {site.founder.name}
            </h2>
            <p className="mt-2 text-lg text-ink">
              {site.founder.jobTitle} ({site.founder.credential})
            </p>
            <span className="accent-rule mt-5 bg-gold-dark" aria-hidden="true" />

            <blockquote className="mt-8 border-l-4 border-gold-dark pl-6">
              <p className="font-serif text-xl italic leading-relaxed text-navy sm:text-2xl">
                &ldquo;{site.founder.quote}&rdquo;
              </p>
              <footer className="mt-4 text-sm text-ink">
                {site.founder.name}, {site.founder.jobTitle}
              </footer>
            </blockquote>

            <p className="prose-body mt-8 max-w-prose">
              That sentence describes the whole practice. Reducing liability for business owners means
              planning ahead of the year rather than reporting on it. Maximising refunds for
              individuals means asking the questions that surface the credits and deductions people
              did not know to mention.
            </p>

            {/*
              PLACEHOLDER — client to supply, if they wish to publish them:
                • years of experience
                • education and qualifications beyond the EA credential
                • prior employers or practice history
                • awards, memberships, client numbers
              Nothing above is stated because none of it has been confirmed.
              Do not add any of these without written confirmation from the firm.
            */}
          </Reveal>
        </div>
      </section>

      {/* What is an EA */}
      <section className="on-dark section bg-navy">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              What is an Enrolled Agent?
            </h2>
            <span className="accent-rule mt-5" aria-hidden="true" />
          </Reveal>

          <Reveal delay={1} className="lg:col-span-7 space-y-5">
            <p className="text-base leading-relaxed text-chalk sm:text-lg">
              An Enrolled Agent is a tax practitioner authorized by the federal government to
              represent taxpayers before the Internal Revenue Service. The credential is granted by
              the IRS itself, and it is the only one that comes with unlimited rights to represent
              taxpayers on federal tax matters, whichever state they live in.
            </p>
            <p className="text-base leading-relaxed text-chalk sm:text-lg">
              In practice, it means that once you sign an authorization form, an EA can speak with the
              IRS on your behalf — request your records, respond to notices, and represent you in an
              audit or collection matter — rather than relaying everything through you.
            </p>
            <p className="text-sm leading-relaxed text-chalk/75">
              Hewitt Services is a tax and accounting practice. It is not a law firm and does not
              provide legal advice, and it is not a CPA firm.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-navy sm:text-4xl">Our approach</h2>
            <span className="accent-rule mt-5 bg-gold-dark" aria-hidden="true" />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {APPROACH.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i}
                className="rounded-xl border border-navy/10 bg-ivory p-7"
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-serif text-base font-bold text-gold"
                >
                  {i + 1}
                </span>
                <h3 className="mt-5 font-serif text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we work with you */}
      <section className="section bg-ivory">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-3xl font-bold text-navy sm:text-4xl">
              How we work with you
            </h2>
            <span className="accent-rule mt-5 bg-gold-dark" aria-hidden="true" />
            <p className="prose-body mt-6 max-w-prose">
              You choose how this runs. Clients in Dallas and the wider DFW area are welcome to sit
              down with us in person. Clients elsewhere in Texas work with us entirely remotely, and
              nothing about the standard of the work changes either way.
            </p>
            <p className="prose-body mt-4 max-w-prose">
              Documents are uploaded through our secure client portal, not sent as email attachments,
              and returns are signed electronically. You keep access to everything we file for you.
            </p>
            <a
              href={site.links.portal}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-light mt-8"
            >
              Client Login
            </a>
          </Reveal>

          <Reveal delay={1} className="rounded-2xl border border-navy/10 bg-white p-8">
            <h3 className="font-serif text-xl font-semibold text-navy">Working with us means</h3>
            <ul className="mt-6 space-y-4">
              {[
                "Virtual appointments anywhere in Texas, or in person in Dallas",
                "Secure document upload and electronic signature",
                "A named person who knows your file, not a queue",
                "Year-round availability, not seasonal opening hours",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dark" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Referrals */}
      <section id="referrals" className="section bg-white scroll-mt-28">
        <div className="wrap">
          <Reveal className="mx-auto max-w-3xl rounded-2xl border border-gold-dark/25 bg-ivory p-8 text-center sm:p-12">
            <h2 className="font-serif text-3xl font-bold text-navy">Referrals are welcome</h2>
            <span className="accent-rule mx-auto mt-5 bg-gold-dark" aria-hidden="true" />
            <p className="prose-body mx-auto mt-6 max-w-2xl">
              This firm has grown mostly the quiet way — one client telling someone else that the
              work was done properly. If we have helped you, and you know someone in the same spot,
              we would be glad to talk to them.
            </p>
            <p className="prose-body mx-auto mt-4 max-w-2xl">
              There is nothing to fill in. Send them our way, or introduce us by email and we will
              take it from there.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Make an introduction
              </Link>
              <a href={`mailto:${site.email}?subject=Referral`} className="btn-secondary-light">
                Email {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="bg-ivory py-12">
        <div className="wrap">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              { label: "Our services", href: "/services" },
              { label: "IRS tax problems", href: "/services/irs-tax-problems" },
              { label: "Client reviews", href: "/reviews" },
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

      <CTABand heading="Work with an Enrolled Agent" />
    </>
  );
}
