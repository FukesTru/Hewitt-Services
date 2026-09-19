"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export const CONSENT_KEY = "hs-cookie-consent";
export const CONSENT_EVENT = "hs:consent-changed";

export function readConsent(): "accepted" | "denied" | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/**
 * GA4 is measurement, not an essential cookie, so the tag is only injected
 * once the visitor has actively accepted. Denying leaves nothing loaded.
 */
export function Analytics() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const sync = () => setAccepted(readConsent() === "accepted");
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  // PLACEHOLDER: swap G-XXXXXXXXXX in lib/site.ts for the firm's real GA4
  // measurement ID before launch.
  if (!accepted || !site.analytics.ga4 || site.analytics.ga4.includes("XXXXXXXXXX")) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${site.analytics.ga4}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.analytics.ga4}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
