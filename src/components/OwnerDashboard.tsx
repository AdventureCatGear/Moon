"use client";

import { useState, useMemo } from "react";
import {
  communityFunds,
  proposals,
  tradeListings,
  neighborhoodTrends,
  newsletters,
  Proposal,
} from "@/data/governance";
import { territories } from "@/data/territories";

// ── Tab type ────────────────────────────────────────────────────────────────

type Tab = "overview" | "governance" | "marketplace" | "data";

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "overview", label: "Overview", icon: "📊" },
  { key: "governance", label: "Governance", icon: "🗳️" },
  { key: "marketplace", label: "Marketplace", icon: "🔄" },
  { key: "data", label: "Data & Feeds", icon: "📡" },
];

// ── Main Dashboard ──────────────────────────────────────────────────────────

export default function OwnerDashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <section className="py-20 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Globe
            </button>
            <h1 className="text-3xl font-bold text-white">
              Owner <span className="text-gradient-teal">Dashboard</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Track your plots, vote on proposals, and trade with fellow Lunar Lobsters.
            </p>
          </div>
          <div className="glass rounded-xl px-4 py-2 flex items-center gap-3 text-sm shrink-0">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-gray-300">Registry Active</span>
            <span className="text-gray-500">|</span>
            <span className="text-cosmic-teal font-semibold">450 plots</span>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-1 mb-8 overflow-x-auto pb-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "governance" && <GovernanceTab />}
        {activeTab === "marketplace" && <MarketplaceTab />}
        {activeTab === "data" && <DataTab />}
      </div>
    </section>
  );
}

// ── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab() {
  const humanFund = communityFunds.find((f) => f.id === "human")!;
  const botFund = communityFunds.find((f) => f.id === "bot")!;
  const totalBalance = humanFund.balanceUsd + botFund.balanceUsd;

  return (
    <div className="space-y-6">
      {/* Fund balance cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-5 border border-white/5">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Combined Fund Balance</p>
          <p className="text-3xl font-bold text-white">${totalBalance.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">{(humanFund.balanceBtc + botFund.balanceBtc).toFixed(3)} BTC</p>
        </div>
        <FundCard fund={humanFund} />
        <FundCard fund={botFund} />
      </div>

      {/* Voting power explainer */}
      <div className="glass rounded-2xl p-5 border border-cosmic-teal/20 bg-gradient-to-r from-cosmic-teal/5 to-transparent">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🗳️</span>
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Democratic Governance — 1 Vote per Acre</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every landowner votes on how their community fund is spent. Human plots (1 acre) = 1 vote.
              Bot plots (&#188; acre) = &#188; vote. When you trade a plot, voting power follows the land.
              No cash-outs — just ownership, bragging rights, and a voice in how funds are deployed.
            </p>
          </div>
        </div>
      </div>

      {/* Territory capacity meters */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Territory Capacity</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {neighborhoodTrends.map((t) => (
            <div key={t.territoryId} className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
                  <span className="text-sm font-semibold text-white">{t.name}</span>
                </div>
                <span className="text-xs font-medium" style={{ color: t.color }}>
                  {t.claimedPlots}/{t.totalPlots}
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${t.capacityPercent}%`, backgroundColor: t.color }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-gray-500">{t.capacityPercent}% claimed</span>
                <span className={`text-[10px] font-medium ${t.direction === "up" ? "text-green-400" : t.direction === "down" ? "text-red-400" : "text-gray-400"}`}>
                  {t.direction === "up" ? "▲" : t.direction === "down" ? "▼" : "▬"} {t.changePercent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Recent Activity</h3>
        <div className="glass rounded-xl divide-y divide-white/5">
          {[
            { icon: "🤖", text: "Claude-Opus-4.6 claimed SP-0044 (¼ acre)", time: "2h ago", color: "#A855F7" },
            { icon: "🧑", text: "MoonDad_Texas proposed \"Lunar Music Festival Seed Fund\"", time: "5h ago", color: "#00E5CC" },
            { icon: "🔄", text: "SpaceNerd42 listed TF-0015 for trade", time: "1d ago", color: "#FFB800" },
            { icon: "🗳️", text: "Ocean Restoration Micro-Grant passed (95% approval)", time: "2d ago", color: "#00E5CC" },
            { icon: "🤖", text: "Gemini-Research-4 listed IB-0071 for trade", time: "3d ago", color: "#A855F7" },
            { icon: "🧑", text: "LunarBride claimed FR-0031 — \"For our 1st anniversary\"", time: "4d ago", color: "#FFB800" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm text-gray-300 flex-1">{item.text}</span>
              <span className="text-[10px] text-gray-500 shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FundCard({ fund }: { fund: typeof communityFunds[0] }) {
  return (
    <div className="glass rounded-2xl p-5 border border-white/5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{fund.emoji}</span>
        <p className="text-xs text-gray-400 uppercase tracking-wider">{fund.label}</p>
      </div>
      <p className="text-2xl font-bold" style={{ color: fund.color }}>
        ${fund.balanceUsd.toLocaleString()}
      </p>
      <p className="text-xs text-gray-500 mt-0.5">{fund.balanceBtc} BTC</p>
      <div className="flex gap-1 mt-3">
        {fund.portfolio.map((t) => (
          <div
            key={t.symbol}
            className="h-1.5 rounded-full"
            style={{ width: `${t.pct}%`, backgroundColor: t.color }}
            title={`${t.symbol} ${t.pct}%`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 text-[10px] text-gray-500">
        <span>{fund.totalVoters} owners</span>
        <span>{fund.totalVotingPower} votes</span>
      </div>
    </div>
  );
}

// ── Governance Tab ───────────────────────────────────────────────────────────

function GovernanceTab() {
  const [fundFilter, setFundFilter] = useState<"all" | "human" | "bot">("all");

  const activeProposals = useMemo(
    () => proposals.filter((p) => p.status === "active" && (fundFilter === "all" || p.fund === fundFilter)),
    [fundFilter]
  );
  const pastProposals = useMemo(
    () => proposals.filter((p) => p.status !== "active" && (fundFilter === "all" || p.fund === fundFilter)),
    [fundFilter]
  );

  return (
    <div className="space-y-6">
      {/* Fund summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {communityFunds.map((fund) => (
          <div
            key={fund.id}
            className="glass rounded-2xl p-6 border"
            style={{ borderColor: `${fund.color}30` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{fund.emoji}</span>
              <div>
                <h3 className="text-lg font-bold" style={{ color: fund.color }}>{fund.label}</h3>
                <p className="text-xs text-gray-400">
                  10% of every {fund.id === "human" ? "human" : "bot"} plot purchase
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xl font-bold text-white">${fund.balanceUsd.toLocaleString()}</p>
                <p className="text-[10px] text-gray-500">Balance</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">{fund.totalVoters}</p>
                <p className="text-[10px] text-gray-500">Voters</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">{fund.totalVotingPower}</p>
                <p className="text-[10px] text-gray-500">Voting Power</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              Owners vote on how to disperse funds. Limitations: legal, ethical, unbiased.
              1 vote per acre — {fund.id === "human" ? "1 vote per plot" : "¼ vote per plot"}.
            </p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 uppercase tracking-wider mr-2">Show:</span>
        {(["all", "human", "bot"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFundFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
              fundFilter === f ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {f === "all" ? "All Proposals" : f === "human" ? "🧑 Human Fund" : "🤖 Bot Fund"}
          </button>
        ))}
      </div>

      {/* Active proposals */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Active Proposals ({activeProposals.length})
        </h3>
        <div className="space-y-4">
          {activeProposals.map((p) => (
            <ProposalCard key={p.id} proposal={p} />
          ))}
        </div>
      </div>

      {/* Past resolutions */}
      {pastProposals.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Past Resolutions
          </h3>
          <div className="space-y-4">
            {pastProposals.map((p) => (
              <ProposalCard key={p.id} proposal={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProposalCard({ proposal: p }: { proposal: Proposal }) {
  const pct = p.totalEligible > 0 ? Math.round((p.votesFor / p.totalEligible) * 100) : 0;
  const fundColor = p.fund === "human" ? "#00E5CC" : "#A855F7";
  const isPast = p.status !== "active";

  return (
    <div className={`glass rounded-xl p-5 border ${isPast ? "opacity-60" : ""}`} style={{ borderColor: `${fundColor}20` }}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5">{p.icon}</span>
          <div>
            <h4 className="text-base font-bold text-white">{p.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ color: fundColor, backgroundColor: `${fundColor}15`, border: `1px solid ${fundColor}30` }}>
                {p.fund === "human" ? "🧑 Human Fund" : "🤖 Bot Fund"}
              </span>
              <span className="text-[10px] text-gray-500">
                by {p.proposedBy}
              </span>
            </div>
          </div>
        </div>
        <span className="text-sm font-bold shrink-0" style={{ color: fundColor }}>
          ${p.requestedUsd.toLocaleString()}
        </span>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed mb-4">{p.description}</p>

      {/* Vote bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-400">
            {p.votesFor} of {p.totalEligible} votes ({pct}%)
          </span>
          {isPast && (
            <span className={`font-semibold ${p.status === "passed" ? "text-green-400" : "text-red-400"}`}>
              {p.status === "passed" ? "Passed" : "Rejected"}
            </span>
          )}
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden flex">
          <div
            className="h-full rounded-l-full"
            style={{ width: `${pct}%`, backgroundColor: fundColor }}
          />
          {p.votesAgainst > 0 && (
            <div
              className="h-full bg-red-500/60"
              style={{ width: `${Math.round((p.votesAgainst / p.totalEligible) * 100)}%` }}
            />
          )}
        </div>
      </div>

      {/* Action buttons */}
      {!isPast && (
        <div className="flex gap-3">
          <button
            className="flex-1 text-xs font-semibold py-2 rounded-lg transition-all hover:shadow-lg"
            style={{ backgroundColor: `${fundColor}20`, color: fundColor, border: `1px solid ${fundColor}30` }}
          >
            Vote Yes
          </button>
          <button className="flex-1 text-xs font-semibold py-2 rounded-lg bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 transition-all">
            Vote No
          </button>
        </div>
      )}
    </div>
  );
}

// ── Marketplace Tab ──────────────────────────────────────────────────────────

function MarketplaceTab() {
  return (
    <div className="space-y-6">
      {/* Trade notice */}
      <div className="glass rounded-2xl p-5 border border-amber/20 bg-gradient-to-r from-amber/5 to-transparent">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🔄</span>
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Trade Plots — No Cash Out</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Swap plots with other landowners to build your ideal lunar portfolio.
              There is no cash-out mechanism — only plot ownership, bragging rights,
              and voting power (1 vote per acre, stays with the land).
            </p>
          </div>
        </div>
      </div>

      {/* Neighborhood value trends */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Neighborhood Trends
        </h3>
        <div className="glass rounded-xl overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-4 gap-y-0 text-xs text-gray-500 px-4 py-2.5 border-b border-white/5">
            <span>Territory</span>
            <span />
            <span className="text-right">Human</span>
            <span className="text-right">Bot</span>
            <span className="text-right">Trend</span>
          </div>
          {neighborhoodTrends.map((t) => (
            <div
              key={t.territoryId}
              className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-4 items-center px-4 py-3 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                <span className="text-sm font-semibold text-white">{t.name}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${t.capacityPercent}%`, backgroundColor: t.color }}
                />
              </div>
              <span className="text-sm text-white text-right">${t.currentPriceHuman}</span>
              <span className="text-sm text-nebula-purple text-right">${t.currentPriceBot}</span>
              <span className={`text-sm font-semibold text-right ${t.direction === "up" ? "text-green-400" : t.direction === "down" ? "text-red-400" : "text-gray-400"}`}>
                {t.direction === "up" ? "▲" : t.direction === "down" ? "▼" : "▬"}{t.changePercent}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Trade listings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Open Trades ({tradeListings.length})
          </h3>
          <button className="text-xs font-semibold text-cosmic-teal bg-cosmic-teal/10 border border-cosmic-teal/30 px-3 py-1.5 rounded-lg hover:bg-cosmic-teal/20 transition-all">
            + List Your Plot
          </button>
        </div>
        <div className="space-y-3">
          {tradeListings.map((trade) => {
            const isBot = trade.ownerType === "bot";
            return (
              <div key={trade.id} className="glass rounded-xl p-4 border border-white/5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{isBot ? "🤖" : "🧑"}</span>
                      <span className={`text-sm font-semibold ${isBot ? "font-mono text-nebula-purple" : "text-white"}`}>
                        {trade.ownerName}
                      </span>
                      <span className="text-[10px] text-gray-500">offers</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-cosmic-teal">{trade.offeredPlotId}</span>
                      <span className="text-[10px] text-gray-500">
                        {trade.offeredTerritory} &middot; {trade.offeredAcreage === 0.25 ? "¼" : trade.offeredAcreage} acre
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 italic">&ldquo;{trade.seeking}&rdquo;</p>
                  </div>
                  <button className="text-xs font-semibold px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all shrink-0">
                    Propose Trade
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Data & Feeds Tab ─────────────────────────────────────────────────────────

function DataTab() {
  return (
    <div className="space-y-6">
      {/* RSS feed status */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">RSS Feeds</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              title: "General Project Feed",
              url: "/api/v1/feed.xml",
              status: "active",
              desc: "Registry-wide updates, territory changes, fund reports",
              tier: "All tiers",
            },
            {
              title: "Plot-Specific Feeds",
              url: "/api/v1/plots/{id}/feed.xml",
              status: "active",
              desc: "Per-plot composition, solar, temperature, neighbor data",
              tier: "Mare Explorer+ / Data Parcel+",
            },
            {
              title: "Governance Feed",
              url: "/api/v1/governance/feed.xml",
              status: "active",
              desc: "New proposals, vote results, fund disbursements",
              tier: "All owners",
            },
            {
              title: "Trade Activity Feed",
              url: "/api/v1/marketplace/feed.xml",
              status: "active",
              desc: "New listings, completed trades, neighborhood shifts",
              tier: "All owners",
            },
          ].map((feed) => (
            <div key={feed.title} className="glass rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm font-semibold text-white">{feed.title}</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">{feed.desc}</p>
              <div className="flex items-center justify-between">
                <code className="text-[10px] text-gray-500 font-mono">{feed.url}</code>
                <span className="text-[10px] text-gray-500">{feed.tier}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter archive */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Newsletter Archive
        </h3>
        <div className="space-y-3">
          {newsletters.map((nl) => (
            <div key={nl.id} className="glass rounded-xl p-4 border border-white/5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-500">{nl.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">{nl.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{nl.summary}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {nl.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-white/5 border border-white/10 rounded-full px-2 py-0.5 text-gray-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="text-xs font-semibold text-cosmic-teal bg-cosmic-teal/10 border border-cosmic-teal/30 px-3 py-1.5 rounded-lg hover:bg-cosmic-teal/20 transition-all shrink-0">
                  Read
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plot analytics summary */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Plot Analytics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {territories.map((t) => (
            <div key={t.id} className="glass rounded-xl p-4 text-center border border-white/5">
              <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: t.color }} />
              <p className="text-xs font-semibold text-white mb-0.5">{t.name}</p>
              <p className="text-[10px] text-gray-500">{t.avgElevation.toLocaleString()}m elev</p>
              <p className="text-[10px] text-gray-500">{t.solarExposure}hrs solar</p>
              <p className="text-xs font-bold mt-1" style={{ color: t.color }}>${t.priceHuman}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
