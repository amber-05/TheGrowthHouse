import { SITE } from "@/config/site";

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <section className="page-hero" style={{ paddingBottom: "2rem" }}>
        <div className="page-hero__inner">
          <p className="eyebrow">Legal</p>
          <h1 className="h-xl">{title}</h1>
          <p className="muted">Last updated {SITE.legalUpdated}</p>
        </div>
      </section>
      <div className="container" style={{ paddingBottom: "var(--section)" }}>
        <div className="prose">{children}</div>
      </div>
    </>
  );
}
