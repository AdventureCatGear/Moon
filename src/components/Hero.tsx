"use client";

import { feedEntries } from "@/data/feed";
import { useEffect, useState } from "react";

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

      {/* Moon image sphere */}
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mb-8 animate-float">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, #e8e4d8 0%, #c4bfab 30%, #8a8474 60%, #4a4640 85%, #2a2825 100%)",
            boxShadow: "0 0 80px rgba(200, 195, 175, 0.3), 0 0 160px rgba(200, 195, 175, 0.1), inset -30px -20px 60px rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* Crater details */}
          <div className="absolute top-[20%] left-[25%] w-8 h-8 rounded-full bg-black/10" />
          <div className="absolute top-[40%] left-[45%] w-12 h-12 rounded-full bg-black/8" />
          <div className="absolute top-[60%] left-[30%] w-6 h-6 rounded-full bg-black/10" />
          <div className="absolute top-[30%] left-[60%] w-10 h-10 rounded-full bg-black/5" />
          <div className="absolute top-[55%] left-[55%] w-5 h-5 rounded-full bg-black/8" />
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
        <span className="text-amber font-semibold"> Starting at $58.</span>
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
            <span className="mr-2">{entry.ownerType === "human" ? "🧑" : "🤖"}</span>
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
