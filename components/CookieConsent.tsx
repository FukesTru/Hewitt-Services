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
      /* Private browsing with storage disabled. The banner simply closes. */
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
      /* Sits clear of both corners: the floating Call button is bottom-left
         on mobile, and bottom-right is reserved for a chat widget. */
      className="on-dark fixed bottom-24 left-4 right-4 z-[60] rounded-2xl border border-white/15 bg-forest-dark/95 shadow-2xl shadow-black/40 backdrop-blur sm:bottom-6 sm:left-1/2 sm:right-auto sm:w-[40rem] sm:max-w-[calc(100vw-3rem)] sm:-translate-x-1/2"
    >
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-sm leading-relaxed text-chalk">
          We use essential cookies to run this site, and analytics cookies to understand how it is
          used, only if you accept. Read our{" "}
          <Link href="/privacy-policy" className="text-moss underline">
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
