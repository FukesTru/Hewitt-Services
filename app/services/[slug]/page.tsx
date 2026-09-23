import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CTABand } from "@/components/CTABand";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { Media } from "@/components/Media";
import { PageHero } from "@/components/PageHero";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { CheckList } from "@/components/Prose";
import { RelatedLinks } from "@/components/RelatedLinks";
import { Reveal } from "@/components/Reveal";
import { media } from "@/lib/media";
import { pageMetadata } from "@/lib/seo";
import {
  EPS_STANDING_NOTE,
  getService,
  services,
  serviceSlugs,
} from "@/lib/services";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    image: service.image.src,
    imageAlt: service.image.alt,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  const isRefundAdvance = service.slug === "refund-advances";
  const hero = media(service.image.src, service.image.alt);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: service.name,
            description: service.metaDescription,
            path: `/services/${service.slug}`,
            areaServed:
              service.slug === "franchise-tax-reinstatement"
                ? ["Texas"]
                : ["Dallas", "Fort Worth", "Texas"],
          }),
          faqPageSchema(service.faqs),
          breadcrumbSchema(crumbs),
        ]}
      />

      <PageHero
        title={service.h1}
        lede={service.promise}
        eyebrow="Services"
        crumbs={crumbs}
        image={hero}
        priority
      >
        <div className="flex flex-wrap gap-4">
          <a href={site.links.booking} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book a Free Call
          </a>
          <a href={site.phone.href} className="btn-secondary">
            Call {site.phone.display}
          </a>
        </div>
      </PageHero>

      {service.urgentBanner ? (
        <div className="border-b-2 border-red-800 bg-red-900 text-white">
          <div className="wrap flex flex-wrap items-center justify-between gap-4 py-4">
            <p className="flex items-start gap-3 text-sm font-semibold sm:text-base">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mt-0.5 shrink-0">
                <path d="M10 1.5 19 18H1L10 1.5Zm0 5.5a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1Zm0 8.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" />
              </svg>
              {service.urgentBanner}
            </p>
            <a
              href={site.phone.href}
              className="shrink-0 rounded-full bg-white px-5 py-2 text-sm font-bold text-red-900 transition hover:bg-mist"
            >
              Call {site.phone.display}
            </a>
          </div>
        </div>
      ) : null}

      {/* Intro */}
      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="max-w-prose space-y-6">
            {service.intro.map((para, i) => (
              <p key={i} className="prose-body">
                {para}
              </p>
            ))}
          </Reveal>

          {isRefundAdvance ? (
            <Reveal delay={1} className="mt-10 max-w-prose rounded-lg border-l-4 border-moss-dark bg-mist p-6">
              <p className="text-sm font-semibold text-forest">Important</p>
              <p className="mt-2 text-sm leading-relaxed text-ink">{EPS_STANDING_NOTE}</p>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* What we handle */}
      <section className="section bg-mist">
        <div className="wrap">
          <Reveal>
            <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">What We Handle</h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1} className="mt-10">
            <CheckList items={service.handles} />
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="on-dark section bg-forest">
        <div className="wrap">
          <Reveal>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">How It Works</h2>
            <span className="accent-rule mt-5" aria-hidden="true" />
          </Reveal>
          <div className="mt-12">
            <ProcessTimeline steps={service.steps} tone="dark" />
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="section bg-white">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">Who This Is For</h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
            <p className="prose-body mt-6 max-w-prose">{service.whoFor.lead}</p>
            <ul className="mt-6 space-y-3">
              {service.whoFor.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-base text-ink">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss-dark" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={1} className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-forest">
              <Media media={hero} fill sizes="(min-width: 1024px) 30rem, 100vw" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="section bg-mist">
        <div className="wrap">
          <Reveal>
            <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">
              {service.name}: Common Questions
            </h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1} className="mt-10">
            <FAQAccordion faqs={service.faqs} />
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="section bg-white">
        <div className="wrap">
          <Reveal>
            <RelatedLinks
              slugs={service.related}
              extra={[
                { label: "All frequently asked questions", href: "/faq" },
                { label: "Contact the firm", href: "/contact" },
                { label: "All services", href: "/services" },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <CTABand
        heading={`Talk to us about ${service.name.toLowerCase()}`}
        defaultInterest={
          services.find((s) => s.slug === service.slug)?.name === "Franchise Tax Reinstatement"
            ? "Texas Franchise Tax Reinstatement"
            : service.name
        }
      />

      {isRefundAdvance ? (
        <section className="bg-mist py-10">
          <div className="wrap">
            <p className="max-w-3xl text-xs leading-relaxed text-ink">
              <strong className="font-semibold text-forest">Refund advance disclosure.</strong>{" "}
              {EPS_STANDING_NOTE} See our{" "}
              <Link href="/terms-and-disclaimer" className="underline">
                Terms and Disclaimer
              </Link>{" "}
              for more.
            </p>
          </div>
        </section>
      ) : null}
    </>
  );
}
