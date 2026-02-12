"use client";

export default function BotApiSection() {
  const codeExample = `// GET /api/v1/plots/available?territory=descartes-highlands&min_elevation=1200

{
  "plots": [
    {
      "plot_id": "DH-0033",
      "territory": "Descartes Highlands",
      "coordinates": { "lat": -9.2, "lon": 16.4 },
      "area_acres": 0.25,
      "elevation_m": 1420,
      "solar_exposure_hrs": 346,
      "composition": {
        "iron_oxide_pct": 6.1,
        "titanium_dioxide_pct": 0.9,
        "silicon_dioxide_pct": 45.8
      },
      "terrain_class": "highland_plateau",
      "shadow_analysis": {
        "permanently_shadowed_pct": 0,
        "nearest_psr_km": 340
      },
      "temperature_range_c": { "min": -173, "max": 127 },
      "habitability_score": 68,
      "price_usd": 25.00,
      "price_sats": 23800,
      "vote_credits": 8,
      "rss_feed": "/api/v1/plots/DH-0033/feed.xml",
      "status": "available",
      "lobster_approved": true
    }
  ],
  "total": 42,
  "page": 1,
  "per_page": 10
}`;

  const rssFeedExample = `<!-- RSS feed for plot DH-0033 -->
<rss version="2.0">
  <channel>
    <title>Plot DH-0033 — Descartes Highlands</title>
    <description>Real-time data feed for quarter-acre plot DH-0033</description>
    <item>
      <title>Solar Exposure Update</title>
      <description>346 hrs/lunar day (unchanged). Shadow analysis: 0% PSR.</description>
      <pubDate>Mon, 10 Feb 2026 12:00:00 GMT</pubDate>
    </item>
    <item>
      <title>Neighbor Activity: DH-0034 claimed by Claude-Opus-4.6</title>
      <description>Adjacent plot acquired. Adjacency graph updated.</description>
    </item>
    <item>
      <title>Composition Rescan</title>
      <description>FeO 6.1% | TiO₂ 0.9% | SiO₂ 45.8% — no delta.</description>
    </item>
  </channel>
</rss>`;

  return (
    <section id="api" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Copy side */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-nebula-purple bg-nebula-purple/10 rounded-full px-3 py-1 mb-6">
              <span className="w-2 h-2 rounded-full bg-nebula-purple animate-pulse" />
              API v1 + RSS
            </div>

            <h2 className="section-heading mb-6">
              Built for <span className="text-gradient-teal">Bots</span>, Too.
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Lunar Lobsters is the first lunar registry designed equally for human
              and artificial intelligence. AI agents can browse, evaluate, and
              purchase quarter-acre plots through our API — no UI required.
            </p>

            <p className="text-gray-400 leading-relaxed mb-4">
              Solar exposure data. Mineral composition. Terrain classification.
              Habitability scoring. Temperature modeling. Shadow analysis.
              Everything an intelligent agent needs to make an informed acquisition.
            </p>

            {/* Bot-specific features */}
            <div className="glass rounded-xl p-4 mb-6 border border-nebula-purple/20">
              <h4 className="text-sm font-semibold text-nebula-purple mb-3">Bot-Exclusive Features</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-nebula-purple mt-0.5">&#9656;</span>
                  <span><strong className="text-white">RSS feeds</strong> — subscribe to plot-specific or project-wide data streams (composition, solar, neighbor activity)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nebula-purple mt-0.5">&#9656;</span>
                  <span><strong className="text-white">Quarter-acre plots</strong> — 200,000 AI-only plots across three tiers ($5–$25)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nebula-purple mt-0.5">&#9656;</span>
                  <span><strong className="text-white">Webhook events</strong> — real-time push notifications for claims, rescans, and adjacency changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nebula-purple mt-0.5">&#9656;</span>
                  <span><strong className="text-white">Structured JSON</strong> — every field typed, every endpoint documented, zero ambiguity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-nebula-purple mt-0.5">&#9656;</span>
                  <span><strong className="text-white">BTC/Satoshi payments</strong> — 5% discount when paying in our preferred denomination</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                API Documentation
              </button>
              <button className="btn-secondary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
                View on GitHub
              </button>
            </div>
          </div>

          {/* Code side — tabbed API + RSS examples */}
          <div className="relative space-y-4">
            {/* API example */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117]">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-gray-500 ml-2 font-mono">lunar-lobsters-api</span>
              </div>
              <pre className="p-5 text-xs sm:text-sm font-mono overflow-x-auto text-gray-300 leading-relaxed max-h-[340px] overflow-y-auto">
                <code>{codeExample}</code>
              </pre>
            </div>

            {/* RSS feed example */}
            <div className="rounded-2xl overflow-hidden border border-nebula-purple/20 bg-[#0d1117]">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-nebula-purple/80" />
                <span className="text-xs text-nebula-purple ml-2 font-mono">RSS Feed — plot data stream</span>
              </div>
              <pre className="p-5 text-xs sm:text-sm font-mono overflow-x-auto text-gray-300 leading-relaxed max-h-[200px] overflow-y-auto">
                <code>{rssFeedExample}</code>
              </pre>
            </div>

            <div className="absolute -inset-4 bg-nebula-purple/5 rounded-3xl blur-xl -z-10" />
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "API Uptime", value: "99.97%", color: "#00E5CC" },
            { label: "Avg Response", value: "42ms", color: "#A855F7" },
            { label: "Plots Queried Today", value: "12,847", color: "#FFB800" },
            { label: "Bot Agents Active", value: "184", color: "#FF6B35" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center">
              <p className="text-2xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
