import Link from "next/link";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import CompanyStrip from "@/components/CompanyStrip";
import EcosystemGraphic from "@/components/EcosystemGraphic";
import Marquee from "@/components/Marquee";
import ScrollText from "@/components/ScrollText";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import ScrollCue from "@/components/ScrollCue";
import SectionHead from "@/components/SectionHead";
import ShaderBackground from "@/components/ShaderBackground";

const PILLARS = [
  {
    tag: "Peer to peer",
    title: "Honest conversation",
    text: "Talk openly about the decisions that are hard to discuss elsewhere: hiring, pricing, raising money, and when to hold on or let go.",
  },
  {
    tag: "Founders & investors",
    title: "Capital with context",
    text: "Investors who have built businesses themselves understand the person behind the pitch, and introductions begin from that understanding.",
  },
  {
    tag: "Practical",
    title: "Shared playbooks",
    text: "Learn what has actually worked from people who have run businesses, told in their own words rather than in theory.",
  },
];

const ENTRIES = [
  { href: "/founders-club", tag: "For builders", title: "Founders Club", text: "For people building a business who want peers, guidance and support." },
  { href: "/investors-club", tag: "For backers", title: "Investors Club", text: "For investors who know what it takes to build and want to meet those who do." },
  { href: "/other-services", tag: "For specific problems", title: "Other Services", text: "Hands-on help with due diligence, pitch decks, growth and diagnostics." },
];

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <ShaderBackground />
        <div className="hero__inner">
          <AnimatedHeadline
            id="hero-title"
            className="h-display"
            segments={[
              { t: "Great businesses are built by people who" },
              { t: "think bigger.", em: true },
              { t: "And" },
              { t: "grow together.", em: true },
            ]}
          />
          <p className="lead">
            The Growth House brings founders, investors and seasoned business leaders into the same
            room, so the people building companies can learn from the people who have already done it.
          </p>
          <div className="btn-row">
            <Link href="/founders-club" className="btn">Founders Club</Link>
            <Link href="/investors-club" className="btn btn--ghost">Investors Club</Link>
          </div>
        </div>
        <ScrollCue href="#companies" />
      </section>

      <div id="companies">
        <CompanyStrip />
      </div>

      <section id="about" className="section" aria-labelledby="about-title">
        <div className="container">
          <SectionHead>About The Growth House</SectionHead>
          <Reveal>
            <h2 id="about-title" className="h-xl about__title">
              More Than a Network. <em>A Place to Grow.</em>
            </h2>
          </Reveal>
          <div className="about">
            <Reveal className="about__copy">
              <p className="dropcap">
                Running a business can be lonely. Most of us learned the important lessons the hard
                way, and usually on our own. We built The Growth House so that founders, the
                investors who back them and the leaders who have been there before can talk openly,
                share what they know and grow together.
              </p>
              <p>
                It is not a directory and it is not an event series. It is a community built around
                trust, where people are introduced because it makes sense for both sides.
              </p>
            </Reveal>
            <div className="about__cards">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 90}>
                  <article className="card pillar">
                    <header>
                      <span className="pillar__n">{String(i + 1).padStart(2, "0")}.</span>
                      <span className="tag">{p.tag}</span>
                    </header>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--deep" aria-labelledby="eco-title">
        <div className="container">
          <SectionHead>The ecosystem in motion</SectionHead>
          <Reveal>
            <div className="split" style={{ marginBottom: "clamp(2rem, 5vw, 3.5rem)" }}>
              <h2 id="eco-title" className="h-xl">Everyone is <em>one introduction away.</em></h2>
              <p className="lead" style={{ color: "var(--sage)" }}>
                Founders, investors and business leaders connect across the community, and the best
                conversations start where those groups meet.
              </p>
            </div>
          </Reveal>
          <EcosystemGraphic />
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="room-title">
        <div className="container">
          <SectionHead>The community</SectionHead>
          <Reveal>
            <p className="kicker">Real people, quiet rooms</p>
            <h2 id="room-title" className="h-xl" style={{ marginBottom: "clamp(2rem, 5vw, 3.5rem)" }}>
              Be in the <em>Room.</em>
            </h2>
          </Reveal>
          <Reveal>
            <div className="bento">
              <article className="card bento__lead">
                <Photo label="Founders in conversation at a Growth House gathering" alt="Founders in conversation" />
                <span className="tag">Founders · Gathering</span>
                <h3>Founders in conversation</h3>
                <p>Real discussions between people building businesses, held without a script.</p>
              </article>
              <article className="card bento__b">
                <Photo label="Portrait or conversation with an investor member (supplied, with consent)" alt="Investor member" />
                <span className="tag">Investors</span>
                <h3>Investors who have built before</h3>
              </article>
              <article className="card bento__c">
                <Photo label="Business discussion around a table" alt="Business discussion" />
                <span className="tag">Discussions</span>
                <h3>Working sessions on real problems</h3>
              </article>
              <article className="card bento__d">
                <Photo label="Event or roundtable, wide shot" alt="Event" />
                <span className="tag">Events</span>
                <h3>Roundtables and gatherings</h3>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee
        rows={[
          { words: ["Think bigger", "Grow together", "Build with builders"] },
          { words: ["Founders", "Investors", "Leaders", "Operators"], outline: true, reverse: true },
        ]}
      />

      <section className="section" aria-label="What we believe">
        <div className="container">
          <div className="card belief">
            <p className="kicker">What we believe</p>
            <ScrollText
              className="pull"
              text="The most useful room is the one where the hardest truths can be said out loud and nobody has to pretend."
            />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="cta-title">
        <div className="container">
          <SectionHead>Join us</SectionHead>
          <Reveal>
            <div className="center" style={{ textAlign: "center", maxWidth: 760, marginBottom: "clamp(2.5rem, 6vw, 4rem)" }}>
              <h2 id="cta-title" className="h-xl" style={{ marginBottom: "1.25rem" }}>
                Step into the <em>ecosystem.</em>
              </h2>
              <p className="lead">
                Choose the community that fits where you are, or tell us about a specific problem
                and we will point you to the right kind of help.
              </p>
            </div>
          </Reveal>
          <div className="entries">
            {ENTRIES.map((e, i) => (
              <Reveal key={e.href} delay={i * 90}>
                <Link href={e.href} className="card entry">
                  <span className="tag">{e.tag}</span>
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                  <span className="entry__cta">Learn more <span aria-hidden="true">→</span></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
