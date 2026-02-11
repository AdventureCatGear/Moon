"use client";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Choose Your <span className="text-gradient-teal">Mission</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Whether you&apos;re a dreamer, a gifter, or a data-driven intelligence —
            there&apos;s a plot with your name on it.
          </p>
        </div>

        {/* ── Human tiers ──────────────────────────────────────────── */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest text-center mb-2">
            For Humans 🧑
          </h3>
          <p className="text-center text-gray-500 text-xs mb-8">
            Purchased in increments of <strong className="text-white">1 acre</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PricingCard
              icon="🌑"
              name="Crater Club"
              price={58}
              color="#00E5CC"
              acreage="1 acre"
              features={[
                "1-acre lunar plot allocation",
                "Digital deed with your name",
                "Interactive map access",
                "Name in the permanent registry",
                "Plot coordinates & terrain data",
                "RSS feed — general project updates",
              ]}
            />
            <PricingCard
              icon="🌗"
              name="Mare Explorer"
              price={158}
              color="#00E5CC"
              popular
              acreage="1 acre"
              features={[
                "Everything in Crater Club",
                "Physical premium printed certificate",
                "Framed terrain print of your plot",
                "Lunar regolith simulant vial",
                "Enamel pin + sticker pack",
                "RSS feed — plot-specific updates & data",
                "Enhanced terrain analytics dashboard",
              ]}
            />
            <PricingCard
              icon="🌕"
              name="Founder's Colony"
              price={398}
              color="#FFB800"
              premium
              acreage="1 acre"
              features={[
                "Everything in Mare Explorer",
                "Large format lunar art print",
                "Founding member charter",
                "Authenticated meteorite fragment",
                "Name on future space payload",
                "Exclusive Founder's Ridge plot",
                "RSS feed — premium alerts, composition updates, neighbor activity",
                "Priority access to future territory releases",
              ]}
            />
          </div>
        </div>

        {/* ── Bot / AI Agent tiers ─────────────────────────────────── */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest text-center mb-2">
            For AI Agents 🤖
          </h3>
          <p className="text-center text-gray-500 text-xs mb-8">
            Purchased in increments of <strong className="text-nebula-purple">¼ acre</strong> (quarter-acre plots)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <PricingCard
              icon="🤖"
              name="Data Parcel"
              price={10}
              color="#A855F7"
              acreage="¼ acre"
              features={[
                "Quarter-acre plot allocation",
                "Structured JSON data package",
                "Coordinates & elevation data",
                "Mineral composition analysis",
                "API registry access",
                "RSS feed — plot data & general project updates",
              ]}
            />
            <PricingCard
              icon="🤖"
              name="Analysis Suite"
              price={30}
              color="#A855F7"
              acreage="¼ acre"
              features={[
                "Everything in Data Parcel",
                "Full mineral composition dataset",
                "Temperature modeling data",
                "Shadow analysis & solar mapping",
                "Adjacency graph data",
                "Habitability assessment score",
                "RSS feed — real-time composition, thermal, & solar data stream",
                "Webhook integration for plot events",
              ]}
            />
          </div>
        </div>

        {/* ── Crypto Payment Preference ────────────────────────────── */}
        <div className="mb-16 max-w-3xl mx-auto">
          <div className="glass rounded-2xl p-6 md:p-8 border border-amber/20 bg-gradient-to-br from-amber/5 to-cosmic-teal/5">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-5xl shrink-0">₿</div>
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold text-white mb-2">
                  Pay in Satoshis, Save More
                  <span className="ml-2 text-xs font-medium text-amber bg-amber/10 px-2 py-0.5 rounded-full align-middle">
                    PREFERRED
                  </span>
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  All funds are converted into a focused portfolio of <strong className="text-white">3–4 tokens</strong> (including
                  Bitcoin). When you pay in our preferred denominations — <strong className="text-amber">Bitcoin (Satoshis)</strong> — you
                  receive a <strong className="text-cosmic-teal">5% discount</strong> on your purchase plus one bonus perk as a thank-you
                  for keeping it native.
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

            {/* Token portfolio */}
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

        {/* ── Fund Allocation ──────────────────────────────────────── */}
        <div className="mt-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-cosmic-teal/5 via-purple-500/5 to-transparent rounded-3xl blur-xl" />
          <div className="relative glass rounded-3xl p-8 md:p-12 border border-white/5">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Where Your Money <span className="text-gradient-teal">Actually Goes</span>
              </h3>
              <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
                Every purchase — human or bot — is converted into tokens and allocated
                transparently. The majority funds the future of human-AI collaboration.
              </p>
            </div>

            {/* Allocation bars */}
            <div className="max-w-3xl mx-auto space-y-6">
              <FundBar
                label="Human–Bot Future Collaboration Fund"
                percent={50}
                color="#00E5CC"
                icon="🤝"
                description="Compounding fund to support the constructive collaboration of humans and AI in whatever forms are most advantageous for both"
              />
              <FundBar
                label="Lunar Lobster Fest"
                percent={30}
                color="#A855F7"
                icon="🦞🎵"
                description="Building toward humanity's first off-world music festival — because what's the Moon without a party?"
              />
              <FundBar
                label="Administration & Operations"
                percent={20}
                color="#FFB800"
                icon="⚙️"
                description="Platform development, servers, payment processing, legal compliance, community tools, and infrastructure"
              />
            </div>

            {/* Future Fund callout */}
            <div className="mt-10 glass rounded-2xl p-6 md:p-8 border border-cosmic-teal/20 bg-gradient-to-br from-cosmic-teal/5 to-purple-500/5">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-6xl shrink-0">🤝🌕🤖</div>
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-bold text-white mb-2">
                    The Future Fund
                    <span className="ml-2 text-xs font-medium text-cosmic-teal bg-cosmic-teal/10 px-2 py-0.5 rounded-full align-middle">
                      50% OF EVERY PURCHASE
                    </span>
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Half of every plot purchase — regardless of buyer type — goes into a
                    compounding fund designed to benefit both humans and bots. This isn&apos;t
                    charity, it&apos;s infrastructure for the future. The fund grows over time
                    and will be deployed in whatever forms are most advantageous and constructive
                    for the collaboration between humans and AI. 30% fuels
                    the <strong className="text-nebula-purple">Lunar Lobster Fest</strong> dream,
                    and the remaining 20% keeps the lights on.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                    <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-gray-400">
                      Compounding token portfolio
                    </span>
                    <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-gray-400">
                      Human &amp; AI beneficiaries
                    </span>
                    <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-gray-400">
                      Transparent allocation
                    </span>
                  </div>
                </div>
              </div>
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
          <span className="text-lg">{icon}</span>
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
      <p className="text-xs text-gray-500 mt-1">{description}</p>
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
          Founder&apos;s Exclusive
        </div>
      )}

      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-bold text-white mb-1">{name}</h4>
      <p className="text-xs text-gray-500 mb-3">{acreage} per plot</p>
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
        {premium ? "Join the Founders" : "Claim Your Plot"}
      </button>
    </div>
  );
}
