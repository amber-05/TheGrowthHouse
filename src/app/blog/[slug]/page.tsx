import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "@/lib/markdown";
import { getPublishedPost } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || undefined,
      url: `/blog/${post.slug}`,
      publishedTime: post.published_at ?? undefined,
      images: post.cover_url ? [post.cover_url] : undefined,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "";
  return (
    <article className="section post">
      <div className="container post__wrap">
        <Link href="/blog" className="post__back">← All articles</Link>
        <p className="eyebrow">{date}</p>
        <h1 className="h-display" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>{post.title}</h1>
        {post.excerpt && <p className="lead">{post.excerpt}</p>}
        {post.cover_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="post__cover" src={post.cover_url} alt="" />
        )}
        <div className="prose">
          <Markdown source={post.body} />
        </div>
      </div>
    </article>
  );
}
