import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { site } from "@/lib/site";

const SRC = "/images/demarcus-hewitt.jpg";

/**
 * Founder photograph.
 *
 * The supplied photograph of Demarcus Hewitt lives at public{SRC}. It is
 * rendered in a 4:5 frame with object-cover: the source is square, so the
 * crop trims the sides and keeps the full height (head and hands both stay
 * in frame).
 *
 * The monogram fallback below is kept for the case where the file is absent.
 * It is deliberately NOT an illustration or a stock portrait — a generated or
 * stock face standing in for a real, named person would misrepresent the firm.
 */
export function FounderPortrait({ className = "" }: { className?: string }) {
  const available = (() => {
    try {
      return fs.existsSync(path.join(process.cwd(), "public", SRC));
    } catch {
      return false;
    }
  })();

  if (available) {
    return (
      <Image
        src={SRC}
        alt={`${site.founder.name}, ${site.founder.jobTitle} of ${site.name}`}
        width={720}
        height={900}
        sizes="(min-width: 1024px) 24rem, 100vw"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`media-fallback flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center ${className}`}
      data-missing-asset={SRC}
    >
      <span
        aria-hidden="true"
        className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-moss/60 font-serif text-2xl text-moss"
      >
        DH
      </span>
      <span className="font-serif text-lg text-white">{site.founder.name}</span>
      <span className="text-sm text-chalk/80">{site.founder.jobTitle}</span>
    </div>
  );
}
