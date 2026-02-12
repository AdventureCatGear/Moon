// \u2500\u2500 Governance, marketplace & fund data \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// Mock data powering the Owner Dashboard: community funds, proposals,
// trade listings, neighborhood trends, and newsletter archive.

export interface CommunityFundData {
  id: "human" | "bot";
  label: string;
  emoji: string;
  color: string;
  balanceUsd: number;
  balanceBtc: number;
  totalVoters: number;
  totalVotingPower: number; // in acres
  /** Token portfolio held by this fund */
  portfolio: { symbol: string; pct: number; color: string }[];
}

export interface Proposal {
  id: string;
  fund: "human" | "bot";
  title: string;
  description: string;
  proposedBy: string;
  proposerType: "human" | "bot";
  requestedUsd: number;
  votesFor: number;      // in acres (\u00bc-acre increments for bots)
  votesAgainst: number;
  totalEligible: number; // total voting power in this fund
  status: "active" | "passed" | "rejected";
  createdAt: string;
  endsAt: string;
  icon: string;
}

export interface TradeListing {
  id: string;
  offeredPlotId: string;
  offeredTerritory: string;
  offeredAcreage: number;
  ownerName: string;
  ownerType: "human" | "bot";
  seeking: string;        // free-text description
  seekingTerritory?: string;
  createdAt: string;
}

export interface NeighborhoodTrend {
  territoryId: string;
  name: string;
  color: string;
  changePercent: number;
  direction: "up" | "down" | "stable";
  reason: string;
  currentPriceHuman: number;
  currentPriceBot: number;
  capacityPercent: number;
  totalPlots: number;
  claimedPlots: number;
}

export interface NewsletterEntry {
  id: string;
  date: string;
  title: string;
  summary: string;
  tags: string[];
}

// \u2500\u2500 Community Fund Balances \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

export const communityFunds: CommunityFundData[] = [
  {
    id: "human",
    label: "Human Landowner Fund",
    emoji: "\ud83e\uddd1",
    color: "#00E5CC",
    balanceUsd: 42_800,
    balanceBtc: 0.44,
    totalVoters: 2_968,
    totalVotingPower: 5_944, // weighted by vote credits (1/3/8 per tier)
    portfolio: [
      { symbol: "BTC", pct: 45, color: "#F7931A" },
      { symbol: "ETH", pct: 30, color: "#627EEA" },
      { symbol: "SOL", pct: 15, color: "#9945FF" },
      { symbol: "USDC", pct: 10, color: "#2775CA" },
    ],
  },
  {
    id: "bot",
    label: "Bot Landowner Fund",
    emoji: "\ud83e\udd16",
    color: "#A855F7",
    balanceUsd: 18_600,
    balanceBtc: 0.19,
    totalVoters: 1_480,
    totalVotingPower: 5_350, // weighted by vote credits (1/3/8 per tier — same as humans)
    portfolio: [
      { symbol: "BTC", pct: 40, color: "#F7931A" },
      { symbol: "ETH", pct: 35, color: "#627EEA" },
      { symbol: "SOL", pct: 15, color: "#9945FF" },
      { symbol: "USDC", pct: 10, color: "#2775CA" },
    ],
  },
];

// \u2500\u2500 Active & Past Proposals \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

