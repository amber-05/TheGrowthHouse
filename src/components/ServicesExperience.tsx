"use client";

import { useEffect, useState } from "react";
import ApplicationForm from "./ApplicationForm";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { enquiryForm } from "@/config/forms";
import { SERVICES, type ServiceId } from "@/config/services";

const isServiceId = (v: string | null): v is ServiceId => SERVICES.some((s) => s.id === v);

/**
 * Service cards plus the enquiry form. Choosing a card (or arriving with
 * ?service=<id>) pre-selects that service in the form; `process` renders
 * between the two.
 */
export default function ServicesExperience({ process }: { process: React.ReactNode }) {
  const [service, setService] = useState<ServiceId>(SERVICES[0].id);
  const [session, setSession] = useState(0);

  const choose = (id: ServiceId) => {
    setService(id);
    setSession((n) => n + 1); // fresh form state for the new selection
  };

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("service");
    if (isServiceId(id)) choose(id);
  }, []);

  return (
    <>
      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <Reveal>
            <div className="section-intro section-intro--split">
              <div>
                <p className="eyebrow">Four ways we can help</p>
                <h2 id="services-title" className="h-xl" style={{ marginTop: "1rem" }}>
                  Choose where you <em>need us.</em>
                </h2>
              </div>
              <p className="lead">
                Each service is focused on one problem, led by experienced people, and scoped with
                you before anything starts.
              </p>
            </div>
          </Reveal>
          <div className="grid-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={(i % 2) * 80}>
                <article className={`card card--${s.tone} service-card`} id={s.id} style={{ height: "100%" }}>
                  <div className="icon-badge"><Icon name={s.icon} /></div>
                  <h3>{s.title}</h3>
                  <p className="lead-sm">{s.summary}</p>
                  <ul>
                    {s.points.map((p) => (
                      <li key={p}><Icon name="check" size={18} />{p}</li>
                    ))}
                  </ul>
                  <a
                    href="#enquire"
                    className="card__cta"
                    onClick={() => choose(s.id)}
                  >
                    Enquire about {s.title} <Icon name="arrow" size={18} />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {process}

      <section id="enquire" className="section section--sage" aria-labelledby="enquire-title">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Enquire</p>
            <h2 id="enquire-title" className="h-xl" style={{ margin: "1rem 0 1.25rem" }}>
              Tell us what you <em>need.</em>
            </h2>
            <p className="lead">
              Share a little about your business and the problem in front of you. We will reply by
              email to talk through whether and how we can help.
            </p>
          </Reveal>
          <div className="form-card">
            <ApplicationForm key={session} config={enquiryForm} preset={{ service }} />
          </div>
        </div>
      </section>
    </>
  );
}
