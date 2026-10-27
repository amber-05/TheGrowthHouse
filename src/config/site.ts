export const SITE = {
  name: "The Growth House",
  url: "https://the-growth-house.vercel.app",
  description: "A business ecosystem connecting founders, investors and experienced business leaders.",
  /**
   * Set NEXT_PUBLIC_CONTACT_EMAIL (e.g. hello@yourdomain.com) and it appears in
   * the footer and legal pages. Until then those places omit it.
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  legalUpdated: "23 October 2026",
};

type CompanyImage = {
  src: string;
  /** Logos/graphics: show uncropped on a paper card instead of filling the frame. */
  contain?: boolean;
  /** CSS object-position for cropped photos, e.g. "50% 80%". */
  position?: string;
};

type Company = {
  name: string;
  href: string;
  /** [left, right] images beside the company line. Omit a slot to show a labelled placeholder. */
  images: [CompanyImage?, CompanyImage?];
};

/**
 * Companies in the scroll-driven line under the homepage hero. Images are each
 * company's own brand assets (public/images). Replace or add a second image
 * (right slot) whenever you have photography.
 */
export const COMPANIES: Company[] = [
  {
    name: "Ambuquick",
    href: "https://ambuquick.com",
    images: [
      { src: "/images/ambuquick-logo.png", contain: true },
      { src: "/images/ambuquick-van.jpg", position: "50% 78%" },
    ],
  },
  { name: "TheHomeIt", href: "https://thehomeit.com", images: [{ src: "/images/thehomeit-logo.png", contain: true }] },
  { name: "GoLegal", href: "https://thegolegal.com", images: [{ src: "/images/golegal-logo.png", contain: true }] },
];

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/founders-club", label: "Founders Club" },
  { href: "/investors-club", label: "Investors Club" },
  { href: "/other-services", label: "Other Services" },
];
