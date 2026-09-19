import type { ReactNode } from "react";

export function LegalSection({
  id,
  heading,
  children,
}: {
  id?: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-navy/10 pt-10">
      <h2 className="font-serif text-2xl font-bold text-navy sm:text-3xl">{heading}</h2>
      <div className="mt-5 max-w-prose space-y-4 text-base leading-relaxed text-ink">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dark" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
