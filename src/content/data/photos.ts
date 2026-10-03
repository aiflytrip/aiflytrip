/**
 * Destination photography from Wikimedia Commons (Featured pictures), used
 * under the Creative Commons licences listed. Each licence requires credit
 * to the author with a link to the licence and source, shown on the page
 * (PhotoCredit) and on /photo-credits. Images are resized and cropped for
 * display; no other changes are made. Licence details were read from the
 * Commons API on 2026-10-02.
 */
export type DestinationPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
};

export const DESTINATION_PHOTOS: Record<string, DestinationPhoto> = {
  japan: {
    src: "/images/destinations/japan.jpg",
    width: 1800,
    height: 1200,
    alt: "A quiet lantern-lit street in Kyoto's Higashiyama district leading to the five-storey Yasaka Pagoda",
    caption: "Yasaka-dōri and the Yasaka Pagoda, Kyoto",
    author: "Basile Morin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Yasaka-dori_early_morning_with_street_lanterns_and_the_Tower_of_Yasaka_(Hokan-ji_Temple),_Kyoto,_Japan.jpg",
  },
  tokyo: {
    src: "/images/destinations/tokyo.jpg",
    width: 1800,
    height: 1200,
    alt: "Colourful neon signs above a busy street in Kabukichō, Shinjuku, Tokyo, at night",
    caption: "Kabukichō, Shinjuku, Tokyo",
    author: "Basile Morin",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Colorful_neon_street_signs_in_Kabukich%C5%8D,_Shinjuku,_Tokyo.jpg",
  },
  portugal: {
    src: "/images/destinations/portugal.jpg",
    width: 1800,
    height: 941,
    alt: "Traditional rabelo boats moored on the Douro river with Porto's hillside old town behind",
    caption: "Rabelo boats on the Douro, Porto",
    author: "Diego Delso",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Rabelos_en_el_r%C3%ADo_Duero,_Vila_Nova_de_Gaia,_Portugal,_2012-05-09,_DD_14.JPG",
  },
  lisbon: {
    src: "/images/destinations/lisbon.jpg",
    width: 1800,
    height: 1221,
    alt: "The Rua Augusta Arch on Praça do Comércio, Lisbon, with yellow arcaded buildings",
    caption: "Rua Augusta Arch, Lisbon",
    author: "Diego Delso",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Arco_Triunfal_da_Rua_Augusta,_Plaza_del_Comercio,_Lisboa,_Portugal,_2012-05-12,_DD_02.JPG",
  },
  italy: {
    src: "/images/destinations/italy.jpg",
    width: 1800,
    height: 1339,
    alt: "Ponte Vecchio and the Arno river in Florence at sunset, seen from Piazzale Michelangelo",
    caption: "Ponte Vecchio, Florence",
    author: "Daniel Lu",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Ponte_Vecchio_at_sunset_from_Piazzale_Michelangelo_Florence_2023_dllu.jpg",
  },
  rome: {
    src: "/images/destinations/rome.jpg",
    width: 1800,
    height: 1056,
    alt: "The Colosseum in Rome illuminated at dusk under a deep blue sky",
    caption: "The Colosseum, Rome",
    author: "Diliff",
    license: "CC BY-SA 2.5",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Colosseum_in_Rome-April_2007-1-_copie_2B.jpg",
  },
  france: {
    src: "/images/destinations/france.jpg",
    width: 1800,
    height: 1200,
    alt: "Mont-Saint-Michel at sunrise, reflected in the tidal flats of Normandy",
    caption: "Mont-Saint-Michel, Normandy",
    author: "Lynx1211",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Mont_St_Michel_at_sunrise.jpg",
  },
  paris: {
    src: "/images/destinations/paris.jpg",
    width: 1800,
    height: 1154,
    alt: "The Eiffel Tower and Pont Alexandre III over the Seine in Paris at night",
    caption: "Eiffel Tower and Pont Alexandre III, Paris",
    author: "Getfunky Paris",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Eiffel_Tower_and_Pont_Alexandre_III_at_night.jpg",
  },
};

export function destinationPhoto(slug: string): DestinationPhoto | undefined {
  return DESTINATION_PHOTOS[slug];
}

