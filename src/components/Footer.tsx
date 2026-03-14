export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏠</span>
              <span className="font-bold text-lg text-white">
                HomeBase <span className="text-gradient-teal">Intel</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Comprehensive neighborhood intelligence reports that serve
              communities first. We believe real estate data should be
              accessible, affordable, and ethical.
            </p>
            <p className="text-xs text-slate-600 mt-4">
              Austin, TX &mdash; Launching Q2 2026
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#how-it-works" className="hover:text-teal-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#sample-report" className="hover:text-teal-400 transition-colors">
                  Sample Report
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-teal-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  API Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Mission */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Mission
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#community" className="hover:text-teal-400 transition-colors">
                  Community First
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-teal-400 transition-colors">
                  Impact Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Advisory Board
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  Annual Report
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            &copy; 2026 HomeBase Intel. Built for communities, not extraction.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-400 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-slate-400 transition-colors">
              Data Sources
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
