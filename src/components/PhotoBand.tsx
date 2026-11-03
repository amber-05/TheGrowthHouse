import Photo from "./Photo";
import Reveal from "./Reveal";
import { PHOTOS, type PhotoSlot } from "@/config/photos";

/**
 * A row of real photographs under a short heading. Slots with no photo yet
 * are skipped, and the whole band is omitted when none are set, so the page
 * never shows placeholder art where credibility imagery is expected.
 */
export default function PhotoBand({
  eyebrow,
  title,
  slots,
}: {
  eyebrow: string;
  title: React.ReactNode;
  slots: PhotoSlot[];
}) {
  const ready = slots.filter((s) => PHOTOS[s].src);
  if (!ready.length) return null;
  return (
    <section className="section section--tight" aria-label={eyebrow}>
      <div className="container">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h-xl" style={{ margin: "1rem 0 2rem", maxWidth: "20ch" }}>{title}</h2>
          <div className="photoband">
            {ready.map((s) => (
              <Photo key={s} slot={s} sizes="(min-width: 960px) 25vw, 50vw" />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
