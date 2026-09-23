import { CTABand } from "@/components/CTABand";
import { FAQAccordion } from "@/components/FAQAccordion";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { allFaqs, faqGroups } from "@/lib/faqs";
import { IMAGES } from "@/lib/media";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Tax & Bookkeeping FAQs | ${site.name}`,
  description:
    "Answers to common questions about bookkeeping, tax planning, back taxes, IRS notices, Texas franchise tax and refund advances from Hewitt Services in Dallas.",
  path: "/faq",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[faqPageSchema(allFaqs), breadcrumbSchema(crumbs)]} />

      <PageHero
        title="Frequently Asked Questions"
        lede="Straight answers to what people ask before they pick up the phone."
        eyebrow="Answers"
        crumbs={crumbs}
        image={IMAGES.faq()}
        priority
      />

      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="max-w-prose">
            <p className="prose-body">
              If your question is not here, ask it. The first call is free, it is a conversation
              rather than a sales pitch, and if we are not the right firm for your situation we will
              tell you that too.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            {/* Sticky topic filter — plain anchors, so it works without JS. */}
            <nav aria-label="FAQ topics" className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow text-moss-dark">Jump to</p>
                <ul className="mt-4 space-y-1">
                  {faqGroups.map((group) => (
                    <li key={group.id}>
                      <a
                        href={`#${group.id}`}
                        className="block rounded-md px-3 py-2 text-sm font-medium text-forest transition hover:bg-mist hover:text-moss-dark"
                      >
                        {group.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="lg:col-span-9">
              <div className="space-y-14">
                {faqGroups.map((group) => (
                  <section key={group.id} id={group.id} className="scroll-mt-28">
                    <h2 className="font-serif text-2xl font-bold text-forest sm:text-3xl">
                      {group.heading}
                    </h2>
                    <span className="accent-rule mt-4 bg-moss-dark" aria-hidden="true" />
                    <div className="mt-6">
                      <FAQAccordion faqs={group.faqs} />
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        heading="Still have questions? Let's talk."
        body="Half an hour on the phone usually resolves more than an afternoon of searching. Ask us anything — there is no charge for the first conversation."
      />
    </>
  );
}
