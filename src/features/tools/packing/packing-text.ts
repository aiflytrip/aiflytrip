import { type ShareLabels } from "@/features/tools/controls";

export type PackingLocale = "en" | "es";

/**
 * Spanish names for the packing list's category titles, items and notes,
 * keyed by the English text generatePackingList builds. A test generates
 * every combination of options and checks each string has a translation.
 */
export const PACKING_ES: Record<string, string> = {
  // Categories
  "Documents and money": "Documentos y dinero",
  "Clothes and shoes": "Ropa y calzado",
  Toiletries: "Aseo",
  Health: "Salud",
  Electronics: "Electrónica",
  "Useful extras": "Extras útiles",
  Beach: "Playa",
  "Hiking and outdoors": "Senderismo y aire libre",
  Business: "Trabajo",
  "Travelling with a young child": "Viajar con un niño pequeño",
  // Documents and money
  Passport: "Pasaporte",
  "Check it is valid for long enough for your destination":
    "Comprueba que tenga validez suficiente para tu destino",
  "Photo ID": "DNI o documento de identidad con foto",
  "Visa or travel authorisation, if your destination needs one":
    "Visado o autorización de viaje, si tu destino lo exige",
  "Flight, accommodation and transfer confirmations":
    "Confirmaciones de vuelo, alojamiento y traslados",
  "Saved offline on your phone": "Guardadas sin conexión en el móvil",
  "Travel insurance details and emergency number":
    "Datos del seguro de viaje y teléfono de emergencias",
  "Bank cards": "Tarjetas bancarias",
  "Keep one separate as a backup": "Guarda una aparte como reserva",
  "Some local currency": "Algo de moneda local",
  "Some cash": "Algo de efectivo",
  "Driving licence, if you plan to drive":
    "Carné de conducir, si piensas conducir",
  // Clothes and shoes
  Underwear: "Ropa interior",
  Socks: "Calcetines",
  "T-shirts or light tops": "Camisetas o tops ligeros",
  "T-shirts or tops": "Camisetas o tops",
  "Shorts or skirts": "Pantalones cortos o faldas",
  "Light trousers or a long skirt": "Pantalón ligero o falda larga",
  "For evenings, temples and churches":
    "Para las noches y para visitar templos e iglesias",
  "Trousers, jeans or skirts": "Pantalones, vaqueros o faldas",
  "Jumpers or fleeces": "Jerséis o forros polares",
  "Thermal base layers": "Ropa térmica",
  "Warm coat": "Abrigo",
  "Wear it on the plane to save space": "Póntelo para volar y ahorra espacio",
  "Hat, gloves and scarf": "Gorro, guantes y bufanda",
  "Light jumper or cardigan": "Jersey fino o rebeca",
  "Jumper or cardigan": "Jersey o rebeca",
  "Planes and air conditioning get cold":
    "En el avión y con el aire acondicionado hace frío",
  "Light rain jacket": "Chubasquero ligero",
  "Light jacket or raincoat": "Chaqueta ligera o impermeable",
  Sleepwear: "Pijama",
  "Comfortable walking shoes": "Calzado cómodo para caminar",
  "Wear your heaviest pair on the plane": "Ponte el par más pesado para volar",
  "Smart outfit for evenings": "Conjunto arreglado para salir por la noche",
  "Smart shoes": "Zapatos de vestir",
  // Toiletries
  "Toothbrush and toothpaste": "Cepillo y pasta de dientes",
  Deodorant: "Desodorante",
  "Shampoo, conditioner and body wash": "Champú, acondicionador y gel",
  "Travel sizes that meet your airport's liquid rules":
    "En tamaño de viaje, según las normas de líquidos de tu aeropuerto",
  "Travel sizes save weight": "El tamaño de viaje ahorra peso",
  "Skincare, moisturiser and lip balm":
    "Cuidado facial, crema hidratante y bálsamo labial",
  Sunscreen: "Protector solar",
  "Essential for this trip": "Imprescindible en este viaje",
  "Razor and shaving kit": "Maquinilla y útiles de afeitado",
  "Hairbrush or comb, hair ties": "Cepillo o peine y gomas del pelo",
  "Glasses, contact lenses and solution": "Gafas, lentillas y líquido",
  // Health
  "Your regular medicines": "Tus medicamentos habituales",
  "In your hand luggage, with a copy of any prescription":
    "En el equipaje de mano, con una copia de la receta",
  Painkillers: "Analgésicos",
  "Plasters and a small first-aid kit": "Tiritas y un pequeño botiquín",
  "Hand sanitiser": "Gel desinfectante de manos",
  "Insect repellent": "Repelente de insectos",
  // Electronics
  "Phone and charger": "Móvil y cargador",
  "Plug adapter for your destination": "Adaptador de enchufe para tu destino",
  "Power bank": "Batería externa",
  "Usually must go in hand luggage, not a checked bag":
    "Suele tener que ir en el equipaje de mano, no en la maleta facturada",
  Headphones: "Auriculares",
  "E-reader, book or tablet": "Libro electrónico, libro o tableta",
  // Useful extras
  "Day bag or small backpack": "Bolso o mochila pequeña para el día",
  "Reusable water bottle": "Botella de agua reutilizable",
  "Empty it before security": "Vacíala antes del control de seguridad",
  Sunglasses: "Gafas de sol",
  "Sun hat": "Sombrero o gorra para el sol",
  "Compact umbrella": "Paraguas plegable",
  "Bag for dirty laundry": "Bolsa para la ropa sucia",
  "Travel laundry detergent": "Detergente de viaje",
  "Eye mask and earplugs": "Antifaz y tapones para los oídos",
  // Beach
  Swimwear: "Bañador",
  "Beach towel or sarong": "Toalla de playa o pareo",
  "Sandals or flip-flops": "Sandalias o chanclas",
  "After-sun lotion": "Loción para después del sol",
  "Cover-up for walking to the beach": "Algo para taparte de camino a la playa",
  // Hiking and outdoors
  "Hiking boots or trail shoes": "Botas de montaña o zapatillas de trail",
  "Broken in before the trip": "Úsalas antes del viaje para domarlas",
  "Quick-dry tops": "Camisetas de secado rápido",
  "Waterproof jacket": "Chaqueta impermeable",
  "Daypack with rain cover": "Mochila de día con funda para la lluvia",
  "Hiking socks": "Calcetines de montaña",
  "Offline maps on your phone": "Mapas sin conexión en el móvil",
  // Business
  "Work outfits": "Ropa de trabajo",
  "Laptop and charger": "Portátil y cargador",
  "Notebook and pen": "Libreta y bolígrafo",
  "Presentation files saved offline": "Presentaciones guardadas sin conexión",
  // Travelling with a young child
  "Child's passport and any consent letter":
    "Pasaporte del niño y, si hace falta, autorización de viaje",
  "Child's ID or documents": "DNI o documentación del niño",
  "Nappies and wipes for the journey": "Pañales y toallitas para el viaje",
  "Plus a supply, or a plan to buy more there":
    "Y una reserva, o planea comprar más allí",
  "Spare clothes for the child in hand luggage":
    "Ropa de recambio del niño en el equipaje de mano",
  "Snacks and a drink for the journey": "Algo de comer y beber para el viaje",
  "Comfort toy and small activities":
    "Su juguete favorito y pequeños entretenimientos",
  "Child's medicines and thermometer": "Medicamentos del niño y termómetro",
};

