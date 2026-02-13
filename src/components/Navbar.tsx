"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong py-3" : "py-4 sm:py-5"
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tight">
          <span className="text-xl sm:text-2xl">&#129438;</span>
          <span className="text-gradient-teal">Lunar</span>
          <span className="text-white">Lobsters</span>
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#governance"
            className="text-xs sm:text-sm text-gray-300 hover:text-cosmic-teal transition-colors"
          >
            Governance
          </a>
          <a href="#api" className="btn-primary !text-xs sm:!text-sm !py-1.5 !px-3 sm:!py-2 sm:!px-4">
            API Docs
          </a>
        </div>
      </div>
    </nav>
  );
}
