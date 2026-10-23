import ApplicationForm from "./ApplicationForm";
import type { FormConfig } from "@/lib/forms";

/** Anchor target (#apply) for every "Apply" CTA on a club page. */
export default function ApplySection({
  config,
  eyebrow,
  title,
  intro,
}: {
  config: FormConfig;
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
}) {
  return (
    <section id="apply" className="section section--sage" aria-labelledby="apply-title">
      <div className="container">
        <div className="narrow center" style={{ marginBottom: "3rem", textAlign: "center" }}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="apply-title" className="h-xl" style={{ margin: "1rem 0 1.25rem" }}>{title}</h2>
          <p className="lead">{intro}</p>
        </div>
        <div className="narrow center">
          <div className="form-wrap">
            <ApplicationForm config={config} />
          </div>
        </div>
      </div>
    </section>
  );
}
