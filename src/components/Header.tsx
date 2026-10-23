"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV } from "@/config/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current?.style.setProperty("--p", String(max > 0 ? Math.min(window.scrollY / max, 1) : 0));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="container">
        <Link href="/" className="brand" aria-label="The Growth House, home">
          The <em>Growth</em> House
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
        <nav id="primary-nav" className="nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
          <Link href="/founders-club#apply" className="btn btn--sm">Join</Link>
        </nav>
      </div>
      <span ref={progress} className="progress" aria-hidden="true" />
    </header>
  );
}
