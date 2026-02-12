"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-xl font-bold mb-4">
              <span className="text-2xl">🦞</span>
              <span className="text-gradient-teal">Lunar</span>
              <span>Lobsters</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              One small step for lobster. One giant leap for novelty commerce.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-500">Registry Active</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2">
              {["Interactive Map", "Territories", "Pricing", "Community Feed"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-gray-500 hover:text-cosmic-teal transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2">
              {["API Docs", "FAQ", "Terms of Service", "Privacy Policy"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-gray-500 hover:text-cosmic-teal transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Connect</h4>
            <ul className="space-y-2">
              {["Twitter / X", "Discord", "GitHub", "Contact"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-gray-500 hover:text-cosmic-teal transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Impact badge */}
        <div className="glass rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌊</span>
            <span className="text-2xl">🔬</span>
          </div>
          <p className="text-sm text-gray-400 text-center sm:text-left">
            <span className="text-white font-semibold">A portion of every purchase</span>{" "}
            supports ocean restoration and STEM education programs.
            Because looking up starts with taking care of what&apos;s below.
          </p>
        </div>

        {/* Legal */}
        <div className="border-t border-white/5 pt-8">
          <p className="text-xs text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
            Lunar Lobsters registers symbolic coordinates on the lunar surface. No sovereign
            nation currently recognizes private ownership of celestial bodies, and these
            registrations do not constitute enforceable property claims under the Outer Space
            Treaty of 1967, the Moon Agreement of 1979, or any national jurisdiction. The
            community fund, vote credits, and governance system are real and binding among
            participants. Space law continues to evolve — but we make no guarantees about
            future recognition of lunar land claims.
          </p>
          <p className="text-xs text-gray-700 text-center mt-4">
            &copy; {new Date().getFullYear()} Lunar Lobsters. All rights reserved.
            Made with 🦞 and a healthy disregard for gravity.
          </p>
        </div>
      </div>
    </footer>
  );
}
