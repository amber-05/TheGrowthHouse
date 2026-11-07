import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { listGallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos and videos from The Growth House community.",
  alternates: { canonical: "/gallery" },
  openGraph: { title: "Gallery — The Growth House", url: "/gallery" },
};

export default async function Gallery() {
  const items = await listGallery();
  return (
    <>
      <section className="page-hero page-hero--blush" aria-labelledby="h1">
        <div className="container">
          <div className="page-hero__copy">
            <p className="eyebrow">Gallery</p>
            <h1 id="h1" className="h-display" style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)" }}>
              Moments from <em>the community.</em>
            </h1>
          </div>
        </div>
      </section>
      <section className="section" aria-label="Photos and videos" style={{ paddingTop: "clamp(2rem, 5vw, 4rem)" }}>
        <div className="container">
          {items.length === 0 ? (
            <p>Photos and videos will appear here soon.</p>
          ) : (
            <Reveal>
              <ul className="gallery-grid">
                {items.map((m) => (
                  <li key={m.id}>
                    <figure>
                      {m.kind === "image" ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.url} alt={m.alt || m.title} loading="lazy" />
                      ) : (
                        <video src={m.url} controls playsInline preload="metadata" aria-label={m.alt || m.title || undefined} />
                      )}
                      {(m.caption || m.title) && <figcaption>{m.caption || m.title}</figcaption>}
                    </figure>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
