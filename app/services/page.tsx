import Link from "next/link";

import { CTABand } from "@/components/CTABand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { IMAGES } from "@/lib/media";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Tax & Accounting Services Dallas | ${site.name}`,
  description:
    "Explore Hewitt Services: bookkeeping, tax planning, tax prep, back taxes, IRS problem resolution, franchise tax reinstatement and refund advances in Dallas.",
  path: "/services",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

const GROUPS = [
  {
    heading: "Stay organized",
    blurb: "Know where the business stands, month by month, instead of finding out in April.",
    slugs: ["monthly-bookkeeping"],
  },
  {
    heading: "Plan and save",
    blurb: "Decide what happens next, then file a return that reflects those decisions accurately.",
    slugs: ["tax-planning", "tax-preparation"],
  },
  {
    heading: "Get compliant and resolve",
    blurb: "Unfiled years, IRS enforcement and forfeited Texas entities, brought back into order.",
    slugs: ["back-taxes-compliance", "irs-tax-problems", "franchise-tax-reinstatement"],
  },
  {
    heading: "Get your refund sooner",
    blurb: "For eligible clients filing with us, an advance through EPS Financial may be an option.",
    slugs: ["refund-advances"],
  },
];

const HELPER = [
  {
    q: "Got an IRS letter?",
    a: "Deadlines matter, and they start from the date on the notice. Start here.",
    href: "/services/irs-tax-problems",
    label: "IRS Tax Problems",
  },
  {
    q: "Years of unfiled returns?",
    a: "Filing comes before any conversation about a balance. Start here.",
    href: "/services/back-taxes-compliance",
    label: "Back Taxes and Compliance",
  },
  {
    q: "Books behind, or never set up?",
    a: "Clean up the history first, then keep it current. Start here.",
    href: "/services/monthly-bookkeeping",
    label: "Monthly Bookkeeping",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          itemListSchema(services.map((s) => ({ name: s.name, path: `/services/${s.slug}` }))),
        ]}
      />

      <PageHero
        title="Tax and Accounting Services in Dallas, TX"
        lede="Seven services, one firm, and no hand-offs between the people who keep your books and the people who file your return."
        eyebrow="Services"
        crumbs={crumbs}
        image={IMAGES.dallasHero()}
        priority
      />

      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="max-w-prose space-y-5">
            <p className="prose-body">
              Most firms make you choose between a bookkeeper who does not think about tax and a
              preparer who sees your numbers once a year. We do both, which means the records built
              during the year are the same records your planning and your return are built on.
            </p>
            <p className="prose-body">
              Below, the services are grouped by what you are actually trying to do rather than by
              what the profession calls them. If you are not sure where you fit, the three questions
              further down will point you to the right page in one click. Or call us and we will
              tell you in two minutes.
            </p>
          </Reveal>
        </div>
      </section>

      {GROUPS.map((group, gi) => (
        <section key={group.heading} className={gi % 2 === 0 ? "section bg-mist" : "section bg-white"}>
          <div className="wrap">
            <Reveal className="max-w-2xl">
              <h2 className="font-serif text-2xl font-bold text-forest sm:text-3xl">{group.heading}</h2>
              <span className="accent-rule mt-4 bg-moss-dark" aria-hidden="true" />
              <p className="mt-4 text-base leading-relaxed text-ink">{group.blurb}</p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.slugs.map((slug, i) => {
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
      ))}

      {/* Helper */}
      <section className="on-dark section bg-forest">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              Not sure where to start?
            </h2>
            <span className="accent-rule mt-5" aria-hidden="true" />
            <p className="mt-6 text-base leading-relaxed text-chalk sm:text-lg">
              Three questions that cover most of what brings people here.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {HELPER.map((item, i) => (
              <Reveal key={item.q} delay={i}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-xl border border-white/15 bg-white/5 p-7 transition hover:-translate-y-1 hover:border-moss/60 hover:bg-white/10"
                >
                  <h3 className="font-serif text-xl font-semibold text-white group-hover:text-moss">
                    {item.q}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-chalk/85">{item.a}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-moss">
                    {item.label}
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <p className="text-sm text-chalk/80">
              Still unsure?{" "}
              <Link href="/faq" className="font-semibold text-moss underline">
                Read the FAQ
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="font-semibold text-moss underline">
                contact us
              </Link>
              . The first call is free and nothing is decided on it.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand heading="Tell us what you need" />
    </>
  );
}
