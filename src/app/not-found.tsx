import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "100svh", display: "grid", alignItems: "center" }}>
      <div className="page-hero__inner">
        <p className="eyebrow">404</p>
        <h1 className="h-display">
          This room is empty. <em>Let&rsquo;s get you back to the main house.</em>
        </h1>
        <div className="btn-row" style={{ marginTop: "2.5rem" }}>
          <Link href="/" className="btn">Back to the homepage</Link>
        </div>
      </div>
    </section>
  );
}
