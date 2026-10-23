export type Segment = { t: string; em?: boolean };

/** Headline whose words rise into place one after another. Plain text for screen readers. */
export default function AnimatedHeadline({
  id,
  segments,
  className = "",
}: {
  id?: string;
  segments: Segment[];
  className?: string;
}) {
  let i = 0;
  return (
    <h1 id={id} className={className}>
      {segments.map((seg, s) =>
        seg.t.split(" ").filter(Boolean).map((w, k) => {
          const word = (
            <span className="word" key={`${s}-${k}`}>
              <span style={{ ["--i" as string]: i++ }}>{seg.em ? <em>{w}</em> : w}</span>
            </span>
          );
          return [word, " "];
        }),
      )}
    </h1>
  );
}
