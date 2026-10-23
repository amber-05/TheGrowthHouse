import type { Metadata } from "next";
import ShaderBackground from "@/components/ShaderBackground";
import SectionHead from "@/components/SectionHead";
import ServicesShowcase from "@/components/ServicesShowcase";

export const metadata: Metadata = {
  title: "Other Services",
  description: "Due diligence, pitch deck development, growth partnership and diagnostic reports.",
};

export default function OtherServices() {
  return (
    <>
      <section className="page-hero" aria-labelledby="h1">
        <ShaderBackground />
        <div className="page-hero__inner">
          <p className="eyebrow">Other Services</p>
          <h1 id="h1" className="h-display">
            Practical support, <em>when you need it.</em>
          </h1>
          <p className="lead">
            Four focused services for owners and investors who want experienced hands on one
            specific problem. Tell us what you need and we will come back to you.
          </p>
        </div>
      </section>
      <section className="container" style={{ paddingBottom: "var(--section)" }} aria-label="Services">
        <SectionHead>Other Services · Four ways we can help</SectionHead>
        <ServicesShowcase />
      </section>
    </>
  );
}
