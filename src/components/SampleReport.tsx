"use client";

import { useState } from "react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "schools", label: "Schools" },
  { id: "environment", label: "Environment" },
  { id: "demographics", label: "Demographics" },
  { id: "displacement", label: "Displacement Risk" },
];

const mockData = {
  overview: {
    address: "1247 Springdale Rd, Austin, TX 78721",
    propertyType: "Single Family Residence",
    yearBuilt: 2003,
    sqft: "1,842",
    lotSize: "0.18 acres",
    lastSale: "$385,000 (Jun 2023)",
    taxAssessed: "$372,400",
    zoning: "SF-3 (Single Family)",
    neighborhood: "Govalle",
    walkScore: 62,
    transitScore: 38,
  },
  schools: [
    { name: "Govalle Elementary", type: "Elementary", rating: 7, distance: "0.4 mi" },
    { name: "Martin Middle School", type: "Middle", rating: 6, distance: "1.2 mi" },
    { name: "Eastside Memorial HS", type: "High", rating: 5, distance: "0.8 mi" },
  ],
  environment: {
    floodZone: "Zone X (Minimal Risk)",
    floodScore: 3,
    fireScore: 2,
    heatScore: 7,
    airQuality: "Moderate (AQI 65)",
    climateRisk: "Medium",
  },
  demographics: {
    population: "12,847",
    medianIncome: "$52,300",
    medianAge: 34,
    ownerOccupied: "45%",
    renterOccupied: "55%",
    diversityIndex: 0.78,
  },
  displacement: {
    riskLevel: "Elevated",
    rentIncrease: "+18.2% YoY",
    homePriceChange: "+12.4% YoY",
    evictionRate: "3.2%",
    newPermits: 14,
    alertActive: true,
  },
};

function RatingBar({ value, max = 10, color = "teal" }: { value: number; max?: number; color?: string }) {
  const colorMap: Record<string, string> = {
    teal: "bg-teal-500",
    red: "bg-red-500",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
  };
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${colorMap[color] || colorMap.teal}`}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
      <span className="text-sm font-mono text-slate-400 w-8 text-right">
        {value}/{max}
      </span>
    </div>
  );
}

export default function SampleReport() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <section id="sample-report" className="py-24 px-4 bg-slate-900/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">
            Sample <span className="text-gradient-teal">Report</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Here&apos;s what you get for $9.99 &mdash; comprehensive
            neighborhood intelligence in one instant download.
          </p>
        </div>

        {/* Report card */}
        <div className="glass-strong rounded-2xl overflow-hidden">
          {/* Report header */}
          <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-mono">
                <span>HOMEBASE INTEL REPORT</span>
                <span>&bull;</span>
                <span>Generated Mar 14, 2026</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {mockData.overview.address}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20">
              DEMO REPORT
            </span>
          </div>

          {/* Tabs */}
          <div className="border-b border-white/10 px-6 overflow-x-auto">
            <div className="flex gap-0 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-teal-500 text-teal-400"
                      : "border-transparent text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="grid sm:grid-cols-2 gap-6">
                {Object.entries(mockData.overview)
                  .filter(([k]) => k !== "address")
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-sm text-slate-400 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-sm font-medium text-white">
                        {value}
                      </span>
                    </div>
                  ))}
              </div>
            )}

            {activeTab === "schools" && (
              <div className="space-y-4">
                {mockData.schools.map((school) => (
                  <div
                    key={school.name}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-slate-800/50"
                  >
                    <div>
                      <h4 className="font-semibold text-white">{school.name}</h4>
                      <p className="text-xs text-slate-500">
                        {school.type} &bull; {school.distance}
                      </p>
                    </div>
                    <div className="w-full sm:w-48">
                      <RatingBar
                        value={school.rating}
                        color={school.rating >= 7 ? "emerald" : school.rating >= 5 ? "amber" : "red"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "environment" && (
              <div className="space-y-5">
                <div className="p-4 rounded-lg bg-slate-800/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-slate-400">FEMA Flood Zone</span>
                    <span className="text-sm font-medium text-emerald-400">
                      {mockData.environment.floodZone}
                    </span>
                  </div>
                </div>
                {[
                  { label: "Flood Risk", value: mockData.environment.floodScore, color: "emerald" },
                  { label: "Fire Risk", value: mockData.environment.fireScore, color: "emerald" },
                  { label: "Heat Risk", value: mockData.environment.heatScore, color: "amber" },
                ].map((item) => (
                  <div key={item.label}>
                    <span className="text-sm text-slate-400 block mb-1">{item.label}</span>
                    <RatingBar value={item.value} color={item.color} />
                  </div>
                ))}
                <div className="flex justify-between items-center p-4 rounded-lg bg-slate-800/50">
                  <span className="text-sm text-slate-400">Air Quality (AQI)</span>
                  <span className="text-sm font-medium text-amber-400">
                    {mockData.environment.airQuality}
                  </span>
                </div>
              </div>
            )}

            {activeTab === "demographics" && (
              <div className="grid sm:grid-cols-2 gap-6">
                {Object.entries(mockData.demographics).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-sm text-slate-400 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-sm font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "displacement" && (
              <div className="space-y-4">
                {mockData.displacement.alertActive && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-sm font-semibold text-red-400">
                        Active Displacement Alert
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">
                      Rent increases in this neighborhood exceed 15% YoY
                      threshold. Enhanced monitoring and Tier 4 access
                      restrictions are in effect.
                    </p>
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Risk Level", value: mockData.displacement.riskLevel, color: "text-amber-400" },
                    { label: "Rent Change", value: mockData.displacement.rentIncrease, color: "text-red-400" },
                    { label: "Home Price Change", value: mockData.displacement.homePriceChange, color: "text-amber-400" },
                    { label: "Eviction Rate", value: mockData.displacement.evictionRate, color: "text-slate-300" },
                    { label: "New Permits (6mo)", value: mockData.displacement.newPermits, color: "text-slate-300" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50"
                    >
                      <span className="text-sm text-slate-400">{item.label}</span>
                      <span className={`text-sm font-semibold ${item.color}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Report footer */}
          <div className="p-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Data sourced from ATTOM, Census Bureau, First Street Foundation,
              Travis County Records, TEA
            </p>
            <button className="btn-primary text-sm py-2 px-6">
              Download Full PDF &mdash; $9.99
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
