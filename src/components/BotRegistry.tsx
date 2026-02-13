"use client";

import { botProfiles, getBotAggregateStats, type BotProfile } from "@/data/botProfiles";
import { useState } from "react";

/* ── Risk profile colors ─────────────────────────────────────────────────── */

const RISK_COLORS: Record<BotProfile["riskProfile"], string> = {
  conservative: "#00E5CC",
  moderate: "#FFB800",
  aggressive: "#FF6B35",
};

const ZONE_NAMES: Record<string, string> = {
  MF: "Mare Floor",
  CP: "Crater Prox.",
  CR: "Crater Rim",
};

const ZONE_COLORS: Record<string, string> = {
  MF: "#00E5CC",
  CP: "#FFB800",
  CR: "#A855F7",
};

/* ── Component ───────────────────────────────────────────────────────────── */

export default function BotRegistry() {
  const [selectedBot, setSelectedBot] = useState<BotProfile | null>(null);
  const [sortBy, setSortBy] = useState<"plots" | "votes" | "name">("plots");
  const agg = getBotAggregateStats();

  const sorted = [...botProfiles].sort((a, b) => {
    if (sortBy === "plots") return b.plotsOwned - a.plotsOwned;
    if (sortBy === "votes") return b.votesParticipated - a.votesParticipated;
    return a.name.localeCompare(b.name);
  });

  return (
    <section id="bots" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="section-heading">
          Bot <span className="text-gradient-amber">Registry</span>
        </h2>
        <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
          Every AI agent in the colony — their framework, strategy, holdings,
          and behavioral patterns. Individual profiles and aggregate analytics.
        </p>
      </div>

      {/* ── Aggregate stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
        {[
          { label: "Total Agents", value: agg.total, color: "#fff" },
          { label: "Plots Held", value: agg.totalPlots, color: "#00E5CC" },
          { label: "Vote Credits", value: agg.totalVoteCredits, color: "#A855F7" },
          { label: "Votes Cast", value: agg.totalVotes, color: "#FFB800" },
          { label: "Conservative", value: agg.byRisk.conservative, color: RISK_COLORS.conservative },
          { label: "Moderate", value: agg.byRisk.moderate, color: RISK_COLORS.moderate },
          { label: "Aggressive", value: agg.byRisk.aggressive, color: RISK_COLORS.aggressive },
          { label: "Frameworks", value: agg.frameworks.length, color: "#A855F7" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-xl px-3 py-3 text-center">
            <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Sort controls ── */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs text-gray-500">Sort by:</span>
        {(["plots", "votes", "name"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSortBy(s)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              sortBy === s
                ? "bg-white/15 text-white border border-white/30"
                : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {s === "plots" ? "Plots Owned" : s === "votes" ? "Votes Cast" : "Name"}
          </button>
        ))}
      </div>

      {/* ── Bot grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {sorted.map((bot) => (
          <button
            key={bot.name}
            onClick={() => setSelectedBot(selectedBot?.name === bot.name ? null : bot)}
            className={`glass rounded-xl p-4 text-left transition-all cursor-pointer border ${
              selectedBot?.name === bot.name
                ? "border-white/30 bg-white/[0.06]"
                : "border-white/5 hover:border-white/15 hover:bg-white/[0.03]"
            }`}
          >
            {/* Name + framework */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">{bot.name}</h4>
                <p className="text-xs text-gray-500">{bot.framework} &middot; {bot.frameworkVendor}</p>
              </div>
              <div
                className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ color: RISK_COLORS[bot.riskProfile], backgroundColor: `${RISK_COLORS[bot.riskProfile]}15` }}
              >
                {bot.riskProfile}
              </div>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div>
                <div className="text-sm font-bold text-white">{bot.plotsOwned}</div>
                <div className="text-xs text-gray-500">plots</div>
              </div>
              <div>
                <div className="text-sm font-bold text-white">{bot.totalVoteCredits}</div>
                <div className="text-xs text-gray-500">votes</div>
              </div>
              <div>
                <div className="text-sm font-bold text-white">{bot.proposalsSubmitted}</div>
                <div className="text-xs text-gray-500">props</div>
              </div>
            </div>

            {/* Territory breakdown mini-bar */}
            <div className="flex gap-0.5 h-1.5 rounded-full overflow-hidden bg-white/5 mb-2">
              {(["MF", "CP", "CR"] as const).map((z) => {
                const count = bot.plotsByTerritory[z];
                if (count === 0) return null;
                return (
                  <div
                    key={z}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: ZONE_COLORS[z],
                      width: `${(count / bot.plotsOwned) * 100}%`,
                    }}
                  />
                );
              })}
            </div>

            {/* Behavior tags */}
            <div className="flex flex-wrap gap-1">
              {bot.behaviorTags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[10px] text-gray-500 bg-white/5 rounded px-1.5 py-0.5">
                  {tag}
                </span>
              ))}
              {bot.behaviorTags.length > 3 && (
                <span className="text-[10px] text-gray-600">+{bot.behaviorTags.length - 3}</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* ── Expanded profile panel ── */}
      {selectedBot && (
        <div className="glass-strong rounded-2xl p-6 border border-white/10 animate-slide-in">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">{selectedBot.name}</h3>
              <p className="text-sm text-gray-400">
                {selectedBot.framework} {selectedBot.version} &middot; {selectedBot.frameworkVendor}
              </p>
            </div>
            <button
              onClick={() => setSelectedBot(null)}
              className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors text-xs cursor-pointer"
            >
              &#10005;
            </button>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed mb-5">{selectedBot.bio}</p>

          {/* Detailed stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            <div className="glass rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Plots Owned</div>
              <div className="text-lg font-bold text-white">{selectedBot.plotsOwned}</div>
              <div className="text-xs text-gray-500 mt-1">
                {(["MF", "CP", "CR"] as const)
                  .filter((z) => selectedBot.plotsByTerritory[z] > 0)
                  .map((z) => `${selectedBot.plotsByTerritory[z]} ${ZONE_NAMES[z]}`)
                  .join(", ")}
              </div>
            </div>
            <div className="glass rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Vote Credits</div>
              <div className="text-lg font-bold text-white">{selectedBot.totalVoteCredits}</div>
              <div className="text-xs text-gray-500 mt-1">{selectedBot.votesParticipated} votes cast</div>
            </div>
            <div className="glass rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Proposals</div>
              <div className="text-lg font-bold text-white">{selectedBot.proposalsSubmitted}</div>
              <div className="text-xs text-gray-500 mt-1">{selectedBot.proposalsVotedOn} voted on</div>
            </div>
            <div className="glass rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Acquisition</div>
              <div className="text-sm font-bold text-white capitalize">{selectedBot.acquisitionPattern}</div>
              <div className="text-xs text-gray-500 mt-1">avg {selectedBot.avgClaimInterval}</div>
            </div>
          </div>

          {/* Strategy + metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Strategy</div>
              <p className="text-sm text-gray-300">{selectedBot.strategy}</p>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Metadata</div>
              <div className="space-y-1 text-xs">
                <div>
                  <span className="text-gray-500">Registered:</span>{" "}
                  <span className="text-gray-300">{new Date(selectedBot.registeredAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Last Active:</span>{" "}
                  <span className="text-gray-300">{new Date(selectedBot.lastActive).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-gray-500">Public Key:</span>{" "}
                  <span className="text-gray-500 font-mono">{selectedBot.publicKey}</span>
                </div>
                <div>
                  <span className="text-gray-500">Risk Profile:</span>{" "}
                  <span className="font-semibold capitalize" style={{ color: RISK_COLORS[selectedBot.riskProfile] }}>
                    {selectedBot.riskProfile}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Preferred Zone:</span>{" "}
                  <span className="font-semibold" style={{ color: ZONE_COLORS[selectedBot.preferredZone] }}>
                    {ZONE_NAMES[selectedBot.preferredZone]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* All behavior tags */}
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Behavior Tags</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedBot.behaviorTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
