"use client";

import { useEffect, useState } from "react";

/**
 * First-visit intro: a sheet of paper with the wordmark tears down the middle
 * and the two halves slide away to unveil the site. Plays once per browser
 * session and never for reduced-motion users (see the inline script in layout).
 *
 * Both halves share one jagged seam so they interlock before they part. The
 * seam is generated deterministically so server and client markup match.
 */
const STEPS = 48;

function seam() {
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const pts: { y: number; d: number }[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const d = Math.sin(i * 0.7) * 1.4 + Math.sin(i * 1.9) * 0.8 + (rnd() - 0.5) * 3.4; // vw offset from centre
    pts.push({ y: (i / STEPS) * 100, d: Number(d.toFixed(2)) });
  }
  return pts;
}

// Halves overlap: left box spans 0-55vw, right box spans 45-100vw; seam sits at 50vw + d.
const pts = seam();
const LEFT = `polygon(0 0, ${pts.map((p) => `${(((50 + p.d) / 55) * 100).toFixed(2)}% ${p.y.toFixed(2)}%`).join(", ")}, 0 100%)`;
const RIGHT = `polygon(${pts.map((p) => `${(((5 + p.d) / 55) * 100).toFixed(2)}% ${p.y.toFixed(2)}%`).join(", ")}, 100% 100%, 100% 0)`;

export default function PaperTear() {
  const [done, setDone] = useState(false);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const finish = () => {
      try {
        sessionStorage.setItem("tg-tear", "1");
      } catch {}
      document.body.style.overflow = "";
      root.classList.remove("tear-wait");
      setDone(true);
    };
    if (root.classList.contains("no-tear")) {
      finish();
      return;
    }
    document.body.style.overflow = "hidden";
    // The animation stays paused until the page is interactive, so it is never
    // finished before anyone could see it. Hero text waits on the same signal.
    const start = window.setTimeout(() => {
      setPlay(true);
      root.classList.remove("tear-wait");
    }, 350);
    const fallback = window.setTimeout(finish, 6000);
    window.addEventListener("tg-tear-end", finish);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(fallback);
      window.removeEventListener("tg-tear-end", finish);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  const mark = (
    <div className="tear__mark">
      <span>The <em>Growth</em> House</span>
    </div>
  );

  return (
    <div className={`tear${play ? " tear--play" : ""}`} aria-hidden="true">
      <div className="tear__half tear__half--l">
        <div className="tear__paper" style={{ clipPath: LEFT }}>{mark}</div>
      </div>
      <div
        className="tear__half tear__half--r"
        onAnimationEnd={(e) => e.animationName === "tearR" && window.dispatchEvent(new Event("tg-tear-end"))}
      >
        <div className="tear__paper" style={{ clipPath: RIGHT }}>{mark}</div>
      </div>
    </div>
  );
}
