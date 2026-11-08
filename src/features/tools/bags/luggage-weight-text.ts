import { type ShareLabels } from "@/features/tools/controls";
import {
  type ItemId,
  type WeightVerdict,
} from "@/features/tools/bags/luggage-weight";

export type WeightLocale = "en" | "es";

/** Interface text for the luggage weight calculator, in English and Spanish. */
export type WeightText = {
  verdicts: Record<WeightVerdict, string>;
  /** Item names, in place of the English labels in ITEMS (empty for English). */
  items: Partial<Record<ItemId, string>>;
  /** How to name an item worn on the plane ("your coat"); empty for English. */
  wear: Partial<Record<ItemId, string>>;
  and: string;
  formLabel: string;
  units: string;
  howToCheck: string;
  modeEstimate: string;
  modeWeighed: string;
  limitTitle: string;
  limit: (unit: string) => string;
  presetsNote: string;
  packedBag: (unit: string) => string;
  emptyBag: (unit: string) => string;
  emptyBagNote: string;
  packingTitle: string;
  fewer: (item: string) => string;
  more: (item: string) => string;
  reset: string;
  resultTitle: string;
  about: string;
  under: (margin: string, limit: string) => string;
  over: (margin: string, limit: string) => string;
  emptyBagLine: string;
  lighterGroups: (n: number) => string;
  wearAdvice: (items: string, saving: string) => string;
  overAdvice: string;
  estimateNote: string;
  weighedNote: string;
  share: ShareLabels;
};

export const WEIGHT_TEXT: Record<WeightLocale, WeightText> = {
  en: {
    verdicts: {
      under: "Within your limit",
      close: "Close to your limit",
      over: "Over your limit",
      incomplete: "Add your items",
    },
    items: {},
    wear: {},
    and: "and",
    formLabel: "Luggage weight inputs",
    units: "Units",
    howToCheck: "How do you want to check?",
    modeEstimate: "Estimate what I pack",
    modeWeighed: "I've weighed my bag",
    limitTitle: "Your weight limit, from your booking",
    limit: (unit) => `Limit (${unit})`,
    presetsNote:
      "The buttons are common limits, not any airline's rule. Use the limit for your fare.",
    packedBag: (unit) => `Your packed bag (${unit})`,
    emptyBag: (unit) => `Empty bag (${unit})`,
    emptyBagNote:
      "Wheeled bags often weigh a few kilos before you pack anything.",
    packingTitle: "What you're packing",
    fewer: (item) => `Fewer ${item}`,
    more: (item) => `More ${item}`,
    reset: "Reset",
    resultTitle: "Your bag",
    about: "About ",
    under: (margin, limit) => `${margin} under your ${limit} limit`,
    over: (margin, limit) => `${margin} over your ${limit} limit`,
    emptyBagLine: "Empty bag",
    lighterGroups: (n) => `and ${n} lighter groups`,
    wearAdvice: (items, saving) =>
      `Wearing ${items} on the plane would take about ${saving} out of the bag.`,
    overAdvice:
      "Move heavy items to a bag that is included in your fare, or add more allowance when you book: it is usually cheaper than paying at the airport.",
    estimateNote:
      "Item weights are typical averages, so the real weight can differ. Weigh the packed bag before you leave.",
    weighedNote:
      "Weigh the bag fully packed, with anything you will clip to it, and leave a little room for things you buy on the trip.",
    share: {
      copy: "Copy share link",
      copied: "Link copied",
      prompt: "Copy this link to share your result:",
    },
  },
  es: {
    verdicts: {
      under: "Dentro de tu límite",
      close: "Cerca de tu límite",
      over: "Por encima de tu límite",
      incomplete: "Añade lo que llevas",
    },
    items: {
      tshirt: "Camisetas o tops",
      shirt: "Camisas o blusas",
      jumper: "Jerséis o forros polares",
      jeans: "Vaqueros",
      trousers: "Pantalones ligeros o faldas",
      shorts: "Pantalones cortos",
      dress: "Vestidos",
      underwear: "Ropa interior",
      socks: "Pares de calcetines",
      sleepwear: "Pijamas",
      swimwear: "Bañadores",
      jacket: "Chaquetas ligeras",
      coat: "Abrigos de invierno",
      trainers: "Pares de zapatillas",
      shoes: "Pares de zapatos de vestir",
      sandals: "Pares de sandalias",
      toiletries: "Neceseres",
      laptop: "Portátiles",
      tablet: "Tabletas o lectores electrónicos",
      camera: "Cámaras",
      chargers: "Juegos de cargadores y cables",
      books: "Libros",
      hairdryer: "Secadores o planchas de pelo",
      towel: "Toallas",
    },
    wear: {
      jumper: "un jersey",
      jacket: "la chaqueta",
      coat: "el abrigo",
      trainers: "las zapatillas",
      shoes: "los zapatos de vestir",
    },
    and: "y",
    formLabel: "Peso del equipaje",
    units: "Unidades",
    howToCheck: "¿Cómo quieres comprobarlo?",
    modeEstimate: "Calcular lo que llevo",
    modeWeighed: "Ya he pesado la maleta",
    limitTitle: "Tu peso máximo, según tu reserva",
    limit: (unit) => `Límite (${unit})`,
    presetsNote:
      "Los botones son límites habituales, no la norma de ninguna aerolínea. Usa el límite de tu tarifa.",
    packedBag: (unit) => `Tu maleta hecha (${unit})`,
    emptyBag: (unit) => `Maleta vacía (${unit})`,
    emptyBagNote:
      "Las maletas con ruedas suelen pesar unos kilos antes de meter nada.",
    packingTitle: "Lo que vas a llevar",
    fewer: (item) => `Menos ${item}`,
    more: (item) => `Más ${item}`,
    reset: "Restablecer",
    resultTitle: "Tu maleta",
    about: "Unos ",
    under: (margin, limit) => `${margin} por debajo de tu límite de ${limit}`,
    over: (margin, limit) => `${margin} por encima de tu límite de ${limit}`,
    emptyBagLine: "Maleta vacía",
    lighterGroups: (n) => `y ${n} grupos más ligeros`,
    wearAdvice: (items, saving) =>
      `Si te pones ${items} para volar, sacarías unos ${saving} de la maleta.`,
    overAdvice:
      "Pasa los objetos pesados a un bulto incluido en tu tarifa o añade más franquicia al reservar: suele salir más barato que pagar en el aeropuerto.",
    estimateNote:
      "Los pesos de cada objeto son medias habituales, así que el peso real puede variar. Pesa la maleta hecha antes de salir.",
    weighedNote:
      "Pesa la maleta completamente hecha, con todo lo que vayas a colgarle, y deja algo de margen para lo que compres en el viaje.",
    share: {
      copy: "Copiar enlace para compartir",
      copied: "Enlace copiado",
      prompt: "Copia este enlace para compartir tu resultado:",
    },
  },
};
