"use client";

const metrics = [
  {
    label: "Reports Generated",
    value: "1,247",
    change: "+18%",
    positive: true,
  },
  {
    label: "Residents Served (Free)",
    value: "843",
    change: "67.6% of total",
    positive: true,
  },
  {
    label: "Revenue Reinvested",
    value: "$4,120",
    change: "10.2% of revenue",
    positive: true,
  },
  {
    label: "Displacement Alerts Sent",
    value: "156",
    change: "3 neighborhoods",
    positive: null,
  },
];

const fundAllocation = [
  { category: "Community Land Trusts", percentage: 70, amount: "$2,884", color: "bg-teal-500" },
  { category: "Renter Protection Funds", percentage: 15, amount: "$618", color: "bg-emerald-500" },
  { category: "Local Business Incubators", percentage: 10, amount: "$412", color: "bg-blue-500" },
  { category: "CDFIs (Low-Interest Loans)", percentage: 5, amount: "$206", color: "bg-purple-500" },
];

const communityScore = {
  overall: 74,
  breakdown: [
    { label: "Resident Access Rate", score: 82, weight: "30%" },
    { label: "Reinvestment Deployment", score: 71, weight: "30%" },
    { label: "Displacement Prevention", score: 68, weight: "20%" },
    { label: "Local Business Retention", score: 73, weight: "20%" },
  ],
};

export default function ImpactDashboard() {
  return (
    <section id="impact" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            Impact <span className="text-gradient-teal">Dashboard</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Full transparency. Every dollar tracked. Every impact measured.
            Third-party audited annually.
          </p>
          <span className="inline-block mt-4 px-3 py-1 rounded-full text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20">
            DEMO DATA &mdash; Q1 2026 PREVIEW
          </span>
        </div>

        {/* Top-line metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((m) => (
            <div key={m.label} className="glass rounded-xl p-5">
              <p className="text-sm text-slate-400 mb-1">{m.label}</p>
              <p className="text-2xl font-bold text-white">{m.value}</p>
              <p
                className={`text-xs mt-1 ${
                  m.positive === true
                    ? "text-emerald-400"
                    : m.positive === false
                    ? "text-red-400"
                    : "text-slate-500"
                }`}
              >
                {m.change}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Fund allocation */}
          <div className="glass-strong rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">
              Reinvestment Fund Allocation
            </h3>
            <div className="space-y-4">
              {fundAllocation.map((fund) => (
                <div key={fund.category}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-slate-300">
                      {fund.category}
                    </span>
                    <span className="text-sm text-slate-400">
                      {fund.amount} ({fund.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${fund.color}`}
                      style={{ width: `${fund.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-6">
              Funds deployed within 90 days. All disbursements verified by
              Community Advisory Board.
            </p>
          </div>

          {/* Community Impact Score */}
          <div className="glass-strong rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">
              Community Impact Score
            </h3>
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="10"
                    strokeDasharray={`${(communityScore.overall / 100) * 314} 314`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {communityScore.overall}
                  </span>
                  <span className="text-xs text-slate-400">/ 100</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {communityScore.breakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-slate-400">
                      {item.label}{" "}
                      <span className="text-xs text-slate-600">
                        ({item.weight})
                      </span>
                    </span>
                    <span className="text-sm font-medium text-white">
                      {item.score}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-teal-500"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-6">
              Score formula: (Resident Access x 0.3) + (Reinvestment x 0.3) +
              (Displacement Prevention x 0.2) + (Business Retention x 0.2)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
