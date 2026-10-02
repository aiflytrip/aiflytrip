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
