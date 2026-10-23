/** Large kinetic type band. Two rows drift in opposite directions. */
export default function Marquee({ rows }: { rows: { words: string[]; outline?: boolean; reverse?: boolean }[] }) {
  return (
    <div className="marquee" aria-hidden="true">
      {rows.map((row, i) => (
        <div key={i} className={`marquee__row${row.reverse ? " is-reverse" : ""}${row.outline ? " is-outline" : ""}`}>
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee__track">
              {row.words.map((w, k) => (
                <span key={k}>
                  {w}
                  <b>✦</b>
                </span>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
