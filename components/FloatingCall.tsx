import { site } from "@/lib/site";

/**
 * Mobile tap-to-call. Deliberately bottom-LEFT: the bottom-right corner is
 * reserved for the third-party AI chat widget (see the slot in app/layout.tsx).
 */
export function FloatingCall() {
  return (
    <a
      href={site.phone.href}
      className="fixed bottom-5 left-4 z-40 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3.5 text-sm font-semibold text-navy shadow-xl shadow-navy/30 transition hover:bg-gold-light lg:hidden"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z" />
      </svg>
      Call Now
    </a>
  );
}
