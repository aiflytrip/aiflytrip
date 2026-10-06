import { type CabinClass } from "@/features/flights/types";
import { type Interest, type Pace } from "@/features/trip-planner/lib/request";
import { type Locale } from "@/i18n/config";
import { ITINERARY_NOTICE } from "@/features/premium/lib/itinerary-notice";

/**
 * Planner interface text: form, progress screen, plan page and the PDF /
 * checkout controls. Plan content itself is written by the AI in the
 * plan's language. English mirrors the original components word for word.
 */

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

type Category =
  "flights" | "lodging" | "food" | "activities" | "local_transport" | "other";

export type PlannerMessages = {
  page: {
    title: string;
    intro: (perHour: number) => string;
    unavailable: string;
  };
  form: {
    whereWhen: string;
    from: string;
    to: string;
    airportPlaceholder: string;
    departure: string;
    returnLabel: (maxDays: number) => string;
    travellers: string;
    adults: (n: number) => string;
    cabin: string;
    cabins: Record<CabinClass, string>;
    budgetPace: string;
    budget: string;
    budgetPlaceholder: string;
    currency: string;
    pace: string;
    paces: Record<Pace, string>;
    interests: string;
    interestLabels: Record<Interest, string>;
    language: string;
    notes: string;
    notesPlaceholder: string;
    submit: string;
    starting: string;
    footnote: string;
  };
  /** Exact English messages from validation and the server action. */
  errors: Record<string, string>;
  /** Templated English messages: [pattern, translation]. */
  errorPatterns: [RegExp, (m: RegExpMatchArray) => string][];
  pending: {
    badge: string;
    title: string;
    titleFor: (city: string) => string;
    steps: { title: string; detail: string }[];
    tips: string[];
    elapsed: (seconds: number) => string;
    progressLabel: string;
    stepsLabel: string;
    done: string;
    inProgress: string;
    whileYouWait: string;
    slow: string;
    leave: string;
  };
  view: {
    categories: Record<Category, string>;
    slots: { morning: string; afternoon: string; evening: string };
    tripLength: string;
    days: (n: number) => string;
    estimatedBudget: string;
    outboundFlight: string;
    returnFlight: string;
    nonstop: string;
    stops: (n: number, via: string) => string;
    stopsShort: (n: number) => string;
    aiBadge: string;
    flightsBadge: (name: string) => string;
    includesStart: string;
    includesLink: string;
    includesEnd: string;
    includesPlan: string;
    suggestedFlight: string;
    noFlight: string;
    testEnvironment: string;
    testData: string;
    sampleData: string;
    outbound: string;
    inbound: string;
    dayByDay: string;
    dayLabel: (n: number, date: string) => string;
    departsArrives: (departs: string, arrives: string) => string;
    estimatedTotal: string;
    roughEstimates: string;
    packing: string;
    tips: string;
    checkBefore: string;
    disclaimer: string;
    proposedItinerary: string;
    travellerCount: (n: number) => string;
    notice: string;
    total: (duration: string) => string;
    depart: string;
    arrive: string;
    operatedBy: (airline: string) => string;
    connectionIn: (code: string) => string;
    timesLocal: string;
    /** Replaces the stored " local" suffix on flight times. */
    local: string;
  };
  detail: {
    back: string;
    retry: Record<string, string>;
    failedTitle: string;
    tryAgain: string;
    failures: Record<string, string>;
    checkout: Record<string, string>;
  };
  premium: {
    downloadPdf: string;
    processing: string;
    createAccountForPdf: string;
    getPdf: (price: string) => string;
    createAnother: string;
    thenUnlock: (price: string) => string;
    testMode: string;
    premiumPlan: string;
    unlocked: string;
    downloadAnyTime: string;
    paymentProcessing: string;
    waiting: string;
    getPremiumPdf: string;
    testModeBadge: string;
    benefits: string[];
    refunded: string;
    unlockFor: (price: string) => string;
    secureCheckout: string;
    unavailable: string;
  };
};

