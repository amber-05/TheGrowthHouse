import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { listPublishedPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes, stories and practical advice for founders from The Growth House.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog — The Growth House", url: "/blog" },
};

const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";

export default async function Blog() {
  const posts = await listPublishedPosts();
  return (
    <>
      <section className="page-hero page-hero--blush" aria-labelledby="h1">
        <div className="container">
          <div className="page-hero__copy">
            <p className="eyebrow">Blog</p>
            <h1 id="h1" className="h-display" style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)" }}>
              Notes for <em>founders.</em>
            </h1>
            <p className="lead">Stories, lessons and practical advice from The Growth House community.</p>
          </div>
        </div>
      </section>
      <section className="section" aria-label="Posts" style={{ paddingTop: "clamp(2rem, 5vw, 4rem)" }}>
        <div className="container">
          {posts.length === 0 ? (
            <p>New articles are on the way. Check back soon.</p>
          ) : (
            <Reveal>
              <ul className="blog-grid">
                {posts.map((p) => (
                  <li key={p.id}>
                    <Link href={`/blog/${p.slug}`} className="blog-card">
                      {p.cover_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.cover_url} alt="" loading="lazy" />
                      )}
                      <time dateTime={p.published_at ?? undefined}>{fmtDate(p.published_at)}</time>
                      <h2 className="h-lg">{p.title}</h2>
                      {p.excerpt && <p>{p.excerpt}</p>}
                    </Link>
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
