import Link from "next/link";

import { CTABand } from "@/components/CTABand";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { MapEmbed } from "@/components/MapEmbed";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { IMAGES } from "@/lib/media";
import { accountingServiceSchema, breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import type { Faq } from "@/lib/services";

export const metadata = pageMetadata({
  title: `Tax Solutions in Dallas, TX | ${site.name}`,
  description:
    "Tax planning, bookkeeping, IRS help and franchise tax compliance at our Dallas office on Estate Ln. In-person or virtual. Book your free discovery call.",
  path: "/tax-solutions-in-dallas",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Dallas, TX", path: "/tax-solutions-in-dallas" },
];

const PILLARS = [
  {
    title: "Entity structuring",
    body: "How your business is organized decides how profit is taxed and what you can pay yourself. Structures chosen at formation are rarely revisited, and businesses outgrow them.",
    href: "/services/tax-planning",
  },
  {
    title: "Income optimization",
    body: "When income lands, when expenses are incurred and how estimated payments are set are all still decisions, right up until December 31.",
    href: "/services/tax-planning",
  },
  {
    title: "Back tax cleanup",
    body: "Nothing else can be planned properly on top of unfiled years. Getting compliant is the foundation, and it is usually quicker than people expect.",
    href: "/services/back-taxes-compliance",
  },
  {
    title: "Texas franchise tax reinstatement",
    body: "A forfeited entity surfaces at the worst moment: a sale, a loan, a contract. We file what is missing and restore good standing.",
    href: "/services/franchise-tax-reinstatement",
  },
];

const DALLAS_FAQS: Faq[] = [
  {
    q: "What are the signs I need professional tax help in Dallas?",
    a: "An IRS letter you do not fully understand. A balance you cannot pay at once. Returns you have not filed. Books more than a month or two behind. A tax bill that arrives as a surprise every April. Any one of those is worth a conversation; together they are a clear signal.",
  },
  {
    q: "How does an integrated approach help a small business?",
    a: "When bookkeeping, planning and filing sit with one firm, the numbers recorded in March are the same numbers your strategy is built on in October and your return is built on in April. Nothing is re-keyed, nothing is lost in translation, and nobody is guessing at somebody else's categories.",
  },
  {
    q: "What should I do if the IRS has issued a levy?",
    a: "Call us the same day if you can, because levies run on short timelines and the window to respond is measured in days rather than weeks. We review the notice, confirm whether the required procedures were followed, file anything missing, and seek a release or alternative arrangement where your facts support one.",
    link: { label: "IRS Tax Problems", href: "/services/irs-tax-problems" },
  },
  {
    q: "Why choose monthly bookkeeping over an annual cleanup?",
    a: "A cleanup reconstructs a year nobody remembers clearly, under deadline pressure. Monthly bookkeeping records it as it happens, so questions get answered while the details are fresh and you have usable numbers during the year rather than a report that arrives too late to act on.",
    link: { label: "Monthly Bookkeeping", href: "/services/monthly-bookkeeping" },
  },
  {
    q: "Can you help if I have lost my records?",
    a: "Usually, yes. With your authorization we can request IRS wage and income transcripts showing much of what was reported under your Social Security number in prior years. Combined with bank and card statements, that is often enough to prepare accurate returns for years whose paperwork is long gone.",
  },
  {
    q: "Is your service virtual or in person?",
    a: "Both, and you choose. Clients in Dallas and the wider DFW area are welcome at the Estate Lane office. Clients elsewhere in Texas work with us entirely through the secure portal and scheduled calls. Many people meet in person once a year and handle everything else remotely.",
  },
];

export default function DallasPage() {
  return (
    <>
      <JsonLd
        data={[
          accountingServiceSchema({ includeMap: true }),
          faqPageSchema(DALLAS_FAQS),
          breadcrumbSchema(crumbs),
        ]}
      />

      <PageHero
        title="Tax Solutions in Dallas, TX"
        lede="Bookkeeping, planning, filing and IRS representation from one firm on Estate Lane, in person or entirely online."
        eyebrow="Dallas, Texas"
        crumbs={crumbs}
        image={IMAGES.dallasHero()}
        priority
      >
        <div className="flex flex-wrap gap-4">
          <a href={site.links.booking} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book a Free Discovery Call
          </a>
          <a href={site.phone.href} className="btn-secondary">
            Call {site.phone.display}
          </a>
        </div>
      </PageHero>

      {/* Intro */}
      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="max-w-prose space-y-5">
            <p className="prose-body">
              Dallas runs on small and mid-size businesses: trades, clinics, agencies, restaurants,
              consultancies, family firms that have been here three generations. What they have in
              common is owners doing the work and the admin at the same time, with the admin
              generally losing.
            </p>
            <p className="prose-body">
              Our office is on Estate Lane in North Dallas, and we work with clients across North
              Texas and the rest of the state. Some come in and sit down. Most do not, and their work
              is handled identically through the secure portal.
            </p>
            <p className="prose-body">
              The approach is the same whichever way you work with us: accuracy first, peace of mind
              after. Get the records right, file what is genuinely owed and nothing more, deal with
              problems while they are still small. Most of what people dread about tax (the letters,
              the penalties, the amended returns) traces back to something that was not checked
              carefully enough the first time.
            </p>
            <p className="prose-body">
              We are candid about what we can and cannot do. Nobody here will promise you an outcome
              with the IRS before we know your facts, or a saving before we have seen your numbers.
              What you will get is a clear account of where you stand and what we would do about it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Once-a-year vs integrated */}
      <section className="section bg-mist">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-forest/10 bg-white p-8">
            <h2 className="font-serif text-2xl font-bold text-forest sm:text-3xl">
              Why the once-a-year approach falls short
            </h2>
            <span className="accent-rule mt-4 bg-moss-dark" aria-hidden="true" />
            <ul className="mt-6 space-y-4 text-base leading-relaxed text-ink">
              {[
                "By the time the return is prepared, every decision that shaped the bill has already been made.",
                "A year reconstructed from bank statements loses the detail that supports deductions.",
                "Errors made in month two repeat for ten more months before anyone looks.",
                "Problems like an unfiled year or a franchise tax lapse go unnoticed until they escalate.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss-dark" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={1} className="on-dark rounded-2xl bg-forest p-8">
            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
              Why an integrated approach works
            </h2>
            <span className="accent-rule mt-4" aria-hidden="true" />
            <ul className="mt-6 space-y-4 text-base leading-relaxed text-chalk">
              {[
                "Bookkeeping produces current numbers, so planning is based on reality rather than last year.",
                "Planning shapes the year while there is still time for choices to matter.",
                "Filing draws on records that were built correctly in the first place.",
                "If the IRS does get in touch, the firm answering already knows your file.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Compliance to wealth preservation */}
      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">
              From compliance to wealth preservation
            </h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
            <p className="prose-body mt-6">
              Compliance reports what already happened. Preservation is about deciding what happens
              next. These four pieces are where most of the difference is made.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i}>
                <Link
                  href={p.href}
                  className="group block h-full rounded-xl border border-forest/10 bg-mist p-7 transition hover:-translate-y-1 hover:border-moss-dark hover:shadow-lg hover:shadow-forest/10"
                >
                  <h3 className="font-serif text-lg font-semibold text-forest group-hover:text-moss-dark">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink">{p.body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* All services */}
      <section className="section bg-mist">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">
              Services available from our Dallas office
            </h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i}>
                <ServiceCard title={s.name} blurb={s.cardBlurb} href={`/services/${s.slug}`} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Office */}
      <section className="section bg-white">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">Our Dallas office</h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />

            <address className="mt-8 space-y-4 text-base not-italic text-ink">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-forest">Address</p>
                <p className="mt-1">
                  {site.address.streetName}, {site.address.unit}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-forest">Phone</p>
                <p className="mt-1">
                  <a href={site.phone.href} className="text-moss-dark underline">
                    {site.phone.display}
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-forest">Email</p>
                <p className="mt-1">
                  <a href={`mailto:${site.email}`} className="text-moss-dark underline">
                    {site.email}
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-forest">Hours</p>
                {/* PLACEHOLDER: business hours to be supplied by the client. */}
                <p className="mt-1">{site.hours ?? site.hoursPlaceholder}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-forest">
                  In person or virtual
                </p>
                <p className="mt-1">
                  Appointments at the office, or secure virtual appointments anywhere in Texas.
                </p>
              </div>
            </address>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Book an appointment
              </Link>
              <a
                href={site.maps.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-light"
              >
                Get directions
              </a>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <MapEmbed height={460} />
          </Reveal>
        </div>
      </section>

      {/* Local resources */}
      <section className="section bg-mist">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-2xl font-bold text-forest sm:text-3xl">
              Texas and federal tax resources
            </h2>
            <span className="accent-rule mt-4 bg-moss-dark" aria-hidden="true" />
            <p className="mt-4 text-base text-ink">
              Official sources, straight from the agencies themselves.
            </p>
          </Reveal>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Texas Comptroller of Public Accounts", href: "https://comptroller.texas.gov/" },
              { label: "Texas franchise tax information", href: "https://comptroller.texas.gov/taxes/franchise/" },
              { label: "IRS: Where's My Refund?", href: "https://www.irs.gov/refunds" },
              { label: "IRS: Get Transcript", href: "https://www.irs.gov/individuals/get-transcript" },
              { label: "IRS: Make a Payment", href: "https://www.irs.gov/payments" },
              { label: "IRS: Forms and Publications", href: "https://www.irs.gov/forms-instructions-and-publications" },
            ].map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-forest/10 bg-white p-4 text-sm font-medium text-forest transition hover:border-moss-dark hover:text-moss-dark"
                >
                  {r.label}{" "}
                  <span aria-hidden="true" className="text-xs">
                    &#8599;
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">
              Dallas tax questions, answered
            </h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1} className="mt-10">
            <FAQAccordion faqs={DALLAS_FAQS} />
          </Reveal>
        </div>
      </section>

      <CTABand heading="Book a free discovery call in Dallas" />
    </>
  );
}
