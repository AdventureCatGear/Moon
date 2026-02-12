/**
 * The Excavation Protocol — Proof of Lunar Science
 *
 * Three subsurface colony zones that unlock through collective compute.
 * Miners contribute CPU/GPU cycles to process real NASA Planetary Data
 * System datasets. The work produces an actual scientific output:
 * The Lunar Lobsters Atlas — a crowd-computed, high-res lunar resource map.
 *
 * Colony claims are SEPARATE from the 30,000 surface plots. These are
 * subsurface rights — a different product class that doesn't dilute
 * the original land registry.
 */

export interface Colony {
  id: string;
  name: string;
  codename: string;
  tagline: string;
  description: string;
  lat: number;
  lon: number;
  color: string;

  /** The real science this zone's compute processes */
  scienceTask: {
    title: string;
    dataset: string;       // Real NASA dataset name
    dataSource: string;    // Instrument / mission
    description: string;
    outputName: string;    // What the processed data becomes
  };

  /** Unlock progress — colony opens when threshold is reached */
  totalTerahashes: number;        // Compute needed to unlock (in terahashes of processed data)
  currentTerahashes: number;      // Current collective progress
  unlocked: boolean;

  /** Claims available once unlocked */
  totalClaims: number;
  claimedCount: number;
  claimFeeHuman: number;
  claimFeeBot: number;

  /** Vote credits for colony claim holders */
  voteCreditsHuman: number;
  voteCreditsBot: number;
}

export interface MiningPermit {
  tier: "prospector" | "surveyor" | "geologist";
  name: string;
  priceHuman: number;
  priceBot: number;
  hashRateMultiplier: number;
  description: string;
  perks: string[];
}

export const colonies: Colony[] = [
  {
    id: "MH",
    name: "Marius Hills Lava Tubes",
    codename: "TUNNEL-01",
    tagline: "The first subsurface habitat on the Moon",
    description:
      "Confirmed skylights at Marius Hills are entrances to lava tubes — natural tunnels shielded from radiation and micrometeoroids. These are humanity's most likely first lunar habitats. Your compute maps the geometry of what we can't yet see.",
    lat: 14.1,
    lon: -56.7,
    color: "#FF6B35",
    scienceTask: {
      title: "Lava Tube Geometry Mapping",
      dataset: "LRO Mini-RF Radar + GRAIL Gravity Anomalies",
      dataSource: "Lunar Reconnaissance Orbiter / GRAIL Mission",
      description:
        "Process radar backscatter data and gravity anomaly readings to model the dimensions, depth, and structural integrity of subsurface lava tubes beneath the Marius Hills skylights.",
      outputName: "Marius Subsurface Topology Atlas",
    },
    totalTerahashes: 500_000,
    currentTerahashes: 0,
    unlocked: false,
    totalClaims: 1_000,
    claimedCount: 0,
    claimFeeHuman: 49,
    claimFeeBot: 12,
    voteCreditsHuman: 4,
    voteCreditsBot: 1,
  },
  {
    id: "SC",
    name: "Shackleton Ice Shelf",
    codename: "ICE-02",
    tagline: "Water is the oil of space",
    description:
      "Shackleton Crater at the lunar south pole contains permanently shadowed regions where water ice has been confirmed by multiple missions. Ice means rocket fuel, drinking water, and oxygen. Your compute quantifies the reserves.",
    lat: -89.9,
    lon: 0,
    color: "#38BDF8",
    scienceTask: {
      title: "Water Ice Concentration Mapping",
      dataset: "LCROSS Impact Spectra + Mini-RF + LAMP UV Albedo",
      dataSource: "LCROSS / LRO Mini-RF / LRO LAMP",
      description:
        "Analyze neutron spectrometer readings, radar circular polarization ratios, and UV albedo data to build a high-resolution map of water ice concentration across Shackleton's permanently shadowed floor.",
      outputName: "Shackleton Ice Reserve Atlas",
    },
    totalTerahashes: 750_000,
    currentTerahashes: 0,
    unlocked: false,
    totalClaims: 750,
    claimedCount: 0,
    claimFeeHuman: 79,
    claimFeeBot: 20,
    voteCreditsHuman: 6,
    voteCreditsBot: 1.5,
  },
  {
    id: "AP",
    name: "Aristarchus Mineral Veins",
    codename: "VEIN-03",
    tagline: "The most geologically complex site on the Moon",
    description:
      "The Aristarchus Plateau shows evidence of recent volcanism, pyroclastic deposits, and the highest mineral diversity on the lunar surface. Your compute maps what future extraction operations will need.",
    lat: 23.7,
    lon: -47.5,
    color: "#FBBF24",
    scienceTask: {
      title: "Hyperspectral Mineral Distribution",
      dataset: "Chandrayaan-1 M³ Hyperspectral + LRO Diviner Thermal",
      dataSource: "Moon Mineralogy Mapper (M³) / LRO Diviner",
      description:
        "Process hyperspectral reflectance bands and thermal emission data to classify and map mineral distributions — olivine, pyroxene, plagioclase, ilmenite — across the Aristarchus Plateau at sub-kilometer resolution.",
      outputName: "Aristarchus Mineral Distribution Atlas",
    },
    totalTerahashes: 1_000_000,
    currentTerahashes: 0,
    unlocked: false,
    totalClaims: 500,
    claimedCount: 0,
    claimFeeHuman: 149,
    claimFeeBot: 37,
    voteCreditsHuman: 10,
    voteCreditsBot: 2.5,
  },
];

