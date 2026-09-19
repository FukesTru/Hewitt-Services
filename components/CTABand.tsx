import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

type Props = {
  heading?: string;
  body?: string;
  /** Include the short inquiry form alongside the copy. */
  withForm?: boolean;
  defaultInterest?: string;
};

export function CTABand({
  heading = "Let's start with a free discovery call",
  body = "Tell us where things stand. We will tell you what we would do about it, what it involves and what it costs — before you commit to anything.",
  withForm = true,
  defaultInterest,
}: Props) {
  return (
    <section className="on-dark bg-navy">
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
              <a href={`mailto:${site.email}`} className="underline hover:text-gold">
                {site.email}
              </a>
            </p>
          </Reveal>

          {withForm ? (
            <Reveal delay={1}>
              <div className="rounded-2xl bg-navy-dark p-6 ring-1 ring-white/10 sm:p-8">
                <h3 className="font-serif text-xl font-semibold text-white">Send us a message</h3>
                <p className="mt-2 text-sm text-chalk/80">
                  We reply to every inquiry. Fields marked * are required.
                </p>
                <div className="mt-6">
                  <ContactForm
                    variant="short"
                    tone="dark"
                    defaultInterest={defaultInterest}
                    id="cta-form"
                  />
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
