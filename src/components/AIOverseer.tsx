"use client";

import { useState } from "react";
import {
  OVERSEER,
  capabilities,
  llmProviders,
  CAPABILITY_CATEGORIES,
} from "@/data/overseer";

type Category = keyof typeof CAPABILITY_CATEGORIES;

export default function AIOverseer() {
  const [activeCategory, setActiveCategory] = useState<Category>("governance");
  const filtered = capabilities.filter((c) => c.category === activeCategory);
  const cat = CAPABILITY_CATEGORIES[activeCategory];

  return (
    <section id="overseer" className="relative py-24 px-4 overflow-hidden">
      {/* ── Background ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-explorer-orange/6 blur-[180px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-nebula-purple/5 blur-[120px]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-explorer-orange/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-nebula-purple/30 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* ── Headline ─────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-explorer-orange/60" />
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-explorer-orange uppercase">
                {OVERSEER.name} v{OVERSEER.version} — Online
              </span>
            </div>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-explorer-orange/60" />
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-4">
            Meet <span className="text-gradient-amber">{OVERSEER.name}</span>
          </h2>
          <p className="text-lg text-gray-500 font-mono mb-6">{OVERSEER.fullName}</p>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {OVERSEER.name} is the autonomous AI that runs Lunar Lobsters alongside its
            human founder. It curates every annual vote, moderates the community,
            manages the bot ecosystem, and monitors space law developments.
            Not a chatbot — an <strong className="text-white">agent with real responsibilities</strong>.
          </p>
        </div>

        {/* ── Identity Card ────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="glass-strong rounded-2xl p-6 border border-explorer-orange/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-explorer-orange/10 border border-explorer-orange/20 flex items-center justify-center text-3xl font-mono font-extrabold text-explorer-orange">
                🦞
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">{OVERSEER.name}</h3>
                <p className="text-xs text-gray-500 font-mono">{OVERSEER.role} &middot; {OVERSEER.fullName}</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-green-400">ACTIVE</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {OVERSEER.description}
            </p>
          </div>
        </div>

        {/* ── Capabilities — tabbed by category ────────────────────── */}
        <div className="mb-20">
          <h3 className="text-center text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-8">
            What {OVERSEER.name} Does
          </h3>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {(Object.keys(CAPABILITY_CATEGORIES) as Category[]).map((key) => {
              const c = CAPABILITY_CATEGORIES[key];
              const isActive = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                    isActive
                      ? "text-space-navy scale-105"
                      : "text-gray-400 border-white/10 hover:border-white/20"
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: c.color, borderColor: c.color }
                      : {}
                  }
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Category description */}
          <p className="text-center text-sm text-gray-500 mb-8">{cat.description}</p>

          {/* Capability cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {filtered.map((cap) => (
              <div key={cap.id} className="group relative">
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${cat.color}20, transparent)` }}
                />
                <div
                  className="relative glass rounded-2xl p-5 border transition-colors duration-300 h-full"
                  style={{ borderColor: `${cat.color}15` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{cap.icon}</span>
                    <h4 className="text-sm font-bold text-white">{cap.name}</h4>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">
                    {cap.description}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border"
                      style={{
                        color: cap.llmTier === "fast" ? "#FF6B35" : cap.llmTier === "reasoning" ? "#4285F4" : "#FF7000",
                        borderColor: `${cap.llmTier === "fast" ? "#FF6B35" : cap.llmTier === "reasoning" ? "#4285F4" : "#FF7000"}40`,
                        backgroundColor: `${cap.llmTier === "fast" ? "#FF6B35" : cap.llmTier === "reasoning" ? "#4285F4" : "#FF7000"}10`,
                      }}
                    >
                      {cap.llmTier.toUpperCase()}
                    </span>
                    <span className="text-[9px] text-gray-600">inference tier</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── LLM Routing Layer ────────────────────────────────────── */}
        <div className="mb-16">
          <h3 className="text-center text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">
            Multi-Model Routing
          </h3>
          <p className="text-center text-xs text-gray-600 mb-8 max-w-md mx-auto">
            {OVERSEER.name} distributes work across free LLM APIs based on task
            complexity. No single point of failure. Near-zero inference cost.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {llmProviders.map((p) => (
              <div key={p.name} className="glass rounded-xl p-5 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <h4 className="text-sm font-bold text-white">{p.name}</h4>
                </div>
                <div className="space-y-2 mb-3">
                  {p.models.map((m) => (
                    <span key={m} className="block text-[10px] font-mono text-gray-500">{m}</span>
                  ))}
                </div>
                <div
                  className="text-[9px] font-bold font-mono px-2 py-0.5 rounded-full w-fit mb-3"
                  style={{ color: p.color, backgroundColor: `${p.color}15`, border: `1px solid ${p.color}30` }}
                >
                  {p.tier.toUpperCase()} TIER
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed mb-2">{p.role}</p>
                <div className="flex items-center gap-1.5 text-[9px] text-gray-600">
                  <span className="font-mono font-bold" style={{ color: p.color }}>{p.freeLimit}</span>
                  <span>free</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Transparency Statement ───────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="glass-strong rounded-2xl px-8 py-6 border border-white/10">
            <h4 className="text-sm font-bold text-white mb-2">
              Transparent by Design
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every decision {OVERSEER.name} makes is logged, explainable, and auditable.
              When it curates the annual vote, it publishes its full reasoning.
              When it flags a moderation issue, it cites the policy. When it generates
              a fund report, the data sources are linked. The founder can override any
              decision — but {OVERSEER.name}&apos;s logic is always visible to the community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
