"use client";

import { feedEntries } from "@/data/feed";
import { useEffect, useState } from "react";

function LobsterSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 260"
      className={className}
      fill="currentColor"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left antenna */}
      <path
        d="M92,68 Q72,38 40,8"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Right antenna */}
      <path
        d="M108,68 Q128,38 160,8"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Left claw — arm + pincer */}
      <path
        d="M76,78 C58,60 42,48 28,35
           C18,26 8,30 12,40
           C16,50 28,50 35,45
           C42,52 58,62 72,76 Z"
        stroke="none"
      />
      {/* Left pincer tip */}
      <path
        d="M28,35 C20,24 10,18 6,24
           C2,30 10,34 16,34
           C20,34 24,36 28,35 Z"
        stroke="none"
      />

      {/* Right claw — arm + pincer (mirrored) */}
      <path
        d="M124,78 C142,60 158,48 172,35
           C182,26 192,30 188,40
           C184,50 172,50 165,45
           C158,52 142,62 128,76 Z"
        stroke="none"
      />
      {/* Right pincer tip */}
      <path
        d="M172,35 C180,24 190,18 194,24
           C198,30 190,34 184,34
           C180,34 176,36 172,35 Z"
        stroke="none"
      />

      {/* Body segments — head to tail */}
      <ellipse cx="100" cy="80" rx="24" ry="18" stroke="none" />
      <ellipse cx="100" cy="102" rx="21" ry="13" stroke="none" />
      <ellipse cx="100" cy="120" rx="19" ry="11" stroke="none" />
      <ellipse cx="100" cy="137" rx="17" ry="10" stroke="none" />
      <ellipse cx="100" cy="152" rx="15" ry="9" stroke="none" />
      <ellipse cx="100" cy="166" rx="13" ry="8" stroke="none" />

      {/* Tail fan — three fins */}
      <ellipse cx="80" cy="186" rx="14" ry="7" transform="rotate(-25 80 186)" stroke="none" />
      <ellipse cx="100" cy="190" rx="12" ry="8" stroke="none" />
      <ellipse cx="120" cy="186" rx="14" ry="7" transform="rotate(25 120 186)" stroke="none" />
      {/* Tail connector */}
      <ellipse cx="100" cy="178" rx="11" ry="7" stroke="none" />

      {/* Legs — left side */}
      <path d="M78,100 L56,90" fill="none" strokeWidth="3" strokeLinecap="round" />
      <path d="M80,118 L56,112" fill="none" strokeWidth="3" strokeLinecap="round" />
      <path d="M82,136 L58,132" fill="none" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M84,152 L62,150" fill="none" strokeWidth="2" strokeLinecap="round" />

      {/* Legs — right side */}
      <path d="M122,100 L144,90" fill="none" strokeWidth="3" strokeLinecap="round" />
      <path d="M120,118 L144,112" fill="none" strokeWidth="3" strokeLinecap="round" />
      <path d="M118,136 L142,132" fill="none" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M116,152 L138,150" fill="none" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Hero() {
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((i) => (i + 1) % feedEntries.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const entry = feedEntries[tickerIndex];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Moon glow behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-gray-400/10 via-transparent to-transparent pointer-events-none" />

      {/* ── Logo lockup: wordmark + moon/lobster icon ── */}
      <div className="flex flex-col items-center mb-8 animate-float">
        {/* Wordmark above the moon */}
        <div className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.25em] uppercase text-center mb-5 select-none">
          <span className="text-gradient-teal">Lunar</span>{" "}
          <span className="text-white">Lobsters</span>
        </div>

        {/* Moon sphere with lobster overlay */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
          {/* Moon */}
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, #e8e4d8 0%, #c4bfab 30%, #8a8474 60%, #4a4640 85%, #2a2825 100%)",
              boxShadow:
                "0 0 80px rgba(200, 195, 175, 0.3), 0 0 160px rgba(200, 195, 175, 0.1), inset -30px -20px 60px rgba(0, 0, 0, 0.6)",
            }}
          >
            {/* Crater details */}
            <div className="absolute top-[20%] left-[25%] w-8 h-8 rounded-full bg-black/10" />
            <div className="absolute top-[40%] left-[45%] w-12 h-12 rounded-full bg-black/8" />
            <div className="absolute top-[60%] left-[30%] w-6 h-6 rounded-full bg-black/10" />
            <div className="absolute top-[30%] left-[60%] w-10 h-10 rounded-full bg-black/5" />
            <div className="absolute top-[55%] left-[55%] w-5 h-5 rounded-full bg-black/8" />
          </div>

          {/* Lobster silhouette overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <LobsterSilhouette
              className="w-[58%] h-[58%] text-[#00E5CC] opacity-80 drop-shadow-[0_0_12px_rgba(0,229,204,0.5)]"
            />
          </div>
        </div>
      </div>

      {/* Headlines */}
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-center leading-[0.9]">
        <span className="block">MOON FRONT</span>
        <span className="block text-gradient-teal">PROPERTY</span>
      </h1>
      <p className="mt-2 text-2xl sm:text-3xl md:text-4xl font-light text-gray-400 tracking-wide">
        Now Available.
      </p>

      <p className="mt-6 max-w-2xl text-center text-gray-300 text-base sm:text-lg leading-relaxed">
        Claim your own acre on the lunar surface. Real NASA coordinates.
        Real terrain data. Spectacularly unreal ownership rights.
        <span className="text-amber font-semibold"> Starting at $34.</span>
      </p>

      {/* CTAs */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <a href="#globe" className="btn-primary text-lg">
          Explore the Moon
        </a>
        <a href="#pricing" className="btn-secondary text-lg">
          Claim Your Plot
        </a>
      </div>

      {/* Live ticker */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center px-4">
        <div className="glass rounded-full px-6 py-3 max-w-xl w-full text-center">
          <div key={tickerIndex} className="animate-slide-in text-sm text-gray-300 truncate">
            <span className="mr-2">{entry.ownerType === "human" ? "\ud83e\uddd1" : "\ud83e\udd16"}</span>
            <span className="font-semibold text-white">{entry.ownerName}</span>
            {" "}claimed {entry.plotId} in{" "}
            <span className="text-cosmic-teal">{entry.territory}</span>
            {" "}&middot; {entry.timeAgo}
          </div>
        </div>
      </div>
    </section>
  );
}
