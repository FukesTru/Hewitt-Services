import Link from "next/link";
import { EPS_DISCLOSURE_PLACEHOLDER } from "@/lib/services";
import type { Faq } from "@/lib/services";

type Props = {
  faqs: Faq[];
  /**
   * The matching FAQPage JSON-LD is emitted by the page, not here, so a page
   * with several accordions still ships exactly one FAQPage node.
   */
  className?: string;
};

/** Native <details>: keyboard accessible and works before hydration. */
export function FAQAccordion({ faqs, className = "" }: Props) {
  return (
    <div className={`divide-y divide-forest/10 border-y border-forest/10 ${className}`}>
      {faqs.map((faq) => (
        <details key={faq.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
            <h3 className="font-serif text-base font-semibold text-forest sm:text-lg">{faq.q}</h3>
            <span
              aria-hidden="true"
              className="mt-1 shrink-0 text-xl leading-none text-moss-dark transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="pt-4">
            <p className="max-w-prose text-sm leading-relaxed text-ink sm:text-base">{faq.a}</p>
            {faq.link ? (
              <p className="mt-3">
                <Link
                  href={faq.link.href}
                  className="text-sm font-semibold text-moss-dark hover:underline"
                >
                  {faq.link.label} <span aria-hidden="true">&rarr;</span>
                </Link>
              </p>
            ) : null}
            {faq.disclosure ? (
              <p className="mt-4 rounded-md border border-dashed border-moss-dark/50 bg-mist p-4 text-xs leading-relaxed text-ink">
                {/* Required disclosures are the provider's to supply. This block
                    stays visible until the client confirms EPS Financial's terms. */}
                {EPS_DISCLOSURE_PLACEHOLDER}
              </p>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}

export function FaqTeaser({ faqs, count = 4 }: { faqs: Faq[]; count?: number }) {
  return (
    <div>
      <FAQAccordion faqs={faqs.slice(0, count)} />
      <Link
        href="/faq"
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-moss-dark hover:underline"
      >
        Read all frequently asked questions
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
}
