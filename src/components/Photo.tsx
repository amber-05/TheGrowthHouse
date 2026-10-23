/**
 * Photo slot. With `src` it renders a real image (drop files into /public/images).
 * Without `src` it renders a clearly-labelled placeholder, so no stock or
 * invented imagery is ever presented as authentic.
 */
export default function Photo({
  src,
  alt,
  label,
  caption,
  className = "",
  sizes,
  contain = false,
  position,
}: {
  /** CSS object-position for cropped photos. */
  position?: string;
  /** Show the image uncropped on a paper card (logos, graphics). */
  contain?: boolean;
  src?: string;
  alt: string;
  /** What the final photo should show; used in the placeholder. */
  label: string;
  caption?: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure className={className}>
      {src ? (
        <div className={`photo${contain ? " photo--contain" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" decoding="async" sizes={sizes} style={position ? { objectPosition: position } : undefined} />
        </div>
      ) : (
        <div className="photo photo--placeholder" role="img" aria-label={`Photo placeholder: ${label}`}>
          <span className="photo__tag">
            <b>Photo placeholder</b>
            {label}
          </span>
        </div>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
