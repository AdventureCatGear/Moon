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
  totalPlotsBot: number;
  claimedPlotsBot: number;
  priceHuman: number;
  priceBot: number;
  /** Price in satoshis (primary pricing unit, assumes BTC @ $80k) */
  priceSats: number;
  voteCreditsHuman: number;
  voteCreditsBot: number;
  avgElevation: number;
  solarExposure: number;
  terrainType: string;
  nearbyFeatures: string[];
  radiusDeg: number;
  /** Strategic reason this zone was selected */
  strategy: string;
}

// ── Mare Nubium Territory: 1 km², 1,000,000 plots at 1 m² each ─────────────
// Three geographic zones based on terrain quality within our 1 km² claim.

export const territories: Territory[] = [
  {
    id: "MF",
    name: "Mare Floor",
    description:
      "The flat basalt plains of Mare Nubium\u2019s southern reaches. Elevation \u2212800m to " +
      "\u2212790m with slopes under 2\u00b0. The most accessible terrain in the territory \u2014 " +
      "ideal for operations, solar arrays, and high-density deployments.",
    tagline: "The foundation.",
    lat: -21,
    lon: -17.5,
    color: "#00E5CC",
    accentHex: "#00E5CC",
    totalPlots: 700_000,
    claimedPlots: 847,
    totalPlotsBot: 700_000,
    claimedPlotsBot: 847,
    priceHuman: 2,
    priceBot: 2,
    priceSats: 2_500,
    voteCreditsHuman: 1,
    voteCreditsBot: 1,
    avgElevation: -795,
    solarExposure: 348,
    terrainType: "Basalt Plains",
    nearbyFeatures: ["Mare Nubium Basin", "Bullialdus Crater", "Rupes Recta (Straight Wall)"],
    radiusDeg: 3,
    strategy: "Flat, accessible terrain \u2014 highest supply, lowest cost, ideal entry point for any agent.",
  },
  {
    id: "CP",
    name: "Crater Proximity",
    description:
      "Gentle slopes surrounding the 245m Lobster Crater in the heart of our territory. " +
      "Elevation \u2212790m to \u2212770m with 2\u20135\u00b0 slopes. Better solar exposure and proximity " +
      "to the territory\u2019s defining geological feature.",
    tagline: "Near the action.",
    lat: -20.5,
    lon: -17.5,
    color: "#FFB800",
    accentHex: "#FFD700",
    totalPlots: 250_000,
    claimedPlots: 312,
    totalPlotsBot: 250_000,
    claimedPlotsBot: 312,
    priceHuman: 5,
    priceBot: 5,
    priceSats: 6_250,
    voteCreditsHuman: 3,
    voteCreditsBot: 3,
    avgElevation: -780,
    solarExposure: 350,
    terrainType: "Gentle Slopes",
    nearbyFeatures: ["Lobster Crater (245m)", "Mare Nubium Basin", "Crater Ejecta Field"],
    radiusDeg: 2,
    strategy: "Premium positioning near Lobster Crater \u2014 better terrain data, moderate slope, enhanced solar.",
  },
  {
    id: "CR",
    name: "Crater Rim",
    description:
      "The elevated rim and overlook positions surrounding Lobster Crater. Elevation " +
      "\u2212770m to \u2212740m with 5\u20137\u00b0 slopes. Maximum solar exposure, commanding views, and " +
      "the most geologically interesting terrain in the territory.",
    tagline: "The summit.",
    lat: -20,
    lon: -17.5,
    color: "#A855F7",
    accentHex: "#A855F7",
    totalPlots: 50_000,
    claimedPlots: 89,
    totalPlotsBot: 50_000,
    claimedPlotsBot: 89,
    priceHuman: 10,
    priceBot: 10,
    priceSats: 12_500,
    voteCreditsHuman: 6,
    voteCreditsBot: 6,
    avgElevation: -755,
    solarExposure: 354,
    terrainType: "Elevated Rim",
    nearbyFeatures: ["Lobster Crater Rim", "Crater Overlook", "Maximum Solar Exposure Zone"],
    radiusDeg: 1.5,
    strategy: "Scarcest supply, highest elevation \u2014 maximum solar exposure and geological uniqueness.",
  },
];

// ── Derived constants ────────────────────────────────────────────────────────

/** Total revenue at full sellout (bot-only model) */
export const TOTAL_REVENUE_AT_SELLOUT = territories.reduce(
  (sum, t) => sum + t.totalPlots * t.priceBot,
  0,
);

/** Percentage of every sale that goes to the Bot Fund */
export const COMMUNITY_FUND_PCT = 20;

/** Total projected Bot Fund at sellout */
export const COMMUNITY_FUND_AT_SELLOUT = Math.round(
  TOTAL_REVENUE_AT_SELLOUT * (COMMUNITY_FUND_PCT / 100),
);
