/**
 * Brand icon set: line drawings on a 24px grid with a soft tonal fill (`T`)
 * behind the strokes, so each symbol reads as a small illustration rather
 * than a generic glyph. Plain UI glyphs (arrow, check) stay minimal.
 */
const T = ({ d }: { d: string }) => <path d={d} fill="currentColor" stroke="none" opacity=".16" />;

const PATHS = {
  // UI glyphs
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  check: <><path d="m5 12.5 4.5 4.5L19 7.5" /></>,

  // Services
  diagnostic: (
    <>
      <T d="M6 5h12v16H6z" />
      <path d="M6 5h12v16H6z" />
      <path d="M9.5 3h5v3h-5z" />
      <path d="M8.5 14h2l1.2-3 1.8 5 1.2-2h1.8" />
    </>
  ),
  diligence: (
    <>
      <T d="M4 3h10v18H4z" />
      <path d="M13 3H4v18h6.5" />
      <path d="M7 8h4M7 11.5h3" />
      <circle cx="15.5" cy="15" r="3.8" />
      <path d="m18.3 17.8 3 3" />
    </>
  ),
  deck: (
    <>
      <T d="M3 4h18v12H3z" />
      <path d="M3 4h18v12H3zM12 16v4M8 20h8" />
      <path d="m6.5 13 3-3.5 2.5 2 4-4.5" />
      <path d="M14.5 7h2.5v2.5" />
    </>
  ),
  partner: (
    <>
      <T d="M2.5 14.5 8 10h3.5l2.5 2 2-2 5.5 4.5-4 5H8z" />
      <path d="M2.5 14.5 8 10h3.5l2.5 2 2-2 5.5 4.5" />
      <path d="m8 19.5 2.2 1.3c.8.5 1.8.3 2.4-.4l5-5.3M10.5 16.5l2 1.5" />
      <path d="M12 3v4M10.2 4.8 12 3l1.8 1.8" />
    </>
  ),
  finance: (
    <>
      <T d="M3 20v-7h4v7zM10 20V8h4v12z" />
      <path d="M3 20h18M3 20v-7h4v7M10 20V8h4v12" />
      <ellipse cx="18.5" cy="14.5" rx="2.8" ry="1.2" />
      <path d="M15.7 14.5v2.5c0 .7 1.3 1.2 2.8 1.2s2.8-.5 2.8-1.2v-2.5" />
      <path d="M5 8.5 9 5l3 1.5L19 3" />
    </>
  ),
  legal: (
    <>
      <T d="M3 13.5h6a3 3 0 0 1-6 0zM15 13.5h6a3 3 0 0 1-6 0z" />
      <path d="M12 3v17M7.5 20h9M5 7h14" />
      <path d="M6 7l-3 6.5a3 3 0 0 0 6 0zM18 7l-3 6.5a3 3 0 0 0 6 0z" />
    </>
  ),

  // Ecosystem
  founders: (
    <>
      <T d="M12 12c0-4 2.5-6.5 7-6.5 0 4-2.5 6.5-7 6.5zM12 15c0-3-2-5-6-5 0 3 2 5 6 5z" />
      <path d="M12 21v-9" />
      <path d="M12 12c0-4 2.5-6.5 7-6.5 0 4-2.5 6.5-7 6.5zM12 15c0-3-2-5-6-5 0 3 2 5 6 5z" />
      <path d="M8 21h8" />
    </>
  ),
  investor: (
    <>
      <T d="M4 20v-10h3.5v10zM10.3 20V6h3.5v14z" />
      <path d="M4 20h16M4 20V10h3.5v10M10.3 20V6h3.5v14" />
      <circle cx="18" cy="9" r="3" />
      <path d="M18 7.6v2.8M17 8.2h1.6a.6.6 0 0 1 0 1.2H17.4" />
    </>
  ),
  briefcase: (
    <>
      <T d="M3 8h18v11H3z" />
      <path d="M3 8h18v11H3zM9 8V5.5h6V8M3 13h18" />
      <path d="M10.5 13v1.5h3V13" />
    </>
  ),

  // Community and benefits
  network: (
    <>
      <T d="M12 4.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM5.5 14a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM18.5 14a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
      <circle cx="12" cy="7" r="2.5" />
      <circle cx="5.5" cy="16.5" r="2.5" />
      <circle cx="18.5" cy="16.5" r="2.5" />
      <path d="M10.6 9.1 7 14.2M13.4 9.1 17 14.2M8 16.5h8" />
    </>
  ),
  dialogue: (
    <>
      <T d="M3 4h12v8H8l-3 3v-3H3z" />
      <path d="M3 4h12v8H8l-3 3v-3H3z" />
      <path d="M18 9h3v8h-2v3l-3-3h-5v-2.5" />
      <path d="M6 7.5h6" />
    </>
  ),
  compass: (
    <>
      <T d="m15.5 8.5-2 5-5 2 2-5z" />
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  intro: (
    <>
      <T d="M3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0zM15 16a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" />
      <circle cx="6" cy="8" r="3" />
      <circle cx="18" cy="16" r="3" />
      <path d="M8.2 10.2c2 1.4 1.5 3.6 3.8 3.8 1.2.1 2.3.4 3 1" />
      <path d="M13 6h5v4M18 6l-4 4" />
    </>
  ),
  sprout: (
    <>
      <T d="M12 12c0-4 2.5-6.5 7-6.5 0 4-2.5 6.5-7 6.5zM12 15c0-3-2-5-6-5 0 3 2 5 6 5z" />
      <path d="M12 21v-9" />
      <path d="M12 12c0-4 2.5-6.5 7-6.5 0 4-2.5 6.5-7 6.5zM12 15c0-3-2-5-6-5 0 3 2 5 6 5z" />
    </>
  ),
  fundraise: (
    <>
      <T d="M3 20v-5h4v5zM10 20v-9h4v9z" />
      <path d="M3 20h18M3 20v-5h4v5M10 20v-9h4v9M17 20V8h4v12" />
      <path d="m4 10.5 5-4.5 3 2 6-5" />
      <path d="M14.5 3H18v3.5" />
    </>
  ),
  expert: (
    <>
      <T d="M12 3 5 6v5.5c0 4.3 3 7.7 7 9.5 4-1.8 7-5.2 7-9.5V6z" />
      <path d="M12 3 5 6v5.5c0 4.3 3 7.7 7 9.5 4-1.8 7-5.2 7-9.5V6z" />
      <path d="m12 8.5 1.1 2.3 2.5.3-1.8 1.7.5 2.5-2.3-1.3-2.3 1.3.5-2.5-1.8-1.7 2.5-.3z" />
    </>
  ),
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r=".8" fill="currentColor" /></>,
  spark: <><path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" /></>,

  // Earlier names, kept so existing references keep working
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" /><path d="M16 5.2a3 3 0 0 1 0 5.6M18 14c1.7.7 3 2.3 3 5" /></>,
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 11 18.7l1-1" /></>,
  chart: <><path d="M4 19V5" /><path d="M4 19h16" /><path d="m8 15 3.5-4 3 2.5L19 8" /></>,
  doc: <><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4M10 12h5M10 16h5" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  chat: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" /></>,
  shield: <><path d="M12 3 5 6v5.5c0 4.3 3 7.7 7 9.5 4-1.8 7-5.2 7-9.5V6z" /><path d="m9 12 2.2 2.2L15.5 10" /></>,
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
