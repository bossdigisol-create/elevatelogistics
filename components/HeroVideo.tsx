"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

/**
 * Hero background video.
 *
 * The source is H.264 inside a QuickTime (.mov) wrapper. Because .mov and .mp4
 * share the ISO-BMFF box structure, it is served as .mp4 (with its `ftyp` brand
 * relabeled to mp42/isom) so browsers decode it through the MP4 pipeline — no
 * re-encode needed. This wrapper then guarantees playback: muted + playsInline
 * autoplay covers most browsers, and a canplay retry plus a one-time
 * user-gesture fallback covers mobile/low-power modes that withhold autoplay.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={site.heroPoster}
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={site.heroVideo} type="video/mp4" />
    </video>
  );
}
