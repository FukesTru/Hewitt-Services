import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

function str(value: unknown, max = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function checked(value: unknown): boolean {
  return value === "on" || value === true || value === "true";
}

/**
 * Contact form endpoint.
 *
 * Validates the submission, then hands it to whichever transport is
 * configured. Nothing here stores personal data on disk.
 *
 * TODO(deploy): set CONTACT_WEBHOOK_URL to the firm's form/email service
 * (for example a Formspree, Resend, SendGrid or Zapier endpoint) so
 * submissions reach info@hewittservices.net. Until it is set, the route
 * accepts and logs the submission so the form works end-to-end in
 * development without silently pretending to deliver in production.
 */
export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: only a bot fills this in. Answer 200 so it learns nothing.
  if (str(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const submission = {
    firstName: str(body.firstName, 100),
    lastName: str(body.lastName, 100),
    email: str(body.email, 200),
    phone: str(body.phone, 50),
    interest: str(body.interest, 100),
    message: str(body.message, 5000),
    serviceInquiryConfirmed: checked(body.serviceInquiryConfirmed),
    smsServiceConsent: checked(body.smsServiceConsent),
    smsMarketingConsent: checked(body.smsMarketingConsent),
    submittedAt: new Date().toISOString(),
  };

  const missing = (["firstName", "lastName", "email"] as const).filter((k) => !submission[k]);
  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Missing required field(s): ${missing.join(", ")}.` },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(submission.email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!submission.serviceInquiryConfirmed) {
    return NextResponse.json(
      { ok: false, error: "Please confirm this is a service inquiry." },
      { status: 400 }
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: site.email,
          subject: `Website inquiry — ${submission.firstName} ${submission.lastName}`,
          ...submission,
        }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[contact] delivery failed:", err);
      return NextResponse.json(
        { ok: false, error: "We could not send that just now. Please try again or call us." },
        { status: 502 }
      );
    }
  } else {
    console.warn(
      `[contact] CONTACT_WEBHOOK_URL is not set — submission not delivered to ${site.email}.`,
      submission
    );
  }

  /*
    ── CRM webhook slot ────────────────────────────────────────────────────
    Post the same `submission` object to the firm's CRM here once one is
    chosen, so leads land in both the inbox and the pipeline. Keep it in a
    try/catch of its own: a CRM outage must never fail the visitor's submit.

    if (process.env.CRM_WEBHOOK_URL) {
      try {
        await fetch(process.env.CRM_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submission),
        });
      } catch (err) {
        console.error("[contact] CRM delivery failed:", err);
      }
    }
    ────────────────────────────────────────────────────────────────────────
  */

  return NextResponse.json({ ok: true });
}
