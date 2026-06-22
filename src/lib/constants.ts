export const SITE = {
  name: "Mohamed Yasser",
  tagline: "Where Government meets Intelligence",
  role: "Government Solution Architect",
  experience: "20+",
} as const;

export const ROLES = [
  "Government Solution Architect",
  "Emerging Technology Strategist",
  "AI Systems Architect",
  "Digital Transformation Leader",
] as const;

export const DOMAINS = [
  { id: "ai", label: "Artificial Intelligence", group: "ai" },
  { id: "agentic", label: "Agentic AI", group: "ai" },
  { id: "gov", label: "Government Technology", group: "gov" },
  { id: "cities", label: "Smart Cities", group: "gov" },
  { id: "enterprise", label: "Enterprise Architecture", group: "arch" },
  { id: "digital", label: "Digital Transformation", group: "arch" },
  { id: "solution", label: "Solution Architecture", group: "arch" },
  { id: "cloud", label: "Cloud & On-Prem Platforms", group: "cloud" },
  { id: "cv", label: "Computer Vision", group: "ai" },
  { id: "genai", label: "GenAI Platforms", group: "ai" },
  { id: "observability", label: "Observability", group: "ops" },
  { id: "security", label: "Security", group: "ops" },
  { id: "governance", label: "Data Governance", group: "ops" },
] as const;

export const EASING = {
  cinematic: [0.16, 1, 0.3, 1] as [number, number, number, number],
  power4: [0.77, 0, 0.175, 1] as [number, number, number, number],
  expo: [0.19, 1, 0.22, 1] as [number, number, number, number],
} as const;

export const COLORS = {
  void: "#000000",
  deep: "#050510",
  navy: "#0A0A1A",
  gold: "#C9A84C",
  goldLight: "#D4A853",
  electric: "#00BFFF",
  white: "#FFFFFF",
} as const;
