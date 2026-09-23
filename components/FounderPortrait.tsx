import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { site } from "@/lib/site";

const SRC = "/images/demarcus-hewitt.jpg";

/**
 * Founder photograph, in its frame.
 *
 * The supplied photograph lives at public{SRC}. It was cropped to 4:5 around
 * the subject (the original is square and included a stretch of office wall
 * and a printer on the right) and the mahogany behind him was desaturated a
 * little so it sits with the green palette instead of fighting it. Nothing
 * about the subject was altered.
 *
 * The frame — a soft green block set behind one corner — is part of the
 * component rather than the call sites, so the homepage and the about page
 * cannot drift apart.
 *
 * The monogram fallback is kept for the case where the file is absent. It is
 * deliberately NOT an illustration or a stock portrait: a generated face
 * standing in for a real, named person would misrepresent the firm.
 */
export function FounderPortrait({ className = "" }: { className?: string }) {
  const available = (() => {
    try {
      return fs.existsSync(path.join(process.cwd(), "public", SRC));
    } catch {
      return false;
    }
  })();

  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="absolute -bottom-3 -left-3 h-2/3 w-2/3 rounded-2xl bg-moss/45 sm:-bottom-5 sm:-left-5"
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-forest shadow-2xl shadow-forest/20 ring-1 ring-forest/10">
        {available ? (
          <Image
            src={SRC}
            alt={`${site.founder.name}, ${site.founder.jobTitle} of ${site.name}`}
            width={1000}
            height={1250}
            sizes="(min-width: 1024px) 24rem, 100vw"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="media-fallback flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center"
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
        )}
      </div>
    </div>
  );
}
