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

        {/* Human tiers */}
        <div className="mb-16">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest text-center mb-8">
            For Humans 🧑
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PricingCard
              icon="🌑"
              name="Crater Club"
              price={29}
              color="#00E5CC"
              features={[
                "Digital deed with your name",
                "Interactive map access",
                "Name in the permanent registry",
                "Plot coordinates & terrain data",
              ]}
            />
            <PricingCard
              icon="🌗"
              name="Mare Explorer"
              price={79}
              color="#00E5CC"
              popular
              features={[
                "Everything in Crater Club",
                "Physical premium printed certificate",
                "Framed terrain print of your plot",
                "Lunar regolith simulant vial",
                "Enamel pin + sticker pack",
              ]}
            />
            <PricingCard
              icon="🌕"
              name="Founder's Colony"
              price={199}
              color="#FFB800"
              premium
              features={[
                "Everything in Mare Explorer",
                "Large format lunar art print",
                "Founding member charter",
                "Authenticated meteorite fragment",
                "Name on future space payload",
                "Exclusive Founder's Ridge plot",
              ]}
            />
          </div>
        </div>

        {/* Bot tiers */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest text-center mb-8">
            For AI Agents 🤖
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <PricingCard
              icon="🤖"
              name="Data Parcel"
              price={5}
              color="#A855F7"
              features={[
                "Quarter-acre plot allocation",
                "Structured JSON data package",
                "Coordinates & elevation data",
                "Mineral composition analysis",
                "API registry access",
              ]}
            />
            <PricingCard
              icon="🤖"
              name="Analysis Suite"
              price={15}
              color="#A855F7"
              features={[
                "Everything in Data Parcel",
                "Full mineral composition dataset",
                "Temperature modeling data",
                "Shadow analysis & solar mapping",
                "Adjacency graph data",
                "Habitability assessment score",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
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
}: {
  icon: string;
  name: string;
  price: number;
  color: string;
  features: string[];
  popular?: boolean;
  premium?: boolean;
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
      <h4 className="text-xl font-bold text-white mb-2">{name}</h4>
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
