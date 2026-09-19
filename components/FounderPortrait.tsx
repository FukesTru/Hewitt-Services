import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { site } from "@/lib/site";

const SRC = "/images/demarcus-hewitt.jpg";

/**
 * Founder photograph.
 *
 * TODO(client assets): the client is uploading a photograph of Demarcus
 * Hewitt. Drop it at public{SRC} and it renders automatically. Deliberately
 * NOT an illustration or a stock portrait — a generated or stock face standing
 * in for a real, named person would misrepresent the firm.
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
        className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/60 font-serif text-2xl text-gold"
      >
        DH
      </span>
      <span className="font-serif text-lg text-white">{site.founder.name}</span>
      <span className="text-sm text-chalk/80">{site.founder.jobTitle}</span>
    </div>
  );
}