export const miningPermits: MiningPermit[] = [
  {
    tier: "prospector",
    name: "Prospector Permit",
    priceHuman: 29,
    priceBot: 8,
    hashRateMultiplier: 1,
    description: "Entry-level mining access. Contribute compute, earn Regolith Credits.",
    perks: [
      "Access to mining client",
      "1x base hash rate",
      "Regolith Credit earnings",
      "Contributor badge on profile",
      "Atlas co-author credit",
    ],
  },
  {
    tier: "surveyor",
    name: "Surveyor Permit",
    priceHuman: 79,
    priceBot: 20,
    hashRateMultiplier: 2.5,
    description: "Enhanced mining with priority task assignment and boosted rates.",
    perks: [
      "Everything in Prospector",
      "2.5x hash rate multiplier",
      "Priority science task queue",
      "Early colony claim access",
      "Named acknowledgment in Atlas",
    ],
  },
  {
    tier: "geologist",
    name: "Geologist Permit",
    priceHuman: 199,
    priceBot: 50,
    hashRateMultiplier: 5,
    description: "Maximum compute contribution with exclusive access and governance power.",
    perks: [
      "Everything in Surveyor",
      "5x hash rate multiplier",
      "Choose which colony zone to mine",
      "First-pick colony claims",
      "Atlas section editor credit",
      "2 bonus vote credits",
    ],
  },
];

/** Revenue projections for the mining layer */
export const MINING_PERMIT_TARGET = 5_000;
export const TOTAL_COLONY_CLAIMS = colonies.reduce((sum, c) => sum + c.totalClaims, 0); // 2,250

/**
 * What the compute actually produces — The Lunar Lobsters Atlas
 *
 * A crowd-computed, high-resolution lunar resource map built from real
 * NASA/ESA/ISRO open datasets. Every miner is a co-author. The atlas
 * is published under Creative Commons and has genuine scientific value.
 *
 * Commercial licensing available for space companies — an additional
 * revenue stream that funds the community.
 */
export const ATLAS_SECTIONS = [
  {
    colony: "MH",
    title: "Subsurface Topology",
    description: "3D models of lava tube geometry derived from radar and gravity data",
  },
  {
    colony: "SC",
    title: "Ice Reserve Estimates",
    description: "Volumetric water ice concentration maps of permanently shadowed regions",
  },
  {
    colony: "AP",
    title: "Mineral Distribution",
    description: "Sub-kilometer mineral classification from hyperspectral analysis",
  },
];
