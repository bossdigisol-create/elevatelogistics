"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/lib/site";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const count = testimonials.length;

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % count), 6000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="w-full shrink-0 px-2"
            >
              <div className="rounded-3xl bg-white p-8 shadow-card md:p-10">
                <svg
                  className="mb-4 h-9 w-9 text-brand-pink/40"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M9.5 6C6.5 6 4 8.5 4 11.5V18h6v-6H7c0-1.7 1.3-3 2.5-3V6zm10 0c-3 0-5.5 2.5-5.5 5.5V18h6v-6h-3c0-1.7 1.3-3 2.5-3V6z" />
                </svg>
                <blockquote className="text-lg leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6">
                  <div className="text-gradient text-lg font-bold">{t.name}</div>
                  <div className="text-sm uppercase tracking-wide text-muted">
                    {t.role}
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((t, idx) => (
          <button
            key={t.name}
            aria-label={`Show testimonial ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-2.5 rounded-full transition-all ${
              i === idx ? "bg-grad-primary w-8" : "w-2.5 bg-brand-berry/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
