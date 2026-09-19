import type { Faq } from "./services";

export type FaqGroup = {
  /** Anchor id used by the sticky topic filter on /faq. */
  id: string;
  heading: string;
  faqs: Faq[];
};

export const faqGroups: FaqGroup[] = [
  {
    id: "working-with-us",
    heading: "Working with us",
    faqs: [
      {
        q: "What services does Hewitt Services offer?",
        a: "Monthly bookkeeping, proactive tax planning, tax preparation for individuals and businesses, back tax filing, IRS problem resolution, Texas franchise tax reinstatement, and refund advances for eligible clients through EPS Financial. Most clients use two or three of these together, because the work overlaps more than the categories suggest.",
        link: { label: "See all services", href: "/services" },
      },
      {
        q: "Do you work with both individuals and business owners?",
        a: "Yes, and often the same people in both capacities. Individuals and families come to us for accurate returns and for help with IRS matters. Business owners come for bookkeeping, planning and compliance. When someone is both, handling the personal and business sides together usually produces a better result than splitting them.",
        link: { label: "About the firm", href: "/about" },
      },
      {
        q: "Do you offer virtual tax and accounting services?",
        a: "Yes. Clients across Texas work with us entirely remotely: documents move through the secure client portal, returns are reviewed together on a call, and signatures are electronic. Clients in the Dallas-Fort Worth area can also meet in person at our Estate Lane office. Many people mix the two.",
        link: { label: "Contact us", href: "/contact" },
      },
    ],
  },
  {
    id: "bookkeeping-and-planning",
    heading: "Bookkeeping and planning",
    faqs: [
      {
        q: "Why is monthly bookkeeping important?",
        a: "Because a year reconstructed in March is guesswork, and a year recorded as it happens is information. Monthly books show cash flow, profit and spending while you can still act on them, prevent small errors compounding across twelve months, and stop deductions being missed because nobody remembered the purchase.",
        link: { label: "Monthly Bookkeeping", href: "/services/monthly-bookkeeping" },
      },
      {
        q: "How does tax planning benefit high-income earners and business owners?",
        a: "Planning happens while the year is still open, when entity structure, the timing of income, estimated payments and major decisions can all still change the outcome. A return prepared after the year closes can only report what already happened. The more moving parts in your finances, the wider that gap becomes.",
        link: { label: "Tax Planning", href: "/services/tax-planning" },
      },
    ],
  },
  {
    id: "irs-and-back-taxes",
    heading: "IRS and back taxes",
    faqs: [
      {
        q: "What should I do if I have not filed taxes in several years?",
        a: "Find out where you actually stand rather than guessing, which usually means pulling your IRS account and wage transcripts to see which years are genuinely missing. Then file, in a sensible order, before addressing any balance. The IRS generally expects missing returns on file before it will discuss payment arrangements or relief.",
        link: { label: "Back Taxes and Compliance", href: "/services/back-taxes-compliance" },
      },
      {
        q: "Can you help with IRS letters, audits or payment plans?",
        a: "Yes. Demarcus Hewitt is an Enrolled Agent, federally authorized to represent taxpayers before the IRS, so with a signed authorization we handle correspondence and calls directly. We review notices, respond within the deadline, represent you in audits, and work through the payment options your circumstances support. Outcomes are never guaranteed.",
        link: { label: "IRS Tax Problems", href: "/services/irs-tax-problems" },
      },
    ],
  },
  {
    id: "franchise-tax",
    heading: "Texas franchise tax",
    faqs: [
      {
        q: "What is franchise tax reinstatement?",
        a: "When a Texas entity misses its annual franchise tax reports, the state can forfeit its right to transact business. Reinstatement is the process of putting that right: filing every missing report, resolving the balances and penalties blocking it, and submitting reinstatement paperwork so the entity returns to good standing.",
        link: {
          label: "Texas Franchise Tax Reinstatement",
          href: "/services/franchise-tax-reinstatement",
        },
      },
    ],
  },
  {
    id: "refund-advances",
    heading: "Refund advances",
    faqs: [
      {
        q: "How do refund advances through EPS Financial work?",
        a: "We prepare and file your return. Once the IRS accepts it, you can apply for an advance through EPS Financial. If approved, funds are issued to a debit card or by direct deposit, and the advance is repaid automatically from your refund. It is a separate product with its own terms, not your refund arriving early.",
        disclosure: true,
        link: { label: "Refund Advances", href: "/services/refund-advances" },
      },
    ],
  },
  {
    id: "getting-started",
    heading: "Getting started",
    faqs: [
      {
        q: "How do I book a first call, and what happens on it?",
        a: "Book online or call us, and the first conversation is free. You describe where things stand — no documents needed. We tell you what we would do about it, roughly what it involves and what it costs. If we are not the right fit, we will say so. Nothing is decided on that call.",
        link: { label: "Book a discovery call", href: "/contact" },
      },
    ],
  },
];

/** Flat list, used for the FAQPage schema on /faq. */
export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.faqs);

/** Four-question teaser for the homepage. */
export const homeFaqs: Faq[] = [
  faqGroups[0].faqs[0],
  faqGroups[2].faqs[0],
  faqGroups[1].faqs[1],
  faqGroups[5].faqs[0],
];
