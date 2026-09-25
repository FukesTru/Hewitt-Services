const defaults = [
  "Led by an Enrolled Agent",
  "Virtual and in-person",
  "Secure client portal",
];

export function TrustStrip({
  items = defaults,
  align = "left",
}: {
  items?: string[];
  align?: "left" | "center";
}) {
  return (
    <ul
      className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-sm text-chalk">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
            <path
              d="M4 10.5l4 4 8-9"
              stroke="#86BF87"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}