const en: PlannerMessages = {
  page: {
    title: "Plan a trip",
    intro: (perHour) =>
      `Tell us the basics and what you enjoy. We'll compare flight options and draft a day-by-day plan with a budget estimate. Free, and no account needed: create one later if you want the PDF. Up to ${perHour} plans per hour with an account.`,
    unavailable:
      "The AI planner isn't available yet. Flight search still works.",
  },
  form: {
    whereWhen: "Where and when",
    from: "From",
    to: "To",
    airportPlaceholder: "City or airport code",
    departure: "Departure",
    returnLabel: (d) => `Return (up to ${d} days)`,
    travellers: "Travellers",
    adults: (n) => `${n} ${plural(n, "adult", "adults")}`,
    cabin: "Cabin",
    cabins: {
      economy: "Economy",
      premium_economy: "Premium economy",
      business: "Business",
      first: "First",
    },
    budgetPace: "Budget and pace",
    budget: "Total budget (optional)",
    budgetPlaceholder: "e.g. 2500",
    currency: "Currency",
    pace: "Pace",
    paces: { relaxed: "Relaxed", balanced: "Balanced", packed: "Packed" },
    interests: "Interests",
    interestLabels: {
      food: "Food",
      culture: "Culture",
      history: "History",
      nature: "Nature",
      beaches: "Beaches",
      nightlife: "Nightlife",
      shopping: "Shopping",
      art: "Art",
      adventure: "Adventure",
      family: "Family",
    },
    language: "Plan language",
    notes: "Anything else? (optional)",
    notesPlaceholder:
      "e.g. Vegetarian, travelling with my parents, want one day trip out of the city",
    submit: "Create my plan",
    starting: "Starting your plan…",
    footnote:
      "Uses AI and takes about a minute. Flight options come from test data.",
  },
  errors: {},
  errorPatterns: [],
  pending: {
    badge: "AI planner at work",
    title: "Creating your plan",
    titleFor: (city) => ` for ${city}`,
    steps: [
      {
        title: "Searching flights",
        detail: "Looking up options for your dates",
      },
      {
        title: "Comparing options",
        detail: "Shortlisting the cheapest and fastest",
      },
      {
        title: "Drafting your days",
        detail: "Morning, afternoon and evening for each date",
      },
      {
        title: "Estimating your budget",
        detail: "Costs by category in your currency",
      },
      {
        title: "Final touches",
        detail: "Packing list, tips and things to check",
      },
    ],
    tips: [
      "Group each day around one or two neighbourhoods to cut travel time.",
      "Keep the first and last days light: flights and jet lag take more energy than you expect.",
      "Book timed-entry attractions early; popular slots sell out first.",
      "Check entry requirements for your passport with official sources before you book.",
      "Leave a little unplanned time each day for the places you discover on the way.",
    ],
    elapsed: (s) => `${s}s · usually 1–2 minutes`,
    progressLabel: "Estimated progress",
    stepsLabel: "What the planner is doing",
    done: " (done)",
    inProgress: " (in progress)",
    whileYouWait: "While you wait",
    slow: "This one is taking longer than usual. It's still working; detailed or long trips can take a few minutes.",
    leave:
      "You can leave this page. Your plan keeps generating and will appear under My plans.",
  },
  view: {
    categories: {
      flights: "Flights",
      lodging: "Accommodation",
      food: "Food and drink",
      activities: "Activities",
      local_transport: "Local transport",
      other: "Other",
    },
    slots: { morning: "Morning", afternoon: "Afternoon", evening: "Evening" },
    tripLength: "Trip length",
    days: (n) => `${n} ${plural(n, "day", "days")}`,
    estimatedBudget: "Estimated budget",
    outboundFlight: "Outbound flight",
    returnFlight: "Return flight",
    nonstop: "nonstop",
    stops: (n, via) => `${n} ${plural(n, "stop", "stops")} via ${via}`,
    stopsShort: (n) => `${n} stop`,
    aiBadge: "AI-generated plan",
    flightsBadge: (name) => `Flights: ${name}`,
    includesStart: "Includes a",
    includesLink: "free flight itinerary for planning",
    includesEnd: "and the full day-by-day plan.",
    includesPlan: "Includes the full day-by-day plan and budget.",
    suggestedFlight: "Suggested flight",
    noFlight: "No flight was recommended.",
    testEnvironment:
      "Flight options are from a test environment: schedules and prices aren't real and can't be booked.",
    testData: "Test data",
    sampleData: "Sample data",
    outbound: "Outbound",
    inbound: "Return",
    dayByDay: "Day by day",
    dayLabel: (n, date) => `Day ${n} · ${date}`,
    departsArrives: (d, a) => `Departs ${d} · arrives ${a}`,
    estimatedTotal: "Estimated total",
    roughEstimates: "All amounts are rough estimates.",
    packing: "Packing list",
    tips: "Tips",
    checkBefore: "Check before you go",
    disclaimer:
      "Created with AI. It can make mistakes: check opening hours, prices and entry requirements with official sources before you travel.",
    proposedItinerary: "Free flight itinerary for planning",
    travellerCount: (n) => `${n} ${plural(n, "traveller", "travellers")}`,
    notice: ITINERARY_NOTICE,
    total: (d) => `Total ${d}`,
    depart: "Depart",
    arrive: "Arrive",
    operatedBy: (a) => `operated by ${a}`,
    connectionIn: (c) => `Connection in ${c}`,
    timesLocal:
      "Times are local to each airport. Flight details can change and offers expire; check with the airline before booking.",
    local: "local",
  },
  detail: {
    back: "← My plans",
    retry: {
      limited: "You've reached the plan limit for now. Please try again later.",
      expired:
        "This trip's dates have passed, so it can't be re-planned. Start a new plan instead.",
    },
    failedTitle: "We couldn't create this plan",
    tryAgain: "Try again",
    failures: {},
    checkout: {},
  },
  premium: {
    downloadPdf: "Download PDF",
    processing: "Payment processing…",
    createAccountForPdf: "Create a free account to get the PDF",
    getPdf: (p) => `Get the PDF · ${p}`,
    createAnother: "Create another plan",
    thenUnlock: (p) =>
      `Then unlock it for ${p}. Test mode: no real payment is taken.`,
    testMode: "Test mode: no real payment is taken.",
    premiumPlan: "Premium plan",
    unlocked: "Unlocked",
    downloadAnyTime: "Download a printable PDF of this plan any time.",
    paymentProcessing: "Payment processing",
    waiting:
      "We're waiting for your payment to be confirmed. This page will show the download once it clears.",
    getPremiumPdf: "Get the premium PDF",
    testModeBadge: "Test mode",
    benefits: [
      "Printable PDF of your full day-by-day plan",
      "Flight suggestion, budget table and packing list included",
      "Yours to keep: download it as often as you like",
    ],
    refunded: "Your earlier purchase of this plan was refunded.",
    unlockFor: (p) => `Unlock for ${p}`,
    secureCheckout: "Secure checkout by Stripe. Test cards only.",
    unavailable: "Premium isn't available right now.",
  },
};

