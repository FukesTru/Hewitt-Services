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
  title: `Remote Tax Services Across Texas | ${site.name}`,
  description:
    "Work with a Dallas Enrolled Agent from anywhere in Texas. Secure uploads, electronic signatures, a real review call and full IRS representation. No office visit required.",
  path: "/remote-tax-services",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Remotely", path: "/remote-tax-services" },
];

const REMOTE_SERVICES = [
  "tax-preparation",
  "tax-planning",
  "monthly-bookkeeping",
  "irs-tax-problems",
  "back-taxes-compliance",
  "franchise-tax-reinstatement",
];

const STEPS = [
  {
    title: "A first call, from wherever you are",
    body: "Book online or ring us. Half an hour, no charge, no preparation needed. Just tell us what the situation is and we will tell you plainly whether we are the right firm for it.",
  },
  {
    title: "Documents go up, not out",
    body: "You get a client portal login. Photographs taken on a phone are fine. Nothing sensitive travels by email, and you keep permanent access to everything filed on your behalf.",
  },
  {
    title: "We prepare, then we talk it through",
    body: "The return is built and checked, and then we go through it with you on a call before anything is transmitted. You will understand what is on it and why.",
  },
  {
    title: "You sign with a few taps",
    body: "Signatures are electronic and take a minute. Signed copies stay in your portal, which is useful the next time a lender or a landlord asks for last year's return.",
  },
];

const REMOTE_FAQS: Faq[] = [
  {
    q: "Is remote tax work really as thorough as coming into an office?",
    a: "The review is the same conversation, held over a call instead of across a desk. Nothing about the preparation, the checking or the questions we ask changes. What changes is that you can have that conversation at seven in the evening from your kitchen table rather than taking an afternoon off.",
  },
  {
    q: "What if all my paperwork is on paper?",
    a: "Photograph it with your phone and upload it. It does not need to be scanned, flattened or sorted. Legible is enough, and we will tell you if anything came out unreadable. If there is a genuinely awkward pile, call us and we will find a way through it rather than leaving you to work it out alone.",
  },
  {
    q: "How do signatures work if we never meet?",
    a: "Electronically, inside the client portal. You are notified when the return is ready, you read it, and you sign. The signed copy is stored in your portal afterwards, so you can retrieve it yourself later without having to ask us for it.",
    link: { label: "Client portal", href: site.links.portal },
  },
  {
    q: "Can you represent me before the IRS if I live hours from Dallas?",
    a: "Yes. The Enrolled Agent credential is a federal one, and the authority to represent taxpayers before the IRS is not bounded by city or state. Once the authorisation form is signed we deal with the correspondence and the phone calls, whether you are in Amarillo, Brownsville or two streets away.",
    link: { label: "IRS Tax Problems", href: "/services/irs-tax-problems" },
  },
  {
    q: "What do I actually need to work with you remotely?",
    a: "A phone or a computer, an email address, and about half an hour for the review call. No scanner, no printer, no particular software, no app to install. If your internet is unreliable, tell us and we will work around it. A phone call and a posted copy is still a perfectly good way to run a tax return.",
  },
  {
    q: "Which parts of Texas do you cover?",
    a: "All of it. Our office is in Dallas and we do not keep premises anywhere else, so outside the Dallas-Fort Worth area the relationship is a remote one unless you choose to travel to us. Clients in Houston, Austin, San Antonio, El Paso, the Valley and the smaller towns in between are all worked the same way.",
  },
];

const YOU_NEED = [
  "A phone or a computer with a camera",
  "An email address you check",
  "Roughly half an hour for the review call",
  "Your documents, photographed or scanned",
];

const YOU_DO_NOT_NEED = [
  "A scanner or a printer",
  "Time off work",
  "A drive to Dallas",
  "Any software to install",
];

const UNCHANGED = [
  {
    title: "The same Enrolled Agent",
    body: "Your file is not passed down a chain. The person who reviews it is the person you spoke to.",
  },
  {
    title: "A real conversation first",
    body: "Nothing is filed until we have gone through it with you. A return that simply appears in your inbox with an invoice attached is not how we work.",
  },
  {
    title: "Full IRS representation",
    body: "Federal authority to represent you does not weaken with distance. Letters, notices and calls are handled the same way.",
  },
  {
    title: "Someone to ring in July",
    body: "The relationship does not close when the return is filed. Questions that arrive mid-year get answered mid-year.",
  },
];

