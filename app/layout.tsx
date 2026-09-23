import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import { Analytics } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { FloatingCall } from "@/components/FloatingCall";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealOnNavigate } from "@/components/RevealOnNavigate";
import { RevealScript } from "@/components/RevealScript";
import { SkipLink } from "@/components/SkipLink";
import { site } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Tax Services in Dallas, TX | ${site.name}`,
    template: `%s`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  formatDetection: { telephone: true, address: true, email: true },
  icons: {
    // Drawn from the client's logo mark — see components/LogoMark.tsx.
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#1C4C23",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/*
          GA4 measurement ID for this property: G-XXXXXXXXXX (see
          lib/site.ts). The tag itself is injected by <Analytics /> only after
          the visitor accepts analytics cookies, so nothing from Google loads
          on a first, un-consented page view.
        */}
        <meta name="ga4-measurement-id" content={site.analytics.ga4} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Arms the scroll-reveal animation before first paint. Without JS the
            page stays fully readable — see components/Reveal.tsx. */}
        <RevealScript />
      </head>
      <body className="bg-white font-sans antialiased">
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FloatingCall />
        <CookieConsent />
        <Analytics />
        <RevealOnNavigate />

        {/*
          ── Third-party AI chat widget slot ─────────────────────────────────
          Reserved for the client's chat provider. Paste the vendor's <script>
          here. The widget owns the BOTTOM-RIGHT corner; the mobile "Call Now"
          button is pinned bottom-left so the two never overlap.

          <Script id="chat-widget" strategy="lazyOnload" src="https://…" />

          Do NOT re-use the chat bot from the previous site — it is hosted by
          the old template platform.
          ────────────────────────────────────────────────────────────────────
        */}
      </body>
    </html>
  );
}
