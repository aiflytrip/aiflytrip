import { type DestinationSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type DestinationInput = z.input<typeof DestinationSchema>;

export const italia: DestinationInput = {
  kind: "country",
  locale: "es",
  translationOf: "italy",
  slug: "italia",
  name: "Italia",
  status: "published",
  lastReviewed: "2026-11-08",
  title: "Guía para viajar a Italia: regiones, cuándo ir y rutas",
  description:
    "Planifica tu viaje a Italia: la mejor época para ir, cuántos días necesitas, la ruta clásica entre Roma, Florencia y Venecia, el tren y consejos prácticos.",
  headline: "Planificar un viaje a Italia",
  intro:
    "Es fácil enamorarse de Italia y también es fácil planificar de más. Esta guía te ayuda a elegir una ruta realista, decidir cuánto tiempo pasar en cada lugar y moverte con eficacia entre ciudades, para que te quede tiempo de disfrutar de la comida, el arte y el ritmo pausado que hacen especial a Italia.",
  overview: [
    "Un primer viaje clásico une Roma, Florencia y Venecia, conectadas por trenes rápidos. Fuera de ese triángulo, Italia ofrece experiencias muy distintas: los pueblos en lo alto de colinas y el campo de la Toscana y la Umbría, la costa espectacular de Amalfi y de Cinque Terre, los lagos del norte, los Dolomitas para los paisajes de montaña y las islas de Sicilia y Cerdeña.",
    "Cada región tiene sus propias tradiciones gastronómicas, así que moverse entre ellas también cambia lo que comes. Organizar la ruta en torno a dos o tres bases, con excursiones desde cada una, suele funcionar mejor que cambiar de alojamiento cada noche.",
    "Muchas de las mejores experiencias en Italia no se planifican: una passeggiata al atardecer, una comida larga o una iglesia pequeña con la que te cruzas por casualidad. Dejar huecos en el plan forma parte de planificar bien aquí.",
  ],
  bestTime: {
    summary:
      "De abril a junio y de septiembre a octubre suelen ser los meses más cómodos para hacer turismo. El verano es caluroso y concurrido en las ciudades y en la costa, y el invierno es más tranquilo, con días más cortos.",
    seasons: [
      {
        name: "Primavera",
        months: "De abril a junio",
        notes:
          "Temperaturas agradables para caminar y recorrer ciudades, con el campo en flor. La Semana Santa puede estar muy concurrida, sobre todo en Roma.",
      },
      {
        name: "Verano",
        months: "Julio y agosto",
        notes:
          "Calor en las ciudades y temporada alta en la costa y las islas. En torno al festivo de mediados de agosto, muchos italianos viajan y algunos negocios de las ciudades cierran.",
      },
      {
        name: "Otoño",
        months: "Septiembre y octubre",
        notes:
          "Días cálidos a principios de otoño, vendimia en las regiones vinícolas y menos gente que en pleno verano.",
      },
      {
        name: "Invierno",
        months: "De noviembre a marzo",
        notes:
          "Ciudades más tranquilas y menos demanda fuera de las fiestas, además de esquí en los Alpes y los Dolomitas.",
      },
    ],
  },
  tripLength: {
    summary:
      "Diez días es una duración cómoda para un primer viaje por Roma, Florencia y Venecia; con una semana funciona si te centras en dos ciudades.",
    options: [
      {
        days: "5–7 días",
        description:
          "Dos bases, como Roma y Florencia, con una excursión de un día desde cada una.",
      },
      {
        days: "10 días",
        description:
          "Roma, Florencia y Venecia a un ritmo tranquilo, unidas por tren de alta velocidad.",
      },
      {
        days: "14 días",
        description:
          "El triángulo clásico más una región costera o rural, como la costa de Amalfi, Cinque Terre o el campo de la Toscana.",
      },
    ],
  },
  highlights: [
    {
      name: "Roma",
      description:
        "Ruinas antiguas, el Vaticano, plazas barrocas y parte de la comida más querida de Italia.",
    },
    {
      name: "Florencia",
      description:
        "El corazón del Renacimiento, con galerías mundialmente famosas y un centro compacto que se recorre a pie.",
    },
    {
      name: "Venecia",
      description:
        "Una ciudad de canales e islas que se disfruta mejor pasando al menos una noche, para verla sin las horas punta de visitantes de un día.",
    },
    {
      name: "Toscana y Umbría",
      description:
        "Pueblos en lo alto de colinas, viñedos y campo, ideales para viajar sin prisa y con coche.",
    },
    {
      name: "Costa de Amalfi y Cinque Terre",
      description:
        "Dos tramos de costa famosos, con pueblos de colores y caminos para recorrer a pie.",
    },
    {
      name: "Los lagos italianos",
      description:
        "El lago de Como, el de Garda y el Maggiore, con villas, jardines y vistas a las montañas.",
    },
    {
      name: "Sicilia",
      description:
        "Una isla con templos griegos, ciudades barrocas, el Etna y una cocina muy propia.",
    },
  ],
  gettingAround: [
    "Los trenes de alta velocidad unen las grandes ciudades, como Roma, Florencia, Bolonia, Venecia, Milán y Nápoles, así que un viaje por varias ciudades es práctico sin coche. Consulta los horarios y las tarifas vigentes con las compañías ferroviarias.",
    "Los trenes regionales llegan a localidades más pequeñas. Los billetes regionales en papel normalmente hay que validarlos antes de subir, así que revisa las instrucciones del billete.",
    "El coche es útil en zonas rurales como la Toscana, pero muchos cascos históricos tienen zonas de tráfico limitado (ZTL) donde entrar sin permiso puede acarrear multas.",
  ],
  planning: [
    {
      topic: "Requisitos de entrada",
      detail:
        "Italia forma parte del espacio Schengen. Los visados y los nuevos sistemas fronterizos de la UE dependen de tu nacionalidad, así que consulta las fuentes oficiales de la UE y de tu gobierno que aparecen abajo antes de reservar.",
    },
    {
      topic: "Dinero",
      detail:
        "En Italia se usa el euro. Las tarjetas se aceptan casi siempre en las ciudades, aunque llevar algo de efectivo es útil para compras pequeñas y en zonas rurales.",
    },
    {
      topic: "Normas de vestimenta",
      detail:
        "Muchas iglesias, incluidas las grandes basílicas, piden llevar hombros y rodillas cubiertos. Llevar una prenda ligera encima facilita las visitas improvisadas.",
    },
    {
      topic: "Reservar con antelación",
      detail:
        "Los museos y lugares más visitados, como las grandes galerías y los yacimientos arqueológicos, suelen usar entradas con hora. Reservar las visitas que más te importan evita largas esperas.",
    },
  ],
  tips: [
    "Elige dos o tres bases y usa el tren para las excursiones en lugar de cambiar de alojamiento cada noche.",
    "Deja las visitas principales para la mañana y mantén las tardes flexibles, sobre todo con el calor del verano.",
    "Come donde comen los locales: las cartas escritas solo en italiano, lejos de las plazas más concurridas, suelen ser buena señal.",
    "Deja margen en los días de viaje; cruzar el centro de una ciudad con maletas puede llevar su tiempo.",
  ],
  faqs: [
    {
      question: "¿Cuántos días se necesitan para ver Italia?",
      answer:
        "Unos diez días es lo ideal para un primer viaje por Roma, Florencia y Venecia sin prisas. Con una semana, céntrate en dos ciudades. Con dos semanas, añade una región costera o rural, como la costa de Amalfi o la Toscana.",
    },
    {
      question: "¿Cuál es la mejor época del año para viajar a Italia?",
      answer:
        "El final de la primavera (de abril a junio) y el principio del otoño (septiembre y octubre) suelen ofrecer buen tiempo con menos gente que en verano. Julio y agosto son calurosos y concurridos, sobre todo en la costa, y el invierno es más tranquilo y bueno para las ciudades.",
    },
    {
      question: "¿Es mejor recorrer Italia en tren o en coche?",
      answer:
        "Entre las grandes ciudades suele ser mejor el tren, porque los servicios de alta velocidad son frecuentes y llegan al centro. El coche es mejor para explorar zonas rurales y pueblos pequeños, pero evita entrar en las zonas de tráfico limitado de los cascos históricos.",
    },
    {
      question: "¿Necesito visado para viajar a Italia?",
      answer:
        "Depende de tu nacionalidad y del motivo y la duración de tu estancia. Italia aplica las normas del espacio Schengen y la UE está implantando nuevos sistemas fronterizos, así que consulta la web oficial de la UE y las recomendaciones de viaje de tu gobierno antes de reservar.",
    },
  ],
  airports: ["FCO"],
  related: {
    destinations: [
      "/es/destinos/italia/roma",
      "/es/destinos/francia",
      "/es/destinos/portugal",
    ],
    itineraries: ["rome-3-days"],
    guides: [
      "como-planificar-un-viaje",
      "cuantos-dias-de-viaje",
      "documentos-para-viajar",
      "como-encontrar-vuelos-baratos",
      "trucos-para-encontrar-vuelos-baratos",
    ],
  },
  sources: [
    SOURCES.italyEs,
    SOURCES.trenitaliaEs,
    SOURCES.euEntry,
    SOURCES.esTravelAdvice,
  ],
};

export const roma: DestinationInput = {
  kind: "city",
  locale: "es",
  translationOf: "rome",
  slug: "roma",
  country: "italia",
  name: "Roma",
  status: "published",
  lastReviewed: "2026-11-08",
  title: "Guía para viajar a Roma: qué ver, zonas y cuándo ir",
  description:
    "Planifica tu viaje a Roma: cuántos días quedarte, cuándo ir, cómo agrupar el Coliseo, el Vaticano y el centro histórico, cómo moverte y consejos.",
  headline: "Planificar un viaje a Roma",
  intro:
    "Roma superpone ruinas antiguas, arte renacentista y plazas barrocas dentro de un centro histórico que se recorre a pie. Un buen plan agrupa las visitas por zonas, reserva con antelación las más concurridas y deja tiempo para las comidas largas y los paseos al atardecer que forman parte de la vida romana.",
  overview: [
    "La mayoría de los visitantes divide Roma en unas pocas zonas. La Roma antigua abarca el Coliseo, el Foro Romano y el monte Palatino. El centro histórico incluye el Panteón, la Piazza Navona y la Fontana di Trevi, todos a poca distancia a pie unos de otros. Al otro lado del río, la Ciudad del Vaticano reúne la basílica de San Pedro y los Museos Vaticanos, y el Trastévere es un barrio de calles estrechas conocido por sus restaurantes y su ambiente nocturno.",
    "La Ciudad del Vaticano es un Estado independiente dentro de Roma. Visitar la basílica de San Pedro y los Museos Vaticanos ocupa buena parte de muchos itinerarios y suele llevar casi todo un día si quieres hacer las dos cosas con calma.",
    "Roma también es una buena base para excursiones, como el antiguo puerto de Ostia Antica, las villas de Tívoli o el pueblo de Orvieto, en lo alto de una colina, que hacen que una estancia larga resulte variada.",
  ],
  bestTime: {
    summary:
      "La primavera y el otoño son las estaciones más cómodas para caminar entre monumentos. El verano puede ser muy caluroso, y la Semana Santa y los grandes acontecimientos religiosos atraen a mucha gente.",
    seasons: [
      {
        name: "Primavera",
        months: "De marzo a mayo",
        notes:
          "Clima suave y jardines en flor, aunque la Semana Santa es una de las épocas más concurridas del año.",
      },
      {
        name: "Verano",
        months: "De junio a agosto",
        notes:
          "Días calurosos y máxima afluencia; deja las visitas al aire libre para primera hora de la mañana o para la tarde-noche.",
      },
      {
        name: "Otoño",
        months: "De septiembre a noviembre",
        notes:
          "Días cálidos a principios de otoño, con menos gente a medida que avanza la estación.",
      },
      {
        name: "Invierno",
        months: "De diciembre a febrero",
        notes:
          "Más fresco y tranquilo fuera de las fiestas, una buena época para museos e iglesias.",
      },
    ],
  },
  tripLength: {
    summary:
      "Con tres días ves las zonas principales a un ritmo razonable; con cuatro o más puedes añadir una excursión y más tiempo en los barrios.",
    options: [
      {
        days: "2 días",
        description:
          "Un día para la Roma antigua y el centro histórico, y otro para el Vaticano.",
      },
      {
        days: "3 días",
        description:
          "Las zonas principales, más tiempo para el Trastévere, un museo como la Galería Borghese y comidas largas.",
      },
      {
        days: "4–5 días",
        description:
          "Añade una excursión, por ejemplo a Tívoli o a Ostia Antica, y explora barrios más tranquilos.",
      },
    ],
  },
  highlights: [
    {
      name: "Coliseo, Foro Romano y monte Palatino",
      description:
        "El centro de la Roma antigua; visítalos juntos y reserva casi toda una mañana.",
    },
    {
      name: "Museos Vaticanos y Capilla Sixtina",
      description:
        "Las enormes colecciones papales, que terminan en la Capilla Sixtina; se recomienda mucho reservar con antelación.",
    },
    {
      name: "Basílica de San Pedro",
      description:
        "Una de las iglesias más grandes del mundo, con normas de vestimenta que exigen hombros y rodillas cubiertos.",
    },
    {
      name: "Panteón",
      description:
        "Un templo antiguo asombrosamente bien conservado, convertido después en iglesia, en pleno centro histórico.",
    },
    {
      name: "Piazza Navona y Fontana di Trevi",
      description:
        "Plazas y fuentes barrocas que lucen especialmente a primera hora de la mañana o de noche.",
    },
    {
      name: "Galería Borghese",
      description:
        "Una célebre colección de escultura y pintura en una villa dentro de un parque; la visita es con reserva.",
    },
    {
      name: "Trastévere",
      description:
        "Un barrio con mucho carácter al otro lado del Tíber, especialmente animado por la noche.",
    },
  ],
  gettingAround: [
    "El centro histórico se recorre mejor a pie; muchos de los lugares principales están a pocos minutos andando unos de otros.",
    "El metro de Roma tiene pocas líneas y no llega a todas las zonas del centro, así que autobuses y tranvías cubren los huecos. Consulta las rutas y los billetes vigentes en la información oficial de transporte antes de viajar.",
    "Toma los taxis en las paradas oficiales o resérvalos a través de servicios reconocidos. Deja tiempo de más por el tráfico, sobre todo en hora punta.",
  ],
  planning: [
    {
      topic: "Entradas con hora",
      detail:
        "La zona del Coliseo, los Museos Vaticanos y la Galería Borghese usan entradas con hora o reserva. Reservarlas primero te permite organizar el resto de cada día en torno a ellas.",
    },
    {
      topic: "Normas de vestimenta",
      detail:
        "La basílica de San Pedro y muchas iglesias exigen hombros y rodillas cubiertos. Lleva un pañuelo o una prenda ligera para que no te impidan la entrada.",
    },
    {
      topic: "Calor",
      detail:
        "En verano, deja las visitas al aire libre para primera hora, descansa a mediodía y vuelve a salir por la tarde, cuando la ciudad cobra vida.",
    },
    {
      topic: "Seguridad",
      detail:
        "Roma es en general segura para el visitante, pero los carteristas abundan en torno a los grandes monumentos y en el transporte lleno. Consulta las recomendaciones de viaje de tu gobierno para tener información actualizada.",
    },
  ],
  tips: [
    "Visita la Fontana di Trevi a primera hora de la mañana o tarde por la noche para evitar las peores aglomeraciones.",
    "Rellena la botella de agua en las fuentes públicas que hay repartidas por toda la ciudad.",
    "Reserva una noche libre para el Trastévere o Monti, donde muchos romanos salen a cenar.",
    "Consulta en las webs oficiales los días de apertura de cada lugar antes de cerrar tu plan.",
  ],
  faqs: [
    {
      question: "¿Cuántos días se necesitan para ver Roma?",
      answer:
        "Tres días es una buena duración para una primera visita. Permite dedicar un día a la Roma antigua y el centro histórico, otro al Vaticano y un tercero a barrios como el Trastévere y a un museo como la Galería Borghese. Añade un día para ir a Tívoli o a Ostia Antica.",
    },
    {
      question: "¿Se pueden ver el Coliseo y el Vaticano en un día?",
      answer:
        "Es posible, pero con prisas, porque los dos son lugares grandes con entrada por horas y solo los Museos Vaticanos pueden llevar varias horas. La mayoría de los viajeros los disfruta mucho más en días distintos, combinando el Coliseo con el Foro y el monte Palatino.",
    },
    {
      question: "¿Cómo hay que vestir para visitar el Vaticano?",
      answer:
        "La basílica de San Pedro y los Museos Vaticanos piden ropa recatada, lo que normalmente significa llevar hombros y rodillas cubiertos. Un pañuelo o una prenda ligera te permite cumplir la norma con facilidad incluso en los días de calor.",
    },
    {
      question: "¿Roma se puede recorrer a pie?",
      answer:
        "Sí. El centro histórico se recorre muy bien a pie y muchos de los grandes monumentos están a poca distancia unos de otros. El calzado cómodo es imprescindible por los adoquines, y los autobuses, los tranvías o el metro ayudan en los trayectos largos.",
    },
  ],
  airports: ["FCO"],
  related: {
    destinations: [
      "/es/destinos/italia",
      "/es/destinos/francia/paris",
      "/es/destinos/portugal/lisboa",
    ],
    itineraries: ["rome-3-days"],
    guides: [
      "del-aeropuerto-al-centro-paris-roma-tokio-lisboa",
      "como-planificar-un-viaje",
      "cuantos-dias-de-viaje",
      "ejemplo-de-itinerario-de-viaje",
      "como-encontrar-vuelos-baratos",
    ],
  },
  sources: [SOURCES.romeEs, SOURCES.italyEs, SOURCES.esTravelAdvice],
};
