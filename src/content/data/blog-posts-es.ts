import { type GuideSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type PostInput = z.input<typeof GuideSchema>;

/**
 * Spanish edition of the blog, served under /es/blog. Each post is written
 * for Spanish-speaking readers rather than translated line by line, and
 * names the English post it corresponds to (translationOf) so both pages
 * carry hreflang alternates. Related guides must be Spanish posts.
 */
export const spanishPosts: PostInput[] = [
  {
    slug: "como-fijan-las-aerolineas-el-precio-de-los-vuelos",
    locale: "es",
    translationOf: "how-airline-pricing-works",
    photo: "cheap-flights",
    category: "flights",
    status: "published",
    lastReviewed: "2026-10-21",
    title: "Cómo fijan las aerolíneas el precio de los vuelos",
    description:
      "Cómo ponen precio las aerolíneas a los billetes: clases tarifarias, demanda, competencia y antelación, y por qué el mismo asiento cuesta distinto.",
    headline:
      "Cómo funcionan los precios de los vuelos y por qué cambian tanto",
    intro:
      "Las aerolíneas ponen precio a sus billetes dividiendo cada cabina en clases tarifarias, cada una con su propio precio, sus propias condiciones y un número limitado de asientos. Después, un sistema de gestión de ingresos abre y cierra esas clases según la demanda, la competencia, el tiempo que falta para el vuelo y los asientos que quedan. Por eso dos personas en el mismo avión suelen pagar cantidades muy distintas, y una tarifa que viste por la mañana puede haber desaparecido por la tarde. Esta guía explica la estructura de precios de las aerolíneas con palabras sencillas y cómo aprovecharla al reservar.",
    sections: [
      {
        heading: "La estructura de tarifas: una cabina, muchos precios",
        paragraphs: [
          "Una aerolínea no fija un único precio para la clase turista de un vuelo. Reparte los asientos en grupos, llamados clases tarifarias o «buckets», y cada grupo tiene su precio y sus reglas. El grupo más barato puede no permitir cambios ni incluir maleta facturada, mientras que otro más caro en la misma cabina se puede cambiar o reembolsar.",
          "Cada grupo tiene un número limitado de asientos a la venta. Cuando se agota el más barato, el siguiente pasa a ser el precio más bajo disponible, así que la tarifa sube de golpe aunque el vuelo no haya cambiado en nada. Esa es la razón principal de que los precios salten en lugar de subir poco a poco.",
          "Cada clase tarifaria tiene un código de una letra que a menudo aparece en la reserva o en el billete electrónico. Las letras no son iguales en todas las aerolíneas, pero muchas siguen un patrón parecido:",
        ],
        bullets: [
          "Primera clase: a menudo F o A",
          "Business: a menudo J, C, D o I, con las tarifas flexibles en lo más alto",
          "Turista premium: a menudo W o P",
          "Turista con tarifa completa: normalmente Y, la más flexible y la más cara de la cabina turista",
          "Turista con descuento: letras como B, M, H, K, L, Q, V o T, con menos derechos de cambio o reembolso cuanto más barata es",
          "Tarifa básica o ligera: los asientos más baratos, a menudo sin maleta facturada, sin elegir asiento y sin cambios",
        ],
      },
      {
        heading:
          "Cómo fijan los precios las aerolíneas: demanda y gestión de ingresos",
        paragraphs: [
          "Las aerolíneas calculan cuánto se llenará cada vuelo a partir de cómo se vendieron vuelos anteriores en esa ruta y de cómo van las reservas esta vez. Este proceso se llama gestión de ingresos (revenue management) y lo actualiza un software constantemente. Si un vuelo se llena más rápido de lo previsto, se ofrecen menos asientos a precios bajos. Si se vende despacio, pueden volver a abrirse plazas más baratas, y por eso las tarifas a veces también bajan.",
          "La demanda sigue patrones que se pueden prever. Las vacaciones escolares, los puentes, los grandes eventos y los días más populares de la semana encarecen los vuelos. Los vuelos a primera hora, a última hora y entre semana suelen tener menos demanda y, por tanto, suelen ser más baratos.",
        ],
        bullets: [],
      },
      {
        heading: "La competencia y la propia ruta",
        paragraphs: [
          "La misma distancia puede costar cantidades muy distintas en rutas diferentes. Donde compiten varias aerolíneas, sobre todo si una es de bajo coste, las tarifas tienden a ser más bajas. Donde una sola aerolínea opera la ruta, tiene menos motivos para hacer descuentos.",
          "Por eso un viaje con escala a veces es más barato que el vuelo directo, aunque use dos aviones. La aerolínea con escala compite por tu reserva con el vuelo directo, y el precio es su forma de ganar. Comparar aeropuertos cercanos funciona por la misma razón.",
        ],
        bullets: [],
      },
      {
        heading: "La antelación: reservar pronto o reservar tarde",
        paragraphs: [
          "Como norma general, los grupos de asientos más baratos se venden primero, y quien reserva cerca de la salida suele viajar por trabajo o por una urgencia y está dispuesto a pagar más. Por eso las tarifas suelen subir en las últimas semanas antes del vuelo.",
          "Reservar con muchísima antelación tampoco garantiza el mejor precio, porque las aerolíneas pueden no abrir sus tarifas más bajas hasta ver cómo se vende el vuelo. No existe un día ni un número de semanas que funcione para todas las rutas, y cualquier cifra que leas es, como mucho, una media. Es más fiable empezar a mirar precios pronto, activar una alerta y reservar cuando la tarifa sea buena para tus fechas en lugar de esperar una perfecta.",
        ],
        bullets: [],
      },
      {
        heading: "De qué se compone el precio final",
        paragraphs: [
          "Lo que pagas es la tarifa de la aerolínea más los impuestos, las tasas aeroportuarias y los recargos que añada la compañía. Los impuestos y las tasas dependen de los aeropuertos y países del viaje, así que dos billetes que parecen similares pueden estar construidos de forma muy distinta.",
          "En la Unión Europea, el Reglamento 1008/2008 obliga a mostrar desde el principio el precio final con todos los impuestos, tasas y cargos inevitables, y los suplementos opcionales solo se añaden si tú los eliges. Aun así, las maletas y los asientos van aparte, así que compara siempre el total con lo que realmente vas a llevar.",
        ],
        bullets: [],
      },
      {
        heading: "Por qué cambia el precio mientras buscas",
        paragraphs: [
          "Si una tarifa cambia entre dos búsquedas, o entre la página de resultados y la de pago, casi siempre hay una explicación sencilla.",
          "Mucha gente cree que las aerolíneas suben el precio porque ya has buscado antes. Hay pocas pruebas de ello, y los motivos de abajo explican la mayoría de los casos. Si quieres descartarlo, compara en una ventana privada del navegador, que no cuesta nada.",
        ],
        bullets: [
          "Se vendió a otra persona el último asiento de un grupo barato",
          "Un comparador mostraba un precio guardado que ya estaba desactualizado",
          "Buscaste para varios pasajeros: si solo queda un asiento barato, a todos se les cotiza el precio más alto, así que prueba a buscar para una sola persona y compara",
          "El precio se mostraba en otra moneda y cambió el tipo de cambio",
          "Una web de reservas añadió su propio cargo en el paso de pago",
        ],
      },
      {
        heading: "Qué significa todo esto al reservar",
        paragraphs: [
          "Como el precio depende de la demanda y de las reglas de cada tarifa, lo que más puedes cambiar son las fechas, los aeropuertos y el tipo de tarifa. Mira varios días antes y después de tus fechas preferidas, compara el total con las maletas que necesitas y lee las condiciones de cambio y reembolso antes de pagar la opción más barata.",
          "Cuando tengas una tarifa en mente, añádela a nuestra [calculadora de presupuesto de viaje](/es/herramientas/calculadora-presupuesto-viaje) junto con el alojamiento y el gasto diario para ver el coste total, o deja que el [planificador de viajes con IA](/es/planificar) prepare un plan con opciones de vuelo y una estimación de presupuesto para tus fechas.",
        ],
        bullets: [
          "Sé flexible con fechas y horarios antes que con cualquier otra cosa",
          "Compara el precio total, con maletas y asientos incluidos",
          "Lee las condiciones de la tarifa, no solo el precio",
          "Activa una alerta de precio en lugar de buscar una y otra vez",
          "Reserva cuando el precio sea bueno para tus fechas",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cómo fijan las aerolíneas el precio de los billetes?",
        answer:
          "Dividen cada cabina en clases tarifarias con precios y reglas distintas y usan un software de gestión de ingresos para decidir cuántos asientos vender en cada una. La demanda, la competencia en la ruta, los días que faltan para el vuelo y los asientos libres mueven el precio que ves.",
      },
      {
        question: "¿Qué es la estructura de tarifas de una aerolínea?",
        answer:
          "Es el conjunto de clases tarifarias que una aerolínea vende en un vuelo, cada una identificada con una letra. Las clases altas cuestan más y permiten cambios o reembolsos, mientras que las más baratas tienen las condiciones más estrictas y menos asientos.",
      },
      {
        question:
          "¿Por qué ha subido el precio de mi vuelo de un día para otro?",
        answer:
          "Lo más habitual es que se agotara el grupo de asientos más barato y el siguiente, más caro, pasara a ser el precio más bajo a la venta. Las previsiones de demanda también se actualizan a menudo y pueden reducir los asientos que se ofrecen a precios bajos.",
      },
      {
        question: "¿Suben los precios de los vuelos cuanto más buscas?",
        answer:
          "Hay pocas pruebas de que las aerolíneas suban las tarifas porque hayas buscado antes. Los cambios suelen deberse a que se venden los asientos baratos o a que un comparador mostraba un precio antiguo. Comparar en una ventana privada es una forma sencilla de comprobarlo.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "ejemplo-de-itinerario-de-viaje",
        "ejemplo-de-itinerario-de-vuelo",
      ],
    },
    sources: [SOURCES.eu1008Es, SOURCES.euAirRightsEs, SOURCES.aesaPassengers],
  },
  {
    slug: "ejemplo-de-itinerario-de-viaje",
    locale: "es",
    translationOf: "how-to-build-a-travel-itinerary",
    photo: "itinerary",
    category: "itineraries",
    status: "published",
    lastReviewed: "2026-10-21",
    title: "Ejemplo de itinerario de viaje y plantilla gratis",
    description:
      "Mira un ejemplo completo de itinerario de viaje de 3 días, copia nuestra plantilla gratis día a día y aprende a hacer el tuyo paso a paso.",
    headline: "Ejemplo de itinerario de viaje y plantilla: cómo hacer el tuyo",
    intro:
      "Aquí tienes un ejemplo completo de itinerario de viaje de tres días, seguido de una plantilla gratis que puedes copiar y de los pasos que usamos para crearlo. Un buen itinerario no consiste en meterlo todo, sino en que cada día funcione: tiempos de desplazamiento realistas, un orden lógico y margen para respirar.",
    sections: [
      {
        heading: "Ejemplo de itinerario de viaje: 3 días en Lisboa",
        paragraphs: [
          "Este ejemplo de itinerario es para una escapada de tres días con llegada por la mañana y salida por la tarde. Tiene dos «anclas», el castillo y una excursión a Sintra, y cada día se queda en una o dos zonas. Copia su estructura, no sus horas exactas, y comprueba los días de apertura y las condiciones de las entradas en las webs oficiales antes de cerrar el tuyo.",
        ],
        bullets: [
          "Día 1, llegada: aterrizas por la mañana y dejas las maletas en un hotel de la Baixa. Tarde: paseo tranquilo por las calles llanas de la Baixa hasta la plaza junto al río y subida al Chiado. Noche: cena en el Chiado o en el Bairro Alto. Desplazamientos: a pie",
          "Día 2, castillo y Alfama: mañana en el castillo, llegando a la hora de apertura con la entrada comprada. Tarde: callejuelas y miradores de Alfama, con una comida tardía cerca. Noche: cena en Alfama con mesa reservada. Desplazamientos: tranvía o autobús cuesta arriba y bajada a pie. Plan B: un museo cubierto si llueve",
          "Día 3, excursión a Sintra: tren por la mañana desde la estación del Rossio y visita a un palacio con entrada de horario fijo. Tarde: un segundo palacio o los jardines y tren de vuelta. Noche: cena tranquila cerca del hotel. Plan B: deja Sintra para un día seco e intercámbialo con el día dos",
          "Salida: si el vuelo es lo bastante tarde, pasa la mañana en Belém, al oeste junto al río, y luego recoge las maletas con tiempo de sobra para ir al aeropuerto",
        ],
      },
      {
        heading: "Plantilla de itinerario de viaje gratis",
        paragraphs: [
          "No necesitas ningún programa especial para hacer un itinerario. Sirve una aplicación de notas, una hoja de cálculo o un papel, siempre que cada día siga el mismo esquema sencillo. Copia el esquema de abajo una vez por cada día del viaje y rellénalo siguiendo los pasos de más abajo.",
          "Rellena primero lo que es fijo, como los vuelos, la hora de entrada al alojamiento y las entradas con horario, y después añade los planes flexibles alrededor. Sé breve: una o dos líneas por cada parte del día bastan para seguirlo sobre la marcha.",
        ],
        bullets: [
          "Día y fecha, y dónde duermes esa noche",
          "Zona del día: el barrio o los dos barrios en los que vas a estar",
          "Mañana: actividad principal, con horario de apertura y localizador si lo hay",
          "Tarde: segunda actividad o un bloque libre",
          "Noche: zona para cenar y lo que tengas reservado",
          "Desplazamientos: cómo te moverás entre sitios y cuánto tardarás más o menos",
          "Plan B para mal tiempo o un cierre inesperado",
          "Notas: entradas que mostrar, días de cierre, cosas que comprobar",
        ],
      },
      {
        heading: "Muestra de itinerario: un día rellenado",
        paragraphs: [
          "Así queda la plantilla rellenada con el día dos del ejemplo de Lisboa, para que veas cuánto detalle es suficiente. Las horas son orientativas, no un horario que seguir.",
        ],
        bullets: [
          "Día 2, sábado: duermo en la Baixa, en el mismo hotel que anoche",
          "Zona del día: la colina del castillo y Alfama",
          "Mañana: el castillo, llegando pronto antes de que se llene; entrada guardada en el móvil",
          "Tarde: callejuelas y miradores de Alfama, con comida tardía cerca; nada reservado",
          "Noche: cena en Alfama, mesa reservada a las 20:00; vuelta a pie cuesta abajo",
          "Desplazamientos: a pie desde el hotel, contando media hora de subida, o tranvía o autobús",
          "Plan B: cambiar los miradores por un museo cubierto si llueve",
          "Notas: comprobar los días de apertura del castillo; llevar calzado cómodo para calles empinadas y empedradas",
        ],
      },
      {
        heading: "Cómo hacer un itinerario de viaje paso a paso",
        paragraphs: [
          "El ejemplo de arriba sale de un método sencillo que puedes usar en cualquier viaje. El castillo está sobre Alfama, así que el día dos se convirtió en un día de Alfama. Sintra necesita casi una jornada entera, así que se quedó el día tres para ella sola. Las calles llanas de la Baixa y el Chiado encajan con una tarde de llegada en la que estás cansado, y Belém cabe en una última mañana. Estos son los pasos.",
        ],
        bullets: [],
      },
      {
        heading: "1. Empieza por unas pocas anclas",
        paragraphs: [
          "Elige las pocas cosas que harían que el viaje mereciera la pena: un museo que siempre has querido ver, un barrio concreto, una excursión, una comida especial. Son tus anclas, y todo lo demás se organiza a su alrededor.",
          "Mantén la lista corta: dos o tres anclas para una escapada corta, y como mucho una al día en un viaje largo. Si aún no sabes cuántos días dedicar a cada sitio, nuestra herramienta gratuita [¿cuántos días necesito?](/es/herramientas/cuantos-dias) te sugiere una duración y los días de cada parada.",
        ],
        bullets: [],
      },
      {
        heading: "2. Agrupa cada día por zonas",
        paragraphs: [
          "El error más común es cruzar la ciudad de un lado a otro varias veces al día. Pon en el mismo día los sitios que están cerca entre sí y dedica cada jornada a uno o dos barrios. Pasarás más tiempo viendo cosas y menos en el transporte.",
          "Marca tus anclas y lo imprescindible en un mapa y dibuja círculos alrededor de los grupos. Cada círculo será un día o medio día.",
        ],
        bullets: [],
      },
      {
        heading: "3. Calcula los desplazamientos con sinceridad",
        paragraphs: [
          "Los trayectos casi siempre duran más de lo que dice el mapa cuando sumas el camino hasta la estación, las esperas, encontrar la entrada y algún giro equivocado. Añade margen a cada desplazamiento, sobre todo en una ciudad que no conoces.",
          "Para excursiones y cambios de ciudad, consulta horarios reales y cuenta el tiempo para llegar y salir de las estaciones. Un tren de dos horas puede convertirse fácilmente en media jornada de puerta a puerta, así que deja los grandes traslados para la mañana.",
        ],
        bullets: [],
      },
      {
        heading: "4. Deja márgenes, reservas y días de llegada tranquilos",
        paragraphs: [
          "Deja huecos a propósito. Una tarde libre te da sitio para lo que descubras por el camino, absorbe retrasos y evita que el viaje parezca una lista de tareas. Una buena regla es una actividad principal por la mañana y otra por la tarde, con la noche más ligera.",
          "Antes de fijar el orden de los días, comprueba los días y horarios de apertura de tus anclas en sus webs oficiales y reserva primero lo que se agota. Tus horarios de vuelo marcan el primer y el último día: con una llegada temprana, planea algo fácil cerca del alojamiento. Nuestro [ejemplo de itinerario de vuelo](/es/blog/ejemplo-de-itinerario-de-vuelo) explica cómo leer bien esas horas. Si prefieres partir de un borrador, el [planificador de viajes con IA](/es/planificar) crea un itinerario día a día en este formato que luego puedes ajustar.",
        ],
        bullets: [
          "Dos o tres anclas, no una lista larga",
          "Una o dos zonas por día",
          "Desplazamientos realistas y con margen",
          "Un bloque libre cada día o cada dos días",
          "Primero las reservas, después los planes flexibles",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cómo es un buen ejemplo de itinerario de viaje?",
        answer:
          "Un buen ejemplo da a cada día una zona o un tema, un plan para la mañana, la tarde y la noche, cómo te moverás y un plan B. Tiene una o dos actividades principales al día y deja tiempo para los trayectos, como el ejemplo de tres días en Lisboa de esta guía.",
      },
      {
        question: "¿Qué debe incluir un itinerario de viaje?",
        answer:
          "Como mínimo, las fechas, dónde duermes cada noche, el plan de cada mañana, tarde y noche, cómo te desplazarás entre sitios y las reservas con sus horarios. Un plan B para el mal tiempo y una lista corta de cosas que comprobar lo hacen más fácil de ajustar sobre la marcha.",
      },
      {
        question: "¿Cuántas cosas debo planear por día?",
        answer:
          "Para la mayoría de viajeros, una actividad principal por la mañana y otra por la tarde, con una noche tranquila, es un ritmo cómodo. Si viajas a un ritmo rápido puedes añadir más, pero deja algo de tiempo libre cada uno o dos días.",
      },
      {
        question: "¿Qué formato es mejor para un itinerario de viaje?",
        answer:
          "Una lista día a día es el formato más fácil de seguir. Da a cada día el mismo esquema corto: la zona, el plan de mañana, tarde y noche, los desplazamientos y las reservas con su hora. Una aplicación de notas o una hoja de cálculo funcionan muy bien.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "ejemplo-de-itinerario-de-vuelo",
        "como-fijan-las-aerolineas-el-precio-de-los-vuelos",
      ],
    },
    sources: [
      SOURCES.esTravelAdvice,
      SOURCES.euAirRightsEs,
      SOURCES.iataTravelers,
    ],
  },
  {
    slug: "ejemplo-de-itinerario-de-vuelo",
    locale: "es",
    translationOf: "what-is-a-flight-itinerary",
    photo: "itinerary",
    category: "flights",
    status: "published",
    lastReviewed: "2026-10-21",
    title: "Ejemplo de itinerario de vuelo: qué es y cómo leerlo",
    description:
      "Ejemplos de itinerario de vuelo de ida y vuelta y con escala, qué significa cada línea y en qué se diferencia del billete electrónico y la tarjeta de embarque.",
    headline: "Ejemplo de itinerario de vuelo: qué es y cómo leer cada línea",
    intro:
      "Un itinerario de vuelo es la lista de vuelos que forman tu viaje: desde dónde y hacia dónde vuelas, en qué fechas y a qué horas. Abajo tienes dos ejemplos de itinerario de vuelo, uno de ida y vuelta y otro con escala, seguidos de lo que significa cada línea. La palabra itinerario se usa además para dos cosas distintas, un plan que haces tú y un documento que te envía la aerolínea al reservar, y confundirlas causa problemas reales en el mostrador de facturación y en las solicitudes de visado.",
    sections: [
      {
        heading: "Ejemplo de itinerario de vuelo de ida y vuelta",
        paragraphs: [
          "Así son las líneas principales de un itinerario de ida y vuelta ya reservado. Todos los datos son inventados, incluido el código de la aerolínea, los números de vuelo y las horas, así que úsalo solo para reconocer la estructura del tuyo.",
        ],
        bullets: [
          "Pasajero: VIAJERA / EJEMPLO SRA",
          "Localizador: ABC123. Número de billete: trece dígitos",
          "Ida, 14 de mayo: vuelo XX 101, Madrid-Barajas (MAD) Terminal 4 a Lisboa (LIS) Terminal 1",
          "Sale a las 09:40 y llega a las 10:05, horas locales. Turista, clase K, estado confirmado",
          "Vuelta, 18 de mayo: vuelo XX 102, Lisboa (LIS) Terminal 1 a Madrid-Barajas (MAD) Terminal 4",
          "Sale a las 18:10 y llega a las 20:35, horas locales. Turista, clase K, estado confirmado",
          "Equipaje: un bulto de mano y una maleta facturada por pasajero",
          "Tarifa pagada, impuestos y tasas, y fecha de emisión",
        ],
      },
      {
        heading: "Ejemplo de itinerario de vuelo con escala",
        paragraphs: [
          "Un viaje con escala muestra cada vuelo en su propia línea, y el tiempo de conexión es el hueco entre ambos. Este ejemplo también es inventado. Fíjate en la llegada al día siguiente, en la otra aerolínea que opera el segundo vuelo y en la maleta facturada hasta el destino final.",
        ],
        bullets: [
          "Pasajero: VIAJERO / EJEMPLO SR",
          "Localizador: XYZ789. Número de billete: trece dígitos",
          "Vuelo 1, 3 de junio: vuelo XX 210, Madrid-Barajas (MAD) a Dubái (DXB). Sale a las 15:20 y llega a las 00:05 del 4 de junio, horas locales",
          "Escala en Dubái: 2 horas y 35 minutos, con un único billete",
          "Vuelo 2, 4 de junio: vuelo XX 5432, operado por YY Airways, Dubái (DXB) a Bangkok (BKK). Sale a las 02:40 y llega a las 12:05, horas locales",
          "Cabina y clase: turista, clase Q, estado confirmado en ambos vuelos",
          "Equipaje: una maleta facturada hasta Bangkok",
        ],
      },
      {
        heading: "Cómo leer cada línea",
        paragraphs: [
          "El localizador es un código corto, normalmente de seis letras y números, que encuentra tu reserva en el sistema de la aerolínea. También puede aparecer como código de reserva, número de confirmación o PNR. El número de billete es otro dato, más largo, normalmente de trece dígitos, y demuestra que el billete se ha emitido. Una reserva sin número de billete puede no estar pagada todavía.",
          "Los aeropuertos aparecen con códigos de tres letras. Revísalos bien, porque muchas ciudades grandes tienen más de un aeropuerto, y fíjate en la terminal si se indica. Las horas de salida y llegada son locales de cada aeropuerto, así que un vuelo que cruza husos horarios puede parecer más corto o más largo de lo que es.",
          "Busca la expresión «operado por». Si reservaste con una aerolínea y vuela el avión otra, normalmente facturas con la que opera el vuelo. La letra de la clase y el nombre de la tarifa indican las reglas de cambios, reembolsos y equipaje; nuestra guía sobre [cómo fijan las aerolíneas el precio de los vuelos](/es/blog/como-fijan-las-aerolineas-el-precio-de-los-vuelos) explica qué significan esas letras.",
        ],
        bullets: [],
      },
      {
        heading: "Dos significados: un plan y una reserva",
        paragraphs: [
          "Antes de reservar, un itinerario de vuelo es solo un plan. Enumera los vuelos que piensas tomar, quizá copiados de un buscador, y no hay nada reservado. Cualquiera puede escribirlo y no tiene localizador, porque no hay ninguna reserva detrás.",
          "Después de reservar, la aerolínea o la agencia te envía el itinerario de esa reserva, a menudo llamado recibo del billete electrónico. Este sí es el registro de algo real: plazas a tu nombre, un localizador y normalmente un número de billete. Cuando en el mostrador o un funcionario te piden el itinerario, se refieren casi siempre a este.",
        ],
        bullets: [],
      },
      {
        heading: "Itinerario, billete electrónico y tarjeta de embarque",
        paragraphs: [
          "Estos tres documentos se confunden con facilidad porque repiten buena parte de la información. Pero cumplen funciones distintas y los recibes en momentos diferentes.",
        ],
        bullets: [
          "Itinerario de vuelo: la lista de tus vuelos con fechas y horas. Como plan, puede existir antes de reservar nada.",
          "Billete electrónico o recibo del itinerario: llega después de pagar. Añade el localizador y el número de billete, y demuestra que la tarifa está pagada.",
          "Tarjeta de embarque: se emite al facturar, normalmente uno o dos días antes de la salida. Muestra tu asiento y la hora de embarque y es lo que te deja pasar por la puerta.",
        ],
      },
      {
        heading: "Cómo conseguir tu itinerario de vuelo",
        paragraphs: [
          "Si ya has reservado, el itinerario se envió al correo que diste, así que busca en la bandeja de entrada y en el correo no deseado el nombre de la aerolínea o de la agencia. También puedes entrar en la sección «gestionar reserva» de la web de la aerolínea con tu localizador y tu apellido y descargarlo o imprimirlo desde allí.",
          "Si aún no has reservado y solo quieres planificar, apunta los vuelos de un buscador o deja que lo haga una herramienta. Nuestro [planificador de viajes con IA](/es/planificar) prepara gratis un plan día a día con un vuelo sugerido y un itinerario de vuelo para planificar. Está claramente marcado como que no es un billete ni una reserva: no se guarda ningún asiento y no hay localizador.",
        ],
        bullets: [],
      },
      {
        heading: "Comprobaciones nada más recibirlo",
        paragraphs: [
          "Los errores son más fáciles y baratos de corregir justo después de reservar, así que lee el itinerario el mismo día que lo recibes y no la noche antes de volar. Si una aerolínea, un control de fronteras o un consulado te pide el itinerario, lee siempre las instrucciones oficiales de tu caso y nunca modifiques un documento para mostrar una reserva que no existe.",
        ],
        bullets: [
          "Tu nombre está escrito exactamente como en el pasaporte",
          "Las fechas son correctas, incluida la llegada al día siguiente en vuelos nocturnos",
          "Los aeropuertos y las terminales son los que esperabas",
          "Las escalas dejan tiempo suficiente; nuestro [comprobador de tiempo de escala](/es/herramientas/tiempo-de-escala) te ayuda a valorarlo",
          "La franquicia de equipaje coincide con lo que piensas llevar",
          "Aparece un número de billete, no solo un localizador",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Es lo mismo un itinerario de vuelo que un billete?",
        answer:
          "No siempre. Un itinerario escrito antes de reservar es solo un plan. El recibo que envía la aerolínea después de pagar incluye un localizador y un número de billete, y esa versión sí sirve como prueba de tu billete.",
      },
      {
        question:
          "¿Puedo conseguir un itinerario de vuelo gratis sin pagar un vuelo?",
        answer:
          "Sí, como plan. Puedes anotar tú mismo los vuelos previstos o usar una herramienta de planificación, siempre que lo presentes con honestidad como un plan y no como una reserva. Algunas aerolíneas y agencias también ofrecen mantener una reserva real durante un tiempo corto.",
      },
      {
        question: "¿Dónde encuentro mi localizador?",
        answer:
          "Está en el correo de confirmación y en el recibo del itinerario, normalmente en la parte de arriba, como un código de unas seis letras y números. Puede aparecer como localizador, código de reserva, número de confirmación o PNR.",
      },
      {
        question: "¿Tengo que imprimir el itinerario de vuelo?",
        answer:
          "Normalmente basta con una copia en el móvil, pero conviene guardarla sin conexión o llevarla impresa por si te quedas sin cobertura o sin batería. Algunos agentes de facturación y de fronteras piden verla, sobre todo si viajas solo con billete de ida.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "ejemplo-de-itinerario-de-viaje",
        "como-fijan-las-aerolineas-el-precio-de-los-vuelos",
      ],
    },
    sources: [
      SOURCES.aesaPassengers,
      SOURCES.euAirRightsEs,
      SOURCES.iataTravelers,
    ],
  },
];
