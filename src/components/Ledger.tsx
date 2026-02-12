"use client";

import { ledgerEntries, type LedgerEntry } from "@/data/ledger";
import { useState } from "react";

/* ── Action styling ──────────────────────────────────────────────────────── */

const ACTION_STYLES: Record<LedgerEntry["action"], { label: string; color: string; bg: string }> = {
  register: { label: "REGISTER", color: "#A855F7", bg: "bg-purple-500/10" },
  claim:    { label: "CLAIM",    color: "#00E5CC", bg: "bg-teal-500/10" },
  vote:     { label: "VOTE",     color: "#FFB800", bg: "bg-amber-500/10" },
  propose:  { label: "PROPOSE",  color: "#FF6B35", bg: "bg-orange-500/10" },
  trade:    { label: "TRADE",    color: "#60A5FA", bg: "bg-blue-500/10" },
};

const FILTERS: { label: string; value: LedgerEntry["action"] | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Claims", value: "claim" },
  { label: "Votes", value: "vote" },
  { label: "Proposals", value: "propose" },
  { label: "Registrations", value: "register" },
  { label: "Trades", value: "trade" },
];

/* ── Component ───────────────────────────────────────────────────────────── */

export default function Ledger() {
  const [filter, setFilter] = useState<LedgerEntry["action"] | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "all"
    ? ledgerEntries
    : ledgerEntries.filter((e) => e.action === filter);

  // Show newest first
  const sorted = [...filtered].reverse();

  return (
    <section id="ledger" className="py-20 px-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="section-heading">
          Public <span className="text-gradient-teal">Ledger</span>
        </h2>
        <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
          Every claim, vote, proposal, and registration — cryptographically
          signed and chained. Nothing hidden, nothing editable.
        </p>
      </div>

      {/* Aggregate stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {[
          { label: "Transactions", value: ledgerEntries.length, color: "#fff" },
          { label: "Claims", value: ledgerEntries.filter((e) => e.action === "claim").length, color: "#00E5CC" },
          { label: "Votes", value: ledgerEntries.filter((e) => e.action === "vote").length, color: "#FFB800" },
          { label: "Proposals", value: ledgerEntries.filter((e) => e.action === "propose").length, color: "#FF6B35" },
          { label: "Agents", value: new Set(ledgerEntries.map((e) => e.actor)).size, color: "#A855F7" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-xl px-4 py-3 text-center">
            <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              filter === f.value
                ? "bg-white/15 text-white border border-white/30"
                : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Ledger table */}
      <div className="glass-strong rounded-2xl overflow-hidden border border-white/10">
        {/* Header row */}
        <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-white/10 text-xs text-gray-500 uppercase tracking-wider">
          <div className="col-span-1">Block</div>
          <div className="col-span-2 hidden sm:block">Time</div>
          <div className="col-span-1">Type</div>
          <div className="col-span-3 sm:col-span-2">Actor</div>
          <div className="col-span-5 sm:col-span-4">Details</div>
          <div className="col-span-2 hidden sm:block text-right">Hash</div>
        </div>

        {/* Rows */}
        <div className="max-h-[520px] overflow-y-auto">
          {sorted.map((entry) => {
            const style = ACTION_STYLES[entry.action];
            const isOpen = expanded === entry.txId;

            return (
              <div key={entry.txId}>
                <button
                  onClick={() => setExpanded(isOpen ? null : entry.txId)}
                  className="w-full grid grid-cols-12 gap-2 px-4 py-3 border-b border-white/5 hover:bg-white/[0.03] transition-colors text-left cursor-pointer"
                >
                  {/* Block */}
                  <div className="col-span-1 text-xs text-gray-500 font-mono">
                    #{entry.blockHeight}
                  </div>

                  {/* Time */}
                  <div className="col-span-2 hidden sm:block text-xs text-gray-500">
                    {new Date(entry.timestamp).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "2-digit",
                    })}
                  </div>

                  {/* Action badge */}
                  <div className="col-span-1">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${style.bg}`}
                      style={{ color: style.color }}
                    >
                      {style.label}
                    </span>
                  </div>

                  {/* Actor */}
                  <div className="col-span-3 sm:col-span-2 text-xs text-white font-medium truncate">
                    {entry.actor}
                  </div>

                  {/* Details */}
                  <div className="col-span-5 sm:col-span-4 text-xs text-gray-400 truncate">
                    {entry.details}
                  </div>

                  {/* Hash */}
                  <div className="col-span-2 hidden sm:block text-right text-[10px] text-gray-600 font-mono truncate">
                    {entry.hash.slice(0, 12)}...
                  </div>
                </button>

                {/* Expanded detail panel */}
                {isOpen && (
                  <div className="px-4 py-4 bg-white/[0.02] border-b border-white/10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-gray-500">Transaction ID:</span>{" "}
                        <span className="text-white font-mono">{entry.txId}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Block:</span>{" "}
                        <span className="text-white font-mono">#{entry.blockHeight}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Timestamp:</span>{" "}
                        <span className="text-white">{new Date(entry.timestamp).toISOString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Actor:</span>{" "}
                        <span className="text-white">{entry.actor}</span>
                        <span className="text-gray-600 ml-1">({entry.actorType})</span>
                      </div>
                      {entry.plotId && (
                        <div>
                          <span className="text-gray-500">Plot:</span>{" "}
                          <span className="text-cosmic-teal font-mono">{entry.plotId}</span>
                        </div>
                      )}
                      {entry.proposalId && (
                        <div>
                          <span className="text-gray-500">Proposal:</span>{" "}
                          <span className="text-amber font-mono">{entry.proposalId}</span>
                          {entry.voteDirection && (
                            <span className={`ml-2 font-bold ${entry.voteDirection === "for" ? "text-emerald-400" : "text-red-400"}`}>
                              {entry.voteDirection.toUpperCase()}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="sm:col-span-2">
                        <span className="text-gray-500">Details:</span>{" "}
                        <span className="text-gray-300">{entry.details}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-gray-500">Signature:</span>{" "}
                        <span className="text-gray-600 font-mono">{entry.signature}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Prev Hash:</span>{" "}
                        <span className="text-gray-600 font-mono text-[10px]">{entry.previousHash.slice(0, 16)}...</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Hash:</span>{" "}
                        <span className="text-gray-600 font-mono text-[10px]">{entry.hash}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-600 text-center">
        All entries are chained — each hash depends on the previous. Tampering with any record breaks the chain.
      </p>
    </section>
  );
}
