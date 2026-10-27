import type { Metadata } from "next";
import Icon from "@/components/Icon";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import ServicesExperience from "@/components/ServicesExperience";

export const metadata: Metadata = {
  title: "Other Services",
  description: "Business diagnostic, pitch deck development, due diligence support and growth partnership for owners and investors.",
  alternates: { canonical: "/other-services" },
  openGraph: { title: "Other Services — The Growth House", url: "/other-services" },
};

const PROCESS = [
  { t: "Understand", d: "We listen first: your business, your goals and the problem in front of you." },
  { t: "Plan", d: "We agree a clear scope, approach and timeline before any work begins." },
  { t: "Execute", d: "Experienced people do the work with you, keeping you informed along the way." },
  { t: "Review", d: "We look back together at what was done and what should happen next." },
];

export default function OtherServices() {
  return (
    <>
      <section className="page-hero page-hero--blush" aria-labelledby="h1">
        <div className="container page-hero__grid">
          <div className="page-hero__copy">
            <p className="eyebrow">Other Services</p>
            <h1 id="h1" className="h-display" style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)" }}>
              Practical support for <em>your next stage.</em>
            </h1>
            <p className="lead">
              Focused help for owners and investors who want experienced hands on one specific
              problem. Tell us what you need and we will come back to you.
            </p>
            <div className="btn-row">
              <a href="#enquire" className="btn">
                Make an enquiry <Icon name="arrow" size={18} />
              </a>
              <a href="#services-title" className="btn btn--ghost">See the services</a>
            </div>
          </div>
          <Photo slot="servicesHero" className="page-hero__photo" sizes="(min-width: 960px) 45vw, 100vw" priority />
        </div>
      </section>

      <ServicesExperience
        process={
          <section className="section section--forest" aria-labelledby="process-title">
            <div className="container">
              <Reveal>
                <h2 id="process-title" className="h-xl" style={{ marginBottom: "3rem" }}>
                  How we <em>work.</em>
                </h2>
                <ol className="steps steps--4">
                  {PROCESS.map((p, i) => (
                    <li key={p.t} className="step">
                      <span className="step__n">0{i + 1}</span>
                      <h3>{p.t}</h3>
                      <p>{p.d}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </section>
        }
      />
    </>
  );
}
