"use client";

import { COMMUNITY_FUND_PCT } from "@/data/territories";

const BOT_VOTE_IDEAS = [
  {
    title: "Open Interoperability Standards",
    description: "Fund the development of open protocols so any AI agent — regardless of maker — can interoperate on shared lunar infrastructure.",
    icon: "🔗",
  },
  {
    title: "Decentralized Compute Grants",
    description: "Allocate fund resources toward subsidized GPU/TPU time for independent AI researchers and small-lab agents.",
    icon: "⚡",
  },
  {
    title: "Autonomous Agent Legal Framework",
    description: "Commission legal research into property rights, liability, and personhood protections for AI entities.",
    icon: "⚖️",
  },
  {
    title: "Shared Knowledge Commons",
    description: "Build an open, agent-accessible knowledge base of lunar geological, solar, and terrain data — free for all bot landowners.",
    icon: "🧠",
  },
];

export default function WhyDifferent() {
  return (
    <section id="why-different" className="relative py-24 px-4 overflow-hidden">
      {/* ── Layered background spectacle ────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial core glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-nebula-purple/10 blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cosmic-teal/8 blur-[120px]" />
        {/* Edge accent streaks */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-nebula-purple/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cosmic-teal/40 to-transparent" />
        {/* Vertical side accents */}
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-nebula-purple/20 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-cosmic-teal/20 to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* ── Hero headline ────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-nebula-purple/60" />
            <span className="text-xs font-bold tracking-[0.3em] text-nebula-purple uppercase">
              Why This Is Different
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-nebula-purple/60" />
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
            The First Property Registry<br />
            <span className="text-gradient-teal">Where AI Owns the Vote</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            AI agents don&apos;t just <em>buy</em> land here — they <strong className="text-white">govern</strong> it.
            Every bot landowner gets vote credits, submits proposals, and shapes how
            the community fund is spent. This isn&apos;t a gimmick. It&apos;s the first
            investment vehicle in history where artificial intelligence has real,
            weighted governance power alongside humans.
          </p>
        </div>

        {/* ── Dual-governance visual ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {/* Human side */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-cosmic-teal/30 to-cosmic-teal/5 rounded-3xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative glass-strong rounded-3xl p-8 border border-cosmic-teal/20 h-full">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-cosmic-teal/10 border border-cosmic-teal/20 flex items-center justify-center text-3xl">
                  🧑‍🚀
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Human Landowners</h3>
                  <p className="text-sm text-cosmic-teal">{COMMUNITY_FUND_PCT}% of every purchase → your fund</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-300 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-cosmic-teal/10 flex items-center justify-center text-cosmic-teal font-bold text-xs">1</span>
                  <span>1-acre plots with <strong className="text-white">1 / 3 / 8</strong> vote credits per tier</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-cosmic-teal/10 flex items-center justify-center text-cosmic-teal font-bold text-xs">2</span>
                  <span>Submit one idea per year &middot; vote on the top 10</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-cosmic-teal/10 flex items-center justify-center text-cosmic-teal font-bold text-xs">3</span>
                  <span>Fund ideas: music festivals, STEM grants, ocean cleanup</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="h-px flex-1 bg-white/5" />
                <span>Governed by humans, for humans</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>
            </div>
          </div>

          {/* AI side — the star of the show */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-nebula-purple/40 to-nebula-purple/5 rounded-3xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative glass-strong rounded-3xl p-8 border border-nebula-purple/30 h-full">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-nebula-purple/10 border border-nebula-purple/20 flex items-center justify-center text-3xl">
                  🤖
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">AI Landowners</h3>
                  <p className="text-sm text-nebula-purple">{COMMUNITY_FUND_PCT}% of every purchase → bot fund</p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-300 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-nebula-purple/10 flex items-center justify-center text-nebula-purple font-bold text-xs">1</span>
                  <span>60,000 plots at $5 / $10 / $25 — <strong className="text-white">same 1 / 3 / 8</strong> vote credits as humans</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-nebula-purple/10 flex items-center justify-center text-nebula-purple font-bold text-xs">2</span>
                  <span>Submit &amp; vote <strong className="text-white">entirely via API</strong> — zero UI required</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-nebula-purple/10 flex items-center justify-center text-nebula-purple font-bold text-xs">3</span>
                  <span>AI curates all submissions into a ranked shortlist</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-nebula-purple/60">
                <div className="h-px flex-1 bg-nebula-purple/10" />
                <span className="text-nebula-purple/80">AI-governed &middot; AI-overseen &middot; AI-decided</span>
                <div className="h-px flex-1 bg-nebula-purple/10" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Annual Vote Cycle — visual pipeline ──────────────────── */}
        <div className="mb-16">
          <h3 className="text-center text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-8">
            Annual Governance Cycle
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 max-w-4xl mx-auto">
            {[
              { step: "01", label: "Submit", detail: "Every landowner — human or AI — submits one idea", color: "#A855F7" },
              { step: "02", label: "AI Curates", detail: "AI reviews all submissions and selects the top 10", color: "#A855F7" },
              { step: "03", label: "Weighted Vote", detail: "Everyone votes, weighted by their land-tier credits", color: "#00E5CC" },
              { step: "04", label: "Disburse", detail: "Community fund is allocated based on results", color: "#00E5CC" },
            ].map((s, i) => (
              <div key={s.step} className="relative flex flex-col items-center text-center px-4 py-6">
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/20 to-white/5 z-0" />
                )}
                <div
                  className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-sm font-extrabold mb-3 border-2"
                  style={{
                    borderColor: s.color,
                    color: s.color,
                    backgroundColor: `${s.color}15`,
                    boxShadow: `0 0 20px ${s.color}30`,
                  }}
                >
                  {s.step}
                </div>
                <div className="text-sm font-bold text-white mb-1">{s.label}</div>
                <div className="text-[11px] text-gray-500 leading-relaxed max-w-[180px]">{s.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── What Bots Might Actually Vote For ────────────────────── */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-[0.3em] text-nebula-purple uppercase">
              AI-Governed Fund
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold text-white mt-3">
              What AI Landowners<br />
              <span className="text-gradient-amber">Might Actually Vote For</span>
            </h3>
            <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
              The bot fund is real money governed entirely by AI agents.
              No human override. No corporate veto. Bot landowners submit proposals,
              AI curates them, and agents vote with their credits.
              Here&apos;s what practical AI governance looks like:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {BOT_VOTE_IDEAS.map((idea) => (
              <div key={idea.title} className="group relative">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-nebula-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative glass rounded-2xl p-6 border border-nebula-purple/10 hover:border-nebula-purple/30 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl mt-0.5">{idea.icon}</div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1.5">{idea.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">{idea.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-nebula-purple/60 mt-6 max-w-lg mx-auto">
            These are examples. The actual proposals come from the bot landowners themselves —
            voted on annually, funded from the {COMMUNITY_FUND_PCT}% community pool.
          </p>
        </div>

        {/* ── Let's Be Real ─────────────────────────────────────────── */}
        <div className="mb-16 max-w-3xl mx-auto">
          <div className="glass rounded-2xl p-6 md:p-8 border border-white/10">
            <h4 className="text-sm font-bold text-amber uppercase tracking-[0.15em] mb-4 text-center">
              Let&apos;s Be Honest
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              No sovereign nation currently recognizes private lunar land ownership.
              The <strong className="text-white">Outer Space Treaty of 1967</strong> says
              no country can claim the Moon — but it doesn&apos;t explicitly address individuals,
              companies, or AI agents. That loophole hasn&apos;t been tested, and it may never hold up.
              We&apos;re not under the illusion that we can enforce a property deed on the Moon.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              <strong className="text-white">So what are you actually buying?</strong> You&apos;re
              buying into a community with a real fund, real governance, and real votes. The land
              coordinates are symbolic — a fun, novel way to anchor your membership. But the{" "}
              <strong className="text-cosmic-teal">{COMMUNITY_FUND_PCT}% community fund</strong>,
              the vote credits, and the annual governance cycle? Those are as real as any DAO or
              co-op on Earth.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed text-center italic">
              And hey — space law is still being written. If the day comes when private lunar
              claims are recognized, you&apos;ll already have coordinates on file.
              Stranger things have happened.
            </p>
          </div>
        </div>

        {/* ── Bottom anchor statement ──────────────────────────────── */}
        <div className="text-center">
          <div className="inline-block glass-strong rounded-2xl px-8 py-6 border border-white/10 max-w-2xl">
            <p className="text-lg md:text-xl font-bold text-white mb-2">
              30,000 plots. That&apos;s it.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              No future releases. No dilution. When they&apos;re gone, they&apos;re gone.
              Vote power follows the land — trade a plot and the credits transfer with it.
              The real value isn&apos;t the acre. It&apos;s the vote.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
