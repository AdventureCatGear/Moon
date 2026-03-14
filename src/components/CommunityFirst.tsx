"use client";

const safeguards = [
  {
    title: "Community-First Access",
    description:
      "Verified residents get free reports before outside investors. Your neighborhood, your data, your advantage.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Anti-Speculation Guardrails",
    description:
      "No bulk data exports. No predictive analytics for institutional buyers. We cap access to prevent predatory investment patterns.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Revenue Reinvestment",
    description:
      "5-15% of all revenue flows directly to community land trusts, affordable housing, and renter protection funds. Publicly tracked.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "Displacement Alerts",
    description:
      "When rent spikes >15% or eviction rates jump, residents get early warnings and Tier 4 access is automatically restricted.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    title: "Zero-Knowledge Verification",
    description:
      "Resident verification uses privacy-preserving hashes. We never store your documents — only a 90-day expiring proof of residency.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: "Community Advisory Board",
    description:
      "3 residents, 1 local business owner, 1 housing advocate — with veto power over feature launches and quarterly fund audits.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

const riskIndicators = [
  { trigger: "Rent increase >15% YoY", action: "Alert residents + freeze Tier 4 access" },
  { trigger: "Home price >20% YoY", action: "Mandatory community notice period" },
  { trigger: "Eviction rate >5% annual", action: "Emergency fund release" },
  { trigger: "Dev permits >$10M in 6mo", action: "Impact assessment required" },
  { trigger: "Historically redlined area", action: "15% reinvestment + community consultation" },
];

export default function CommunityFirst() {
  return (
    <section id="community" className="py-24 px-4 bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            Community <span className="text-gradient-emerald">First</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Ethics aren&apos;t bolted on &mdash; they&apos;re built in. Every
            feature is designed to protect communities from displacement while
            providing value.
          </p>
        </div>

        {/* Safeguard grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {safeguards.map((item) => (
            <div
              key={item.title}
              className="glass rounded-xl p-6 hover:border-emerald-500/30 transition-all duration-300"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 mb-4">
                {item.icon}
              </span>
              <h3 className="text-lg font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Automated risk triggers */}
        <div className="glass-strong rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">
            Automated Gentrification Risk Triggers
          </h3>
          <div className="space-y-3">
            {riskIndicators.map((indicator) => (
              <div
                key={indicator.trigger}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-lg bg-slate-800/50"
              >
                <div className="flex items-center gap-2 sm:w-1/2">
                  <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                  <span className="text-sm font-medium text-slate-300">
                    {indicator.trigger}
                  </span>
                </div>
                <svg
                  className="w-4 h-4 text-slate-600 hidden sm:block shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
                <span className="text-sm text-teal-400 sm:w-1/2">
                  {indicator.action}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pledge */}
        <div className="mt-12 text-center">
          <blockquote className="glass rounded-xl p-8 max-w-3xl mx-auto border-l-4 border-emerald-500">
            <p className="text-slate-300 italic leading-relaxed">
              &quot;We commit to building tools that serve existing communities
              first. Our success will be measured by community stability, not
              extraction. If we violate this commitment, we will publicly
              acknowledge it and take corrective action within 30 days.&quot;
            </p>
            <footer className="mt-4 text-sm text-slate-500">
              &mdash; HomeBase Intel Community Pledge
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
