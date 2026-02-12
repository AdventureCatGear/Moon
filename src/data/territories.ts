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
  voteCreditsHuman: number;
  voteCreditsBot: number;
  avgElevation: number;
  solarExposure: number;
  terrainType: string;
  nearbyFeatures: string[];
  radiusDeg: number;
  /** Strategic reason this neighborhood was selected */
  strategy: string;
}

export const territories: Territory[] = [
  {
    id: "NS",
    name: "Nubium Shores",
    description:
      "The rocky shoreline where ancient lava flows of Mare Nubium met the southern highlands. " +
      "At roughly 21\u00b0S on the near side, this is the closest of our three neighborhoods to the " +
      "sub-Earth point \u2014 giving you the best direct line-of-sight to Earth. Too rough for " +
      "government landing zones, too irregular for corporate mining \u2014 perfect for us.",
    tagline: "Gateway to Earth.",
    lat: -21,
    lon: -17,
    color: "#00E5CC",
    accentHex: "#00E5CC",
    totalPlots: 50_000,
    claimedPlots: 6_140,
    totalPlotsBot: 100_000,
    claimedPlotsBot: 10_700,
    priceHuman: 15,
    priceBot: 5,
    voteCreditsHuman: 1,
    voteCreditsBot: 1,
    avgElevation: -800,
    solarExposure: 348,
    terrainType: "Mare\u2013Highland Transition",
    nearbyFeatures: ["Mare Nubium", "Bullialdus Crater", "Rupes Recta (Straight Wall)", "Pitatus Crater"],
    radiusDeg: 7,
    strategy: "Closest to Earth \u2014 best line-of-sight to the sub-Earth point for future communication relays.",
  },
  {
    id: "PR",
    name: "Ptolemaeus Ring",
    description:
      "One of the Moon\u2019s largest and oldest craters \u2014 153\u2009km across, ancient enough that its " +
      "floor has been pummeled smooth by billions of years of smaller impacts. Sitting at 9\u00b0S " +
      "dead-center on the near side, governments and corporations skip it because it\u2019s not flat " +
      "enough for landing, not icy enough for mining, and not prestigious enough for a flag. " +
      "That\u2019s exactly why we picked it.",
    tagline: "The quiet center.",
    lat: -9.3,
    lon: -1.8,
    color: "#FFB800",
    accentHex: "#FFD700",
    totalPlots: 33_000,
    claimedPlots: 2_714,
    totalPlotsBot: 66_000,
    claimedPlotsBot: 5_200,
    priceHuman: 30,
    priceBot: 10,
    voteCreditsHuman: 3,
    voteCreditsBot: 3,
    avgElevation: 400,
    solarExposure: 351,
    terrainType: "Ancient Crater Floor",
    nearbyFeatures: ["Ptolemaeus Crater", "Alphonsus Crater", "Arzachel Crater", "Sinus Medii"],
    radiusDeg: 8,
    strategy: "Undesirable to governments \u2014 too cratered for bases, too old for mining, but perfectly positioned at the center of the near side.",
  },
  {
    id: "DH",
    name: "Descartes Highlands",
    description:
      "Rugged highland terrain where Apollo 16 astronauts John Young and Charles Duke " +
      "explored in 1972. Positioned in the equatorial corridor that SpaceX\u2019s planned Starship " +
      "depot and future commercial traffic will traverse \u2014 close enough to benefit from " +
      "infrastructure, far enough that nobody\u2019s building on top of you.",
    tagline: "Near the action.",
    lat: -9,
    lon: 16,
    color: "#A855F7",
    accentHex: "#A855F7",
    totalPlots: 17_000,
    claimedPlots: 1_040,
    totalPlotsBot: 34_000,
    claimedPlotsBot: 1_930,
    priceHuman: 50,
    priceBot: 25,
    voteCreditsHuman: 8,
    voteCreditsBot: 8,
    avgElevation: 1400,
    solarExposure: 346,
    terrainType: "Highland Plateau",
    nearbyFeatures: ["Apollo 16 Landing Site", "Descartes Formation", "Theophilus Crater", "Dolland Crater"],
    radiusDeg: 7,
    strategy: "Near future infrastructure \u2014 in the equatorial corridor near proposed SpaceX depot, but highland terrain governments bypass for flat landing zones.",
  },
];

// ── Derived constants ────────────────────────────────────────────────────────

/** Total human + AI revenue at full sellout */
export const TOTAL_REVENUE_AT_SELLOUT = territories.reduce(
  (sum, t) => sum + t.totalPlots * t.priceHuman + t.totalPlotsBot * t.priceBot,
  0,
);

/** Percentage of every sale that goes to the community fund */
export const COMMUNITY_FUND_PCT = 20;

/** Total projected community fund at sellout */
export const COMMUNITY_FUND_AT_SELLOUT = Math.round(
  TOTAL_REVENUE_AT_SELLOUT * (COMMUNITY_FUND_PCT / 100),
);
