"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";

const SERVICE_OPTIONS = [
  "Monthly Bookkeeping",
  "Tax Planning",
  "Tax Preparation",
  "Back Taxes and Compliance",
  "IRS Tax Problems",
  "Texas Franchise Tax Reinstatement",
  "Refund Advances",
  "Not sure",
];

type Props = {
  /** "short" drops the message box and tightens spacing for CTA bands. */
  variant?: "full" | "short";
  /** Dark bands invert the labels. */
  tone?: "light" | "dark";
  /** Preselects the dropdown on a service page. */
  defaultInterest?: string;
  id?: string;
};

const SMS_TERMS =
  "Message frequency may vary. Message and data rates may apply. Reply STOP to opt out.";

export function ContactForm({
  variant = "full",
  tone = "light",
  defaultInterest,
  id = "contact-form",
}: Props) {
  const router = useRouter();
  const dark = tone === "dark";
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const label = `block text-sm font-medium ${dark ? "text-chalk" : "text-forest"}`;
  const field = `mt-1.5 block w-full rounded-md border px-3.5 py-2.5 text-base transition ${
    dark
      ? "border-white/20 bg-white/5 text-white placeholder:text-chalk/50 focus:border-moss"
      : "border-forest/20 bg-white text-ink placeholder:text-ink/40 focus:border-moss-dark"
  }`;
  const help = `text-xs leading-relaxed ${dark ? "text-chalk/70" : "text-ink/70"}`;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      router.push("/thank-you");
    } catch {
      setStatus("error");
      setError(
        `We could not send that just now. Please try again, or call us on ${site.phone.display}.`
      );
    }
  }

  return (
    <form id={id} onSubmit={onSubmit} noValidate={false} className="space-y-5">
      {/* Honeypot: a real person never fills this in. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company (leave blank)</label>
        <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-first`} className={label}>
            First name <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-first`}
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${id}-last`} className={label}>
            Last name <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-last`}
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={label}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={label}>
            Phone
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-interest`} className={label}>
          I need help with
        </label>
        <select
          id={`${id}-interest`}
          name="interest"
          defaultValue={defaultInterest ?? ""}
          className={field}
        >
          <option value="">Please choose</option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {variant === "full" ? (
        <div>
          <label htmlFor={`${id}-message`} className={label}>
            Message
          </label>
          <textarea id={`${id}-message`} name="message" rows={5} className={field} />
        </div>
      ) : null}

      {/* Required anti-solicitation confirmation. */}
      <div className="flex gap-3">
        <input
          id={`${id}-confirm`}
          name="serviceInquiryConfirmed"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-[#2F6A38]"
        />
        <label htmlFor={`${id}-confirm`} className={`text-sm ${dark ? "text-chalk" : "text-ink"}`}>
          I confirm this is a service inquiry and not an advertising message or solicitation.{" "}
          <span aria-hidden="true">*</span>
        </label>
      </div>

      {/* SMS consent: two separate, unchecked, entirely optional opt-ins. */}
      <fieldset className={`rounded-lg border p-4 ${dark ? "border-white/15" : "border-forest/15"}`}>
        <legend className={`px-2 text-sm font-semibold ${dark ? "text-chalk" : "text-forest"}`}>
          Text message consent (optional)
        </legend>

        <div className="flex gap-3">
          <input
            id={`${id}-sms-service`}
            name="smsServiceConsent"
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-[#2F6A38]"
          />
          <label htmlFor={`${id}-sms-service`} className={`text-sm ${dark ? "text-chalk" : "text-ink"}`}>
            I agree to receive non-marketing text messages from {site.name}, such as appointment
            reminders, filing updates and service notifications.
            <span className={`mt-1 block ${help}`}>
              {SMS_TERMS} Text HELP to {site.phone.display} for help.
            </span>
          </label>
        </div>

        <div className="mt-4 flex gap-3">
          <input
            id={`${id}-sms-marketing`}
            name="smsMarketingConsent"
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-[#2F6A38]"
          />
          <label
            htmlFor={`${id}-sms-marketing`}
            className={`text-sm ${dark ? "text-chalk" : "text-ink"}`}
          >
            I agree to receive marketing text messages from {site.name}, such as promotions, tax tips
            and firm updates.
            <span className={`mt-1 block ${help}`}>
              {SMS_TERMS} Text HELP to {site.phone.display} for help.
            </span>
          </label>
        </div>

        <p className={`mt-4 ${help}`}>
          Consent to receive text messages is not a condition of purchase. See our{" "}
          <Link
            href="/privacy-policy"
            className={`underline ${dark ? "text-moss" : "text-moss-dark"}`}
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="/terms-and-disclaimer#sms-terms"
            className={`underline ${dark ? "text-moss" : "text-moss-dark"}`}
          >
            SMS Terms
          </Link>
          .
        </p>
      </fieldset>

      <button type="submit" disabled={status === "sending"} className="btn-primary w-full sm:w-auto">
        {status === "sending" ? "Sending…" : "Send my inquiry"}
      </button>

      <p aria-live="polite" className="min-h-[1.25rem]">
        {error ? <span className="text-sm font-medium text-red-500">{error}</span> : null}
      </p>

      <p className={help}>
        For your security, please do not email Social Security numbers or full tax documents. Use our{" "}
        <a
          href={site.links.portal}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline ${dark ? "text-moss" : "text-moss-dark"}`}
        >
          secure client portal
        </a>
        .
      </p>
    </form>
  );
}
