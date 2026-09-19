import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/routes";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

/** XML sitemap. /thank-you is excluded because it is noindex. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return allRoutes.map((route) => {
    const post = posts.find((p) => `/blog/${p.slug}` === route.path);
    return {
      url: route.path === "/" ? site.url : `${site.url}${route.path}`,
      lastModified: post ? new Date(`${post.date}T00:00:00Z`) : now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    };
  });
}
