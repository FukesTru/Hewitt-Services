import Link from "next/link";

type Props = { variant?: "light" | "dark"; className?: string };

/**
 * Typographic wordmark.
 *
 * TODO(client assets): the client is uploading the Hewitt Services logo.
 * Replace the markup below with the supplied file (keep the Link wrapper and
 * the accessible name) and re-check the palette in tailwind.config.ts against
 * the logo's actual brand colors.
 */
export function Logo({ variant = "light", className = "" }: Props) {
  const isLight = variant === "light";
  return (
    <Link
      href="/"
      className={`group inline-flex flex-col leading-none ${className}`}
      aria-label="Hewitt Services — home"
    >
      <span
        className={`font-serif text-xl font-bold tracking-tight sm:text-2xl ${
          isLight ? "text-white" : "text-forest"
        }`}
      >
        Hewitt <span className={isLight ? "text-moss" : "text-moss-dark"}>Services</span>
      </span>
      <span
        className={`mt-1 h-px w-10 transition-all duration-300 group-hover:w-16 ${
          isLight ? "bg-moss" : "bg-moss-dark"
        }`}
        aria-hidden="true"
      />
    </Link>
  );
}
