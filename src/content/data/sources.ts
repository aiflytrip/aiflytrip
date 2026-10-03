import { type Source } from "@/content/schema";

/** Authoritative sources reused across pages. Checked by `npm run check:links`. */
export const SOURCES = {
  nhsJetLag: {
    label: "Jet lag",
    publisher: "NHS",
    url: "https://www.nhs.uk/conditions/jet-lag/",
  },
  cdcJetLag: {
    label: "Jet lag disorder (CDC Yellow Book)",
    publisher: "U.S. Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/yellow-book/hcp/travel-air-sea/jet-lag-disorder.html",
  },
  tsaChildren: {
    label: "Traveling with children (security screening)",
    publisher: "U.S. Transportation Security Administration",
    url: "https://www.tsa.gov/travel/special-procedures/traveling-children",
  },
  govUkChildAbroad: {
    label: "Taking your child abroad",
    publisher: "GOV.UK",
    url: "https://www.gov.uk/permission-take-child-abroad",
  },
  ukCaaHolidayBooking: {
    label: "Your holiday booking: advice for passengers",
    publisher: "UK Civil Aviation Authority",
    url: "https://www.caa.co.uk/passengers-and-public/your-holiday-booking/",
  },
  euCardCharges: {
    label: "Money and charges when travelling in the EU",
    publisher: "European Union (Your Europe)",
    url: "https://europa.eu/youreurope/citizens/travel/money-charges/index_en.htm",
  },
  govUkWomenAbroad: {
    label: "Advice for women travelling abroad",
    publisher: "UK Foreign, Commonwealth & Development Office",
    url: "https://www.gov.uk/guidance/advice-for-women-travelling-abroad",
  },
  govUkTravelInsurance: {
    label: "Foreign travel insurance",
    publisher: "GOV.UK",
    url: "https://www.gov.uk/guidance/foreign-travel-insurance",
  },
  govUkGhic: {
    label: "Global Health Insurance Card (GHIC)",
    publisher: "GOV.UK",
    url: "https://www.gov.uk/global-health-insurance-card",
  },
  parisAirports: {
    label: "Paris airports: access and transport",
    publisher: "Paris Aéroport (Groupe ADP)",
    url: "https://www.parisaeroport.fr/en",
  },
  romeAirports: {
    label: "Rome Fiumicino and Ciampino airports",
    publisher: "Aeroporti di Roma",
    url: "https://www.adr.it/web/aeroporti-di-roma-en/",
  },
  hanedaAirport: {
    label: "Tokyo Haneda Airport: access",
    publisher: "Tokyo International Airport (Haneda)",
    url: "https://tokyo-haneda.com/en/",
  },
  naritaAirport: {
    label: "Narita International Airport: access",
    publisher: "Narita International Airport",
    url: "https://www.narita-airport.jp/en/",
  },
  lisbonAirport: {
    label: "Lisbon Airport: transport to the city",
    publisher: "ANA Aeroportos de Portugal",
    url: "https://www.aeroportolisboa.pt/en/lis/home",
  },
  visitLisboa: {
    label: "Official Lisbon tourism website",
    publisher: "Turismo de Lisboa",
    url: "https://www.visitlisboa.com/en",
  },
  euAirRights: {
    label: "Air passenger rights in the EU",
    publisher: "European Union (Your Europe)",
    url: "https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_en.htm",
  },
  eu261: {
    label:
      "Regulation (EC) No 261/2004 on compensation and assistance to air passengers",
    publisher: "EUR-Lex (Official Journal of the EU)",
    url: "https://eur-lex.europa.eu/eli/reg/2004/261/oj",
  },
  eu1008: {
    label:
      "Regulation (EC) No 1008/2008, including air fare price transparency",
    publisher: "EUR-Lex (Official Journal of the EU)",
    url: "https://eur-lex.europa.eu/eli/reg/2008/1008/oj",
  },
  ukCaaDelays: {
    label: "Flight delays and cancellations: your rights",
    publisher: "UK Civil Aviation Authority",
    url: "https://www.caa.co.uk/passengers-and-public/resolving-travel-problems/delays-and-cancellations/",
  },
  ukCaaBaggage: {
    label: "Baggage: advice for passengers",
    publisher: "UK Civil Aviation Authority",
    url: "https://www.caa.co.uk/passengers-and-public/baggage/",
  },
  ukHandLuggage: {
    label: "Hand luggage restrictions at UK airports",
    publisher: "GOV.UK",
    url: "https://www.gov.uk/hand-luggage-restrictions",
  },
  usDotAirConsumer: {
    label: "Aviation consumer protection",
    publisher: "U.S. Department of Transportation",
    url: "https://www.transportation.gov/airconsumer",
  },
  tsaWhatCanIBring: {
    label: "What can I bring? (security screening)",
    publisher: "U.S. Transportation Security Administration",
    url: "https://www.tsa.gov/travel/security-screening/whatcanibring/all",
  },
  iataTravelers: {
    label: "Information for travellers",
    publisher: "IATA",
    url: "https://www.iata.org/en/youandiata/travelers/",
  },
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
