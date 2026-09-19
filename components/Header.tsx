"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { site, mainNav, servicesNavGroups } from "@/lib/site";

function UtilityBar() {
  return (
    <div className="hidden border-b border-white/10 bg-navy-dark lg:block">
      {/* Links fill the bar's full height so the hit area matches what is drawn. */}
      <div className="wrap flex h-10 items-stretch justify-end gap-2 text-xs text-chalk">
        <a href={site.phone.href} className="flex items-center px-2 transition hover:text-gold">
          {site.phone.display}
        </a>
        <a href={`mailto:${site.email}`} className="flex items-center px-2 transition hover:text-gold">
          {site.email}
        </a>
        <a
          href={site.links.portal}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-2 transition hover:text-gold"
        >
          Client Login
        </a>
        <Link
          href="/tax-center#downloads"
          className="flex items-center px-2 font-semibold text-gold transition hover:text-gold-light"
        >
          Free Tax Organizer
        </Link>
      </div>
    </div>
  );
}

function ServicesMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="grid gap-8 p-8 sm:grid-cols-3">
      {servicesNavGroups.map((group) => (
        <div key={group.heading}>
          <p className="eyebrow mb-3 text-gold-dark">{group.heading}</p>
          <ul className="space-y-3">
            {group.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="group block rounded-md p-2 -m-2 transition hover:bg-ivory"
                >
                  <span className="block text-sm font-semibold text-navy group-hover:text-gold-dark">
                    {item.label}
                  </span>
                  {item.blurb ? (
                    <span className="mt-0.5 block text-xs text-ink/70">{item.blurb}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="sm:col-span-3">
        <Link
          href="/services"
          onClick={onNavigate}
          className="inline-flex items-center gap-2 border-t border-ivory pt-4 text-sm font-semibold text-gold-dark hover:underline"
        >
          View all services
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}

export function Header({ transparentOverHero = true }: { transparentOverHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Escape closes any open menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || !transparentOverHero || mobileOpen || openMenu !== null;

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-navy shadow-lg shadow-navy/20" : "bg-transparent"
      }`}
    >
      <UtilityBar />

      <nav className="wrap flex h-20 items-center justify-between gap-4" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const hasPanel = Boolean(item.groups || item.children);
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => hasPanel && (cancelClose(), setOpenMenu(item.label))}
                onMouseLeave={() => hasPanel && scheduleClose()}
              >
                {hasPanel ? (
                  <button
                    type="button"
                    aria-expanded={openMenu === item.label}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition ${
                      active ? "text-gold" : "text-white hover:text-gold"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`text-[0.6rem] transition-transform duration-200 ${
                        openMenu === item.label ? "rotate-180" : ""
                      }`}
                    >
                      &#9660;
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
                      active ? "text-gold" : "text-white hover:text-gold"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {hasPanel && openMenu === item.label ? (
                  <div
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                    className={`absolute left-1/2 top-full -translate-x-1/2 overflow-hidden rounded-xl bg-white shadow-2xl shadow-navy/30 ring-1 ring-navy/10 ${
                      item.groups ? "w-[46rem]" : "w-56"
                    }`}
                  >
                    {item.groups ? (
                      <ServicesMenu onNavigate={() => setOpenMenu(null)} />
                    ) : (
                      <ul className="p-3">
                        {item.children?.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpenMenu(null)}
                              className="block rounded-md px-3 py-2 text-sm font-medium text-navy transition hover:bg-ivory hover:text-gold-dark"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={site.phone.href}
            className="inline-flex items-center rounded-md px-2 py-3 text-sm font-semibold text-white transition hover:text-gold"
          >
            {site.phone.display}
          </a>
          <a href={site.links.booking} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Book a Free Call
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white lg:hidden"
        >
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen ? (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 bg-navy pb-10 lg:hidden"
        >
          <div className="wrap space-y-6 pt-6">
            <div className="space-y-2">
              <p className="eyebrow text-gold">Services</p>
              {servicesNavGroups.flatMap((g) => g.items).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2.5 text-base text-white hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/services" className="block px-3 py-2 text-sm font-semibold text-gold">
                View all services &rarr;
              </Link>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-6">
              {[
                { label: "About", href: "/about" },
                { label: "Tax Center", href: "/tax-center" },
                { label: "Dallas", href: "/tax-solutions-in-dallas" },
                { label: "Fort Worth", href: "/fort-worth-tax-services" },
                { label: "Reviews", href: "/reviews" },
                { label: "Blog", href: "/blog" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2.5 text-base text-white hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="space-y-3 border-t border-white/10 pt-6">
              <a href={site.links.booking} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
                Book a Free Call
              </a>
              <a href={site.phone.href} className="btn-secondary w-full">
                Call {site.phone.display}
              </a>
              <a
                href={site.links.portal}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-center text-sm text-chalk underline"
              >
                Client Login
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