const SIGN_UP_ES =
  "Crea una cuenta gratuita para seguir planificando: solo lleva un minuto y tus planes se quedan contigo.";
const SIGN_UP_FR =
  "Créez un compte gratuit pour continuer à planifier : cela ne prend qu'une minute et vos plans restent avec vous.";
const SIGN_UP_EN =
  "Create a free account to keep planning: it only takes a minute, and your plans stay with you.";

const es: PlannerMessages = {
  page: {
    title: "Planifica un viaje",
    intro: (perHour) =>
      `Cuéntanos lo básico y lo que te gusta. Compararemos opciones de vuelo y prepararemos un plan día a día con un presupuesto estimado, en español. Gratis y sin cuenta: crea una más tarde si quieres el PDF. Hasta ${perHour} planes por hora con una cuenta.`,
    unavailable:
      "El planificador con IA aún no está disponible. La búsqueda de vuelos sigue funcionando.",
  },
  form: {
    whereWhen: "Dónde y cuándo",
    from: "Origen",
    to: "Destino",
    airportPlaceholder: "Ciudad o código de aeropuerto",
    departure: "Ida",
    returnLabel: (d) => `Vuelta (hasta ${d} días)`,
    travellers: "Viajeros",
    adults: (n) => `${n} ${plural(n, "adulto", "adultos")}`,
    cabin: "Clase",
    cabins: {
      economy: "Turista",
      premium_economy: "Turista superior",
      business: "Business",
      first: "Primera",
    },
    budgetPace: "Presupuesto y ritmo",
    budget: "Presupuesto total (opcional)",
    budgetPlaceholder: "p. ej., 2500",
    currency: "Moneda",
    pace: "Ritmo",
    paces: { relaxed: "Tranquilo", balanced: "Equilibrado", packed: "Intenso" },
    interests: "Intereses",
    interestLabels: {
      food: "Gastronomía",
      culture: "Cultura",
      history: "Historia",
      nature: "Naturaleza",
      beaches: "Playas",
      nightlife: "Vida nocturna",
      shopping: "Compras",
      art: "Arte",
      adventure: "Aventura",
      family: "Familia",
    },
    language: "Idioma del plan",
    notes: "¿Algo más? (opcional)",
    notesPlaceholder:
      "p. ej., vegetariano, viajo con mis padres, quiero una excursión fuera de la ciudad",
    submit: "Crear mi plan",
    starting: "Iniciando tu plan…",
    footnote:
      "Usa IA y tarda alrededor de un minuto. Las opciones de vuelo proceden de datos de prueba.",
  },
  errors: {
    "Enter where you're flying from": "Indica desde dónde vuelas",
    "Enter where you're flying to": "Indica adónde vuelas",
    "Choose a departure date": "Elige una fecha de ida",
    "Choose interests from the list": "Elige intereses de la lista",
    "Enter a whole number, e.g. 2500":
      "Introduce un número entero, p. ej., 2500",
    "Choose a currency": "Elige una moneda",
    "Choose a pace": "Elige un ritmo",
    "Choose a language": "Elige un idioma",
    "Choose an airport from the list": "Elige un aeropuerto de la lista",
    "Enter a valid date": "Introduce una fecha válida",
    "Choose a trip type": "Elige un tipo de viaje",
    "Choose the number of travellers": "Elige el número de viajeros",
    "At least 1 traveller is required": "Se necesita al menos 1 viajero",
    "Choose a cabin class": "Elige una clase",
    "Destination must be different from origin":
      "El destino debe ser distinto del origen",
    "Departure date can't be in the past":
      "La fecha de ida no puede ser pasada",
    "Flights can be searched up to about a year ahead":
      "Se pueden buscar vuelos hasta aproximadamente un año vista",
    "Choose a return date": "Elige una fecha de vuelta",
    "Return date must be on or after departure":
      "La fecha de vuelta debe ser igual o posterior a la de ida",
    "The AI planner isn't available yet.":
      "El planificador con IA aún no está disponible.",
    "Couldn't check your plan allowance. Please try again.":
      "No hemos podido comprobar tu límite de planes. Inténtalo de nuevo.",
    "Couldn't save your trip. Please try again.":
      "No hemos podido guardar tu viaje. Inténtalo de nuevo.",
    "Couldn't start your plan. Please try again.":
      "No hemos podido iniciar tu plan. Inténtalo de nuevo.",
    [`Please sign in to create a plan. ${SIGN_UP_EN}`]: `Inicia sesión para crear un plan. ${SIGN_UP_ES}`,
    [`You've used the free guest plans for now. ${SIGN_UP_EN}`]: `Has usado los planes gratuitos como invitado por ahora. ${SIGN_UP_ES}`,
    [`The planner is very busy today. ${SIGN_UP_EN}`]: `El planificador tiene mucha demanda hoy. ${SIGN_UP_ES}`,
  },
  errorPatterns: [
    [
      /^Plans can cover up to (\d+) days$/,
      (m) => `Los planes pueden durar hasta ${m[1]} días`,
    ],
    [
      /^Keep notes under (\d+) characters$/,
      (m) => `Las notas deben tener menos de ${m[1]} caracteres`,
    ],
    [
      /^Up to (\d+) travellers per booking$/,
      (m) => `Hasta ${m[1]} viajeros por reserva`,
    ],
    [
      /^You can create up to (\d+) plans per hour\. Please try again later\.$/,
      (m) => `Puedes crear hasta ${m[1]} planes por hora. Inténtalo más tarde.`,
    ],
    [
      /^You've reached today's limit of (\d+) plans\.$/,
      (m) => `Has alcanzado el límite de hoy de ${m[1]} planes.`,
    ],
  ],
  pending: {
    badge: "Planificador con IA trabajando",
    title: "Creando tu plan",
    titleFor: (city) => ` para ${city}`,
    steps: [
      {
        title: "Buscando vuelos",
        detail: "Consultando opciones para tus fechas",
      },
      {
        title: "Comparando opciones",
        detail: "Seleccionando las más baratas y rápidas",
      },
      {
        title: "Preparando tus días",
        detail: "Mañana, tarde y noche para cada fecha",
      },
      {
        title: "Estimando tu presupuesto",
        detail: "Gastos por categoría en tu moneda",
      },
      {
        title: "Últimos detalles",
        detail: "Lista de equipaje, consejos y qué comprobar",
      },
    ],
    tips: [
      "Organiza cada día en torno a uno o dos barrios para reducir los desplazamientos.",
      "Haz que el primer y el último día sean tranquilos: los vuelos y el desfase horario cansan más de lo que parece.",
      "Reserva pronto las atracciones con entrada por horario; las franjas más populares se agotan primero.",
      "Consulta los requisitos de entrada para tu pasaporte en fuentes oficiales antes de reservar.",
      "Deja cada día un poco de tiempo sin planificar para los lugares que descubras por el camino.",
    ],
    elapsed: (s) => `${s} s · suele tardar 1–2 minutos`,
    progressLabel: "Progreso estimado",
    stepsLabel: "Qué está haciendo el planificador",
    done: " (hecho)",
    inProgress: " (en curso)",
    whileYouWait: "Mientras esperas",
    slow: "Este plan está tardando más de lo habitual. Sigue trabajando; los viajes largos o detallados pueden tardar unos minutos.",
    leave:
      "Puedes salir de esta página. Tu plan se sigue generando y aparecerá en My plans (Mis planes).",
  },
  view: {
    categories: {
      flights: "Vuelos",
      lodging: "Alojamiento",
      food: "Comida y bebida",
      activities: "Actividades",
      local_transport: "Transporte local",
      other: "Otros",
    },
    slots: { morning: "Mañana", afternoon: "Tarde", evening: "Noche" },
    tripLength: "Duración del viaje",
    days: (n) => `${n} ${plural(n, "día", "días")}`,
    estimatedBudget: "Presupuesto estimado",
    outboundFlight: "Vuelo de ida",
    returnFlight: "Vuelo de vuelta",
    nonstop: "directo",
    stops: (n, via) => `${n} ${plural(n, "escala", "escalas")} en ${via}`,
    stopsShort: (n) => `${n} ${plural(n, "escala", "escalas")}`,
    aiBadge: "Plan generado con IA",
    flightsBadge: (name) => `Vuelos: ${name}`,
    includesStart: "Incluye un",
    includesLink: "itinerario de vuelo gratuito para planificar",
    includesEnd: "y el plan completo día a día.",
    includesPlan: "Incluye el plan completo día a día y el presupuesto.",
    suggestedFlight: "Vuelo sugerido",
    noFlight: "No se ha recomendado ningún vuelo.",
    testEnvironment:
      "Las opciones de vuelo proceden de un entorno de prueba: los horarios y precios no son reales y no se pueden reservar.",
    testData: "Datos de prueba",
    sampleData: "Datos de ejemplo",
    outbound: "Ida",
    inbound: "Vuelta",
    dayByDay: "Día a día",
    dayLabel: (n, date) => `Día ${n} · ${date}`,
    departsArrives: (d, a) => `Sale ${d} · llega ${a}`,
    estimatedTotal: "Total estimado",
    roughEstimates: "Todos los importes son estimaciones aproximadas.",
    packing: "Lista de equipaje",
    tips: "Consejos",
    checkBefore: "Comprueba antes de viajar",
    disclaimer:
      "Creado con IA. Puede cometer errores: comprueba horarios, precios y requisitos de entrada en fuentes oficiales antes de viajar.",
    proposedItinerary: "Itinerario de vuelo gratuito para planificar",
    travellerCount: (n) => `${n} ${plural(n, "viajero", "viajeros")}`,
    notice:
      "NO ES UN BILLETE NI UNA RESERVA. Es un itinerario de vuelo gratuito solo para planificar, incluido en un plan de viaje generado con IA. No hay ningún asiento reservado ni retenido, no existe código de reserva y no puede usarse para embarcar en un vuelo ni como prueba de una reserva.",
    total: (d) => `Total ${d}`,
    depart: "Salida",
    arrive: "Llegada",
    operatedBy: (a) => `operado por ${a}`,
    connectionIn: (c) => `Conexión en ${c}`,
    timesLocal:
      "Las horas son locales de cada aeropuerto. Los datos de los vuelos pueden cambiar y las ofertas caducan; consulta con la aerolínea antes de reservar.",
    local: "hora local",
  },
  detail: {
    back: "← My plans (Mis planes)",
    retry: {
      limited:
        "Has alcanzado el límite de planes por ahora. Inténtalo más tarde.",
      expired:
        "Las fechas de este viaje ya han pasado, así que no se puede volver a planificar. Empieza un plan nuevo.",
    },
    failedTitle: "No hemos podido crear este plan",
    tryAgain: "Intentar de nuevo",
    failures: {
      refused:
        "No hemos podido crear un plan para esta solicitud. Prueba a reformular tus notas.",
      truncated:
        "El plan salió demasiado largo para terminarlo. Prueba con un viaje más corto o menos notas.",
      invalid_output:
        "El planificador devolvió un plan incompleto. Inténtalo de nuevo.",
      rate_limited:
        "El planificador con IA está muy ocupado ahora mismo. Inténtalo de nuevo en un minuto.",
      unavailable:
        "El planificador con IA no está disponible temporalmente. Inténtalo de nuevo en breve.",
      configuration:
        "El planificador con IA no está bien configurado en el servidor.",
      timed_out: "Este plan tardó demasiado y se detuvo. Inténtalo de nuevo.",
      internal: "Algo salió mal al crear tu plan. Inténtalo de nuevo.",
    },
    checkout: {
      cancelled: "Se canceló el pago. No se te ha cobrado nada.",
      owned: "Ya tienes la versión premium de este plan.",
      pending:
        "Un pago de este plan aún se está procesando. Vuelve a comprobarlo en breve.",
      not_ready: "Este plan aún no está listo, así que no se puede mejorar.",
      unavailable:
        "El pago premium no está disponible ahora mismo. Inténtalo más tarde.",
      error:
        "No hemos podido iniciar el pago. No se te ha cobrado nada. Inténtalo de nuevo.",
    },
  },
  premium: {
    downloadPdf: "Descargar PDF",
    processing: "Procesando el pago…",
    createAccountForPdf: "Crea una cuenta gratis para obtener el PDF",
    getPdf: (p) => `Obtener el PDF · ${p}`,
    createAnother: "Crear otro plan",
    thenUnlock: (p) =>
      `Después, desbloquéalo por ${p}. Modo de prueba: no se realiza ningún pago real.`,
    testMode: "Modo de prueba: no se realiza ningún pago real.",
    premiumPlan: "Plan premium",
    unlocked: "Desbloqueado",
    downloadAnyTime: "Descarga un PDF imprimible de este plan cuando quieras.",
    paymentProcessing: "Procesando el pago",
    waiting:
      "Estamos esperando a que se confirme tu pago. Esta página mostrará la descarga cuando se complete.",
    getPremiumPdf: "Obtén el PDF premium",
    testModeBadge: "Modo de prueba",
    benefits: [
      "PDF imprimible con todo tu plan día a día",
      "Incluye el vuelo sugerido, la tabla de presupuesto y la lista de equipaje",
      "Para siempre: descárgalo tantas veces como quieras",
    ],
    refunded: "Se reembolsó tu compra anterior de este plan.",
    unlockFor: (p) => `Desbloquear por ${p}`,
    secureCheckout: "Pago seguro con Stripe. Solo tarjetas de prueba.",
    unavailable: "El plan premium no está disponible ahora mismo.",
  },
};

