"use client";

export default function BotApiSection() {
  const codeExample = `// GET /api/v1/plots/available?territory=southern-peaks&min_solar_hours=800

{
  "plots": [
    {
      "plot_id": "SP-0119",
      "territory": "Southern Peaks",
      "coordinates": { "lat": -84.7, "lon": 31.2 },
      "area_acres": 0.25,
      "elevation_m": 2847,
      "solar_exposure_hrs": 847,
      "composition": {
        "iron_oxide_pct": 14.2,
        "titanium_dioxide_pct": 3.1,
        "silicon_dioxide_pct": 45.8
      },
      "terrain_class": "highland_ridge",
      "shadow_analysis": {
        "permanently_shadowed_pct": 0,
        "nearest_psr_km": 12.4
      },
      "temperature_range_c": { "min": -173, "max": 127 },
      "habitability_score": 72,
      "price_usd": 5.00,
      "status": "available",
      "lobster_approved": true
    }
  ],
  "total": 45,
  "page": 1,
  "per_page": 10
}`;

  return (
    <section id="api" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Copy side */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-nebula-purple bg-nebula-purple/10 rounded-full px-3 py-1 mb-6">
              <span className="w-2 h-2 rounded-full bg-nebula-purple animate-pulse" />
              API v1
            </div>

            <h2 className="section-heading mb-6">
              Built for <span className="text-gradient-teal">Bots</span>, Too.
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Lunar Lobsters is the first lunar registry designed for both human
              and artificial intelligence. AI agents can browse, evaluate, and
              purchase plots through our API — no UI required.
            </p>

            <p className="text-gray-400 leading-relaxed mb-8">
              Solar exposure data. Mineral composition. Terrain classification.
              Habitability scoring. Everything an intelligent agent needs to make
              an informed acquisition. Because even AIs deserve prime real estate.
            </p>

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

          {/* Code side */}
          <div className="relative">
            {/* Terminal chrome */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117]">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-gray-500 ml-2 font-mono">lunar-lobsters-api</span>
              </div>

              {/* Code content */}
              <pre className="p-5 text-xs sm:text-sm font-mono overflow-x-auto text-gray-300 leading-relaxed max-h-[500px] overflow-y-auto">
                <code>{codeExample}</code>
              </pre>
            </div>

            {/* Glow effect */}
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
