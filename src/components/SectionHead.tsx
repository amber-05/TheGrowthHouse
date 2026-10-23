/** Small topline label with a hairline rule, used to open each section. */
export default function SectionHead({ children }: { children: React.ReactNode }) {
  return <div className="section-head">{children}</div>;
}
