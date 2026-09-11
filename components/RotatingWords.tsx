"use client";

import { useEffect, useState } from "react";

export default function RotatingWords({
  words,
  interval = 2800,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span key={i} className="text-gradient inline-block animate-[fade-up_0.6s_ease]">
        {words[i]}
      </span>
    </span>
  );
}
