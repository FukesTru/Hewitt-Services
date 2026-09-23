import Image from "next/image";
import Link from "next/link";

type Props = {
  /** "light" = placed on a dark green band; "dark" = on white or mist. */
  variant?: "light" | "dark";
  className?: string;
  priority?: boolean;
};

const LOGO = "/images/logo-hewitt-services.webp";

/**
 * The client's logo, used exactly as supplied.
 *
 * Its wordmark is near-black, which would disappear on the dark green header
 * and footer, so on those it sits on a white panel rather than being
 * recoloured — the artwork itself is never altered.
 */
export function Logo({ variant = "light", className = "", priority = false }: Props) {
  const onDark = variant === "light";

  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Hewitt Services — home"
    >
      <span
        className={
          onDark
            ? "inline-flex rounded-lg bg-white px-3 py-2 shadow-sm shadow-black/20 transition duration-300 hover:-translate-y-0.5"
            : "inline-flex transition duration-300 hover:-translate-y-0.5"
        }
      >
        <Image
          src={LOGO}
          alt=""
          width={330}
          height={72}
          priority={priority}
          className="h-8 w-auto sm:h-10"
        />
      </span>
    </Link>
  );
}
