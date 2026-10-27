import Image from "next/image";
import { PHOTOS, type PhotoSlot } from "@/config/photos";

/** Decorative motifs used when a slot has no photo yet. */
function Art({ kind }: { kind: "arch" | "rings" | "waves" | "sun" }) {
  return (
    <svg className="photo__art" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {kind === "arch" && (
        <>
          <path d="M70 500V250a130 130 0 0 1 260 0v250z" fill="currentColor" opacity=".16" />
          <path d="M130 500V270a70 70 0 0 1 140 0v230z" fill="currentColor" opacity=".22" />
          <circle cx="320" cy="90" r="34" fill="currentColor" opacity=".3" />
        </>
      )}
      {kind === "rings" && (
        <g fill="none" stroke="currentColor" strokeWidth="2" opacity=".32">
          <circle cx="200" cy="250" r="60" />
          <circle cx="200" cy="250" r="110" />
          <circle cx="200" cy="250" r="160" />
          <circle cx="200" cy="250" r="210" />
        </g>
      )}
      {kind === "waves" && (
        <g fill="none" stroke="currentColor" strokeWidth="2" opacity=".32">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M-20 ${150 + i * 56}c60-40 100 40 160 0s100 40 160 0 100 40 160 0`} />
          ))}
        </g>
      )}
      {kind === "sun" && (
        <>
          <circle cx="200" cy="210" r="96" fill="currentColor" opacity=".2" />
          <circle cx="200" cy="210" r="48" fill="currentColor" opacity=".3" />
          <path d="M0 400c80-50 160-50 240 0s120 40 160 10V500H0z" fill="currentColor" opacity=".18" />
        </>
      )}
    </svg>
  );
}

/** A photography slot from src/config/photos.ts. Falls back to a branded panel until a photo is supplied. */
export default function Photo({
  slot,
  className = "",
  sizes = "(min-width: 960px) 45vw, 100vw",
  priority = false,
}: {
  slot: PhotoSlot;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const p = PHOTOS[slot];
  return (
    <div className={`photo photo--${p.tone} ${className}`}>
      {p.src ? (
        <Image src={p.src} alt={p.alt} fill sizes={sizes} priority={priority} style={{ objectPosition: p.position }} />
      ) : (
        <Art kind={p.art} />
      )}
    </div>
  );
}
