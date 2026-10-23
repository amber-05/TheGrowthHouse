export type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((i) => (
        <details key={i.q}>
          <summary>{i.q}</summary>
          <p>{i.a}</p>
        </details>
      ))}
    </div>
  );
}
