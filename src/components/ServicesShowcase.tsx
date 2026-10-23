"use client";

import { useRef, useState } from "react";
import ApplicationForm from "./ApplicationForm";
import Reveal from "./Reveal";
import { enquiryForm } from "@/config/forms";
import { SERVICES, type ServiceId } from "@/config/services";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Abstract line illustrations, replaceable with real photography later. */
const VISUALS: Record<ServiceId, React.ReactNode> = {
  "due-diligence": (
    <svg viewBox="0 0 200 160" aria-hidden="true" {...stroke}>
      <rect x="40" y="24" width="92" height="116" rx="3" />
      <path d="M58 52h56M58 70h56M58 88h34" />
      <circle cx="128" cy="104" r="22" fill="var(--ivory)" />
      <path d="M144 120l22 22" />
      <path d="M118 104l7 7 13-14" />
    </svg>
  ),
  "pitch-deck": (
    <svg viewBox="0 0 200 160" aria-hidden="true" {...stroke}>
      <rect x="28" y="28" width="144" height="92" rx="3" />
      <path d="M100 120v22M76 142h48" />
      <path d="M52 98l26-26 22 16 38-38" />
      <circle cx="138" cy="50" r="3" fill="currentColor" />
    </svg>
  ),
  "growth-partner": (
    <svg viewBox="0 0 200 160" aria-hidden="true" {...stroke}>
      <circle cx="72" cy="58" r="20" />
      <circle cx="128" cy="58" r="20" fill="var(--ivory)" />
      <path d="M32 134c0-22 18-38 40-38 8 0 14 2 20 5M108 101c6-3 12-5 20-5 22 0 40 16 40 38" />
      <path d="M100 30v-14M92 22l8-8 8 8" />
    </svg>
  ),
  "diagnostic-report": (
    <svg viewBox="0 0 200 160" aria-hidden="true" {...stroke}>
      <path d="M40 120a60 60 0 0 1 120 0" />
      <path d="M100 120L128 74" />
      <circle cx="100" cy="120" r="5" fill="currentColor" />
      <path d="M52 120h8M140 120h8M72 76l6 6M128 76l-6 6M100 62v8" />
      <path d="M60 144h80" />
    </svg>
  ),
};

export default function ServicesShowcase() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [service, setService] = useState<ServiceId>(SERVICES[0].id);
  const [session, setSession] = useState(0);

  const open = (id: ServiceId) => {
    setService(id);
    setSession((n) => n + 1); // fresh form state each time the modal opens
    dialogRef.current?.showModal();
  };

  const title = SERVICES.find((s) => s.id === service)?.title;

  return (
    <>
      <div>
        {SERVICES.map((s, i) => (
          <Reveal key={s.id}>
            <article className="service" id={s.id}>
              <div>
                <span className="service__num">{String(i + 1).padStart(2, "0")}</span>
                <h2>{s.title}</h2>
                <p className="lead">{s.summary}</p>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <button className="btn" type="button" onClick={() => open(s.id)} aria-haspopup="dialog">
                  Enquire Now <span aria-hidden="true">→</span>
                  <span className="sr-only"> about {s.title}</span>
                </button>
              </div>
              <div className="service__visual">{VISUALS[s.id]}</div>
            </article>
          </Reveal>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="modal"
        aria-labelledby="enquiry-title"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
      >
        <div className="modal__head">
          <div>
            <p className="eyebrow">Enquiry</p>
            <h2 id="enquiry-title" className="h-lg" style={{ marginTop: ".5rem" }}>{title}</h2>
          </div>
          <button className="modal__close" type="button" aria-label="Close enquiry form" onClick={() => dialogRef.current?.close()}>
            ×
          </button>
        </div>
        <div className="modal__body">
          <ApplicationForm key={session} config={enquiryForm} preset={{ service }} />
        </div>
      </dialog>
    </>
  );
}
