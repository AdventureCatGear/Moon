"use client";

const tiers = [
  {
    name: "Resident",
    tier: "Tier 1",
    price: "Free",
    priceSub: "Verified residents only",
    description: "Full neighborhood intelligence for people who live here.",
    features: [
      "Full neighborhood report",
      "Displacement risk alerts",
      "Development pipeline data",
      "SMS/email early warnings",
      "Community Advisory Board vote",
    ],
    highlight: true,
    badge: "Community First",
    cta: "Verify Residency",
    reinvestment: "0%",
  },
  {
    name: "Local Business",
    tier: "Tier 2",
    price: "$2",
    priceSub: "per report (80% discount)",
    description: "For local agents, businesses, and community organizations.",
    features: [
      "Full reports + API access",
      "Agent referral program",
      "Bulk report pricing",
      "Custom branding option",
      "Partner dashboard",
    ],
    highlight: false,
    badge: null,
    cta: "Get Started",
    reinvestment: "5%",
  },
  {
    name: "Standard",
    tier: "Tier 3",
    price: "$9.99",
    priceSub: "per report, one-time",
    description: "For homebuyers, renters, and anyone making informed decisions.",
    features: [
      "Complete neighborhood report",
      "Property history + tax records",
      "School ratings + demographics",
      "Environmental risk assessment",
      "Instant PDF download",
    ],
    highlight: false,
    badge: "Most Popular",
    cta: "Get Your Report",
    reinvestment: "10%",
  },
  {
    name: "Institutional",
    tier: "Tier 4",
    price: "$19.99",
    priceSub: "per report + 15% impact fee",
    description: "For institutional buyers. Restricted data access with mandatory disclosure.",
    features: [
      "Limited data access",
      "No predictive analytics",
      "No bulk exports",
      "Mandatory disclosure",
      "Impact fee funds community",
    ],
    highlight: false,
    badge: null,
    cta: "Contact Us",
    reinvestment: "15%",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            <span className="text-gradient-teal">Fair</span> Pricing
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            No subscriptions. No lock-in. Residents always come first.
            Revenue reinvested into community development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-6 flex flex-col ${
                tier.highlight
                  ? "glass-strong border-teal-500/30 glow-teal"
                  : "glass"
              }`}
            >
              {tier.badge && (
                <span
                  className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-semibold ${
                    tier.highlight
                      ? "bg-teal-500 text-slate-950"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {tier.badge}
                </span>
              )}

              <div className="mb-4">
                <span className="text-xs font-mono text-slate-500 uppercase">
                  {tier.tier}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {tier.name}
                </h3>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-bold text-white">
                  {tier.price}
                </span>
                <span className="text-sm text-slate-400 block mt-1">
                  {tier.priceSub}
                </span>
              </div>

              <p className="text-sm text-slate-400 mb-6">
                {tier.description}
              </p>

              <ul className="space-y-3 mb-6 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-slate-300"
                  >
                    <svg
                      className="w-4 h-4 text-teal-400 mt-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <button
                  className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${
                    tier.highlight
                      ? "btn-primary justify-center"
                      : "btn-secondary justify-center"
                  }`}
                >
                  {tier.cta}
                </button>
                <p className="text-xs text-slate-500 text-center mt-3">
                  {tier.reinvestment} reinvested to community
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
