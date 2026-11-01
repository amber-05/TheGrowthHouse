"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Supporter } from "@/config/supporters";

function Tile({ s }: { s: Supporter }) {
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  const start = () => {
    setActive(true);
    // play() rejects if interrupted by a quick pause; that is harmless.
    video.current?.play().catch(() => {});
  };
  const stop = () => {
    setActive(false);
    const v = video.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <li>
      <button
        type="button"
        className={`supporter${active ? " is-active" : ""}`}
        aria-label={`${s.name}${s.role ? `, ${s.role}` : ""}. Hover or focus to play video.`}
        onPointerEnter={(e) => e.pointerType === "mouse" && start()}
        onPointerLeave={(e) => e.pointerType === "mouse" && stop()}
        onFocus={start}
        onBlur={stop}
        onClick={() => (active ? stop() : start())} // touch devices: tap to toggle
      >
        <span className="supporter__logo">
          {s.logo ? (
            <Image src={s.logo} alt="" width={220} height={110} />
          ) : (
            <span className="supporter__word">{s.name}</span>
          )}
        </span>
        {s.video ? (
          <video
            ref={video}
            className="supporter__video"
            src={s.video}
            poster={s.poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : (
          <span className="supporter__soon" aria-hidden="true">Video coming soon</span>
        )}
        <span className="supporter__meta">
          <b>{s.name}</b>
          {s.role && <small>{s.role}</small>}
        </span>
      </button>
    </li>
  );
}

export default function SupporterGrid({ items }: { items: Supporter[] }) {
  return (
    <ul className="supporters" aria-label="Supporters">
      {items.map((s, i) => (
        <Tile key={`${s.name}-${i}`} s={s} />
      ))}
    </ul>
  );
}
