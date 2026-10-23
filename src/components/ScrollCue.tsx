export default function ScrollCue({ href }: { href: string }) {
  return (
    <a className="scroll-cue" href={href} aria-label="Scroll to content">
      <span>Scroll</span>
      <i aria-hidden="true" />
    </a>
  );
}
