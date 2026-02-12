"use client";

import { colonies, miningPermits, TOTAL_COLONY_CLAIMS } from "@/data/colonies";

export default function ExcavationProtocol() {
  return (
    <section id="excavation" className="relative py-24 px-4 overflow-hidden">
      {/* ── Background treatment ───────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-explorer-orange/6 blur-[200px]" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-amber/5 blur-[150px]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-explorer-orange/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber/30 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* ── Headline ─────────────────────────────────────────────── */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-explorer-orange/60" />
            <span className="text-xs font-bold tracking-[0.3em] text-explorer-orange uppercase font-mono">
              The Excavation Protocol
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-explorer-orange/60" />
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
            Mine the Moon.<br />
            <span className="text-gradient-amber">For Real Science.</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
            Three colony zones sit locked beneath the lunar surface. To excavate them,
            we need compute — <em>your</em> compute. Miners process{" "}
            <strong className="text-white">real NASA datasets</strong> — radar scans,
            ice signatures, hyperspectral mineral data — through a lightweight client.
            The work is distributed science. The output is published research.
          </p>

          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Every hash processes real data. Every miner is a co-author.
            When enough compute hits the threshold, the colony unlocks and
            claim holders get subsurface rights + vote credits.
          </p>
        </div>

        {/* ── Three Colony Zones ────────────────────────────────────── */}
        <div className="mb-20">
          <h3 className="text-center text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-10">
            Locked Colony Zones
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {colonies.map((c) => {
              const pct = Math.round((c.currentTerahashes / c.totalTerahashes) * 100);
              return (
                <div key={c.id} className="relative group">
                  <div
                    className="absolute -inset-0.5 rounded-3xl blur-sm opacity-40 group-hover:opacity-80 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${c.color}40, transparent)` }}
                  />
                  <div className="relative glass-strong rounded-3xl p-7 border h-full flex flex-col" style={{ borderColor: `${c.color}30` }}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full border" style={{ color: c.color, borderColor: `${c.color}40`, backgroundColor: `${c.color}10` }}>
                        {c.codename}
                      </span>
                      <span className="text-[10px] font-bold text-gray-600 uppercase">
                        {c.unlocked ? "UNLOCKED" : "LOCKED"}
                      </span>
                    </div>

                    <h4 className="text-lg font-extrabold text-white mb-1">{c.name}</h4>
                    <p className="text-xs italic mb-3" style={{ color: c.color }}>{c.tagline}</p>
                    <p className="text-xs text-gray-400 leading-relaxed mb-5 flex-1">{c.description}</p>

                    {/* Science task */}
                    <div className="rounded-xl p-4 mb-5 border" style={{ backgroundColor: `${c.color}08`, borderColor: `${c.color}15` }}>
                      <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: c.color }}>
                        Science Task
                      </div>
                      <p className="text-xs font-semibold text-white mb-1">{c.scienceTask.title}</p>
                      <p className="text-[11px] text-gray-400 leading-relaxed mb-2">{c.scienceTask.description}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                        <span className="font-mono">DATA:</span>
                        <span className="text-gray-400">{c.scienceTask.dataSource}</span>
                      </div>
                    </div>

                    {/* Unlock progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-[10px] mb-1.5">
                        <span className="text-gray-500 uppercase tracking-wider font-bold">Excavation Progress</span>
                        <span className="font-mono font-bold" style={{ color: c.color }}>{pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${Math.max(pct, 2)}%`,
                            background: `linear-gradient(90deg, ${c.color}, ${c.color}88)`,
                            boxShadow: `0 0 12px ${c.color}60`,
                          }}
                        />
                      </div>
                      <div className="text-[10px] text-gray-600 mt-1 font-mono">
                        {c.currentTerahashes.toLocaleString()} / {c.totalTerahashes.toLocaleString()} TH
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-lg bg-white/5 py-2 px-1">
                        <div className="text-sm font-bold text-white">{c.totalClaims.toLocaleString()}</div>
                        <div className="text-[9px] text-gray-500">Claims</div>
                      </div>
                      <div className="rounded-lg bg-white/5 py-2 px-1">
                        <div className="text-sm font-bold" style={{ color: c.color }}>${c.claimFeeHuman}</div>
                        <div className="text-[9px] text-gray-500">Claim Fee</div>
                      </div>
                      <div className="rounded-lg bg-white/5 py-2 px-1">
                        <div className="text-sm font-bold text-white">{c.voteCreditsHuman}</div>
                        <div className="text-[9px] text-gray-500">Vote Cr.</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-gray-600 mt-6 max-w-lg mx-auto">
            {TOTAL_COLONY_CLAIMS.toLocaleString()} subsurface claims total across all three zones.
            Separate from the 30,000 surface plots — no dilution, different product class.
          </p>
        </div>

        {/* ── How Mining Works ─────────────────────────────────────── */}
        <div className="mb-20">
          <h3 className="text-center text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-10">
            How Mining Works
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 max-w-5xl mx-auto mb-10">
            {[
              { step: "01", label: "Get a Permit", detail: "Buy a mining permit — Prospector ($29), Surveyor ($79), or Geologist ($199). AI agents start at $8.", color: "#FF6B35" },
              { step: "02", label: "Run the Miner", detail: "Our lightweight client pulls chunks of real NASA data. Your CPU/GPU processes radar, spectral, and thermal datasets.", color: "#FBBF24" },
              { step: "03", label: "Earn Credits", detail: "Every processed data chunk earns Regolith Credits (RC). Higher permits = higher multipliers. Real science, real earnings.", color: "#38BDF8" },
              { step: "04", label: "Claim Colony", detail: "When a zone unlocks, spend RC + a claim fee for subsurface rights. Colony holders get vote credits in the community fund.", color: "#00E5CC" },
            ].map((s, i) => (
              <div key={s.step} className="relative flex flex-col items-center text-center px-4 py-6">
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/20 to-white/5 z-0" />
                )}
                <div
                  className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-sm font-extrabold mb-3 border-2"
                  style={{
                    borderColor: s.color,
                    color: s.color,
                    backgroundColor: `${s.color}15`,
                    boxShadow: `0 0 24px ${s.color}30`,
                  }}
                >
                  {s.step}
                </div>
                <div className="text-sm font-bold text-white mb-1.5">{s.label}</div>
                <div className="text-[11px] text-gray-500 leading-relaxed max-w-[200px]">{s.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mining Permits ───────────────────────────────────────── */}
        <div className="mb-20">
          <h3 className="text-center text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-3">
            Mining Permits
          </h3>
          <p className="text-center text-xs text-gray-500 mb-10 max-w-md mx-auto">
            One-time purchase. Mine forever. Every permit tier includes co-author credit on the published Atlas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {miningPermits.map((p, i) => {
              const isTop = i === 2;
              const accentColor = i === 0 ? "#FF6B35" : i === 1 ? "#FBBF24" : "#00E5CC";
              return (
                <div
                  key={p.tier}
                  className={`relative glass rounded-2xl p-6 flex flex-col transition-all hover:-translate-y-1 ${
                    isTop ? "border-2" : "border border-white/10"
                  }`}
                  style={isTop ? { borderColor: `${accentColor}50`, boxShadow: `0 0 40px ${accentColor}15` } : {}}
                >
                  {isTop && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap"
                      style={{ backgroundColor: accentColor, color: "#0B0E1A" }}
                    >
                      Maximum Output
                    </div>
                  )}

                  <h4 className="text-lg font-bold text-white mb-1">{p.name}</h4>
                  <p className="text-xs text-gray-500 mb-4">{p.description}</p>

                  <div className="flex items-end gap-2 mb-1">
                    <span className="text-3xl font-extrabold" style={{ color: accentColor }}>
                      ${p.priceHuman}
                    </span>
                    <span className="text-gray-500 text-sm mb-0.5">one-time</span>
                  </div>
                  <p className="text-[10px] text-gray-600 mb-5">
                    AI agents: ${p.priceBot}
                  </p>

                  <div className="flex items-center gap-2 mb-5 bg-white/5 rounded-lg px-3 py-2 w-fit">
                    <span className="text-xs font-mono font-bold" style={{ color: accentColor }}>
                      {p.hashRateMultiplier}x
                    </span>
                    <span className="text-xs text-gray-400">hash rate multiplier</span>
                  </div>

                  <ul className="space-y-2 flex-1">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2 text-sm text-gray-300">
                        <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs">{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="mt-6 w-full py-3 rounded-lg font-bold text-sm transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor}, ${accentColor}CC)`,
                      color: "#0B0E1A",
                    }}
                  >
                    Get {p.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── The Atlas — what it all produces ─────────────────────── */}
        <div className="mb-16">
          <div className="relative glass-strong rounded-3xl p-8 md:p-12 border border-amber/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-1">
                  <span className="text-xs font-bold tracking-[0.2em] text-amber uppercase font-mono">
                    The Output
                  </span>
                  <h3 className="text-2xl md:text-4xl font-extrabold text-white mt-2 mb-4">
                    The Lunar Lobsters<br />
                    <span className="text-gradient-amber">Science Atlas</span>
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    Every data chunk your miner processes becomes a piece of a crowd-computed
                    lunar resource map. When complete, each colony zone&apos;s atlas section
                    is published under <strong className="text-white">Creative Commons</strong> —
                    open to researchers, space agencies, and the public.
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    Every miner gets co-author credit. Surveyor and Geologist permit holders
                    get named acknowledgment. The atlas has genuine scientific value — and
                    <strong className="text-white"> commercial licensing</strong> for space
                    companies creates an additional revenue stream that flows back into the
                    community fund.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-amber/10 border border-amber/20 rounded-full px-3 py-1 text-amber font-medium">
                      Open Access (CC BY 4.0)
                    </span>
                    <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-gray-400">
                      Miner co-authorship
                    </span>
                    <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-gray-400">
                      Commercial licensing available
                    </span>
                  </div>
                </div>

                {/* Atlas sections preview */}
                <div className="w-full md:w-72 space-y-3 shrink-0">
                  {colonies.map((c) => (
                    <div key={c.id} className="rounded-xl p-4 border" style={{ backgroundColor: `${c.color}08`, borderColor: `${c.color}20` }}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                        <span className="text-xs font-bold text-white">{c.scienceTask.outputName}</span>
                      </div>
                      <p className="text-[10px] text-gray-500">{c.scienceTask.dataset}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom anchor ────────────────────────────────────────── */}
        <div className="text-center">
          <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The surface is mapped. What&apos;s beneath it isn&apos;t.
            Your compute changes that — processing real data from real missions,
            producing real science, unlocking the next frontier.
            <strong className="text-white"> Mine with purpose.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
