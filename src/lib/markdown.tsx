import type { ReactNode } from "react";

/**
 * A small, safe Markdown subset for blog posts. It builds React elements (never raw
 * HTML) and only allows http(s), mailto and site-relative URLs.
 * Supports: ## / ### headings, paragraphs, - lists, 1. lists, > quotes,
 * **bold**, *italic*, [links](url), and a line holding only ![alt](url) for an
 * image (or a video when the URL ends in .mp4/.webm/.mov).
 */
const SAFE_URL = /^(https?:\/\/|mailto:|\/(?!\/))/i;
const VIDEO = /\.(mp4|webm|mov)(\?.*)?$/i;

function inline(text: string, k: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*\s][^*]*)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${k}-${i++}`;
    if (m[1] !== undefined) {
      out.push(
        SAFE_URL.test(m[2]) ? (
          <a key={key} href={m[2]} {...(m[2].startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
            {m[1]}
          </a>
        ) : (
          m[1]
        ),
      );
    } else if (m[3] !== undefined) out.push(<strong key={key}>{m[3]}</strong>);
    else out.push(<em key={key}>{m[4]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function Markdown({ source }: { source: string }) {
  const blocks = source.replace(/\r\n/g, "\n").split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((block, bi) => {
        const k = `b${bi}`;
        const lines = block.split("\n");
        const h = /^(#{2,3})\s+(.+)$/.exec(block);
        if (h && lines.length === 1) {
          const Tag = h[1].length === 2 ? "h2" : "h3";
          return <Tag key={k}>{inline(h[2], k)}</Tag>;
        }
        const img = /^!\[([^\]]*)\]\(([^)\s]+)\)$/.exec(block);
        if (img && SAFE_URL.test(img[2])) {
          return (
            <figure key={k}>
              {VIDEO.test(img[2]) ? (
                <video src={img[2]} controls playsInline preload="metadata" aria-label={img[1] || undefined} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img[2]} alt={img[1]} loading="lazy" />
              )}
              {img[1] && <figcaption>{img[1]}</figcaption>}
            </figure>
          );
        }
        if (lines.every((l) => /^[-*]\s+/.test(l))) {
          return <ul key={k}>{lines.map((l, i) => <li key={i}>{inline(l.replace(/^[-*]\s+/, ""), `${k}-${i}`)}</li>)}</ul>;
        }
        if (lines.every((l) => /^\d+\.\s+/.test(l))) {
          return <ol key={k}>{lines.map((l, i) => <li key={i}>{inline(l.replace(/^\d+\.\s+/, ""), `${k}-${i}`)}</li>)}</ol>;
        }
        if (lines.every((l) => l.startsWith(">"))) {
          return <blockquote key={k}>{inline(lines.map((l) => l.replace(/^>\s?/, "")).join(" "), k)}</blockquote>;
        }
        return (
          <p key={k}>
            {lines.flatMap((l, i) => (i ? [<br key={`br${i}`} />, ...inline(l, `${k}-${i}`)] : inline(l, `${k}-${i}`)))}
          </p>
        );
      })}
    </>
  );
}