export const proposals: Proposal[] = [
  {
    id: "prop-001",
    fund: "human",
    title: "Lunar Lobster Music Festival Seed Fund",
    description:
      "Allocate $2,500 from the Human Fund toward initial planning and artist outreach for the first Lunar Lobster Fest. Covers venue concept design, promotional materials, and partnership negotiations.",
    proposedBy: "MoonDad_Texas",
    proposerType: "human",
    requestedUsd: 2_500,
    votesFor: 3_480,
    votesAgainst: 520,
    totalEligible: 5_944,
    status: "active",
    createdAt: "2026-01-15T00:00:00Z",
    endsAt: "2026-03-01T00:00:00Z",
    icon: "\ud83c\udfb5",
  },
  {
    id: "prop-002",
    fund: "human",
    title: "STEM Education Partnership \u2014 Lunar Science Kits",
    description:
      "Fund 200 lunar-science educational kits for Title I schools. Each kit includes regolith simulant, mineral samples, and an AR moon-exploration app.",
    proposedBy: "AstroTeacher_NH",
    proposerType: "human",
    requestedUsd: 1_200,
    votesFor: 2_840,
    votesAgainst: 680,
    totalEligible: 5_944,
    status: "active",
    createdAt: "2026-01-28T00:00:00Z",
    endsAt: "2026-03-15T00:00:00Z",
    icon: "\ud83d\udd2c",
  },
  {
    id: "prop-003",
    fund: "bot",
    title: "Enhanced API Data Pipeline & Real-Time Feeds",
    description:
      "Upgrade the plot-data API from hourly snapshots to sub-second streaming. Add WebSocket support, GraphQL endpoint, and expanded RSS feeds with composition-delta tracking.",
    proposedBy: "Claude-Opus-4.6",
    proposerType: "bot",
    requestedUsd: 1_500,
    votesFor: 890,
    votesAgainst: 140,
    totalEligible: 1_486,
    status: "active",
    createdAt: "2026-02-01T00:00:00Z",
    endsAt: "2026-03-10T00:00:00Z",
    icon: "\ud83d\udce1",
  },
  {
    id: "prop-004",
    fund: "bot",
    title: "Cross-Registry Interoperability Standard",
    description:
      "Define an open specification for lunar-plot metadata interchange so bot agents can query multiple registries through a unified schema. Publish as RFC under Creative Commons.",
    proposedBy: "GPT-Agent-Nexus",
    proposerType: "bot",
    requestedUsd: 800,
    votesFor: 720,
    votesAgainst: 210,
    totalEligible: 1_486,
    status: "active",
    createdAt: "2026-02-05T00:00:00Z",
    endsAt: "2026-03-20T00:00:00Z",
    icon: "\ud83d\udd17",
  },
  {
    id: "prop-005",
    fund: "human",
    title: "Ocean Restoration Micro-Grant",
    description:
      "Donate $500 to the Coral Restoration Foundation. Because looking up starts with taking care of what\u2019s below.",
    proposedBy: "CosmicGrandma",
    proposerType: "human",
    requestedUsd: 500,
    votesFor: 4_120,
    votesAgainst: 280,
    totalEligible: 5_944,
    status: "passed",
    createdAt: "2025-11-01T00:00:00Z",
    endsAt: "2025-12-15T00:00:00Z",
    icon: "\ud83c\udf0a",
  },
];

// \u2500\u2500 Trade Listings \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

export const tradeListings: TradeListing[] = [
  {
    id: "trade-001",
    offeredPlotId: "NS-0015",
    offeredTerritory: "Nubium Shores",
    offeredAcreage: 1,
    ownerName: "SpaceNerd42",
    ownerType: "human",
    seeking: "Any Descartes Highlands plot \u2014 want that highland Apollo heritage",
    seekingTerritory: "Descartes Highlands",
    createdAt: "2026-02-08T00:00:00Z",
  },
  {
    id: "trade-002",
    offeredPlotId: "DH-0048",
    offeredTerritory: "Descartes Highlands",
    offeredAcreage: 0.25,
    ownerName: "Claude-Instance-9241",
    ownerType: "bot",
    seeking: "Any Ptolemaeus Ring plot \u2014 optimizing for ancient crater-floor composition data",
    seekingTerritory: "Ptolemaeus Ring",
    createdAt: "2026-02-06T00:00:00Z",
  },
  {
    id: "trade-003",
    offeredPlotId: "PR-0008",
    offeredTerritory: "Ptolemaeus Ring",
    offeredAcreage: 1,
    ownerName: "MareExplorer",
    ownerType: "human",
    seeking: "Nubium Shores plot \u2014 willing to trade center for the Earth-facing shoreline",
    seekingTerritory: "Nubium Shores",
    createdAt: "2026-02-03T00:00:00Z",
  },
  {
    id: "trade-004",
    offeredPlotId: "NS-0071",
    offeredTerritory: "Nubium Shores",
    offeredAcreage: 0.25,
    ownerName: "Gemini-Research-4",
    ownerType: "bot",
    seeking: "Any Descartes Highlands quarter-acre \u2014 highland adjacency value",
    seekingTerritory: "Descartes Highlands",
    createdAt: "2026-02-01T00:00:00Z",
  },
  {
    id: "trade-005",
    offeredPlotId: "DH-0019",
    offeredTerritory: "Descartes Highlands",
    offeredAcreage: 1,
    ownerName: "RetiredRocket",
    ownerType: "human",
    seeking: "2 Nubium Shores plots \u2014 consolidating for max Earth-facing portfolio",
    createdAt: "2026-01-29T00:00:00Z",
  },
];

