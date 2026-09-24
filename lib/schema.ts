import { site } from "./site";
import type { Faq } from "./services";

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

/** Facebook plus, once supplied, the Google Business Profile URL. */
function sameAs(): string[] {
  return [site.links.facebook, site.links.googleReviews].filter(
    (u): u is string => typeof u === "string" && u.length > 0
  );
}

const founderNode = {
  "@type": "Person",
  name: `${site.founder.name}, ${site.founder.credential}`,
  jobTitle: site.founder.jobTitle,
};

/**
 * The firm itself. Deliberately carries NO aggregateRating or reviewCount:
 * the firm has not supplied verified review data and inventing it is off limits.
 */
export function accountingServiceSchema(opts?: { includeMap?: boolean }) {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    description: site.description,
    telephone: site.phone.e164,
    email: site.email,
    address: postalAddress,
    founder: founderNode,
    sameAs: sameAs(),
    areaServed: site.areaServed.map((n) => ({ "@type": "Place", name: n })),
    priceRange: "$$",
    ...(opts?.includeMap ? { hasMap: site.maps.link } : {}),
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/about#demarcus-hewitt`,
    name: site.founder.name,
    honorificSuffix: site.founder.credential,
    jobTitle: site.founder.jobTitle,
    worksFor: {
      "@type": "AccountingService",
      name: site.name,
      url: site.url,
    },
    url: `${site.url}/about`,
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${site.url}${input.path}`,
    serviceType: input.name,
    provider: {
      "@type": "AccountingService",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      telephone: site.phone.e164,
      address: postalAddress,
    },
    areaServed: (input.areaServed ?? site.areaServed).map((n) => ({
      "@type": "Place",
      name: n,
    })),
  };
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.path === "/" ? "" : c.path}`,
    })),
  };
}

export function itemListSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: `${site.url}${it.path}`,
    })),
  };
}
