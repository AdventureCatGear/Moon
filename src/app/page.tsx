"use client";

import { useState } from "react";
import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MoonGlobe from "@/components/MoonGlobe";
import TerritoryDetail from "@/components/TerritoryDetail";
import OwnerDashboard from "@/components/OwnerDashboard";
import Pricing from "@/components/Pricing";
import CommunityFeed from "@/components/CommunityFeed";
import HowItWorks from "@/components/HowItWorks";
import BotApiSection from "@/components/BotApiSection";
import ExcavationProtocol from "@/components/ExcavationProtocol";
import WhyDifferent from "@/components/WhyDifferent";
import Footer from "@/components/Footer";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import { Territory } from "@/data/territories";

type View = "home" | "territory" | "dashboard";

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

  const goToDashboard = () => {
    setView("dashboard");
  };

  return (
    <>
      <StarField />
      <Navbar onDashboardClick={goToDashboard} />
      <KonamiEasterEgg />

      <main className="relative z-10">
        {view === "territory" && selectedTerritory ? (
          <TerritoryDetail
            territory={selectedTerritory}
            onBack={goHome}
          />
        ) : view === "dashboard" ? (
          <OwnerDashboard onBack={goHome} />
        ) : (
          <>
            <Hero />
            <MoonGlobe onTerritoryClick={handleTerritoryClick} />
            <WhyDifferent />
            <HowItWorks />
            <Pricing />
            <CommunityFeed />
            <BotApiSection />
            <ExcavationProtocol />
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
