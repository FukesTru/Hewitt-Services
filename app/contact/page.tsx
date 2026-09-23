import Link from "next/link";

import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { ContactForm } from "@/components/ContactForm";
import { FaqTeaser } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { MapEmbed } from "@/components/MapEmbed";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { homeFaqs } from "@/lib/faqs";
import { IMAGES } from "@/lib/media";
import { accountingServiceSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Contact ${site.name} | Free Discovery Call`,
  description:
    "Call (972) 591-0008 or book online. Hewitt Services, 10935 Estate Ln Ste 124, Dallas, TX 75238. Free discovery call for tax, bookkeeping and IRS help.",
  path: "/contact",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

const EXPECT = [
  {
    title: "You describe the situation",
    body: "No documents, no preparation. Just tell us where things stand — including the parts you would rather not say out loud. We have heard it before.",
  },
  {
    title: "We tell you what we would do",
    body: "What needs doing, in what order, roughly how long it takes and what it costs. If the answer is that you do not need us, we will say that instead.",
  },
  {
    title: "You decide, later",
    body: "Nothing is signed on the call and nothing is sold to you. Take the information away and think about it.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[accountingServiceSchema(), breadcrumbSchema(crumbs)]} />

      <PageHero
        title="Contact Hewitt Services"
        lede="Book your free discovery call — half an hour, no charge, and no obligation at the end of it."
        eyebrow="Get in touch"
        crumbs={crumbs}
        image={IMAGES.contact()}
        priority
      >
        <div className="flex flex-wrap gap-4">
          <a href={site.phone.href} className="btn-primary">
            Call {site.phone.display}
          </a>
          <a href={`mailto:${site.email}`} className="btn-secondary">
            Email us
          </a>
        </div>
      </PageHero>

      {/* Booking + form */}
      <section className="section bg-white">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-2xl font-bold text-forest sm:text-3xl">
              Book a time that suits you
            </h2>
            <span className="accent-rule mt-4 bg-moss-dark" aria-hidden="true" />
            <p className="mt-4 text-base leading-relaxed text-ink">
              Pick a slot directly in our calendar. You will get a confirmation straight away.
            </p>
            <div className="mt-8">
              <CalendlyEmbed />
            </div>
          </Reveal>

          <Reveal delay={1}>
            <h2 className="font-serif text-2xl font-bold text-forest sm:text-3xl">
              Or send us a message
            </h2>
            <span className="accent-rule mt-4 bg-moss-dark" aria-hidden="true" />
            <p className="mt-4 text-base leading-relaxed text-ink">
              Tell us a little about what you need and we will come back to you. Fields marked * are
              required.
            </p>
            <div className="mt-8 rounded-2xl border border-forest/10 bg-mist p-6 sm:p-8">
              <ContactForm id="contact-page-form" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Details + map */}
      <section className="section bg-mist">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-2xl font-bold text-forest sm:text-3xl">Our details</h2>
            <span className="accent-rule mt-4 bg-moss-dark" aria-hidden="true" />

            <address className="mt-8 space-y-5 text-base not-italic text-ink">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-forest">Address</p>
                <p className="mt-1">
                  {site.name}
                  <br />
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
            </address>

            {/* Existing client */}
            <div className="mt-10 rounded-xl border border-moss-dark/30 bg-white p-6">
              <h3 className="font-serif text-lg font-semibold text-forest">Existing client?</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                Upload documents, sign returns and check on your work through the secure portal.
              </p>
              <a
                href={site.links.portal}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-light mt-5"
              >
                Client Login
              </a>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <MapEmbed height={520} />
            <p className="mt-4 text-sm">
              <Link href="/tax-solutions-in-dallas" className="font-semibold text-moss-dark hover:underline">
                More about our Dallas office <span aria-hidden="true">&rarr;</span>
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* What to expect */}
      <section className="on-dark section bg-forest">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              What to expect on your call
            </h2>
            <span className="accent-rule mt-5" aria-hidden="true" />
          </Reveal>

          <ol className="mt-12 grid gap-8 lg:grid-cols-3">
            {EXPECT.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i}>
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-moss font-serif text-lg font-bold text-forest"
                >
                  {i + 1}
                </span>
                <h3 className="mt-5 font-serif text-lg font-semibold text-white">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-chalk/85">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="section bg-white">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="font-serif text-2xl font-bold text-forest sm:text-3xl">Before you call</h2>
            <span className="accent-rule mt-4 bg-moss-dark" aria-hidden="true" />
            <p className="mt-4 text-base leading-relaxed text-ink">
              A few things people usually want to know first.
            </p>
          </Reveal>
          <Reveal delay={1} className="lg:col-span-8">
            <FaqTeaser faqs={homeFaqs} count={3} />
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-12">
        <div className="wrap">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              { label: "Our services", href: "/services" },
              { label: "Frequently asked questions", href: "/faq" },
              { label: "Tax solutions in Dallas", href: "/tax-solutions-in-dallas" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-semibold text-moss-dark hover:underline">
                  {l.label} <span aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
