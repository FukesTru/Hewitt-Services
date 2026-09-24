export type Faq = {
  q: string;
  a: string;
  /** Renders the EPS Financial disclosure placeholder block beneath the answer. */
  disclosure?: boolean;
  /**
   * Optional "read more" link rendered under the answer. Kept out of `a` so
   * the FAQPage schema carries clean answer text with no link furniture.
   */
  link?: { label: string; href: string };
};

export type Step = { title: string; body: string };

export type Service = {
  slug: string;
  /** Short label used in nav, cards and breadcrumbs. */
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keyword: string;
  /** One-sentence promise under the hero H1. */
  promise: string;
  /** Card blurb on the services grid and hub. */
  cardBlurb: string;
  /** ~200 word intro, plain English. */
  intro: string[];
  handles: string[];
  steps: Step[];
  whoFor: { lead: string; bullets: string[] };
  faqs: Faq[];
  /** Slugs of related services rendered as cards. */
  related: string[];
  image: { src: string; alt: string };
  /** Optional red banner rendered near the top of the page. */
  urgentBanner?: string;
};

export const services: Service[] = [
  {
    slug: "monthly-bookkeeping",
    name: "Monthly Bookkeeping",
    h1: "Monthly Bookkeeping Services in Dallas, TX",
    metaTitle: "Monthly Bookkeeping Dallas, TX | Hewitt Services",
    metaDescription:
      "Monthly bookkeeping and cleanup for Dallas businesses: categorization, reconciliations and clear financial reports that keep you tax-ready. Book a free call.",
    keyword: "monthly bookkeeping Dallas",
    promise:
      "Books that stay current, reconciled and tax-ready every month, not reconstructed in a panic each April.",
    cardBlurb:
      "Transactions categorized, accounts reconciled and readable reports in your hands every month.",
    intro: [
      "Books updated every month show you cash flow, profit and spending as they actually are. Books left for a year have to be reconstructed from bank statements and memory.",
      "We categorize, reconcile and report each month for businesses in Dallas and across Texas. If your records are behind, we clean them up first, then keep them current.",
    ],
    handles: [
      "Transaction categorization reviewed by a person, not left to software rules",
      "Bank and credit card reconciliation every month",
      "Customized financial reports covering profit, expenses and spending trends",
      "Catch-up and cleanup for books that are behind or were never set up properly",
      "Clean records that make tax preparation faster and more accurate",
      "CFO-level insight for owners who want more than data entry",
      "Expert review of every account before the month is closed",
      "Virtual or in-person support, whichever suits how you work",
    ],
    steps: [
      {
        title: "Free discovery call",
        body: "We look at the books you have now, the software you already use and how the business actually runs day to day. You will get a straight answer about the state of your records and what bringing them current involves.",
      },
      {
        title: "Cleanup and setup",
        body: "Where there is a backlog, we work through it first and agree the scope with you before starting. Accounts are connected properly, the chart of accounts is set up to match your business, and the history is reconciled.",
      },
      {
        title: "Monthly categorization, reconciliation and reports",
        body: "Every month we categorize activity, reconcile each account and close the period. You receive reports on profit, expenses and trends, and we raise anything that looks unusual rather than quietly guessing at it.",
      },
      {
        title: "Year-round check-ins",
        body: "We stay in touch through the year rather than surfacing in March. Current numbers feed straight into tax planning, so strategy is based on what is happening now instead of what happened last year.",
      },
    ],
    whoFor: {
      lead: "Monthly bookkeeping tends to be the right fit if you are running the business and the books at the same time, and the books keep losing.",
      bullets: [
        "Small and mid-size business owners who need reliable monthly numbers",
        "Self-employed professionals whose records live in a shoebox or a spreadsheet",
        "Growing companies that are not ready for an in-house accountant",
        "Owners whose books are behind and who want a clean starting point",
      ],
    },
    faqs: [
      {
        q: "What does monthly bookkeeping include?",
        a: "Each month we categorize your transactions, reconcile your bank and credit card accounts, and review every account before closing the period. You receive reports showing profit, expenses and trends. Anything unusual gets flagged and asked about rather than guessed at, so the record matches what actually happened in the business.",
      },
      {
        q: "How is monthly bookkeeping different from an annual cleanup?",
        a: "An annual cleanup reconstructs a year that has already happened, usually under deadline pressure. Monthly bookkeeping records the year as it unfolds, while you still remember the details behind each transaction. It also puts numbers in your hands during the year, rather than delivering a report that arrives too late to act on.",
      },
      {
        q: "Can you clean up several months or years of messy books?",
        a: "Yes. Catch-up work is a routine part of what we do. We start by reviewing what exists, identifying the gaps and agreeing the scope with you before any work begins. Once the history is accurate and reconciled, we move you onto a monthly schedule so the same backlog does not rebuild.",
      },
      {
        q: "Do I need to change my accounting software?",
        a: "Not necessarily. We review your current setup on the discovery call and tell you honestly whether it is serving you. Plenty of businesses are perfectly well served by what they already have. If a change would genuinely help, we explain why and what the transition involves before you decide anything.",
      },
      {
        q: "How do you protect my bank and credit card data?",
        a: "Documents and statements move through the secure client portal rather than email attachments, and access is limited to the people doing your work. We use read-only connections wherever the software supports them, and we never need your online banking password to keep your books current.",
      },
      {
        q: "Do you offer virtual and in-person support?",
        a: "Both. Clients across Texas work with us entirely virtually through the secure portal, with calls scheduled to suit them. Clients in the Dallas-Fort Worth area often prefer to sit down at our Estate Lane office. Many people mix the two, meeting in person once or twice a year and handling everything else remotely.",
      },
    ],
    related: ["tax-planning", "tax-preparation", "franchise-tax-reinstatement"],
    image: {
      src: "/images/services/monthly-bookkeeping.jpg",
      alt: "An organized bookkeeping desk with a laptop, a columnar ledger pad and neatly clipped receipts under warm light",
    },
  },

  {
    slug: "tax-planning",
    name: "Tax Planning",
    h1: "Tax Planning Services in Dallas and Fort Worth, TX",
    metaTitle: "Tax Planning Services Dallas | Hewitt Services",
    metaDescription:
      "Proactive tax planning in Dallas and Fort Worth for business owners and high earners: entity structure, income strategy and year-round monitoring.",
    keyword: "tax planning services Dallas",
    promise:
      "Twelve months of strategy, not one night of data entry in April.",
    cardBlurb:
      "Year-round strategy for business owners and high earners, built on current numbers.",
    intro: [
      "Filing a return reports what already happened. Planning decides what happens next, while there is still time in the year to act on it.",
      "We plan for higher earners and established business owners in Dallas, Fort Worth and across Texas. Strategy is tied to your actual numbers, not to a generic checklist.",
    ],
    handles: [
      "Entity structuring review: whether your current structure still fits the business you actually run",
      "Income and deduction alignment across the whole year",
      "Year-round monitoring instead of an April surprise",
      "Estimated tax payment planning and scheduling",
      "Coordination with your bookkeeping, financial advisor and attorney",
      "Planning ahead of major events: a sale, an expansion, a new hire, retirement",
      "Back tax cleanup where needed, so planning starts from a clean slate",
      "CFO-level insight into profit, margin and cash flow",
    ],
    steps: [
      {
        title: "Discovery call and review",
        body: "We read your most recent return and look at where the current year stands. That combination shows what was left on the table last year and what is still open this year.",
      },
      {
        title: "Planning session and written strategy",
        body: "We walk through the options that fit your facts, explain the reasoning behind each one, and give you the strategy in writing. You should be able to understand every recommendation well enough to explain it yourself.",
      },
      {
        title: "Implementation",
        body: "Strategy that stays on paper saves nothing. We work with your bookkeeping and alongside your other advisors to put the agreed steps in place, in the right order and within the right deadlines.",
      },
      {
        title: "Ongoing monitoring and adjustments",
        body: "Businesses change and so does tax law. We revisit the plan through the year, adjust as your numbers move, and keep estimated payments aligned with reality rather than with a forecast made in January.",
      },
    ],
    whoFor: {
      lead: "Planning earns its keep when there are enough moving parts that a single annual return cannot do them justice.",
      bullets: [
        "Business owners with roughly $300K or more in revenue",
        "High-income individuals with more than one income source",
        "Owners approaching a sale, an expansion or a significant hire",
        "Anyone whose tax bill has been arriving as an unpleasant surprise",
      ],
    },
    faqs: [
      {
        q: "Who benefits most from proactive tax planning?",
        a: "Owners with roughly $300,000 or more in revenue tend to see the clearest benefit, along with high earners drawing income from several sources. The more moving parts in your year (multiple entities, property, equity compensation, irregular income), the more there is to plan around, and the less a once-a-year return can do.",
      },
      {
        q: "What is the difference between tax planning and tax preparation?",
        a: "Preparation reports a year that has already closed, when every number is fixed. Planning happens while the year is still open and choices about timing, structure and spending can still change the outcome. Most clients need both: planning through the year, and careful preparation at the end of it.",
      },
      {
        q: "How can entity structure affect my taxes?",
        a: "How a business is organized affects how profit is taxed, what you can pay yourself and which elections are available to you. A structure that suited a brand-new business may not suit one several years on. We review whether yours still fits, and we say so plainly when the answer is that it already does.",
      },
      {
        q: "When should I start tax planning?",
        a: "Earlier in the year gives more room to work, but there is rarely a bad time to start. Options narrow as December approaches and narrow sharply once the year closes. If you are reading this in the fourth quarter there is usually still something worth doing, just less than there was in March.",
      },
      {
        q: "Can you coordinate with my bookkeeper or financial advisor?",
        a: "Yes, and we prefer to. Planning works best when everyone is looking at the same numbers. We will work alongside an existing bookkeeper or advisor and keep them informed of anything affecting their side. Moving your bookkeeping to us is an option, not a condition of working together.",
      },
      {
        q: "Do you guarantee a specific amount of tax savings?",
        a: "No, and it is worth being cautious with any firm that does. What you owe depends on your income, your structure, your records and current law, none of which anyone can promise in advance. What we can do is review your situation thoroughly, explain the options honestly and show the reasoning behind every recommendation.",
      },
    ],
    related: ["monthly-bookkeeping", "tax-preparation", "back-taxes-compliance"],
    image: {
      src: "/images/services/tax-planning.jpg",
      alt: "Two advisers reviewing hand-drawn diagrams in a notebook across a dark walnut conference table",
    },
  },

  {
    slug: "tax-preparation",
    name: "Tax Preparation",
    h1: "Tax Preparation Services in Dallas, TX",
    metaTitle: "Tax Preparation Dallas, TX | Hewitt Services",
    metaDescription:
      "Accurate individual and small business tax preparation in Dallas, TX. Secure uploads, e-signatures, virtual or in-person appointments. Book a free consultation.",
    keyword: "tax preparation Dallas TX",
    promise:
      "Accurate returns, prepared carefully and filed on time, in person or entirely online.",
    cardBlurb:
      "Individual, family and small business returns prepared with the questions actually asked.",
    intro: [
      "A return is the official record of a year of your life, and small errors in it have a way of becoming letters later.",
      "We prepare individual, family and business returns, in person in Dallas or entirely online. Most missed deductions are missed because nobody asked, so we ask.",
    ],
    handles: [
      "Individual and family returns",
      "Self-employed and small business returns",
      "A full review of the credits and deductions available to you",
      "Prior-year and amended returns",
      "Electronic filing with direct deposit",
      "Secure document upload and electronic signature",
      "Support if an IRS notice arrives about a return we prepared, or one you bring us",
      "A free Tax Organizer so you arrive prepared",
    ],
    steps: [
      {
        title: "Book an appointment",
        body: "Choose in person at our Dallas office or a virtual appointment from anywhere in Texas. Either way you get a real conversation, not a drop-off counter.",
      },
      {
        title: "Upload documents securely",
        body: "Everything moves through the encrypted client portal. Nothing sensitive needs to travel by email, and the Tax Organizer tells you exactly what to gather before you start.",
      },
      {
        title: "We prepare and review with you",
        body: "We prepare the return, then walk you through it before anything is filed. You should understand what each meaningful line represents and why it is there.",
      },
      {
        title: "E-sign and file",
        body: "You sign electronically and we file. We explain the refund options available to you, including direct deposit and, for eligible clients, a refund advance through EPS Financial.",
      },
    ],
    whoFor: {
      lead: "If your situation is simple, we will file it accurately and quickly. If it is complicated, that is exactly when careful preparation pays for itself.",
      bullets: [
        "Individuals and families, including first-time filers",
        "Self-employed people, contractors and gig workers",
        "Small business owners and single-member LLCs",
        "Anyone who needs a prior-year or amended return prepared",
      ],
    },
    faqs: [
      {
        q: "What should I bring to my tax appointment?",
        a: "Photo identification, your income documents such as W-2s and 1099s, last year's return if you have it, records supporting any deductions or credits you plan to claim, and your bank details for direct deposit. Our free Tax Organizer walks through the full list so you can gather everything in one pass.",
      },
      {
        q: "Do you prepare returns for self-employed people and business owners?",
        a: "Yes. Self-employed returns, single-member LLCs and small business filings are a regular part of our work. If your bookkeeping is behind, we can bring it current first. A return built on incomplete records is where most avoidable errors start.",
      },
      {
        q: "Can I file without visiting your office?",
        a: "Yes. Many clients across Texas never come in. You upload documents to the secure portal, we prepare the return, we review it together on a call, and you sign electronically. The process is identical to filing in person, and nothing sensitive travels by email.",
      },
      {
        q: "When will I receive my refund?",
        a: "We cannot promise a date, and no preparer honestly can, because the timing sits with the IRS. Electronic filing with direct deposit is generally the fastest route. Certain credits and any review of your return can extend the wait. You can follow your own refund using the IRS tools in our Tax Center.",
      },
      {
        q: "Can you help if I am missing documents?",
        a: "Usually, yes. Employers and financial institutions can reissue most forms, and we can request IRS wage and income transcripts showing much of what was reported under your Social Security number. Missing records slow things down, but they rarely stop an accurate return from being filed.",
      },
      {
        q: "What if I owe and cannot pay in full?",
        a: "File anyway. The penalties for failing to file are generally steeper than those for failing to pay, so filing on time protects you even when the balance does not go away. We will file the accurate return, then walk through the options, including IRS payment plans, and pick up from there if enforcement has already begun.",
      },
    ],
    related: ["refund-advances", "tax-planning", "back-taxes-compliance"],
    image: {
      src: "/images/services/tax-preparation.jpg",
      alt: "A tidy desk with a blank tax form, a slim calculator, reading glasses and a fountain pen under warm light",
    },
  },

  {
    slug: "back-taxes-compliance",
    name: "Back Taxes and Compliance",
    h1: "Back Tax Filing and IRS Compliance in Dallas, TX",
    metaTitle: "File Back Taxes in Dallas, TX | Hewitt Services",
    metaDescription:
      "Behind on tax returns? Hewitt Services retrieves IRS transcripts, files unfiled returns and builds a roadmap to get compliant. Book a confidential call.",
    keyword: "file back taxes Dallas",
    promise:
      "Unfiled years brought current, quietly and accurately, in the right order.",
    cardBlurb:
      "One year behind or many: transcripts pulled, returns filed, compliance restored.",
    intro: [
      "Do not panic, and do not ignore it. Unfiled years are far more common than people think, and far more fixable.",
      "Filing comes first: the IRS generally wants returns on record before it will discuss a balance, a payment plan or relief. We establish which years are genuinely required, then work through them in order.",
    ],
    handles: [
      "Identifying exactly which years are unfiled",
      "Retrieving IRS wage and income transcripts",
      "Reconstructing records where yours have been lost",
      "Preparing and filing missing federal returns",
      "Reviewing any balance the filings produce",
      "Reviewing penalties and interest, and what relief may be available",
      "Setting up a path toward resolving what is owed",
      "Keeping you filed on time from here on",
    ],
    steps: [
      {
        title: "Confidential consultation",
        body: "Tell us roughly where things stand. You do not need documents, a complete picture or an explanation. Just a willingness to find out where you actually are.",
      },
      {
        title: "Identify missing years and gather data",
        body: "With your authorization we pull IRS account and wage transcripts. These show which years are genuinely unfiled and what the IRS already holds on record, which removes most of the guesswork immediately.",
      },
      {
        title: "Prepare and file accurate returns",
        body: "We prepare the missing returns properly, claiming the deductions you were entitled to at the time. Returns are filed in a sensible order so the account resolves cleanly rather than in pieces.",
      },
      {
        title: "Move into resolution or ongoing compliance",
        body: "If a balance remains, we move into resolving it with an accurate number on the table. If nothing is owed, we set you up to stay filed on time so the backlog never returns.",
      },
    ],
    whoFor: {
      lead: "There is no threshold you have to cross before this is worth dealing with, and no number of missed years that makes it too late.",
      bullets: [
        "Individuals who have missed one year or a decade of returns",
        "Business owners with unfiled business and personal returns",
        "Anyone the IRS has contacted about missing filings",
        "People who stopped filing during a hard year and never restarted",
      ],
    },
    faqs: [
      {
        q: "What should I do if I have not filed in several years?",
        a: "Start by finding out where you actually stand rather than guessing. We pull your IRS account and wage transcripts to establish which years are genuinely missing and what the IRS already holds. That removes the unknown, which is usually the worst part. From there we file the returns in a sensible order and address any balance afterwards.",
      },
      {
        q: "Can you retrieve my IRS wage and income records?",
        a: "Yes. With your authorization we can request IRS transcripts showing the W-2s, 1099s and other forms reported under your Social Security number in prior years. Those transcripts are often enough to rebuild a return when your own copies are long gone, though they will not capture everything, such as unreported cash income or your deductions.",
      },
      {
        q: "What if I have lost my records?",
        a: "That is normal in back tax work and rarely a dead end. Between IRS transcripts, bank and credit card statements, and reasonable reconstruction where the law allows it, most returns can be prepared accurately. If a particular year cannot be supported well enough, we will tell you plainly and explain what that means.",
      },
      {
        q: "Will I be penalized for filing late?",
        a: "Penalties and interest can apply, and they generally keep accruing while returns sit unfiled, which is one good reason not to wait. Relief is available in some circumstances, such as first-time abatement or reasonable cause, but it depends on your specific facts. We review that case by case rather than assuming either way.",
      },
      {
        q: "Do I have to file every missing year?",
        a: "Not always. The IRS often focuses on the most recent six years when bringing someone back into compliance, though that is a general practice rather than a rule and every situation differs. Older years can still matter, for a refund you are owed, or where the IRS has already filed a substitute return on your behalf.",
      },
      {
        q: "How does back tax filing lead into resolving a balance?",
        a: "Filing establishes the real number. Until the returns are in, any balance is an IRS estimate, often calculated without the deductions you were entitled to and frequently higher than the truth. Once accurate returns are filed the balance is what it should be, and only then can payment plans or relief options be pursued properly.",
      },
    ],
    related: ["irs-tax-problems", "tax-preparation", "monthly-bookkeeping"],
    image: {
      src: "/images/services/back-taxes-compliance.jpg",
      alt: "Kraft file folders standing in an archival box with aligned tabs, one lifted forward, under warm light",
    },
  },

  {
    slug: "irs-tax-problems",
    name: "IRS Tax Problems",
    h1: "IRS Tax Problem Resolution in Dallas, TX",
    metaTitle: "IRS Tax Problem Help in Dallas | Hewitt Services",
    metaDescription:
      "Received an IRS notice, audit letter, lien or levy? Hewitt Services, led by an Enrolled Agent, deals with the IRS for you. Request a confidential call.",
    keyword: "IRS tax help Dallas",
    promise:
      "An Enrolled Agent standing between you and the IRS, from the first letter to the last.",
    cardBlurb:
      "Notices, audits, balances, liens and levies, handled by someone authorized to represent you.",
    urgentBanner:
      "Received a levy or wage garnishment notice? Call (972) 591-0008 now. Deadlines matter.",
    intro: [
      "An IRS envelope has a way of sitting unopened on the counter for a week. That week is usually the most expensive part.",
      "Demarcus Hewitt is an Enrolled Agent, federally authorized to represent taxpayers before the IRS. Once you sign the authorization, the letters and the phone calls come to us.",
    ],
    handles: [
      "IRS notices and letters, read and answered inside the deadline",
      "Audits and audit defense",
      "Unpaid balances",
      "Installment agreements and other payment arrangements",
      "Wage garnishments and bank levies",
      "Tax liens",
      "Penalty relief requests where the facts support one",
      "Unfiled returns that triggered enforcement, with back tax filing handled first",
    ],
    steps: [
      {
        title: "Confidential consultation and notice review",
        body: "Bring us the letter. We identify what it is, what the IRS is actually asking for and what deadline applies, then explain your realistic options in plain language.",
      },
      {
        title: "Get compliant",
        body: "If returns are missing, they come first. The IRS rarely negotiates with someone who is not filed, and a balance calculated without your deductions is usually larger than the truth.",
      },
      {
        title: "We represent you",
        body: "With a signed authorization on file, we speak with the IRS on your behalf, request your records, respond to correspondence and put forward the position your facts support.",
      },
      {
        title: "Resolution and staying compliant",
        body: "We work toward resolving the matter, then put the filing and payment habits in place that keep it from recurring. Getting out is only half the job; staying out is the other half.",
      },
    ],
    whoFor: {
      lead: "The best time to bring us in is when the first letter arrives. The second best time is now, whatever stage things have reached.",
      bullets: [
        "Anyone holding an IRS notice they do not fully understand",
        "Individuals and business owners facing an audit",
        "People with a balance that has grown beyond what they can pay at once",
        "Anyone facing a lien, a wage garnishment or a bank levy",
      ],
    },
    faqs: [
      {
        q: "I got an IRS letter. What should I do first?",
        a: "Open it and note the date and any deadline, because that is the part that matters most. Do not send payment or sign anything before you understand what it says. Bring it to us by secure upload or in person, and we will tell you what it is, what it wants, and what your realistic options are.",
      },
      {
        q: "Can you represent me before the IRS?",
        a: "Yes. Demarcus Hewitt is an Enrolled Agent, a credential that carries federal authority to represent taxpayers before the IRS. Once you sign the authorization form, we can speak with the IRS on your behalf, request your records and handle correspondence directly instead of relaying everything through you.",
      },
      {
        q: "What is the difference between a tax lien and a levy?",
        a: "A lien is a legal claim against your property securing a tax debt. It affects your credit and complicates any sale, but nothing is taken from you. A levy is the actual taking: money pulled from a bank account or withheld from wages. A lien is a warning shot; a levy is collection already in progress.",
      },
      {
        q: "Can you help with a wage garnishment or bank levy?",
        a: "Often, yes, and speed matters because levies run on short timelines. We review the notice, confirm whether the required procedures were followed, get any missing returns filed and seek a release or an alternative arrangement where your facts support one. Outcomes depend on your circumstances and are never guaranteed.",
      },
      {
        q: "What are my options if I cannot pay in full?",
        a: "Several paths exist, including installment agreements and, in some circumstances, other forms of relief. Which are realistically open to you depends on your income, assets, expenses and filing history. We review those honestly and explain what each option involves before you commit to anything. We do not promise particular settlements.",
      },
      {
        q: "Will I have to speak to the IRS myself?",
        a: "Usually not. With a signed authorization in place we handle the calls and the correspondence. There are limited situations, certain audit interviews among them, where your participation may be requested. If that happens we prepare you thoroughly beforehand and attend with you.",
      },
    ],
    related: ["back-taxes-compliance", "tax-preparation", "tax-planning"],
    image: {
      src: "/images/services/irs-tax-problems.jpg",
      alt: "An unopened window envelope on a walnut table beside reading glasses and a cup of coffee in morning light",
    },
  },

  {
    slug: "franchise-tax-reinstatement",
    name: "Franchise Tax Reinstatement",
    h1: "Texas Franchise Tax Reinstatement and Compliance",
    metaTitle: "Texas Franchise Tax Reinstatement | Hewitt Services",
    metaDescription:
      "Forfeited by the Texas Comptroller? We file missing franchise tax reports, resolve balances and help restore your business to good standing. Call today.",
    keyword: "Texas franchise tax reinstatement",
    promise:
      "Missing reports filed, balances cleared, and your entity back in good standing with the state.",
    cardBlurb:
      "Forfeited or not in good standing? We file what is missing and handle the reinstatement.",
    intro: [
      "Nearly every Texas entity has to file an annual franchise tax report. Miss enough of them and the state forfeits your right to transact business.",
      "Owners usually find out at the worst moment: a bank flags the account, or a sale stalls for want of a certificate of account status. Most of it is fixable.",
    ],
    handles: [
      "Status review with the Texas Comptroller and the Secretary of State",
      "Preparing and filing every missing franchise tax report",
      "Correcting errors in reports filed previously",
      "Addressing unpaid balances and penalties that block reinstatement",
      "Preparing and submitting reinstatement documentation",
      "Coordinating directly with the Comptroller on your behalf",
      "Confirming that good standing has been restored",
      "An ongoing compliance calendar so filings are not missed again",
    ],
    steps: [
      {
        title: "Status review",
        body: "We check your entity with both the Comptroller and the Secretary of State. Owners are sometimes forfeited for reasons they were never told about, often because state notices went to an outdated registered agent address.",
      },
      {
        title: "Report preparation and filing",
        body: "We prepare and file every missing annual report, and correct any earlier filings that were submitted incorrectly. Each year is handled properly rather than patched over.",
      },
      {
        title: "Compliance correction",
        body: "Outstanding balances and penalties frequently block reinstatement on their own. We address what is owed and clear the obstacles standing between your entity and good standing.",
      },
      {
        title: "Reinstatement and ongoing support",
        body: "We submit the reinstatement documentation, confirm the restored status, and put your future filing dates on a compliance calendar so the same lapse does not repeat.",
      },
    ],
    whoFor: {
      lead: "If you have been told your entity is forfeited, or a bank or buyer has asked for a certificate of account status you cannot produce, this is the page you need.",
      bullets: [
        "Texas LLC, corporation and partnership owners with missed filings",
        "Entities the Comptroller has forfeited or flagged as not in good standing",
        "Owners who discovered the problem during a sale, loan or contract review",
        "Businesses that owe no franchise tax but never filed the annual report",
      ],
    },
    faqs: [
      {
        q: "What is Texas franchise tax and who must file?",
        a: "It is a privilege tax on entities formed in or doing business in Texas, including LLCs, corporations and most partnerships. The detail owners most often miss is that filing and owing are separate things. Many entities owe no tax at all and must still file an annual report to remain in good standing.",
      },
      {
        q: "What happens if my business is forfeited?",
        a: "Forfeiture generally means the entity loses its right to transact business in Texas, and the liability protection owners rely on can be affected. In practice it tends to surface at the worst possible moment, during a sale, a loan application or a contract review, because a certificate of account status cannot be issued.",
      },
      {
        q: "How do I know if my business is in good standing?",
        a: "The Comptroller and the Secretary of State each maintain records of entity status, and they can tell different parts of the story. We check both as a first step, because owners are sometimes forfeited over something they were never notified about, often due to state notices going to an old registered agent address.",
      },
      {
        q: "What is needed to reinstate my entity?",
        a: "Typically every missing franchise tax report has to be filed, any resulting balance and penalties resolved, and reinstatement paperwork submitted to the state. The exact requirements depend on how the forfeiture arose and how long it has stood. The status review establishes which apply to you before any work begins.",
      },
      {
        q: "How long does reinstatement take?",
        a: "It depends on how many reports are missing, whether a balance must be resolved first, and current state processing times, none of which we control. We set realistic expectations after the status review, once we can see exactly what has to be filed, rather than quoting a timeline before we know the facts.",
      },
      {
        q: "Can you keep me compliant going forward?",
        a: "Yes. After reinstatement we put your filing dates on a compliance calendar and handle the annual report each year. For clients who also use our monthly bookkeeping, the figures the report needs are already prepared and reconciled, which turns the annual filing into routine work rather than a scramble.",
      },
    ],
    related: ["monthly-bookkeeping", "tax-planning", "back-taxes-compliance"],
    image: {
      src: "/images/services/franchise-tax-reinstatement.jpg",
      alt: "A small Texas main-street brick and limestone storefront in golden hour light",
    },
  },

  {
    slug: "refund-advances",
    name: "Refund Advances",
    h1: "Tax Refund Advances in Dallas, TX",
    metaTitle: "Tax Refund Advance in Dallas, TX | Hewitt Services",
    metaDescription:
      "Need your refund sooner? Learn how refund advances through EPS Financial work and whether you may qualify when you file with Hewitt Services in Dallas.",
    keyword: "tax refund advance Dallas",
    promise:
      "An option for eligible clients who need their refund sooner, explained plainly, before you decide.",
    cardBlurb:
      "For eligible clients filing with us: an advance through EPS Financial, explained in full first.",
    intro: [
      "Waiting weeks for a refund is genuinely difficult when something is due now. For clients who file with us, a refund advance through EPS Financial may be an option.",
      "It is not your refund. It is a separate product from EPS Financial with its own terms, and we will walk you through those before you apply.",
    ],
    handles: [
      "Accurate return preparation, so the IRS accepts your filing without avoidable delay",
      "Help applying through EPS Financial once your return is accepted",
      "A clear explanation of the current terms before you decide anything",
      "Secure, confidential handling of your information throughout",
    ],
    steps: [
      {
        title: "Book a tax appointment",
        body: "Refund advances are offered in connection with a return we prepare, so the process starts the same way any filing does, in person in Dallas or virtually from anywhere in Texas.",
      },
      {
        title: "We prepare and file your return",
        body: "Accuracy is what gets a return accepted promptly. We review your documents, prepare the return, go through it with you and file electronically.",
      },
      {
        title: "Apply once the return is accepted",
        body: "After the IRS accepts your return, you can apply through EPS Financial. We will go through the terms with you beforehand so the decision is an informed one.",
      },
      {
        title: "If approved, receive funds",
        body: "Approved funds are delivered to a debit card or by direct deposit. When the IRS issues your refund, the advance is repaid from it automatically and the remainder is yours.",
      },
    ],
    whoFor: {
      lead: "This is worth asking about if your refund is a meaningful part of your household budget and the usual wait would put you under pressure.",
      bullets: [
        "Individual filers who expect a refund and need access sooner",
        "Clients who are filing their return with Hewitt Services",
        "Anyone who wants the terms explained before applying for anything",
      ],
    },
    faqs: [
      {
        q: "How does a refund advance work?",
        a: "You file your return with us. Once the IRS accepts it, you can apply through EPS Financial. If approved, funds are issued to a debit card or by direct deposit, and the advance is later repaid automatically from your refund when the IRS releases it. Any remaining refund balance is yours.",
      },
      {
        q: "How quickly could I receive funds?",
        a: "Funding generally follows soon after approval, but the timing depends on EPS Financial's process and on when the IRS accepts your return. We do not quote a guaranteed window, and you should be cautious of anyone who does.",
        disclosure: true,
      },
      {
        q: "Does approval depend on my credit?",
        a: "Approval criteria are set by EPS Financial rather than by this firm. We will not characterize them here before confirming the provider's current terms, and we will go through those terms with you in full before you apply.",
        disclosure: true,
      },
      {
        q: "Is there a fee or interest?",
        a: "Any fees, interest or no-cost terms are set by EPS Financial and can change between filing seasons. We will provide the current disclosures before you apply so you can decide with the actual figures in front of you.",
        disclosure: true,
      },
      {
        q: "What happens if my refund is smaller or delayed?",
        a: "The advance is repaid from your refund, so a refund that arrives smaller or later than expected is addressed under EPS Financial's terms. This is exactly the scenario to understand before applying, and we will walk through it with you.",
        disclosure: true,
      },
      {
        q: "Do I need to file my return with Hewitt Services to qualify?",
        a: "Yes. The advance is offered through EPS Financial in connection with a return we prepare and file, so it is not available separately from tax preparation. If you have already filed elsewhere this season, we can still help with next year or with any other work you need.",
      },
    ],
    related: ["tax-preparation", "tax-planning", "monthly-bookkeeping"],
    image: {
      src: "/images/services/refund-advances.jpg",
      alt: "A plain matte navy payment card with a brushed gold edge on a dark surface under a soft light sweep",
    },
  },
];

export const EPS_DISCLOSURE_PLACEHOLDER =
  "[PLACEHOLDER: EPS Financial required disclosures, eligibility, fees or no-fee status, and terms to be supplied by the client]";

export const EPS_STANDING_NOTE =
  "Refund advance is subject to approval and eligibility. It is not your tax refund. Terms are provided by EPS Financial.";

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
