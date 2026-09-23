import Link from "next/link";
import type { Crumb } from "@/lib/schema";

/** Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted
 *  separately by each page so the two never drift apart. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-chalk/70">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-moss">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={crumb.path} className="transition hover:text-moss">
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true" className="text-chalk/40">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
