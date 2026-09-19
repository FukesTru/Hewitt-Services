export type Block =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: Category;
  /** ISO date. Set to the build date, as briefed. */
  date: string;
  excerpt: string;
  imageAlt: string;
  body: Block[];
  /** Slugs of related services linked from the article footer. */
  relatedServices: string[];
};

export const CATEGORIES = [
  "Back Taxes",
  "IRS Help",
  "Business Compliance",
  "Bookkeeping",
  "Refunds",
  "Tax Planning",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Build date, used as the publish date for the starter posts. */
const PUBLISHED = "2026-09-19";

export const CLOSING_CTA = "Facing this situation? Book a free discovery call.";
export const POST_DISCLAIMER =
  "This article is general information, not tax advice. Your situation may differ — talk to us about the specifics.";

export const posts: Post[] = [
  {
    slug: "behind-on-taxes-filing-back-returns-texas",
    title: "Behind on Your Taxes? A Practical Guide to Filing Back Returns in Texas",
    metaTitle: "Filing Back Tax Returns in Texas: A Practical Guide | Hewitt Services",
    metaDescription:
      "Unfiled returns are more common and more fixable than most people think. Here is the order the work actually goes in, and why filing comes before anything else.",
    category: "Back Taxes",
    date: PUBLISHED,
    excerpt:
      "Unfiled returns feel worse from the inside than they usually are. Here is the order the work goes in, and why filing always comes first.",
    imageAlt:
      "Three closed kraft folders fanned in a neat diagonal row on a dark desk with a pen laid across them",
    relatedServices: ["back-taxes-compliance", "irs-tax-problems", "tax-preparation"],
    body: [
      {
        type: "p",
        text: "Most people who have not filed in a while did not decide to stop. A hard year happened, one return slipped, and the next one felt harder because of the first. Five years later the pile feels unapproachable. If that is roughly your situation, the useful thing to know is that the path out is well worn and reasonably short.",
      },
      { type: "h2", text: "Find out where you actually stand" },
      {
        type: "p",
        text: "Almost nobody knows precisely which years are missing, and guessing tends to be pessimistic. The first real step is pulling your IRS account and wage transcripts, which show which returns are on file and what employers and financial institutions reported under your Social Security number. That single step usually shrinks the problem, and it replaces a vague dread with a list.",
      },
      { type: "h2", text: "File first, negotiate second" },
      {
        type: "p",
        text: "This is the part people get backwards. Before the IRS will discuss a payment plan or any form of relief, it generally expects the missing returns to be filed. Compliance is the foundation, not the paperwork you handle afterwards. Trying to settle a balance while returns are still outstanding is usually a conversation that goes nowhere.",
      },
      {
        type: "p",
        text: "There is a second reason to file. If the IRS has prepared a substitute return on your behalf, it was built from reported income with few or none of the deductions you were entitled to. The balance it produced is often considerably higher than what you actually owe. Filing an accurate return is frequently what brings that number down.",
      },
      { type: "h2", text: "What if your records are gone?" },
      {
        type: "p",
        text: "Lost records are normal in this work and rarely a dead end. Between IRS transcripts, bank and credit card statements, and reasonable reconstruction where the law allows it, most years can be prepared accurately. Some gaps genuinely cannot be supported, and a good preparer will tell you that plainly rather than filing something that will not hold up.",
      },
      { type: "h2", text: "Do you have to file every single year?" },
      {
        type: "p",
        text: "Not always. The IRS often focuses on the most recent six years when bringing someone back into compliance, although that is a general practice rather than a rule and circumstances differ. Older years can still be worth filing — to claim a refund, or to replace a substitute return that overstates what you owe.",
      },
      { type: "h2", text: "What happens to the balance" },
      {
        type: "p",
        text: "Once accurate returns are filed, you finally have a real number to work with. Penalties and interest may have accrued, and relief such as first-time abatement or reasonable cause is available in some circumstances depending on your facts. Payment options can then be pursued properly. See [Back Taxes and Compliance](/services/back-taxes-compliance) for how we work through this, and [IRS Tax Problems](/services/irs-tax-problems) if enforcement has already started.",
      },
      {
        type: "p",
        text: "The hardest part is almost always the first phone call. Everything after it is procedure.",
      },
    ],
  },

  {
    slug: "irs-notice-first-30-days",
    title: "Got an IRS Notice? What to Do in the First 30 Days",
    metaTitle: "Got an IRS Notice? What to Do in the First 30 Days | Hewitt Services",
    metaDescription:
      "Most IRS notices carry a deadline, and options narrow once it passes. A calm, practical order of operations for the first month after the letter arrives.",
    category: "IRS Help",
    date: PUBLISHED,
    excerpt:
      "Most IRS letters carry a deadline, and the options narrow once it passes. What to do — and what not to do — in the first month.",
    imageAlt:
      "An unopened window envelope propped against a brass desk clock on a walnut surface in morning light",
    relatedServices: ["irs-tax-problems", "back-taxes-compliance", "tax-preparation"],
    body: [
      {
        type: "p",
        text: "An IRS envelope tends to sit on the counter for a week. That is a completely human response and also the most expensive one available, because the clock inside the letter is already running.",
      },
      { type: "h2", text: "Week one: open it and find the deadline" },
      {
        type: "p",
        text: "Open the letter the day it arrives. You are looking for three things: the notice number, usually printed in the top right corner; what the IRS says it wants; and the response date. Write the deadline somewhere you will see it. Everything else can wait a few days. That date generally cannot.",
      },
      {
        type: "p",
        text: "Resist two impulses. Do not pay immediately just to make it go away, and do not sign anything you do not fully understand. A meaningful share of notices are wrong, out of date, or relate to a return that was already filed.",
      },
      { type: "h2", text: "Week one: work out what kind of notice it is" },
      {
        type: "ul",
        items: [
          "A request for information or a missing document — often the simplest to resolve",
          "A proposed change to a return, where the IRS has recalculated something",
          "A balance due notice, which may escalate if it goes unanswered",
          "A notice about unfiled returns",
          "An enforcement notice: a lien, a levy or a wage garnishment, which run on the shortest timelines of all",
        ],
      },
      { type: "h2", text: "Week two: gather the file, not the whole filing cabinet" },
      {
        type: "p",
        text: "Pull the return the notice refers to, any earlier correspondence about the same year, and the documents that support whatever the IRS is questioning. You do not need your entire tax history. You need the year in front of you.",
      },
      { type: "h2", text: "Weeks two to three: decide who responds" },
      {
        type: "p",
        text: "You can reply yourself. You can also authorize a representative to do it for you. An Enrolled Agent is federally authorized to represent taxpayers before the IRS, which means correspondence and calls can be handled directly rather than relayed through you. For anything involving an audit, a balance you cannot pay, or enforcement, that is usually worth doing.",
      },
      { type: "h2", text: "Before the deadline: respond in writing, and keep proof" },
      {
        type: "p",
        text: "Answer the specific question asked, attach only what supports it, and keep a complete copy of everything you send along with proof of mailing. A short, precise response beats a thick envelope of everything you could find.",
      },
      { type: "h2", text: "If you cannot pay" },
      {
        type: "p",
        text: "Respond anyway. Silence removes options; it never creates them. Payment arrangements exist, and which ones are realistically open depends on your income, assets and filing history. If returns are missing, those come first — see [Back Taxes and Compliance](/services/back-taxes-compliance). For notices, audits and enforcement, see [IRS Tax Problems](/services/irs-tax-problems).",
      },
    ],
  },

  {
    slug: "texas-franchise-tax-forfeiture",
    title: "Texas Franchise Tax Forfeiture: What It Means and How to Fix It",
    metaTitle: "Texas Franchise Tax Forfeiture: What It Means & How to Fix It | Hewitt Services",
    metaDescription:
      "Forfeited by the Texas Comptroller? What forfeiture actually affects, why owners usually find out at the worst moment, and the steps back to good standing.",
    category: "Business Compliance",
    date: PUBLISHED,
    excerpt:
      "Owners usually discover forfeiture during a sale, a loan or a contract review. What it affects, and the route back to good standing.",
    imageAlt:
      "The front door of a small brick commercial building at golden hour with a brass handle and clean stone step",
    relatedServices: ["franchise-tax-reinstatement", "monthly-bookkeeping", "back-taxes-compliance"],
    body: [
      {
        type: "p",
        text: "Franchise tax is the compliance obligation Texas business owners forget most often, and the reason is understandable: plenty of entities owe nothing. What catches people out is that owing nothing and filing nothing are not the same thing.",
      },
      { type: "h2", text: "Who has to file" },
      {
        type: "p",
        text: "Nearly every entity formed in or doing business in Texas — LLCs, corporations and most partnerships — must file an annual franchise tax report with the Texas Comptroller. The report is generally due May 15, though the date shifts when it falls on a weekend or holiday, so confirm the current year rather than working from memory. A report showing no tax due still has to be filed.",
      },
      { type: "h2", text: "What forfeiture actually means" },
      {
        type: "p",
        text: "Miss enough filings and the state forfeits your right to transact business in Texas. The business does not stop operating — the doors stay open and the invoices go out — but on paper the entity is no longer in good standing, and the liability protection you formed it for can be affected.",
      },
      { type: "h2", text: "How owners usually find out" },
      {
        type: "ul",
        items: [
          "A bank flags the account or declines to open a new one",
          "A buyer's diligence turns it up mid-transaction",
          "A lender asks for a certificate of account status that cannot be issued",
          "A licence, permit or contract renewal is refused",
        ],
      },
      {
        type: "p",
        text: "Notice from the state often never reaches the owner, because it went to a registered agent address that changed years ago. Many people are genuinely surprised.",
      },
      { type: "h2", text: "The route back" },
      { type: "h3", text: "1. Check your real status" },
      {
        type: "p",
        text: "The Comptroller and the Secretary of State hold separate records, and they can tell different parts of the story. Both need checking before anything else, because the reason for forfeiture determines the fix.",
      },
      { type: "h3", text: "2. File every missing report" },
      {
        type: "p",
        text: "Each missing year is prepared and filed, and any earlier report submitted incorrectly is corrected. There is no shortcut around the years themselves.",
      },
      { type: "h3", text: "3. Clear what is blocking reinstatement" },
      {
        type: "p",
        text: "Outstanding balances and penalties frequently block reinstatement on their own, even once the filings are current.",
      },
      { type: "h3", text: "4. File for reinstatement" },
      {
        type: "p",
        text: "Reinstatement documentation goes to the state, and restored status is confirmed. How long that takes depends on how many reports were missing, whether a balance had to be resolved, and current state processing times.",
      },
      { type: "h2", text: "Staying out of it" },
      {
        type: "p",
        text: "Put the filing date on a calendar you actually keep, and keep your registered agent address current so state notices reach you. Where [monthly bookkeeping](/services/monthly-bookkeeping) is already in place, the figures the report needs are prepared and reconciled before the deadline arrives. See [Texas Franchise Tax Reinstatement](/services/franchise-tax-reinstatement) for how we handle the whole sequence.",
      },
    ],
  },

  {
    slug: "monthly-bookkeeping-vs-year-end-cleanup",
    title: "Monthly Bookkeeping vs. Year-End Cleanup: Which Is Right for Your Business?",
    metaTitle: "Monthly Bookkeeping vs Year-End Cleanup: Which Is Right? | Hewitt Services",
    metaDescription:
      "Both get you a filed return. Only one gives you numbers you can run the business on. An honest comparison, including when a cleanup genuinely is enough.",
    category: "Bookkeeping",
    date: PUBLISHED,
    excerpt:
      "Both get you a filed return. Only one gives you numbers you can actually run the business on — and sometimes a cleanup really is enough.",
    imageAlt:
      "Twelve small kraft folders in an even row beside the same folders in one leaning stack on a dark desk",
    relatedServices: ["monthly-bookkeeping", "tax-planning", "tax-preparation"],
    body: [
      {
        type: "p",
        text: "Every business does its books one of two ways. Either the work happens as the year unfolds, or it happens all at once when the return is due. Both end in a filed return. They are not otherwise equivalent.",
      },
      { type: "h2", text: "What a year-end cleanup actually is" },
      {
        type: "p",
        text: "A cleanup reconstructs twelve months that have already happened, usually under deadline pressure, from bank statements, card statements and whatever receipts survived. It works. It is the right answer when a business is genuinely small and simple, when the year is already over and something has to be filed, or as the first step before moving onto a monthly rhythm.",
      },
      { type: "h2", text: "Where it costs you" },
      {
        type: "ul",
        items: [
          "Memory fades. In March, nobody remembers what a $340 charge from the previous May was for — so it gets a generic category, or gets missed",
          "Deductions go unclaimed because the supporting record was never kept",
          "Errors compound. A misclassification in month two quietly repeats for ten more months",
          "The numbers arrive too late to act on. A report about a year you cannot change is history, not management information",
          "Cash flow is invisible all year, which is exactly when the decisions get made",
        ],
      },
      { type: "h2", text: "What monthly bookkeeping changes" },
      {
        type: "p",
        text: "The same work, done in small pieces, while the details are still fresh. Transactions are categorized each month, accounts are reconciled, and the period is closed. Questions get asked while you still know the answer.",
      },
      {
        type: "p",
        text: "The compounding benefit is that you have current numbers all year. You can see which work is actually profitable, whether a slow quarter is noise or a trend, and whether you can afford the hire you are considering. It also makes real [tax planning](/services/tax-planning) possible, because strategy built on stale figures is guesswork.",
      },
      { type: "h2", text: "A straightforward way to choose" },
      {
        type: "p",
        text: "If your business runs on a handful of transactions a month and you are not making decisions that hinge on the numbers, an annual cleanup is probably proportionate. If you have employees or contractors, inventory, multiple revenue streams, or you are planning anything — a hire, a loan, an expansion, a sale — monthly is the honest answer.",
      },
      {
        type: "p",
        text: "One more consideration: cleanups rarely stay one-off. The business that needed one last year usually needs one again, and the cost repeats every year alongside the same avoidable errors.",
      },
      {
        type: "p",
        text: "If your books are behind right now, the two are not in competition. Clean up the history first, then keep it current. That is exactly how [monthly bookkeeping](/services/monthly-bookkeeping) engagements usually begin.",
      },
    ],
  },

  {
    slug: "tax-refund-advances-explained",
    title: "Tax Refund Advances Explained: What to Know Before You Apply",
    metaTitle: "Tax Refund Advances Explained: What to Know First | Hewitt Services",
    metaDescription:
      "How refund advances work in plain terms, what a refund advance is not, and the questions worth asking a provider before you apply for one.",
    category: "Refunds",
    date: PUBLISHED,
    excerpt:
      "How refund advances work in plain terms, what they are not, and the questions worth asking any provider before you apply.",
    imageAlt:
      "A plain matte navy payment card lying flat beside a folded cream document under a soft gold light sweep",
    relatedServices: ["refund-advances", "tax-preparation", "tax-planning"],
    body: [
      {
        type: "p",
        text: "If your refund is a meaningful part of your household budget, waiting weeks for it is not a minor inconvenience. Refund advances exist for that gap. They are a legitimate product, and they are also widely misunderstood, so it is worth being precise about what they are.",
      },
      { type: "h2", text: "What a refund advance is" },
      {
        type: "p",
        text: "It is a separate financial product offered by a provider — in our case EPS Financial — in connection with a tax return that has been prepared and filed. Once the IRS accepts your return, you can apply. If you are approved, funds are issued to a debit card or by direct deposit. When the IRS later releases your refund, the advance is repaid from it automatically, and whatever remains goes to you.",
      },
      { type: "h2", text: "What a refund advance is not" },
      {
        type: "ul",
        items: [
          "It is not your refund arriving early. It is a distinct product with its own terms",
          "It is not automatic. Approval depends on eligibility criteria the provider sets, not your preparer",
          "It is not offered by your tax preparer. The terms come from the provider, and they can change between filing seasons",
        ],
      },
      { type: "h2", text: "The questions worth asking" },
      {
        type: "p",
        text: "Before applying for any refund advance, from any firm, get clear written answers to these. A provider who will not answer them plainly has told you something useful.",
      },
      {
        type: "ul",
        items: [
          "What are the fees, if any, and how are they charged?",
          "What determines approval, and what is assessed as part of it?",
          "What amounts are available, and how is the amount decided?",
          "When are funds released, and by what method?",
          "What happens if the refund is smaller than expected, delayed, or does not arrive?",
          "What happens if the IRS adjusts the return after filing?",
        ],
      },
      {
        type: "p",
        text: "We will not publish specific figures for fees, timing or approval criteria here, because those are the provider's to state and they are revised from season to season. We go through the current EPS Financial disclosures with you before you apply, so you are deciding with the actual terms in front of you rather than a general impression.",
      },
      { type: "h2", text: "The part that always helps" },
      {
        type: "p",
        text: "Whether or not you apply for an advance, an accurately prepared return that the IRS accepts without avoidable delay is the single biggest thing within anyone's control. Errors cause reviews, and reviews cause exactly the wait you were trying to shorten.",
      },
      {
        type: "p",
        text: "See [Refund Advances](/services/refund-advances) for how the process works with us, and [Tax Preparation](/services/tax-preparation) for filing itself. Refund advance is subject to approval and eligibility. It is not your tax refund. Terms are provided by EPS Financial.",
      },
    ],
  },

  {
    slug: "proactive-tax-planning-year-end-questions",
    title: "Proactive Tax Planning for Business Owners: 5 Questions to Ask Before Year-End",
    metaTitle: "5 Tax Planning Questions to Ask Before Year-End | Hewitt Services",
    metaDescription:
      "Once the year closes, your return only reports decisions already made. Five questions worth working through with your accountant while there is still time.",
    category: "Tax Planning",
    date: PUBLISHED,
    excerpt:
      "Once December 31 passes, your return only reports decisions already made. Five questions worth answering while there is still time to act.",
    imageAlt:
      "An open blank notebook with a fountain pen and five blank index cards laid out on a dark walnut desk",
    relatedServices: ["tax-planning", "monthly-bookkeeping", "tax-preparation"],
    body: [
      {
        type: "p",
        text: "There is a hard line in the tax year, and it falls on December 31. Before it, you have choices. After it, your return is a report on choices already made. Most of what people wish they had done differently in April was available to them in October.",
      },
      { type: "h2", text: "1. Do I know what this year actually looks like?" },
      {
        type: "p",
        text: "Not an estimate — the real figures. Every other question depends on this one, and it is the question most owners cannot answer in the fourth quarter because the books are three months behind. If that is you, start there. Current [monthly bookkeeping](/services/monthly-bookkeeping) is what makes the rest of this conversation possible.",
      },
      { type: "h2", text: "2. Does my entity structure still fit the business I run now?" },
      {
        type: "p",
        text: "Structures are chosen at formation, when the business is an idea, and then rarely revisited. How your entity is organized affects how profit is taxed, what you can pay yourself and which elections are open to you. A business that has tripled in size may have outgrown the structure it started with. It may also be fine — the point is to check rather than assume.",
      },
      { type: "h2", text: "3. Is my income landing in the right year?" },
      {
        type: "p",
        text: "Timing is one of the few genuine levers still available late in the year. When invoices go out, when bonuses are paid, when a planned purchase is made — each of these decides which tax year an item falls into. None of it is available in February.",
      },
      { type: "h2", text: "4. Are my estimated payments aligned with reality?" },
      {
        type: "p",
        text: "Estimated payments are often set in January against a forecast and never revisited. If the year outperformed the forecast, an unpleasant balance is building quietly. If it underperformed, you may be lending money to the government interest-free. Either way, the fourth quarter is when to check.",
      },
      { type: "h2", text: "5. What is coming in the next twelve months?" },
      {
        type: "p",
        text: "A sale, an expansion, a significant hire, a property purchase, retirement. Events like these land far better when the planning precedes them. Advice sought after the transaction closes is limited to reporting what happened.",
      },
      { type: "h2", text: "A note on expectations" },
      {
        type: "p",
        text: "No planning removes the obligation to pay what you owe, and nobody can responsibly promise a specific saving before reviewing your facts. What good planning does is make sure you are not paying more than required simply because the decisions were made by default. See [Tax Planning](/services/tax-planning) for how we work through this with owners.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export const postSlugs = posts.map((p) => p.slug);
