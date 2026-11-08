import { type ShareLabels } from "@/features/tools/controls";
import {
  type FareOption,
  type FeeLineKey,
} from "@/features/tools/bags/baggage-fees";

export type FeesLocale = "en" | "es";

type FieldKey = Exclude<keyof FareOption, "name">;

/** Interface text for the baggage fee calculator, in English and Spanish. */
export type FeesText = {
  lines: Record<FeeLineKey, string>;
  fields: Record<FieldKey, { label: string; hint: string }>;
  /** Shown in place of the stored default names "Fare A", "Fare B"... */
  optionNames: [string, string, string];
  formLabel: string;
  currency: string;
  travellers: string;
  trip: string;
  returnTrip: string;
  oneWay: string;
  name: string;
  remove: string;
  addFare: string;
  reset: string;
  resultTitle: string;
  enterFare: string;
  misleading: (lowest: string, cheapest: string, saving: string) => string;
  cheapest: (name: string, spread: string | null) => string;
  tableHeading: (travellers: number, returnTrip: boolean) => string;
  total: string;
  perPerson: string;
  disclaimer: string;
  share: ShareLabels;
};

export const FEES_TEXT: Record<FeesLocale, FeesText> = {
  en: {
    lines: {
      fares: "Tickets",
      bags: "Bags",
      seats: "Seats",
      other: "Other fees",
      transport: "To and from the airport",
    },
    fields: {
      fare: { label: "Ticket price", hint: "Per person, whole trip" },
      cabinBag: { label: "Cabin bag", hint: "Per person, per flight" },
      checkedBags: { label: "Checked bags", hint: "Number per person" },
      checkedBagFee: { label: "Checked bag fee", hint: "Per bag, per flight" },
      seat: { label: "Seat selection", hint: "Per person, per flight" },
      other: {
        label: "Other fees",
        hint: "Per person: check-in, priority, payment",
      },
      transport: {
        label: "Airport transport",
        hint: "Whole group, there and back",
      },
    },
    optionNames: ["Fare A", "Fare B", "Fare C"],
    formLabel: "Fares to compare",
    currency: "Currency",
    travellers: "Travellers",
    trip: "Trip",
    returnTrip: "Return",
    oneWay: "One way",
    name: "Name",
    remove: "Remove",
    addFare: "Add another fare",
    reset: "Reset",
    resultTitle: "Real cost of each fare",
    enterFare:
      "Enter a ticket price for at least one fare to see its real cost.",
    misleading: (lowest, cheapest, saving) =>
      `${lowest} has the lowest ticket price, but ${cheapest} is cheaper once extras are added, by ${saving}.`,
    cheapest: (name, spread) =>
      `${name} is the cheapest overall${spread ? `, by ${spread} against the dearest option` : ""}.`,
    tableHeading: (travellers, returnTrip) =>
      `${travellers} ${travellers === 1 ? "traveller" : "travellers"}, ${returnTrip ? "return" : "one way"}`,
    total: "Total",
    perPerson: "Per person",
    disclaimer:
      "Uses the prices you enter. Fees differ by airline, fare, route and date, and are often cheaper when added at booking than at the airport.",
    share: {
      copy: "Copy share link",
      copied: "Link copied",
      prompt: "Copy this link to share your result:",
    },
  },
  es: {
    lines: {
      fares: "Billetes",
      bags: "Equipaje",
      seats: "Asientos",
      other: "Otros cargos",
      transport: "Ida y vuelta al aeropuerto",
    },
    fields: {
      fare: {
        label: "Precio del billete",
        hint: "Por persona, viaje completo",
      },
      cabinBag: { label: "Maleta de cabina", hint: "Por persona y vuelo" },
      checkedBags: {
        label: "Maletas facturadas",
        hint: "Número por persona",
      },
      checkedBagFee: {
        label: "Precio por maleta facturada",
        hint: "Por maleta y vuelo",
      },
      seat: { label: "Elección de asiento", hint: "Por persona y vuelo" },
      other: {
        label: "Otros cargos",
        hint: "Por persona: facturación, embarque prioritario, pago",
      },
      transport: {
        label: "Transporte al aeropuerto",
        hint: "Todo el grupo, ida y vuelta",
      },
    },
    optionNames: ["Tarifa A", "Tarifa B", "Tarifa C"],
    formLabel: "Tarifas que comparar",
    currency: "Moneda",
    travellers: "Viajeros",
    trip: "Viaje",
    returnTrip: "Ida y vuelta",
    oneWay: "Solo ida",
    name: "Nombre",
    remove: "Quitar",
    addFare: "Añadir otra tarifa",
    reset: "Restablecer",
    resultTitle: "Coste real de cada tarifa",
    enterFare:
      "Introduce el precio del billete de al menos una tarifa para ver su coste real.",
    misleading: (lowest, cheapest, saving) =>
      `${lowest} tiene el billete más barato, pero ${cheapest} sale más barata con los extras, por ${saving}.`,
    cheapest: (name, spread) =>
      `${name} es la opción más barata en total${spread ? `, ${spread} menos que la más cara` : ""}.`,
    tableHeading: (travellers, returnTrip) =>
      `${travellers} ${travellers === 1 ? "viajero" : "viajeros"}, ${returnTrip ? "ida y vuelta" : "solo ida"}`,
    total: "Total",
    perPerson: "Por persona",
    disclaimer:
      "Usa los precios que introduces. Los cargos cambian según la aerolínea, la tarifa, la ruta y la fecha, y suelen ser más baratos si los añades al reservar que en el aeropuerto.",
    share: {
      copy: "Copiar enlace para compartir",
      copied: "Enlace copiado",
      prompt: "Copia este enlace para compartir tu resultado:",
    },
  },
};
