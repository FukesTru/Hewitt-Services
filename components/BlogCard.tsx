import Link from "next/link";
import { Media } from "./Media";
import type { Media as MediaType } from "@/lib/media";
import type { Post } from "@/lib/posts";

/**
 * `cover` is resolved by the server component that renders this card.
 * Resolving it here would pull lib/media (and node:fs) into the client
 * bundle via BlogFilter.
 */
export function BlogCard({ post, cover }: { post: Post; cover: MediaType }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-forest/10 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/10">
      <Link href={`/blog/${post.slug}`} className="block" tabIndex={-1} aria-hidden="true">
        <div className="relative aspect-[3/2] overflow-hidden bg-forest">
          <Media media={cover} fill sizes="(min-width: 1024px) 24rem, 100vw" />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full bg-mist px-3 py-1 font-semibold text-moss-dark">
            {post.category}
          </span>
          <time dateTime={post.date} className="text-ink/60">
            {new Date(`${post.date}T00:00:00`).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        <h3 className="mt-4 font-serif text-lg font-semibold leading-snug text-forest group-hover:text-moss-dark">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-moss-dark">
          Read the article
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
            &rarr;
          </span>
        </span>
      </div>
    </article>
  );
}
