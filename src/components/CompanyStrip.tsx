"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Photo from "./Photo";
import { COMPANIES } from "@/config/site";

const STEP_VH = 70; // scroll distance (in viewport heights) per company

/**
 * Pinned, scroll-driven company line. As the page scrolls, the next company is
 * centred and highlighted on the lateral line and its left/right images fade in.
 */
export default function CompanyStrip() {
  const n = COMPANIES.length;
  const wrap = useRef<HTMLElement>(null);
  const view = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = wrap.current;
      if (!el) return;
      const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 76;
      const total = el.offsetHeight - (window.innerHeight - headerH);
      const scrolled = headerH - el.getBoundingClientRect().top;
      const p = Math.min(Math.max(scrolled / total, 0), 0.9999);
      setActive(Math.min(n - 1, Math.floor(p * n)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [n]);

  const centre = useCallback(() => {
    const v = view.current;
    const item = track.current?.children[active] as HTMLElement | undefined;
    if (!v || !item) return;
    setShift(v.clientWidth / 2 - (item.offsetLeft + item.offsetWidth / 2));
  }, [active]);

  useLayoutEffect(centre, [centre]);
  useEffect(() => {
    const v = view.current;
    if (!v) return;
    const ro = new ResizeObserver(centre);
    ro.observe(v);
    document.fonts?.ready.then(centre);
    return () => ro.disconnect();
  }, [centre]);

  const goTo = (i: number) => {
    const el = wrap.current;
    if (!el) return;
    const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 76;
    const total = el.offsetHeight - (window.innerHeight - headerH);
    const top = window.scrollY + el.getBoundingClientRect().top - headerH + ((i + 0.5) / n) * total;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section
      ref={wrap}
      className="cscroll"
      style={{ height: `calc(${n * STEP_VH}svh + 100svh - var(--header-h))` }}
      aria-label="Our companies"
    >
      <div className="cscroll__stick">
        <p className="companies__label">Our companies</p>

        <div className="cscroll__stage">
          {(["l", "r"] as const).map((side, s) => (
            <div key={side} className={`cscroll__side cscroll__side--${side}`} aria-hidden="true">
              {COMPANIES.map((c, i) => (
                <div key={c.name} className="cscroll__img" data-active={i === active}>
                  <Photo
                    src={c.images[s]?.src}
                    contain={c.images[s]?.contain}
                    position={c.images[s]?.position}
                    alt=""
                    label={`${c.name}: ${side === "l" ? "left" : "right"} image`}
                  />
                </div>
              ))}
            </div>
          ))}

          <div ref={view} className="cscroll__line">
            <ul ref={track} className="cscroll__track" style={{ transform: `translateX(${shift}px)` }}>
              {COMPANIES.map((c, i) => (
                <li key={c.name}>
                  <button
                    type="button"
                    data-active={i === active}
                    aria-current={i === active ? "true" : undefined}
                    onClick={() => goTo(i)}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="cscroll__count" aria-live="polite">
          {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          {" "}·{" "}
          <a href={COMPANIES[active].href} target="_blank" rel="noopener noreferrer" className="link-arrow">
            Visit {COMPANIES[active].name} <span aria-hidden="true">↗</span>
          </a>
        </p>
      </div>
    </section>
  );
}
