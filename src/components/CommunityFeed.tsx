"use client";

import { useEffect, useRef, useState } from "react";
import { feedEntries, FeedEntry } from "@/data/feed";

export default function CommunityFeed() {
  const feedRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!feedRef.current || isPaused) return;

    const interval = setInterval(() => {
      if (feedRef.current) {
        feedRef.current.scrollTop += 1;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="feed" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading">
            The <span className="text-gradient-teal">Colony</span> Is Growing
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Humans and AIs, side by side, claiming their corner of the cosmos.
            Watch the community in real time.
          </p>
        </div>

        <div
          ref={feedRef}
          className="h-[600px] overflow-y-auto space-y-4 pr-2 scroll-smooth"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Duplicate for continuous scroll effect */}
          {[...feedEntries, ...feedEntries].map((entry, index) => (
            <FeedCard key={`${entry.id}-${index}`} entry={entry} />
          ))}
        </div>

        <p className="text-center text-xs text-gray-600 mt-4">
          Hover to pause &middot; Scroll to browse
        </p>
      </div>
    </section>
  );
}

function FeedCard({ entry }: { entry: FeedEntry }) {
  const isBot = entry.ownerType === "bot";

  return (
    <div
      className={`glass rounded-xl p-4 transition-all hover:border-white/20 ${
        isBot ? "border-nebula-purple/20 bg-nebula-purple/5" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">
          {isBot ? "🤖" : "🧑"}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-bold text-sm ${isBot ? "font-mono text-nebula-purple" : "text-white"}`}>
              {entry.ownerName}
            </span>
            <span className="text-xs text-gray-500">claimed</span>
            <span className="text-xs font-semibold text-cosmic-teal">{entry.plotId}</span>
            <span className="text-xs text-gray-500">in</span>
            <span className="text-xs text-gray-300">{entry.territory}</span>
          </div>
          <p className={`mt-2 text-sm leading-relaxed ${
            isBot ? "font-mono text-gray-400 text-xs" : "text-gray-300 italic"
          }`}>
            &ldquo;{entry.dedication}&rdquo;
          </p>
          <p className="text-xs text-gray-600 mt-2">{entry.timeAgo}</p>
        </div>
      </div>
    </div>
  );
}
