import type { Metadata } from "next";
import ShaderBackground from "@/components/ShaderBackground";
import ApplySection from "@/components/ApplySection";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { founderForm } from "@/config/forms";

export const metadata: Metadata = {
  title: "Founders Club",
  description: "A community for founders: networking, guidance, fundraising preparation, mentorship and expert support.",
};

const AREAS = [
  { t: "Founder networking", d: "Meet other people building businesses, share what is working, and find peers who understand the road you are on." },
  { t: "Strategic guidance", d: "Talk through decisions with experienced business leaders who can offer perspective on strategy, priorities and direction." },
  { t: "Fundraising preparation", d: "Get help understanding what investors look for and presenting your business clearly. We help you prepare; we do not promise funding." },
  { t: "Mentorship", d: "Learn from people who have built, scaled and, at times, struggled with businesses of their own." },
  { t: "Expert support", d: "Access specialists across areas such as finance, operations and growth when you need a deeper look." },
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
        <ShaderBackground />
        <div className="page-hero__inner">
          <p className="eyebrow">Founders Club</p>
          <h1 id="h1" className="h-display">
            Building a Business Is Hard. <em>You Don&rsquo;t Have to Build Alone.</em>
          </h1>
          <p className="lead">
            The Founders Club is for people who are in the thick of it: building, hiring, selling,
            raising. You get honest conversation and experienced people in your corner.
          </p>
          <div className="btn-row">
            <a href="#apply" className="btn">Apply to join</a>
            <a href="#support" className="btn btn--ghost">How it helps</a>
          </div>
        </div>
      </section>

      <section id="support" className="section" aria-labelledby="support-title">
        <div className="container">
          <SectionHead>Founders Club · What you get</SectionHead>
          <div className="split">
            <Reveal>
              <h2 id="support-title" className="h-xl">What the club <em>offers.</em></h2>
              <p className="lead" style={{ marginTop: "1.5rem" }}>
                Help built around the actual work of running a company, not a curriculum.
              </p>
              <p className="note" style={{ marginTop: "1.5rem" }}>
                Membership gives you access to people and guidance. It does not guarantee funding,
                growth or any particular outcome.
              </p>
            </Reveal>
            <Reveal>
              <ol className="areas">
                {AREAS.map((a) => (
                  <li key={a.t}>
                    <div>
                      <h3>{a.t}</h3>
                      <p>{a.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div style={{ marginTop: "2.5rem" }}>
                <a href="#apply" className="link-arrow">Apply to the Founders Club <span aria-hidden="true">→</span></a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="faq-title">
        <div className="container">
          <SectionHead>Founders Club · Questions</SectionHead>
          <div className="split">
            <h2 id="faq-title" className="h-xl">Before you <em>apply.</em></h2>
            <Faq items={FAQ} />
          </div>
        </div>
      </section>

      <ApplySection
        config={founderForm}
        eyebrow="Apply"
        title={<>Tell us about <em>your business.</em></>}
        intro="Applications are reviewed personally. Share a little about you and where you are, and we will be in touch."
      />
    </>
  );
}
