"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Entrance direction. Defaults to "up". */
  dir?: "up" | "left" | "right" | "scale";
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  dir = "up",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-dir={dir}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
