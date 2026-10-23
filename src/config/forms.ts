/**
 * Form definitions. Edit questions here; pages, validation, the API route and
 * the UI all read from these objects, so no page needs redesigning.
 *
 * Field `name`s are stored as keys in the submission's `answers` JSON, so
 * renaming a field only affects new submissions.
 */
import type { FormConfig } from "@/lib/forms";
import { SERVICES } from "./services";

const STAGES = [
  { value: "idea", label: "Idea stage" },
  { value: "early", label: "Early stage / pre-revenue" },
  { value: "revenue", label: "Generating revenue" },
  { value: "growth", label: "Growing / scaling" },
  { value: "established", label: "Established business" },
];

const CONSENT_APPLICATION =
  "I agree to The Growth House storing and using the information above to review my application and contact me about it.";

/** Groups a flat field list into steps: map each field name to its step index (default 0). */
function stepped(base: FormConfig, steps: string[], stepOf: Record<string, number>): FormConfig {
  return { ...base, steps, fields: base.fields.map((f) => ({ ...f, step: stepOf[f.name] ?? 0 })) };
}

const founderBase: FormConfig = {
  id: "founder",
  submitLabel: "Submit application",
  successTitle: "Application received",
  successMessage:
    "Thank you for applying to the Founders Club. We review every application personally and will be in touch by email.",
  fields: [
    { name: "fullName", label: "Full name", type: "text", required: true, width: "half", maxLength: 120 },
    { name: "email", label: "Email", type: "email", required: true, width: "half" },
    { name: "phone", label: "Phone", type: "tel", width: "half" },
    { name: "location", label: "City / country", type: "text", width: "half", maxLength: 120 },
    { name: "company", label: "Company name", type: "text", required: true, width: "half", maxLength: 160 },
    { name: "website", label: "Website or LinkedIn", type: "url", width: "half", placeholder: "https://" },
    { name: "stage", label: "Business stage", type: "select", required: true, options: STAGES },
    {
      name: "interests",
      label: "What are you hoping to get from the club?",
      type: "checkbox-group",
      required: true,
      options: [
        { value: "networking", label: "Founder networking" },
        { value: "guidance", label: "Strategic guidance" },
        { value: "fundraising", label: "Fundraising preparation" },
        { value: "mentorship", label: "Mentorship" },
        { value: "experts", label: "Expert support" },
      ],
    },
    {
      name: "about",
      label: "Tell us about your business and where you are today",
      type: "textarea",
      required: true,
      minLength: 30,
      help: "A few sentences is plenty.",
    },
    { name: "challenge", label: "What is your biggest challenge right now?", type: "textarea" },
    { name: "consent", label: CONSENT_APPLICATION, type: "consent", required: true },
  ],
};

export const founderForm = stepped(founderBase, ["You", "The Vision", "The Gap"], {
  company: 1, website: 1, stage: 1, about: 1,
  interests: 2, challenge: 2, consent: 2,
});

const investorBase: FormConfig = {
  id: "investor",
  submitLabel: "Submit application",
  successTitle: "Application received",
  successMessage:
    "Thank you for your interest in the Investors Club. We review every application personally and will be in touch by email.",
  fields: [
    { name: "fullName", label: "Full name", type: "text", required: true, width: "half", maxLength: 120 },
    { name: "email", label: "Email", type: "email", required: true, width: "half" },
    { name: "phone", label: "Phone", type: "tel", width: "half" },
    { name: "location", label: "City / country", type: "text", width: "half", maxLength: 120 },
    {
      name: "linkedin",
      label: "LinkedIn profile",
      type: "url",
      required: true,
      placeholder: "https://linkedin.com/in/…",
      help: "Used to verify your background.",
    },
    {
      name: "background",
      label: "Professional / entrepreneurial background",
      type: "textarea",
      required: true,
      minLength: 30,
    },
    {
      name: "investorType",
      label: "How do you invest?",
      type: "radio",
      required: true,
      options: [
        { value: "angel", label: "Angel investor" },
        { value: "family-office", label: "Family office" },
        { value: "fund", label: "Fund / institution" },
        { value: "operator", label: "Operator exploring investing" },
      ],
    },
    { name: "sectors", label: "Sectors of interest", type: "text", placeholder: "e.g. Consumer, SaaS, Manufacturing" },
    {
      name: "ticket",
      label: "Typical investment range (optional)",
      type: "select",
      options: [
        { value: "lt-25k", label: "Under 25k" },
        { value: "25k-100k", label: "25k – 100k" },
        { value: "100k-500k", label: "100k – 500k" },
        { value: "gt-500k", label: "500k+" },
        { value: "prefer-not", label: "Prefer not to say" },
      ],
    },
    { name: "goals", label: "What would you like from the Investors Club?", type: "textarea" },
    { name: "consent", label: CONSENT_APPLICATION, type: "consent", required: true },
  ],
};

export const investorForm = stepped(investorBase, ["You", "Your Journey", "The Fit"], {
  linkedin: 1, background: 1, investorType: 1,
  sectors: 2, ticket: 2, goals: 2, consent: 2,
});

export const enquiryForm: FormConfig = {
  id: "enquiry",
  submitLabel: "Send enquiry",
  successTitle: "Enquiry sent",
  successMessage: "Thank you. We have your enquiry and will reply by email shortly.",
  fields: [
    { name: "name", label: "Name", type: "text", required: true, width: "half", maxLength: 120 },
    { name: "company", label: "Company", type: "text", required: true, width: "half", maxLength: 160 },
    { name: "email", label: "Email", type: "email", required: true, width: "half" },
    { name: "phone", label: "Phone", type: "tel", required: true, width: "half" },
    {
      name: "service",
      label: "Service",
      type: "select",
      required: true,
      options: SERVICES.map((s) => ({ value: s.id, label: s.title })),
    },
    { name: "stage", label: "Business stage (optional)", type: "select", options: STAGES },
    { name: "requirement", label: "Describe your requirement", type: "textarea", required: true, minLength: 20 },
    {
      name: "consent",
      label: "I agree to The Growth House storing and using this information to respond to my enquiry.",
      type: "consent",
      required: true,
    },
  ],
};

export const FORMS = { founder: founderForm, investor: investorForm, enquiry: enquiryForm } as const;
