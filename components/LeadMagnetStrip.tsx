import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

/**
 * The organizer PDFs are client-supplied. Until the file exists the button
 * renders as a clearly worded "call us" fallback rather than a dead link.
 */
export function LeadMagnetStrip({
  heading = "Get your free Tax Organizer",
  body = "A simple checklist of everything to gather before your appointment, so nothing gets missed and nothing holds up your return.",
}: {
  heading?: string;
  body?: string;
}) {
  const href = site.downloads.taxOrganizer;

  return (
    <section id="downloads" className="bg-mist">
      <div className="wrap py-14">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-moss-dark/25 bg-white p-8 sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-serif text-2xl font-bold text-forest sm:text-3xl">{heading}</h2>
            <p className="mt-3 text-base leading-relaxed text-ink">{body}</p>
          </div>

          {href ? (
            <a href={href} download className="btn-primary shrink-0">
              Download the Tax Organizer
            </a>
          ) : (
            // PLACEHOLDER: client to upload the Tax Organizer PDF, then set
            // site.downloads.taxOrganizer in lib/site.ts.
            <div className="shrink-0">
              <a href={`mailto:${site.email}?subject=Tax%20Organizer%20request`} className="btn-primary">
                Request the Tax Organizer
              </a>
              <p className="mt-2 max-w-[16rem] text-xs text-ink/70">
                The download is being finalized — email us and we will send it straight over.
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
