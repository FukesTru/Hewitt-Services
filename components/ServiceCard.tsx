import Link from "next/link";

type Props = {
  title: string;
  blurb: string;
  href: string;
  /** Renders on ivory/white sections by default; "dark" for navy bands. */
  tone?: "light" | "dark";
};

export function ServiceCard({ title, blurb, href, tone = "light" }: Props) {
  const dark = tone === "dark";
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col rounded-xl border p-6 transition duration-200 hover:-translate-y-1 ${
        dark
          ? "border-white/15 bg-white/5 hover:border-gold/60 hover:bg-white/10"
          : "border-navy/10 bg-white hover:border-gold hover:shadow-xl hover:shadow-navy/10"
      }`}
    >
      <h3
        className={`font-serif text-lg font-semibold ${
          dark ? "text-white group-hover:text-gold" : "text-navy group-hover:text-gold-dark"
        }`}
      >
        {title}
      </h3>
      <p className={`mt-3 flex-1 text-sm leading-relaxed ${dark ? "text-chalk/80" : "text-ink"}`}>
        {blurb}
      </p>
      <span
        className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${
          dark ? "text-gold" : "text-gold-dark"
        }`}
      >
        Learn more
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
          &rarr;
        </span>
      </span>
    </Link>
  );
}
