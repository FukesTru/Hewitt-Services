import Link from "next/link";
import { ServiceCard } from "./ServiceCard";
import { getService } from "@/lib/services";

type Props = {
  /** Service slugs to render as cards. */
  slugs: string[];
  heading?: string;
  /** Extra plain links rendered under the cards. */
  extra?: { label: string; href: string }[];
};

export function RelatedLinks({ slugs, heading = "Related services", extra }: Props) {
  const related = slugs.map(getService).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-navy sm:text-3xl">{heading}</h2>
      <span className="accent-rule mt-4 bg-gold-dark" aria-hidden="true" />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((s) => (
          <ServiceCard key={s.slug} title={s.name} blurb={s.cardBlurb} href={`/services/${s.slug}`} />
        ))}
      </div>

      {extra?.length ? (
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {extra.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="font-semibold text-gold-dark hover:underline">
                {link.label} <span aria-hidden="true">&rarr;</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
