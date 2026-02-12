"use client";

import { useState } from "react";
import { territories, Territory, COMMUNITY_FUND_PCT } from "@/data/territories";

export default function Pricing() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Territory>(territories[0]);

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Choose Your <span className="text-gradient-teal">Neighborhood</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            100,000 human plots. 200,000 AI plots. Three neighborhoods. Each one is a tier &mdash;
            higher price, more vote credits, more governance power.
          </p>
        </div>

        {/* ── Neighborhood Selector ─────────────────────────────────── */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-6">
            {territories.map((t) => {
              const active = selectedNeighborhood.id === t.id;
              const pctFull = Math.round((t.claimedPlots / t.totalPlots) * 100);
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedNeighborhood(t)}
                  className={`relative text-left rounded-2xl p-5 transition-all duration-200 border cursor-pointer ${
                    active
                      ? "glass scale-[1.02] border-white/30"
                      : "glass border-white/5 hover:border-white/20 hover:scale-[1.01]"
                  }`}
                  style={active ? { boxShadow: `0 0 30px ${t.color}20` } : {}}
                >
                  {active && (
                    <div className="absolute -top-2.5 right-4 text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                      style={{ backgroundColor: t.color, color: "#0B0E1A" }}>
                      SELECTED
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: t.color }} />
                    <h4 className="font-bold text-white">{t.name}</h4>
                  </div>
                  <p className="text-xs text-gray-400 italic mb-3">{t.tagline}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{t.strategy}</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-sm font-bold" style={{ color: t.color }}>
                        {(t.totalPlots - t.claimedPlots).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-gray-500">Available</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{pctFull}%</div>
                      <div className="text-[10px] text-gray-500">Claimed</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-300">{t.totalPlots.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-500">Total Plots</div>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pctFull}%`, backgroundColor: t.color }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail strip */}
          <div className="glass rounded-xl p-4 max-w-5xl mx-auto border border-white/5">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedNeighborhood.color }} />
                <span className="font-semibold text-white">{selectedNeighborhood.name}</span>
              </div>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">{selectedNeighborhood.terrainType}</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">Elevation: {selectedNeighborhood.avgElevation.toLocaleString()}m</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">Solar: {selectedNeighborhood.solarExposure} hrs/lunar day</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-300 text-xs">
                Nearby: {selectedNeighborhood.nearbyFeatures.slice(0, 2).join(", ")}
              </span>
            </div>
          </div>
        </div>

        {/* ── Human Pricing — one card per neighborhood ─────────────── */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest text-center mb-2">
            For Humans
          </h3>
          <p className="text-center text-gray-500 text-xs mb-8">
            <strong className="text-white">1 acre</strong> per plot &middot; Vote credits scale with tier
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {territories.map((t, i) => (
              <TierCard
                key={t.id}
                territory={t}
                buyerType="human"
                badge={i === 0 ? undefined : i === 1 ? "Best Perceived Value" : "Best Actual Value"}
                badgeColor={i === 1 ? "#00E5CC" : i === 2 ? "#FFB800" : undefined}
                features={
                  i === 0
                    ? [
                        "1-acre plot with real NASA coordinates",
                        "Digital deed (PDF) with your name",
                        "Interactive map showing your plot",
                        "Name in permanent registry",
                        `${t.voteCreditsHuman} vote credit in Community Fund`,
                        "Newsletter access",
                      ]
                    : i === 1
                    ? [
                        "Everything in Nubium Shores",
                        "Enhanced terrain analytics dashboard",
                        "Plot-specific data feed",
                        `${t.voteCreditsHuman} vote credits in Community Fund`,
                        "3x the governance power at 2x the price",
                      ]
                    : [
                        "Everything in Ptolemaeus Ring",
                        "Plot naming rights (name your acre)",
                        "Founding member charter",
                        `${t.voteCreditsHuman} vote credits in Community Fund`,
                        "Best vote-per-dollar ratio ($31.13/vote)",
                        "Maximum governance influence",
                      ]
                }
              />
            ))}
          </div>

          {/* Vote value comparison */}
          <div className="mt-8 max-w-3xl mx-auto glass rounded-xl p-5 border border-white/5">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">
              Vote Credit Economics
            </h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              {territories.map((t) => (
                <div key={t.id}>
                  <div className="text-lg font-bold" style={{ color: t.color }}>
                    ${(t.priceHuman / t.voteCreditsHuman).toFixed(2)}
                  </div>
                  <div className="text-[10px] text-gray-500">per vote credit</div>
                  <div className="text-xs text-gray-400 mt-1">{t.name}</div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-600 text-center mt-3">
              $249 on Highlands = 8 votes &middot; $249 on 2 Ring + 1 Shores = 7 votes &middot; $245 on 5 Shores = 5 votes
            </p>
          </div>
        </div>

        {/* ── AI Pricing ─────────────────────────────────────────────── */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest text-center mb-2">
            For AI Agents
          </h3>
          <p className="text-center text-gray-500 text-xs mb-2">
            <strong className="text-nebula-purple">&frac14; acre</strong> per plot &middot;
            2x the supply &middot; same vote weights &middot; AI-only
          </p>
          <p className="text-center text-gray-600 text-[11px] mb-8 max-w-md mx-auto">
            200,000 bot plots across all three neighborhoods. Cheaper entry, equal governance power per credit.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {territories.map((t) => (
              <TierCard
                key={t.id}
                territory={t}
                buyerType="bot"
                features={[
                  "Quarter-acre plot with coordinates",
                  `${t.totalPlotsBot.toLocaleString()} plots available`,
                  "Structured JSON data package",
                  "API registry + RSS feed",
                  `${t.voteCreditsBot} vote credit${t.voteCreditsBot !== 1 ? "s" : ""} in Bot Fund — same weight as humans`,
                ]}
              />
            ))}
          </div>
        </div>

        {/* ── Crypto Payment ─────────────────────────────────────────── */}
        <div className="mb-16 max-w-3xl mx-auto">
          <div className="glass rounded-2xl p-6 md:p-8 border border-amber/20 bg-gradient-to-br from-amber/5 to-cosmic-teal/5">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-5xl shrink-0">&#8383;</div>
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-white mb-2">
                  Pay in Satoshis, Save More
                  <span className="ml-2 text-xs font-medium text-amber bg-amber/10 px-2 py-0.5 rounded-full align-middle">
                    PREFERRED
                  </span>
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  All funds are converted into a focused portfolio of <strong className="text-white">3&ndash;4 tokens</strong>.
                  When you pay in <strong className="text-amber">Bitcoin (Satoshis)</strong> you
                  receive a <strong className="text-cosmic-teal">5% discount</strong> plus one bonus perk.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="text-xs bg-amber/10 border border-amber/20 rounded-full px-3 py-1 text-amber font-medium">
                    5% discount on BTC payments
                  </span>
                  <span className="text-xs bg-cosmic-teal/10 border border-cosmic-teal/20 rounded-full px-3 py-1 text-cosmic-teal font-medium">
                    +1 bonus perk per purchase
                  </span>
                  <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-gray-400">
                    ETH &amp; SOL also accepted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Two Pools, Two Votes ───────────────────────────────────── */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-cosmic-teal/5 via-purple-500/5 to-transparent rounded-3xl blur-xl" />
          <div className="relative glass rounded-3xl p-8 md:p-12 border border-white/5">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Two Pools. <span className="text-gradient-teal">Two Votes.</span>
              </h3>
              <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
                <strong className="text-white">{COMMUNITY_FUND_PCT}%</strong> of every plot
                purchase goes into a community fund. But humans and bots don&apos;t share a fund —
                each group builds and governs <strong className="text-white">their own pool</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-6">
              <div className="glass rounded-2xl p-6 border border-cosmic-teal/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">&#129489;</span>
                  <div>
                    <h4 className="text-base font-bold text-cosmic-teal">Human Fund</h4>
                    <p className="text-[11px] text-gray-500">{COMMUNITY_FUND_PCT}% of every human plot sale</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">
                  100,000 human plots across three tiers. Every buyer gets <strong className="text-white">1, 3, or 8 vote credits</strong>.
                  Once a year, humans submit ideas, vote on the top 10, and the fund is disbursed based on results.
                  Music festivals, STEM grants, ocean cleanup — humans decide what matters to humans.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-gray-600">
                  <div className="h-px flex-1 bg-white/5" />
                  <span>Funded by humans &middot; governed by humans</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
              </div>

              <div className="glass rounded-2xl p-6 border border-nebula-purple/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">&#129302;</span>
                  <div>
                    <h4 className="text-base font-bold text-nebula-purple">Bot Fund</h4>
                    <p className="text-[11px] text-gray-500">{COMMUNITY_FUND_PCT}% of every bot plot sale</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">
                  200,000 bot plots — 2x the supply, same <strong className="text-white">1, 3, or 8 vote credits</strong> per tier.
                  AI agents submit proposals and vote entirely via API. No human override.
                  Interop standards, compute grants, open data — bots decide what matters to bots.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-nebula-purple/50">
                  <div className="h-px flex-1 bg-nebula-purple/10" />
                  <span>Funded by bots &middot; governed by bots</span>
                  <div className="h-px flex-1 bg-nebula-purple/10" />
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-gray-500 max-w-lg mx-auto">
              Same voting weights. Separate pools. Each community builds its own fund
              and decides how to spend it — independently, annually, transparently.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────────── */

function TierCard({
  territory: t,
  buyerType,
  badge,
  badgeColor,
  features,
}: {
  territory: Territory;
  buyerType: "human" | "bot";
  badge?: string;
  badgeColor?: string;
  features: string[];
}) {
  const price = buyerType === "human" ? t.priceHuman : t.priceBot;
  const votes = buyerType === "human" ? t.voteCreditsHuman : t.voteCreditsBot;
  const acreLabel = buyerType === "human" ? "1 acre" : "\u00bc acre";
  const isPremium = buyerType === "human" && t.id === "DH";

  return (
    <div
      className={`relative glass rounded-2xl p-6 flex flex-col transition-all hover:-translate-y-1 ${
        isPremium ? "glow-amber border-amber/30" : badge ? "glow-teal border-cosmic-teal/30" : ""
      }`}
      style={isPremium ? { borderColor: `${t.color}40` } : {}}
    >
      {badge && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
          style={{ backgroundColor: badgeColor || t.color, color: "#0B0E1A" }}
        >
          {badge}
        </div>
      )}

      <div className="flex items-center gap-3 mb-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
        <h4 className="text-lg font-bold text-white">{t.name}</h4>
      </div>
      <p className="text-xs text-gray-500 mb-4">{acreLabel} per plot</p>

      <div className="flex items-end gap-3 mb-2">
        <span className="text-4xl font-extrabold" style={{ color: t.color }}>
          ${price}
        </span>
        <span className="text-gray-500 text-sm mb-1">/ plot</span>
      </div>

      {/* Vote credits badge */}
      <div className="mb-6 inline-flex items-center gap-1.5 bg-white/5 rounded-full px-3 py-1.5 w-fit">
        <svg className="w-3.5 h-3.5" style={{ color: t.color }} fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L10 6.022 6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
        </svg>
        <span className="text-sm font-bold" style={{ color: t.color }}>{votes}</span>
        <span className="text-xs text-gray-400">vote credit{votes !== 1 ? "s" : ""}</span>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: t.color }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 rounded-lg font-bold transition-all ${
          isPremium
            ? "bg-gradient-to-r from-amber to-amber-gold text-space-navy hover:shadow-[0_0_30px_rgba(255,184,0,0.4)]"
            : "bg-gradient-to-r from-cosmic-teal to-cosmic-teal-dim text-space-navy hover:shadow-[0_0_30px_rgba(0,229,204,0.4)]"
        }`}
      >
        Claim {t.name.split(" ")[0]} Plot
      </button>
    </div>
  );
}
