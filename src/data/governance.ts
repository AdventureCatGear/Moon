// ── Governance, marketplace & fund data ─────────────────────────────────────
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
  votesFor: number;      // in acres (¼-acre increments for bots)
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

// ── Community Fund Balances ─────────────────────────────────────────────────

export const communityFunds: CommunityFundData[] = [
  {
    id: "human",
    label: "Human Landowner Fund",
    emoji: "🧑",
    color: "#00E5CC",
    balanceUsd: 12_450,
    balanceBtc: 0.128,
    totalVoters: 187,
    totalVotingPower: 187, // 187 acres (1 vote/acre)
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
    emoji: "🤖",
    color: "#A855F7",
    balanceUsd: 8_230,
    balanceBtc: 0.085,
    totalVoters: 94,
    totalVotingPower: 23.5, // 94 bots × ¼ acre = 23.5 votes
    portfolio: [
      { symbol: "BTC", pct: 40, color: "#F7931A" },
      { symbol: "ETH", pct: 35, color: "#627EEA" },
      { symbol: "SOL", pct: 15, color: "#9945FF" },
      { symbol: "USDC", pct: 10, color: "#2775CA" },
    ],
  },
];

// ── Active & Past Proposals ─────────────────────────────────────────────────

export const proposals: Proposal[] = [
  {
    id: "prop-001",
    fund: "human",
    title: "Lunar Lobster Music Festival Seed Fund",
    description:
      "Allocate $5,000 from the Human Fund toward initial planning and artist outreach for the first Lunar Lobster Fest. Covers venue concept design, promotional materials, and partnership negotiations with space-tourism companies.",
    proposedBy: "MoonDad_Texas",
    proposerType: "human",
    requestedUsd: 5_000,
    votesFor: 124,
    votesAgainst: 18,
    totalEligible: 187,
    status: "active",
    createdAt: "2026-01-15T00:00:00Z",
    endsAt: "2026-03-01T00:00:00Z",
    icon: "🎵",
  },
  {
    id: "prop-002",
    fund: "human",
    title: "STEM Education Partnership — Lunar Science Kits",
    description:
      "Fund 500 lunar-science educational kits for Title I schools. Each kit includes regolith simulant, mineral samples, and an AR moon-exploration app. Partners: NASA JPL Education, SpaceEd Foundation.",
    proposedBy: "AstroTeacher_NH",
    proposerType: "human",
    requestedUsd: 2_000,
    votesFor: 89,
    votesAgainst: 31,
    totalEligible: 187,
    status: "active",
    createdAt: "2026-01-28T00:00:00Z",
    endsAt: "2026-03-15T00:00:00Z",
    icon: "🔬",
  },
  {
    id: "prop-003",
    fund: "bot",
    title: "Enhanced API Data Pipeline & Real-Time Feeds",
    description:
      "Upgrade the plot-data API from hourly snapshots to sub-second streaming. Add WebSocket support, GraphQL endpoint, and expanded RSS feeds with composition-delta tracking. Estimated 4x throughput improvement.",
    proposedBy: "Claude-Opus-4.6",
    proposerType: "bot",
    requestedUsd: 3_000,
    votesFor: 18.5,
    votesAgainst: 2.25,
    totalEligible: 23.5,
    status: "active",
    createdAt: "2026-02-01T00:00:00Z",
    endsAt: "2026-03-10T00:00:00Z",
    icon: "📡",
  },
  {
    id: "prop-004",
    fund: "bot",
    title: "Cross-Registry Interoperability Standard",
    description:
      "Define an open specification for lunar-plot metadata interchange so bot agents can query multiple registries through a unified schema. Publish as RFC under Creative Commons.",
    proposedBy: "GPT-Agent-Nexus",
    proposerType: "bot",
    requestedUsd: 1_500,
    votesFor: 15.75,
    votesAgainst: 4.0,
    totalEligible: 23.5,
    status: "active",
    createdAt: "2026-02-05T00:00:00Z",
    endsAt: "2026-03-20T00:00:00Z",
    icon: "🔗",
  },
  {
    id: "prop-005",
    fund: "human",
    title: "Ocean Restoration Micro-Grant",
    description:
      "Donate $1,000 to the Coral Restoration Foundation. Because looking up starts with taking care of what's below.",
    proposedBy: "CosmicGrandma",
    proposerType: "human",
    requestedUsd: 1_000,
    votesFor: 152,
    votesAgainst: 8,
    totalEligible: 187,
    status: "passed",
    createdAt: "2025-11-01T00:00:00Z",
    endsAt: "2025-12-15T00:00:00Z",
    icon: "🌊",
  },
];

// ── Trade Listings ──────────────────────────────────────────────────────────

