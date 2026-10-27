import type { Metadata } from "next";
import Link from "next/link";
import ApplicationForm from "@/components/ApplicationForm";
import Faq from "@/components/Faq";
import Icon, { type IconName } from "@/components/Icon";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { investorForm } from "@/config/forms";

export const metadata: Metadata = {
  title: "Investors Club",
  description: "A club for investors who understand what it takes to build a business, and who care about context as much as capital.",
  alternates: { canonical: "/investors-club" },
  openGraph: { title: "Investors Club — The Growth House", url: "/investors-club" },
};

/**
 * Only verified, consented profiles may be listed. Add real entries here
 * (name, role, summary, src); the section is hidden until there is one.
 */
type Profile = { name: string; role: string; summary: string; src?: string };
const VERIFIED_PROFILES: Profile[] = [];

const OFFER: { icon: IconName; t: string; d: string }[] = [
  { icon: "link", t: "Introductions with context", d: "Meet founders through the community, where you can see how they think and how they show up before any conversation about capital." },
  { icon: "users", t: "A room of people who have built", d: "Exchange views with other investors and operators who understand the work behind a business." },
  { icon: "search", t: "Support when you need it", d: "Access due diligence support and a diagnostic view of a business through our other services, as a separate, optional engagement." },
];

const FAQ = [
  { q: "Who can apply?", a: "Angel investors, family offices, funds and operators who are exploring investing. A background in building or running a business is valued." },
  { q: "Why do you ask for a LinkedIn profile?", a: "We verify every member's background before anything is shared with the community." },
  { q: "Does the club guarantee deals or funding for founders?", a: "No. The club is a community for introductions and conversation. It makes no promise of investment, deal flow or returns for anyone." },
  { q: "Is this investment advice or a securities offering?", a: "No. Any investment decision is yours alone, and you should take your own advice." },
  { q: "How is my information used?", a: "Only to review your application and contact you. Our Privacy Policy has the details." },
];

export default function InvestorsClub() {
  return (
    <>
      <section className="page-hero page-hero--forest" aria-labelledby="h1">
        <div className="container page-hero__grid">
          <div className="page-hero__copy">
            <p className="eyebrow">Investors Club</p>
            <h1 id="h1" className="h-display" style={{ fontSize: "clamp(2.7rem, 5.6vw, 4.9rem)" }}>
              Capital is important. <em>Context matters just as much.</em>
            </h1>
            <p className="lead">
              The Investors Club is for people who back founders because they know what it takes to
              build, and who care about the person as much as the pitch.
            </p>
            <div className="btn-row">
              <a href="#apply" className="btn btn--terracotta">
                Apply to join <Icon name="arrow" size={18} />
              </a>
              <a href="#mindset" className="btn btn--ghost-light">The mindset</a>
            </div>
            <p className="disclaimer">
              The club is a community for introductions and conversation. It does not offer
              investment advice or promise deals, funding or returns.
            </p>
          </div>
          <Photo slot="investorsHero" className="page-hero__photo page-hero__photo--tall" sizes="(min-width: 960px) 40vw, 100vw" priority />
        </div>
      </section>

      <section id="mindset" className="section" aria-labelledby="mindset-title">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Philosophy</p>
            <h2 id="mindset-title" className="h-xl" style={{ marginTop: "1rem" }}>
              It&rsquo;s all about <em>the mindset.</em>
            </h2>
          </Reveal>
          <Reveal>
            <p className="h-lg" style={{ color: "var(--forest)", lineHeight: 1.2 }}>
              Good investors remember what it felt like to make payroll, land a first customer and
              doubt the plan at two in the morning. That memory shapes how they back people.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--forest" style={{ paddingBlock: "clamp(3.5rem, 8vw, 6rem)" }} aria-labelledby="offer-title">
        <div className="container">
          <Reveal>
            <h2 id="offer-title" className="h-xl" style={{ marginBottom: "3rem", maxWidth: "16ch" }}>
              What membership <em>looks like.</em>
            </h2>
          </Reveal>
          <div className="grid-3">
            {OFFER.map((o, i) => (
              <Reveal key={o.t} delay={i * 80}>
                <article className="card" style={{ background: "rgba(245,242,233,.07)", border: "1px solid rgba(245,242,233,.14)", height: "100%" }}>
                  <div className="icon-badge" style={{ background: "var(--terracotta-btn)", color: "var(--ivory)" }}>
                    <Icon name={o.icon} />
                  </div>
                  <h3>{o.t}</h3>
                  <p style={{ color: "#c3ccb7" }}>{o.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {VERIFIED_PROFILES.length > 0 && (
        <section className="section" aria-labelledby="journeys-title">
          <div className="container">
            <h2 id="journeys-title" className="h-xl" style={{ marginBottom: "3rem" }}>
              Investor <em>journeys.</em>
            </h2>
            <div className="profiles">
              {VERIFIED_PROFILES.map((p) => (
                <article className="profile" key={p.name}>
                  {p.src && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="photo" src={p.src} alt={p.name} loading="lazy" />
                  )}
                  <h3>{p.name}</h3>
                  <p className="muted">{p.role}</p>
                  <p>{p.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="apply" className="section section--sand" aria-labelledby="apply-title">
        <div className="container split">
          <Reveal>
            <p className="eyebrow">Apply</p>
            <h2 id="apply-title" className="h-xl" style={{ margin: "1rem 0 1.25rem" }}>
              Join as <em>an investor.</em>
            </h2>
            <p className="lead">
              Applications are reviewed personally, and background details are verified before
              anything is shared with the community.
            </p>
            <p className="disclaimer" style={{ marginTop: "1.5rem", color: "var(--body)" }}>
              Submitting an application is not an offer or a solicitation of any investment, and
              nothing here guarantees funding or returns.{" "}
              <Link href="/terms" style={{ fontWeight: 600 }}>Read our terms</Link>.
            </p>
          </Reveal>
          <div className="form-card">
            <ApplicationForm config={investorForm} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container split">
          <h2 id="faq-title" className="h-xl">Before you <em>apply.</em></h2>
          <Faq items={FAQ} />
        </div>
      </section>
    </>
  );
}
