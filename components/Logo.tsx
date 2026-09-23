import Image from "next/image";
import Link from "next/link";

type Props = {
  /** True when placed on one of the dark green bands, e.g. the footer. */
  onDark?: boolean;
  className?: string;
  priority?: boolean;
};

const LOGO = "/images/logo-hewitt-services.webp";

/**
 * The client's logo, used exactly as supplied.
 *
 * Its wordmark is near-black. The header is light, so there it sits on the
 * background directly; on the dark green footer it needs a white panel behind
 * it. Either way the artwork is never recoloured, cropped or redrawn.
 */
export function Logo({ onDark = false, className = "", priority = false }: Props) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Hewitt Services — home"
    >
      <span
        className={`inline-flex transition duration-300 hover:-translate-y-0.5 ${
          onDark ? "rounded-lg bg-white px-3 py-2 shadow-sm shadow-black/20" : ""
        }`}
      >
        <Image
          src={LOGO}
          alt=""
          width={330}
          height={72}
          priority={priority}
          className="h-9 w-auto sm:h-11"
        />
      </span>
    </Link>
  );
}
