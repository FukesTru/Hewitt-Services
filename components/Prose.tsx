import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "@/lib/posts";

/**
 * Renders `[label](/internal-path)` inside body copy. Only site-relative
 * hrefs are accepted, so article content can never introduce an outbound or
 * javascript: link.
 */
function withLinks(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      <Link
        key={`${match[2]}-${match.index}`}
        href={match[2]}
        className="font-medium text-moss-dark underline underline-offset-2 hover:text-forest"
      >
        {match[1]}
      </Link>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-prose space-y-6">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2 key={i} className="pt-4 font-serif text-2xl font-bold text-forest sm:text-3xl">
              {block.text}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={i} className="pt-2 font-serif text-xl font-semibold text-forest">
              {block.text}
            </h3>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="space-y-3 pl-1">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-ink">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss-dark" />
                  <span>{withLinks(item)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-base leading-relaxed text-ink sm:text-lg">
            {withLinks(block.text)}
          </p>
        );
      })}
    </div>
  );
}

/** Checklist used for "What We Handle" blocks. */
export function CheckList({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-0.5 shrink-0">
            <circle cx="10" cy="10" r="9.25" stroke={dark ? "#86BF87" : "#14793A"} strokeWidth="1.5" />
            <path
              d="M6 10.2l2.7 2.7L14 7.6"
              stroke={dark ? "#8CBF94" : "#2F6A38"}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={`text-sm leading-relaxed sm:text-base ${dark ? "text-chalk" : "text-ink"}`}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
