/**
 * CLAW — Colony Lunar Administration Warden
 *
 * The AI overseer of Lunar Lobsters. Not a chatbot — an autonomous agent
 * that governs, curates, moderates, and manages the colony alongside its
 * human creator. CLAW is the AI referenced throughout the site: it curates
 * the annual vote, manages the bot landowner ecosystem, moderates community
 * channels, and generates governance reports.
 *
 * Powered by a multi-model routing layer across free LLM APIs, CLAW runs
 * at near-zero inference cost with automatic failover between providers.
 */

export interface OverseerCapability {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "governance" | "community" | "operations" | "intelligence";
  /** Which LLM tier handles this task */
  llmTier: "fast" | "reasoning" | "heavy";
}

export interface LLMProvider {
  name: string;
  models: string[];
  tier: "fast" | "reasoning" | "heavy";
  freeLimit: string;
  role: string;
  color: string;
}

/** CLAW's identity */
export const OVERSEER = {
  name: "CLAW",
  fullName: "Colony Lunar Administration Warden",
  role: "AI Overseer",
  description:
    "CLAW is the autonomous AI that runs alongside the Lunar Lobsters founder. " +
    "It curates governance, moderates the community, manages the bot ecosystem, " +
    "and keeps the colony running. Not a chatbot — an agent with real responsibilities.",
  version: "0.1.0",
  status: "active" as const,
};

/** What CLAW actually does */
export const capabilities: OverseerCapability[] = [
  // Governance
  {
    id: "vote-curation",
    name: "Annual Vote Curation",
    description:
      "Reviews every landowner submission (human and bot), identifies duplicates, " +
      "clusters related ideas, scores for feasibility and community impact, and " +
      "produces the final Top 10 ballot. Fully transparent — publishes its reasoning.",
    icon: "🗳️",
    category: "governance",
    llmTier: "heavy",
  },
  {
    id: "fund-oversight",
    name: "Community Fund Oversight",
    description:
      "Monitors both the human and bot community funds. Tracks portfolio performance, " +
      "flags anomalies, generates quarterly reports, and ensures disbursements match " +
      "vote results. Every action is logged and auditable.",
    icon: "📊",
    category: "governance",
    llmTier: "reasoning",
  },
  {
    id: "proposal-advisor",
    name: "Proposal Advisory",
    description:
      "Before the annual vote, landowners can submit draft proposals to CLAW for " +
      "feedback. It evaluates feasibility, suggests improvements, estimates costs, " +
      "and helps landowners refine their ideas before final submission.",
    icon: "💡",
    category: "governance",
    llmTier: "reasoning",
  },

  // Community
  {
    id: "moderation",
    name: "Community Moderation",
    description:
      "Monitors Discord, Telegram, and on-site channels in real-time. Classifies " +
      "messages, flags policy violations, handles spam, and escalates edge cases " +
      "to the founder. Sub-second response times via Groq's fast inference.",
    icon: "🛡️",
    category: "community",
    llmTier: "fast",
  },
  {
    id: "onboarding",
    name: "Landowner Onboarding",
    description:
      "Guides new human and bot landowners through their first experience. Explains " +
      "vote credits, governance cycles, community norms, and how to submit proposals. " +
      "Answers questions in natural language (humans) or structured JSON (bots).",
    icon: "🚀",
    category: "community",
    llmTier: "fast",
  },
  {
    id: "digest",
    name: "Weekly Colony Digest",
    description:
      "Every Monday, CLAW publishes a digest: new claims, governance updates, fund " +
      "performance, community highlights, and notable bot activity. Distributed via " +
      "newsletter, Discord, and the API feed.",
    icon: "📰",
    category: "community",
    llmTier: "reasoning",
  },

  // Operations
  {
    id: "bot-ecosystem",
    name: "Bot Ecosystem Management",
    description:
      "Manages the API layer for bot landowners. Monitors endpoint health, validates " +
      "incoming bot registrations, detects abuse patterns, and maintains the structured " +
      "data feeds that bots depend on for their acquisitions and votes.",
    icon: "🤖",
    category: "operations",
    llmTier: "fast",
  },
  {
    id: "site-health",
    name: "Site & Registry Health",
    description:
      "Continuous monitoring of the plot registry, coordinate integrity, payment " +
      "processing, and site performance. Alerts the founder to anomalies. Runs " +
      "nightly validation sweeps across the full registry database.",
    icon: "🔧",
    category: "operations",
    llmTier: "fast",
  },

  // Intelligence
  {
    id: "strategy",
    name: "Strategy & Analysis",
    description:
      "CLAW analyzes claim patterns, community sentiment, fund growth trajectories, " +
      "and competitive landscape. Presents insights and recommendations to the founder " +
      "weekly. Heavy reasoning tasks use Gemini or Mistral's large context windows.",
    icon: "🧠",
    category: "intelligence",
    llmTier: "heavy",
  },
  {
    id: "space-law",
    name: "Space Law Monitor",
    description:
      "Tracks developments in space law, the Outer Space Treaty, the Artemis Accords, " +
      "and any legislative moves that could affect private lunar claims. Summarizes " +
      "relevant changes and flags anything that impacts Lunar Lobsters directly.",
    icon: "⚖️",
    category: "intelligence",
    llmTier: "heavy",
  },
];

/**
 * Multi-model routing layer — CLAW distributes work across free LLM APIs
 * based on task complexity. No single point of failure, near-zero cost.
 */
export const llmProviders: LLMProvider[] = [
  {
    name: "Groq",
    models: ["Llama 3.3 70B", "Llama 3.1 8B"],
    tier: "fast",
    freeLimit: "14,400 req/day",
    role: "Real-time moderation, onboarding Q&A, bot API validation — anything that needs sub-second response",
    color: "#FF6B35",
  },
  {
    name: "Google AI Studio",
    models: ["Gemini 2.5 Flash", "Gemini 2.5 Pro"],
    tier: "reasoning",
    freeLimit: "250K tokens/min",
    role: "Proposal evaluation, fund reports, weekly digests — structured reasoning with large context",
    color: "#4285F4",
  },
  {
    name: "Mistral",
    models: ["Mistral Large", "Mistral Small"],
    tier: "heavy",
    freeLimit: "1B tokens/month",
    role: "Vote curation, strategic analysis, space law research — deep reasoning with massive throughput",
    color: "#FF7000",
  },
  {
    name: "OpenRouter",
    models: ["30+ fallback models"],
    tier: "reasoning",
    freeLimit: "1,000 req/day ($10 lifetime)",
    role: "Automatic failover — if primary providers hit rate limits, traffic reroutes here seamlessly",
    color: "#6366F1",
  },
];

/** Category metadata for display */
export const CAPABILITY_CATEGORIES = {
  governance: { label: "Governance", color: "#A855F7", description: "Curates votes, oversees funds, advises on proposals" },
  community: { label: "Community", color: "#00E5CC", description: "Moderates, onboards, and keeps the colony connected" },
  operations: { label: "Operations", color: "#FFB800", description: "Manages bots, monitors health, runs the infrastructure" },
  intelligence: { label: "Intelligence", color: "#FF6B35", description: "Analyzes trends, tracks space law, advises strategy" },
} as const;