export default function RemotePage() {
  return (
    <>
      <JsonLd
        data={[
          // Service, not AccountingService: this page describes how the firm
          // works with clients statewide, not a second place of business. The
          // only address the site claims is the Dallas office.
          serviceSchema({
            name: "Remote tax and accounting services across Texas",
            description:
              "Tax preparation, planning, bookkeeping, back tax filing and IRS representation delivered remotely to clients across Texas by a Dallas-based Enrolled Agent, using a secure client portal and electronic signatures.",
            path: "/remote-tax-services",
            areaServed: ["Texas"],
          }),
          faqPageSchema(REMOTE_FAQS),
          breadcrumbSchema(crumbs),
        ]}
      />

      <PageHero
        title="Work With Us Remotely, Anywhere in Texas"
        lede="The same Enrolled Agent, the same review, the same representation, minus the drive."
        eyebrow="Remotely"
        crumbs={crumbs}
        image={IMAGES.remoteHero()}
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
                A good number of our clients have never set foot in our office, and it has made no
                difference to their returns.
              </p>
              <p className="prose-body">
                Texas is a large state. If you are in Houston, Austin, San Antonio, El Paso, the
                Valley, or a town where the nearest Enrolled Agent is a two-hour drive, the real
                question is not whether remote tax work is any good. It is whether you can get an
                experienced practitioner at all without rearranging your week to do it.
              </p>
              <p className="prose-body">
                You can. The whole engagement runs through a secure client portal. You upload
                documents from a phone or a laptop, we prepare the work, we walk through it together
                on a call, and you sign electronically. Nothing sensitive travels by email, and
                nothing depends on you being free between nine and five on a weekday.
              </p>
              <p className="prose-body">
                What does not change is the work itself. The same Enrolled Agent reviews your file,
                and you still get a proper conversation before anything is filed. Because the EA
                credential carries federal authority, representation before the IRS works exactly the
                same whether you are twenty minutes from Estate Lane or five hours away.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1} className="lg:col-span-4">
            <div className="rounded-2xl border border-moss-dark/25 bg-mist p-7">
              <h2 className="font-serif text-lg font-semibold text-forest">What you need</h2>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink">
                {YOU_NEED.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss-dark"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="mt-7 font-serif text-lg font-semibold text-forest">
                What you don&rsquo;t
              </h3>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink">
                {YOU_DO_NOT_NEED.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest/30"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs leading-relaxed text-ink/70">
                {/* PLACEHOLDER: client to confirm whether clients outside Texas
                    are accepted. Until confirmed, this page claims Texas only. */}
                Our only office is at {site.address.full}.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it goes */}
      <section className="on-dark section bg-forest">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
              How a remote engagement actually goes
            </h2>
            <span className="accent-rule mt-5" aria-hidden="true" />
            <p className="mt-6 text-base leading-relaxed text-chalk sm:text-lg">
              Four steps, start to finish. Most clients are surprised how little of it lands on them.
            </p>
          </Reveal>
          <div className="mt-12">
            <ProcessTimeline steps={STEPS} tone="dark" />
          </div>
        </div>
      </section>

      {/* What doesn't change */}
      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">
              What distance does not change
            </h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {UNCHANGED.map((item, i) => (
              <Reveal key={item.title} delay={i}>
                <div className="h-full rounded-2xl border border-forest/10 bg-mist p-7">
                  <h3 className="font-serif text-xl font-semibold text-forest">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-mist">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">
              Everything here works remotely
            </h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
            <p className="prose-body mt-6">
              These are the same services a Dallas client gets across a desk, delivered by portal,
              phone and video instead.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {REMOTE_SERVICES.map((slug, i) => {
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

      {/* Security */}
      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="grid gap-10 rounded-2xl border border-forest/10 bg-mist p-8 sm:p-10 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-2xl font-bold text-forest sm:text-3xl">
                Where your documents go
              </h2>
              <span className="accent-rule mt-4 bg-moss-dark" aria-hidden="true" />
              <p className="prose-body mt-6">
                Working remotely only makes sense if the handling of your information is better than
                the alternative, not worse. Everything moves through an encrypted client portal with
                its own login. Tax records stay there, organised by year, for as long as you are a
                client.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink">
                Please do not send Social Security numbers or complete tax documents by email or
                through the contact form on this site. Email is not a secure channel, and we would
                rather ask you twice than have sensitive information sitting in an inbox.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <a
                href={site.links.portal}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Open the client portal
              </a>
              <Link href="/contact" className="btn-secondary-light">
                Ask us a question first
              </Link>
              <p className="text-xs leading-relaxed text-ink/70">
                Prefer to meet face to face? The Dallas office is open to you. See the{" "}
                <Link href="/tax-solutions-in-dallas" className="text-moss-dark underline">
                  Dallas page
                </Link>{" "}
                for directions.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-mist">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">
              Questions about working remotely
            </h2>
            <span className="accent-rule mt-5 bg-moss-dark" aria-hidden="true" />
          </Reveal>
          <Reveal delay={1} className="mt-10">
            <FAQAccordion faqs={REMOTE_FAQS} />
          </Reveal>

          <Reveal className="mt-10">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {[
                { label: "Our Dallas office", href: "/tax-solutions-in-dallas" },
                { label: "Fort Worth clients", href: "/fort-worth-tax-services" },
                { label: "How we work", href: "/about" },
                { label: "Contact us", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-semibold text-moss-dark hover:underline">
                    {l.label} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTABand heading="Wherever you are in Texas, let's talk" />
    </>
  );
}
