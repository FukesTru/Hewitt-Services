import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Thank You | ${site.name}`,
  description: "Your message has been sent to Hewitt Services. We will be in touch shortly.",
  path: "/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <>
      <PageHero
        title="Thank you, your message is on its way"
        lede="We have received your inquiry and will come back to you shortly."
        eyebrow="Message sent"
      />

      <section className="section bg-white">
        <div className="wrap">
          <Reveal className="max-w-prose space-y-5">
            <p className="prose-body">
              A real person reads every inquiry that comes through this site. If your matter is
              time-sensitive, such as an IRS deadline, a levy notice or a filing date, please call us on{" "}
              <a href={site.phone.href} className="font-semibold text-moss-dark underline">
                {site.phone.display}
              </a>{" "}
              rather than waiting for a reply.
            </p>
            <p className="prose-body">
              A reminder while you are here: please do not email Social Security numbers or full tax
              documents. Once we start work together, everything sensitive moves through the secure
              client portal.
            </p>
          </Reveal>

          <Reveal delay={1} className="mt-10 flex flex-wrap gap-4">
            <a href={site.links.booking} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a Free Discovery Call
            </a>
            <a href={site.phone.href} className="btn-secondary-light">
              Call {site.phone.display}
            </a>
          </Reveal>

          <Reveal delay={2} className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-forest">While you wait</h2>
            <span className="accent-rule mt-4 bg-moss-dark" aria-hidden="true" />
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Frequently asked questions", href: "/faq", body: "The things people ask us first." },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group block h-full rounded-xl border border-forest/10 bg-mist p-6 transition hover:-translate-y-1 hover:border-moss-dark"
                  >
                    <span className="font-serif text-lg font-semibold text-forest group-hover:text-moss-dark">
                      {l.label}
                    </span>
                    <span className="mt-2 block text-sm text-ink">{l.body}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
