export interface Landmark {
  id: string;
  name: string;
  description: string;
  lat: number;
  lon: number;
  type: "historic" | "scientific" | "geographic" | "rover" | "conspiracy";
  icon: string;
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

// ── Historic Apollo landing sites ───────────────────────────────────────────

const apolloSites: Landmark[] = [
  {
    id: "apollo11",
    name: "Apollo 11 — Tranquility Base",
    description: "First crewed Moon landing. Armstrong & Aldrin walked here Jul 20 1969. 21 h 36 min on surface.",
    lat: 0.67,
    lon: 23.47,
    type: "historic",
    icon: "👨‍🚀",
    year: 1969,
  },
  {
    id: "apollo12",
    name: "Apollo 12 — Ocean of Storms",
    description: "Precision landing near Surveyor 3. Conrad & Bean, Nov 1969. Retrieved Surveyor parts.",
    lat: -3.01,
    lon: -23.42,
    type: "historic",
    icon: "👨‍🚀",
    year: 1969,
  },
  {
    id: "apollo14",
    name: "Apollo 14 — Fra Mauro",
    description: "Shepard & Mitchell explored Fra Mauro highlands. Shepard hit golf balls on the Moon.",
    lat: -3.65,
    lon: -17.47,
    type: "historic",
    icon: "👨‍🚀",
    year: 1971,
  },
  {
    id: "apollo15",
    name: "Apollo 15 — Hadley-Apennine",
    description: "First use of Lunar Roving Vehicle. Scott & Irwin. Discovered the Genesis Rock.",
    lat: 26.13,
    lon: 3.63,
    type: "historic",
    icon: "👨‍🚀",
    year: 1971,
  },
  {
    id: "apollo16",
    name: "Apollo 16 — Descartes Highlands",
    description: "Young & Duke explored volcanic highlands. 3 EVAs, 95 kg of samples collected.",
    lat: -8.97,
    lon: 15.50,
    type: "historic",
    icon: "👨‍🚀",
    year: 1972,
  },
  {
    id: "apollo17",
    name: "Apollo 17 — Taurus-Littrow",
    description: "Last crewed Moon mission. Cernan & Schmitt (first scientist-astronaut). Longest EVAs.",
    lat: 20.19,
    lon: 30.77,
    type: "historic",
    icon: "👨‍🚀",
    year: 1972,
  },
];

// ── Rover locations ─────────────────────────────────────────────────────────

const roverSites: Landmark[] = [
  {
    id: "lrv-apollo15",
    name: "Lunar Rover — Apollo 15",
    description: "First rover driven on the Moon. Traveled 27.9 km across Hadley Rille area.",
    lat: 26.13,
    lon: 3.66,
    type: "rover",
    icon: "🚗",
    year: 1971,
  },
  {
    id: "lrv-apollo16",
    name: "Lunar Rover — Apollo 16",
    description: "Rover drove 26.7 km across Descartes region. Still parked on the Moon.",
    lat: -8.97,
    lon: 15.53,
    type: "rover",
    icon: "🚗",
    year: 1972,
  },
  {
    id: "lrv-apollo17",
    name: "Lunar Rover — Apollo 17",
    description: "Rover set speed record of 18 km/h. Traveled 35.9 km total. Farthest from LM: 7.6 km.",
    lat: 20.19,
    lon: 30.80,
    type: "rover",
    icon: "🚗",
    year: 1972,
  },
  {
    id: "lunokhod1",
    name: "Lunokhod 1",
    description: "Soviet robotic rover. First remote-controlled rover on another world. Operated 322 days.",
    lat: 38.24,
    lon: -35.00,
    type: "rover",
    icon: "🤖",
    year: 1970,
  },
  {
    id: "lunokhod2",
    name: "Lunokhod 2",
    description: "Traveled 39 km — distance record held until 2014 (Opportunity on Mars).",
    lat: 25.85,
    lon: 30.92,
    type: "rover",
    icon: "🤖",
    year: 1973,
  },
  {
    id: "yutu2",
    name: "Yutu-2 Rover",
    description: "Chinese rover on the far side. Longest-operating lunar rover. Deployed by Chang'e 4.",
    lat: -45.46,
    lon: 177.60,
    type: "rover",
    icon: "🤖",
    year: 2019,
  },
  {
    id: "pragyan",
    name: "Pragyan Rover",
    description: "Indian rover from Chandrayaan-3. Confirmed sulfur at the south pole. 100 m traverse.",
    lat: -69.37,
    lon: 32.35,
    type: "rover",
    icon: "🤖",
    year: 2023,
  },
];

// ── Soviet / Russian missions ───────────────────────────────────────────────

const sovietSites: Landmark[] = [
  {
    id: "luna2",
    name: "Luna 2 Impact",
    description: "First human-made object to reach the Moon. Impacted Sep 14, 1959.",
    lat: 29.1,
    lon: 0.0,
    type: "historic",
    icon: "💥",
    year: 1959,
  },
  {
    id: "luna9",
    name: "Luna 9",
    description: "First soft landing on the Moon. Transmitted photos from the surface, Feb 1966.",
    lat: 7.13,
    lon: -64.37,
    type: "historic",
    icon: "📡",
    year: 1966,
  },
  {
    id: "luna16",
    name: "Luna 16",
    description: "First robotic sample return. Brought back 101 g of lunar soil, Sep 1970.",
    lat: -0.68,
    lon: 56.30,
    type: "scientific",
    icon: "🧪",
    year: 1970,
  },
  {
    id: "luna24",
    name: "Luna 24",
    description: "Last Soviet Moon mission. Detected trace water in samples — confirmed decades later.",
    lat: 12.75,
    lon: 62.20,
    type: "scientific",
    icon: "🧪",
    year: 1976,
  },
];

// ── US Surveyor program (robotic precursors) ────────────────────────────────

const surveyorSites: Landmark[] = [
  {
    id: "surveyor1",
    name: "Surveyor 1",
    description: "First US soft landing on the Moon. Oceanus Procellarum, Jun 1966.",
    lat: -2.47,
    lon: -43.34,
    type: "scientific",
    icon: "📡",
    year: 1966,
  },
  {
    id: "surveyor3",
    name: "Surveyor 3",
    description: "Landed Apr 1967. Apollo 12 astronauts visited and retrieved parts in Nov 1969.",
    lat: -2.94,
    lon: -23.34,
    type: "scientific",
    icon: "📡",
    year: 1967,
  },
  {
    id: "surveyor7",
    name: "Surveyor 7",
    description: "Landed near Tycho crater rim. Last Surveyor mission, Jan 1968.",
    lat: -40.87,
    lon: -11.47,
    type: "scientific",
    icon: "📡",
    year: 1968,
  },
];

// ── Recent missions (2020s) ─────────────────────────────────────────────────

const recentMissions: Landmark[] = [
  {
    id: "chang-e4",
    name: "Chang'e 4",
    description: "First landing on the far side. Von Kármán crater, Jan 2019.",
    lat: -45.46,
    lon: 177.60,
    type: "scientific",
    icon: "🛰️",
    year: 2019,
  },
  {
    id: "chang-e5",
    name: "Chang'e 5",
    description: "Sample return mission. Retrieved 1.73 kg from Oceanus Procellarum, Dec 2020.",
    lat: 43.06,
    lon: -51.92,
    type: "scientific",
    icon: "🧪",
    year: 2020,
  },
  {
    id: "chang-e6",
    name: "Chang'e 6",
    description: "First far-side sample return. Apollo basin, Jun 2024.",
    lat: -41.64,
    lon: -153.99,
    type: "scientific",
    icon: "🧪",
    year: 2024,
  },
  {
    id: "chandrayaan3",
    name: "Chandrayaan-3",
    description: "India's successful south-pole landing. First to land near south pole, Aug 2023.",
    lat: -69.37,
    lon: 32.35,
    type: "scientific",
    icon: "🛰️",
    year: 2023,
  },
  {
    id: "slim",
    name: "SLIM (Moon Sniper)",
    description: "JAXA precision lander. Pinpoint landing within 100m of target, Jan 2024.",
    lat: -13.32,
    lon: 25.24,
    type: "scientific",
    icon: "🎯",
    year: 2024,
  },
  {
    id: "odysseus",
    name: "Odysseus (IM-1)",
    description: "First US commercial lunar lander. Intuitive Machines. Tipped on landing, Feb 2024.",
    lat: -80.13,
    lon: 1.44,
    type: "scientific",
    icon: "🛬",
    year: 2024,
  },
];

// ── Major geographic features ───────────────────────────────────────────────

const geographicFeatures: Landmark[] = [
  // Maria (seas)
  {
    id: "mare-tranquillitatis",
    name: "Mare Tranquillitatis",
    description: "Sea of Tranquility. Site of Apollo 11. 873 km diameter lava plain.",
    lat: 8.5,
    lon: 31.4,
    type: "geographic",
    icon: "🌊",
  },
  {
    id: "mare-imbrium",
    name: "Mare Imbrium",
    description: "Sea of Showers. Largest mare — 1,145 km. Formed by giant impact 3.9 Gya.",
    lat: 36.0,
    lon: -16.0,
    type: "geographic",
    icon: "🌊",
  },
  {
    id: "mare-serenitatis",
    name: "Mare Serenitatis",
    description: "Sea of Serenity. 707 km diameter. Near Apollo 17 landing site.",
    lat: 28.0,
    lon: 17.5,
    type: "geographic",
    icon: "🌊",
  },
  {
    id: "oceanus-procellarum",
    name: "Oceanus Procellarum",
    description: "Ocean of Storms. Largest dark spot on the Moon — 2,500 km across.",
    lat: 18.4,
    lon: -57.4,
    type: "geographic",
    icon: "🌊",
  },
  {
    id: "mare-crisium",
    name: "Mare Crisium",
    description: "Sea of Crises. Distinctive isolated mare, 555 km. Visible to naked eye.",
    lat: 17.0,
    lon: 59.1,
    type: "geographic",
    icon: "🌊",
  },

  // Major craters
  {
    id: "tycho",
    name: "Tycho Crater",
    description: "Prominent young crater with spectacular ray system — 85 km, 108 Mya old.",
    lat: -43.31,
    lon: -11.36,
    type: "geographic",
    icon: "💫",
  },
  {
    id: "copernicus",
    name: "Copernicus Crater",
    description: "The 'Monarch of the Moon'. 93 km diameter, terraced walls, central peaks.",
    lat: 9.62,
    lon: -20.08,
    type: "geographic",
    icon: "💫",
  },
  {
    id: "aristarchus",
    name: "Aristarchus Crater",
    description: "Brightest formation on the Moon. 40 km crater, visible to naked eye.",
    lat: 23.73,
    lon: -47.49,
    type: "geographic",
    icon: "💫",
  },
  {
    id: "plato",
    name: "Plato Crater",
    description: "Dark-floored walled plain. 101 km diameter. Floor unusually flat and dark.",
    lat: 51.6,
    lon: -9.3,
    type: "geographic",
    icon: "💫",
  },
  {
    id: "clavius",
    name: "Clavius Crater",
    description: "One of the largest craters — 231 km. Notable for arc of smaller craters inside.",
    lat: -58.4,
    lon: -14.4,
    type: "geographic",
    icon: "💫",
  },
  {
    id: "shackleton",
    name: "Shackleton Crater",
    description: "South pole crater. Permanently shadowed interior may hold water ice. Key Artemis target.",
    lat: -89.67,
    lon: 0.0,
    type: "geographic",
    icon: "🧊",
  },

  // Mountain ranges
  {
    id: "montes-apenninus",
    name: "Montes Apenninus",
    description: "Lunar Apennines. 600 km long, peaks to 5 km. Border of Mare Imbrium.",
    lat: 18.9,
    lon: -3.7,
    type: "geographic",
    icon: "⛰️",
  },
  {
    id: "montes-caucasus",
    name: "Montes Caucasus",
    description: "Mountain range between Mare Serenitatis and Mare Imbrium. Peaks to 6 km.",
    lat: 38.4,
    lon: 10.0,
    type: "geographic",
    icon: "⛰️",
  },
  {
    id: "mons-huygens",
    name: "Mons Huygens",
    description: "Tallest mountain on the Moon — approximately 5.5 km above surrounding terrain.",
    lat: 19.9,
    lon: -2.9,
    type: "geographic",
    icon: "⛰️",
  },

  // Rilles and special features
  {
    id: "hadley-rille",
    name: "Hadley Rille",
    description: "Sinuous rille explored by Apollo 15. Ancient lava channel — 120 km long, 1.5 km wide.",
    lat: 25.0,
    lon: 3.0,
    type: "geographic",
    icon: "🏞️",
  },
  {
    id: "vallis-schroteri",
    name: "Vallis Schröteri",
    description: "Schröter's Valley — largest sinuous rille on the Moon. 160 km long, 10 km wide.",
    lat: 26.2,
    lon: -50.8,
    type: "geographic",
    icon: "🏞️",
  },
];

// ── Far-side conspiracy / alleged alien sites ───────────────────────────────
// Locations where conspiracy theorists believe alien structures or bases exist.
// These are real craters on the far side of the Moon; the "alien" claims are
// popular internet folklore, not scientific findings.

const conspiracySites: Landmark[] = [
  {
    id: "daedalus-base",
    name: "Daedalus Crater \u2014 \"The Mothership\"",
    description:
      "Conspiracy theorists claim Clementine mission imagery shows geometric structures on the " +
      "floor of this 93\u2009km far-side crater. Popular YouTube theory: a docked alien mothership " +
      "visible as anomalous shadows.",
    lat: -5.9,
    lon: 179.4,
    type: "conspiracy",
    icon: "\ud83d\udef8",
  },
  {
    id: "tsiolkovsky-mine",
    name: "Tsiolkovsky Crater \u2014 \"Alien Mining Op\"",
    description:
      "One of the few far-side craters with a dark basalt floor. Conspiracy claim: the unusually " +
      "dark floor is evidence of active mining by an extraterrestrial civilization. In reality " +
      "it\u2019s volcanic basalt from an ancient eruption.",
    lat: -21.2,
    lon: 128.9,
    type: "conspiracy",
    icon: "\ud83d\udef8",
    year: 2009,
  },
  {
    id: "king-towers",
    name: "King Crater \u2014 \"The Spires\"",
    description:
      "Alleged anomalous spires and tower-like formations visible in Lunar Orbiter imagery. " +
      "Conspiracy theorists claim these are constructed antenna arrays. NASA attributes them " +
      "to low sun-angle shadow effects on central peak terrain.",
    lat: 5.0,
    lon: 120.5,
    type: "conspiracy",
    icon: "\ud83d\udef8",
  },
  {
    id: "paracelsus-hangar",
    name: "Paracelsus C \u2014 \"The Hangar\"",
    description:
      "A small crater at 23\u00b0S, 163\u00b0E that went viral for alleged rectangular shadow " +
      "formations resembling a hangar entrance. Featured in multiple documentaries. Geologists " +
      "note it\u2019s a collapsed lava tube skylight.",
    lat: -23,
    lon: 163,
    type: "conspiracy",
    icon: "\ud83d\udef8",
  },
  {
    id: "zeeman-base",
    name: "Zeeman Crater \u2014 \"Deep Base\"",
    description:
      "A 190\u2009km far-side crater near the south pole. At 6\u2009km deep, it\u2019s one of the deepest " +
      "formations on the Moon. Conspiracy claim: its depth and permanent shadow make it an " +
      "ideal hidden base. Also popular in science fiction.",
    lat: -75.2,
    lon: -134.8,
    type: "conspiracy",
    icon: "\ud83d\udef8",
  },
  {
    id: "lobachevsky-grid",
    name: "Lobachevsky Crater \u2014 \"The Grid\"",
    description:
      "Conspiracy theorists claim to see a grid-like pattern on the crater floor in orbital " +
      "photos, interpreted as an underground facility\u2019s roof. Geologists identify it as " +
      "intersecting fracture patterns from impact stress.",
    lat: 9.9,
    lon: 112.6,
    type: "conspiracy",
    icon: "\ud83d\udef8",
  },
];

// ── Combine all landmarks ───────────────────────────────────────────────────

export const landmarks: Landmark[] = [
  ...apolloSites,
  ...roverSites,
  ...sovietSites,
  ...surveyorSites,
  ...recentMissions,
  ...geographicFeatures,
  ...conspiracySites,
];

// ── Proposed/announced future lunar claims ──────────────────────────────────

export const futureClaims: FutureClaim[] = [
  {
    id: "artemis-base",
    name: "Artemis Base Camp",
    entity: "NASA",
    description: "Proposed permanent habitat near the south pole — Artemis program",
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
    description: "Joint China-Russia research base at the south pole",
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
    description: "Solar cell manufacturing — in-situ resource utilization demo",
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
    description: "Lunar communications & navigation ground station",
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
    entity: "JAXA / ISRO",
    description: "Lunar Polar Exploration — water-ice prospecting mission",
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
    description: "Commercial lander — resource survey & data services",
    lat: 47.5,
    lon: -44.0,
    type: "corporate",
    status: "announced",
    color: "#10B981",
    year: 2026,
  },
  {
    id: "astroscale-site",
    name: "Lunar Debris Survey",
    entity: "Astroscale",
    description: "Proposed orbital debris mapping relay near Mare Crisium",
    lat: 17.0,
    lon: 62.0,
    type: "corporate",
    status: "proposed",
    color: "#6366F1",
    year: 2031,
  },
];
