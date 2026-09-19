"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, CONSENT_KEY, readConsent } from "./Analytics";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);
  }, []);

  function choose(value: "accepted" | "denied") {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* Private browsing with storage disabled — the banner simply closes. */
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="on-dark fixed inset-x-0 bottom-0 z-[60] border-t border-white/15 bg-navy-dark/98 backdrop-blur"
    >
      <div className="wrap flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-sm leading-relaxed text-chalk">
          We use essential cookies to run this site, and analytics cookies to understand how it is
          used — only if you accept. Read our{" "}
          <Link href="/privacy-policy" className="text-gold underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={() => choose("denied")} className="btn-secondary px-5 py-2.5">
            Deny
          </button>
          <button type="button" onClick={() => choose("accepted")} className="btn-primary px-5 py-2.5">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
