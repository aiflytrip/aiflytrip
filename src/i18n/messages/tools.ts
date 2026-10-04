import { type Locale } from "@/i18n/config";

/**
 * Interface text for the free tools, in every language. Client components
 * import this directly, so it holds only short UI strings (page articles
 * live in the server-only page copy files).
 */

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

const en = {
  common: {
    reset: "Reset",
    copyLink: "Copy share link",
    copied: "Link copied",
    no: "No",
    yes: "Yes",
    unsure: "Not sure",
    /** "1h 45m" */
    duration: (h: number, m: number) => (h ? `${h}h ${m}m` : `${m}m`),
  },
  budget: {
    formLabel: "Trip budget inputs",
    quickFormLabel: "Quick trip budget",
    yourTrip: "Your trip",
    travellers: "Travellers",
    nights: "Nights",
    currency: "Currency",
    gettingThere: "Getting there and staying",
    flightsPerPerson: "Flights per person",
    flightsHint: "Return fare including bags you need",
    accommodation: "Accommodation per night",
    accommodationHint: "For the whole group, including taxes",
    stayPerNight: "Stay per night",
    dailySpending: "Daily spending per person",
    dailySpend: "Daily spend per person",
    food: "Food and drink",
    transport: "Local transport",
    activities: "Activities",
    extrasAndBuffer: "Extras and buffer",
    extras: "One-off extras (group)",
    extrasHint: "Insurance, visas, airport transfers, gifts",
    buffer: "Safety buffer",
    noBuffer: "No buffer",
    bufferOption: (b: number) => `${b}% for surprises`,
    estimated: "Estimated trip cost",
    perPerson: "Per person",
    perDay: (days: number) => `Per day (${days} days)`,
    lines: {
      flights: "Flights",
      accommodation: "Accommodation",
      food: "Food and drink",
      transport: "Local transport",
      activities: "Activities",
      extras: "Extras",
    },
    bufferLine: (p: number) => `Buffer (${p}%)`,
    sharePrompt: "Copy this link to share your budget:",
    print: "Print or save as PDF",
    footnote: (days: number, nights: number) =>
      `Based on your own estimates. Daily costs count ${days} days for ${nights} nights, to include arrival and departure days.`,
    quickSummary: (perPerson: string, days: number) =>
      `${perPerson} per person · ${days} days of spending`,
    openFull: "Open the full calculator →",
  },
  layover: {
    verdicts: {
      comfortable: "Comfortable",
      workable: "Workable",
      tight: "Tight",
      risky: "Risky",
    },
    formLabel: "Layover details",
    yourLayover: "Your layover",
    hours: "Hours",
    minutes: "Minutes",
    ticketQuestion: "Are both flights on one ticket?",
    oneTicket: "One ticket",
    separateTickets: "Separate tickets",
    airportSize: "Connecting airport size",
    smallAirport: "Small or regional",
    largeAirport: "Large hub",
    terminalQuestion: "Do you change terminals?",
    passportQuestion: "Passport or immigration control?",
    securityQuestion: "Security screening again?",
    bagsQuestion: "Collect and re-check bags?",
    extrasQuestion: "Anything else that slows you down?",
    extras: {
      children: "Travelling with children or reduced mobility",
      busySeason: "Busy travel period (holidays, peak season)",
      longHaulFirst: "First flight is long-haul",
      firstVisit: "First time at this airport",
    },
    yourConnection: "Your connection",
    toSpare: (t: string) => `${t} to spare`,
    short: (t: string) => `${t} short`,
    summary: (layover: string, needed: string) =>
      `Layover ${layover} · rough time needed ${needed}`,
    sharePrompt: "Copy this link to share your layover check:",
    disclaimer:
      "Step times are rough planning assumptions, not official minimum connection times. Airlines and airports set those per airport; check with your airline for your exact flights.",
    steps: {
      deplaneLarge: "Leave the plane and walk (large airport)",
      deplaneSmall: "Leave the plane and walk (smaller airport)",
      terminalChange: "Change terminals",
      passportControl: "Passport or immigration control",
      securityAgain: "Security screening again",
      recheckBags: "Collect and re-check bags",
      children: "Travelling with children or reduced mobility",
      busySeason: "Busy travel period",
      longHaulFirst: "Long-haul first flight (less predictable arrival)",
      firstVisit: "First time at this airport",
      boardingCloses: "Boarding usually closes before departure",
      separateTickets: "Separate tickets: buffer for a late first flight",
    },
    advice: {
      separateTickets:
        "On separate tickets, the second airline usually won't rebook you if you miss the flight. Leave a generous gap, or book a single ticket.",
      singleTicket:
        "On a single ticket, the airline should only sell connections that meet its minimum connection time, and will normally rebook you if a delay on the first flight makes you miss the second.",
      risky:
        "This connection is shorter than the steps it involves. Consider a later onward flight, or confirm with the airline that the connection is protected.",
      tight:
        "It could work if everything runs on time. Sit near the front, travel with cabin bags only and check your departure gate as soon as you land.",
      workable:
        "A reasonable margin. Head straight to your next gate and avoid long stops on the way.",
      comfortable:
        "Plenty of time. You should have room for a meal or a rest before boarding.",
      passportUnsure:
        "Not sure about passport control? Check whether you enter a new country or area, such as the Schengen area, at the connecting airport.",
      bagsUnsure:
        "Not sure about bags? Ask at check-in whether they're checked through to your final destination.",
    },
  },
  days: {
    typeOptions: {
      "big-city": "Big city",
      town: "Town",
      countryside: "Countryside",
    },
    typeLabels: {
      "big-city": "Big city",
      town: "Smaller city or town",
      countryside: "Countryside or beach base",
    },
    fit: {
      fits: "Fits your time",
      spare: "Room to spare",
      packed: "Too packed",
    },
    formLabel: "Trip stops and style",
    yourStops: "Your stops",
    place: (n: number) => `Place ${n}`,
    placePlaceholder: "e.g. Lisbon",
    type: "Type",
    dayTrips: "Day trips",
    remove: "Remove",
    removeLabel: (n: number) => `Remove place ${n}`,
    addStop: "+ Add a stop",
    pace: "Your pace",
    paces: { relaxed: "Relaxed", moderate: "Moderate", fast: "Fast" },
    aboutTrip: "About the trip",
    longHaul: "Long-haul flight (crossing several time zones)",
    longJourneys: "Long journeys between stops (more than a few hours)",
    slowerGroup: "Travelling with children or older relatives",
    available: "Days you have (optional)",
    availablePlaceholder: "e.g. 10",
    availableHint: "Total days including travel days.",
    recommended: "Recommended trip length",
    totalDays: (n: number) => `${n} days`,
    stopDays: (n: number) => `${n} days`,
    summary: (nights: number, ground: number, travel: number) =>
      `${nights} nights · ${ground} days exploring + ${travel} travel`,
    extraDays: (n: number) => ` · ${n} extra days`,
    fromGuides: "From our destination guides",
    sharePrompt: "Copy this link to share your plan:",
    footnote:
      "Based on the rules of thumb in our guide to how many days you need for a trip. Adjust to your own interests.",
    stopName: (n: number) => `Stop ${n}`,
    notes: {
      dayTrips: (n: number) =>
        `+${n} for ${plural(n, "day trip", "day trips")}`,
      relaxed: "+1 for a relaxed pace",
      fast: "-1 for a fast pace",
      slowerGroup: "+1 for children or older relatives",
    },
    warnings: {
      rushed:
        "That's more than one base per three days, which can feel rushed. Consider dropping a stop or turning it into a day trip.",
      longHaulFocus:
        "For a long-haul trip under ten days, focusing on one or two bases usually works better.",
      needMoreDrop: (n: number, stop: string) =>
        `You'd need ${n} more ${plural(n, "day", "days")}. Removing ${stop} or making it a day trip would help.`,
      needMore: (n: number) =>
        `You'd need ${n} more ${plural(n, "day", "days")}. Try fewer day trips or a faster pace.`,
    },
  },
  slider: {
    carousel: "carousel",
    slide: "slide",
    regionLabel: "Free travel tools",
    chooseTool: "Choose a tool",
    previous: "Previous tool",
    next: "Next tool",
    slideLabel: (i: number, n: number, label: string) =>
      `${i} of ${n}: ${label}`,
  },
};

