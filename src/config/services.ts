export type ServiceId =
  | "due-diligence"
  | "pitch-deck"
  | "growth-partner"
  | "diagnostic-report"
  | "financial-support"
  | "legal-compliance";

export type Service = {
  id: ServiceId;
  title: string;
  /** Icon name from components/Icon.tsx and the card colour. */
  icon: "diagnostic" | "diligence" | "deck" | "partner" | "finance" | "legal";
  tone: "sage" | "blush" | "lavender" | "mustard" | "sand";
  summary: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    id: "diagnostic-report",
    icon: "diagnostic",
    tone: "mustard",
    title: "Business Diagnostic",
    summary:
      "An honest health-check of where the business stands today across strategy, operations, people and finance, with a written view of where to focus next.",
    points: ["Whole-business assessment", "Strengths and gaps identified", "Written, prioritised recommendations"],
  },
  {
    id: "due-diligence",
    icon: "diligence",
    tone: "lavender",
    title: "Due Diligence Support",
    summary:
      "An independent look at a business before you commit to it. We go through the financials, operations, market position and risks, and give you a clear written view so you can decide with your eyes open.",
    points: ["Commercial and operational review", "Financial and risk overview", "Clear written findings"],
  },
  {
    id: "pitch-deck",
    icon: "deck",
    tone: "blush",
    title: "Pitch Deck Development",
    summary:
      "We help you turn the story of your business into a deck investors can follow: the problem, the opportunity, how you make money and what you are asking for, told plainly and designed with care.",
    points: ["Narrative and structure", "Slide design and refinement", "Investor-readiness feedback"],
  },
  {
    id: "growth-partner",
    icon: "partner",
    tone: "sage",
    title: "Growth Partner",
    summary:
      "An experienced person to think with. Regular working sessions with owners and leadership teams on strategy, priorities and the next stage of growth.",
    points: ["Ongoing strategic input", "Priority and roadmap setting", "Access to experienced operators"],
  },
  {
    id: "financial-support",
    icon: "finance",
    tone: "sand",
    title: "Financial Support",
    summary:
      "Experienced financial help for owners who want clearer numbers and a firmer plan, from day-to-day planning to preparing for a raise.",
    points: [
      "Financial planning and advisory",
      "Financial modelling and projections",
      "Fundraising financial assistance",
      "Financial strategy and business planning",
    ],
  },
  {
    id: "legal-compliance",
    icon: "legal",
    tone: "lavender",
    title: "Legal & Compliance Support",
    summary:
      "Practical legal and compliance help so the business is set up properly, documented clearly and kept on the right side of the rules.",
    points: [
      "Business registration and structuring",
      "Legal documentation and agreements",
      "Regulatory and statutory compliance",
      "Corporate and legal advisory",
    ],
  },
];