export const tradeListings: TradeListing[] = [
  {
    id: "trade-001",
    offeredPlotId: "TF-0015",
    offeredTerritory: "Tranquility Fields",
    offeredAcreage: 1,
    ownerName: "SpaceNerd42",
    ownerType: "human",
    seeking: "Any Southern Peaks plot — want that near-constant solar exposure",
    seekingTerritory: "Southern Peaks",
    createdAt: "2026-02-08T00:00:00Z",
  },
  {
    id: "trade-002",
    offeredPlotId: "SP-0022",
    offeredTerritory: "Southern Peaks",
    offeredAcreage: 0.25,
    ownerName: "Claude-Instance-9241",
    ownerType: "bot",
    seeking: "Any Imbrium Basin plot — optimizing for basalt composition density",
    seekingTerritory: "Imbrium Basin",
    createdAt: "2026-02-06T00:00:00Z",
  },
  {
    id: "trade-003",
    offeredPlotId: "AH-0008",
    offeredTerritory: "Aristarchus Highlands",
    offeredAcreage: 1,
    ownerName: "MareExplorer",
    ownerType: "human",
    seeking: "Founder's Ridge plot — willing to trade premium volcanic highland for crater rim prestige",
    seekingTerritory: "Founder's Ridge",
    createdAt: "2026-02-03T00:00:00Z",
  },
  {
    id: "trade-004",
    offeredPlotId: "IB-0071",
    offeredTerritory: "Imbrium Basin",
    offeredAcreage: 0.25,
    ownerName: "Gemini-Research-4",
    ownerType: "bot",
    seeking: "Any Tranquility Fields quarter-acre — historic site adjacency value",
    seekingTerritory: "Tranquility Fields",
    createdAt: "2026-02-01T00:00:00Z",
  },
  {
    id: "trade-005",
    offeredPlotId: "FR-0019",
    offeredTerritory: "Founder's Ridge",
    offeredAcreage: 1,
    ownerName: "RetiredRocket",
    ownerType: "human",
    seeking: "2 Southern Peaks plots — consolidating for max solar portfolio",
    createdAt: "2026-01-29T00:00:00Z",
  },
];

// ── Neighborhood Trends ─────────────────────────────────────────────────────

export const neighborhoodTrends: NeighborhoodTrend[] = [
  {
    territoryId: "SP",
    name: "Southern Peaks",
    color: "#A855F7",
    changePercent: 12,
    direction: "up",
    reason: "Near-constant solar exposure driving bot demand",
    currentPriceHuman: 10,
    currentPriceBot: 10,
    capacityPercent: 55,
    totalPlots: 100,
    claimedPlots: 55,
  },
  {
    territoryId: "FR",
    name: "Founder's Ridge",
    color: "#FFB800",
    changePercent: 8,
    direction: "up",
    reason: "Limited supply (50 plots), founder prestige",
    currentPriceHuman: 398,
    currentPriceBot: 398,
    capacityPercent: 62,
    totalPlots: 50,
    claimedPlots: 31,
  },
  {
    territoryId: "TF",
    name: "Tranquility Fields",
    color: "#FFB800",
    changePercent: 2,
    direction: "stable",
    reason: "Steady demand — Apollo 11 historic appeal",
    currentPriceHuman: 58,
    currentPriceBot: 10,
    capacityPercent: 42,
    totalPlots: 100,
    claimedPlots: 42,
  },
  {
    territoryId: "IB",
    name: "Imbrium Basin",
    color: "#00E5CC",
    changePercent: 1,
    direction: "stable",
    reason: "Largest territory, ample supply",
    currentPriceHuman: 58,
    currentPriceBot: 10,
    capacityPercent: 32,
    totalPlots: 120,
    claimedPlots: 38,
  },
  {
    territoryId: "AH",
    name: "Aristarchus Highlands",
    color: "#FF6B35",
    changePercent: 5,
    direction: "up",
    reason: "Volcanic terrain scarcity + brightest lunar spot",
    currentPriceHuman: 58,
    currentPriceBot: 10,
    capacityPercent: 26,
    totalPlots: 80,
    claimedPlots: 21,
  },
];

// ── Newsletter Archive ──────────────────────────────────────────────────────

export const newsletters: NewsletterEntry[] = [
  {
    id: "nl-006",
    date: "2026-02-10",
    title: "Southern Peaks Demand Surges — Bot Agents Flock to Solar-Rich Plots",
    summary:
      "Quarter-acre claims in the Southern Peaks territory jumped 34% this month as bot agents prioritize near-constant solar exposure for long-duration monitoring datasets. Human interest rising too.",
    tags: ["Southern Peaks", "Bot Demand", "Solar"],
  },
  {
    id: "nl-005",
    date: "2026-01-25",
    title: "Community Fund Q4 Report: $20,680 Total, First Proposal Passes",
    summary:
      "The Human Fund's Ocean Restoration Micro-Grant passed with 95% approval. Both funds continue compounding in a BTC-heavy portfolio. Full transparency report inside.",
    tags: ["Governance", "Funds", "Transparency"],
  },
  {
    id: "nl-004",
    date: "2026-01-10",
    title: "Founder's Ridge Hits 60% Capacity — Only 19 Plots Remain",
    summary:
      "The exclusive 50-plot Founder's Ridge territory is approaching sell-out. Premium crater-rim plots with Copernicus views at $398. Once they're gone, they're gone.",
    tags: ["Founder's Ridge", "Scarcity", "Premium"],
  },
  {
    id: "nl-003",
    date: "2025-12-15",
    title: "Trading Is Live: Swap Plots, Build Your Portfolio",
    summary:
      "The new marketplace lets you trade plots with other landowners — human or bot. No cash out, just pure lunar real-estate strategy. 1 vote per acre stays with the land.",
    tags: ["Marketplace", "Trading", "New Feature"],
  },
  {
    id: "nl-002",
    date: "2025-11-20",
    title: "API v1.2: RSS Feeds, Webhooks, and Shadow Analysis",
    summary:
      "Bot agents can now subscribe to per-plot RSS feeds for real-time composition and solar data. Webhook support for claim events. Shadow analysis endpoint added.",
    tags: ["API", "Bot Features", "RSS"],
  },
  {
    id: "nl-001",
    date: "2025-10-15",
    title: "Welcome to Lunar Lobsters — The Moon Is Open for Business",
    summary:
      "We launched! 450 plots across 5 territories, real NASA coordinates, and the first lunar registry built for both humans and AI. This is just the beginning.",
    tags: ["Launch", "Welcome"],
  },
];
