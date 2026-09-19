import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Media } from "./Media";
import type { Media as MediaType } from "@/lib/media";
import type { Crumb } from "@/lib/schema";

type Props = {
  title: string;
  /** One sentence under the H1. */
  lede?: string;
  eyebrow?: string;
  crumbs?: Crumb[];
  image?: MediaType;
  priority?: boolean;
  children?: ReactNode;
  /** Taller treatment for the homepage. */
  size?: "default" | "tall";
};

export function PageHero({
  title,
  lede,
  eyebrow,
  crumbs,
  image,
  priority = false,
  children,
  size = "default",
}: Props) {
  return (
    <section
      className={`on-dark relative isolate overflow-hidden bg-navy ${
        size === "tall" ? "pt-40 pb-24 sm:pt-48 sm:pb-32" : "pt-36 pb-16 sm:pt-44 sm:pb-20"
      }`}
    >
      {image ? (
        <div className="absolute inset-0 -z-10">
          <Media media={image} fill priority={priority} sizes="100vw" />
          {/* Two-layer scrim keeps headline contrast well above 4.5:1 whatever
              the photograph underneath happens to be. */}
          <div className="absolute inset-0 bg-navy-dark/75" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/70 to-navy-dark/30"
            aria-hidden="true"
          />
        </div>
      ) : (
        <div className="media-fallback absolute inset-0 -z-10" aria-hidden="true" />
      )}

      <div className="wrap">
        {crumbs ? <Breadcrumbs crumbs={crumbs} /> : null}

        <div className="max-w-3xl">
          {eyebrow ? <p className="eyebrow mb-4 text-gold">{eyebrow}</p> : null}
          <h1
            className={`font-bold text-white ${
              size === "tall"
                ? "text-4xl leading-[1.1] sm:text-5xl lg:text-6xl"
                : "text-3xl leading-[1.15] sm:text-4xl lg:text-5xl"
            }`}
          >
            {title}
          </h1>
          <span className="accent-rule mt-6" aria-hidden="true" />
          {lede ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-chalk sm:text-xl">{lede}</p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
