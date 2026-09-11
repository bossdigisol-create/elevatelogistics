"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/**
 * Hero background video.
 *
 * The source is H.264 inside a QuickTime (.mov) wrapper. Because .mov and .mp4
 * share the ISO-BMFF box structure, it is served as .mp4 (with its `ftyp` brand
 * relabeled to mp42/isom) so browsers decode it through the MP4 pipeline — no
 * re-encode needed.
 *
 * Performance: a full-screen autoplaying `object-cover` video is the single
 * biggest cause of scroll jank / battery drain on phones (continuous decode +
 * compositing of a large surface, plus a multi-MB download competing with the
 * rest of the page). So on small screens — and whenever the visitor prefers
 * reduced motion, is on a data-saver/slow connection — we render ONLY the
 * static poster image and never mount the video at all. The video is loaded
 * lazily on tablet/desktop (≥768px), where `muted + playsInline` autoplay works
 * and a `canplay`/gesture/visibility retry keeps it reliably playing.
 */
export default function HeroVideo({
  src = site.heroVideo,
  poster = site.heroPoster,
  className = "absolute inset-0 h-full w-full object-cover",
}: {
  src?: string;
  poster?: string;
  className?: string;
} = {}) {
  const ref = useRef<HTMLVideoElement>(null);
  // Start false so SSR + mobile render the cheap static poster. Flipped to true
  // on mount only when the device can comfortably play a background video.
  const [showVideo, setShowVideo] = useState(false);

  // Decide whether to load the video (desktop/tablet, motion allowed, not on a
  // metered/slow link). Re-checked when the viewport crosses the breakpoint.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const wide = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;

    const evaluate = () => {
      const saveData = conn?.saveData === true;
      const slow = /(^|-)(2g|slow-2g)$/.test(conn?.effectiveType ?? "");
      setShowVideo(wide.matches && !reduce.matches && !saveData && !slow);
    };

    evaluate();
    wide.addEventListener("change", evaluate);
    reduce.addEventListener("change", evaluate);
    return () => {
      wide.removeEventListener("change", evaluate);
      reduce.removeEventListener("change", evaluate);
    };
  }, []);

  // Autoplay resilience — only active while the video is actually mounted.
  useEffect(() => {
    if (!showVideo) return;
    const v = ref.current;
    if (!v) return;

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    tryPlay();
    v.addEventListener("canplay", tryPlay);
    v.addEventListener("loadeddata", tryPlay);

    // Fallback for browsers that block autoplay until the first interaction.
    const onGesture = () => tryPlay();
    const opts = { once: true, passive: true } as const;
    window.addEventListener("pointerdown", onGesture, opts);
    window.addEventListener("touchstart", onGesture, opts);
    window.addEventListener("scroll", onGesture, opts);

    // Resume if the tab is backgrounded then refocused.
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("loadeddata", tryPlay);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("scroll", onGesture);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [showVideo]);

  // Mobile / reduced-motion / metered: static poster only. No decode, no loop.
  if (!showVideo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt="" aria-hidden="true" className={className} />;
  }

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
