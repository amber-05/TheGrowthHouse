import Link from "next/link";
import CompanyStrip from "@/components/CompanyStrip";
import Icon, { type IconName } from "@/components/Icon";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { SERVICES } from "@/config/services";

const BENEFITS: { icon: IconName; tone: string; title: string; text: string }[] = [
  {
    icon: "chat",
    tone: "mustard",
    title: "Honest conversation",
    text: "Talk openly about the decisions that are hard to discuss elsewhere: hiring, pricing, raising money, and when to hold on or let go.",
  },
  {
    icon: "compass",
    tone: "lavender",
    title: "Experienced guidance",
    text: "Think things through with business leaders who have run companies of their own and can offer perspective, not theory.",
  },
  {
    icon: "link",
    tone: "blush",
    title: "Introductions with context",
    text: "People are introduced because it makes sense for both sides, and every introduction starts from an understanding of who you are.",
  },
  {
    icon: "sprout",
    tone: "sage",
    title: "Preparation, not promises",
    text: "Learn what investors look for and present your business clearly. We help you prepare; we never promise funding.",
  },
];

const PRINCIPLES = [
  { t: "Peer to peer", d: "Founders learn most from other founders, so the room is built around honest exchange." },
  { t: "Capital with context", d: "Investors who have built businesses themselves understand the person behind the pitch." },
  { t: "Shared playbooks", d: "What has actually worked, told in the words of the people who ran the business." },
];

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">A founder ecosystem</p>
            <h1 id="hero-title" className="h-display">
              Great businesses aren&rsquo;t built <em>alone.</em>
            </h1>
            <p className="lead">
              The Growth House brings founders, investors and experienced business leaders into one
              trusted community, so the people building companies can learn from the people who have
              been there before.
            </p>
            <div className="btn-row">
              <Link href="/founders-club#apply" className="btn">
                Join the Founders Club <Icon name="arrow" size={18} />
              </Link>
              <Link href="/investors-club" className="btn btn--ghost">Explore the Investors Club</Link>
            </div>
            <ul className="hero__note" aria-label="Who the community is for">
              <li className="chip chip--sage">Founders</li>
              <li className="chip chip--blush">Investors</li>
              <li className="chip chip--lavender">Business leaders</li>
              <li className="chip chip--mustard">Specialist support</li>
            </ul>
          </div>

          <div className="hero__art" aria-hidden="true">
            <span className="hero__sun" />
            <Photo slot="heroMain" className="hero__main" sizes="(min-width: 960px) 40vw, 90vw" priority />
            <Photo slot="heroSmall" className="hero__small" sizes="20vw" priority />
            <div className="hero__badge">
              <b>Build bigger.</b>
              Grow together.
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="eco-title">
        <div className="container">
          <Reveal>
            <div className="section-intro section-intro--split">
              <div>
                <p className="eyebrow">The ecosystem</p>
                <h2 id="eco-title" className="h-xl" style={{ marginTop: "1rem" }}>
                  One ecosystem. <em>Three ways in.</em>
                </h2>
              </div>
              <p className="lead">
                Choose the part of The Growth House that fits where you are today, and meet the
                people who make it worth being part of.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="bento">
              <Link href="/founders-club" className="card card--sage b-wide">
                <div className="icon-badge"><Icon name="users" /></div>
                <span className="card__tag">For builders</span>
                <h3>Founders Club</h3>
                <p>Peers, guidance and support for people building a business at any stage.</p>
                <span className="card__cta">Explore <Icon name="arrow" size={18} /></span>
              </Link>
              <Link href="/investors-club" className="card card--forest b-wide">
                <div className="icon-badge"><Icon name="chart" /></div>
                <span className="card__tag">For backers</span>
                <h3>Investors Club</h3>
                <p>For investors who know what it takes to build and want to meet those who do.</p>
                <span className="card__cta">Explore <Icon name="arrow" size={18} /></span>
              </Link>
              <div className="card card--sand b-quote">
                <p>The most useful room is the one where the hardest truths can be said out loud.</p>
              </div>
              <Link href="/other-services" className="card card--blush">
                <div className="icon-badge"><Icon name="spark" /></div>
                <span className="card__tag">For specific problems</span>
                <h3>Other Services</h3>
                <p>Hands-on help for the next stage.</p>
                <span className="card__cta">Explore <Icon name="arrow" size={18} /></span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="benefits-title" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="section-intro center" style={{ textAlign: "center", justifyItems: "center" }}>
              <p className="eyebrow">What you gain</p>
              <h2 id="benefits-title" className="h-xl" style={{ maxWidth: "18ch" }}>
                Support built around the <em>real work</em> of building.
              </h2>
            </div>
          </Reveal>
          <div className="grid-4">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 80}>
                <article className={`card card--${b.tone}`}>
                  <div className="icon-badge"><Icon name={b.icon} /></div>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--forest" aria-labelledby="community-title">
        <div className="container community">
          <Reveal>
            <p className="eyebrow">The community</p>
            <h2 id="community-title" className="h-xl" style={{ marginTop: "1rem" }}>
              Be in the room where the <em>honest conversations</em> happen.
            </h2>
            <p className="lead" style={{ marginTop: "1.5rem" }}>
              Running a business can be lonely. We built The Growth House so founders, the investors
              who back them and the leaders who have been there can talk openly and grow together.
              It is not a directory. It is a community built on trust.
            </p>
            <ul className="principles">
              {PRINCIPLES.map((p, i) => (
                <li key={p.t}>
                  <b>0{i + 1}</b>
                  <div>
                    <h3>{p.t}</h3>
                    <p>{p.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <div className="community__photos" aria-hidden="true">
              <Photo slot="community1" sizes="(min-width: 960px) 25vw, 50vw" />
              <Photo slot="community2" sizes="(min-width: 960px) 25vw, 50vw" />
              <Photo slot="community3" sizes="(min-width: 960px) 25vw, 50vw" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <Reveal>
            <div className="section-intro section-intro--split">
              <div>
                <p className="eyebrow">Other services</p>
                <h2 id="services-title" className="h-xl" style={{ marginTop: "1rem" }}>
                  Practical help for <em>specific problems.</em>
                </h2>
              </div>
              <p className="lead">
                Four focused services for owners and investors who want experienced hands on one
                thing at a time.
              </p>
            </div>
          </Reveal>
          <div className="grid-4">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <Link href={`/other-services?service=${s.id}#enquire`} className={`card card--${s.tone} service-card`}>
                  <div className="icon-badge"><Icon name={s.icon} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.points[0]}.</p>
                  <span className="card__cta">Enquire <Icon name="arrow" size={18} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="companies-title" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <h2 id="companies-title" className="h-md center" style={{ textAlign: "center", marginBottom: "1.75rem" }}>
              Businesses connected to The Growth House
            </h2>
            <CompanyStrip />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="cta-title">
        <div className="container">
          <Reveal>
            <div className="cta-band">
              <span className="cta-band__orb" aria-hidden="true" />
              <span className="cta-band__orb2" aria-hidden="true" />
              <h2 id="cta-title" className="h-xl">
                Step into the <em>ecosystem.</em>
              </h2>
              <p className="lead">
                Tell us about your business or your interest in backing one, and we will take it
                from there. Every application is read personally.
              </p>
              <div className="btn-row">
                <Link href="/founders-club#apply" className="btn btn--light">
                  Apply to the Founders Club <Icon name="arrow" size={18} />
                </Link>
                <Link href="/investors-club#apply" className="btn btn--ghost-light">Apply as an investor</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
