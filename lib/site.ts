/**
 * Single source of truth for NAP data, external links and navigation.
 * Anything the client still has to supply is marked PLACEHOLDER and is
 * surfaced in PRELAUNCH.md — do not invent values for these.
 */

export const site = {
  name: "Hewitt Services",
  legalNote:
    // PLACEHOLDER: confirm the registered legal entity name with the client.
    "Hewitt Services",
  url: "https://hewittservices.net",
  description:
    "Dallas tax planning, monthly bookkeeping, back tax filing and IRS problem resolution led by Demarcus Hewitt, EA.",
  founder: {
    name: "Demarcus Hewitt",
    credential: "EA",
    jobTitle: "Founder and Enrolled Agent",
    quote:
      "We dot every 'i' and cross every 't', reducing liability for business owners and maximizing refunds for individuals.",
  },
  phone: {
    display: "(972) 591-0008",
    href: "tel:+19725910008",
    e164: "+1-972-591-0008",
  },
  email: "info@hewittservices.net",
  address: {
    street: "10935 Estate Ln, Ste 124",
    streetName: "10935 Estate Ln",
    unit: "Ste 124",
    city: "Dallas",
    region: "TX",
    regionName: "Texas",
    postalCode: "75238",
    country: "US",
    full: "10935 Estate Ln, Ste 124, Dallas, TX 75238",
  },
  // PLACEHOLDER: business hours to be supplied by the client. Do not invent hours.
  hours: null as string | null,
  hoursPlaceholder: "Hours available on request — call or email and we will confirm.",
  links: {
    booking: "https://calendly.com/demarcushewitt",
    portal: "https://hs.taxdome.com/login",
    facebook: "https://www.facebook.com/HewittServices/",
    // PLACEHOLDER: Google Business Profile review URL to be supplied by the client.
    googleReviews: null as string | null,
  },
  maps: {
    embed:
      "https://maps.google.com/maps?q=10935%20Estate%20Ln%20Ste%20124%2C%20Dallas%2C%20Texas%2075238&z=16&output=embed",
    link: "https://maps.google.com/?q=10935+Estate+Ln+Ste+124,+Dallas,+TX+75238",
  },
  // PLACEHOLDER: the client uploads these PDFs. Until then the links render as
  // a disabled "coming soon" state rather than a broken download.
  downloads: {
    taxOrganizer: null as string | null,
    businessTaxOrganizer: null as string | null,
  },
  analytics: {
    ga4: "G-XXXXXXXXXX",
  },
  areaServed: ["Dallas", "Fort Worth", "Texas"],
  generalDisclaimer:
    "Information on this website is general in nature and is not tax, legal or financial advice. Results depend on individual facts.",
} as const;

export type NavChild = { label: string; href: string; blurb?: string };
export type NavGroup = { heading: string; items: NavChild[] };

/** Mega-dropdown groupings for the Services nav item. */
export const servicesNavGroups: NavGroup[] = [
  {
    heading: "Businesses",
    items: [
      { label: "Monthly Bookkeeping", href: "/services/monthly-bookkeeping", blurb: "Books kept current all year" },
      { label: "Tax Planning", href: "/services/tax-planning", blurb: "Year-round, proactive strategy" },
      {
        label: "Franchise Tax Reinstatement",
        href: "/services/franchise-tax-reinstatement",
        blurb: "Back in good standing in Texas",
      },
    ],
  },
  {
    heading: "Individuals",
    items: [
      { label: "Tax Preparation", href: "/services/tax-preparation", blurb: "Accurate returns, filed on time" },
      { label: "Refund Advances", href: "/services/refund-advances", blurb: "An option for eligible filers" },
    ],
  },
  {
    heading: "IRS Help",
    items: [
      { label: "IRS Tax Problems", href: "/services/irs-tax-problems", blurb: "Notices, audits, liens, levies" },
      { label: "Back Taxes and Compliance", href: "/services/back-taxes-compliance", blurb: "Unfiled years, handled" },
    ],
  },
];

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", groups: servicesNavGroups },
  { label: "About", href: "/about" },
  { label: "Tax Center", href: "/tax-center" },
  {
    label: "Locations",
    href: "/tax-solutions-in-dallas",
    children: [
      { label: "Dallas", href: "/tax-solutions-in-dallas" },
      { label: "Fort Worth", href: "/fort-worth-tax-services" },
      { label: "Remotely", href: "/remote-tax-services" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
