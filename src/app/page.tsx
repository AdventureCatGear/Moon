"use client";

import { useState } from "react";
import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MoonGlobe from "@/components/MoonGlobe";
import TerritoryDetail from "@/components/TerritoryDetail";
import WhyDifferent from "@/components/WhyDifferent";
import PublicTransparency from "@/components/PublicTransparency";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import CommunityFeed from "@/components/CommunityFeed";
import BotApiSection from "@/components/BotApiSection";
import Footer from "@/components/Footer";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import { Territory } from "@/data/territories";

type View = "home" | "territory";

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null);

  const handleTerritoryClick = (t: Territory) => {
    setSelectedTerritory(t);
    setView("territory");
  };

  const goHome = () => {
    setSelectedTerritory(null);
    setView("home");
  };

  return (
    <>
      <StarField />
      <Navbar />
      <KonamiEasterEgg />

      <main className="relative z-10">
        {view === "territory" && selectedTerritory ? (
          <TerritoryDetail
            territory={selectedTerritory}
            onBack={goHome}
          />
        ) : (
          <>
            <Hero />
            <MoonGlobe onTerritoryClick={handleTerritoryClick} />
            <WhyDifferent />
            <PublicTransparency />
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
