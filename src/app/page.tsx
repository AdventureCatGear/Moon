"use client";

import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GovernanceOverview from "@/components/GovernanceOverview";
import Footer from "@/components/Footer";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";

export default function Home() {
  return (
    <>
      <StarField />
      <Navbar />
      <KonamiEasterEgg />

      <main className="relative z-10">
        <Hero />
        <GovernanceOverview />
      </main>

      <Footer />
    </>
  );
}
