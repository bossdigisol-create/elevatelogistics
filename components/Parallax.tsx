import type { CSSProperties, ReactNode } from "react";

/**
 * Full-bleed parallax band.
 * Uses `background-attachment: fixed` on desktop (md+) for the classic
 * parallax scroll, and a normal scrolling background on mobile where fixed
 * attachment is janky / often disabled. Pure CSS = smooth + no JS on the
 * scroll path.
 */
export default function Parallax({
  image,
  children,
  className = "",
  overlay = "var(--grad-hero-overlay)",
  minHeight = "clamp(360px, 60vh, 620px)",
}: {
  image: string;
  children?: ReactNode;
  className?: string;
  overlay?: string;
  minHeight?: string;
}) {
  const style: CSSProperties = {
    backgroundImage: `url(${image})`,
    minHeight,
  };
  const hasOverlay = overlay && overlay !== "none";
  return (
    <section
      className={`parallax relative isolate flex items-center overflow-hidden bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed ${className}`}
      style={style}
    >
      {hasOverlay && (
        <div className="absolute inset-0" style={{ backgroundImage: overlay }} />
      )}
      {children ? (
        <div className="relative mx-auto w-full max-w-[1240px] px-6">
          {children}
        </div>
      ) : null}
    </section>
  );
}
