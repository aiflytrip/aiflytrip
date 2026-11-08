import { type ShareLabels } from "@/features/tools/controls";
import { type SizeVerdict } from "@/features/tools/bags/bag-size";

export type BagSizeLocale = "en" | "es";

/** Interface text for the bag size checker, in English and Spanish. */
export type BagSizeText = {
  verdicts: Record<SizeVerdict, string>;
  sides: Record<"longest" | "middle" | "shortest", string>;
  /** Preset button labels, keyed by the English label in SIZE_PRESETS. */
  presets: Record<string, string>;
  formLabel: string;
  units: string;
  unitMetric: string;
  unitImperial: string;
  yourBag: (unit: string) => string;
  length: string;
  width: string;
  depth: string;
  includeExtras: string;
  allowance: string;
  limitGivenAs: string;
  modeDimensions: string;
  modeTotal: string;
  presetsNote: string;
  totalLimit: (unit: string) => string;
  weightTitle: string;
  bagWeight: (unit: string) => string;
  weightLimit: (unit: string) => string;
  reset: string;
  resultTitle: string;
  total: (size: string) => string;
  under: (amount: string) => string;
  over: (amount: string) => string;
  sideOf: (bag: number, limit: number, unit: string) => string;
  tooBig: (amount: string) => string;
  spare: (amount: string) => string;
  weight: string;
  advice: {
    turn: string;
    tooBig: string;
    tight: string;
    overWeight: string;
    exactFare: string;
  };
  enterSizes: string;
  disclaimer: string;
  share: ShareLabels;
};

export const BAG_SIZE_TEXT: Record<BagSizeLocale, BagSizeText> = {
  en: {
    verdicts: {
      fits: "Fits",
      tight: "Fits, but only just",
      "too-big": "Too big",
      incomplete: "Enter your sizes",
    },
    sides: {
      longest: "Longest side",
      middle: "Middle side",
      shortest: "Shortest side",
    },
    presets: {},
    formLabel: "Bag size inputs",
    units: "Units",
    unitMetric: "cm and kg",
    unitImperial: "inches and lb",
    yourBag: (unit) => `Your bag, packed (${unit})`,
    length: "Length",
    width: "Width",
    depth: "Depth",
    includeExtras: "Include wheels, handles and outside pockets.",
    allowance: "Your allowance, from your booking",
    limitGivenAs: "The limit is given as",
    modeDimensions: "Length × width × depth",
    modeTotal: "Total of all three sides",
    presetsNote:
      "The buttons are common sizes, not any airline's rule. Type the size from your booking.",
    totalLimit: (unit) => `Total limit (${unit})`,
    weightTitle: "Weight (optional)",
    bagWeight: (unit) => `Bag weight (${unit})`,
    weightLimit: (unit) => `Weight limit (${unit})`,
    reset: "Reset",
    resultTitle: "Your bag",
    total: (size) => `Total ${size}`,
    under: (amount) => `${amount} under the limit`,
    over: (amount) => `${amount} over the limit`,
    sideOf: (bag, limit, unit) => `${bag} of ${limit} ${unit}`,
    tooBig: (amount) => `${amount} too big`,
    spare: (amount) => `${amount} spare`,
    weight: "Weight",
    advice: {
      turn: "It fits if you turn it: put the longest side of the bag along the longest side of the limit.",
      tooBig:
        "If it doesn't fit, the airline may ask you to pay at the gate or check the bag in. A smaller or softer bag, or moving items to a bag that is included, avoids that.",
      tight:
        "There is very little room. Measure again with the bag packed, including wheels, handles and outside pockets.",
      overWeight:
        "The bag is over the weight limit. Our luggage weight calculator shows which items make the biggest difference.",
      exactFare:
        "Use the limit for your exact fare, as shown in your booking: allowances differ between airlines, fares and routes, and they change.",
    },
    enterSizes:
      "Enter all three sides of your bag and your allowance to check it.",
    disclaimer:
      "A guide only. The airline's sizer at the airport is the final word.",
    share: {
      copy: "Copy share link",
      copied: "Link copied",
      prompt: "Copy this link to share your result:",
    },
  },
  es: {
    verdicts: {
      fits: "Cabe",
      tight: "Cabe, pero muy justo",
      "too-big": "Demasiado grande",
      incomplete: "Introduce las medidas",
    },
    sides: {
      longest: "Lado más largo",
      middle: "Lado intermedio",
      shortest: "Lado más corto",
    },
    presets: {
      "Small under-seat bag": "Bolso pequeño bajo el asiento",
      "Larger personal item": "Artículo personal grande",
      "Cabin bag": "Maleta de cabina",
      "Larger cabin bag": "Maleta de cabina grande",
    },
    formLabel: "Medidas del equipaje",
    units: "Unidades",
    unitMetric: "cm y kg",
    unitImperial: "pulgadas y lb",
    yourBag: (unit) => `Tu equipaje, ya hecho (${unit})`,
    length: "Largo",
    width: "Ancho",
    depth: "Fondo",
    includeExtras: "Incluye ruedas, asas y bolsillos exteriores.",
    allowance: "Tu franquicia, según tu reserva",
    limitGivenAs: "El límite se indica como",
    modeDimensions: "Largo × ancho × fondo",
    modeTotal: "Suma de los tres lados",
    presetsNote:
      "Los botones son medidas habituales, no la norma de ninguna aerolínea. Escribe la medida de tu reserva.",
    totalLimit: (unit) => `Límite total (${unit})`,
    weightTitle: "Peso (opcional)",
    bagWeight: (unit) => `Peso del equipaje (${unit})`,
    weightLimit: (unit) => `Peso máximo (${unit})`,
    reset: "Restablecer",
    resultTitle: "Tu equipaje",
    total: (size) => `Total ${size}`,
    under: (amount) => `${amount} por debajo del límite`,
    over: (amount) => `${amount} por encima del límite`,
    sideOf: (bag, limit, unit) => `${bag} de ${limit} ${unit}`,
    tooBig: (amount) => `se pasa ${amount}`,
    spare: (amount) => `sobran ${amount}`,
    weight: "Peso",
    advice: {
      turn: "Cabe si lo giras: pon el lado más largo del equipaje en el lado más largo del límite.",
      tooBig:
        "Si no cabe, la aerolínea puede cobrarte en la puerta de embarque o enviarlo a bodega. Un bulto más pequeño o más blando, o pasar cosas a un bulto que sí esté incluido, lo evita.",
      tight:
        "Queda muy poco margen. Vuelve a medir con el equipaje hecho, con ruedas, asas y bolsillos exteriores.",
      overWeight:
        "El equipaje supera el peso máximo. Saca los objetos más pesados o pásalos a un bulto incluido en tu tarifa.",
      exactFare:
        "Usa el límite de tu tarifa exacta, tal como aparece en tu reserva: las franquicias cambian entre aerolíneas, tarifas y rutas, y se modifican.",
    },
    enterSizes:
      "Introduce los tres lados de tu equipaje y tu franquicia para comprobarlo.",
    disclaimer:
      "Solo orientativo. El medidor de la aerolínea en el aeropuerto tiene la última palabra.",
    share: {
      copy: "Copiar enlace para compartir",
      copied: "Enlace copiado",
      prompt: "Copia este enlace para compartir tu resultado:",
    },
  },
};