export type ToolsMessages = typeof en;

const es: ToolsMessages = {
  common: {
    reset: "Restablecer",
    copyLink: "Copiar enlace para compartir",
    copied: "Enlace copiado",
    no: "No",
    yes: "Sí",
    unsure: "No estoy seguro",
    duration: (h, m) => (h ? `${h} h ${m} min` : `${m} min`),
  },
  budget: {
    formLabel: "Datos del presupuesto del viaje",
    quickFormLabel: "Presupuesto rápido del viaje",
    yourTrip: "Tu viaje",
    travellers: "Viajeros",
    nights: "Noches",
    currency: "Moneda",
    gettingThere: "Viaje y alojamiento",
    flightsPerPerson: "Vuelos por persona",
    flightsHint: "Ida y vuelta, con el equipaje que necesites",
    accommodation: "Alojamiento por noche",
    accommodationHint: "Para todo el grupo, con impuestos incluidos",
    stayPerNight: "Alojamiento por noche",
    dailySpending: "Gasto diario por persona",
    dailySpend: "Gasto diario por persona",
    food: "Comida y bebida",
    transport: "Transporte local",
    activities: "Actividades",
    extrasAndBuffer: "Extras y margen",
    extras: "Gastos únicos (grupo)",
    extrasHint: "Seguro, visados, traslados al aeropuerto, regalos",
    buffer: "Margen de seguridad",
    noBuffer: "Sin margen",
    bufferOption: (b) => `${b} % para imprevistos`,
    estimated: "Coste estimado del viaje",
    perPerson: "Por persona",
    perDay: (days) => `Por día (${days} días)`,
    lines: {
      flights: "Vuelos",
      accommodation: "Alojamiento",
      food: "Comida y bebida",
      transport: "Transporte local",
      activities: "Actividades",
      extras: "Extras",
    },
    bufferLine: (p) => `Margen (${p} %)`,
    sharePrompt: "Copia este enlace para compartir tu presupuesto:",
    print: "Imprimir o guardar como PDF",
    footnote: (days, nights) =>
      `Basado en tus propias estimaciones. Los gastos diarios cuentan ${days} días para ${nights} noches, para incluir los días de llegada y salida.`,
    quickSummary: (perPerson, days) =>
      `${perPerson} por persona · ${days} días de gastos`,
    openFull: "Abrir la calculadora completa →",
  },
  layover: {
    verdicts: {
      comfortable: "Holgada",
      workable: "Factible",
      tight: "Justa",
      risky: "Arriesgada",
    },
    formLabel: "Datos de la escala",
    yourLayover: "Tu escala",
    hours: "Horas",
    minutes: "Minutos",
    ticketQuestion: "¿Los dos vuelos están en el mismo billete?",
    oneTicket: "Un solo billete",
    separateTickets: "Billetes separados",
    airportSize: "Tamaño del aeropuerto de conexión",
    smallAirport: "Pequeño o regional",
    largeAirport: "Gran aeropuerto",
    terminalQuestion: "¿Cambias de terminal?",
    passportQuestion: "¿Control de pasaportes o inmigración?",
    securityQuestion: "¿Vuelves a pasar el control de seguridad?",
    bagsQuestion: "¿Recoges y vuelves a facturar el equipaje?",
    extrasQuestion: "¿Algo más que te pueda retrasar?",
    extras: {
      children: "Viajas con niños o con movilidad reducida",
      busySeason: "Época de mucho tráfico (vacaciones, temporada alta)",
      longHaulFirst: "El primer vuelo es de largo recorrido",
      firstVisit: "Primera vez en este aeropuerto",
    },
    yourConnection: "Tu conexión",
    toSpare: (t) => `Te sobran ${t}`,
    short: (t) => `Te faltan ${t}`,
    summary: (layover, needed) =>
      `Escala de ${layover} · tiempo aproximado necesario: ${needed}`,
    sharePrompt: "Copia este enlace para compartir tu escala:",
    disclaimer:
      "Los tiempos de cada paso son estimaciones aproximadas para planificar, no tiempos mínimos de conexión oficiales. Las aerolíneas y los aeropuertos los fijan para cada aeropuerto; consulta con tu aerolínea para tus vuelos concretos.",
    steps: {
      deplaneLarge: "Bajar del avión y caminar (aeropuerto grande)",
      deplaneSmall: "Bajar del avión y caminar (aeropuerto pequeño)",
      terminalChange: "Cambiar de terminal",
      passportControl: "Control de pasaportes o inmigración",
      securityAgain: "Nuevo control de seguridad",
      recheckBags: "Recoger y volver a facturar el equipaje",
      children: "Viajar con niños o con movilidad reducida",
      busySeason: "Época de mucho tráfico",
      longHaulFirst:
        "Primer vuelo de largo recorrido (llegada menos previsible)",
      firstVisit: "Primera vez en este aeropuerto",
      boardingCloses: "El embarque suele cerrar antes de la salida",
      separateTickets:
        "Billetes separados: margen por si el primer vuelo se retrasa",
    },
    advice: {
      separateTickets:
        "Con billetes separados, la segunda aerolínea normalmente no te reubicará si pierdes el vuelo. Deja un margen amplio o compra un solo billete.",
      singleTicket:
        "Con un solo billete, la aerolínea solo debería vender conexiones que cumplan su tiempo mínimo de conexión y, normalmente, te reubicará si un retraso del primer vuelo te hace perder el segundo.",
      risky:
        "Esta conexión es más corta que los pasos que implica. Valora un vuelo de continuación más tarde o confirma con la aerolínea que la conexión está protegida.",
      tight:
        "Puede salir bien si todo va puntual. Siéntate cerca de la parte delantera, viaja solo con equipaje de mano y comprueba tu puerta de embarque en cuanto aterrices.",
      workable:
        "Un margen razonable. Ve directamente a tu siguiente puerta y evita paradas largas por el camino.",
      comfortable:
        "Tiempo de sobra. Deberías poder comer algo o descansar antes de embarcar.",
      passportUnsure:
        "¿No sabes si pasarás control de pasaportes? Comprueba si en el aeropuerto de conexión entras en un nuevo país o zona, como el espacio Schengen.",
      bagsUnsure:
        "¿No sabes qué pasa con tu equipaje? Pregunta al facturar si va facturado hasta tu destino final.",
    },
  },
  days: {
    typeOptions: {
      "big-city": "Gran ciudad",
      town: "Pueblo",
      countryside: "Campo",
    },
    typeLabels: {
      "big-city": "Gran ciudad",
      town: "Ciudad pequeña o pueblo",
      countryside: "Campo o playa",
    },
    fit: {
      fits: "Encaja en tu tiempo",
      spare: "Te sobra tiempo",
      packed: "Demasiado apretado",
    },
    formLabel: "Paradas y estilo de viaje",
    yourStops: "Tus paradas",
    place: (n) => `Lugar ${n}`,
    placePlaceholder: "p. ej., Lisboa",
    type: "Tipo",
    dayTrips: "Excursiones",
    remove: "Quitar",
    removeLabel: (n) => `Quitar el lugar ${n}`,
    addStop: "+ Añadir una parada",
    pace: "Tu ritmo",
    paces: { relaxed: "Tranquilo", moderate: "Moderado", fast: "Rápido" },
    aboutTrip: "Sobre el viaje",
    longHaul: "Vuelo de largo recorrido (con varios husos horarios)",
    longJourneys: "Trayectos largos entre paradas (más de unas horas)",
    slowerGroup: "Viajas con niños o con personas mayores",
    available: "Días disponibles (opcional)",
    availablePlaceholder: "p. ej., 10",
    availableHint: "Días totales, incluidos los de viaje.",
    recommended: "Duración recomendada del viaje",
    totalDays: (n) => `${n} días`,
    stopDays: (n) => `${n} días`,
    summary: (nights, ground, travel) =>
      `${nights} noches · ${ground} días de visita + ${String(travel).replace(".", ",")} de viaje`,
    extraDays: (n) => ` · ${n} días de más`,
    fromGuides: "De nuestras guías de destino (en inglés)",
    sharePrompt: "Copia este enlace para compartir tu plan:",
    footnote:
      "Basado en las reglas prácticas de nuestra guía sobre cuántos días necesitas para un viaje. Ajústalo a tus intereses.",
    stopName: (n) => `Parada ${n}`,
    notes: {
      dayTrips: (n) => `+${n} por ${plural(n, "excursión", "excursiones")}`,
      relaxed: "+1 por un ritmo tranquilo",
      fast: "-1 por un ritmo rápido",
      slowerGroup: "+1 por viajar con niños o personas mayores",
    },
    warnings: {
      rushed:
        "Tienes más de una base por cada tres días, y el viaje puede resultar apresurado. Valora quitar una parada o convertirla en una excursión.",
      longHaulFocus:
        "En un viaje de largo recorrido de menos de diez días, suele funcionar mejor centrarse en una o dos bases.",
      needMoreDrop: (n, stop) =>
        `Necesitarías ${n} ${plural(n, "día", "días")} más. Quitar ${stop} o convertirlo en una excursión te ayudaría.`,
      needMore: (n) =>
        `Necesitarías ${n} ${plural(n, "día", "días")} más. Prueba con menos excursiones o un ritmo más rápido.`,
    },
  },
  slider: {
    carousel: "carrusel",
    slide: "diapositiva",
    regionLabel: "Herramientas de viaje gratuitas",
    chooseTool: "Elige una herramienta",
    previous: "Herramienta anterior",
    next: "Herramienta siguiente",
    slideLabel: (i, n, label) => `${i} de ${n}: ${label}`,
  },
};

