import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { LegalList, LegalSection } from "@/components/Legal";
import { PageHero } from "@/components/PageHero";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: `Privacy Policy | ${site.name}`,
  description:
    "How Hewitt Services collects, uses and protects personal information, including website data, client documents, cookies and SMS communications.",
  path: "/privacy-policy",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy-policy" },
];

const LAST_UPDATED = "September 19, 2026";

/*
  TODO(client): have this policy reviewed by a qualified attorney before
  launch. It is written to be accurate about how this website actually
  behaves, but it is not legal advice and it has not been reviewed against
  the firm's specific obligations, its vendor contracts, or Texas and federal
  requirements that may apply to a tax practice.
*/

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        title="Privacy Policy"
        lede="What we collect, why we collect it, and what we do not do with it."
        eyebrow="Legal"
        crumbs={crumbs}
      />

      <div className="section bg-white">
        <div className="wrap">
          <p className="text-sm text-ink/70">Last updated: {LAST_UPDATED}</p>

          <div className="mt-10 space-y-12">
            <section>
              <div className="max-w-prose space-y-4 text-base leading-relaxed text-ink">
                <p>
                  This policy explains how {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles
                  personal information collected through this website and in the course of providing
                  tax and accounting services. It applies to hewittservices.net and to the enquiry
                  and booking tools linked from it.
                </p>
              </div>
            </section>

            <LegalSection heading="Information we collect">
              <p>We collect information in three ways.</p>
              <p>
                <strong className="font-semibold text-forest">Information you give us.</strong> When you
                submit the contact form we collect your name, email address, telephone number, the
                service you are asking about, anything you write in the message field, and your
                choices on the consent checkboxes. When you book an appointment through our
                scheduling provider, that provider collects the details needed to arrange the
                meeting. When you become a client, we collect the documents and information required
                to carry out the engagement, which you upload through our secure client portal.
              </p>
              <p>
                <strong className="font-semibold text-forest">Information collected automatically.</strong>{" "}
                If you accept analytics cookies, our analytics provider records standard usage data
                such as the pages you visit, approximate location derived from your IP address,
                referring site, device type and browser. If you do not accept, no analytics tags are
                loaded.
              </p>
              <p>
                <strong className="font-semibold text-forest">Information from embedded services.</strong>{" "}
                Pages containing a map or a booking calendar load content from those providers, which
                may receive your IP address as part of delivering that content.
              </p>
            </LegalSection>

            <LegalSection heading="How we use information">
              <LegalList
                items={[
                  "To respond to your enquiry and arrange a consultation",
                  "To provide the tax, bookkeeping, compliance and representation services you engage us for",
                  "To communicate with you about work in progress, deadlines and appointments",
                  "To meet our legal, regulatory and professional obligations, including record-keeping requirements that apply to tax practitioners",
                  "To understand how this website is used and improve it, where you have accepted analytics cookies",
                  "To send marketing messages, only where you have opted in, and only until you opt out",
                ]}
              />
              <p>
                We do not sell personal information, and we do not rent or trade it.
              </p>
            </LegalSection>

            <LegalSection heading="Cookies and analytics">
              <p>
                Essential cookies and similar storage are used to make the site work. For example,
                remembering your cookie choice. These cannot be switched off without breaking the
                site.
              </p>
              <p>
                Analytics cookies are optional. We use Google Analytics 4 to understand how visitors
                use the site. The analytics tag is only loaded after you select
                &ldquo;Accept&rdquo; in the cookie banner. Selecting &ldquo;Deny&rdquo; means no
                analytics script is loaded at all, not merely that data is discarded. You can change
                your mind by clearing this site&rsquo;s data in your browser, which makes the banner
                appear again.
              </p>
            </LegalSection>

            <LegalSection heading="Service providers">
              <p>
                We use third-party providers to run parts of this service. Each receives only the
                information needed for its function.
              </p>
              <LegalList
                items={[
                  "Appointment scheduling: our booking provider, for arranging consultations",
                  "Secure client portal: our practice management provider, for document exchange and electronic signatures",
                  "Website form handling and email delivery: for transmitting enquiries to us",
                  "Website analytics: for usage measurement, only with your consent",
                  "Refund advances: EPS Financial, where you apply for a refund advance product",
                  // PLACEHOLDER: replace the generic descriptions above with the
                  // named providers and their own privacy policy links once the
                  // client confirms the final vendor list.
                ]}
              />
              <p>
                We may also disclose information where we are required to by law, by a court, or by a
                regulator, or where necessary to establish or defend legal claims.
              </p>
            </LegalSection>

            <LegalSection id="sms" heading="SMS and text messaging">
              <p>
                Text messaging consent is collected separately from every other permission on our
                contact form, and both SMS checkboxes are unchecked by default. You may opt in to
                non-marketing messages (such as appointment reminders, filing updates and service
                notifications), to marketing messages (such as promotions, tax tips and firm
                updates), to both, or to neither. Consent to receive text messages is not a condition
                of purchasing any goods or services.
              </p>
              <p className="rounded-lg border-l-4 border-moss-dark bg-mist p-5">
                <strong className="font-semibold text-forest">
                  No mobile information will be shared with third parties or affiliates for
                  marketing or promotional purposes.
                </strong>{" "}
                All the above categories exclude text messaging originator opt-in data and consent;
                this information will not be shared with any third parties or affiliates.
              </p>
              <p>
                Message frequency may vary. Message and data rates may apply. Reply STOP to any
                message to opt out. Text HELP to {site.phone.display} for help, or email us at{" "}
                <a href={`mailto:${site.email}`} className="text-moss-dark underline">
                  {site.email}
                </a>
                . Full messaging terms are set out in our{" "}
                <Link href="/terms-and-disclaimer#sms-terms" className="text-moss-dark underline">
                  SMS Terms and Conditions
                </Link>
                .
              </p>
            </LegalSection>

            <LegalSection heading="Data security">
              <p>
                Client documents are exchanged through an encrypted client portal rather than email
                attachments, and access is limited to the people who need it to carry out your work.
                This website is served over HTTPS.
              </p>
              <p>
                Please do not send Social Security numbers, full tax documents or other sensitive
                material through the website contact form or by ordinary email. Use the secure
                portal, or call us and we will set that up for you.
              </p>
              <p>
                No method of transmission or storage is completely secure, and we cannot guarantee
                absolute security.
              </p>
            </LegalSection>

            <LegalSection heading="How long we keep information">
              <p>
                Enquiries that do not become engagements are kept only as long as needed to respond
                and to keep a record of the contact. Client records are kept for as long as the
                professional, tax and legal record-keeping obligations that apply to our work
                require, and then disposed of securely.
              </p>
            </LegalSection>

            <LegalSection heading="Your choices and rights">
              <LegalList
                items={[
                  "Ask us what personal information we hold about you",
                  "Ask us to correct information that is inaccurate or incomplete",
                  "Ask us to delete information, where we are not required to retain it",
                  "Withdraw marketing consent at any time, including by replying STOP to a text message",
                  "Decline analytics cookies, or change your choice by clearing this site's data",
                ]}
              />
              <p>
                To make a request, email{" "}
                <a href={`mailto:${site.email}`} className="text-moss-dark underline">
                  {site.email}
                </a>{" "}
                or call {site.phone.display}. We may need to verify your identity before acting on a
                request, particularly where tax records are involved.
              </p>
            </LegalSection>

            <LegalSection heading="Children">
              <p>
                This website is not directed at children, and we do not knowingly collect personal
                information from children through it. Information about dependants provided as part
                of preparing a return is handled as part of the client engagement.
              </p>
            </LegalSection>

            <LegalSection heading="Changes to this policy">
              <p>
                We may update this policy from time to time. The date at the top of this page shows
                when it was last revised.
              </p>
            </LegalSection>

            <LegalSection heading="Contact us">
              <p>
                {site.name}
                <br />
                {site.address.full}
                <br />
                <a href={site.phone.href} className="text-moss-dark underline">
                  {site.phone.display}
                </a>
                <br />
                <a href={`mailto:${site.email}`} className="text-moss-dark underline">
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
