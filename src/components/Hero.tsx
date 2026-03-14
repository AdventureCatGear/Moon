"use client";

import { useState } from "react";

export default function Hero() {
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16 px-4"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-teal-400 mb-6">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse-soft" />
          Austin Metro &mdash; Now Live
        </div>

        <h1 className="section-heading mb-4">
          The{" "}
          <span className="text-gradient-teal">Carfax for Homes</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-2 font-medium">
          Comprehensive neighborhood intelligence.
          <br className="hidden sm:block" />
          One report. $9.99. No subscription.
        </p>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
          Property history, school ratings, flood risk, demographics,
          development pipeline, and displacement risk &mdash; everything you
          need to make an informed decision about where you live.
        </p>

        {/* Address search */}
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3"
        >
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter any Austin address..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-lg transition-all"
            />
          </div>
          <button
            type="submit"
            className="btn-primary py-4 px-8 rounded-xl text-lg whitespace-nowrap"
          >
            {submitted ? "Report Generating..." : "Get Report — $9.99"}
          </button>
        </form>

        {submitted && (
          <div className="mt-4 p-4 rounded-lg glass border border-teal-500/30 max-w-2xl mx-auto animate-slide-up">
            <p className="text-teal-400 font-medium">
              Demo Mode: In production, a comprehensive PDF report for
              &quot;{address}&quot; would generate instantly.
            </p>
          </div>
        )}

        <p className="mt-4 text-sm text-slate-500">
          Verified Austin residents get free reports.{" "}
          <a href="#community" className="text-teal-400 hover:underline">
            Learn more
          </a>
        </p>

        {/* Trust indicators */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: "5+", label: "Data Sources" },
            { value: "$9.99", label: "Per Report" },
            { value: "10%", label: "Reinvested" },
            { value: "Free", label: "For Residents" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-lg p-4">
              <div className="text-2xl font-bold text-gradient-teal">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