/** The list's tips, which include numbers, in each language. */
export type PackingTips = {
  wash: (outfitDays: number, days: number, laundry: boolean) => string;
  carryOn: string;
  wear: string;
  layers: string;
};

export const PACKING_TIPS: Record<PackingLocale, PackingTips> = {
  en: {
    wash: (n, days, laundry) =>
      `Pack ${n} days of clothes and plan a wash${laundry ? "" : " about once a week"}: a trip of ${days} days doesn't need ${days} outfits.`,
    carryOn:
      "Carry-on only: liquids usually need to fit the security rules at your departure airport, so check them before you pack toiletries.",
    wear: "Wear your bulkiest shoes and jacket on the plane, and roll clothes to save space.",
    layers:
      "Layers beat one heavy jumper: they pack smaller and adapt to heated rooms.",
  },
  es: {
    wash: (n, days, laundry) =>
      `Lleva ropa para ${n} días y planea un lavado${laundry ? "" : " más o menos una vez por semana"}: un viaje de ${days} días no necesita ${days} conjuntos.`,
    carryOn:
      "Solo equipaje de mano: los líquidos suelen tener que cumplir las normas de seguridad de tu aeropuerto de salida, así que revísalas antes de preparar el neceser.",
    wear: "Ponte para volar el calzado y la chaqueta que más abulten, y enrolla la ropa para ahorrar espacio.",
    layers:
      "Mejor varias capas que un jersey grueso: ocupan menos y se adaptan a los interiores con calefacción.",
  },
};

