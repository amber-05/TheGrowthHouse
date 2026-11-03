import type { Metadata } from "next";
import ApplicationForm from "@/components/ApplicationForm";
import Faq from "@/components/Faq";
import Icon, { type IconName } from "@/components/Icon";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { founderForm } from "@/config/forms";

export const metadata: Metadata = {
  title: "Founders Club",
  description: "A community for founders: networking, guidance, fundraising preparation, mentorship and expert support.",
  alternates: { canonical: "/founders-club" },
  openGraph: { title: "Founders Club — The Growth House", url: "/founders-club" },
};

const AREAS: { icon: IconName; tone: string; t: string; d: string }[] = [
  { icon: "network", tone: "ivory", t: "Founder networking", d: "Meet other people building businesses, share what is working, and find peers who understand the road you are on." },
  { icon: "compass", tone: "lavender", t: "Strategic guidance", d: "Talk through decisions with experienced business leaders who can offer perspective on strategy, priorities and direction." },
  { icon: "fundraise", tone: "mustard", t: "Fundraising preparation", d: "Understand what investors look for and present your business clearly. We help you prepare; we do not promise funding." },
  { icon: "sprout", tone: "blush", t: "Mentorship", d: "Learn from people who have built, scaled and, at times, struggled with businesses of their own." },
  { icon: "expert", tone: "sand", t: "Expert support", d: "Access specialists across areas such as finance, legal and compliance, operations and growth when you need a deeper look." },
];

const PLANS: { name: string; price: string; was?: string; per?: string; save?: string; best?: boolean }[] = [
  { name: "Monthly Plan", price: "₹3,999", per: "/month" },
  { name: "Quarterly Plan", was: "₹12,000", price: "₹9,999", save: "Save ₹2,001" },
  { name: "Half-Yearly Plan", was: "₹24,000", price: "₹17,999", save: "Save ₹6,001" },
  { name: "Yearly Plan", was: "₹48,000", price: "₹23,499", save: "Save ₹24,501", best: true },
];

const STEPS = [
  { t: "Apply", d: "Tell us about you, your business and what you are working through. It takes a few minutes." },
  { t: "We review", d: "A member of our team reads every application personally and may ask a few follow-up questions." },
  { t: "Join the conversation", d: "If it is a good fit, we welcome you in and start making the right introductions." },
];

const FAQ = [
  { q: "Who is the Founders Club for?", a: "Founders and owners of businesses at any stage, from an idea you are testing to a company that is already growing." },
  { q: "What happens after I apply?", a: "A member of our team reads every application personally and replies by email. We may ask a few follow-up questions." },
  { q: "Does the club guarantee funding?", a: "No. We help you prepare and connect you with people, but we cannot promise investment or any specific result." },
  { q: "How is my information used?", a: "Only to review your application and contact you. Our Privacy Policy has the details." },
];

export default function FoundersClub() {
  return (
    <>
      <section className="page-hero" aria-labelledby="h1">
        <div className="container apply-hero">
          <div className="apply-hero__copy">
            <p className="eyebrow">Founders Club</p>
            <h1 id="h1" className="h-display" style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)" }}>
              Build your business. <em>Find your people.</em>
            </h1>
            <p className="lead">
              The Founders Club is for people in the thick of it: building, hiring, selling, raising.
              Get honest conversation and experienced people in your corner.
            </p>
            <ul className="ticks">
              {["Peers who understand the road you are on", "Guidance from experienced business leaders", "Fundraising preparation, without promises"].map((t) => (
                <li key={t}><span className="tick"><Icon name="check" size={14} /></span>{t}</li>
              ))}
            </ul>
            <Photo slot="foundersHero" className="apply-hero__photo" sizes="(min-width: 960px) 45vw, 100vw" priority />
          </div>

          <div id="apply" className="form-card" role="region" aria-labelledby="apply-title">
            <div className="form-card__head">
              <p className="eyebrow">Apply</p>
              <h2 id="apply-title">Tell us about your business</h2>
              <p>One short form. Every application is reviewed personally.</p>
            </div>
            <ApplicationForm config={founderForm} />
          </div>
        </div>
      </section>

      <section className="section section--sage" aria-labelledby="support-title">
        <div className="container">
          <Reveal>
            <div className="section-intro section-intro--split">
              <div>
                <p className="eyebrow">What you get</p>
                <h2 id="support-title" className="h-xl" style={{ marginTop: "1rem" }}>
                  What the club <em>offers.</em>
                </h2>
              </div>
              <p className="lead">
                Help built around the actual work of running a company, not a curriculum.
                Membership gives you access to people and guidance; it does not guarantee funding,
                growth or any particular outcome.
              </p>
            </div>
          </Reveal>
          <div className="grid-3">
            {AREAS.map((a, i) => (
              <Reveal key={a.t} delay={(i % 3) * 80}>
                <article className={`card card--${a.tone}`} style={{ height: "100%" }}>
                  <div className="icon-badge"><Icon name={a.icon} /></div>
                  <h3>{a.t}</h3>
                  <p>{a.d}</p>
                </article>
              </Reveal>
            ))}
            <Reveal delay={160}>
              <a href="#apply" className="card card--forest" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <h3>Ready when you are.</h3>
                <span className="card__cta">Apply to the club <Icon name="arrow" size={18} /></span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="pricing-title" id="pricing">
        <div className="container">
          <Reveal>
            <div className="section-intro center" style={{ textAlign: "center", justifyItems: "center" }}>
              <p className="eyebrow">Membership pricing</p>
              <h2 id="pricing-title" className="h-xl" style={{ maxWidth: "18ch" }}>
                Choose how long you <em>want to build with us.</em>
              </h2>
            </div>
          </Reveal>
          <div className="pricing">
            {PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <article className={`plan${p.best ? " plan--best" : ""}`}>
                  {p.best && <span className="plan__flag">Best value</span>}
                  <h3>{p.name}</h3>
                  <p className="plan__was">
                    {p.was ? <><span className="sr-only">Original price </span><s>{p.was}</s></> : <span aria-hidden="true">&nbsp;</span>}
                  </p>
                  <p className="plan__price">
                    {p.was && <span className="sr-only">Offer price </span>}
                    {p.price}<small>{p.per}</small>
                  </p>
                  <p className="plan__save">{p.save ?? "Pay as you go"}</p>
                  <a href="#apply" className={`btn${p.best ? " btn--light" : ""}`}>
                    Join the Founders Club <Icon name="arrow" size={18} />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <Reveal>
            <h2 id="how-title" className="h-xl" style={{ marginBottom: "3rem" }}>
              How it <em>works.</em>
            </h2>
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li key={s.t} className="step step--light">
                  <span className="step__n">0{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section section--forest" aria-labelledby="faq-title">
        <div className="container split">
          <h2 id="faq-title" className="h-xl">Before you <em>apply.</em></h2>
          <Faq items={FAQ} />
        </div>
      </section>
    </>
  );
}
