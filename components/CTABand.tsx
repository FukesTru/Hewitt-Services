import Link from "next/link";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

type Props = {
  heading?: string;
  body?: string;
  /** Include the panel alongside the copy. */
  withForm?: boolean;
  /**
   * What the visitor was reading when they hit this band. Passed straight
   * through to the form page so the message panel can name it.
   */
  defaultInterest?: string;
};

export function CTABand({
  heading = "Let's start with a free discovery call",
  body = "Tell us where things stand. We will tell you what we would do about it, what it involves and what it costs, before you commit to anything.",
  withForm = true,
  defaultInterest,
}: Props) {
  return (
    <section className="on-dark bg-forest">
      <div className="wrap section">
        <div className={`grid gap-12 ${withForm ? "lg:grid-cols-2" : ""}`}>
          <Reveal>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">{heading}</h2>
            <span className="accent-rule mt-5" aria-hidden="true" />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-chalk sm:text-lg">{body}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={site.links.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Book a Free Discovery Call
              </a>
              <a href={site.phone.href} className="btn-secondary">
                Call {site.phone.display}
              </a>
            </div>

            <p className="mt-8 text-sm text-chalk/70">
              {site.address.full}
              <br />
              <a href={`mailto:${site.email}`} className="underline hover:text-moss">
                {site.email}
              </a>
            </p>
          </Reveal>

          {/* The message form itself lives on /contact. Embedding the
              LeadConnector iframe in this band would put a third-party frame
              on nearly every page of the site, so this links to it instead. */}
          {withForm ? (
            <Reveal delay={1}>
              <div className="rounded-2xl bg-forest-dark p-6 ring-1 ring-white/10 sm:p-8">
                <h3 className="font-serif text-xl font-semibold text-white">Prefer to write?</h3>
                <p className="mt-3 text-sm leading-relaxed text-chalk/80">
                  {defaultInterest
                    ? `Send us a message about ${defaultInterest.toLowerCase()} and we will come back to you. Every inquiry gets a reply.`
                    : "Send us a message and we will come back to you. Every inquiry gets a reply."}
                </p>
                <Link href="/contact" className="btn-primary mt-6 inline-flex">
                  Send us a message
                </Link>
                <p className="mt-6 text-xs leading-relaxed text-chalk/70">
                  Please do not send Social Security numbers or full tax documents by email. Client
                  documents go through the secure portal.
                </p>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
