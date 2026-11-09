import { type CabinClass, type TripType } from "@/features/flights/types";
import { type FlightSearchErrorKind } from "@/features/flights/server/errors";
import { INTL_LOCALES } from "@/i18n/config";
import { FLIGHTS_PATH } from "@/i18n/routes";

/** Flight search exists in English and Spanish; French links to English. */
export type FlightLocale = keyof typeof FLIGHTS_PATH;

type DataMode = "sample" | "test";
type SortOption = "price" | "duration" | "departure";
type StopsOption = "any" | "nonstop";

export type FlightMessages = {
  path: string;
  /** BCP 47 tag for times, dates and prices. */
  intl: string;
  meta: {
    title: string;
    description: string;
    resultsTitle: (route: string) => string;
  };
  heading: string;
  intro: string;
  form: {
    label: string;
    tripType: string;
    trips: Record<TripType, string>;
    from: string;
    to: string;
    airportPlaceholder: string;
    swap: string;
    departure: string;
    returnLabel: string;
    travellers: string;
    adults: (n: number) => string;
    cabin: string;
    submit: string;
    pending: string;
  };
  cabins: Record<CabinClass, string>;
  summary: {
    route: (from: string, to: string) => string;
    oneWay: string;
    srTo: string;
  };
  results: {
    searching: string;
    found: (n: number) => string;
    beforeFilters: (n: number) => string;
    showingTop: (n: number) => string;
    cheapest: string;
    fastest: string;
    cheapestAndFastest: string;
    noMatch: string;
    noFlights: string;
    allowConnections: string;
    testEmpty: string;
    tryOther: string;
    showAll: string;
  };
  toolbar: {
    sortBy: string;
    stops: string;
    sorts: Record<SortOption, string>;
    stopOptions: Record<StopsOption, string>;
  };
  notice: Record<DataMode, { title: string; body: string }> & {
    ariaLabel: (title: string) => string;
    source: (name: string) => string;
  };
  card: {
    badges: Record<DataMode, string>;
    operatedBy: (carriers: string) => string;
    outbound: string;
    inbound: string;
    perTraveller: (price: string) => string;
    totalPrice: string;
    select: string;
    bookingUnavailable: string;
    nonstop: string;
    stops: (n: number) => string;
    arrives: string;
    daysLater: (n: number) => string;
  };
  errors: Record<FlightSearchErrorKind, { title: string; description: string }>;
  tryAgain: string;
  save: {
    signIn: string;
    idle: string;
    saving: string;
    saved: string;
    exists: string;
    findIt: string;
  };
};

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

const en: FlightMessages = {
  path: FLIGHTS_PATH.en,
  intl: "en-US",
  meta: {
    title: "Search flights",
    description:
      "Compare example flight options by route and dates while you plan your trip with AIFlyTrip.",
    resultsTitle: (route) => `${route} flights`,
  },
  heading: "Search flights",
  intro: "Pick your airports and dates to compare options.",
  form: {
    label: "Search flights",
    tripType: "Trip type",
    trips: { round_trip: "Round trip", one_way: "One way" },
    from: "From",
    to: "To",
    airportPlaceholder: "City or airport code",
    swap: "Swap origin and destination",
    departure: "Departure",
    returnLabel: "Return",
    travellers: "Travellers",
    adults: (n) => `${n} ${plural(n, "adult", "adults")}`,
    cabin: "Cabin",
    submit: "Search flights",
    pending: "Searching…",
  },
  cabins: {
    economy: "Economy",
    premium_economy: "Premium economy",
    business: "Business",
    first: "First",
  },
  summary: {
    route: (from, to) => `${from} to ${to}`,
    oneWay: "One way",
    srTo: " to ",
  },
  results: {
    searching: "Searching for flights…",
    found: (n) => `${n} ${plural(n, "flight", "flights")} found`,
    beforeFilters: (n) => ` (${n} before filters)`,
    showingTop: (n) => ` · showing the top ${n}`,
    cheapest: "Cheapest",
    fastest: "Fastest",
    cheapestAndFastest: "Cheapest & fastest",
    noMatch: "No flights match these filters",
    noFlights: "No flights found",
    allowConnections: "Try allowing connections to see more options.",
    testEmpty:
      "The test environment has no flights for this search. Try other dates or a busier route.",
    tryOther: "Try different dates or airports.",
    showAll: "Show all flights",
  },
  toolbar: {
    sortBy: "Sort by",
    stops: "Stops",
    sorts: {
      price: "Cheapest",
      duration: "Fastest",
      departure: "Earliest departure",
    },
    stopOptions: { any: "Any stops", nonstop: "Nonstop only" },
  },
  notice: {
    sample: {
      title: "Sample data",
      body: "These results are generated locally for development. Airlines, schedules and prices are not real.",
    },
    test: {
      title: "Test mode",
      body: "These results come from the flight provider's sandbox. They are not real fares, may include test airlines such as Duffel Airways, and can't be booked.",
    },
    ariaLabel: (title) => `${title} results`,
    source: (name) => `Source: ${name}. Booking is not available.`,
  },
  card: {
    badges: { sample: "Sample data", test: "Test data" },
    operatedBy: (carriers) => `Operated by ${carriers}`,
    outbound: "Outbound",
    inbound: "Return",
    perTraveller: (price) => `${price} per traveller`,
    totalPrice: "Total price",
    select: "Select",
    bookingUnavailable: "Booking not available",
    nonstop: "Nonstop",
    stops: (n) => `${n} ${plural(n, "stop", "stops")}`,
    arrives: "arrives ",
    daysLater: (n) => ` ${plural(n, "day", "days")} later`,
  },
  errors: {
    configuration: {
      title: "Flight search isn't set up yet",
      description:
        "The flight data provider is not configured on the server. If you run this site, check the flight provider settings in your environment variables.",
    },
    rate_limited: {
      title: "Too many searches right now",
      description: "Please wait a minute and try again.",
    },
    invalid_search: {
      title: "We couldn't search this route",
      description:
        "The flight provider couldn't process this search. Try different airports or dates.",
    },
    unavailable: {
      title: "Flight search is temporarily unavailable",
      description:
        "We couldn't reach the flight provider. Please try again in a moment.",
    },
  },
  tryAgain: "Try again",
  save: {
    signIn: "Sign in to save",
    idle: "Save search",
    saving: "Saving…",
    saved: "Saved",
    exists: "Already saved",
    findIt: "Find it under Account.",
  },
};

