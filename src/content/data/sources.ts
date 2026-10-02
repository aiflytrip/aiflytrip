import { type Source } from "@/content/schema";

/** Authoritative sources reused across pages. Checked by `npm run check:links`. */
export const SOURCES = {
  ukAdvice: (country: string, name: string): Source => ({
    label: `${name} travel advice`,
    publisher: "UK Foreign, Commonwealth & Development Office",
    url: `https://www.gov.uk/foreign-travel-advice/${country}`,
  }),
  ukAdviceIndex: {
    label: "Foreign travel advice",
    publisher: "UK Foreign, Commonwealth & Development Office",
    url: "https://www.gov.uk/foreign-travel-advice",
  },
  usTravel: {
    label: "International travel information",
    publisher: "U.S. Department of State",
    url: "https://travel.state.gov/content/travel/en/international-travel.html",
  },
  euEntry: {
    label: "Travelling to Europe: entry requirements (EES and ETIAS)",
    publisher: "European Union",
    url: "https://travel-europe.europa.eu/",
  },
  france: {
    label: "Official tourism website of France",
    publisher: "Atout France",
    url: "https://www.france.fr/en",
  },
  paris: {
    label: "Official website of the Paris Tourist Office",
    publisher: "Paris je t'aime",
    url: "https://parisjetaime.com/eng/",
  },
  ratp: {
    label: "Paris public transport (metro, RER, buses)",
    publisher: "RATP",
    url: "https://www.ratp.fr/en",
  },
  sncf: {
    label: "French rail tickets and timetables",
    publisher: "SNCF Connect",
    url: "https://www.sncf-connect.com/en-en",
  },
  italy: {
    label: "Official tourism website of Italy",
    publisher: "ENIT – Italian National Tourist Board",
    url: "https://www.italia.it/en",
  },
  rome: {
    label: "Official tourism website of Rome",
    publisher: "Roma Capitale",
    url: "https://www.turismoroma.it/en",
  },
  trenitalia: {
    label: "Italian rail tickets and timetables",
    publisher: "Trenitalia",
    url: "https://www.trenitalia.com/en.html",
  },
  japan: {
    label: "Official Japan travel guide",
    publisher: "Japan National Tourism Organization (JNTO)",
    url: "https://www.japan.travel/en/",
  },
  japanVisa: {
    label: "Visa information for visiting Japan",
    publisher: "Ministry of Foreign Affairs of Japan",
    url: "https://www.mofa.go.jp/j_info/visit/visa/index.html",
  },
  tokyo: {
    label: "Official Tokyo travel guide",
    publisher: "Tokyo Convention & Visitors Bureau",
    url: "https://www.gotokyo.org/en/",
  },
  jrPass: {
    label: "Japan Rail Pass (official site)",
    publisher: "Japan Railways Group",
    url: "https://japanrailpass.net/en/",
  },
  portugal: {
    label: "Official tourism website of Portugal",
    publisher: "Turismo de Portugal",
    url: "https://www.visitportugal.com/en",
  },
  lisbon: {
    label: "Official tourism website of Lisbon",
    publisher: "Turismo de Lisboa",
    url: "https://www.visitlisboa.com/en",
  },
  cp: {
    label: "Portuguese rail tickets and timetables",
    publisher: "CP – Comboios de Portugal",
    url: "https://www.cp.pt/passageiros/en",
  },
  auAdvice: {
    label: "Travel advice for every destination",
    publisher: "Smartraveller (Australian Government)",
    url: "https://www.smartraveller.gov.au/",
  },
  iata: {
    label: "Passport, visa and health requirements by destination",
    publisher: "IATA Travel Centre",
    url: "https://www.iatatravelcentre.com/",
  },
  who: {
    label: "International travel and health",
    publisher: "World Health Organization",
    url: "https://www.who.int/health-topics/travel-and-health",
  },
} as const;
