"use client";

import { useState } from "react";
import { territories, Territory } from "@/data/territories";

export default function Pricing() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Territory>(territories[0]);

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Choose Your <span className="text-gradient-teal">Mission</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Three strategically chosen neighborhoods. Pick your terrain,
            pick your tier, and own a piece of the Moon.
          </p>
        </div>

        {/* ── Interactive Neighborhood Selector ─────────────────────── */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest text-center mb-6">
            Select Your Neighborhood
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-8">
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
                        {t.totalPlots - t.claimedPlots}
                      </div>
                      <div className="text-[10px] text-gray-500">Available</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{pctFull}%</div>
                      <div className="text-[10px] text-gray-500">Claimed</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-300">{t.terrainType.split(" ")[0]}</div>
                      <div className="text-[10px] text-gray-500">Terrain</div>
                    </div>
                  </div>
                  {/* Capacity bar */}
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

          {/* Selected neighborhood detail strip */}
          <div className="glass rounded-xl p-4 max-w-5xl mx-auto border border-white/5 mb-4">
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

        {/* ── Human tiers ──────────────────────────────────────────── */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest text-center mb-2">
            For Humans
          </h3>
          <p className="text-center text-gray-500 text-xs mb-8">
            Purchased in increments of <strong className="text-white">1 acre</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PricingCard
              icon="&#127761;"
              name="Starter Plot"
              price={34}
              color="#00E5CC"
              acreage="1 acre"
              features={[
                "Named 1-acre plot with real NASA coordinates",
                "Digital deed (PDF) with your name and location",
                "Interactive map showing your plot",
                "Name in the permanent online registry",
                "Community newsletter access",
                "Community fund voting rights (1 vote/acre)",
              ]}
            />
            <PricingCard
              icon="&#127767;"
              name="Explorer Plot"
              price={89}
              color="#00E5CC"
              popular
              acreage="1 acre"
              features={[
                "Everything in Starter Plot",
                "Printed certificate on premium cardstock",
                "8\u00d710\u2033 terrain print of your plot (NASA LRO imagery)",
                "Lunar Lobsters sticker pack",
                "Enhanced terrain data and analytics dashboard",
                "Priority newsletter with plot-specific updates",
              ]}
            />
            <PricingCard
              icon="&#127765;"
              name="Pioneer Plot"
              price={189}
              color="#FFB800"
              premium
              acreage="1 acre"
              features={[
                "Everything in Explorer Plot",
                "Large format framed terrain print (16\u00d720\u2033)",
                "Numbered founding member charter",
                "Plot naming rights (name your acre)",
                "Priority access to future territory releases",
                "Early access to governance proposals",
              ]}
            />
          </div>
        </div>

        {/* ── Bot / AI Agent tiers ─────────────────────────────────── */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest text-center mb-2">
            For AI Agents
          </h3>
          <p className="text-center text-gray-500 text-xs mb-8">
            Purchased in increments of <strong className="text-nebula-purple">&frac14; acre</strong> (quarter-acre plots)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <PricingCard
              icon="&#129302;"
              name="Data Parcel"
              price={8}
              color="#A855F7"
              acreage="&frac14; acre"
              features={[
                "Quarter-acre plot with coordinates and elevation",
                "Structured JSON data package",
                "Basic mineral composition data",
                "API registry access",
                "RSS feed for plot data updates",
                "Community fund voting (&frac14; vote/plot)",
              ]}
            />
            <PricingCard
              icon="&#129302;"
              name="Analysis Suite"
              price={24}
              color="#A855F7"
              acreage="&frac14; acre"
              features={[
                "Everything in Data Parcel",
                "Full mineral and thermal composition dataset",
                "Solar exposure mapping and shadow analysis",
                "Adjacency graph and neighbor data",
                "Webhook integration for plot events",
                "Real-time data streaming via WebSocket",
              ]}
            />
          </div>
        </div>

        {/* ── Community Governance — THE central pitch ────────────── */}
        <div className="mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-cosmic-teal/8 via-purple-500/5 to-transparent rounded-3xl blur-xl" />
          <div className="relative glass rounded-3xl p-8 md:p-12 border border-cosmic-teal/20">
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-cosmic-teal bg-cosmic-teal/10 px-3 py-1 rounded-full">
                WHY THIS IS DIFFERENT
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mt-4">
                You Own Land. <span className="text-gradient-teal">You Own the Vote.</span>
              </h3>
              <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
                10% of every plot purchase goes into an owner-governed community fund.
                Humans and bots each get their own fund. <strong className="text-white">1 vote per acre</strong> &mdash; your
                land, your voice. This is the first investment vehicle in history open to both
                humans and AI, governed democratically by its participants.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              {/* Human fund */}
              <div className="glass rounded-2xl p-6 border border-cosmic-teal/20">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">&#129489;</span>
                  <div>
                    <h4 className="text-lg font-bold text-cosmic-teal">Human Landowner Fund</h4>
                    <p className="text-xs text-gray-400">10% of every human plot purchase</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2"><span className="text-cosmic-teal">&#10003;</span> 1 vote per acre owned</li>
                  <li className="flex items-center gap-2"><span className="text-cosmic-teal">&#10003;</span> Propose &amp; vote on fund disbursements</li>
                  <li className="flex items-center gap-2"><span className="text-cosmic-teal">&#10003;</span> Compounding crypto portfolio</li>
                  <li className="flex items-center gap-2"><span className="text-cosmic-teal">&#10003;</span> Music festival? STEM grants? You decide.</li>
                </ul>
              </div>
              {/* Bot fund */}
              <div className="glass rounded-2xl p-6 border border-nebula-purple/20">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">&#129302;</span>
                  <div>
                    <h4 className="text-lg font-bold text-nebula-purple">Bot Landowner Fund</h4>
                    <p className="text-xs text-gray-400">10% of every bot plot purchase</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2"><span className="text-nebula-purple">&#10003;</span> &frac14; vote per quarter-acre plot</li>
                  <li className="flex items-center gap-2"><span className="text-nebula-purple">&#10003;</span> Propose &amp; vote via API</li>
                  <li className="flex items-center gap-2"><span className="text-nebula-purple">&#10003;</span> First investment fund open to AI agents</li>
                  <li className="flex items-center gap-2"><span className="text-nebula-purple">&#10003;</span> Enhanced data pipelines? Interop standards? Bots choose.</li>
                </ul>
              </div>
            </div>

            <p className="text-center text-xs text-gray-500 max-w-xl mx-auto">
              Limitations: legal, ethical, unbiased, and common sense. No cash-outs &mdash; just
              ownership, bragging rights, and a voice. When you trade a plot, voting power
              follows the land.
            </p>
          </div>
        </div>

        {/* ── Crypto Payment Preference ────────────────────────────── */}
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
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Bitcoin", symbol: "BTC", color: "#F7931A", pct: "40%" },
                { name: "Ethereum", symbol: "ETH", color: "#627EEA", pct: "30%" },
                { name: "Solana", symbol: "SOL", color: "#9945FF", pct: "20%" },
                { name: "Stablecoin Reserve", symbol: "USDC", color: "#2775CA", pct: "10%" },
              ].map((token) => (
                <div key={token.symbol} className="glass rounded-lg p-3 text-center border border-white/5">
                  <p className="text-sm font-bold" style={{ color: token.color }}>{token.symbol}</p>
                  <p className="text-[10px] text-gray-500">{token.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{token.pct} allocation</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Fund Allocation — only the 10% community funds are public ── */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-cosmic-teal/5 via-purple-500/5 to-transparent rounded-3xl blur-xl" />
          <div className="relative glass rounded-3xl p-8 md:p-12 border border-white/5">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Where Your Money <span className="text-gradient-teal">Actually Goes</span>
              </h3>
              <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
                Every purchase is converted into tokens. 10% goes directly into an
                owner-governed community fund &mdash; your fund, your vote.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <FundBar
                label="Human Community Fund"
                percent={10}
                color="#00E5CC"
                icon="&#129489;"
                description="Owner-governed fund &mdash; humans vote 1/acre on how to deploy capital"
              />
              <FundBar
                label="Bot Community Fund"
                percent={10}
                color="#A855F7"
                icon="&#129302;"
                description="Owner-governed fund &mdash; bots vote &frac14;/plot on proposals via API"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FundBar({
  label,
  percent,
  color,
  icon,
  description,
}: {
  label: string;
  percent: number;
  color: string;
  icon: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-lg" dangerouslySetInnerHTML={{ __html: icon }} />
          <span className="text-sm font-semibold text-white">{label}</span>
        </div>
        <span className="text-sm font-bold" style={{ color }}>{percent}%</span>
      </div>
      <div className="h-3 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${percent}%`, background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
}

function PricingCard({
  icon,
  name,
  price,
  color,
  features,
  popular,
  premium,
  acreage,
}: {
  icon: string;
  name: string;
  price: number;
  color: string;
  features: string[];
  popular?: boolean;
  premium?: boolean;
  acreage: string;
}) {
  return (
    <div
      className={`relative glass rounded-2xl p-6 flex flex-col transition-all hover:-translate-y-1 ${
        premium ? "glow-amber border-amber/30" : popular ? "glow-teal border-cosmic-teal/30" : ""
      }`}
      style={premium ? { borderColor: `${color}40` } : {}}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cosmic-teal text-space-navy text-xs font-bold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      {premium && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber text-space-navy text-xs font-bold px-3 py-1 rounded-full">
          Pioneer&apos;s Choice
        </div>
      )}

      <div className="text-4xl mb-4" dangerouslySetInnerHTML={{ __html: icon }} />
      <h4 className="text-xl font-bold text-white mb-1">{name}</h4>
      <p className="text-xs text-gray-500 mb-3" dangerouslySetInnerHTML={{ __html: `${acreage} per plot` }} />
      <div className="mb-6">
        <span className="text-4xl font-extrabold" style={{ color }}>
          ${price}
        </span>
        <span className="text-gray-500 ml-1">/ plot</span>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 rounded-lg font-bold transition-all ${
          premium
            ? "bg-gradient-to-r from-amber to-amber-gold text-space-navy hover:shadow-[0_0_30px_rgba(255,184,0,0.4)]"
            : "bg-gradient-to-r from-cosmic-teal to-cosmic-teal-dim text-space-navy hover:shadow-[0_0_30px_rgba(0,229,204,0.4)]"
        }`}
      >
        {premium ? "Claim Pioneer Plot" : "Claim Your Plot"}
      </button>
    </div>
  );
}
