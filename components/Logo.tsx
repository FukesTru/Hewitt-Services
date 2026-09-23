import Link from "next/link";
import { LogoMark } from "./LogoMark";

type Props = {
  variant?: "light" | "dark";
  className?: string;
  /** Show the strapline under the wordmark. Off in the header, on in the footer. */
  tagline?: boolean;
};

/**
 * Brand lockup: the vector mark plus the wordmark.
 *
 * The client supplied the logo as a 330x72 raster (kept at
 * public/images/logo-hewitt-services.webp). At that size it is too soft for a
 * header and its strapline is illegible below about 40px tall, so the mark is
 * redrawn as vector here and the wordmark is set live in Playfair Display —
 * crisp at any size, recolourable for dark and light, and readable to screen
 * readers. See PRELAUNCH: a vector original from the client would let the
 * wordmark match their typeface exactly.
 */
export function Logo({ variant = "light", className = "", tagline = false }: Props) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label={`Hewitt Services${tagline ? " — where excellence is at its best" : ""} — home`}
    >
      <LogoMark
        tile={isLight}
        className="h-10 w-10 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 sm:h-11 sm:w-11"
      />

      <span className="flex flex-col leading-none">
        <span
          className={`whitespace-nowrap font-serif text-xl font-bold tracking-tight sm:text-2xl ${
            isLight ? "text-white" : "text-forest"
          }`}
        >
          Hewitt <span className={isLight ? "text-moss" : "text-moss-dark"}>Services</span>
        </span>

        {tagline ? (
          <span
            className={`mt-1.5 font-serif text-[0.7rem] italic tracking-[0.12em] ${
              isLight ? "text-chalk/70" : "text-ink/70"
            }`}
          >
            Where excellence is at its best
          </span>
        ) : (
          <span
            className={`mt-1.5 h-px w-8 transition-all duration-300 group-hover:w-14 ${
              isLight ? "bg-moss" : "bg-moss-dark"
            }`}
            aria-hidden="true"
          />
        )}
      </span>
    </Link>
  );
}
