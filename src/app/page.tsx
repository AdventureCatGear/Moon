"use client";

import { useState } from "react";
import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MoonGlobe from "@/components/MoonGlobe";
import TerritoryDetail from "@/components/TerritoryDetail";
import Pricing from "@/components/Pricing";
import CommunityFeed from "@/components/CommunityFeed";
import HowItWorks from "@/components/HowItWorks";
import BotApiSection from "@/components/BotApiSection";
import Footer from "@/components/Footer";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import { Territory } from "@/data/territories";

export default function Home() {
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);

  return (
    <>
      <StarField />
      <Navbar />
      <KonamiEasterEgg />

      <main className="relative z-10">
        {selectedTerritory ? (
          <TerritoryDetail
            territory={selectedTerritory}
            onBack={() => setSelectedTerritory(null)}
          />
        ) : (
          <>
            <Hero />
            <MoonGlobe onTerritoryClick={setSelectedTerritory} />
            <HowItWorks />
            <Pricing />
            <CommunityFeed />
            <BotApiSection />
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
