/**
 * The ticked list used on the service pages.
 */
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
              stroke={dark ? "#86BF87" : "#14793A"}
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
