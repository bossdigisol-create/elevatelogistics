"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/site";

function useCountUp(target: number, run: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
}

function Stat({ value, suffix, run }: { value: number; suffix: string; run: boolean }) {
  const n = useCountUp(value, run);
  return (
    <span className="text-6xl font-extrabold tracking-tight md:text-7xl">
      {n}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid gap-10 md:grid-cols-3">
      {stats.map((s) => (
        <div key={s.title} className="text-center">
          <Stat value={s.value} suffix={s.suffix} run={run} />
          <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/80">
            {s.body}
          </p>
        </div>
      ))}
    </div>
  );
}