const es: FlightMessages = {
  path: FLIGHTS_PATH.es,
  intl: INTL_LOCALES.es,
  meta: {
    title: "Buscar vuelos",
    description:
      "Compara opciones de vuelo de ejemplo por ruta y fechas mientras planificas tu viaje con AIFlyTrip.",
    resultsTitle: (route) => `Vuelos ${route}`,
  },
  heading: "Buscar vuelos",
  intro: "Elige los aeropuertos y las fechas para comparar opciones.",
  form: {
    label: "Buscar vuelos",
    tripType: "Tipo de viaje",
    trips: { round_trip: "Ida y vuelta", one_way: "Solo ida" },
    from: "Origen",
    to: "Destino",
    airportPlaceholder: "Ciudad o código de aeropuerto",
    swap: "Intercambiar origen y destino",
    departure: "Ida",
    returnLabel: "Vuelta",
    travellers: "Viajeros",
    adults: (n) => `${n} ${plural(n, "adulto", "adultos")}`,
    cabin: "Clase",
    submit: "Buscar vuelos",
    pending: "Buscando…",
  },
  cabins: {
    economy: "Turista",
    premium_economy: "Turista superior",
    business: "Business",
    first: "Primera",
  },
  summary: {
    route: (from, to) => `de ${from} a ${to}`,
    oneWay: "Solo ida",
    srTo: " a ",
  },
  results: {
    searching: "Buscando vuelos…",
    found: (n) => `${n} ${plural(n, "vuelo encontrado", "vuelos encontrados")}`,
    beforeFilters: (n) => ` (${n} sin filtros)`,
    showingTop: (n) => ` · se muestran los ${n} primeros`,
    cheapest: "Más barato",
    fastest: "Más rápido",
    cheapestAndFastest: "Más barato y más rápido",
    noMatch: "Ningún vuelo coincide con estos filtros",
    noFlights: "No se han encontrado vuelos",
    allowConnections: "Prueba a permitir escalas para ver más opciones.",
    testEmpty:
      "El entorno de prueba no tiene vuelos para esta búsqueda. Prueba otras fechas o una ruta con más tráfico.",
    tryOther: "Prueba otras fechas u otros aeropuertos.",
    showAll: "Ver todos los vuelos",
  },
  toolbar: {
    sortBy: "Ordenar por",
    stops: "Escalas",
    sorts: {
      price: "Más barato",
      duration: "Más rápido",
      departure: "Salida más temprana",
    },
    stopOptions: { any: "Con o sin escalas", nonstop: "Solo directos" },
  },
  notice: {
    sample: {
      title: "Datos de ejemplo",
      body: "Estos resultados se generan localmente para desarrollo. Las aerolíneas, los horarios y los precios no son reales.",
    },
    test: {
      title: "Modo de prueba",
      body: "Estos resultados proceden del entorno de prueba del proveedor de vuelos. No son tarifas reales, pueden incluir aerolíneas de prueba como Duffel Airways y no se pueden reservar.",
    },
    ariaLabel: (title) => `Resultados: ${title.toLowerCase()}`,
    source: (name) => `Fuente: ${name}. No se pueden hacer reservas.`,
  },
  card: {
    badges: { sample: "Datos de ejemplo", test: "Datos de prueba" },
    operatedBy: (carriers) => `Operado por ${carriers}`,
    outbound: "Ida",
    inbound: "Vuelta",
    perTraveller: (price) => `${price} por viajero`,
    totalPrice: "Precio total",
    select: "Seleccionar",
    bookingUnavailable: "Reserva no disponible",
    nonstop: "Directo",
    stops: (n) => `${n} ${plural(n, "escala", "escalas")}`,
    arrives: "llega ",
    daysLater: (n) => ` ${plural(n, "día", "días")} después`,
  },
  errors: {
    configuration: {
      title: "La búsqueda de vuelos aún no está configurada",
      description:
        "El proveedor de datos de vuelos no está configurado en el servidor. Si gestionas este sitio, revisa los ajustes del proveedor de vuelos en las variables de entorno.",
    },
    rate_limited: {
      title: "Demasiadas búsquedas en este momento",
      description: "Espera un minuto y vuelve a intentarlo.",
    },
    invalid_search: {
      title: "No hemos podido buscar esta ruta",
      description:
        "El proveedor de vuelos no ha podido procesar esta búsqueda. Prueba otros aeropuertos u otras fechas.",
    },
    unavailable: {
      title: "La búsqueda de vuelos no está disponible por ahora",
      description:
        "No hemos podido conectar con el proveedor de vuelos. Vuelve a intentarlo dentro de un momento.",
    },
  },
  tryAgain: "Reintentar",
  save: {
    signIn: "Inicia sesión para guardar",
    idle: "Guardar búsqueda",
    saving: "Guardando…",
    saved: "Guardada",
    exists: "Ya guardada",
    findIt: "La encontrarás en tu cuenta.",
  },
};

export const FLIGHT_MESSAGES: Record<FlightLocale, FlightMessages> = { en, es };
