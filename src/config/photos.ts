/**
 * Photography slots. To use a real photo, drop the file into
 * /public/images/photos and set `src` (e.g. "/images/photos/hero-main.jpg").
 * Slots without a `src` render a branded illustrated panel, so the layout
 * never shows a broken or invented image. Write `alt` to describe the real
 * photo once it is in place, and only use photos you have the rights to.
 */
export type PhotoSlot =
  | "heroMain"
  | "heroSmall"
  | "community1"
  | "community2"
  | "community3"
  | "foundersHero"
  | "investorsHero"
  | "servicesHero";

export type Tone = "sage" | "blush" | "lavender" | "mustard" | "terracotta" | "olive" | "sand";

type PhotoConfig = {
  src?: string;
  alt: string;
  /** Fallback panel colour and motif. */
  tone: Tone;
  art: "arch" | "rings" | "waves" | "sun";
  /** CSS object-position for cropped photos. */
  position?: string;
};

export const PHOTOS: Record<PhotoSlot, PhotoConfig> = {
  heroMain: { alt: "Founders in conversation around a table", tone: "sage", art: "arch" },
  heroSmall: { alt: "A founder working at a laptop", tone: "blush", art: "sun" },
  community1: { alt: "A roundtable discussion between business owners", tone: "olive", art: "rings" },
  community2: { alt: "Two founders comparing notes", tone: "lavender", art: "waves" },
  community3: { alt: "A working session on a business plan", tone: "mustard", art: "arch" },
  foundersHero: { alt: "A founder in a working session with peers", tone: "sage", art: "arch" },
  investorsHero: { alt: "An investor in conversation with a founder", tone: "olive", art: "rings" },
  servicesHero: { alt: "Advisers and a founder reviewing a plan together", tone: "blush", art: "waves" },
};