const fr: ToolsMessages = {
  common: {
    reset: "Réinitialiser",
    copyLink: "Copier le lien de partage",
    copied: "Lien copié",
    no: "Non",
    yes: "Oui",
    unsure: "Je ne sais pas",
    duration: (h, m) => (h ? `${h} h ${m} min` : `${m} min`),
  },
  budget: {
    formLabel: "Données du budget de voyage",
    quickFormLabel: "Budget de voyage rapide",
    yourTrip: "Votre voyage",
    travellers: "Voyageurs",
    nights: "Nuits",
    currency: "Devise",
    gettingThere: "Transport et hébergement",
    flightsPerPerson: "Vols par personne",
    flightsHint: "Aller-retour, avec les bagages dont vous avez besoin",
    accommodation: "Hébergement par nuit",
    accommodationHint: "Pour tout le groupe, taxes comprises",
    stayPerNight: "Hébergement par nuit",
    dailySpending: "Dépenses quotidiennes par personne",
    dailySpend: "Dépenses par jour et par personne",
    food: "Repas et boissons",
    transport: "Transports locaux",
    activities: "Activités",
    extrasAndBuffer: "Extras et marge",
    extras: "Dépenses ponctuelles (groupe)",
    extrasHint: "Assurance, visas, transferts aéroport, cadeaux",
    buffer: "Marge de sécurité",
    noBuffer: "Pas de marge",
    bufferOption: (b) => `${b} % pour les imprévus`,
    estimated: "Coût estimé du voyage",
    perPerson: "Par personne",
    perDay: (days) => `Par jour (${days} jours)`,
    lines: {
      flights: "Vols",
      accommodation: "Hébergement",
      food: "Repas et boissons",
      transport: "Transports locaux",
      activities: "Activités",
      extras: "Extras",
    },
    bufferLine: (p) => `Marge (${p} %)`,
    sharePrompt: "Copiez ce lien pour partager votre budget :",
    print: "Imprimer ou enregistrer en PDF",
    footnote: (days, nights) =>
      `Basé sur vos propres estimations. Les dépenses quotidiennes comptent ${days} jours pour ${nights} nuits, afin d'inclure les jours d'arrivée et de départ.`,
    quickSummary: (perPerson, days) =>
      `${perPerson} par personne · ${days} jours de dépenses`,
    openFull: "Ouvrir le calculateur complet →",
  },
  layover: {
    verdicts: {
      comfortable: "Confortable",
      workable: "Faisable",
      tight: "Serrée",
      risky: "Risquée",
    },
    formLabel: "Détails de la correspondance",
    yourLayover: "Votre correspondance",
    hours: "Heures",
    minutes: "Minutes",
    ticketQuestion: "Les deux vols sont-ils sur le même billet ?",
    oneTicket: "Un seul billet",
    separateTickets: "Billets séparés",
    airportSize: "Taille de l'aéroport de correspondance",
    smallAirport: "Petit ou régional",
    largeAirport: "Grand aéroport",
    terminalQuestion: "Changez-vous de terminal ?",
    passportQuestion: "Contrôle des passeports ou de l'immigration ?",
    securityQuestion: "Nouveau contrôle de sûreté ?",
    bagsQuestion: "Récupérer et réenregistrer vos bagages ?",
    extrasQuestion: "Autre chose qui pourrait vous ralentir ?",
    extras: {
      children: "Vous voyagez avec des enfants ou à mobilité réduite",
      busySeason: "Période chargée (vacances, haute saison)",
      longHaulFirst: "Le premier vol est un long-courrier",
      firstVisit: "Première fois dans cet aéroport",
    },
    yourConnection: "Votre correspondance",
    toSpare: (t) => `${t} de marge`,
    short: (t) => `Il manque ${t}`,
    summary: (layover, needed) =>
      `Correspondance de ${layover} · temps nécessaire estimé : ${needed}`,
    sharePrompt: "Copiez ce lien pour partager votre correspondance :",
    disclaimer:
      "Les durées de chaque étape sont des estimations approximatives pour planifier, pas des temps minimaux de correspondance officiels. Les compagnies et les aéroports les fixent pour chaque aéroport ; vérifiez auprès de votre compagnie pour vos vols.",
    steps: {
      deplaneLarge: "Descendre de l'avion et marcher (grand aéroport)",
      deplaneSmall: "Descendre de l'avion et marcher (petit aéroport)",
      terminalChange: "Changer de terminal",
      passportControl: "Contrôle des passeports ou de l'immigration",
      securityAgain: "Nouveau contrôle de sûreté",
      recheckBags: "Récupérer et réenregistrer les bagages",
      children: "Voyager avec des enfants ou à mobilité réduite",
      busySeason: "Période chargée",
      longHaulFirst: "Premier vol long-courrier (arrivée moins prévisible)",
      firstVisit: "Première fois dans cet aéroport",
      boardingCloses: "L'embarquement ferme généralement avant le départ",
      separateTickets:
        "Billets séparés : marge en cas de retard du premier vol",
    },
    advice: {
      separateTickets:
        "Avec des billets séparés, la seconde compagnie ne vous replacera généralement pas sur un autre vol si vous manquez le vôtre. Prévoyez une large marge ou réservez un billet unique.",
      singleTicket:
        "Avec un billet unique, la compagnie ne devrait vendre que des correspondances qui respectent son temps minimal de correspondance, et vous replacera normalement si un retard du premier vol vous fait manquer le second.",
      risky:
        "Cette correspondance est plus courte que les étapes qu'elle implique. Envisagez un vol suivant plus tardif, ou vérifiez auprès de la compagnie que la correspondance est protégée.",
      tight:
        "Cela peut passer si tout est à l'heure. Asseyez-vous à l'avant, voyagez avec un bagage cabine uniquement et vérifiez votre porte d'embarquement dès l'atterrissage.",
      workable:
        "Une marge raisonnable. Rendez-vous directement à votre porte suivante et évitez les longs arrêts en chemin.",
      comfortable:
        "Largement le temps. Vous devriez pouvoir manger ou vous reposer avant d'embarquer.",
      passportUnsure:
        "Vous ne savez pas s'il y a un contrôle des passeports ? Vérifiez si vous entrez dans un nouveau pays ou une nouvelle zone, comme l'espace Schengen, à l'aéroport de correspondance.",
      bagsUnsure:
        "Vous ne savez pas pour vos bagages ? Demandez à l'enregistrement s'ils sont enregistrés jusqu'à votre destination finale.",
    },
  },
  days: {
    typeOptions: {
      "big-city": "Grande ville",
      town: "Petite ville",
      countryside: "Campagne",
    },
    typeLabels: {
      "big-city": "Grande ville",
      town: "Petite ville ou village",
      countryside: "Campagne ou bord de mer",
    },
    fit: {
      fits: "Tient dans votre temps",
      spare: "Du temps en plus",
      packed: "Trop chargé",
    },
    formLabel: "Étapes et style de voyage",
    yourStops: "Vos étapes",
    place: (n) => `Lieu ${n}`,
    placePlaceholder: "ex. Lisbonne",
    type: "Type",
    dayTrips: "Excursions",
    remove: "Retirer",
    removeLabel: (n) => `Retirer le lieu ${n}`,
    addStop: "+ Ajouter une étape",
    pace: "Votre rythme",
    paces: { relaxed: "Détendu", moderate: "Modéré", fast: "Rapide" },
    aboutTrip: "À propos du voyage",
    longHaul: "Vol long-courrier (plusieurs fuseaux horaires)",
    longJourneys: "Longs trajets entre les étapes (plus de quelques heures)",
    slowerGroup: "Vous voyagez avec des enfants ou des personnes âgées",
    available: "Jours disponibles (facultatif)",
    availablePlaceholder: "ex. 10",
    availableHint: "Nombre total de jours, trajets compris.",
    recommended: "Durée de voyage recommandée",
    totalDays: (n) => `${n} jours`,
    stopDays: (n) => `${n} jours`,
    summary: (nights, ground, travel) =>
      `${nights} nuits · ${ground} jours de visite + ${String(travel).replace(".", ",")} de trajet`,
    extraDays: (n) => ` · ${n} jours en plus`,
    fromGuides: "Extrait de nos guides de destination (en anglais)",
    sharePrompt: "Copiez ce lien pour partager votre plan :",
    footnote:
      "Basé sur les règles pratiques de notre guide sur le nombre de jours nécessaires pour un voyage. Adaptez-le à vos envies.",
    stopName: (n) => `Étape ${n}`,
    notes: {
      dayTrips: (n) =>
        `+${n} pour ${plural(n, "l'excursion", "les excursions")}`,
      relaxed: "+1 pour un rythme détendu",
      fast: "-1 pour un rythme rapide",
      slowerGroup: "+1 pour les enfants ou les personnes âgées",
    },
    warnings: {
      rushed:
        "Vous avez plus d'une étape tous les trois jours, ce qui peut sembler précipité. Envisagez de supprimer une étape ou d'en faire une excursion.",
      longHaulFocus:
        "Pour un voyage long-courrier de moins de dix jours, mieux vaut généralement se concentrer sur une ou deux étapes.",
      needMoreDrop: (n, stop) =>
        `Il vous faudrait ${n} ${plural(n, "jour", "jours")} de plus. Retirer ${stop} ou en faire une excursion vous aiderait.`,
      needMore: (n) =>
        `Il vous faudrait ${n} ${plural(n, "jour", "jours")} de plus. Essayez moins d'excursions ou un rythme plus rapide.`,
    },
  },
  slider: {
    carousel: "carrousel",
    slide: "diapositive",
    regionLabel: "Outils de voyage gratuits",
    chooseTool: "Choisir un outil",
    previous: "Outil précédent",
    next: "Outil suivant",
    slideLabel: (i, n, label) => `${i} sur ${n} : ${label}`,
  },
};

export const TOOLS_MESSAGES: Record<Locale, ToolsMessages> = { en, es, fr };

export const toolsMessages = (locale: Locale): ToolsMessages =>
  TOOLS_MESSAGES[locale];