/** City photo for a destination airport, used to illustrate generated plans. */
const PHOTO_BY_AIRPORT: Record<string, string> = {
  CDG: "paris",
  ORY: "paris",
  FCO: "rome",
  HND: "tokyo",
  NRT: "tokyo",
  LIS: "lisbon",
};

export function photoForAirport(
  code: string | undefined,
): DestinationPhoto | undefined {
  return code ? DESTINATION_PHOTOS[PHOTO_BY_AIRPORT[code] ?? ""] : undefined;
}

/** Blog post photos (Wikimedia Commons Quality/Featured images), keyed by post photo id. */
export const BLOG_PHOTOS: Record<string, DestinationPhoto> = {
  "jr-pass": {
    src: "/images/blog/jr-pass.jpg",
    width: 1800,
    height: 1200,
    alt: "A white Shinkansen bullet train passing in front of snow-capped Mount Fuji under a blue sky",
    caption: "Shinkansen and Mount Fuji, Japan",
    author: "MaedaAkihiko",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Series-N700a-Mt.Fuji.jpg",
  },
  "winter-city": {
    src: "/images/blog/winter-city.jpg",
    width: 1800,
    height: 1201,
    alt: "A yellow vintage funicular car climbing a steep cobbled street between old buildings in Lisbon",
    caption: "Elevador da Glória, Lisbon",
    author: "Jakub Hałun",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Elevador_da_Gl%C3%B3ria,_Lisbon,_20250604_1603_9346.jpg",
  },
  "where-to-stay": {
    src: "/images/blog/where-to-stay.jpg",
    width: 1800,
    height: 1200,
    alt: "A yellow tram passing pastel-coloured houses on a square in Lisbon's Alfama neighbourhood",
    caption: "Largo de Santa Luzia, Alfama, Lisbon",
    author: "Ingo Mehling",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Lissabon_-_Alfama_-_Largo_Santa_Luzia_-_Streetcar_-_1.jpg",
  },
  "holiday-travel": {
    src: "/images/blog/holiday-travel.jpg",
    width: 1800,
    height: 1286,
    alt: "A busy Christmas market at dusk with illuminated stalls and visitors",
    caption: "Christmas market at Breitscheidplatz, Berlin",
    author: "Arild Vågen",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Breitscheidplatz_November_2013.jpg",
  },
  "jet-lag": {
    src: "/images/blog/jet-lag.jpg",
    width: 1800,
    height: 1200,
    alt: "Early morning sunlight streaming through trees onto a quiet country road",
    caption: "Morning light near Dülmen, Germany",
    author: "Dietmar Rabich",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:D%C3%BClmen,_Umland,_Sonnenaufgang_--_2012_--_8069.jpg",
  },
  "flying-with-kids": {
    src: "/images/blog/flying-with-kids.jpg",
    width: 1800,
    height: 1200,
    alt: "A row of three airline seats beside the cabin windows of an aircraft",
    caption: "Aircraft cabin seats",
    author: "Matti Blume",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Passenger_Experience_Week_2018,_Hamburg_(1X7A3833).jpg",
  },
  "budget-trip": {
    src: "/images/blog/budget-trip.jpg",
    width: 1800,
    height: 1012,
    alt: "Colourful fruit, vegetables and mushrooms on a market stall with handwritten price boards",
    caption: "Naschmarkt, Vienna",
    author: "Dietmar Rabich",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Wien,_Naschmarkt_--_2018_--_3109.jpg",
  },
  "solo-travel": {
    src: "/images/blog/solo-travel.jpg",
    width: 1800,
    height: 1187,
    alt: "A lone hiker climbing the last rocks to a summit cross above a wide mountain valley",
    caption: "Approaching a summit in the Alps",
    author: "Jörg Braukmann",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Die_letzten_Meter_zum_Gipfel.jpg",
  },
  "cheap-flights": {
    src: "/images/blog/cheap-flights.jpg",
    width: 1800,
    height: 1200,
    alt: "Wide-body airliners parked at gates at Munich Airport on a clear day",
    caption: "Aircraft at Munich Airport",
    author: "High Contrast",
    license: "CC BY 3.0 de",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/de/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:An_A380_at_Munich_airport,_2012.jpg",
  },
  "flight-tips": {
    src: "/images/blog/flight-tips.jpg",
    width: 1800,
    height: 1200,
    alt: "An aircraft wing and upturned winglet seen from a cabin window at sunset",
    caption: "Wing view at sunset",
    author: "PierreSelim",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Embraer_190_-_Wing_and_winglet_at_sunset.jpg",
  },
  "airline-fees": {
    src: "/images/blog/airline-fees.jpg",
    width: 1800,
    height: 1118,
    alt: "Passengers with cabin bags queuing to board a turboprop aircraft by stairs on the apron",
    caption: "Boarding by stairs at Vienna Airport",
    author: "Trougnouf",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Austrian_Airlines_Bombardier_Dash_8_Q400_(flight_683)_boarding_at_Vienna_Airport,_Austria_(DSC_0003).jpg",
  },
  itinerary: {
    src: "/images/blog/itinerary.jpg",
    width: 1800,
    height: 1195,
    alt: "The red floating torii gate of Itsukushima Shrine in the sea at sunset, Miyajima, Japan",
    caption: "Itsukushima Shrine torii, Miyajima, Japan",
    author: "Jakub Hałun",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Itsukushima-jinja_torii_at_sunset,_Miyajima,_Japan,_20240816_1832_4167.jpg",
  },
  "plan-trip": {
    src: "/images/blog/plan-trip.jpg",
    width: 1800,
    height: 1295,
    alt: "A detailed vintage travel map of Switzerland from a 1913 Baedeker guidebook",
    caption: "Map of Switzerland, Baedeker guidebook (1913)",
    author: "Unknown author (Baedeker, 1913)",
    license: "Public domain",
    licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Schweiz_Karte_Baedeker,_1913.jpg",
  },
  "trip-length": {
    src: "/images/blog/trip-length.jpg",
    width: 1800,
    height: 1238,
    alt: "Travellers boarding a small passenger boat at a harbour on the island of Stromboli, Italy",
    caption: "Boarding a boat on Stromboli, Italy",
    author: "Norbert Nagel",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Island_Stromboli_-_Italy_-_July_18th_2013_-_16.jpg",
  },
  documents: {
    src: "/images/blog/documents.jpg",
    width: 1800,
    height: 1045,
    alt: "A bright, quiet arrivals hall with a baggage carousel at Tallinn Airport",
    caption: "Arrivals hall, Tallinn Airport",
    author: "Diego Delso",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Aeropuerto_Internacional_de_Tallinn,_Estonia,_2012-08-05,_DD_05.JPG",
  },
  "airport-to-city": {
    src: "/images/blog/airport-to-city.jpg",
    width: 1800,
    height: 1200,
    alt: "A high-speed train waiting at an airport railway station platform with travellers and their luggage",
    caption: "Airport railway station, Frankfurt Airport",
    author: "JoachimKohler-HB",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Mittelbahnsteig_Gleis_7_in_Frankfurt_a._M._Flughafen_(2024).jpg",
  },
  layover: {
    src: "/images/blog/layover.jpg",
    width: 1800,
    height: 1286,
    alt: "The long, wood-lined concourse of Madrid-Barajas Terminal 4 with moving walkways",
    caption: "Terminal 4, Madrid-Barajas Airport",
    author: "Diego Delso",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Terminal_4_del_aeropuerto_de_Madrid-Barajas,_Espa%C3%B1a,_2013-01-09,_DD_01.jpg",
  },
  "carry-on": {
    src: "/images/blog/carry-on.jpg",
    width: 1800,
    height: 1198,
    alt: "A wall of colourful travel backpacks in many sizes",
    caption: "Travel backpacks",
    author: "Wilfredor",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Backpacks_in_Quebec.jpg",
  },
  insurance: {
    src: "/images/blog/insurance.jpg",
    width: 1800,
    height: 1165,
    alt: "A row of airport luggage trolleys lined up in a terminal",
    caption: "Luggage trolleys, Paris-Orly Airport",
    author: "Jebulon",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Perspective_chariots_%C3%A0_bagages_Orly.jpg",
  },
};

export function blogPhoto(
  key: string | undefined,
): DestinationPhoto | undefined {
  return key ? BLOG_PHOTOS[key] : undefined;
}
