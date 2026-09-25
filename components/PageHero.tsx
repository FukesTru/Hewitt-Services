import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Media } from "./Media";
import type { Media as MediaType } from "@/lib/media";
import type { Crumb } from "@/lib/schema";

type Props = {
  title: ReactNode;
  /** Overrides the size classes on the H1. For a headline set by hand. */
  titleClassName?: string;
  /** The short rule under the H1. Off where the headline carries its own. */
  accentRule?: boolean;
  /** One sentence under the H1. */
  lede?: string;
  eyebrow?: string;
  crumbs?: Crumb[];
  image?: MediaType;
  priority?: boolean;
  children?: ReactNode;
  /** Taller treatment for the homepage. */
  size?: "default" | "tall";
  /** Centred stack for the landing page. Inner pages stay left-aligned. */
  align?: "left" | "center";
};

export function PageHero({
  title,
  titleClassName,
  accentRule = true,
  lede,
  eyebrow,
  crumbs,
  image,
  priority = false,
  children,
  size = "default",
  align = "left",
}: Props) {
  const centered = align === "center";

  return (
    <section
      className={`on-dark relative isolate overflow-hidden bg-forest ${
        size === "tall" ? "pt-40 pb-20 sm:pt-48 sm:pb-28" : "pt-36 pb-16 sm:pt-44 sm:pb-20"
      }`}
    >
      {image ? (
        <div className="absolute inset-0 -z-10">
          <Media media={image} fill priority={priority} sizes="100vw" />
          {/* Two-layer scrim keeps headline contrast well above 4.5:1 whatever
              the photograph underneath happens to be. */}
          <div className="absolute inset-0 bg-forest-dark/75" aria-hidden="true" />
          {/* The left-to-right scrim exists to sit behind left-aligned text.
              A centred headline needs a symmetric one. */}
          <div
            className={`absolute inset-0 ${
              centered
                ? "bg-gradient-to-t from-forest-dark via-forest-dark/55 to-forest-dark/45"
                : "bg-gradient-to-r from-forest-dark via-forest-dark/70 to-forest-dark/30"
            }`}
            aria-hidden="true"
          />
        </div>
      ) : (
        <div className="media-fallback absolute inset-0 -z-10" aria-hidden="true" />
      )}

      {/* A soft light and a shadow into the section below, so the band has
          depth whether or not a photograph loads. The light sits over the
          headline, which is why it moves with the alignment. */}
      <div
        className={`absolute inset-0 -z-10 ${centered ? "hero-glow-center" : "hero-glow"}`}
        aria-hidden="true"
      />

      <div className="wrap">
        {crumbs ? <Breadcrumbs crumbs={crumbs} /> : null}

        <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
          {eyebrow ? <p className="eyebrow mb-4 text-moss">{eyebrow}</p> : null}
          <h1
            className={`font-bold text-white ${
              titleClassName ??
              (size === "tall"
                ? "text-4xl leading-[1.1] sm:text-5xl lg:text-6xl"
                : "text-3xl leading-[1.15] sm:text-4xl lg:text-5xl")
            }`}
          >
            {title}
          </h1>
          {accentRule ? (
            <span className={`accent-rule mt-6 ${centered ? "mx-auto" : ""}`} aria-hidden="true" />
          ) : null}
          {lede ? (
            <p
              className={`mt-6 max-w-2xl text-lg leading-relaxed text-chalk sm:text-xl ${
                centered ? "mx-auto" : ""
              }`}
            >
              {lede}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
