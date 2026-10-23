"use client";

import { useEffect, useRef } from "react";

/** Words light up one by one as the block scrolls through the viewport. */
export default function ScrollText({ text, className = "" }: { text: string; className?: string }) {
  const wrap = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("span"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block enters near the bottom, 1 when it reaches ~35% from the top
      const p = Math.min(Math.max((vh * 0.85 - r.top) / (vh * 0.5 + r.height * 0.5), 0), 1);
      spans.forEach((s, i) => {
        const o = Math.min(Math.max(p * (spans.length + 3) - i, 0), 1);
        s.style.opacity = String(0.14 + o * 0.86);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <p ref={wrap} className={className}>
      {words.map((w, i) => (
        <span key={i} style={{ opacity: 0.14, transition: "opacity .25s linear" }}>{w}{" "}</span>
      ))}
    </p>
  );
}
