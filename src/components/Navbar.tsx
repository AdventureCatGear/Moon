"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#globe", label: "Explore" },
    { href: "#pricing", label: "Pricing" },
    { href: "#feed", label: "Community" },
    { href: "#api", label: "API" },
    { href: "#how-it-works", label: "How It Works" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="text-2xl">🦞</span>
          <span className="text-gradient-teal">Lunar</span>
          <span className="text-white">Lobsters</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-300 hover:text-cosmic-teal transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#pricing" className="btn-primary text-sm !py-2 !px-4">
            Claim Your Plot
          </a>
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-strong mt-2 mx-4 rounded-xl p-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-gray-300 hover:text-cosmic-teal transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            className="btn-primary text-sm !py-2 !px-4 mt-3 w-full justify-center"
            onClick={() => setMobileOpen(false)}
          >
            Claim Your Plot
          </a>
        </div>
      )}
    </nav>
  );
}
