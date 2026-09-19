"use client";

import { useState } from "react";
import { BlogCard } from "./BlogCard";
import { CATEGORIES } from "@/lib/posts";
import type { Media as MediaType } from "@/lib/media";
import type { Category, Post } from "@/lib/posts";

export type BlogItem = { post: Post; cover: MediaType };

export function BlogFilter({ items }: { items: BlogItem[] }) {
  const [active, setActive] = useState<Category | "All">("All");
  const shown = active === "All" ? items : items.filter((i) => i.post.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-3">
        {(["All", ...CATEGORIES] as const).map((cat) => {
          const selected = active === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={selected}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                selected
                  ? "border-navy bg-navy text-white"
                  : "border-navy/20 bg-white text-navy hover:border-gold-dark hover:text-gold-dark"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {shown.length} {shown.length === 1 ? "article" : "articles"} shown
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item) => (
          <BlogCard key={item.post.slug} post={item.post} cover={item.cover} />
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="mt-10 text-base text-ink">No articles in that category yet.</p>
      ) : null}
    </div>
  );
}
