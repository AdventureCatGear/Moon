"use client";

import { useState, useMemo } from "react";
import { Territory } from "@/data/territories";
import { getPlotsByTerritory, Plot } from "@/data/plots";
import PlotDetail from "./PlotDetail";

interface TerritoryDetailProps {
  territory: Territory;
  onBack: () => void;
}

export default function TerritoryDetail({ territory, onBack }: TerritoryDetailProps) {
  const [filter, setFilter] = useState<"all" | "available" | "human" | "bot">("all");
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);

  const plots = useMemo(() => getPlotsByTerritory(territory.id), [territory.id]);

  const filteredPlots = useMemo(() => {
    switch (filter) {
      case "available": return plots.filter(p => p.status === "available");
      case "human": return plots.filter(p => p.ownerType === "human");
      case "bot": return plots.filter(p => p.ownerType === "bot");
      default: return plots;
    }
  }, [plots, filter]);

  const available = plots.filter(p => p.status === "available").length;
  const claimed = plots.filter(p => p.status === "claimed").length;

  if (selectedPlot) {
    return <PlotDetail plot={selectedPlot} territory={territory} onBack={() => setSelectedPlot(null)} />;
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Globe
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: territory.color }}
                />
                <h2 className="text-2xl font-bold" style={{ color: territory.color }}>
                  {territory.name}
                </h2>
              </div>
              <p className="text-gray-400 text-sm italic mb-6">{territory.tagline}</p>
              <p className="text-gray-300 text-sm mb-6">{territory.description}</p>

              {/* Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Plots</span>
                  <span className="text-white font-semibold">{territory.totalPlots}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Available</span>
                  <span className="text-cosmic-teal font-semibold">{available}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Claimed</span>
                  <span className="text-white font-semibold">{claimed}</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-2 bg-surface-light rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(claimed / territory.totalPlots) * 100}%`,
                      backgroundColor: territory.color,
                    }}
                  />
                </div>

                <div className="border-t border-white/10 pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Avg Elevation</span>
                    <span className="text-white">{territory.avgElevation.toLocaleString()}m</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Solar Exposure</span>
                    <span className="text-white">{territory.solarExposure}hrs/lunar day</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Terrain</span>
                    <span className="text-white text-right text-xs">{territory.terrainType}</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <p className="text-xs text-gray-500 mb-2">Nearby Features</p>
                  <div className="flex flex-wrap gap-1">
                    {territory.nearbyFeatures.map((f) => (
                      <span key={f} className="text-xs bg-surface-light rounded-full px-2 py-1 text-gray-400">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Filter</p>
                {(["all", "available", "human", "bot"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      filter === f
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {f === "all" && "All Plots"}
                    {f === "available" && "🟢 Available"}
                    {f === "human" && "🧑 Human Plots"}
                    {f === "bot" && "🤖 Bot Plots"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Plot Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-300">
                Showing {filteredPlots.length} plots
              </h3>
              <span className="text-sm text-gray-500">{territory.priceSats.toLocaleString()} sats/plot · &asymp;{territory.priceBot} USDT · {territory.voteCreditsBot} {territory.voteCreditsBot === 1 ? "vote" : "votes"}/plot</span>
            </div>

            {/* Physical land grid — bot plots (¼ acre) are visually smaller
                than human plots (1 acre) to represent real allocation sizes */}
            <div className="flex flex-wrap gap-2">
              {filteredPlots.map((plot) => {
                const isBot = plot.ownerType === "bot";
                // Bot plots are quarter-acre → visually half-width/height of human 1-acre plots
                const sizeClass = isBot
                  ? "w-6 h-6 sm:w-7 sm:h-7"
                  : "w-10 h-10 sm:w-12 sm:h-12";

                return (
                  <button
                    key={plot.id}
                    onClick={() => setSelectedPlot(plot)}
                    className={`relative rounded-lg border transition-all cursor-pointer group ${sizeClass} ${
                      plot.status === "available"
                        ? "border-cosmic-teal/30 hover:border-cosmic-teal hover:glow-teal bg-cosmic-teal/5 animate-pulse-soft"
                        : isBot
                        ? "border-nebula-purple/30 hover:border-nebula-purple bg-nebula-purple/5"
                        : "border-white/10 hover:border-white/30 bg-white/5"
                    }`}
                    title={`${plot.id} (${plot.acreage} acre) — ${plot.status === "available" ? "Available" : `Claimed by ${plot.ownerName}`}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-xs">
                      {plot.status === "available" ? (
                        <span className="text-cosmic-teal opacity-60 group-hover:opacity-100">+</span>
                      ) : isBot ? (
                        <span className="text-xs">🤖</span>
                      ) : (
                        <span className="text-xs">🧑</span>
                      )}
                    </div>
                    {/* Hover tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 hidden group-hover:block z-20">
                      <div className="glass rounded px-2 py-1 text-xs text-white whitespace-nowrap">
                        {plot.id} · {plot.acreage === 0.25 ? "¼" : plot.acreage} acre
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-cosmic-teal/20 border border-cosmic-teal/40" />
                Available (1 acre)
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-white/10 border border-white/20" />
                Human-claimed (1 acre)
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded bg-nebula-purple/10 border border-nebula-purple/30" />
                Bot-claimed (¼ acre)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
