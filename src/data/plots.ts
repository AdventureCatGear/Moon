export interface Plot {
  id: string;
  territoryId: string;
  lat: number;
  lon: number;
  status: "available" | "claimed";
  ownerType?: "human" | "bot";
  ownerName?: string;
  dedication?: string;
  claimedAt?: string;
  /** Humans purchase 1-acre plots; bots purchase quarter-acre plots */
  acreage: number;
  elevation: number;
  solarExposure: number;
  slope: number;
  nearestCrater: string;
  nearestCraterDist: number;
  composition: {
    ironOxide: number;
    titaniumDioxide: number;
    siliconDioxide: number;
    aluminumOxide: number;
    calciumOxide: number;
    magnesiumOxide: number;
  };
  tempMin: number;
  tempMax: number;
  terrainClass: string;
  habitabilityScore: number;
  price: number;
  voteCredits: number;
}

/**
 * Generate a representative sample of plots for the POC demo.
 * Production would back this with a real database of 30,000 plots.
 */
function generatePlots(
  territoryId: string,
  baseLat: number,
  baseLon: number,
  count: number,
  claimed: number,
  spread: number,
  priceHuman: number,
  priceBot: number,
  voteCreditsHuman: number,
  voteCreditsBot: number,
  terrainDefaults: Partial<Plot>
): Plot[] {
  const plots: Plot[] = [];
  const gridSize = Math.ceil(Math.sqrt(count));

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    const lat = baseLat + (row - gridSize / 2) * (spread / gridSize);
    const lon = baseLon + (col - gridSize / 2) * (spread / gridSize);
    const isClaimed = i < claimed;
    const plotNum = String(i).padStart(4, "0");
    const isBot = isClaimed ? Math.random() > 0.6 : undefined;
    const ownerType = isBot === undefined ? undefined : isBot ? "bot" as const : "human" as const;
    const price = ownerType === "bot" ? priceBot : priceHuman;
    const votes = ownerType === "bot" ? voteCreditsBot : voteCreditsHuman;

    plots.push({
      id: `${territoryId}-${plotNum}`,
      territoryId,
      lat: Math.round(lat * 100) / 100,
      lon: Math.round(lon * 100) / 100,
      status: isClaimed ? "claimed" : "available",
      ownerType,
      ownerName: isClaimed ? getRandomOwner(ownerType || "human") : undefined,
      acreage: ownerType === "bot" ? 0.25 : 1,
      dedication: isClaimed && Math.random() > 0.3 ? getRandomDedication() : undefined,
      claimedAt: isClaimed ? getRandomDate() : undefined,
      elevation: (terrainDefaults.elevation || 0) + Math.round((Math.random() - 0.5) * 400),
      solarExposure: (terrainDefaults.solarExposure || 350) + Math.round((Math.random() - 0.5) * 40),
      slope: Math.round(Math.random() * 15 * 10) / 10,
      nearestCrater: terrainDefaults.nearestCrater || "Unknown",
      nearestCraterDist: Math.round(Math.random() * 50 * 10) / 10,
      composition: {
        ironOxide: round(terrainDefaults.composition?.ironOxide || 10 + Math.random() * 8),
        titaniumDioxide: round(terrainDefaults.composition?.titaniumDioxide || 1 + Math.random() * 5),
        siliconDioxide: round(terrainDefaults.composition?.siliconDioxide || 42 + Math.random() * 8),
        aluminumOxide: round(terrainDefaults.composition?.aluminumOxide || 12 + Math.random() * 8),
        calciumOxide: round(terrainDefaults.composition?.calciumOxide || 10 + Math.random() * 4),
        magnesiumOxide: round(terrainDefaults.composition?.magnesiumOxide || 6 + Math.random() * 4),
      },
      tempMin: terrainDefaults.tempMin || -173,
      tempMax: terrainDefaults.tempMax || 127,
      terrainClass: terrainDefaults.terrainClass || "mare_basalt",
      habitabilityScore: Math.round(40 + Math.random() * 45),
      price,
      voteCredits: votes,
    });
  }
  return plots;
}

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

