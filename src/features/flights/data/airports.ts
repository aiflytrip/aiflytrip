import { type Airport } from "@/features/flights/types";

/**
 * Airports supported by the mock flight provider. A real provider will
 * replace this with a searchable airport API in a later phase.
 */
export const AIRPORTS: readonly Airport[] = [
  {
    code: "AMS",
    name: "Schiphol",
    city: "Amsterdam",
    country: "Netherlands",
    timeZone: "Europe/Amsterdam",
    lat: 52.3105,
    lon: 4.7683,
  },
  {
    code: "BOM",
    name: "Chhatrapati Shivaji Maharaj",
    city: "Mumbai",
    country: "India",
    timeZone: "Asia/Kolkata",
    lat: 19.0896,
    lon: 72.8656,
  },
  {
    code: "CDG",
    name: "Charles de Gaulle",
    city: "Paris",
    country: "France",
    timeZone: "Europe/Paris",
    lat: 49.0097,
    lon: 2.5479,
  },
  {
    code: "DEL",
    name: "Indira Gandhi",
    city: "Delhi",
    country: "India",
    timeZone: "Asia/Kolkata",
    lat: 28.5562,
    lon: 77.1,
  },
  {
    code: "DOH",
    name: "Hamad",
    city: "Doha",
    country: "Qatar",
    timeZone: "Asia/Qatar",
    lat: 25.2731,
    lon: 51.6081,
  },
  {
    code: "DXB",
    name: "Dubai International",
    city: "Dubai",
    country: "United Arab Emirates",
    timeZone: "Asia/Dubai",
    lat: 25.2532,
    lon: 55.3657,
  },
  {
    code: "FRA",
    name: "Frankfurt",
    city: "Frankfurt",
    country: "Germany",
    timeZone: "Europe/Berlin",
    lat: 50.0379,
    lon: 8.5622,
  },
  {
    code: "HND",
    name: "Haneda",
    city: "Tokyo",
    country: "Japan",
    timeZone: "Asia/Tokyo",
    lat: 35.5494,
    lon: 139.7798,
  },
  {
    code: "IST",
    name: "Istanbul",
    city: "Istanbul",
    country: "Türkiye",
    timeZone: "Europe/Istanbul",
    lat: 41.2753,
    lon: 28.7519,
  },
  {
    code: "JFK",
    name: "John F. Kennedy",
    city: "New York",
    country: "United States",
    timeZone: "America/New_York",
    lat: 40.6413,
    lon: -73.7781,
  },
  {
    code: "KHI",
    name: "Jinnah International",
    city: "Karachi",
    country: "Pakistan",
    timeZone: "Asia/Karachi",
    lat: 24.9065,
    lon: 67.1608,
  },
  {
    code: "LAX",
    name: "Los Angeles International",
    city: "Los Angeles",
    country: "United States",
    timeZone: "America/Los_Angeles",
    lat: 33.9416,
    lon: -118.4085,
  },
  {
    code: "LHE",
    name: "Allama Iqbal International",
    city: "Lahore",
    country: "Pakistan",
    timeZone: "Asia/Karachi",
    lat: 31.5216,
    lon: 74.4036,
  },
  {
    code: "LHR",
    name: "Heathrow",
    city: "London",
    country: "United Kingdom",
    timeZone: "Europe/London",
    lat: 51.47,
    lon: -0.4543,
  },
  {
    code: "MAD",
    name: "Adolfo Suárez Madrid–Barajas",
    city: "Madrid",
    country: "Spain",
    timeZone: "Europe/Madrid",
    lat: 40.4983,
    lon: -3.5676,
  },
  {
    code: "MIA",
    name: "Miami International",
    city: "Miami",
    country: "United States",
    timeZone: "America/New_York",
    lat: 25.7959,
    lon: -80.287,
  },
  {
    code: "ORD",
    name: "O'Hare",
    city: "Chicago",
    country: "United States",
    timeZone: "America/Chicago",
    lat: 41.9742,
    lon: -87.9073,
  },
  {
    code: "SFO",
    name: "San Francisco International",
    city: "San Francisco",
    country: "United States",
    timeZone: "America/Los_Angeles",
    lat: 37.6213,
    lon: -122.379,
  },
  {
    code: "SIN",
    name: "Changi",
    city: "Singapore",
    country: "Singapore",
    timeZone: "Asia/Singapore",
    lat: 1.3644,
    lon: 103.9915,
  },
  {
    code: "SYD",
    name: "Kingsford Smith",
    city: "Sydney",
    country: "Australia",
    timeZone: "Australia/Sydney",
    lat: -33.9399,
    lon: 151.1753,
  },
  {
    code: "YYZ",
    name: "Pearson",
    city: "Toronto",
    country: "Canada",
    timeZone: "America/Toronto",
    lat: 43.6777,
    lon: -79.6248,
  },
];

/** Airports the mock provider routes connections through. */
export const HUB_CODES = [
  "DXB",
  "DOH",
  "IST",
  "FRA",
  "AMS",
  "LHR",
  "ORD",
  "SIN",
] as const;

const airportsByCode = new Map(
  AIRPORTS.map((airport) => [airport.code, airport]),
);

export function getAirport(code: string): Airport | undefined {
  return airportsByCode.get(code);
}

export function isKnownAirportCode(code: string): boolean {
  return airportsByCode.has(code);
}

/** "New York (JFK)" */
export function formatAirportLabel(airport: Airport): string {
  return `${airport.city} (${airport.code})`;
}

/**
 * Accepts what a user typed into the airport field ("jfk", "New York (JFK)",
 * "JFK – John F. Kennedy") and returns the IATA code it refers to, or the
 * trimmed upper-cased input when nothing matches.
 */
export function normalizeAirportInput(input: string): string {
  const value = input.trim();
  const inParens = /\(([A-Za-z]{3})\)/.exec(value)?.[1];
  if (inParens) return inParens.toUpperCase();

  const leadingCode = /^([A-Za-z]{3})(?:\b|$)/.exec(value)?.[1]?.toUpperCase();
  if (leadingCode && isKnownAirportCode(leadingCode)) return leadingCode;

  const byCity = AIRPORTS.find(
    (airport) => airport.city.toLowerCase() === value.toLowerCase(),
  );
  return byCity ? byCity.code : value.toUpperCase();
}
