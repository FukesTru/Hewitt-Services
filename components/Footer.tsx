import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

const company = [
  { label: "About", href: "/about" },
  { label: "Tax Center", href: "/tax-center" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-navy-dark text-chalk">
      <div className="wrap py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-chalk/80">
              Tax planning, bookkeeping and IRS problem resolution for individuals and
              business owners in Dallas and across Texas, led by an Enrolled Agent.
            </p>

            <address className="mt-6 space-y-2 text-sm not-italic text-chalk/80">
              <p className="font-semibold text-white">{site.name}</p>
              <p>
                {site.address.streetName}, {site.address.unit}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </p>
              <p>
                <a href={site.phone.href} className="transition hover:text-gold">
                  {site.phone.display}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.email}`} className="transition hover:text-gold">
                  {site.email}
                </a>
              </p>
            </address>

            {/* PLACEHOLDER: business hours to be supplied by the client. */}
            <p className="mt-4 text-sm text-chalk/60">
              <span className="font-semibold text-chalk/80">Hours:</span>{" "}
              {site.hours ?? site.hoursPlaceholder}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <a
                href={site.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:border-gold hover:text-gold"
              >
                <span className="sr-only">Hewitt Services on Facebook</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14 8.5V6.9c0-.7.2-1.1 1.2-1.1H17V3h-2.6C11.6 3 11 4.6 11 6.6v1.9H9V12h2v9h3v-9h2.3l.4-3.5H14Z" />
                </svg>
              </a>
              <a
                href={site.links.portal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center text-sm font-semibold text-gold transition hover:text-gold-light"
              >
                Client Login
              </a>
            </div>
          </div>

          <nav className="lg:col-span-8" aria-label="Footer">
            <div className="grid gap-10 sm:grid-cols-3">
              <div>
                <h2 className="font-serif text-base font-semibold text-white">Services</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="text-chalk/80 transition hover:text-gold">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-base font-semibold text-white">Company</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {company.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} className="text-chalk/80 transition hover:text-gold">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-serif text-base font-semibold text-white">Locations</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li>
                    <Link href="/tax-solutions-in-dallas" className="text-chalk/80 transition hover:text-gold">
                      Dallas, TX
                    </Link>
                  </li>
                  <li>
                    <Link href="/fort-worth-tax-services" className="text-chalk/80 transition hover:text-gold">
                      Fort Worth, TX
                    </Link>
                  </li>
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-chalk/60">
                  In-person in Dallas and virtual across Texas.
                </p>
              </div>
            </div>
          </nav>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-chalk/60">{site.generalDisclaimer}</p>

          <div className="mt-6 flex flex-col gap-4 text-xs text-chalk/60 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {site.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <li>
                <Link href="/privacy-policy" className="transition hover:text-gold">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-disclaimer" className="transition hover:text-gold">
                  Terms and Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/terms-and-disclaimer#accessibility" className="transition hover:text-gold">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="transition hover:text-gold">
                  Site Map
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
