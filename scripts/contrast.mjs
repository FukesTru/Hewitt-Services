const C = {
  forest: "#2C4A28", "forest-dark": "#1E3419", "forest-light": "#3E7D45",
  moss: "#8CBF94", "moss-dark": "#2F6A38", "moss-light": "#BFDCC4",
  mist: "#F2F6F0", ink: "#37413A", chalk: "#E3EAE2", white: "#FFFFFF",
};
const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const L = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => {
  const [x, y] = [L(C[a]), L(C[b])].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};
// [fg, bg, minimum, what it is]
const PAIRS = [
  ["white", "forest", 4.5, "headings + body on dark bands"],
  ["chalk", "forest", 4.5, "body text on dark bands"],
  ["moss-light", "forest", 4.5, "eyebrow / link hover on dark"],
  ["moss", "forest", 4.5, "btn-secondary text + border on dark"],
  ["moss", "forest-dark", 4.5, "accent on the deepest band"],
  ["ink", "white", 4.5, "body text on white"],
  ["ink", "mist", 4.5, "body text on mist sections"],
  ["forest", "white", 4.5, "headings on white"],
  ["forest", "mist", 4.5, "headings on mist"],
  ["moss-dark", "white", 4.5, "accent text + links on white"],
  ["moss-dark", "mist", 4.5, "accent text + links on mist"],
  ["forest-dark", "moss", 4.5, "btn-primary label"],
  ["forest-dark", "moss-light", 4.5, "btn-primary label (hover)"],
  ["white", "moss-dark", 4.5, "btn-secondary-light label (hover)"],
  ["moss-dark", "white", 3.0, "focus ring on light (1.4.11)"],
  ["white", "forest", 3.0, "focus ring on dark (1.4.11)"],
  ["moss", "forest", 3.0, "accent rule on dark (non-text)"],
  ["moss-dark", "white", 3.0, "accent rule on light (non-text)"],
];
let bad = 0;
for (const [fg, bg, min, what] of PAIRS) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) bad++;
  console.log(`${ok ? "  ok " : "  ✗  "} ${r.toFixed(2).padStart(5)}:1  (min ${min})  ${fg} on ${bg} — ${what}`);
}
console.log(bad ? `\n${bad} pairing(s) below target` : "\nAll palette pairings clear WCAG 2.1 AA.");
process.exit(bad ? 1 : 0);
