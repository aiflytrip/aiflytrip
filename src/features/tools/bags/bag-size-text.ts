import { type ShareLabels } from "@/features/tools/controls";
import { type SizeVerdict } from "@/features/tools/bags/bag-size";

export type BagSizeLocale = "en" | "es" | "fr";

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
  fr: {
    verdicts: {
      fits: "Il passe",
      tight: "Il passe, mais tout juste",
      "too-big": "Trop grand",
      incomplete: "Saisissez les dimensions",
    },
    sides: {
      longest: "Côté le plus long",
      middle: "Côté intermédiaire",
      shortest: "Côté le plus court",
    },
    presets: {
      "Small under-seat bag": "Petit sac sous le siège",
      "Larger personal item": "Grand article personnel",
      "Cabin bag": "Bagage cabine",
      "Larger cabin bag": "Grand bagage cabine",
    },
    formLabel: "Dimensions du bagage",
    units: "Unités",
    unitMetric: "cm et kg",
    unitImperial: "pouces et lb",
    yourBag: (unit) => `Votre bagage, rempli (${unit})`,
    length: "Longueur",
    width: "Largeur",
    depth: "Profondeur",
    includeExtras:
      "Comptez les roulettes, les poignées et les poches extérieures.",
    allowance: "Votre franchise, selon votre réservation",
    limitGivenAs: "La limite est indiquée en",
    modeDimensions: "Longueur × largeur × profondeur",
    modeTotal: "Somme des trois côtés",
    presetsNote:
      "Les boutons sont des tailles courantes, pas la règle d'une compagnie. Saisissez la taille de votre réservation.",
    totalLimit: (unit) => `Limite totale (${unit})`,
    weightTitle: "Poids (facultatif)",
    bagWeight: (unit) => `Poids du bagage (${unit})`,
    weightLimit: (unit) => `Poids maximum (${unit})`,
    reset: "Réinitialiser",
    resultTitle: "Votre bagage",
    total: (size) => `Total ${size}`,
    under: (amount) => `${amount} sous la limite`,
    over: (amount) => `${amount} au-dessus de la limite`,
    sideOf: (bag, limit, unit) => `${bag} sur ${limit} ${unit}`,
    tooBig: (amount) => `dépasse de ${amount}`,
    spare: (amount) => `${amount} de marge`,
    weight: "Poids",
    advice: {
      turn: "Il passe si vous le tournez : placez le côté le plus long du bagage dans le sens du côté le plus long de la limite.",
      tooBig:
        "S'il ne passe pas, la compagnie peut vous faire payer à la porte d'embarquement ou le mettre en soute. Un sac plus petit ou plus souple, ou déplacer des affaires dans un bagage inclus, l'évite.",
      tight:
        "Il reste très peu de marge. Mesurez à nouveau le bagage rempli, roulettes, poignées et poches extérieures comprises.",
      overWeight:
        "Le bagage dépasse le poids maximum. Retirez les affaires les plus lourdes ou déplacez-les dans un bagage inclus dans votre billet.",
      exactFare:
        "Utilisez la limite de votre tarif exact, telle qu'indiquée dans votre réservation : les franchises varient selon les compagnies, les tarifs et les lignes, et elles changent.",
    },
    enterSizes:
      "Saisissez les trois côtés de votre bagage et votre franchise pour le vérifier.",
    disclaimer:
      "À titre indicatif. Le gabarit de la compagnie à l'aéroport a le dernier mot.",
    share: {
      copy: "Copier le lien de partage",
      copied: "Lien copié",
      prompt: "Copiez ce lien pour partager votre résultat :",
    },
  },
};
