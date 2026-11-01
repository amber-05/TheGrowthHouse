import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import SupporterGrid from "@/components/SupporterGrid";
import { SUPPORTERS } from "@/config/supporters";

export const metadata: Metadata = {
  title: "Our Supporters",
  description: "The founders and entrepreneurs connected with The Growth House. Hover over a logo to watch their story.",
  alternates: { canonical: "/our-supporters" },
  openGraph: { title: "Our Supporters — The Growth House", url: "/our-supporters" },
};

export default function OurSupporters() {
  return (
    <>
      <section className="page-hero page-hero--blush" aria-labelledby="h1">
        <div className="container">
          <div className="page-hero__copy">
            <p className="eyebrow">Our Supporters</p>
            <h1 id="h1" className="h-display" style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)" }}>
              The founders <em>behind the ecosystem.</em>
            </h1>
            <p className="lead">
              Meet the founders and entrepreneurs connected with The Growth House. Hover over a logo
              to hear their story in their own words.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Supporters" style={{ paddingTop: "clamp(2rem, 5vw, 4rem)" }}>
        <div className="container">
          <Reveal>
            <SupporterGrid items={SUPPORTERS} />
          </Reveal>
          <Reveal>
            <div className="btn-row" style={{ marginTop: "3rem", justifyContent: "center" }}>
              <Link href="/founders-club#apply" className="btn">
                Join the Founders Club <Icon name="arrow" size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
