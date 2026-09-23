import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata = {
  title: `Page not found | ${site.name}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <PageHero
        title="We could not find that page"
        lede="The link may be out of date, or the page may have moved when we rebuilt this site."
        eyebrow="404"
      />

      <section className="section bg-white">
        <div className="wrap">
          <p className="prose-body max-w-prose">
            Try one of these, or call us on{" "}
            <a href={site.phone.href} className="font-semibold text-moss-dark underline">
              {site.phone.display}
            </a>{" "}
            and we will point you to the right place.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Home", href: "/" },
              { label: "All services", href: "/services" },
              { label: "Site map", href: "/sitemap" },
              { label: "Contact us", href: "/contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-xl border border-forest/10 bg-mist p-5 text-sm font-semibold text-forest transition hover:-translate-y-1 hover:border-moss-dark hover:text-moss-dark"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
