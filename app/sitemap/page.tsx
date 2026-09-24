import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SITEMAP_GROUPS, routes } from "@/lib/routes";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Site Map | ${site.name}`,
  description:
    "Browse every page of the Hewitt Services website: services, the Dallas, Fort Worth and remote pages, FAQ and contact information.",
  path: "/sitemap",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Site Map", path: "/sitemap" },
];

export default function SiteMapPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        title="Site Map"
        lede="Every page on this site, in one list."
        eyebrow="Navigate"
        crumbs={crumbs}
      />

      <section className="section bg-white">
        <div className="wrap">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {SITEMAP_GROUPS.map((group, gi) => {
              const items = routes.filter((r) => r.group === group);
              if (items.length === 0) return null;
              return (
                <Reveal key={group} delay={gi}>
                  <h2 className="font-serif text-xl font-bold text-forest">{group}</h2>
                  <span className="accent-rule mt-3 bg-moss-dark" aria-hidden="true" />
                  <ul className="mt-5 space-y-2.5">
                    {items.map((r) => (
                      <li key={r.path}>
                        <Link href={r.path} className="text-sm text-ink transition hover:text-moss-dark">
                          {r.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}

          </div>

          <Reveal className="mt-16 rounded-xl border border-forest/10 bg-mist p-6">
            <p className="text-sm text-ink">
              Looking for the machine-readable version?{" "}
              <a href="/sitemap.xml" className="font-semibold text-moss-dark underline">
                sitemap.xml
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
