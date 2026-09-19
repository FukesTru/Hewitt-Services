import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { LegalList, LegalSection } from "@/components/Legal";
import { PageHero } from "@/components/PageHero";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Terms, SMS Terms & Disclaimer | ${site.name}`,
  description:
    "Website terms of use, SMS messaging terms, professional disclaimer and accessibility statement for Hewitt Services, a Dallas tax and accounting firm.",
  path: "/terms-and-disclaimer",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Terms and Disclaimer", path: "/terms-and-disclaimer" },
];

const LAST_UPDATED = "September 19, 2026";

/*
  TODO(client): have these terms reviewed by a qualified attorney before
  launch, together with the privacy policy.
*/

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        title="Terms of Use, SMS Terms and Disclaimer"
        lede="The terms that apply to this website, our text messages and the information published here."
        eyebrow="Legal"
        crumbs={crumbs}
      />

      <div className="section bg-white">
        <div className="wrap">
          <p className="text-sm text-ink/70">Last updated: {LAST_UPDATED}</p>

          <nav aria-label="On this page" className="mt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {[
                { label: "Terms of Use", href: "#terms-of-use" },
                { label: "SMS Terms", href: "#sms-terms" },
                { label: "Professional Disclaimer", href: "#disclaimer" },
                { label: "Accessibility", href: "#accessibility" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="font-semibold text-gold-dark hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12 space-y-12">
            <LegalSection id="terms-of-use" heading="Terms of Use">
              <p>
                By using hewittservices.net you agree to these terms. If you do not agree with them,
                please do not use the site.
              </p>
              <p>
                <strong className="font-semibold text-navy">Permitted use.</strong> You may view,
                download and print pages from this site for your own information and for the purpose
                of enquiring about our services. You may not republish material from this site,
                sell or license it, or use it for any commercial purpose without our written
                permission.
              </p>
              <p>
                <strong className="font-semibold text-navy">Intellectual property.</strong> The
                content, layout and design of this site belong to {site.name} or our licensors,
                except where otherwise stated.
              </p>
              <p>
                <strong className="font-semibold text-navy">Acceptable conduct.</strong> Do not use
                this site to transmit unlawful material, attempt to gain unauthorized access to any
                system, interfere with the site&rsquo;s operation, or send advertising or
                solicitations through our contact form.
              </p>
              <p>
                <strong className="font-semibold text-navy">External links.</strong> We link to
                government agencies and other third-party resources for convenience. We do not
                control those sites and are not responsible for their content or their privacy
                practices.
              </p>
              <p>
                <strong className="font-semibold text-navy">Availability.</strong> We aim to keep the
                site available, but we do not guarantee uninterrupted access and may change or
                withdraw any part of it.
              </p>
              <p>
                <strong className="font-semibold text-navy">Governing law.</strong> These terms are
                governed by the laws of the State of Texas.
              </p>
            </LegalSection>

            <LegalSection id="sms-terms" heading="SMS Terms and Conditions">
              <p>
                These terms apply to text messages sent by {site.name} to a mobile number you have
                given us, where you have opted in to receive them.
              </p>

              <p>
                <strong className="font-semibold text-navy">Programme description.</strong> We offer
                two separate, optional messaging programmes, and you choose each independently:
              </p>
              <LegalList
                items={[
                  "Non-marketing messages: appointment reminders, filing updates and service notifications relating to work we are carrying out for you",
                  "Marketing messages: promotions, tax tips and firm updates",
                ]}
              />

              <p>
                <strong className="font-semibold text-navy">How to opt in.</strong> Tick the relevant
                box on our contact form, or tell us in writing. Both boxes are unchecked by default,
                and neither is required in order to work with us. Consent to receive text messages is
                not a condition of any purchase.
              </p>

              <p>
                <strong className="font-semibold text-navy">Message frequency.</strong> Message
                frequency may vary.
              </p>

              <p>
                <strong className="font-semibold text-navy">Cost.</strong> Message and data rates may
                apply. We do not charge for the messages themselves; your mobile carrier may.
              </p>

              <p>
                <strong className="font-semibold text-navy">How to opt out.</strong> Reply STOP to any
                message to stop receiving messages from that programme. You will receive a single
                confirmation, after which no further messages will be sent.
              </p>

              <p>
                <strong className="font-semibold text-navy">How to get help.</strong> Text HELP to{" "}
                {site.phone.display} for help, call{" "}
                <a href={site.phone.href} className="text-gold-dark underline">
                  {site.phone.display}
                </a>
                , or email{" "}
                <a href={`mailto:${site.email}`} className="text-gold-dark underline">
                  {site.email}
                </a>
                .
              </p>

              <p>
                <strong className="font-semibold text-navy">Carriers and delivery.</strong> Delivery is
                not guaranteed, and carriers are not liable for delayed or undelivered messages.
              </p>

              <p>
                <strong className="font-semibold text-navy">Privacy.</strong> No mobile information
                will be shared with third parties or affiliates for marketing or promotional
                purposes. Text messaging originator opt-in data and consent are not shared with any
                third parties or affiliates. See our{" "}
                <Link href="/privacy-policy" className="text-gold-dark underline">
                  Privacy Policy
                </Link>{" "}
                for the full detail.
              </p>

              <p>
                <strong className="font-semibold text-navy">Sensitive information.</strong> Please do
                not send Social Security numbers, tax documents or other sensitive information by
                text message. Use the secure client portal.
              </p>
            </LegalSection>

            <LegalSection id="disclaimer" heading="Professional Disclaimer">
              <p>
                The information on this website is general in nature and is provided for educational
                purposes. It is not tax, legal, accounting or financial advice, and it does not take
                account of your particular circumstances. Do not act on it without speaking to a
                qualified professional about your own situation.
              </p>
              <p>
                <strong className="font-semibold text-navy">No client relationship.</strong> Using
                this website, submitting the contact form, or booking a consultation does not create
                a professional or client relationship. No engagement exists until it is agreed in
                writing between you and {site.name}.
              </p>
              <p>
                <strong className="font-semibold text-navy">No guarantee of results.</strong> Tax
                outcomes depend on your individual facts, your records and the law as it stands. We
                do not guarantee any particular outcome, refund amount, tax saving, settlement,
                approval or timeframe — including in matters before the IRS or the Texas
                Comptroller. Nothing on this site should be read as promising one.
              </p>
              <p>
                <strong className="font-semibold text-navy">Refund advances.</strong> Refund advance
                is subject to approval and eligibility. It is not your tax refund. Terms are provided
                by EPS Financial.
              </p>
              <p>
                <strong className="font-semibold text-navy">Our credentials.</strong> {site.name} is a
                tax and accounting practice led by an Enrolled Agent, a practitioner authorized by
                the federal government to represent taxpayers before the Internal Revenue Service. We
                are not a law firm and do not provide legal advice, and we are not a certified public
                accounting firm.
              </p>
              <p>
                <strong className="font-semibold text-navy">Currency of information.</strong> Tax law
                and filing dates change. Pages on this site are accurate to the best of our knowledge
                when written but may not reflect later changes.
              </p>
            </LegalSection>

            <LegalSection id="accessibility" heading="Accessibility Statement">
              <p>
                {site.name} wants this website to be usable by everyone, including people who use
                screen readers, keyboard navigation, magnification or other assistive technology.
              </p>
              <p>
                <strong className="font-semibold text-navy">Our target.</strong> We aim to meet the
                Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. In building this site we
                have worked to provide semantic structure and landmarks, a skip-to-content link,
                visible keyboard focus, text alternatives for images, labelled form fields, colour
                contrast that meets the AA thresholds, and support for the operating system&rsquo;s
                reduced-motion setting.
              </p>
              <p>
                <strong className="font-semibold text-navy">Ongoing work.</strong> Accessibility is not
                a one-off task. We review the site as it changes, and some third-party embedded
                content — such as the booking calendar and maps — is outside our direct control.
              </p>
              <p>
                <strong className="font-semibold text-navy">Telling us about a problem.</strong> If any
                part of this site is difficult to use, please tell us and we will put it right. Call{" "}
                <a href={site.phone.href} className="text-gold-dark underline">
                  {site.phone.display}
                </a>{" "}
                or email{" "}
                <a href={`mailto:${site.email}`} className="text-gold-dark underline">
                  {site.email}
                </a>
                . Describe the page and what went wrong, and we will respond and offer the
                information you needed in another format.
              </p>
            </LegalSection>

            <LegalSection heading="Contact">
              <p>
                {site.name}
                <br />
                {site.address.full}
                <br />
                <a href={site.phone.href} className="text-gold-dark underline">
                  {site.phone.display}
                </a>
                <br />
                <a href={`mailto:${site.email}`} className="text-gold-dark underline">
                  {site.email}
                </a>
              </p>
            </LegalSection>
          </div>
        </div>
      </div>
    </>
  );
}
