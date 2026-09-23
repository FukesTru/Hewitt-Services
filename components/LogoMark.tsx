/**
 * The Hewitt Services mark: a two-by-two block of brand greens with a serif
 * "H" set over it.
 *
 * Rebuilt as vector from the raster logo the client supplied (archived at
 * public/images/logo-hewitt-services.webp, 330x72 — too small to set a header
 * or a favicon from). The greens below are sampled from that file, and the H
 * is drawn as plain rectangles so it needs no font to render: the same markup
 * works inline in the page and as a standalone favicon.
 *
 * `tile` puts the mark on a light rounded panel. The bottom-left square is
 * nearly the same green as the dark sections, so on those the mark needs the
 * panel to separate from its background.
 */
const GREENS = {
  topLeft: "#86BF87",
  topRight: "#14793A",
  bottomLeft: "#1C4C23",
  bottomRight: "#2E9C5A",
};

export function LogoMark({
  tile = false,
  className = "",
}: {
  tile?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {tile ? <rect width="48" height="48" rx="11" fill="#F7FAF6" /> : null}

      <rect x="6" y="6" width="18" height="18" fill={GREENS.topLeft} />
      <rect x="24" y="6" width="18" height="18" fill={GREENS.topRight} />
      <rect x="6" y="24" width="18" height="18" fill={GREENS.bottomLeft} />
      <rect x="24" y="24" width="18" height="18" fill={GREENS.bottomRight} />

      {/* Serif H — two stems, a crossbar and four serifs. */}
      <g fill="#FFFFFF">
        <rect x="15.2" y="9" width="3.4" height="30" />
        <rect x="29.4" y="9" width="3.4" height="30" />
        <rect x="18.6" y="22.3" width="10.8" height="3.4" />
        <rect x="12.1" y="9" width="9.6" height="2.2" />
        <rect x="12.1" y="36.8" width="9.6" height="2.2" />
        <rect x="26.3" y="9" width="9.6" height="2.2" />
        <rect x="26.3" y="36.8" width="9.6" height="2.2" />
      </g>
    </svg>
  );
}
