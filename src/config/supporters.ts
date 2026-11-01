/**
 * Supporters shown on the homepage ("Our Favourite Supporters") and on /our-supporters.
 *
 * To add one: drop the logo in public/logos and the video in public/videos
 * (mp4, short and muted-friendly, ideally under 10 MB), then add an entry below.
 * To replace: change `logo` / `video`. To remove: delete the entry.
 *
 * - `featured: true` puts the supporter on the homepage (first 6 are shown).
 * - Without `logo`, a name wordmark is shown. Without `video`, the tile shows
 *   "Video coming soon" on hover.
 * - `poster` is optional: an image shown while the video loads.
 */
export type Supporter = {
  name: string;
  /** Founder / role line, e.g. "Founder, Ambuquick". */
  role?: string;
  logo?: string;
  video?: string;
  poster?: string;
  featured?: boolean;
};

export const SUPPORTERS: Supporter[] = [
  { name: "Ambuquick", role: "Connected business", logo: "/images/ambuquick-logo.png", featured: true },
  { name: "TheHomeIt", role: "Connected business", logo: "/images/thehomeit-logo.png", featured: true },
  { name: "GoLegal", role: "Connected business", logo: "/images/golegal-logo.png", featured: true },
  { name: "Supporter name", role: "Add logo and video", featured: true },
  { name: "Supporter name", role: "Add logo and video", featured: true },
  { name: "Supporter name", role: "Add logo and video", featured: true },
];

export const HOME_SUPPORTERS = SUPPORTERS.filter((s) => s.featured).slice(0, 6);
