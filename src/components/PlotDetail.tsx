"use client";

import { useState } from "react";
import { Plot } from "@/data/plots";
import { Territory } from "@/data/territories";

interface PlotDetailProps {
  plot: Plot;
  territory: Territory;
  onBack: () => void;
}

export default function PlotDetail({ plot, territory, onBack }: PlotDetailProps) {
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimed, setClaimed] = useState(false);

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {territory.name}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Virtual Viewer */}
          <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-square">
            {/* Procedural lunar landscape */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(180deg,
                    #000000 0%,
                    #0a0a0f 25%,
                    #1a1a24 45%,
                    #2a2820 55%,
                    #4a4640 65%,
                    #6a6458 75%,
                    #8a8474 85%,
                    #7a7468 100%
                  )
                `,
              }}
            >
              {/* Stars in sky */}
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white animate-twinkle"
                  style={{
                    left: `${(i * 17 + 7) % 100}%`,
                    top: `${(i * 13 + 3) % 40}%`,
                    width: `${(i % 3) + 1}px`,
                    height: `${(i % 3) + 1}px`,
                    opacity: 0.3 + (i % 5) * 0.1,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${2 + (i % 3)}s`,
                    ["--delay" as string]: `${i * 0.2}s`,
                    ["--duration" as string]: `${2 + (i % 3)}s`,
                  }}
                />
              ))}

              {/* Earth in sky */}
              <div
                className="absolute top-[15%] right-[20%] w-10 h-10 rounded-full"
                style={{
                  background: "radial-gradient(circle at 40% 40%, #4a90d9, #1a5a9e, #0a3060)",
                  boxShadow: "0 0 20px rgba(74, 144, 217, 0.3)",
                }}
              />

              {/* Terrain bumps */}
              <div className="absolute bottom-0 left-0 right-0 h-[50%]">
                {/* Distant hills */}
                <div
                  className="absolute bottom-[45%] left-0 right-0 h-[20%]"
                  style={{
                    background: "linear-gradient(180deg, transparent, #3a3630 60%, #4a4640)",
                    clipPath: "polygon(0% 100%, 5% 60%, 15% 70%, 25% 40%, 35% 55%, 45% 30%, 55% 50%, 65% 35%, 75% 55%, 85% 45%, 95% 65%, 100% 50%, 100% 100%)",
                  }}
                />

                {/* Near terrain */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[45%]"
                  style={{
                    background: "linear-gradient(180deg, #5a5448, #7a7468)",
                    clipPath: "polygon(0% 40%, 10% 35%, 20% 38%, 30% 30%, 40% 35%, 50% 28%, 60% 32%, 70% 25%, 80% 30%, 90% 28%, 100% 35%, 100% 100%, 0% 100%)",
                  }}
                />

                {/* Craters on ground */}
                <div
                  className="absolute bottom-[15%] left-[20%] w-16 h-6 rounded-full opacity-30"
                  style={{
                    background: "radial-gradient(ellipse, #3a3630, transparent)",
                  }}
                />
                <div
                  className="absolute bottom-[25%] right-[30%] w-10 h-4 rounded-full opacity-20"
                  style={{
                    background: "radial-gradient(ellipse, #3a3630, transparent)",
                  }}
                />
              </div>

              {/* Neighbor plot flags */}
              <div className="absolute bottom-[42%] left-[15%] flex flex-col items-center">
                <div className="w-4 h-3 bg-cosmic-teal/60 rounded-sm" />
                <div className="w-px h-6 bg-white/30" />
              </div>
              <div className="absolute bottom-[38%] right-[25%] flex flex-col items-center">
                <div className="w-4 h-3 bg-amber/60 rounded-sm" />
                <div className="w-px h-6 bg-white/30" />
              </div>

              {/* Your plot flag */}
              <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div
                  className="px-2 py-1 rounded text-[10px] font-bold"
                  style={{ backgroundColor: territory.color, color: "#0B1026" }}
                >
                  {plot.id}
                </div>
                <div className="w-px h-10 bg-white/50" />
              </div>

              {/* Overlay label */}
              <div className="absolute top-4 left-4 glass rounded-lg px-3 py-2">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Virtual Walk View</p>
                <p className="text-xs text-white font-semibold">{plot.lat}°N, {plot.lon}°E</p>
              </div>
            </div>
          </div>

          {/* Plot info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold" style={{ color: territory.color }}>
                  Plot {plot.id}
                </h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    plot.status === "available"
                      ? "bg-cosmic-teal/20 text-cosmic-teal"
                      : "bg-white/10 text-gray-300"
                  }`}
                >
                  {plot.status === "available" ? "Available" : "Claimed"}
                </span>
              </div>
              <p className="text-gray-400 mt-1">{territory.name} &middot; {territory.tagline}</p>
            </div>

            {/* Owner info if claimed */}
            {plot.status === "claimed" && plot.ownerName && (
              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{plot.ownerType === "bot" ? "🤖" : "🧑"}</span>
                  <div>
                    <p className="font-semibold text-white">{plot.ownerName}</p>
                    <p className="text-xs text-gray-400">
                      Claimed {plot.claimedAt ? new Date(plot.claimedAt).toLocaleDateString() : "recently"}
                    </p>
                  </div>
                </div>
                {plot.dedication && (
                  <p className={`mt-3 text-sm italic ${plot.ownerType === "bot" ? "font-mono text-nebula-purple/80" : "text-gray-300"}`}>
                    &ldquo;{plot.dedication}&rdquo;
                  </p>
                )}
              </div>
            )}

            {/* Terrain stats */}
            <div className="glass rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Terrain Data</h3>
              <div className="grid grid-cols-2 gap-4">
                <Stat label="Coordinates" value={`${plot.lat}°N, ${plot.lon}°E`} />
                <Stat label="Elevation" value={`${plot.elevation.toLocaleString()}m`} />
                <Stat label="Slope" value={`${plot.slope}°`} />
                <Stat label="Solar Exposure" value={`${plot.solarExposure} hrs`} />
                <Stat label="Nearest Crater" value={plot.nearestCrater} />
                <Stat label="Crater Distance" value={`${plot.nearestCraterDist} km`} />
                <Stat label="Temp Range" value={`${plot.tempMin}°C to ${plot.tempMax}°C`} />
                <Stat label="Terrain Class" value={plot.terrainClass.replace(/_/g, " ")} />
                <Stat label="Habitability" value={`${plot.habitabilityScore}/100`} highlight />
              </div>
            </div>

            {/* Composition */}
            <div className="glass rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Composition</h3>
              <div className="space-y-3">
                <CompBar label="Silicon Dioxide (SiO₂)" value={plot.composition.siliconDioxide} max={60} />
                <CompBar label="Aluminum Oxide (Al₂O₃)" value={plot.composition.aluminumOxide} max={30} />
                <CompBar label="Iron Oxide (FeO)" value={plot.composition.ironOxide} max={25} />
                <CompBar label="Calcium Oxide (CaO)" value={plot.composition.calciumOxide} max={20} />
                <CompBar label="Magnesium Oxide (MgO)" value={plot.composition.magnesiumOxide} max={15} />
                <CompBar label="Titanium Dioxide (TiO₂)" value={plot.composition.titaniumDioxide} max={10} />
              </div>
            </div>

            {/* CTA */}
            {plot.status === "available" && !claimed ? (
              <button
                onClick={() => setShowClaimModal(true)}
                className="btn-primary w-full justify-center text-lg py-4"
              >
                Claim This Plot — ${plot.price}
              </button>
            ) : plot.status === "available" && claimed ? (
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-cosmic-teal font-bold text-lg">Plot Claimed! 🦞</p>
                <p className="text-gray-400 text-sm mt-1">Welcome to the colony, Lunar Lobster.</p>
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm">
                This plot has already been claimed. Pick another spot, space cowboy. 🤠
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Claim modal */}
      {showClaimModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-strong rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-2">Claim Plot {plot.id}</h3>
            <p className="text-gray-400 text-sm mb-6">
              {territory.name} &middot; {plot.lat}°N, {plot.lon}°E
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Your Name / Handle</label>
                <input
                  type="text"
                  placeholder="LunarLobster2025"
                  className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cosmic-teal"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1">Dedication (optional)</label>
                <textarea
                  placeholder="Leave a message on the Moon..."
                  rows={3}
                  className="w-full bg-surface-light border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cosmic-teal resize-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-400">Total</span>
              <span className="text-2xl font-bold text-amber">${plot.price}</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowClaimModal(false)}
                className="btn-secondary flex-1 justify-center"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowClaimModal(false);
                  setClaimed(true);
                }}
                className="btn-primary flex-1 justify-center"
              >
                Confirm Claim 🦞
              </button>
            </div>

            <p className="text-[10px] text-gray-600 text-center mt-4">
              This is a prototype. No real transaction will occur.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-sm font-semibold ${highlight ? "text-cosmic-teal" : "text-white"}`}>{value}</p>
    </div>
  );
}

function CompBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-semibold">{value}%</span>
      </div>
      <div className="w-full h-1.5 bg-surface-light rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cosmic-teal to-cosmic-teal-dim transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
