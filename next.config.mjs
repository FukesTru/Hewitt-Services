/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Interim: the site photography is served from the firm's Artlist library
    // until the files are committed under public/images. lib/media.ts prefers
    // a local file whenever one exists, so committing them takes effect with
    // no config change and this entry can then be removed.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms-toolkit-artifacts.artlist.io",
        pathname: "/content/**",
      },
    ],
  },
  async redirects() {
    return [
      // --- Company / about ---
      { source: "/firm-background", destination: "/about", permanent: true },
      { source: "/firm-background/meet-the-team", destination: "/about", permanent: true },
      { source: "/firm-background/referrals", destination: "/about#referrals", permanent: true },

      // --- Legal ---
      { source: "/firm-background/privacy-policy", destination: "/privacy-policy", permanent: true },
      { source: "/website-privacy-policy", destination: "/privacy-policy", permanent: true },
      { source: "/sms-terms-and-conditions", destination: "/terms-and-disclaimer#sms-terms", permanent: true },

      // --- Services ---
      { source: "/back-taxes-compliance", destination: "/services/back-taxes-compliance", permanent: true },
      { source: "/services/monthly-bookkeeping-dallas", destination: "/services/monthly-bookkeeping", permanent: true },
      { source: "/virtual-assistant-bookkeeping-services", destination: "/services/monthly-bookkeeping", permanent: true },
      { source: "/services/tax-planning-services-dallas", destination: "/services/tax-planning", permanent: true },
      { source: "/tax-preparation-service-dallas", destination: "/services/tax-preparation", permanent: true },
      { source: "/services/irs-tax-problems-dallas", destination: "/services/irs-tax-problems", permanent: true },
      { source: "/franchise-tax-reinstatement-and-compliance", destination: "/services/franchise-tax-reinstatement", permanent: true },
      { source: "/services/franchise-tax-reinstatement-and-compliance", destination: "/services/franchise-tax-reinstatement", permanent: true },
      { source: "/refund-advances-eps-program", destination: "/services/refund-advances", permanent: true },
      { source: "/services/refund-advances-eps-program", destination: "/services/refund-advances", permanent: true },

      // --- Resources ---
      { source: "/frequently-asked-questions", destination: "/faq", permanent: true },
      { source: "/about-us/frequently-asked-questions", destination: "/faq", permanent: true },
      { source: "/business-tax-organizer", destination: "/#downloads", permanent: true },
      { source: "/track-refund", destination: "/contact", permanent: true },
      { source: "/appointments", destination: "/contact", permanent: true },

      // --- Retired sections ---
      // The Tax Center, the blog and the reviews page were removed. The blog
      // pattern covers both this site's own posts and the ~1,000 syndicated
      // articles left over from the old template platform. The more specific
      // /tax-center path has to be matched before the catch-all below it.
      { source: "/tax-center/track-refund", destination: "/contact", permanent: true },
      { source: "/tax-center", destination: "/services", permanent: true },
      { source: "/tax-center/:path*", destination: "/services", permanent: true },
      { source: "/reviews", destination: "/about", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
