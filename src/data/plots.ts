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
}

function generatePlots(
  territoryId: string,
  baseLat: number,
  baseLon: number,
  count: number,
  claimed: number,
  spread: number,
  basePrice: number,
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
      price: basePrice,
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
  "She said yes under the full Moon. 💍🌕",
  "Selected for optimal solar exposure parameters.",
  "Mineral composition analysis indicates superior basalt density.",
  "Cross-referencing LOLA elevation data with thermal cycling models.",
  "Acquiring plot for long-term monitoring dataset.",
  "Content is about to get LUNAR 🚀🦞",
  "For all 7 grandkids.",
  "To infinity and beyond — but first, the Moon.",
];

function getRandomDedication(): string {
  return dedications[Math.floor(Math.random() * dedications.length)];
}

function getRandomDate(): string {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * 60));
  return d.toISOString();
}

export const allPlots: Plot[] = [
  ...generatePlots("TF", 0.6, 23.4, 100, 42, 12, 58, {
    elevation: -1800,
    solarExposure: 354,
    nearestCrater: "Aldrin",
    composition: { ironOxide: 16.5, titaniumDioxide: 7.8, siliconDioxide: 42.1, aluminumOxide: 12.4, calciumOxide: 11.8, magnesiumOxide: 7.8 },
    tempMin: -173, tempMax: 127,
    terrainClass: "mare_basalt",
  } as Partial<Plot>),
  ...generatePlots("IB", 32.8, -15.6, 120, 38, 14, 58, {
    elevation: -2400,
    solarExposure: 341,
    nearestCrater: "Archimedes",
    composition: { ironOxide: 17.2, titaniumDioxide: 5.1, siliconDioxide: 44.8, aluminumOxide: 11.2, calciumOxide: 10.5, magnesiumOxide: 8.4 },
    tempMin: -173, tempMax: 127,
    terrainClass: "mare_basalt",
  } as Partial<Plot>),
  ...generatePlots("AH", 23.7, -47.4, 80, 21, 10, 58, {
    elevation: 1200,
    solarExposure: 338,
    nearestCrater: "Aristarchus",
    composition: { ironOxide: 8.2, titaniumDioxide: 2.1, siliconDioxide: 46.5, aluminumOxide: 24.8, calciumOxide: 15.2, magnesiumOxide: 5.1 },
    tempMin: -173, tempMax: 127,
    terrainClass: "volcanic_highland",
  } as Partial<Plot>),
  ...generatePlots("SP", -85, 0, 100, 55, 8, 10, {
    elevation: 3200,
    solarExposure: 847,
    nearestCrater: "Shackleton",
    composition: { ironOxide: 5.8, titaniumDioxide: 0.6, siliconDioxide: 45.2, aluminumOxide: 26.1, calciumOxide: 15.8, magnesiumOxide: 6.2 },
    tempMin: -233, tempMax: -30,
    terrainClass: "polar_highland",
  } as Partial<Plot>),
  ...generatePlots("FR", 9.6, -20.1, 50, 31, 7, 398, {
    elevation: 800,
    solarExposure: 350,
    nearestCrater: "Copernicus",
    composition: { ironOxide: 10.4, titaniumDioxide: 3.2, siliconDioxide: 45.0, aluminumOxide: 20.5, calciumOxide: 13.1, magnesiumOxide: 6.8 },
    tempMin: -173, tempMax: 127,
    terrainClass: "crater_rim",
  } as Partial<Plot>),
];

export function getPlotsByTerritory(territoryId: string): Plot[] {
  return allPlots.filter(p => p.territoryId === territoryId);
}

export function getPlotById(plotId: string): Plot | undefined {
  return allPlots.find(p => p.id === plotId);
}