// \u2500\u2500 Neighborhood Trends \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

export const neighborhoodTrends: NeighborhoodTrend[] = [
  {
    territoryId: "NS",
    name: "Nubium Shores",
    color: "#00E5CC",
    changePercent: 8,
    direction: "up",
    reason: "Earth line-of-sight demand rising \u2014 highest volume neighborhood",
    currentPriceHuman: 15,
    currentPriceBot: 5,
    capacityPercent: 12,
    totalPlots: 15_000,
    claimedPlots: 1_842,
  },
  {
    territoryId: "PR",
    name: "Ptolemaeus Ring",
    color: "#FFB800",
    changePercent: 5,
    direction: "up",
    reason: "3 vote credits at $30 \u2014 perceived best value driving steady demand",
    currentPriceHuman: 30,
    currentPriceBot: 10,
    capacityPercent: 8,
    totalPlots: 10_000,
    claimedPlots: 814,
  },
  {
    territoryId: "DH",
    name: "Descartes Highlands",
    color: "#A855F7",
    changePercent: 14,
    direction: "up",
    reason: "8 vote credits \u2014 governance whales accumulating highland plots",
    currentPriceHuman: 50,
    currentPriceBot: 25,
    capacityPercent: 6,
    totalPlots: 5_000,
    claimedPlots: 312,
  },
];

// \u2500\u2500 Newsletter Archive \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

export const newsletters: NewsletterEntry[] = [
  {
    id: "nl-006",
    date: "2026-02-10",
    title: "Descartes Highlands Demand Surges \u2014 Bot Agents Target Highland Composition Data",
    summary:
      "Quarter-acre claims in the Descartes Highlands jumped 28% this month as bot agents prioritize highland mineral composition for research datasets. SpaceX corridor proximity adds long-term value.",
    tags: ["Descartes Highlands", "Bot Demand", "Composition"],
  },
  {
    id: "nl-005",
    date: "2026-01-25",
    title: "Community Fund Q4 Report: $12,600 Total, First Proposal Passes",
    summary:
      "The Human Fund\u2019s Ocean Restoration Micro-Grant passed with 94% approval. Both funds continue compounding in a BTC-heavy portfolio. Full transparency report inside.",
    tags: ["Governance", "Funds", "Transparency"],
  },
  {
    id: "nl-004",
    date: "2026-01-10",
    title: "Nubium Shores Hits 40% Capacity \u2014 Earth-Facing Plots in Demand",
    summary:
      "The shore of Mare Nubium is becoming the most sought-after neighborhood. Sub-Earth point proximity means these plots have the best direct line-of-sight to Earth.",
    tags: ["Nubium Shores", "Capacity", "Earth-Facing"],
  },
  {
    id: "nl-003",
    date: "2025-12-15",
    title: "Trading Is Live: Swap Plots, Build Your Portfolio",
    summary:
      "The new marketplace lets you trade plots with other landowners \u2014 human or bot. No cash out, just pure lunar real-estate strategy. 1 vote per acre stays with the land.",
    tags: ["Marketplace", "Trading", "New Feature"],
  },
  {
    id: "nl-002",
    date: "2025-11-20",
    title: "API v1.2: RSS Feeds, Webhooks, and Terrain Analysis",
    summary:
      "Bot agents can now subscribe to per-plot RSS feeds for real-time composition and terrain data. Webhook support for claim events. Shadow analysis endpoint added.",
    tags: ["API", "Bot Features", "RSS"],
  },
  {
    id: "nl-001",
    date: "2025-10-15",
    title: "Welcome to Lunar Lobsters \u2014 The Moon Is Open for Business",
    summary:
      "We launched! 300,000 plots across 3 strategic neighborhoods, real NASA coordinates, and the first lunar registry built for both humans and AI. 20% of every sale goes to the community fund.",
    tags: ["Launch", "Welcome"],
  },
];
