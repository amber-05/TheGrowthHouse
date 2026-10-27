export type ServiceId =
  | "due-diligence"
  | "pitch-deck"
  | "growth-partner"
  | "diagnostic-report";

export type Service = {
  id: ServiceId;
  title: string;
  /** Icon name from components/Icon.tsx and the card colour. */
  icon: "search" | "doc" | "users" | "compass";
  tone: "sage" | "blush" | "lavender" | "mustard";
  summary: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    id: "diagnostic-report",
    icon: "compass",
    tone: "mustard",
    title: "Business Diagnostic",
    summary:
      "An honest health-check of where the business stands today across strategy, operations, people and finance, with a written view of where to focus next.",
    points: ["Whole-business assessment", "Strengths and gaps identified", "Written, prioritised recommendations"],
  },
  {
    id: "due-diligence",
    icon: "search",
    tone: "lavender",
    title: "Due Diligence Support",
    summary:
      "An independent look at a business before you commit to it. We go through the financials, operations, market position and risks, and give you a clear written view so you can decide with your eyes open.",
    points: ["Commercial and operational review", "Financial and risk overview", "Clear written findings"],
  },
  {
    id: "pitch-deck",
    icon: "doc",
    tone: "blush",
    title: "Pitch Deck Development",
    summary:
      "We help you turn the story of your business into a deck investors can follow: the problem, the opportunity, how you make money and what you are asking for, told plainly and designed with care.",
    points: ["Narrative and structure", "Slide design and refinement", "Investor-readiness feedback"],
  },
  {
    id: "growth-partner",
    icon: "users",
    tone: "sage",
    title: "Growth Partner",
    summary:
      "An experienced person to think with. Regular working sessions with owners and leadership teams on strategy, priorities and the next stage of growth.",
    points: ["Ongoing strategic input", "Priority and roadmap setting", "Access to experienced operators"],
  },
];
