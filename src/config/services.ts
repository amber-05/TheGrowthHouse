export type ServiceId =
  | "due-diligence"
  | "pitch-deck"
  | "growth-partner"
  | "diagnostic-report";

export type Service = {
  id: ServiceId;
  title: string;
  summary: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    id: "due-diligence",
    title: "Due Diligence",
    summary:
      "An independent look at a business before you commit to it. We go through the financials, operations, market position and risks, and give you a clear written view so you can decide with your eyes open.",
    points: ["Commercial and operational review", "Financial and risk overview", "Clear written findings"],
  },
  {
    id: "pitch-deck",
    title: "Pitch Deck Development",
    summary:
      "We help you turn the story of your business into a deck investors can follow: the problem, the opportunity, how you make money and what you are asking for, told plainly and designed with care.",
    points: ["Narrative and structure", "Slide design and refinement", "Investor-readiness feedback"],
  },
  {
    id: "growth-partner",
    title: "Growth Partner",
    summary:
      "An experienced person to think with. Regular working sessions with owners and leadership teams on strategy, priorities and the next stage of growth.",
    points: ["Ongoing strategic input", "Priority and roadmap setting", "Access to experienced operators"],
  },
  {
    id: "diagnostic-report",
    title: "Diagnostic Report",
    summary:
      "An honest health-check of where the business stands today across strategy, operations, people and finance, with a written view of where to focus next.",
    points: ["Whole-business assessment", "Strengths and gaps identified", "Written, prioritised recommendations"],
  },
];
