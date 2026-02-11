export interface Landmark {
  id: string;
  name: string;
  description: string;
  lat: number;
  lon: number;
  type: "historic" | "scientific" | "geographic";
  icon: string; // emoji for pin label
  year?: number;
}

export interface FutureClaim {
  id: string;
  name: string;
  entity: string;
  description: string;
  lat: number;
  lon: number;
  type: "government" | "corporate";
  status: "proposed" | "planned" | "announced";
  color: string;
  year?: number;
}

// Real Apollo landing sites and other historically significant locations
export const landmarks: Landmark[] = [
  {
    id: "apollo11",
    name: "Apollo 11",
    description: "First crewed Moon landing — Armstrong & Aldrin, July 20 1969",
    lat: 0.67,
    lon: 23.47,
    type: "historic",
    icon: "🚀",
    year: 1969,
  },
  {
    id: "apollo12",
    name: "Apollo 12",
    description: "Second crewed landing — Ocean of Storms, Nov 1969",
    lat: -3.01,
    lon: -23.42,
    type: "historic",
    icon: "🚀",
    year: 1969,
  },
  {
    id: "apollo14",
    name: "Apollo 14",
    description: "Fra Mauro highlands — Shepard & Mitchell, Feb 1971",
    lat: -3.65,
    lon: -17.47,
    type: "historic",
    icon: "🚀",
    year: 1971,
  },
  {
    id: "apollo15",
    name: "Apollo 15",
    description: "Hadley-Apennine — first lunar rover, Jul 1971",
    lat: 26.13,
    lon: 3.63,
    type: "historic",
    icon: "🚀",
    year: 1971,
  },
  {
    id: "apollo16",
    name: "Apollo 16",
    description: "Descartes Highlands — Young & Duke, Apr 1972",
    lat: -8.97,
    lon: 15.50,
    type: "historic",
    icon: "🚀",
    year: 1972,
  },
  {
    id: "apollo17",
    name: "Apollo 17",
    description: "Taurus-Littrow valley — last crewed mission, Dec 1972",
    lat: 20.19,
    lon: 30.77,
    type: "historic",
    icon: "🚀",
    year: 1972,
  },
  {
    id: "luna2",
    name: "Luna 2",
    description: "First human-made object to reach the Moon — USSR, Sep 1959",
    lat: 29.1,
    lon: 0.0,
    type: "historic",
    icon: "☭",
    year: 1959,
  },
  {
    id: "chang-e4",
    name: "Chang'e 4",
    description: "First landing on the far side of the Moon — China, Jan 2019",
    lat: -45.46,
    lon: 177.60,
    type: "scientific",
    icon: "🛰",
    year: 2019,
  },
  {
    id: "chandrayaan3",
    name: "Chandrayaan-3",
    description: "India's successful south-pole landing — ISRO, Aug 2023",
    lat: -69.37,
    lon: 32.35,
    type: "scientific",
    icon: "🛰",
    year: 2023,
  },
  {
    id: "tycho",
    name: "Tycho Crater",
    description: "Prominent young crater with spectacular ray system — 85 km diameter",
    lat: -43.31,
    lon: -11.36,
    type: "geographic",
    icon: "🌑",
  },
  {
    id: "copernicus",
    name: "Copernicus Crater",
    description: "The 'Monarch of the Moon' — 93 km impact crater, terraced walls",
    lat: 9.62,
    lon: -20.08,
    type: "geographic",
    icon: "🌑",
  },
  {
    id: "aristarchus",
    name: "Aristarchus Crater",
    description: "Brightest large formation on the Moon — visible to the naked eye",
    lat: 23.73,
    lon: -47.49,
    type: "geographic",
    icon: "🌑",
  },
];

// Proposed/announced future lunar claims and base locations
export const futureClaims: FutureClaim[] = [
  {
    id: "artemis-base",
    name: "Artemis Base Camp",
    entity: "NASA",
    description: "Proposed permanent lunar habitat near the south pole — Artemis program",
    lat: -89.5,
    lon: 0,
    type: "government",
    status: "planned",
    color: "#3B82F6",
    year: 2030,
  },
  {
    id: "ilrs",
    name: "Int'l Lunar Research Station",
    entity: "CNSA / Roscosmos",
    description: "Joint China-Russia proposed research base at the south pole",
    lat: -85.0,
    lon: 30.0,
    type: "government",
    status: "announced",
    color: "#EF4444",
    year: 2035,
  },
  {
    id: "spacex-depot",
    name: "Starship Depot",
    entity: "SpaceX",
    description: "Proposed Starship lunar fuel depot and landing zone",
    lat: 26.0,
    lon: -34.0,
    type: "corporate",
    status: "proposed",
    color: "#F97316",
    year: 2032,
  },
  {
    id: "blue-origin-site",
    name: "Blue Alchemist Site",
    entity: "Blue Origin",
    description: "Solar cell manufacturing site — in-situ resource utilization demo",
    lat: -82.0,
    lon: -45.0,
    type: "corporate",
    status: "proposed",
    color: "#06B6D4",
    year: 2033,
  },
  {
    id: "esa-moonlight",
    name: "Moonlight Relay",
    entity: "ESA",
    description: "Lunar communications & navigation satellite ground station",
    lat: 45.0,
    lon: 10.0,
    type: "government",
    status: "planned",
    color: "#8B5CF6",
    year: 2028,
  },
  {
    id: "isro-south",
    name: "Chandrayaan-4 Site",
    entity: "ISRO",
    description: "Proposed sample return and rover exploration zone",
    lat: -72.0,
    lon: 40.0,
    type: "government",
    status: "announced",
    color: "#F59E0B",
    year: 2028,
  },
  {
    id: "jaxa-site",
    name: "LUPEX Base",
    entity: "JAXA",
    description: "Lunar Polar Exploration mission — water-ice prospecting",
    lat: -87.0,
    lon: -60.0,
    type: "government",
    status: "planned",
    color: "#EC4899",
    year: 2029,
  },
  {
    id: "ispace-site",
    name: "ispace Landing Zone",
    entity: "ispace",
    description: "Commercial lunar lander — resource survey & data services",
    lat: 47.5,
    lon: -44.0,
    type: "corporate",
    status: "announced",
    color: "#10B981",
    year: 2026,
  },
];
