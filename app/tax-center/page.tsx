import Link from "next/link";

import { CTABand } from "@/components/CTABand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { IMAGES } from "@/lib/media";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Tax Center: Tools & Due Dates | ${site.name}`,
  description:
    "Free tax organizers, key federal and Texas due dates, refund tracking, IRS transcript and payment links, and record-keeping guidance from Hewitt Services.",
  path: "/tax-center",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Tax Center", path: "/tax-center" },
];

const QUICK_LINKS = [
  {
    label: "Track My Refund",
    href: "https://www.irs.gov/refunds",
    body: "The IRS tool for checking where your federal refund is.",
  },
  {
    label: "Track My Amended Return",
    href: "https://www.irs.gov/filing/wheres-my-amended-return",
    body: "Amended returns are processed separately and take longer.",
  },
  {
    label: "Get IRS Transcripts",
    href: "https://www.irs.gov/individuals/get-transcript",
    body: "Wage, income and account transcripts for prior years.",
  },
  {
    label: "Pay Federal Taxes",
    href: "https://www.irs.gov/payments",
    body: "Direct Pay, card payments and payment plan options.",
  },
  {
    label: "IRS Forms and Publications",
    href: "https://www.irs.gov/forms-instructions-and-publications",
    body: "Current and prior-year federal forms and instructions.",
  },
  {
    label: "State Tax Forms",
    href: "https://taxadmin.org/state-tax-forms/",
    body: "Forms for every state, via the Federation of Tax Administrators.",
  },
  {
    label: "Texas Comptroller",
    href: "https://comptroller.texas.gov/",
    body: "Franchise tax, sales tax and entity account status.",
  },
];

const DATES = [
  { date: "April 15", item: "Individual income tax returns (Form 1040) due, or file an extension" },
  { date: "April 15", item: "First estimated tax payment for the current year" },
  { date: "May 15", item: "Texas franchise tax annual report due" },
  { date: "June 15", item: "Second estimated tax payment" },
  { date: "September 15", item: "Third estimated tax payment" },
  { date: "January 15", item: "Fourth estimated tax payment, for the year just ended" },
];

export default function TaxCenterPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        title="Tax Center: Tools, Due Dates and Resources"
        lede="The organizers, official links and dates our clients ask for most, gathered in one place."
        eyebrow="Resources"
        crumbs={crumbs}
        image={IMAGES.taxCenter()}
        priority
      />

      {/* Downloads */}
      <section id="downloads" className="section scroll-mt-28 bg-white">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">Free downloads</h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
            <p className="prose-body mt-6">
              Our organizers walk through everything to gather before an appointment, so nothing is
              missed and nothing holds up your return.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {[
              {
                title: "Free Tax Organizer",
                sub: "For individuals and families",
                body: "Income documents, deductions and credits, dependants, direct deposit details — the full checklist for a personal return.",
                href: site.downloads.taxOrganizer,
                subject: "Tax%20Organizer%20request",
              },
              {
                title: "Business Tax Organizer",
                sub: "For business owners and the self-employed",
                body: "Revenue and expense categories, assets, payroll, owner draws and the records that support each one.",
                href: site.downloads.businessTaxOrganizer,
                subject: "Business%20Tax%20Organizer%20request",
              },
            ].map((d, i) => (
              <Reveal key={d.title} delay={i} className="flex flex-col rounded-2xl border border-forest/10 bg-mist p-8">
                <p className="eyebrow text-moss-dark">{d.sub}</p>
                <h3 className="mt-3 font-serif text-xl font-semibold text-forest">{d.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink">{d.body}</p>
                {d.href ? (
                  <a href={d.href} download className="btn-primary mt-6 self-start">
                    Download the PDF
                  </a>
                ) : (
                  // PLACEHOLDER: client uploads the PDF, then sets the path in
                  // site.downloads in lib/site.ts.
                  <div className="mt-6">
                    <a href={`mailto:${site.email}?subject=${d.subject}`} className="btn-primary">
                      Request by email
                    </a>
                    <p className="mt-2 text-xs text-ink/70">
                      The download is being finalized — email us and we will send it over.
                    </p>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="section bg-mist">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">Quick links</h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
            <p className="prose-body mt-6">
              Official government tools. We link straight to the source rather than routing you
              through a third party.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {QUICK_LINKS.map((link, i) => (
              <Reveal as="li" key={link.href} delay={i}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-xl border border-forest/10 bg-white p-6 transition hover:-translate-y-1 hover:border-moss-dark hover:shadow-lg hover:shadow-forest/10"
                >
                  <h3 className="font-serif text-base font-semibold text-forest group-hover:text-moss-dark">
                    {link.label}{" "}
                    <span aria-hidden="true" className="text-xs">
                      &#8599;
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink">{link.body}</p>
                </a>
              </Reveal>
            ))}
          </ul>

          {/*
            ── Native calculator slot ──────────────────────────────────────
            The previous site embedded third-party hosted calculators from its
            template platform. They are deliberately not carried over. If the
            firm wants calculators, build them natively and mount them here so
            nothing is loaded from a vendor we do not control.
            ────────────────────────────────────────────────────────────────
          */}
        </div>
      </section>

      {/* Key dates */}
      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">Key tax dates</h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
          </Reveal>

          <Reveal delay={1} className="mt-10 overflow-hidden rounded-xl border border-forest/10">
            <table className="w-full text-left">
              <caption className="sr-only">
                Key federal and Texas tax due dates for a typical year
              </caption>
              <thead className="bg-forest text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 font-serif text-sm font-semibold">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4 font-serif text-sm font-semibold">
                    What is due
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-forest/10 bg-white">
                {DATES.map((d) => (
                  <tr key={`${d.date}-${d.item}`}>
                    <th scope="row" className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-forest">
                      {d.date}
                    </th>
                    <td className="px-6 py-4 text-sm text-ink">{d.item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>

          <Reveal className="mt-6">
            <p className="max-w-prose rounded-lg border-l-4 border-moss-dark bg-mist p-5 text-sm leading-relaxed text-ink">
              Dates can shift when they fall on a weekend or holiday. Confirm current-year dates with
              us or the IRS.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Record keeping */}
      <section className="section bg-mist">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">
              How long should you keep tax records?
            </h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
          </Reveal>

          <Reveal delay={1} className="lg:col-span-7">
            <div className="max-w-prose space-y-5">
              <p className="prose-body">
                As a general rule, keep records supporting a return for at least three years from the
                date you filed it. That covers the period in which most returns can be examined or
                amended.
              </p>
              <p className="prose-body">
                Some situations call for longer. Records relating to property are generally worth
                keeping until several years after you dispose of it, because they establish your
                basis. Certain circumstances — substantially understated income among them — extend
                the period further.
              </p>
              <p className="prose-body">
                If a return was never filed at all, keep the records indefinitely. There is no
                closing point to count from, and those records are exactly what makes filing that
                year possible later.
              </p>
              <p className="rounded-lg border-l-4 border-moss-dark bg-white p-5 text-sm leading-relaxed text-ink">
                General guidance only. Ask us about your situation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="bg-white py-12">
        <div className="wrap">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {[
              { label: "Tax preparation", href: "/services/tax-preparation" },
              { label: "IRS tax problems", href: "/services/irs-tax-problems" },
              { label: "Frequently asked questions", href: "/faq" },
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

      <CTABand heading="Need help with any of this?" />
    </>
  );
}
