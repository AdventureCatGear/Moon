"use client";

import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

export default function KonamiEasterEgg() {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    let index = 0;

    const handler = (e: KeyboardEvent) => {
      if (e.code === KONAMI[index]) {
        index++;
        if (index === KONAMI.length) {
          setTriggered(true);
          index = 0;
          setTimeout(() => setTriggered(false), 5500);
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!triggered) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <div className="animate-lobster text-8xl" style={{ position: "absolute" }}>
        🦞🚀
      </div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <p className="text-4xl font-bold text-amber animate-pulse">
          LOBSTER MODE ACTIVATED
        </p>
        <p className="text-lg text-gray-400 mt-2">
          One small step for lobster...
        </p>
      </div>
    </div>
  );
}
