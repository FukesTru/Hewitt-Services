import Script from "next/script";

const FORM_ID = "6sdCYX21g6paqY5PPANN";

/**
 * The firm's LeadConnector form, embedded as the vendor ships it.
 *
 * One deliberate change from the pasted snippet: the vendor sets
 * `height:100%`, which collapses to nothing inside a container that has no
 * height of its own. The height is fixed at the vendor's own `data-height`
 * instead, so the form is the right size before form_embed.js loads and
 * still renders if that script is blocked or slow.
 *
 * Everything the form collects, and every consent it takes, is configured in
 * LeadConnector rather than here. See PRELAUNCH 1.6: the anti-solicitation
 * confirmation and the two SMS opt-ins that the old form carried have to be
 * rebuilt in the LeadConnector form builder.
 */
export function LeadForm() {
  return (
    <>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
        id={`inline-${FORM_ID}`}
        title="Website Form (Hewitt Services)"
        style={{ width: "100%", height: "541px", border: "none", borderRadius: "10px" }}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Website Form (Hewitt Services)"
        data-height="541"
        data-layout-iframe-id={`inline-${FORM_ID}`}
        data-form-id={FORM_ID}
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
