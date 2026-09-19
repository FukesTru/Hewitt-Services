import type { Metadata } from "next";
import { site } from "./site";

type PageSeoInput = {
  title: string;
  description: string;
  /** Path with a leading slash, e.g. "/services/tax-planning". Use "/" for home. */
  path: string;
  /** Absolute or root-relative image path used for Open Graph and Twitter. */
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
};

export const DEFAULT_OG_IMAGE = "/images/og/og-default.jpg";

export function canonical(path: string): string {
  return path === "/" ? site.url : `${site.url}${path}`;
}

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  noindex = false,
  type = "website",
  publishedTime,
}: PageSeoInput): Metadata {
  const url = canonical(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_US",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [
        {
          url: `${site.url}${image}`,
          width: 1200,
          height: 630,
          alt: imageAlt ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${site.url}${image}`],
    },
  };
}
