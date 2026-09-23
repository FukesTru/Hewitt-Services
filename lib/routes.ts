import { posts } from "./posts";
import { services } from "./services";

export type Route = {
  path: string;
  label: string;
  /** Group used by the HTML sitemap at /sitemap. */
  group: "Company" | "Services" | "Locations" | "Resources" | "Legal";
  /** Relative priority for sitemap.xml. */
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
};

/**
 * Single source of truth for every indexable route. Both sitemap.xml
 * (app/sitemap.ts) and the HTML sitemap (app/sitemap/page.tsx) are generated
 * from this list, so the two can never drift apart.
 *
 * /thank-you is deliberately absent — it is noindex.
 */
export const routes: Route[] = [
  { path: "/", label: "Home", group: "Company", priority: 1, changeFrequency: "weekly" },
  { path: "/about", label: "About Demarcus Hewitt, EA", group: "Company", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", label: "Contact", group: "Company", priority: 0.9, changeFrequency: "monthly" },
  { path: "/reviews", label: "Client Reviews", group: "Company", priority: 0.6, changeFrequency: "monthly" },

  { path: "/services", label: "All Services", group: "Services", priority: 0.9, changeFrequency: "monthly" },
  ...services.map<Route>((s) => ({
    path: `/services/${s.slug}`,
    label: s.name,
    group: "Services",
    priority: 0.8,
    changeFrequency: "monthly",
  })),

  {
    path: "/tax-solutions-in-dallas",
    label: "Tax Solutions in Dallas, TX",
    group: "Locations",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/fort-worth-tax-services",
    label: "Tax Services for Fort Worth, TX",
    group: "Locations",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/remote-tax-services",
    label: "Remote Tax Services Across Texas",
    group: "Locations",
    priority: 0.7,
    changeFrequency: "monthly",
  },

  { path: "/tax-center", label: "Tax Center", group: "Resources", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", label: "Frequently Asked Questions", group: "Resources", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", label: "Blog", group: "Resources", priority: 0.7, changeFrequency: "weekly" },

  { path: "/privacy-policy", label: "Privacy Policy", group: "Legal", priority: 0.3, changeFrequency: "yearly" },
  {
    path: "/terms-and-disclaimer",
    label: "Terms, SMS Terms and Disclaimer",
    group: "Legal",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  { path: "/sitemap", label: "Site Map", group: "Legal", priority: 0.3, changeFrequency: "monthly" },
];

export const blogRoutes: Route[] = posts.map((p) => ({
  path: `/blog/${p.slug}`,
  label: p.title,
  group: "Resources",
  priority: 0.6,
  changeFrequency: "yearly",
}));

export const allRoutes: Route[] = [...routes, ...blogRoutes];

export const SITEMAP_GROUPS = ["Company", "Services", "Locations", "Resources", "Legal"] as const;
