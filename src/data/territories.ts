export interface Territory {
  id: string;
  name: string;
  description: string;
  tagline: string;
  lat: number;
  lon: number;
  color: string;
  accentHex: string;
  totalPlots: number;
  claimedPlots: number;
  priceRange: string;
  avgElevation: number;
  solarExposure: number;
  terrainType: string;
  nearbyFeatures: string[];
  radiusDeg: number;
}

export const territories: Territory[] = [
  {
    id: "TF",
    name: "Tranquility Fields",
    description: "Where it all began. The Apollo 11 landing site sits at the heart of this premium territory in Mare Tranquillitatis.",
    tagline: "Where it all began.",
    lat: 0.6,
    lon: 23.4,
    color: "#FFB800",
    accentHex: "#FFB800",
    totalPlots: 100,
    claimedPlots: 42,
    priceRange: "$58 – $398",
    avgElevation: -1800,
    solarExposure: 354,
    terrainType: "Mare Basalt Plain",
    nearbyFeatures: ["Apollo 11 Landing Site", "Crater Aldrin", "Rima Hypatia", "Statio Tranquillitatis"],
    radiusDeg: 8,
  },
  {
    id: "IB",
    name: "Imbrium Basin",
    description: "The Heartland of the Moon. The vast Mare Imbrium is the largest lunar mare — endless plains of ancient lava.",
    tagline: "The Heartland.",
    lat: 32.8,
    lon: -15.6,
    color: "#00E5CC",
    accentHex: "#00E5CC",
    totalPlots: 120,
    claimedPlots: 38,
    priceRange: "$58 – $158",
    avgElevation: -2400,
    solarExposure: 341,
    terrainType: "Mare Basalt Plain",
    nearbyFeatures: ["Archimedes Crater", "Montes Apenninus", "Hadley Rille", "Sinus Iridum"],
    radiusDeg: 10,
  },
  {
    id: "AH",
    name: "Aristarchus Highlands",
    description: "For the bold. The Aristarchus Plateau is the brightest spot on the Moon — volcanic, mysterious, and untamed.",
    tagline: "For the bold.",
    lat: 23.7,
    lon: -47.4,
    color: "#FF6B35",
    accentHex: "#FF6B35",
    totalPlots: 80,
    claimedPlots: 21,
    priceRange: "$58 – $158",
    avgElevation: 1200,
    solarExposure: 338,
    terrainType: "Volcanic Highland",
    nearbyFeatures: ["Aristarchus Crater", "Vallis Schröteri", "Herodotus Crater", "Aristarchus Plateau"],
    radiusDeg: 7,
  },
  {
    id: "SP",
    name: "Southern Peaks",
    description: "Optimal. Efficient. Visionary. Near the lunar south pole, these peaks receive near-constant sunlight — ideal for forward-thinking colonists.",
    tagline: "Optimal. Efficient. Visionary.",
    lat: -85,
    lon: 0,
    color: "#A855F7",
    accentHex: "#A855F7",
    totalPlots: 100,
    claimedPlots: 55,
    priceRange: "$10 – $30",
    avgElevation: 3200,
    solarExposure: 847,
    terrainType: "Polar Highland Ridge",
    nearbyFeatures: ["Shackleton Crater", "Malapert Mountain", "de Gerlache Crater", "Permanently Shadowed Regions"],
    radiusDeg: 6,
  },
  {
    id: "FR",
    name: "Founder's Ridge",
    description: "Only 1,000 plots. Ever. Perched on the rim of Copernicus — one of the Moon's most spectacular craters.",
    tagline: "Only 1,000 plots. Ever.",
    lat: 9.6,
    lon: -20.1,
    color: "#FFB800",
    accentHex: "#FFD700",
    totalPlots: 50,
    claimedPlots: 31,
    priceRange: "$398",
    avgElevation: 800,
    solarExposure: 350,
    terrainType: "Crater Rim Highland",
    nearbyFeatures: ["Copernicus Crater", "Montes Carpatus", "Stadius Crater", "Central Peak Complex"],
    radiusDeg: 5,
  },
];
