import Link from "next/link";

import { CTABand } from "@/components/CTABand";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { IMAGES } from "@/lib/media";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";
import type { Faq } from "@/lib/services";

export const metadata = pageMetadata({
  title: `Tax Services in Fort Worth, TX | ${site.name}`,
  description:
    "Fort Worth business owners and families: get tax planning, bookkeeping, back tax filing and IRS help from a Dallas-based EA, virtual or in person.",
  path: "/fort-worth-tax-services",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Fort Worth, TX", path: "/fort-worth-tax-services" },
];

const FW_SERVICES = [
  "tax-planning",
  "tax-preparation",
  "monthly-bookkeeping",
  "back-taxes-compliance",
  "irs-tax-problems",
  "franchise-tax-reinstatement",
];

const STEPS = [
  {
    title: "Book a call",
    body: "Pick a time online or call us. The first conversation is free, runs about half an hour, and needs nothing from you but a description of the situation.",
  },
  {
    title: "Upload securely",
    body: "Your documents go into the encrypted client portal from wherever you are. Nothing sensitive travels by email, and you keep access to everything filed on your behalf.",
  },
  {
    title: "Meet virtually, or in Dallas",
    body: "Most Fort Worth clients work with us entirely by video and phone. If you would rather sit down in person, the Dallas office is there for you.",
  },
];

const FW_FAQS: Faq[] = [
  {
    q: "Do you have an office in Fort Worth?",
    a: "No. Our office is in Dallas, and we serve Fort Worth and Tarrant County clients through secure virtual appointments. We would rather say that plainly than list an address we do not keep. If you prefer to meet in person, you are welcome at the Dallas office.",
  },
  {
    q: "Is working with you remotely any different from coming in?",
    a: "The work is identical. Documents go through the same encrypted portal, returns are reviewed with you on a call before anything is filed, and signatures are electronic. The main practical difference is that you keep the time you would have spent driving across the metroplex.",
  },
  {
    q: "Can you represent a Fort Worth client before the IRS?",
    a: "Yes. The Enrolled Agent credential carries federal authority, so representation is not limited by city or state. Once you sign the authorization, we handle IRS correspondence and calls for you wherever in Texas you are based.",
    link: { label: "IRS Tax Problems", href: "/services/irs-tax-problems" },
  },
  {
    q: "How do I get documents to you if I never visit?",
    a: "Through the client portal, from a phone or a laptop. Photographs of paper documents are fine as long as they are legible. If something has to arrive on paper, we will tell you and arrange it — but for almost everyone, that never comes up.",
  },
];

export default function FortWorthPage() {
  return (
    <>
      <JsonLd
        data={[
          // Service, not AccountingService: the firm serves Fort Worth but has
          // no premises there, so no street address is claimed for this page.
          serviceSchema({
            name: "Tax and accounting services for Fort Worth, TX",
            description:
              "Tax planning, bookkeeping, tax preparation, back tax filing and IRS representation for clients in Fort Worth and Tarrant County, delivered virtually from Dallas.",
            path: "/fort-worth-tax-services",
            areaServed: ["Fort Worth", "Tarrant County"],
          }),
          faqPageSchema(FW_FAQS),
          breadcrumbSchema(crumbs),
        ]}
      />

      <PageHero
        title="Tax Services for Fort Worth, TX Clients"
        lede="An Enrolled Agent on your side, working with you from across the metroplex — securely, and without the drive."
        eyebrow="Fort Worth, Texas"
        crumbs={crumbs}
        image={IMAGES.fortWorthHero()}
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
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <div className="max-w-prose space-y-5">
              <p className="prose-body">
                Fort Worth has its own commercial character, and Tarrant County businesses tend to
                reflect it: independent, long-established, often family-run, frequently operating in
                trades, logistics, energy services and construction where the paperwork multiplies
                faster than anyone plans for.
              </p>
              <p className="prose-body">
                Hewitt Services is a Dallas firm. We say that plainly because plenty of firms list a
                Fort Worth address they do not actually keep, and you should know who you are
                dealing with. What we do have is an Enrolled Agent whose authority to represent
                taxpayers before the IRS is federal, so it does not stop at a county line, and a
                practice built to work remotely from the start.
              </p>
              <p className="prose-body">
                For Tarrant County clients that works out well. Your documents go through the
                encrypted client portal. Your return is reviewed with you on a call, line by line,
                before anything is filed. Your signature is electronic. Nothing about the standard of
                the work depends on you driving east on I-30.
              </p>
              <p className="prose-body">
                And if you would rather meet face to face, the Dallas office on Estate Lane is open
                to you.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1} className="lg:col-span-4">
            <div className="rounded-2xl border border-gold-dark/25 bg-ivory p-7">
              <h2 className="font-serif text-lg font-semibold text-navy">
                How we serve Fort Worth
              </h2>
              <ul className="mt-5 space-y-4 text-sm leading-relaxed text-ink">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dark" />
                  Secure virtual appointments across Tarrant County
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dark" />
                  In-person meetings at our Dallas office
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dark" />
                  {/* PLACEHOLDER: client to confirm whether in-person meetings
                      are offered in Fort Worth itself. Until confirmed, this
                      page must not claim a Fort Worth location. */}
                  In-person in Fort Worth by appointment — ask us when you call
                </li>
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-ink/70">
                Hewitt Services does not maintain an office in Fort Worth. Our premises are at{" "}
                {site.address.full}.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-ivory">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-navy sm:text-4xl">
              Services for Fort Worth clients
            </h2>
            <span className="accent-rule mt-5 bg-gold-dark" aria-hidden="true" />
            <p className="prose-body mt-6">
              Everything the firm does is available to Tarrant County clients, with tax planning and
              IRS representation the two that Fort Worth business owners ask about most.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FW_SERVICES.map((slug, i) => {
              const s = getService(slug);
              if (!s) return null;
              return (
                <Reveal key={slug} delay={i}>
                  <ServiceCard title={s.name} blurb={s.cardBlurb} href={`/services/${s.slug}`} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Working with us */}
      <section className="on-dark section bg-navy">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Working with us from Fort Worth
            </h2>
            <span className="accent-rule mt-5" aria-hidden="true" />
          </Reveal>
          <div className="mt-12">
            <ProcessTimeline steps={STEPS} tone="dark" />
          </div>
        </div>
      </section>

      {/* Dallas office details */}
      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="grid gap-10 rounded-2xl border border-navy/10 bg-ivory p-8 sm:p-10 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl font-bold text-navy sm:text-3xl">
                If you would rather meet in person
              </h2>
              <span className="accent-rule mt-4 bg-gold-dark" aria-hidden="true" />
              <address className="mt-6 space-y-1 text-base not-italic text-ink">
                <p className="font-semibold text-navy">{site.name}</p>
                <p>
                  {site.address.streetName}, {site.address.unit}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </p>
                <p className="pt-2">
                  <a href={site.phone.href} className="text-gold-dark underline">
                    {site.phone.display}
                  </a>
                </p>
              </address>
              <p className="mt-4 text-sm text-ink/80">
                The office is in North Dallas, reachable across the metroplex by car. Journey times
                vary considerably with traffic, so allow for it and let us know if you are running
                late — it is not a problem.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <a
                href={site.maps.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Open the office in Google Maps
              </a>
              <Link href="/tax-solutions-in-dallas" className="btn-secondary-light">
                See our Dallas page
              </Link>
              <p className="text-xs text-ink/70">
                {/* PLACEHOLDER: hours to be supplied by the client. */}
                Hours: {site.hours ?? site.hoursPlaceholder}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-ivory">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-navy sm:text-4xl">
              Questions from Fort Worth clients
            </h2>
            <span className="accent-rule mt-5 bg-gold-dark" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1} className="mt-10">
            <FAQAccordion faqs={FW_FAQS} />
          </Reveal>

          <Reveal className="mt-10">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {[
                { label: "Our Dallas office", href: "/tax-solutions-in-dallas" },
                { label: "Tax planning", href: "/services/tax-planning" },
                { label: "IRS tax problems", href: "/services/irs-tax-problems" },
                { label: "Contact us", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-semibold text-gold-dark hover:underline">
                    {l.label} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTABand heading="Fort Worth clients: let's talk" />
    </>
  );
}
