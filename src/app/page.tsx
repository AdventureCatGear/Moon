"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import SampleReport from "@/components/SampleReport";
import Pricing from "@/components/Pricing";
import CommunityFirst from "@/components/CommunityFirst";
import ImpactDashboard from "@/components/ImpactDashboard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <HowItWorks />
        <SampleReport />
        <Pricing />
        <CommunityFirst />
        <ImpactDashboard />
      </main>

      <Footer />
    </>
  );
}
