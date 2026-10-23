"use client";

import { useEffect, useRef } from "react";

type Kind = 0 | 1 | 2; // founders, investors, leaders
const KINDS: { label: string; color: string }[] = [
  { label: "Founders", color: "#c3cdb0" },
  { label: "Investors", color: "#f5f4ed" },
  { label: "Business leaders", color: "#8fa070" },
];

type Node = { x: number; y: number; vx: number; vy: number; r: number; k: Kind; ring: number };
type Pulse = { a: Node; b: Node; t: number; speed: number };

/**
 * Animated network: three kinds of people drift, connect when they meet, and
 * pulses of "conversation" travel along the links. Pointer gently pulls nodes.
 */
export default function EcosystemGraphic() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    let nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const pointer = { x: -999, y: -999 };
    let link = 150;

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      link = Math.max(110, Math.min(170, w / 7));
      const count = Math.round(Math.min(70, Math.max(28, (w * h) / 11000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: rnd(0, w), y: rnd(0, h),
        vx: rnd(-0.18, 0.18), vy: rnd(-0.18, 0.18),
        r: rnd(2.2, 5.2), k: (i % 3) as Kind, ring: 0,
      }));
    };

    const step = () => {
      for (const n of nodes) {
        const dx = pointer.x - n.x, dy = pointer.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 160 * 160) {
          n.vx += (dx / 160) * 0.0025;
          n.vy += (dy / 160) * 0.0025;
        }
        n.vx *= 0.995; n.vy *= 0.995;
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.min(Math.max(n.x, 0), w);
        n.y = Math.min(Math.max(n.y, 0), h);
        if (n.ring > 0) n.ring += 0.025;
        if (n.ring > 1) n.ring = 0;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const edges: [Node, Node][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          if (a.k === b.k) continue; // links form between different kinds of people
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < link) {
            edges.push([a, b]);
            ctx.strokeStyle = `rgba(217, 221, 206, ${(1 - d / link) * 0.55})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      if (!reduce && edges.length && pulses.length < 14 && Math.random() < 0.08) {
        const [a, b] = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({ a, b, t: 0, speed: rnd(0.008, 0.016) });
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed;
        if (p.t >= 1) { p.b.ring = 0.01; pulses.splice(i, 1); continue; }
        const x = p.a.x + (p.b.x - p.a.x) * p.t, y = p.a.y + (p.b.y - p.a.y) * p.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 12);
        g.addColorStop(0, "rgba(245, 244, 237, .95)");
        g.addColorStop(1, "rgba(245, 244, 237, 0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.fill();
      }
      for (const n of nodes) {
        if (n.ring > 0) {
          ctx.strokeStyle = `rgba(245, 244, 237, ${1 - n.ring})`;
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r + n.ring * 22, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.fillStyle = KINDS[n.k].color;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
    };

    const frame = () => {
      raf = 0;
      if (!visible || document.hidden) return;
      step();
      draw();
      raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf && !reduce) raf = requestAnimationFrame(frame); };

    const onMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      pointer.x = e.clientX - b.left;
      pointer.y = e.clientY - b.top;
    };
    const onLeave = () => { pointer.x = pointer.y = -999; };

    resize();
    if (reduce) { for (let i = 0; i < 200; i++) step(); draw(); }
    const ro = new ResizeObserver(() => { resize(); if (reduce) { for (let i = 0; i < 200; i++) step(); draw(); } });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); });
    io.observe(canvas);
    document.addEventListener("visibilitychange", kick);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    kick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      document.removeEventListener("visibilitychange", kick);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="eco">
      <canvas ref={ref} className="eco__canvas" role="img" aria-label="Animated network showing founders, investors and business leaders connecting with one another" />
      <ul className="eco__legend">
        {KINDS.map((k) => (
          <li key={k.label}><i style={{ background: k.color }} />{k.label}</li>
        ))}
      </ul>
    </div>
  );
}