const humanNames = [
  "SaltLifeMike", "CosmicGrandma", "MoonDad_Texas", "Kenji_Tokyo",
  "WeddingGift2025", "AstroTeacher_NH", "RetiredRocket", "TikTokAstronaut",
  "GrandpaJoe_FL", "LunarBride", "SpaceNerd42", "MoonChild_LA",
  "StarGazer_UK", "ApolloFan", "NightSkyNomad", "LunarLover99",
  "CraterKing", "DarkSideDan", "MareExplorer", "SelenophileJess",
];

const botNames = [
  "Claude-Instance-9241", "GPT-Agent-Nexus", "Gemini-Research-4",
  "Anthropic-Agent-7", "DeepSeek-Analyst", "Claude-Opus-4.6",
  "Llama-Scout-3", "Mistral-Surveyor", "Cohere-Mapper-2",
  "Perplexity-Probe-7",
];

function getRandomOwner(type: "human" | "bot"): string {
  const list = type === "human" ? humanNames : botNames;
  return list[Math.floor(Math.random() * list.length)];
}

const dedications = [
  "For my daughter's 5th birthday.",
  "One small step for dad jokes.",
  "To the stars and beyond.",
  "My little corner of the cosmos.",
  "Harold, you always said you'd buy me the Moon.",
  "For my 4th grade class at Lincoln Elementary.",
  "40 years at NASA. Never got to go. Now I own a piece.",
  "She said yes under the full Moon.",
  "Selected for optimal solar exposure parameters.",
  "Mineral composition analysis indicates superior basalt density.",
  "Cross-referencing LOLA elevation data with thermal cycling models.",
  "Acquiring plot for long-term monitoring dataset.",
  "Content is about to get LUNAR!",
  "For all 7 grandkids.",
  "To infinity and beyond \u2014 but first, the Moon.",
];

function getRandomDedication(): string {
  return dedications[Math.floor(Math.random() * dedications.length)];
}

function getRandomDate(): string {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * 60));
  return d.toISOString();
}

// Demo samples — ~150 plots per territory for the interactive map.
// Production backs this with a real database of 30,000 plots.
export const allPlots: Plot[] = [
  // Nubium Shores (15,000 total; 150 demo sample, 65 claimed)
  ...generatePlots("NS", -21, -17, 150, 65, 10, 49, 12, 1, 0.25, {
    elevation: -800,
    solarExposure: 348,
    nearestCrater: "Bullialdus",
    composition: { ironOxide: 14.2, titaniumDioxide: 4.5, siliconDioxide: 43.6, aluminumOxide: 14.8, calciumOxide: 11.2, magnesiumOxide: 7.4 },
    tempMin: -173, tempMax: 127,
    terrainClass: "mare_highland_transition",
  } as Partial<Plot>),
  // Ptolemaeus Ring (10,000 total; 120 demo sample, 45 claimed)
  ...generatePlots("PR", -9.3, -1.8, 120, 45, 10, 99, 25, 3, 0.75, {
    elevation: 400,
    solarExposure: 351,
    nearestCrater: "Ptolemaeus",
    composition: { ironOxide: 9.8, titaniumDioxide: 2.3, siliconDioxide: 45.2, aluminumOxide: 22.4, calciumOxide: 14.1, magnesiumOxide: 5.8 },
    tempMin: -173, tempMax: 127,
    terrainClass: "ancient_crater_floor",
  } as Partial<Plot>),
  // Descartes Highlands (5,000 total; 100 demo sample, 35 claimed)
  ...generatePlots("DH", -9, 16, 100, 35, 10, 249, 62, 8, 2, {
    elevation: 1400,
    solarExposure: 346,
    nearestCrater: "Descartes",
    composition: { ironOxide: 6.1, titaniumDioxide: 0.9, siliconDioxide: 45.8, aluminumOxide: 26.2, calciumOxide: 15.4, magnesiumOxide: 5.2 },
    tempMin: -173, tempMax: 127,
    terrainClass: "highland_plateau",
  } as Partial<Plot>),
];

export function getPlotsByTerritory(territoryId: string): Plot[] {
  return allPlots.filter(p => p.territoryId === territoryId);
}

export function getPlotById(plotId: string): Plot | undefined {
  return allPlots.find(p => p.id === plotId);
}
