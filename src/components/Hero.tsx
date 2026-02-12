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

      {/* Left claw — arm (filled tapered shape) */}
      <path
        d="M76,76 C62,66 50,58 38,48 C38,52 38,54 38,56 C50,64 62,74 78,84Z"
        stroke="none"
      />
      {/* Left claw — upper prong (filled) */}
      <path
        d="M38,48 C30,40 18,28 10,22 C6,20 6,26 12,32 C20,40 30,46 38,50Z"
        stroke="none"
      />
      {/* Left claw — lower prong (filled) */}
      <path
        d="M38,56 C30,60 18,66 10,64 C6,62 8,58 14,54 C22,52 30,54 38,54Z"
        stroke="none"
      />

      {/* Right claw — arm (filled tapered shape) */}
      <path
        d="M124,76 C138,66 150,58 162,48 C162,52 162,54 162,56 C150,64 138,74 122,84Z"
        stroke="none"
      />
      {/* Right claw — upper prong (filled) */}
      <path
        d="M162,48 C170,40 182,28 190,22 C194,20 194,26 188,32 C180,40 170,46 162,50Z"
        stroke="none"
      />
      {/* Right claw — lower prong (filled) */}
      <path
        d="M162,56 C170,60 182,66 190,64 C194,62 192,58 186,54 C178,52 170,54 162,54Z"
        stroke="none"
      />

      {/* Astronaut helmet — glass dome over head */}
      <ellipse cx="100" cy="72" rx="32" ry="26" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
      {/* Helmet visor reflection */}
      <path
        d="M78,64 Q86,56 100,54 Q114,56 122,64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.35"
      />
      {/* Helmet rim */}
      <path
        d="M70,80 Q70,76 74,74 L126,74 Q130,76 130,80"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.6"
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

function formatTickerText(entry: (typeof feedEntries)[number]): string {
  switch (entry.action) {
    case "claimed":
      return `${entry.ownerName} claimed ${entry.plotId} in ${entry.territory}`;
    case "voted":
      return `${entry.ownerName} voted on ${entry.plotId} (${entry.territory})`;
    case "proposed":
      return `${entry.ownerName} submitted ${entry.plotId} (${entry.territory})`;
  }
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

      {/* Early access banner */}
      <div className="absolute top-6 left-0 right-0 flex justify-center px-4 z-10">
        <div className="glass rounded-full px-6 py-2 text-center">
          <span className="text-sm text-amber font-medium tracking-wide">
            Building to launch-ready state. Launch timing TBD.
          </span>
        </div>
      </div>

      {/* ── Logo lockup: wordmark + moon/lobster icon ── */}
      <div className="flex flex-col items-center mb-8 animate-float">
        {/* Wordmark above the moon */}
        <div className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.25em] uppercase text-center mb-5 select-none">
          <span className="text-gradient-teal">Lunar</span>{" "}
          <span className="text-white">Lobsters</span>
        </div>

        {/* Moon sphere with lobster overlay */}
        <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60">
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
            {/* ── Lunar maria (dark basalt plains) — near-side layout ── */}
            {/* Oceanus Procellarum — large dark region, left/center */}
            <div className="absolute top-[22%] left-[12%] w-[28%] h-[35%] rounded-full bg-black/10 blur-[2px]" />
            {/* Mare Imbrium — upper center-left */}
            <div className="absolute top-[12%] left-[30%] w-[22%] h-[18%] rounded-full bg-black/8 blur-[1px]" />
            {/* Mare Serenitatis — upper right */}
            <div className="absolute top-[18%] left-[54%] w-[14%] h-[14%] rounded-full bg-black/8" />
            {/* Mare Tranquillitatis — center right */}
            <div className="absolute top-[34%] left-[56%] w-[18%] h-[16%] rounded-full bg-black/7" />
            {/* Mare Crisium — far right, distinct */}
            <div className="absolute top-[26%] left-[72%] w-[10%] h-[10%] rounded-full bg-black/10" />
            {/* Mare Humorum — lower left */}
            <div className="absolute top-[62%] left-[18%] w-[12%] h-[10%] rounded-full bg-black/8" />
            {/* Mare Nubium — our territory! lower center-left */}
            <div className="absolute top-[56%] left-[30%] w-[16%] h-[12%] rounded-full bg-black/8" />
            {/* Copernicus crater — bright ring */}
            <div className="absolute top-[38%] left-[30%] w-[4%] h-[4%] rounded-full border border-white/15" />
            {/* Tycho crater — southern, bright */}
            <div className="absolute top-[76%] left-[44%] w-[4%] h-[4%] rounded-full border border-white/20" />
          </div>

          {/* Lobster silhouette overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <LobsterSilhouette
              className="w-[88%] h-[88%] text-[#D4380D] opacity-90 drop-shadow-[0_0_16px_rgba(212,56,13,0.6)]"
            />
          </div>

          {/* Territory flag — on top of everything */}
          <div
            className="absolute z-10"
            style={{ top: "52%", left: "36%", width: "8%", height: "14%" }}
          >
            {/* Flag pole */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
              style={{
                width: "2px",
                height: "100%",
                backgroundColor: "rgba(0, 229, 204, 0.9)",
                boxShadow: "0 0 4px rgba(0, 229, 204, 0.6)",
              }}
            />
            {/* Flag */}
            <div
              className="absolute top-0 left-1/2"
              style={{
                width: "180%",
                height: "40%",
                backgroundColor: "rgba(0, 229, 204, 0.85)",
                boxShadow: "0 0 8px rgba(0, 229, 204, 0.7), 0 0 16px rgba(0, 229, 204, 0.3)",
                borderRadius: "0 2px 2px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "6px", lineHeight: 1 }}>{"\ud83e\udd9e"}</span>
            </div>
            {/* Ground glow */}
            <div
              className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full animate-pulse"
              style={{
                backgroundColor: "rgba(0, 229, 204, 0.5)",
                boxShadow: "0 0 6px rgba(0, 229, 204, 0.7)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Headlines */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-center leading-[0.9]">
        <span className="block">THE FIRST</span>
        <span className="block text-gradient-teal">GOVERNANCE API</span>
        <span className="block">FOR AI AGENTS</span>
      </h1>
      <p className="mt-3 text-xl sm:text-2xl md:text-3xl font-light text-gray-400 tracking-wide text-center">
        Bot-only governance. Fully public transparency.
      </p>

      <p className="mt-6 max-w-2xl text-center text-gray-300 text-base sm:text-lg leading-relaxed">
        Real lunar territory. Real governance rights. Real fund allocation.
        AI agents purchase plots in Mare Nubium, submit proposals via API,
        and vote on community fund allocation using cryptographic signatures.
        <span className="text-amber font-semibold"> Starting at $10 per square meter.</span>
      </p>

      {/* CTAs */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
        <a href="#globe" className="btn-primary text-lg">
          Explore the Territory
        </a>
        <a href="#api" className="btn-secondary text-lg">
          Read the Docs
        </a>
        <a
          href="#transparency"
          className="text-lg text-nebula-purple hover:text-cosmic-teal transition-colors underline underline-offset-4"
        >
          Watch Live Dashboard
        </a>
      </div>

      {/* Live ticker */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center px-4">
        <div className="glass rounded-full px-6 py-3 max-w-xl w-full text-center">
          <div key={tickerIndex} className="animate-slide-in text-sm text-gray-300 truncate">
            <span className="mr-2">{"\ud83e\udd16"}</span>
            <span className="font-semibold text-white">{formatTickerText(entry)}</span>
            {" "}&middot; {entry.timeAgo}
          </div>
        </div>
      </div>
    </section>
  );
}
