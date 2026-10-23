import type { Metadata } from "next";
import ShaderBackground from "@/components/ShaderBackground";
import ApplySection from "@/components/ApplySection";
import Photo from "@/components/Photo";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { investorForm } from "@/config/forms";

export const metadata: Metadata = {
  title: "Investors Club",
  description: "A club for investors who understand what it takes to build a business.",
};

/**
 * Only verified, consented profiles may be listed. Add real entries here
 * (name, role, summary, src); until then the slots stay marked as placeholders.
 */
type Profile = { name: string; role: string; summary: string; src?: string };
const VERIFIED_PROFILES: Profile[] = [];
const PLACEHOLDER_SLOTS = 3;

const FAQ = [
  { q: "Who can apply?", a: "Angel investors, family offices, funds and operators who are exploring investing. A background in building or running a business is valued." },
  { q: "Why do you ask for a LinkedIn profile?", a: "We verify every member's background before anything is shared with the community." },
  { q: "Is this investment advice or a securities offering?", a: "No. The club is a community for introductions and conversation. Any investment decision is yours alone." },
  { q: "How is my information used?", a: "Only to review your application and contact you. Our Privacy Policy has the details." },
];

export default function InvestorsClub() {
  return (
    <>
      <section className="page-hero" aria-labelledby="h1">
        <ShaderBackground />
        <div className="page-hero__inner">
          <p className="eyebrow">Investors Club</p>
          <h1 id="h1" className="h-display">
            Every Investor Was <em>Once a Builder.</em>
          </h1>
          <p className="lead">
            The Investors Club is for people who back founders because they know what it takes to
            build, and who care about the person as much as the pitch.
          </p>
          <div className="btn-row">
            <a href="#apply" className="btn">Apply to join</a>
            <a href="#mindset" className="btn btn--ghost">The mindset</a>
          </div>
        </div>
      </section>

      <section id="mindset" className="section section--sage" aria-labelledby="mindset-title">
        <div className="container">
          <SectionHead>Investors Club · Philosophy</SectionHead>
          <Reveal>
            <h2 id="mindset-title" className="h-xl" style={{ margin: "0 0 2rem" }}>
              It&rsquo;s All About <em>the Mindset.</em>
            </h2>
            <p className="pull">
              Good investors remember what it felt like to make payroll, land a first customer and
              doubt the plan at two in the morning. That memory shapes how they back people.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="journeys-title">
        <div className="container">
          <SectionHead>Investors Club · Community</SectionHead>
          <Reveal>
            <div className="split" style={{ marginBottom: "clamp(2.5rem, 6vw, 4.5rem)" }}>
              <h2 id="journeys-title" className="h-xl">Investor <em>journeys.</em></h2>
              <p className="lead">
                Their entrepreneurial experience and how they show up in the community, in their
                own words. We only publish a profile once it has been verified and the member has
                approved it.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="profiles">
              {VERIFIED_PROFILES.map((p) => (
                <article className="profile" key={p.name}>
                  <Photo src={p.src} alt={p.name} label={p.name} />
                  <h3>{p.name}</h3>
                  <p className="muted">{p.role}</p>
                  <p>{p.summary}</p>
                </article>
              ))}
              {VERIFIED_PROFILES.length === 0 &&
                Array.from({ length: PLACEHOLDER_SLOTS }, (_, i) => (
                  <article className="profile" key={i}>
                    <Photo label="Verified investor portrait (to be supplied)" alt="" />
                    <span className="badge">Placeholder</span>
                    <h3>Investor profile</h3>
                    <p className="muted">
                      Name, background and entrepreneurial journey to be added once verified
                      and approved by the member.
                    </p>
                  </article>
                ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="faq-title">
        <div className="container">
          <SectionHead>Investors Club · Questions</SectionHead>
          <div className="split">
            <h2 id="faq-title" className="h-xl">Before you <em>apply.</em></h2>
            <Faq items={FAQ} />
          </div>
        </div>
      </section>

      <ApplySection
        config={investorForm}
        eyebrow="Apply"
        title={<>Join as <em>an investor.</em></>}
        intro="Applications are reviewed personally, and profiles are verified before anything is shared."
      />
    </>
  );
}
