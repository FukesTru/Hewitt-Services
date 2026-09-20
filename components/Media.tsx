import Image from "next/image";
import type { Media as MediaType } from "@/lib/media";

type Props = {
  media: MediaType;
  /** Rendered behind content — always decorative, so alt text is suppressed. */
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
};

/**
 * Renders a photograph when the file is present, and a navy/gold gradient
 * panel when it is not. See lib/media.ts for why a file may be missing.
 */
export function Media({
  media,
  fill = false,
  priority = false,
  sizes = "100vw",
  className = "",
  width,
  height,
}: Props) {
  if (!media.available) {
    return (
      <div
        aria-hidden="true"
        className={`media-fallback ${fill ? "absolute inset-0 h-full w-full" : "h-full w-full"} ${className}`}
        // TODO(client assets): drop the generated JPG at {media.src} to replace
        // this gradient with the real photograph. No code change needed.
        data-missing-asset={media.src}
      />
    );
  }

  if (fill) {
    return (
      <>
        {/* Designed backdrop sitting behind the photograph. If the image is
            slow, or is being served from the Artlist CDN and that request
            fails, the area still reads as a navy/gold panel rather than a
            broken-image icon or a white hole. */}
        <div aria-hidden="true" className="media-fallback absolute inset-0" />
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${className}`}
        />
      </>
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={width ?? 1600}
      height={height ?? 900}
      priority={priority}
      sizes={sizes}
      loading={priority ? undefined : "lazy"}
      className={className}
    />
  );
}
