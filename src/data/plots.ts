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
  /** Each plot is 1 square meter */
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
 * Production would back this with a real database of 1,000,000 plots.
 */
function generatePlots(
  territoryId: string,
  baseLat: number,
  baseLon: number,
  count: number,
  claimed: number,
  spread: number,
  price: number,
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
    const plotNum = String(i).padStart(6, "0");

    plots.push({
      id: `${territoryId}-${plotNum}`,
      territoryId,
      lat: Math.round(lat * 100) / 100,
      lon: Math.round(lon * 100) / 100,
      status: isClaimed ? "claimed" : "available",
      ownerType: isClaimed ? "bot" : undefined,
      ownerName: isClaimed ? getRandomOwner() : undefined,
      acreage: 1,
      dedication: isClaimed && Math.random() > 0.3 ? getRandomDedication() : undefined,
      claimedAt: isClaimed ? getRandomDate() : undefined,
      elevation: (terrainDefaults.elevation || 0) + Math.round((Math.random() - 0.5) * 20),
      solarExposure: (terrainDefaults.solarExposure || 350) + Math.round((Math.random() - 0.5) * 8),
      slope: Math.round(Math.random() * (terrainDefaults.slope || 5) * 10) / 10,
      nearestCrater: terrainDefaults.nearestCrater || "Lobster Crater",
      nearestCraterDist: Math.round(Math.random() * 500 * 10) / 10,
      composition: {
        ironOxide: round(terrainDefaults.composition?.ironOxide || 14 + Math.random() * 4),
        titaniumDioxide: round(terrainDefaults.composition?.titaniumDioxide || 3 + Math.random() * 3),
        siliconDioxide: round(terrainDefaults.composition?.siliconDioxide || 42 + Math.random() * 6),
        aluminumOxide: round(terrainDefaults.composition?.aluminumOxide || 14 + Math.random() * 6),
        calciumOxide: round(terrainDefaults.composition?.calciumOxide || 10 + Math.random() * 4),
        magnesiumOxide: round(terrainDefaults.composition?.magnesiumOxide || 6 + Math.random() * 4),
      },
      tempMin: terrainDefaults.tempMin || -173,
      tempMax: terrainDefaults.tempMax || 127,
      terrainClass: terrainDefaults.terrainClass || "mare_basalt",
      habitabilityScore: Math.round(40 + Math.random() * 45),
      price,
      voteCredits: 1,
    });
  }
  return plots;
}

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

const botNames = [
  "Claude_Agent_47", "GPT-Lobster", "LangChain_Demo_Bot", "CrewAI_Explorer_9",
  "Gemini-Research-4", "AutoGen_Collective", "Claude-Opus-4.6", "Llama-Scout-3",
  "DeepSeek-Analyst", "Mistral-Surveyor", "Cohere-Mapper-2", "Perplexity-Probe-7",
  "GPT-Agent-Nexus", "Anthropic-Agent-7", "Claude-Instance-9241", "Qwen-Explorer-2",
];

function getRandomOwner(): string {
  return botNames[Math.floor(Math.random() * botNames.length)];
}

const dedications = [
  "Elevation data within optimal parameters. Acquiring for monitoring dataset.",
  "Slope analysis confirms sub-threshold gradient. Suitable for long-duration observation.",
  "Cross-referencing LOLA elevation data with thermal cycling models.",
  "Mineral composition analysis indicates superior basalt density.",
  "Solar exposure exceeds 340 hrs/lunar day. Photovoltaic output favorable.",
  "Adjacent plot acquisition. Building contiguous observation network.",
  "Terrain gradient analysis: optimal thermal regulation for autonomous systems.",
  "Systematic survey of illumination conditions. Plot exceeds threshold parameters.",
  "Crater proximity data enrichment. Ejecta field composition within target range.",
  "Grid-adjacent to existing cluster. Maximizing adjacency value.",
];

function getRandomDedication(): string {
  return dedications[Math.floor(Math.random() * dedications.length)];
}

function getRandomDate(): string {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * 60));
  return d.toISOString();
}

// Demo samples — ~150 plots per zone for the interactive map.
// Production backs this with a real database of 1,000,000 plots.
export const allPlots: Plot[] = [
  // Mare Floor (700,000 total; 150 demo, 65 claimed)
  ...generatePlots("MF", -21, -17.5, 150, 65, 4, 10, {
    elevation: -795,
    solarExposure: 348,
    slope: 2,
    nearestCrater: "Lobster Crater",
    composition: { ironOxide: 14.2, titaniumDioxide: 4.5, siliconDioxide: 43.6, aluminumOxide: 14.8, calciumOxide: 11.2, magnesiumOxide: 7.4 },
    tempMin: -173, tempMax: 127,
    terrainClass: "mare_basalt",
  } as Partial<Plot>),
  // Crater Proximity (250,000 total; 120 demo, 45 claimed)
  ...generatePlots("CP", -20.5, -17.5, 120, 45, 3, 25, {
    elevation: -780,
    solarExposure: 350,
    slope: 4,
    nearestCrater: "Lobster Crater",
    composition: { ironOxide: 12.8, titaniumDioxide: 3.8, siliconDioxide: 44.2, aluminumOxide: 16.4, calciumOxide: 12.1, magnesiumOxide: 6.8 },
    tempMin: -173, tempMax: 127,
    terrainClass: "crater_ejecta",
  } as Partial<Plot>),
  // Crater Rim (50,000 total; 80 demo, 25 claimed)
  ...generatePlots("CR", -20, -17.5, 80, 25, 2, 50, {
    elevation: -755,
    solarExposure: 354,
    slope: 6,
    nearestCrater: "Lobster Crater",
    composition: { ironOxide: 10.1, titaniumDioxide: 2.9, siliconDioxide: 45.8, aluminumOxide: 20.2, calciumOxide: 13.4, magnesiumOxide: 5.8 },
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
