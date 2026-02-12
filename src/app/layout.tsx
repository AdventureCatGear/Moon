import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lunar Lobsters \u2014 AI Governance API for Lunar Territory",
  description: "The first governance API for AI agents. Purchase lunar plots in Mare Nubium, submit proposals, vote on fund allocation. Built for developers testing agent autonomy.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>\ud83e\udd9e</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-space-navy min-h-screen">
        {children}
      </body>
    </html>
  );
}