const fr: PlannerMessages = {
  page: {
    title: "Planifier un voyage",
    intro: (perHour) =>
      `Indiquez l'essentiel et ce que vous aimez. Nous comparerons les options de vol et préparerons un plan jour par jour avec une estimation du budget, en français. Gratuit et sans compte : créez-en un plus tard si vous voulez le PDF. Jusqu'à ${perHour} plans par heure avec un compte.`,
    unavailable:
      "Le planificateur IA n'est pas encore disponible. La recherche de vols fonctionne toujours.",
  },
  form: {
    whereWhen: "Où et quand",
    from: "Départ",
    to: "Destination",
    airportPlaceholder: "Ville ou code d'aéroport",
    departure: "Aller",
    returnLabel: (d) => `Retour (jusqu'à ${d} jours)`,
    travellers: "Voyageurs",
    adults: (n) => `${n} ${plural(n, "adulte", "adultes")}`,
    cabin: "Classe",
    cabins: {
      economy: "Économie",
      premium_economy: "Premium économie",
      business: "Affaires",
      first: "Première",
    },
    budgetPace: "Budget et rythme",
    budget: "Budget total (facultatif)",
    budgetPlaceholder: "ex. 2500",
    currency: "Devise",
    pace: "Rythme",
    paces: { relaxed: "Détendu", balanced: "Équilibré", packed: "Intense" },
    interests: "Centres d'intérêt",
    interestLabels: {
      food: "Gastronomie",
      culture: "Culture",
      history: "Histoire",
      nature: "Nature",
      beaches: "Plages",
      nightlife: "Vie nocturne",
      shopping: "Shopping",
      art: "Art",
      adventure: "Aventure",
      family: "Famille",
    },
    language: "Langue du plan",
    notes: "Autre chose ? (facultatif)",
    notesPlaceholder:
      "ex. végétarien, je voyage avec mes parents, je veux une excursion hors de la ville",
    submit: "Créer mon plan",
    starting: "Lancement de votre plan…",
    footnote:
      "Utilise l'IA et prend environ une minute. Les options de vol proviennent de données de test.",
  },
  errors: {
    "Enter where you're flying from": "Indiquez votre lieu de départ",
    "Enter where you're flying to": "Indiquez votre destination",
    "Choose a departure date": "Choisissez une date d'aller",
    "Choose interests from the list":
      "Choisissez des centres d'intérêt dans la liste",
    "Enter a whole number, e.g. 2500": "Saisissez un nombre entier, ex. 2500",
    "Choose a currency": "Choisissez une devise",
    "Choose a pace": "Choisissez un rythme",
    "Choose a language": "Choisissez une langue",
    "Choose an airport from the list": "Choisissez un aéroport dans la liste",
    "Enter a valid date": "Saisissez une date valide",
    "Choose a trip type": "Choisissez un type de voyage",
    "Choose the number of travellers": "Choisissez le nombre de voyageurs",
    "At least 1 traveller is required": "Au moins 1 voyageur est requis",
    "Choose a cabin class": "Choisissez une classe",
    "Destination must be different from origin":
      "La destination doit être différente du départ",
    "Departure date can't be in the past":
      "La date d'aller ne peut pas être dans le passé",
    "Flights can be searched up to about a year ahead":
      "Les vols peuvent être recherchés jusqu'à environ un an à l'avance",
    "Choose a return date": "Choisissez une date de retour",
    "Return date must be on or after departure":
      "La date de retour doit être identique ou postérieure à l'aller",
    "The AI planner isn't available yet.":
      "Le planificateur IA n'est pas encore disponible.",
    "Couldn't check your plan allowance. Please try again.":
      "Impossible de vérifier votre quota de plans. Veuillez réessayer.",
    "Couldn't save your trip. Please try again.":
      "Impossible d'enregistrer votre voyage. Veuillez réessayer.",
    "Couldn't start your plan. Please try again.":
      "Impossible de lancer votre plan. Veuillez réessayer.",
    [`Please sign in to create a plan. ${SIGN_UP_EN}`]: `Connectez-vous pour créer un plan. ${SIGN_UP_FR}`,
    [`You've used the free guest plans for now. ${SIGN_UP_EN}`]: `Vous avez utilisé les plans gratuits en tant qu'invité pour le moment. ${SIGN_UP_FR}`,
    [`The planner is very busy today. ${SIGN_UP_EN}`]: `Le planificateur est très sollicité aujourd'hui. ${SIGN_UP_FR}`,
  },
  errorPatterns: [
    [
      /^Plans can cover up to (\d+) days$/,
      (m) => `Les plans peuvent couvrir jusqu'à ${m[1]} jours`,
    ],
    [
      /^Keep notes under (\d+) characters$/,
      (m) => `Les notes doivent faire moins de ${m[1]} caractères`,
    ],
    [
      /^Up to (\d+) travellers per booking$/,
      (m) => `Jusqu'à ${m[1]} voyageurs par réservation`,
    ],
    [
      /^You can create up to (\d+) plans per hour\. Please try again later\.$/,
      (m) =>
        `Vous pouvez créer jusqu'à ${m[1]} plans par heure. Veuillez réessayer plus tard.`,
    ],
    [
      /^You've reached today's limit of (\d+) plans\.$/,
      (m) => `Vous avez atteint la limite du jour de ${m[1]} plans.`,
    ],
  ],
  pending: {
    badge: "Le planificateur IA travaille",
    title: "Création de votre plan",
    titleFor: (city) => ` pour ${city}`,
    steps: [
      {
        title: "Recherche de vols",
        detail: "Recherche d'options pour vos dates",
      },
      {
        title: "Comparaison des options",
        detail: "Sélection des moins chères et des plus rapides",
      },
      {
        title: "Rédaction de vos journées",
        detail: "Matin, après-midi et soir pour chaque date",
      },
      {
        title: "Estimation du budget",
        detail: "Dépenses par catégorie dans votre devise",
      },
      {
        title: "Dernières touches",
        detail: "Liste de bagages, conseils et points à vérifier",
      },
    ],
    tips: [
      "Organisez chaque journée autour d'un ou deux quartiers pour limiter les déplacements.",
      "Gardez le premier et le dernier jour légers : les vols et le décalage horaire fatiguent plus qu'on ne le pense.",
      "Réservez tôt les attractions à horaire fixe ; les créneaux populaires partent en premier.",
      "Vérifiez les conditions d'entrée pour votre passeport auprès de sources officielles avant de réserver.",
      "Gardez chaque jour un peu de temps libre pour les lieux découverts en chemin.",
    ],
    elapsed: (s) => `${s} s · généralement 1 à 2 minutes`,
    progressLabel: "Progression estimée",
    stepsLabel: "Ce que fait le planificateur",
    done: " (terminé)",
    inProgress: " (en cours)",
    whileYouWait: "En attendant",
    slow: "Celui-ci prend plus de temps que d'habitude. Il travaille toujours ; les voyages longs ou détaillés peuvent prendre quelques minutes.",
    leave:
      "Vous pouvez quitter cette page. Votre plan continue d'être généré et apparaîtra dans My plans (Mes plans).",
  },
  view: {
    categories: {
      flights: "Vols",
      lodging: "Hébergement",
      food: "Repas et boissons",
      activities: "Activités",
      local_transport: "Transports locaux",
      other: "Autres",
    },
    slots: { morning: "Matin", afternoon: "Après-midi", evening: "Soir" },
    tripLength: "Durée du voyage",
    days: (n) => `${n} ${plural(n, "jour", "jours")}`,
    estimatedBudget: "Budget estimé",
    outboundFlight: "Vol aller",
    returnFlight: "Vol retour",
    nonstop: "direct",
    stops: (n, via) => `${n} ${plural(n, "escale", "escales")} via ${via}`,
    stopsShort: (n) => `${n} ${plural(n, "escale", "escales")}`,
    aiBadge: "Plan généré par l'IA",
    flightsBadge: (name) => `Vols : ${name}`,
    includesStart: "Comprend un",
    includesLink: "itinéraire de vol gratuit pour planifier",
    includesEnd: "et le plan complet jour par jour.",
    includesPlan: "Comprend le plan complet jour par jour et le budget.",
    suggestedFlight: "Vol suggéré",
    noFlight: "Aucun vol n'a été recommandé.",
    testEnvironment:
      "Les options de vol proviennent d'un environnement de test : les horaires et les prix ne sont pas réels et ne peuvent pas être réservés.",
    testData: "Données de test",
    sampleData: "Données d'exemple",
    outbound: "Aller",
    inbound: "Retour",
    dayByDay: "Jour par jour",
    dayLabel: (n, date) => `Jour ${n} · ${date}`,
    departsArrives: (d, a) => `Départ ${d} · arrivée ${a}`,
    estimatedTotal: "Total estimé",
    roughEstimates: "Tous les montants sont des estimations approximatives.",
    packing: "Liste de bagages",
    tips: "Conseils",
    checkBefore: "À vérifier avant de partir",
    disclaimer:
      "Créé avec l'IA. Elle peut se tromper : vérifiez les horaires, les prix et les conditions d'entrée auprès de sources officielles avant de partir.",
    proposedItinerary: "Itinéraire de vol gratuit pour planifier",
    travellerCount: (n) => `${n} ${plural(n, "voyageur", "voyageurs")}`,
    notice:
      "CECI N'EST NI UN BILLET NI UNE RÉSERVATION. Il s'agit d'un itinéraire de vol gratuit, uniquement pour planifier, issu d'un plan de voyage généré par l'IA. Aucun siège n'est réservé ni bloqué, il n'y a pas de référence de réservation, et ce document ne peut servir ni à embarquer ni de preuve de réservation.",
    total: (d) => `Total ${d}`,
    depart: "Départ",
    arrive: "Arrivée",
    operatedBy: (a) => `opéré par ${a}`,
    connectionIn: (c) => `Correspondance à ${c}`,
    timesLocal:
      "Les horaires sont en heure locale de chaque aéroport. Les détails des vols peuvent changer et les offres expirer ; vérifiez auprès de la compagnie avant de réserver.",
    local: "heure locale",
  },
  detail: {
    back: "← My plans (Mes plans)",
    retry: {
      limited:
        "Vous avez atteint la limite de plans pour le moment. Veuillez réessayer plus tard.",
      expired:
        "Les dates de ce voyage sont passées : il ne peut pas être replanifié. Commencez plutôt un nouveau plan.",
    },
    failedTitle: "Nous n'avons pas pu créer ce plan",
    tryAgain: "Réessayer",
    failures: {
      refused:
        "Nous n'avons pas pu créer de plan pour cette demande. Essayez de reformuler vos notes.",
      truncated:
        "Le plan était trop long pour être terminé. Essayez un voyage plus court ou moins de notes.",
      invalid_output:
        "Le planificateur a renvoyé un plan incomplet. Veuillez réessayer.",
      rate_limited:
        "Le planificateur IA est très sollicité en ce moment. Réessayez dans une minute.",
      unavailable:
        "Le planificateur IA est temporairement indisponible. Réessayez sous peu.",
      configuration:
        "Le planificateur IA n'est pas correctement configuré sur le serveur.",
      timed_out:
        "Ce plan a pris trop de temps et a été arrêté. Veuillez réessayer.",
      internal:
        "Un problème est survenu lors de la création de votre plan. Veuillez réessayer.",
    },
    checkout: {
      cancelled: "Le paiement a été annulé. Vous n'avez pas été débité.",
      owned: "Vous possédez déjà la version premium de ce plan.",
      pending:
        "Un paiement pour ce plan est encore en cours de traitement. Revenez un peu plus tard.",
      not_ready:
        "Ce plan n'est pas encore prêt et ne peut donc pas être amélioré.",
      unavailable:
        "Le paiement premium n'est pas disponible pour le moment. Veuillez réessayer plus tard.",
      error:
        "Nous n'avons pas pu lancer le paiement. Vous n'avez pas été débité. Veuillez réessayer.",
    },
  },
  premium: {
    downloadPdf: "Télécharger le PDF",
    processing: "Paiement en cours…",
    createAccountForPdf: "Créez un compte gratuit pour obtenir le PDF",
    getPdf: (p) => `Obtenir le PDF · ${p}`,
    createAnother: "Créer un autre plan",
    thenUnlock: (p) =>
      `Puis débloquez-le pour ${p}. Mode test : aucun paiement réel n'est effectué.`,
    testMode: "Mode test : aucun paiement réel n'est effectué.",
    premiumPlan: "Plan premium",
    unlocked: "Débloqué",
    downloadAnyTime: "Téléchargez un PDF imprimable de ce plan à tout moment.",
    paymentProcessing: "Paiement en cours",
    waiting:
      "Nous attendons la confirmation de votre paiement. Cette page affichera le téléchargement dès qu'il sera validé.",
    getPremiumPdf: "Obtenez le PDF premium",
    testModeBadge: "Mode test",
    benefits: [
      "PDF imprimable de tout votre plan jour par jour",
      "Vol suggéré, tableau du budget et liste de bagages inclus",
      "À vous pour toujours : téléchargez-le autant de fois que vous voulez",
    ],
    refunded: "Votre achat précédent de ce plan a été remboursé.",
    unlockFor: (p) => `Débloquer pour ${p}`,
    secureCheckout: "Paiement sécurisé par Stripe. Cartes de test uniquement.",
    unavailable: "Le premium n'est pas disponible pour le moment.",
  },
};

export const PLANNER_MESSAGES: Record<Locale, PlannerMessages> = { en, es, fr };

export const plannerMessages = (locale: Locale): PlannerMessages =>
  PLANNER_MESSAGES[locale];

/** A validation or server message in the form's language (English if unknown). */
export function translatePlannerError(message: string, locale: Locale): string {
  const m = PLANNER_MESSAGES[locale];
  if (m.errors[message]) return m.errors[message];
  for (const [pattern, render] of m.errorPatterns) {
    const match = message.match(pattern);
    if (match) return render(match);
  }
  return message;
}
