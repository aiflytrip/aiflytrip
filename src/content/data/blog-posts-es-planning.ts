import { type GuideSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type PostInput = z.input<typeof GuideSchema>;

/**
 * Spanish editions of the planning and practical posts, written for
 * Spanish-speaking readers rather than translated line by line. Posts whose
 * English date has passed go live on the day they were written; the rest
 * share the English date. Inline links only point to posts already live by
 * each post's own date.
 */
export const spanishPlanningPosts: PostInput[] = [
  {
    slug: "como-planificar-un-viaje",
    locale: "es",
    translationOf: "how-to-plan-a-trip",
    photo: "plan-trip",
    category: "planning",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    title: "Cómo planificar un viaje: guía paso a paso",
    description:
      "Guía práctica para planificar un viaje paso a paso: elegir fechas y destino, fijar un presupuesto, preparar el itinerario y tener listos los documentos.",
    headline: "Cómo planificar un viaje, paso a paso",
    intro:
      "Planificar bien un viaje consiste sobre todo en tomar unas pocas decisiones grandes en el orden correcto. Esta guía recorre los pasos que sigue la mayoría de los viajeros, desde decidir qué tipo de viaje quieres hasta prepararte para salir, con consejos prácticos para cada etapa.",
    sections: [
      {
        heading: "1. Decide qué tipo de viaje quieres",
        paragraphs: [
          "Antes de mirar destinos, piensa qué haría que el viaje mereciera la pena: descansar, comer bien, cultura, naturaleza, tiempo en familia o aventura. Apuntar dos o tres prioridades facilita todas las decisiones posteriores, porque puedes comparar cada opción con ellas.",
          "Sé sincero con tu ritmo. A algunos viajeros les encantan los días intensos; otros disfrutan más de un viaje tranquilo con una actividad principal al día. Planificar según tu ritmo real es la mejor forma de evitar unas vacaciones agotadoras.",
        ],
        bullets: [],
      },
      {
        heading: "2. Elige las fechas y la duración",
        paragraphs: [
          "Las fechas influyen en el tiempo, en la cantidad de gente y en los precios. La temporada media, los meses justo antes y después de la temporada alta, suele combinar buen tiempo con menos aglomeraciones. Revisa los festivos y las fiestas locales del destino, que pueden ser una maravilla o encarecer y llenar el viaje.",
          "Después decide cuánto tiempo ir. Recuerda contar los días de viaje: los vuelos largos y el cambio de horario suelen ocupar casi todo el primer día. Nuestra guía sobre [cuántos días de viaje necesitas](/es/blog/cuantos-dias-de-viaje) explica cómo elegir, y la herramienta gratuita [¿cuántos días necesito?](/es/herramientas/cuantos-dias) lo calcula parada a parada.",
        ],
        bullets: [
          "Cuenta las noches que vas a pasar de verdad en el destino, no solo las fechas.",
          "Deja al menos dos o tres noches en cada base para que cambiar compense.",
          "Reserva un día de margen antes de volver al trabajo si cruzas husos horarios.",
        ],
      },
      {
        heading: "3. Fija un presupuesto realista",
        paragraphs: [
          "Divide el presupuesto en partidas: transporte de ida y vuelta, alojamiento, transporte local, comida, actividades y un colchón para imprevistos. El alojamiento y los vuelos suelen ser lo más caro, así que investígalos primero.",
          "Los precios cambian con la temporada y la demanda, así que toma las primeras estimaciones como rangos y afínalas al reservar. Apartar un colchón, a menudo alrededor del diez por ciento, ayuda a absorber sorpresas. Nuestra [calculadora de presupuesto de viaje](/es/herramientas/calculadora-presupuesto-viaje) suma las partidas y muestra el coste por persona y por día.",
        ],
        bullets: [],
      },
      {
        heading: "4. Esboza un itinerario aproximado",
        paragraphs: [
          "Empieza con un esquema sencillo: en qué lugares vas a dormir y cuántas noches. Agrupa los lugares que quieres ver por zonas, para que cada día se centre en uno o dos barrios o pueblos y pierdas menos tiempo en desplazamientos.",
          "Mantén el esquema flexible. Reserva las pocas cosas que exigen reserva previa, como museos o restaurantes muy solicitados, y deja el resto abierto. Nuestro [ejemplo de itinerario de viaje](/es/blog/ejemplo-de-itinerario-de-viaje) muestra cómo queda un plan realista día a día.",
        ],
        bullets: [],
      },
      {
        heading: "5. Reserva el transporte y el alojamiento",
        paragraphs: [
          "Reserva el transporte de larga distancia y el alojamiento cuando el esquema esté claro. Elige un alojamiento en una zona práctica para tus planes, cerca del transporte público, en lugar de simplemente el más barato, porque ahorra tiempo y dinero cada día. Nuestra guía sobre [cómo encontrar vuelos baratos](/es/blog/como-encontrar-vuelos-baratos) explica cómo comparar tarifas.",
          "Lee bien las condiciones de cancelación, sobre todo si tus planes pueden cambiar, y guarda todas las confirmaciones en un mismo sitio, con copia sin conexión.",
        ],
        bullets: [],
      },
      {
        heading: "6. Prepara documentos, dinero y salud",
        paragraphs: [
          "Revisa con tiempo la validez del pasaporte, si necesitas visado o autorización de viaje y las recomendaciones sanitarias, siempre en fuentes oficiales. Los requisitos dependen de tu nacionalidad y del destino, y pueden cambiar.",
          "Plantéate un seguro de viaje, avisa a tu banco si hace falta y decide cómo vas a pagar: tarjeta, efectivo o ambos. Nuestra guía de [documentos para viajar](/es/blog/documentos-para-viajar) cubre esta etapa con más detalle, y si una solicitud de visado pide datos de vuelo, consulta nuestra guía sobre la [reserva de vuelo para el visado](/es/blog/reserva-de-vuelo-para-visado).",
        ],
        bullets: [],
      },
      {
        heading: "7. Últimos preparativos",
        paragraphs: [
          "En la última semana, descarga mapas sin conexión y las aplicaciones clave, guarda copias de los documentos importantes, mira la previsión del tiempo y confirma las reservas. Viajar ligero facilita mucho moverse entre bases.",
        ],
        bullets: [
          "Guarda copias digitales del pasaporte, las reservas y el seguro.",
          "Descarga mapas sin conexión de cada lugar que vayas a visitar.",
          "Comprueba los días de apertura de los lugares alrededor de los que has planificado.",
        ],
      },
      {
        heading: "Cómo usar bien un planificador de viajes con IA",
        paragraphs: [
          "Un planificador con IA es más útil en la fase de borrador. Dale los datos que importan: adónde vas, las fechas, quién viaja, el presupuesto, el ritmo y lo que te gusta. Cuanto más concreto seas, más útiles serán el itinerario y el presupuesto. Puedes probarlo con nuestro [planificador de viajes con IA](/es/planificar).",
          "Toma el resultado como punto de partida, no como plan definitivo. Comprueba que el orden de los días tiene sentido en el mapa, confirma los días de apertura y las reservas necesarias en las webs oficiales y ajusta el ritmo a tu gusto. Precios, horarios y requisitos de entrada cambian, así que verifícalos siempre en fuentes oficiales.",
        ],
        bullets: [
          "Sé concreto con el ritmo, los intereses y los imprescindibles.",
          "Revisa la ruta en un mapa: ¿están agrupados los lugares cercanos?",
          "Verifica horarios, precios y requisitos de entrada en fuentes oficiales.",
        ],
      },
      {
        heading: "Errores de planificación que conviene evitar",
        paragraphs: [
          "El error más habitual es querer meter demasiado. Un plan que parece emocionante sobre el papel puede resultar agotador en la práctica, sobre todo con jet lag. Otro es subestimar el tiempo de desplazamiento, incluido el trayecto a aeropuertos y estaciones.",
        ],
        bullets: [
          "Demasiados cambios de hotel en un viaje corto.",
          "Nada de tiempo libre para descansar o improvisar.",
          "Dar por hechos los horarios y los precios sin comprobarlos.",
          "Dejar los documentos y el visado para el último momento.",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Con cuánta antelación hay que planificar un viaje?",
        answer:
          "Para viajes internacionales, empezar a planificar con unos meses de antelación te da más opciones de vuelos y alojamiento, sobre todo en temporada alta. Los viajes cortos se pueden planificar más tarde. Revisa pronto si necesitas visado o autorización, porque algunos tardan en tramitarse.",
      },
      {
        question: "¿Qué hay que reservar primero al planificar un viaje?",
        answer:
          "Normalmente el transporte principal y el alojamiento, cuando ya tienes claras las fechas y los lugares donde vas a dormir. Después reserva las actividades que se agotan o tienen entrada con hora, y deja el resto del itinerario flexible.",
      },
      {
        question: "¿Puede un planificador con IA organizar todo mi viaje?",
        answer:
          "Un planificador con IA es útil para preparar rápido un itinerario día a día y un presupuesto según tus preferencias. Aun así, conviene comprobar en fuentes oficiales detalles prácticos como los horarios, los precios y los requisitos de entrada antes de viajar.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "cuantos-dias-de-viaje",
        "documentos-para-viajar",
        "ejemplo-de-itinerario-de-viaje",
        "como-encontrar-vuelos-baratos",
        "mejores-planificadores-de-viajes-con-ia",
      ],
    },
    sources: [
      SOURCES.esTravelAdvice,
      SOURCES.esTravellerRegistry,
      SOURCES.euEntry,
    ],
  },
  {
    slug: "cuantos-dias-de-viaje",
    locale: "es",
    translationOf: "how-many-days-for-a-trip",
    photo: "trip-length",
    category: "planning",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    title: "¿Cuántos días de viaje necesitas? Cómo elegir la duración",
    description:
      "Cómo decidir cuánto debe durar un viaje: una forma sencilla de contar los días, cuántas noches pasar en cada base y ejemplos de duración para distintos viajes.",
    headline: "¿Cuántos días necesitas para un viaje?",
    intro:
      "Decidir cuánto tiempo pasar en un sitio es de lo más difícil al planificar. Si te quedas corto, pasas casi todo el tiempo desplazándote; si te quedas demasiado en un lugar, puede que te sobren días. Esta guía propone una forma sencilla de calcularlo.",
    sections: [
      {
        heading: "Empieza por el tiempo que tienes, no por el destino",
        paragraphs: [
          "Parte del número total de días que puedes viajar, con fines de semana y festivos incluidos. Después resta los días de viaje: los vuelos largos, los traslados al aeropuerto y la adaptación al cambio de hora suelen ocupar casi un día en cada extremo.",
          "Lo que queda es tu tiempo real en destino. Planificar con esa cifra, en lugar de con las fechas de ida y vuelta, te da una idea mucho más realista de lo que se puede hacer. Nuestra herramienta gratuita [¿cuántos días necesito?](/es/herramientas/cuantos-dias) hace la cuenta por ti, parada a parada.",
        ],
        bullets: [],
      },
      {
        heading: "Cuántas noches pasar en cada lugar",
        paragraphs: [
          "Cada vez que cambias de alojamiento pierdes tiempo en hacer la maleta, dejar la habitación, desplazarte e instalarte. Como regla aproximada, dos noches es el mínimo para que una parada merezca la pena, y tres o más te permiten relajarte y hacer excursiones.",
          "Las grandes ciudades con muchos barrios y museos, como París, Roma o Tokio, suelen merecer al menos tres o cuatro días. Los pueblos o las bases en el campo funcionan con dos o tres noches, sobre todo si las usas para excursiones de un día.",
        ],
        bullets: [
          "Gran ciudad: de tres a cinco días.",
          "Ciudad pequeña o pueblo: de dos a tres días.",
          "Base de campo o de playa: tres noches o más, para descansar de verdad.",
        ],
      },
      {
        heading: "Cuántas paradas hacer",
        paragraphs: [
          "Una pauta útil es planear más o menos una base por cada tres o cuatro días de viaje. Un viaje de una semana funciona bien con una o dos bases, y uno de dos semanas puede incluir tres o cuatro con comodidad.",
          "Menos paradas suele significar un viaje mejor. Ves más de cada lugar, pasas menos tiempo desplazándote y tienes espacio para descubrimientos imprevistos, que a menudo son lo mejor del viaje.",
        ],
        bullets: [],
      },
      {
        heading: "Ejemplos de duración",
        paragraphs: [
          "Un puente de tres o cuatro días da para una sola ciudad. Una semana da para una ciudad y una región distinta, por ejemplo París y Normandía, o Lisboa y el Algarve. De diez días a dos semanas da para una ruta por varias ciudades, como Roma, Florencia y Venecia, o Tokio, Kioto y Osaka.",
          "Si tienes poco tiempo en un destino lejano, plantéate centrarte en una región y dejar las demás para otro viaje en lugar de intentar recorrer todo el país.",
          "La duración y el coste van de la mano, porque cada día extra suma una noche de alojamiento y un día de gastos. Cuando tengas un número de días en mente, nuestra [calculadora de presupuesto de viaje](/es/herramientas/calculadora-presupuesto-viaje) muestra lo que costará el viaje por persona y por día.",
        ],
        bullets: [],
      },
      {
        heading: "Señales de que tu plan va demasiado cargado",
        paragraphs: [
          "Si casi todos los días implican dejar un hotel, o tu plan no tiene ni una tarde libre, probablemente es demasiado ambicioso. Prueba a quitar una parada o una actividad principal por día y mira si el viaje resulta más agradable.",
        ],
        bullets: [
          "Más de un cambio de hotel cada dos días.",
          "Todos los días tienen más de dos reservas con hora.",
          "No hay tiempo reservado para comer, descansar o pasear.",
        ],
      },
      {
        heading: "Ajústalo a tu forma de viajar",
        paragraphs: [
          "Las pautas de arriba suponen un ritmo moderado. Si te gusta ver todo lo posible, puedes acortar un poco las estancias; si prefieres comidas largas, mañanas tranquilas y tiempo para pasear, añade un día a cada base.",
          "Con quién viajas también cuenta. Los viajes con niños pequeños o con personas mayores suelen funcionar mejor con menos paradas y estancias más largas, porque cada cambio de hotel cuesta más esfuerzo. Los grupos también se mueven más despacio que quien viaja solo.",
        ],
        bullets: [],
      },
      {
        heading: "Ten en cuenta el jet lag y el cansancio",
        paragraphs: [
          "Cruzar varios husos horarios puede afectar a tu energía los primeros días. Planea un primer día tranquilo sin reservas importantes y deja las visitas más exigentes para un poco más adelante. Nuestra guía sobre [cómo combatir el jet lag](/es/blog/como-combatir-el-jet-lag) explica qué ayuda.",
          "Los trayectos largos por tierra también cansan. Si un día de viaje dura más de unas horas, tómalo como día de viaje y planea solo un paseo corto o una cena tranquila al llegar.",
        ],
        bullets: [
          "Que el primer día tras un vuelo largo sea ligero.",
          "Evita reservas fijas la mañana siguiente a tu llegada.",
          "Trata los traslados largos como días de viaje, no de visitas.",
        ],
      },
      {
        heading: "Excursión de un día o cambiar de base",
        paragraphs: [
          "Si un lugar está a una o dos horas de tu base, una excursión de un día suele ser más fácil que cambiar de hotel: viajas ligero, mantienes la habitación y vuelves por la noche a un sitio conocido.",
          "Cambiar de base tiene más sentido cuando el siguiente lugar está lejos, cuando quieres vivirlo por la noche o a primera hora, o cuando vas en una dirección y no tendrás que volver.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Cuántos días necesito para una escapada urbana?",
        answer:
          "Tres o cuatro días bastan en la mayoría de las grandes ciudades: lo suficiente para lo principal, uno o dos barrios con calma y quizá una excursión de medio día. Dos días funcionan en una ciudad pequeña, o para una primera toma de contacto con una grande si eliges pocas cosas.",
      },
      {
        question: "¿Es suficiente una semana para un viaje internacional?",
        answer:
          "Una semana da para una ciudad y una región cercana, o para dos ciudades unidas por un tren o un vuelo corto. En destinos lejanos, recuerda que el viaje y el cambio de hora pueden ocupar un día en cada extremo, así que céntrate en menos lugares.",
      },
      {
        question: "¿Cuántas ciudades visitar en dos semanas?",
        answer:
          "Tres o cuatro bases suelen ser cómodas en un viaje de dos semanas, con tres a cinco días en cada una. Se pueden visitar más ciudades, pero los días de viaje frecuentes cansan y dejan menos tiempo para disfrutar de cada parada.",
      },
      {
        question: "¿Conviene planear días de descanso durante el viaje?",
        answer:
          "Sí, sobre todo en viajes de más de una semana. Un día más ligero sin reservas fijas cada pocos días te ayuda a recuperarte y te deja tiempo para las experiencias improvisadas, que a menudo acaban siendo los mejores recuerdos.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "como-planificar-un-viaje",
        "documentos-para-viajar",
        "ejemplo-de-itinerario-de-viaje",
        "como-planificar-un-viaje-barato",
      ],
    },
    sources: [SOURCES.france, SOURCES.japan, SOURCES.portugal],
  },
  {
    slug: "documentos-para-viajar",
    locale: "es",
    translationOf: "travel-documents-checklist",
    photo: "documents",
    category: "practical",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    title: "Documentos para viajar: qué revisar antes de salir",
    description:
      "Lista práctica de documentos y requisitos de entrada que revisar antes de un viaje internacional, con enlaces a las fuentes oficiales con las normas vigentes.",
    headline: "Documentos para viajar: qué revisar antes de salir",
    intro:
      "Los requisitos de entrada cambian según la nacionalidad y el destino, y pueden modificarse, así que lo más seguro es saber qué revisar y dónde. Esta lista cubre los principales documentos y preparativos y te lleva a las fuentes oficiales con las normas vigentes. No sustituye a la información oficial.",
    sections: [
      {
        heading: "Pasaporte o DNI",
        paragraphs: [
          "Revisa la fecha de caducidad del pasaporte en cuanto empieces a planificar. Algunos países exigen que el pasaporte siga siendo válido un tiempo mínimo después de tu salida, y otros piden páginas en blanco para los sellos. Renovarlo puede tardar semanas, así que míralo pronto. Dentro de la UE, los ciudadanos de la Unión pueden viajar normalmente con el DNI en vigor.",
          "Asegúrate de que el nombre de tus reservas coincide exactamente con el del documento con el que viajas, porque las diferencias pueden dar problemas al facturar.",
        ],
        bullets: [
          "Fecha de caducidad y validez mínima exigida por tu destino.",
          "Páginas en blanco suficientes, si tu destino las exige.",
          "Los nombres de billetes y reservas coinciden con el documento.",
        ],
      },
      {
        heading: "Visados y autorizaciones de viaje",
        paragraphs: [
          "Según tu nacionalidad, puede que necesites un visado, una autorización electrónica de viaje o nada. Algunas regiones están introduciendo nuevos sistemas fronterizos digitales, así que las normas de un viaje anterior pueden haber cambiado. Si una solicitud de visado pide reservas de vuelo, nuestra guía sobre la [reserva de vuelo para el visado](/es/blog/reserva-de-vuelo-para-visado) explica qué presentar y las opciones seguras.",
          "Consulta siempre los requisitos en webs oficiales o en la embajada del destino, en lugar de fiarte de resúmenes de terceros, y solicita con tiempo cualquier permiso de entrada. Si tienes nacionalidad española, las fichas por país de las recomendaciones de viaje del Ministerio de Asuntos Exteriores son un buen punto de partida.",
        ],
        bullets: [],
      },
      {
        heading: "Salud y seguro",
        paragraphs: [
          "Comprueba si tu destino exige alguna vacuna o tiene recomendaciones sanitarias, y consulta con un profesional si hace falta; en España, los centros de vacunación internacional del Ministerio de Sanidad informan sobre ello. Lleva tus medicamentos habituales en su envase original con una copia de la receta.",
          "El seguro de viaje puede cubrir gastos médicos, cancelaciones y pérdida de equipaje. Lee la póliza para saber qué incluye y qué no, sobre todo la asistencia médica en el extranjero y las actividades que pienses hacer. Nuestra guía sobre el [seguro de viaje](/es/blog/seguro-de-viaje-que-cubre) explica qué mirar.",
        ],
        bullets: [],
      },
      {
        heading: "Dinero y pagos",
        paragraphs: [
          "Comprueba qué tarjetas funcionan en el extranjero, las comisiones por pagos en otra moneda y si tu banco necesita saber que viajas. Lleva un método de pago de reserva y algo de moneda local para los sitios que no aceptan tarjeta.",
        ],
        bullets: [
          "Al menos dos métodos de pago, guardados por separado.",
          "Algo de efectivo local para compras pequeñas.",
          "El teléfono de emergencias de tu banco.",
        ],
      },
      {
        heading: "Conducir en el extranjero",
        paragraphs: [
          "Si piensas conducir, comprueba si tu carné es válido en el destino o si necesitas un permiso internacional de conducción, y qué seguro se exige. Las normas cambian según el país.",
        ],
        bullets: [],
      },
      {
        heading: "Copias e información de emergencia",
        paragraphs: [
          "Guarda copias digitales del pasaporte, los visados, el seguro y las reservas donde puedas verlas sin conexión, y comparte tu itinerario con alguien en casa. Apunta los datos de contacto de la embajada o el consulado de tu país en el destino.",
          "Muchos gobiernos ofrecen recomendaciones de viaje y servicios de aviso para sus ciudadanos en el extranjero. En España, el Registro de Viajeros del Ministerio de Asuntos Exteriores permite que te localicen en caso de emergencia. Revisar las recomendaciones para tu destino poco antes de salir es un buen último paso.",
        ],
        bullets: [],
      },
      {
        heading: "Viajar con menores",
        paragraphs: [
          "Los niños suelen necesitar su propio documento de viaje, y algunos países tienen normas adicionales para menores, por ejemplo cuando viajan con un solo progenitor o con otros adultos. Estas normas cambian, así que revisa los requisitos oficiales del destino y de los países por los que pases.",
          "Llevar documentos de apoyo, como una autorización del progenitor que no viaja, puede ser obligatorio o útil en algunas situaciones. Consulta siempre la información oficial para tu ruta antes de salir.",
        ],
        bullets: [],
      },
      {
        heading: "Tránsitos y vuelos con escala",
        paragraphs: [
          "Si tu viaje hace escala en otro país, comprueba si necesitas un visado o una autorización de tránsito, aunque no salgas del aeropuerto. Depende de tu nacionalidad, del país de tránsito y de si cambias de terminal o recoges equipaje.",
          "Las aerolíneas pueden negarte el embarque si no tienes los documentos adecuados para cada país de la ruta, así que revisa los requisitos de cada parada, no solo del destino final. Nuestra guía sobre el [billete de salida del país](/es/blog/billete-de-salida-del-pais) explica qué revisan en el mostrador.",
        ],
        bullets: [],
      },
      {
        heading: "Un calendario sencillo",
        paragraphs: [
          "Repasar esta lista por etapas la hace manejable y deja tiempo para resolver cualquier problema, como renovar el pasaporte o pedir un visado.",
        ],
        bullets: [
          "En cuanto empieces a planificar: validez del pasaporte y requisitos de entrada.",
          "Varias semanas antes: solicita visados o autorizaciones y contrata el seguro.",
          "Una semana antes: recomendaciones sanitarias, tarjetas y últimas recomendaciones de viaje.",
          "El día anterior: confirma que llevas los documentos y que tienes copias sin conexión.",
        ],
      },
      {
        heading: "Si pierdes o te roban los documentos",
        paragraphs: [
          "Si pierdes el pasaporte o te lo roban en el extranjero, contacta con la embajada o el consulado de tu país, que normalmente puede ayudarte con un documento de viaje de emergencia. También puede ser necesario denunciarlo a la policía local, por ejemplo para el seguro.",
          "Tener copias digitales del pasaporte y de otros documentos, guardadas de forma segura y accesibles sin conexión, agiliza mucho la sustitución.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Dónde consulto los requisitos de entrada de mi destino?",
        answer:
          "En fuentes oficiales: el servicio de recomendaciones de viaje de tu propio gobierno, la embajada o el ministerio de exteriores del país de destino y, para los países Schengen, la web oficial de la UE. Los requisitos dependen de tu nacionalidad, así que revísalos para tu pasaporte.",
      },
      {
        question: "¿Cuánto tiempo de validez debe tener mi pasaporte?",
        answer:
          "Depende del destino. Algunos países exigen que el pasaporte sea válido varios meses después de tu estancia, mientras que otros solo piden que lo sea durante el viaje. Comprueba la norma concreta de tu destino en una web oficial.",
      },
      {
        question: "¿Necesito seguro de viaje?",
        answer:
          "No siempre es obligatorio, pero es muy recomendable, porque la asistencia médica, las cancelaciones y la pérdida de equipaje en el extranjero pueden salir muy caras. Algunos destinos o visados sí exigen un seguro, así que revisa los requisitos de entrada.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "reserva-de-vuelo-para-visado",
        "billete-de-salida-del-pais",
        "como-planificar-un-viaje",
        "seguro-de-viaje-que-cubre",
        "que-llevar-en-el-equipaje-de-mano",
      ],
    },
    sources: [
      SOURCES.esTravelAdvice,
      SOURCES.esTravellerRegistry,
      SOURCES.esTravelHealth,
      SOURCES.euEntry,
      SOURCES.iata,
    ],
  },
  {
    slug: "seguro-de-viaje-que-cubre",
    locale: "es",
    translationOf: "travel-insurance-basics",
    photo: "insurance",
    category: "practical",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    title: "Seguro de viaje: qué cubre y qué revisar antes",
    description:
      "Guía clara sobre el seguro de viaje: asistencia médica, cancelación, enfermedades previas, franquicias y exclusiones, y cuándo conviene contratarlo.",
    headline: "Seguro de viaje: qué cubre y qué revisar antes de contratarlo",
    intro:
      "El seguro de viaje es de esas cosas que esperas no usar nunca. Pero cuando lo necesitas, los detalles de la póliza importan muchísimo. Esta guía explica qué suele cubrir un seguro de viaje, qué preguntar antes de contratarlo y la letra pequeña que pilla a mucha gente. Es información general, no un consejo sobre ninguna póliza concreta.",
    sections: [
      {
        heading: "Por qué merece la pena pensarlo",
        paragraphs: [
          "La principal razón para contratar un seguro de viaje es la asistencia médica. La sanidad en el extranjero puede ser muy cara, y repatriar a alguien tras una enfermedad o un accidente grave puede costar mucho más que el propio viaje. Las recomendaciones oficiales suelen aconsejar viajar con un seguro adecuado.",
          "Las pólizas también suelen cubrir la cancelación o la interrupción del viaje por motivos como una enfermedad, además de retrasos, salidas perdidas y la pérdida o el robo del equipaje. Qué se incluye, y cuánto se paga, cambia mucho entre pólizas.",
        ],
        bullets: [],
      },
      {
        heading: "Asistencia médica y repatriación",
        paragraphs: [
          "Revisa el importe de la cobertura médica y si incluye la repatriación, es decir, traerte a casa para recibir tratamiento. Busca un teléfono de asistencia 24 horas y guárdalo con tus documentos.",
          "Las tarjetas sanitarias y los acuerdos entre países ayudan, pero rara vez sustituyen al seguro. Por ejemplo, la Tarjeta Sanitaria Europea permite a las personas aseguradas en España recibir la asistencia pública necesaria en otros países del Espacio Económico Europeo, Suiza y el Reino Unido, en las mismas condiciones que sus asegurados, pero no cubre la repatriación ni la sanidad privada.",
        ],
        bullets: [],
      },
      {
        heading: "Enfermedades previas",
        paragraphs: [
          "Si tienes una enfermedad previa, normalmente tendrás que declararla al contratar la póliza, y la aseguradora puede hacerte preguntas detalladas. Respóndelas por completo y con sinceridad. Una reclamación relacionada con algo que no declaraste puede rechazarse.",
          "Algunas aseguradoras se especializan en personas con enfermedades previas. Compensa comparar varias opciones, porque los precios y las condiciones cambian mucho.",
        ],
        bullets: [],
      },
      {
        heading: "Cancelación y cuándo contratarlo",
        paragraphs: [
          "La cobertura de cancelación protege el dinero que ya has gastado si no puedes viajar por un motivo cubierto. Por eso tiene sentido contratar la póliza poco después de reservar, para estar cubierto desde el principio y no solo desde la semana en que sales.",
          "Lee con atención la lista de motivos cubiertos. Las pólizas suelen cubrir cosas como una enfermedad grave, pero muchas excluyen simplemente cambiar de opinión, y la cobertura ante incidencias como las huelgas varía.",
        ],
        bullets: [],
      },
      {
        heading: "La letra pequeña: franquicias, límites y exclusiones",
        paragraphs: [
          "Todas las pólizas tienen límites y exclusiones, y de ahí vienen la mayoría de las decepciones. Antes de contratar, busca el documento de información o el resumen de la póliza y revisa estos puntos.",
        ],
        bullets: [
          "La franquicia: la parte de cada reclamación que pagas tú",
          "Los límites por objeto para cosas de valor como móviles, cámaras y portátiles",
          "Las actividades que necesitan cobertura extra, como el esquí o el buceo",
          "Las exclusiones por alcohol, objetos desatendidos o viajar contra las recomendaciones oficiales",
          "Si la póliza cubre todos los países que vas a visitar",
        ],
      },
      {
        heading: "¿Póliza para un viaje o anual?",
        paragraphs: [
          "Una póliza de un viaje cubre un único desplazamiento. Una anual multiviaje cubre varios viajes en un año, normalmente con una duración máxima por viaje. Si viajas más de un par de veces al año, la anual puede compensar, pero revisa el límite de duración y las regiones que cubre.",
          "Algunas cuentas bancarias y tarjetas de crédito incluyen seguro de viaje. Si la tuya lo incluye, lee bien las condiciones, porque la cobertura puede ser más limitada que una póliza independiente o exigir que pagaras el viaje con esa tarjeta.",
        ],
        bullets: [],
      },
      {
        heading: "Cómo reclamar",
        paragraphs: [
          "Si algo sale mal, llama cuanto antes al teléfono de asistencia de la aseguradora, sobre todo por problemas médicos. Guarda recibos, informes médicos, denuncias en caso de robo y confirmaciones por escrito de las aerolíneas sobre los retrasos. Las reclamaciones van mucho mejor con documentación.",
          "Por último, consulta las recomendaciones de viaje oficiales para tu destino antes de salir, porque el seguro puede verse afectado si viajas contra ellas. Nuestra guía de [documentos para viajar](/es/blog/documentos-para-viajar) y la de [qué llevar en el equipaje de mano](/es/blog/que-llevar-en-el-equipaje-de-mano) te ayudan con el resto de la preparación.",
        ],
        bullets: [],
      },
      {
        heading: "Cómo comparar pólizas con criterio",
        paragraphs: [
          "El precio importa, pero la póliza más barata no siempre es la que más compensa. Compara a la vez la cobertura médica, la franquicia, el límite de cancelación y las exclusiones para el viaje que vas a hacer. Una póliza algo más cara con menos franquicia o mejor cobertura para tus actividades puede salir más barata si alguna vez reclamas.",
          "Los comparadores son un buen punto de partida, pero lee siempre el resumen de la propia póliza antes de contratar. Si algo no está claro, pregunta a la aseguradora y pide la respuesta por escrito.",
        ],
        bullets: [],
      },
      {
        heading: "Viajar en familia o durante más tiempo",
        paragraphs: [
          "Las pólizas familiares pueden cubrir a varias personas a la vez, pero revisa qué entienden por familia y los límites de edad de los hijos. Para viajes largos, como un año sabático, busca pólizas pensadas para estancias largas, porque las de un viaje y las anuales suelen limitar el tiempo que puedes estar fuera.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Cuándo debo contratar el seguro de viaje?",
        answer:
          "Lo ideal es poco después de reservar, para que la cobertura de cancelación te proteja desde el principio. Si lo contratas justo antes de salir, no estarás cubierto por los motivos que te impidan viajar antes de esa fecha.",
      },
      {
        question: "¿La Tarjeta Sanitaria Europea sustituye al seguro de viaje?",
        answer:
          "No. La Tarjeta Sanitaria Europea da acceso a la asistencia pública necesaria en otros países europeos en las mismas condiciones que sus asegurados, pero no cubre la repatriación ni la sanidad privada, así que no sustituye a un seguro de viaje.",
      },
      {
        question: "¿Tengo que declarar mis enfermedades previas?",
        answer:
          "Normalmente sí. Las aseguradoras preguntan por enfermedades previas, y una reclamación relacionada con algo que no declaraste puede rechazarse. Responde a las preguntas por completo y compara aseguradoras si la cobertura sale cara.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "documentos-para-viajar",
        "que-llevar-en-el-equipaje-de-mano",
        "como-planificar-un-viaje",
        "consejos-para-viajar-solo",
      ],
    },
    sources: [
      SOURCES.esEuropeanHealthCard,
      SOURCES.esTravelAdvice,
      SOURCES.esTravelHealth,
    ],
  },
  {
    slug: "que-llevar-en-el-equipaje-de-mano",
    locale: "es",
    translationOf: "carry-on-packing-list",
    photo: "carry-on",
    category: "practical",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    title: "Qué llevar en el equipaje de mano: lista práctica",
    description:
      "Lista práctica para viajar solo con equipaje de mano: qué llevar, cómo meterlo en la maleta de cabina, líquidos y baterías, y trucos para viajar ligero.",
    headline: "Qué llevar en el equipaje de mano para viajar solo con cabina",
    intro:
      "Viajar solo con equipaje de mano ahorra dinero en las aerolíneas de bajo coste, te evita esperar en la cinta de equipajes y facilita moverte de un sitio a otro. Requiere algo de planificación. Aquí tienes una lista práctica y las normas que conviene revisar antes de cerrar la maleta.",
    sections: [
      {
        heading: "Revisa primero tu franquicia",
        paragraphs: [
          "Antes de meter nada, comprueba exactamente qué incluye tu tarifa. Muchas aerolíneas distinguen entre un artículo personal pequeño que va debajo del asiento y una maleta de cabina más grande para el compartimento superior, y algunas tarifas básicas solo incluyen el artículo personal. Cada uno tiene sus medidas y, a veces, su peso máximo.",
          "Mide tu maleta con todo dentro, bolsillos exteriores incluidos. Una maleta que cabía vacía puede pasarse de medida llena. Nuestro [comprobador de medidas del equipaje de mano](/es/herramientas/medidas-equipaje-de-mano) te dice si cabe en el límite de tu reserva, y nuestra guía sobre [qué cabe debajo del asiento del avión](/es/blog/que-cabe-debajo-del-asiento-del-avion) explica cómo medir bien.",
        ],
        bullets: [],
      },
      {
        heading: "Ropa: un armario pequeño y combinable",
        paragraphs: [
          "El secreto para viajar ligero es elegir ropa que combine entre sí, para que pocas prendas den para muchos conjuntos. Quédate con dos o tres colores, elige tejidos que se sequen rápido y no se arruguen, y planea lavar algo durante el viaje en lugar de llevar ropa para cada día.",
          "Ponte para volar lo más voluminoso, como la chaqueta y el calzado de caminar. Enrolla la ropa blanda o usa organizadores para que todo ocupe menos y sea fácil de encontrar.",
        ],
        bullets: [
          "Tres o cuatro camisetas o blusas que combinen",
          "Dos pantalones, pantalones cortos o faldas",
          "Una prenda de abrigo y un chubasquero ligero",
          "Ropa interior y calcetines para la mitad del viaje, más detergente de viaje",
          "Un par de zapatos cómodos puestos en el avión, y sandalias o bailarinas ligeras si hacen falta",
          "Pijama y bañador si el viaje los necesita",
        ],
      },
      {
        heading: "Aseo y las normas de líquidos",
        paragraphs: [
          "Los líquidos, geles y cremas del equipaje de mano están limitados en el control de seguridad, y las normas dependen del país y, cada vez más, del aeropuerto, porque algunos tienen escáneres nuevos. Muchos aeropuertos siguen aplicando el límite de envases pequeños en una bolsa transparente, y otros permiten más, así que consulta las normas de tu aeropuerto de salida antes de hacer la maleta.",
          "Los productos sólidos, como el jabón en pastilla, el champú sólido o el desodorante en barra, se libran de las normas de líquidos y ocupan menos. Compra en destino el protector solar y lo más voluminoso si puedes.",
        ],
        bullets: [],
      },
      {
        heading: "Electrónica, baterías y cargadores",
        paragraphs: [
          "Las baterías externas y las baterías de litio de repuesto suelen tener que viajar en cabina y no en la maleta facturada, y las aerolíneas limitan su capacidad. Revisa las normas de tu aerolínea si llevas una batería externa grande o baterías de cámara.",
          "Lleva un cargador con varios puertos y los cables que necesites en lugar de un enchufe por aparato, y un adaptador para tu destino. Descarga antes de salir los mapas, las tarjetas de embarque y el entretenimiento para no depender del wifi del aeropuerto.",
        ],
        bullets: [],
      },
      {
        heading: "Documentos y lo imprescindible",
        paragraphs: [
          "Guarda el pasaporte o el DNI, los visados o autorizaciones, las tarjetas y los medicamentos en el artículo personal, no en el compartimento superior, para que sigan contigo si la maleta de cabina tiene que ir a bodega. Nuestra guía de [documentos para viajar](/es/blog/documentos-para-viajar) explica qué revisar antes de un viaje internacional.",
          "Si tomas medicación, lleva suficiente para todo el viaje y algo más, en su envase original, y revisa en fuentes oficiales las normas de tu destino.",
        ],
        bullets: [],
      },
      {
        heading: "Trucos para que todo quepa",
        paragraphs: [
          "Extiende todo antes de hacer la maleta y quita un tercio; casi todo el mundo lleva de más. Rellena los zapatos con calcetines o cargadores, lleva una bolsa plegable para excursiones o compras y deja algo de espacio para lo que compres por el camino.",
          "Nuestro [generador de lista de equipaje](/es/herramientas/lista-de-equipaje) crea una lista para la duración y el tiempo de tu viaje, y la [calculadora de peso de la maleta](/es/herramientas/peso-de-la-maleta) estima lo que pesará antes de llegar al aeropuerto.",
          "En los vuelos llenos, las maletas de cabina a veces se mandan a bodega en la puerta de embarque, así que lleva lo imprescindible en el artículo personal. Si viajas más de una semana, planea un lavado; la mayoría de los alojamientos y muchos barrios tienen opciones.",
        ],
        bullets: [],
      },
      {
        heading: "¿Te conviene viajar solo con equipaje de mano?",
        paragraphs: [
          "Viajar solo con cabina funciona de maravilla en escapadas urbanas y viajes con varias paradas en los que te mueves a menudo. Es más difícil en viajes con frío, con material específico o si piensas traer muchas cosas. Si necesitas maleta facturada, añádela al reservar; suele ser más barato que hacerlo después.",
          "Con la maleta hecha, nuestro [planificador de viajes con IA](/es/planificar) prepara un itinerario día a día para tu destino, y nuestros [trucos para vuelos baratos](/es/blog/trucos-para-encontrar-vuelos-baratos) cubren otras formas de ahorrar.",
        ],
        bullets: [],
      },
      {
        heading: "Una lista rápida antes de salir",
        paragraphs: [
          "Repásala la noche antes de volar. Cuesta dos minutos y evita la mayoría de los problemas que causan estrés en el aeropuerto.",
        ],
        bullets: [
          "Maleta medida con todo dentro, frente a los límites de tu aerolínea",
          "Líquidos preparados según las normas de tu aeropuerto de salida",
          "Batería externa y baterías de repuesto en cabina, no facturadas",
          "Documentos, tarjetas, medicamentos y cargadores en el artículo personal",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Puedo llevar una batería externa en el equipaje de mano?",
        answer:
          "Normalmente sí, y de hecho las baterías externas y las baterías de litio de repuesto suelen tener que ir en cabina y no en la maleta facturada. Las aerolíneas limitan su capacidad, así que revisa sus normas si llevas una batería grande.",
      },
      {
        question: "¿Cuánto líquido puedo llevar en el equipaje de mano?",
        answer:
          "Depende del país y del aeropuerto. Algunos aeropuertos con escáneres nuevos permiten más que otros, y muchos siguen exigiendo envases pequeños en una bolsa transparente. Consulta la información oficial de tu aeropuerto de salida antes de hacer la maleta.",
      },
      {
        question: "¿Se puede viajar dos semanas solo con equipaje de mano?",
        answer:
          "Sí, si llevas un armario pequeño de prendas combinables y planeas lavar una o dos veces. Es más fácil con calor y en viajes sin material específico, y ayuda ponerse para volar lo que más abulta.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "que-cabe-debajo-del-asiento-del-avion",
        "articulo-personal-o-equipaje-de-mano",
        "cargos-de-las-aerolineas-de-bajo-coste",
        "documentos-para-viajar",
      ],
    },
    sources: [
      SOURCES.aesaPassengers,
      SOURCES.iataTravelers,
      SOURCES.euAirRightsEs,
    ],
  },
  {
    slug: "como-combatir-el-jet-lag",
    locale: "es",
    translationOf: "how-to-beat-jet-lag",
    photo: "jet-lag",
    category: "practical",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    title: "Cómo combatir el jet lag: antes, durante y después",
    description:
      "Formas prácticas de reducir el jet lag: ajustar el sueño antes de volar, qué hacer en el avión y cómo la luz del día y los horarios te ayudan a adaptarte.",
    headline: "Cómo combatir el jet lag: antes, durante y después del vuelo",
    intro:
      "El jet lag aparece cuando tu reloj interno sigue con la hora de casa mientras el reloj de la pared marca otra. En un viaje largo cruzando husos horarios no se puede evitar del todo, pero unos hábitos sencillos cambian mucho lo rápido que te sientes normal. Esto es lo que ayuda, paso a paso.",
    sections: [
      {
        heading: "Por qué aparece el jet lag",
        paragraphs: [
          "Tu cuerpo funciona con un reloj interno que decide cuándo tienes sueño, hambre o estás despejado. Cuando cruzas varios husos horarios de golpe, ese reloj se desajusta respecto a la hora local. El resultado es la mezcla conocida de cansancio de día, despertarse de noche, falta de concentración y estómago revuelto.",
          "Cuantos más husos horarios cruzas, más fuerte suele ser. Mucha gente lleva peor viajar hacia el este que hacia el oeste, porque obliga a dormirse antes de lo que el cuerpo quiere. La buena noticia es que los síntomas suelen aliviarse en unos días a medida que el cuerpo se adapta.",
        ],
        bullets: [],
      },
      {
        heading: "Antes de volar",
        paragraphs: [
          "Si puedes, empieza a mover tu rutina unos días antes de salir. Acostarte y levantarte un poco antes cada día antes de un viaje hacia el este, o un poco después antes de uno hacia el oeste, le da ventaja a tu cuerpo.",
          "Llega al aeropuerto descansado, no agotado. Es tentador quedarse hasta tarde haciendo la maleta, pero empezar un viaje largo falto de sueño empeora el jet lag. Haz la maleta el día anterior y planea un primer día tranquilo en destino; nuestro [ejemplo de itinerario de viaje](/es/blog/ejemplo-de-itinerario-de-viaje) explica por qué el primer día debe ser ligero.",
        ],
        bullets: [],
      },
      {
        heading: "En el avión",
        paragraphs: [
          "Pon el reloj o el móvil en la hora del destino nada más embarcar y empieza a vivir con ese horario. Si allí es de noche, intenta dormir; si es de día, intenta mantenerte despierto, aunque te cueste un libro y mucha fuerza de voluntad.",
          "Bebe agua con frecuencia. El aire de la cabina es seco, y la deshidratación aumenta esa sensación de agotamiento y niebla mental. Modera el alcohol y la cafeína, sobre todo en las horas en que quieras dormir. Un antifaz, tapones o auriculares con cancelación de ruido y una almohada de viaje facilitan mucho dormir en el asiento.",
        ],
        bullets: [
          "Cambia a la hora del destino al embarcar",
          "Duerme o mantente despierto según esa hora",
          "Bebe agua a menudo y limita el alcohol y la cafeína",
          "Lleva antifaz, tapones y almohada de viaje",
        ],
      },
      {
        heading: "Al aterrizar",
        paragraphs: [
          "Lo que más ayuda al llegar es adoptar la hora local enseguida. Come a las horas locales y resiste la tentación de acostarte a media tarde, por mucho que apetezca.",
          "La luz del día es una señal muy potente para tu reloj interno. Sal a la calle durante el día, a ser posible por la mañana tras un vuelo hacia el este, y da un paseo en lugar de quedarte dentro. Si de verdad necesitas descansar, haz siestas cortas para poder dormir por la noche.",
        ],
        bullets: [],
      },
      {
        heading: "Dormir las primeras noches",
        paragraphs: [
          "Cuenta con que la primera o las dos primeras noches no serán perfectas. Mantén la habitación oscura y fresca, evita las comidas pesadas y la cafeína a última hora y deja las pantallas antes de acostarte. Si te despiertas de madrugada, quédate en la cama descansando en lugar de empezar el día.",
          "Algunas personas se plantean somníferos o melatonina. Si son adecuados, y si están disponibles donde vives, depende de cada caso, así que consulta con un farmacéutico o un médico antes de usarlos, sobre todo si tomas otra medicación.",
        ],
        bullets: [],
      },
      {
        heading: "Planifica el viaje teniéndolo en cuenta",
        paragraphs: [
          "Si cruzas muchos husos horarios, incluye el jet lag en el plan. Deja las actividades más importantes para unos días después de llegar y mantén flexibles el primer o los dos primeros días. En viajes muy cortos de un par de días, algunos viajeros prefieren mantener más o menos la hora de casa.",
          "Los horarios de los vuelos también importan. Al elegir entre opciones, llegar a última hora de la tarde o por la noche puede facilitar aguantar despierto hasta una hora normal de acostarse. Nuestra guía sobre [cómo encontrar vuelos baratos](/es/blog/como-encontrar-vuelos-baratos) explica cómo valorar el horario frente al precio, y si tienes escala, el [comprobador de tiempo de escala](/es/herramientas/tiempo-de-escala) te ayuda a elegir una conexión cómoda.",
        ],
        bullets: [],
      },
      {
        heading: "Cuándo pedir consejo",
        paragraphs: [
          "El jet lag es habitual y suele pasar solo. Si tienes una enfermedad que depende de horarios, por ejemplo una en la que tomas medicación a horas fijas, pregunta a tu médico o farmacéutico antes de viajar cómo ajustar las dosis al cambio de hora.",
          "Cuando tengas los vuelos, nuestro [planificador de viajes con IA](/es/planificar) puede preparar un primer día suave según tu hora de llegada, para no pelear contra el jet lag con una agenda llena.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Cuánto dura el jet lag?",
        answer:
          "En la mayoría de las personas los síntomas se alivian en unos días, a medida que el cuerpo se adapta a la hora local. Suele ser más fuerte cuantos más husos horarios cruzas, y mucha gente lleva peor los viajes hacia el este.",
      },
      {
        question: "¿Es mejor dormir en el avión?",
        answer:
          "Depende de la hora en tu destino. Si allí es de noche, intenta dormir; si es de día, intenta mantenerte despierto. Cambiar a la hora del destino al embarcar te ayuda a decidir qué hacer en cada momento del vuelo.",
      },
      {
        question: "¿Debo dormir la siesta al llegar?",
        answer:
          "Si la necesitas, que sea corta para poder dormir por la noche. Salir a la luz del día y comer a las horas locales ayudará a tu reloj interno a adaptarse más rápido que una siesta larga por la tarde.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "ejemplo-de-itinerario-de-viaje",
        "cuanto-tiempo-de-escala-necesito",
        "cuantos-dias-de-viaje",
        "japan-rail-pass-merece-la-pena",
      ],
    },
    sources: [SOURCES.nhsJetLag, SOURCES.cdcJetLag, SOURCES.esTravelHealth],
  },
  {
    slug: "viajar-en-avion-con-ninos",
    locale: "es",
    translationOf: "flying-with-kids",
    photo: "flying-with-kids",
    category: "practical",
    status: "published",
    publishAt: "2026-11-10",
    lastReviewed: "2026-11-08",
    title: "Viajar en avión con niños: guía práctica para familias",
    description:
      "Guía práctica para volar con niños: asientos juntos, comida infantil en el control, carritos y sillas de coche, documentos y cómo entretenerlos a bordo.",
    headline: "Viajar en avión con niños: guía práctica para familias",
    intro:
      "Volar con niños exige más planificación que volar solo, pero casi todo el estrés viene de unas pocas cosas previsibles: los asientos, el equipaje, el control de seguridad y tener a todos comidos y entretenidos. Resuélvelas con antelación y el viaje se vuelve mucho más llevadero. Así se hace.",
    sections: [
      {
        heading: "La reserva: asientos, cunas y horarios",
        paragraphs: [
          "Al reservar, revisa cómo sienta la aerolínea a las familias. Algunas sientan automáticamente a los niños pequeños junto a un adulto; en otras, elegir asientos juntos cuesta dinero. Si ir juntos es importante, compara una tarifa que incluya la elección de asiento; nuestra guía sobre [los cargos de las aerolíneas de bajo coste](/es/blog/cargos-de-las-aerolineas-de-bajo-coste) explica qué mirar.",
          "Los bebés menores de dos años suelen viajar en el regazo de un adulto, normalmente con una tarifa reducida. En los vuelos largos, muchas aerolíneas ofrecen cunas que se fijan a la pared delante de ciertos asientos. Son pocas y tienen límites de tamaño y peso, así que pídela pronto y confírmala antes de volar.",
          "Piensa también en el horario. Los vuelos que coinciden con la siesta o la hora de dormir pueden ser más fáciles con niños pequeños, mientras que madrugar mucho alarga un día ya largo.",
        ],
        bullets: [],
      },
      {
        heading: "Equipaje, carritos y sillas de coche",
        paragraphs: [
          "Revisa las normas de equipaje de tu aerolínea para niños. Muchas permiten un carrito y una silla de coche gratis, y el carrito a menudo se puede usar hasta la puerta del avión y se devuelve en la puerta o en la cinta de equipajes. Las normas cambian, así que confírmalas antes de hacer la maleta.",
          "Si quieres que tu hijo vaya en su propia silla a bordo, normalmente tendrás que comprarle un asiento y usar un modelo homologado. Consúltalo con la aerolínea antes de viajar, porque las políticas sobre qué sillas se aceptan cambian.",
        ],
        bullets: [],
      },
      {
        heading: "El control de seguridad con niños",
        paragraphs: [
          "Los controles de seguridad tienen excepciones para familias. En muchos países, la comida infantil, la leche de fórmula y la leche para un niño se permiten en el equipaje de mano en cantidades razonables por encima del límite normal de líquidos, aunque pueden revisarse aparte.",
          "Guárdalas de forma que sea fácil sacarlas y deja tiempo extra para el control. Los niños suelen pasar andando por el arco, y puede que tengas que plegar el carrito y pasarlo por la máquina de rayos X.",
        ],
        bullets: [],
      },
      {
        heading: "Documentos para los niños",
        paragraphs: [
          "Los niños suelen necesitar su propio documento para viajar al extranjero, y algunos destinos exigen también visado o autorización de viaje para ellos. Revisa con tiempo los requisitos de entrada de cada viajero en fuentes oficiales; nuestra guía de [documentos para viajar](/es/blog/documentos-para-viajar) cubre lo básico.",
          "Si viajas con un niño sin el otro progenitor, o si tu apellido es distinto al suyo, pueden pedirte una prueba del permiso o de vuestra relación. En España, los menores que viajan al extranjero sin sus padres pueden necesitar una autorización de viaje; consulta la información oficial antes de salir.",
        ],
        bullets: [],
      },
      {
        heading: "A bordo: comida, comodidad y entretenimiento",
        paragraphs: [
          "Lleva más comida y bebida de la que crees que vas a necesitar, una muda para cada niño y una camiseta de recambio para ti. Prepara una bolsa pequeña con lo imprescindible que vaya a tus pies, para no tener que levantarte al compartimento superior.",
          "Los cambios de presión durante el despegue y el aterrizaje pueden molestar a los oídos pequeños. Dar el pecho o el biberón a un bebé, o dar a los niños más mayores algo de beber o de masticar en esos momentos, puede ayudar. Juguetes pequeños y nuevos, películas descargadas y auriculares de tamaño infantil valen su peso en oro en los vuelos largos.",
        ],
        bullets: [
          "Comida, bebida y la comida infantil o la leche que necesites",
          "Una muda para cada niño y una camiseta de recambio para ti",
          "Toallitas, pañales y algunas bolsas de plástico",
          "Entretenimiento descargado y auriculares de tamaño infantil",
          "Su peluche o mantita favorita para dormir",
        ],
      },
      {
        heading: "En el aeropuerto",
        paragraphs: [
          "Date mucho tiempo. Todo tarda más con niños, desde la facturación hasta las visitas al baño. Muchos aeropuertos tienen filas de seguridad para familias, zonas de juego y cambiadores; mira la web del aeropuerto para saber dónde están.",
          "Si tienes escala, elige una conexión cómoda en lugar de la más corta posible. Nuestra guía sobre [cuánto tiempo de escala necesitas](/es/blog/cuanto-tiempo-de-escala-necesito) explica cómo valorarla.",
        ],
        bullets: [],
      },
      {
        heading: "Planificar el viaje alrededor del vuelo",
        paragraphs: [
          "Que el primer día tras un vuelo largo sea suave, y organiza los días según las siestas y las comidas en lugar de una lista larga de visitas. Elegir un alojamiento cerca de los lugares que vais a visitar reduce los desplazamientos con niños cansados.",
          "Nuestro [planificador de viajes con IA](/es/planificar) puede preparar un itinerario con ritmo familiar si eliges un ritmo tranquilo y mencionas a los niños en las notas, y nuestro [generador de lista de equipaje](/es/herramientas/lista-de-equipaje) añade lo que necesitáis si viajáis con un niño pequeño.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Puedo pasar leche y comida infantil por el control?",
        answer:
          "En muchos países sí: la comida infantil, la leche de fórmula y la leche para un niño se permiten en cantidades razonables por encima del límite normal de líquidos, aunque pueden revisarse. Confirma las normas vigentes en tu aeropuerto de salida.",
      },
      {
        question: "¿Mi bebé necesita su propio asiento?",
        answer:
          "Normalmente no. Los bebés menores de dos años suelen poder viajar en el regazo de un adulto. Si quieres que vaya en su propia silla de coche, normalmente tendrás que comprarle un asiento y usar una silla homologada por la aerolínea.",
      },
      {
        question: "¿Puedo llevar el carrito hasta el avión?",
        answer:
          "Muchas aerolíneas permiten usar el carrito hasta la puerta del avión y te lo devuelven en la puerta o en la cinta de equipajes, a menudo sin coste. Las políticas y los límites de tamaño cambian, así que consúltalo con tu aerolínea.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "documentos-para-viajar",
        "cargos-de-las-aerolineas-de-bajo-coste",
        "que-llevar-en-el-equipaje-de-mano",
        "que-cabe-debajo-del-asiento-del-avion",
      ],
    },
    sources: [
      SOURCES.aesaPassengers,
      SOURCES.esTravelAdvice,
      SOURCES.euAirRightsEs,
    ],
  },
  {
    slug: "como-planificar-un-viaje-barato",
    locale: "es",
    translationOf: "how-to-plan-a-trip-on-a-budget",
    photo: "budget-trip",
    category: "planning",
    status: "published",
    publishAt: "2026-11-17",
    lastReviewed: "2026-11-08",
    title: "Cómo planificar un viaje barato: guía práctica",
    description:
      "Cómo planificar un viaje económico: fija un presupuesto realista, ahorra en vuelos y alojamiento, come bien por menos, muévete barato y evita comisiones.",
    headline: "Cómo planificar un viaje barato",
    intro:
      "Un viaje barato no tiene por qué sentirse como una renuncia. Los mayores ahorros salen de unas pocas decisiones tomadas pronto: cuándo vas, dónde te alojas y cómo te mueves. Si aciertas con ellas, puedes gastar en lo que de verdad te importa. Así se planifica.",
    sections: [
      {
        heading: "Empieza con un presupuesto realista",
        paragraphs: [
          "Antes de elegir nada, decide más o menos cuánto quieres gastar en total y divídelo en partidas: el viaje de ida y vuelta, el alojamiento, la comida, el transporte local y las actividades, más un colchón para imprevistos. Ver el reparto deja claro dónde están los gastos grandes y dónde un pequeño ahorro apenas cuenta.",
          "Los precios cambian muchísimo entre destinos y temporadas, así que deja que el presupuesto decida dónde y cuándo vas, no solo cómo viajas. El mismo dinero da mucho más de sí en unos lugares, y fuera de temporada alta, que en otros.",
        ],
        bullets: [],
      },
      {
        heading: "Elige bien las fechas",
        paragraphs: [
          "Cuándo viajas afecta a casi todos los gastos a la vez. Los vuelos, el alojamiento e incluso algunas atracciones son más baratos fuera de las vacaciones escolares y la temporada alta, y las semanas justo antes y después suelen traer buen tiempo con menos gente.",
          "Nuestros [trucos para vuelos baratos](/es/blog/trucos-para-encontrar-vuelos-baratos) explican cómo las fechas flexibles bajan la tarifa, y nuestra guía sobre [cuántos días de viaje necesitas](/es/blog/cuantos-dias-de-viaje) te ayuda a ajustar la duración al presupuesto.",
        ],
        bullets: [],
      },
      {
        heading: "Ahorra en el viaje de ida y vuelta",
        paragraphs: [
          "Los vuelos suelen ser el gasto más grande. Compara fechas y aeropuertos cercanos, juzga las tarifas por el precio total con equipaje y viaja ligero si puedes. Nuestra guía paso a paso sobre [cómo encontrar vuelos baratos](/es/blog/como-encontrar-vuelos-baratos) explica el método con detalle.",
          "En distancias cortas, merece la pena mirar el tren o el autobús. Pueden salir más baratos cuando sumas los traslados al aeropuerto de un vuelo, y te llevan de centro a centro.",
        ],
        bullets: [],
      },
      {
        heading: "Elige bien el alojamiento",
        paragraphs: [
          "El alojamiento es el otro gran gasto, y la ubicación importa tanto como el precio por noche. Una habitación algo más cara a poca distancia a pie de lo que quieres ver puede ahorrarte dinero y tiempo en transporte.",
          "Los apartamentos o las habitaciones con cocina te permiten preparar el desayuno y alguna comida. Los albergues con habitaciones privadas, las pensiones y los hoteles pequeños pueden salir muy bien de precio; lee con atención las opiniones recientes, sobre todo sobre limpieza, ruido y la ubicación exacta.",
        ],
        bullets: [],
      },
      {
        heading: "Come bien por menos",
        paragraphs: [
          "No hace falta renunciar a comer bien para ahorrar. Los mercados, las panaderías y los restaurantes sencillos lejos de las calles más turísticas suelen ser más baratos y mejores. En muchos países, el menú del mediodía ofrece una comida completa a un precio más bajo que la carta del mismo restaurante por la noche.",
          "Lleva una botella rellenable donde el agua del grifo sea potable y algo de picar para los días fuera, para no comprar lo primero que veas cuando aprieta el hambre.",
        ],
        bullets: [],
      },
      {
        heading: "Muévete barato",
        paragraphs: [
          "El transporte público suele ser la forma más económica de moverse por una ciudad, y caminar es gratis. Muchas ciudades ofrecen abonos de un día o tarjetas recargables que salen más baratas que los billetes sencillos si haces varios trayectos. Agrupar cada día por zonas, como muestra nuestro [ejemplo de itinerario de viaje](/es/blog/ejemplo-de-itinerario-de-viaje), también reduce el gasto en transporte.",
          "Busca planes gratuitos: parques, miradores, mercados, paseos por barrios y, en algunos sitios, días de entrada gratuita a museos. Revisa en las webs oficiales los días de apertura y si hay que reservar.",
        ],
        bullets: [],
      },
      {
        heading: "Evita comisiones de tarjeta y de cambio",
        paragraphs: [
          "Las comisiones de las tarjetas se acumulan sin que te des cuenta. Pregunta si tu banco cobra por pagar o sacar dinero en el extranjero, y plantéate una tarjeta pensada para viajar si es así. Cuando un datáfono o un cajero te ofrezca cobrarte en tu moneda, elegir la moneda local suele salir mejor.",
          "Dentro de la UE, los pagos en euros a otro país de la UE cuestan en general lo mismo que los pagos nacionales en euros, y la UE publica información sobre estos cargos.",
        ],
        bullets: [
          "Pregunta a tu banco por las comisiones de pagos y retiradas en el extranjero",
          "Paga en la moneda local cuando te den a elegir",
          "Saca dinero menos veces para reducir las comisiones por operación",
          "Guarda un pequeño fondo de emergencia en otra tarjeta",
        ],
      },
      {
        heading: "Controla el gasto sobre la marcha",
        paragraphs: [
          "Una nota sencilla en el móvil con lo que gastas cada día te mantiene a raya sin estropear el viaje. Si un día te pasas, puedes compensarlo con otro más barato. Nuestra [calculadora de presupuesto de viaje](/es/herramientas/calculadora-presupuesto-viaje) suma tus gastos por persona y por día, y nuestro [planificador de viajes con IA](/es/planificar) prepara un itinerario con una estimación de presupuesto en tu moneda.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Qué es lo que más ahorra en un viaje?",
        answer:
          "Las fechas suelen ser lo que más influye, porque viajar fuera de temporada alta abarata a la vez los vuelos y el alojamiento. Después, lo que más diferencia marca es dónde te alojas y cómo llegas al destino.",
      },
      {
        question: "¿Pago en la moneda local o en euros cuando estoy fuera?",
        answer:
          "Elegir la moneda local suele salir mejor. Si eliges tu propia moneda, la conversión se hace a menudo con un tipo de cambio menos favorable. Revisa también las comisiones de tu banco por operaciones en otra moneda.",
      },
      {
        question: "¿Es más barato un apartamento o un hotel?",
        answer:
          "Depende del destino y de la duración del viaje. Los apartamentos con cocina ahorran en comidas, sobre todo a familias y en estancias largas, mientras que los hoteles pueden compensar más en escapadas urbanas cortas.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "trucos-para-encontrar-vuelos-baratos",
        "como-encontrar-vuelos-baratos",
        "cuantos-dias-de-viaje",
        "donde-alojarse-en-una-ciudad-nueva",
        "escapadas-de-invierno-paris-roma-lisboa",
      ],
    },
    sources: [SOURCES.euCardCharges, SOURCES.euAirRightsEs],
  },
  {
    slug: "consejos-para-viajar-solo",
    locale: "es",
    translationOf: "solo-travel-tips",
    photo: "solo-travel",
    category: "planning",
    status: "published",
    publishAt: "2026-11-24",
    lastReviewed: "2026-11-08",
    title: "Consejos para viajar solo: tu primer viaje en solitario",
    description:
      "Consejos prácticos para viajar solo: elegir el primer destino, dónde alojarte, viajar seguro, conocer gente, comer solo y planear días a tu medida.",
    headline:
      "Consejos para viajar solo: cómo planear tu primer viaje en solitario",
    intro:
      "Viajar solo te da libertad total: tu ritmo, tus planes, tus decisiones. La primera vez también puede imponer. Con un poco de planificación, casi todas las preocupaciones desaparecen pronto. Aquí tienes consejos prácticos para elegir adónde ir, viajar seguro y disfrutar de tu propia compañía.",
    sections: [
      {
        heading: "Elige un primer destino fácil",
        paragraphs: [
          "Para un primer viaje en solitario, elige un sitio fácil de recorrer: buen transporte público, muchos visitantes y un idioma que manejes o donde se hable inglés con frecuencia. Las grandes ciudades que se pueden recorrer a pie suelen ser un buen comienzo, porque siempre hay algo que hacer y es fácil encontrar ayuda.",
          "Un viaje corto es un primer paso sensato. Un puente o una semana te permiten coger confianza sin comprometerte a meses de viaje. Nuestra guía sobre [cuántos días de viaje necesitas](/es/blog/cuantos-dias-de-viaje) te ayuda a elegir la duración.",
        ],
        bullets: [],
      },
      {
        heading: "Dónde alojarte",
        paragraphs: [
          "La ubicación importa todavía más cuando vas solo. Elige un sitio céntrico y bien comunicado, para no tener que caminar mucho de noche. Lee las opiniones recientes sobre el barrio, la seguridad y el personal.",
          "Los albergues con habitaciones privadas, las pensiones pequeñas y los hoteles con zonas comunes facilitan conocer gente si te apetece, sin renunciar a tu espacio. Llegar de día la primera jornada hace mucho más fácil encontrar el alojamiento.",
        ],
        bullets: [],
      },
      {
        heading: "Viajar seguro",
        paragraphs: [
          "La mayoría de los viajes en solitario transcurren sin problemas, y unos pocos hábitos ayudan a que siga siendo así. Consulta las recomendaciones de viaje oficiales para tu destino antes de salir, comparte tu itinerario con alguien en casa y mantén el contacto con regularidad. Si tienes nacionalidad española, inscribirte en el Registro de Viajeros de Exteriores permite que te localicen en una emergencia.",
          "Guarda copias digitales del pasaporte y de los documentos importantes, lleva una tarjeta de reserva separada de la principal y averigua cómo contactar con los servicios de emergencia locales. Fíate de tu instinto: si un sitio no te da buena espina, vete.",
        ],
        bullets: [
          "Consulta las recomendaciones de viaje oficiales para tu destino",
          "Comparte tus planes y da señales de vida a alguien en casa",
          "Guarda copias digitales de los documentos y una tarjeta de reserva",
          "Apunta el número de emergencias local",
          "Contrata el seguro de viaje antes de salir",
        ],
      },
      {
        heading: "Seguro y documentos",
        paragraphs: [
          "Cuando viajas solo no hay nadie que lo resuelva si algo sale mal, así que la preparación importa. Asegúrate de que tu seguro de viaje cubre la asistencia médica y las actividades que planeas, y ten a mano el teléfono de asistencia. Nuestra guía sobre el [seguro de viaje](/es/blog/seguro-de-viaje-que-cubre) explica qué revisar.",
          "Revisa con tiempo la validez del pasaporte y los requisitos de entrada; nuestra guía de [documentos para viajar](/es/blog/documentos-para-viajar) te lleva paso a paso.",
        ],
        bullets: [],
      },
      {
        heading: "Conocer gente (si te apetece)",
        paragraphs: [
          "Viajar solo no tiene por qué ser solitario. Los free tours, las clases de cocina, las excursiones de un día y las actividades en grupo son formas fáciles de conocer a otros viajeros sin presión. Los albergues y las pensiones suelen tener zonas comunes o actividades donde las conversaciones surgen solas.",
          "Del mismo modo, no hay ninguna obligación de socializar. Mucha gente que viaja sola disfruta de la calma: leer en un café, pasear sin plan o tomarse su tiempo en un museo.",
        ],
        bullets: [],
      },
      {
        heading: "Comer solo",
        paragraphs: [
          "Comer solo se hace raro al principio para algunas personas, pero enseguida se vuelve normal. La comida del mediodía suele ser la más fácil de disfrutar a solas, y las barras, los mercados y los sitios informales hacen que comer solo resulte relajado. Llévate un libro o simplemente mira pasar la vida.",
          "Las rutas gastronómicas y las clases de cocina combinan una buena comida con compañía, si te apetece un poco de ambas cosas.",
        ],
        bullets: [],
      },
      {
        heading: "Planea días a tu medida",
        paragraphs: [
          "Una de las alegrías de viajar solo es planear exactamente lo que quieres. Agrupa cada día por zonas, ten una alternativa para el mal tiempo y deja tiempo libre para seguir tu curiosidad. Nuestro [ejemplo de itinerario de viaje](/es/blog/ejemplo-de-itinerario-de-viaje) muestra cómo.",
          "Nuestro [planificador de viajes con IA](/es/planificar) prepara un plan día a día según tus intereses y tu ritmo, un punto de partida útil cuando no hay nadie con quien contrastar ideas.",
        ],
        bullets: [],
      },
      {
        heading: "Cómo llevar los momentos difíciles",
        paragraphs: [
          "Casi todo el que viaja solo tiene algún momento de morriña o un día en que todo sale mal: un tren perdido, mal tiempo, una noche solitaria. Ayuda contar con ello. Planea algo fácil y reconfortante para esos días, como tu comida favorita, una película o una llamada a casa.",
          "Los problemas prácticos parecen más grandes cuando vas solo, así que ten algunas cosas preparadas: la dirección del alojamiento guardada sin conexión, el móvil cargado con una batería externa, y moneda local o una tarjeta que funcione para coger un taxi de vuelta si lo necesitas.",
        ],
        bullets: [],
      },
      {
        heading: "Dinero y logística",
        paragraphs: [
          "Viajar solo puede salir más caro por persona, porque no compartes habitación ni taxi. Las habitaciones individuales en pensiones, las privadas en albergues y los apartamentos reservados para estancias largas ayudan, igual que elegir destinos donde tu presupuesto rinda más. Nuestra guía sobre [cómo planificar un viaje barato](/es/blog/como-planificar-un-viaje-barato) tiene más ideas.",
          "Reparte el dinero en más de una tarjeta y guarda algo de efectivo aparte. Apunta el teléfono de emergencias de tu banco por si pierdes una tarjeta, y comprueba antes si tu banco cobra comisiones en el extranjero.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Es seguro viajar solo?",
        answer:
          "La mayoría de los viajes en solitario transcurren sin problemas. Consulta las recomendaciones oficiales, elige un alojamiento céntrico, comparte tus planes con alguien en casa y fíate de tu instinto. Estos hábitos reducen el riesgo vayas donde vayas.",
      },
      {
        question: "¿Cómo conocer gente cuando viajas solo?",
        answer:
          "Los free tours, las clases, las excursiones de un día y las zonas comunes de albergues y pensiones son formas fáciles de conocer a otros viajeros. No hay ninguna presión para participar, así que tú decides cuánto quieres socializar.",
      },
      {
        question: "¿Adónde ir en mi primer viaje solo?",
        answer:
          "A un sitio fácil de recorrer, con buen transporte público, muchos visitantes y un idioma que manejes. Una escapada urbana corta es un primer paso cómodo antes de lanzarte a viajes más largos en solitario.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "seguro-de-viaje-que-cubre",
        "documentos-para-viajar",
        "ejemplo-de-itinerario-de-viaje",
        "como-planificar-un-viaje-barato",
      ],
    },
    sources: [
      SOURCES.esTravelAdvice,
      SOURCES.esTravellerRegistry,
      SOURCES.esTravelHealth,
    ],
  },
];