/** Interface text for the packing list generator, in English and Spanish. */
export type PackingText = {
  options: Record<
    | "international"
    | "laundry"
    | "beach"
    | "hiking"
    | "business"
    | "smart"
    | "child",
    string
  >;
  formLabel: string;
  days: string;
  weather: string;
  warm: string;
  mild: string;
  cold: string;
  luggage: string;
  carryOn: string;
  checked: string;
  yourTrip: string;
  reset: string;
  resultTitle: string;
  items: (n: number) => string;
  summary: (
    days: number,
    outfitDays: number,
    packed: number,
    total: number,
  ) => string;
  print: string;
  untick: string;
  disclaimer: string;
  share: ShareLabels;
};

export const PACKING_TEXT: Record<PackingLocale, PackingText> = {
  en: {
    options: {
      international: "International trip",
      laundry: "I can do laundry while away",
      beach: "Beach or pool",
      hiking: "Hiking or outdoor activities",
      business: "Business or work",
      smart: "Smart evenings out",
      child: "Travelling with a baby or young child",
    },
    formLabel: "Packing list options",
    days: "Trip length (days)",
    weather: "Weather at your destination",
    warm: "Warm or hot",
    mild: "Mild",
    cold: "Cold",
    luggage: "Luggage",
    carryOn: "Carry-on only",
    checked: "Checked bag",
    yourTrip: "Your trip",
    reset: "Reset",
    resultTitle: "Your packing list",
    items: (n) => `${n} items`,
    summary: (days, outfitDays, packed, total) =>
      `${days} ${days === 1 ? "day" : "days"}, clothes for ${outfitDays} · ${packed} of ${total} packed`,
    print: "Print list",
    untick: "Untick all",
    disclaimer:
      "A starting point, not a rule book. Ticks are kept on this page only; the share link saves your trip settings, not your ticks.",
    share: {
      copy: "Copy share link",
      copied: "Link copied",
      prompt: "Copy this link to share your result:",
    },
  },
  es: {
    options: {
      international: "Viaje internacional",
      laundry: "Puedo lavar ropa durante el viaje",
      beach: "Playa o piscina",
      hiking: "Senderismo o actividades al aire libre",
      business: "Viaje de trabajo",
      smart: "Salidas nocturnas arregladas",
      child: "Viajo con un bebé o un niño pequeño",
    },
    formLabel: "Opciones de la lista de equipaje",
    days: "Duración del viaje (días)",
    weather: "Tiempo en tu destino",
    warm: "Cálido o caluroso",
    mild: "Templado",
    cold: "Frío",
    luggage: "Equipaje",
    carryOn: "Solo equipaje de mano",
    checked: "Maleta facturada",
    yourTrip: "Tu viaje",
    reset: "Restablecer",
    resultTitle: "Tu lista de equipaje",
    items: (n) => `${n} cosas`,
    summary: (days, outfitDays, packed, total) =>
      `${days} ${days === 1 ? "día" : "días"}, ropa para ${outfitDays} · ${packed} de ${total} preparadas`,
    print: "Imprimir lista",
    untick: "Desmarcar todo",
    disclaimer:
      "Un punto de partida, no un reglamento. Las marcas solo se guardan en esta página; el enlace para compartir guarda los ajustes del viaje, no las marcas.",
    share: {
      copy: "Copiar enlace para compartir",
      copied: "Enlace copiado",
      prompt: "Copia este enlace para compartir tu lista:",
    },
  },
};
