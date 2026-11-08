import { type GuideSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type PostInput = z.input<typeof GuideSchema>;

/**
 * Spanish editions of the flight posts, written for Spanish-speaking
 * readers rather than translated line by line. Each names the English post
 * it corresponds to (translationOf). Posts whose English date has passed go
 * live on the day they were written; the rest share the English date.
 */
export const spanishFlightPosts: PostInput[] = [
  {
    slug: "como-encontrar-vuelos-baratos",
    locale: "es",
    translationOf: "how-to-find-cheap-flights",
    photo: "cheap-flights",
    category: "flights",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    title: "Cómo encontrar vuelos baratos: método paso a paso",
    description:
      "Un método práctico para encontrar vuelos más baratos: fechas flexibles, aeropuertos cercanos, tipos de tarifa, el coste total real y alertas de precio.",
    headline: "Cómo encontrar vuelos baratos: un método paso a paso",
    intro:
      "Los vuelos baratos casi nunca dependen de un truco secreto. Salen de un método que se puede repetir: ser flexible donde puedas, comparar las opciones adecuadas y juzgar las tarifas por lo que vas a pagar de verdad, no por el precio del anuncio. Esta guía recorre ese método paso a paso.",
    sections: [
      {
        heading: "1. Empieza por la flexibilidad, no por un buscador",
        paragraphs: [
          "Lo que más influye en el precio es la flexibilidad. Antes de buscar, decide qué partes del viaje pueden moverse: las fechas exactas, la duración, el aeropuerto de salida o incluso el destino. Cada opción que añades te da más tarifas para comparar.",
          "La mayoría de los buscadores de vuelos tienen una vista de calendario o de fechas flexibles que muestra los precios de toda una semana o un mes. Úsala para localizar los días más baratos alrededor de tus fechas. Mover el viaje uno o dos días, o salir entre semana en lugar de un viernes, suele cambiar el precio porque hay menos demanda.",
          "Si tus fechas son fijas, la flexibilidad puede venir de los aeropuertos, las rutas y los tipos de tarifa, que se explican en los siguientes pasos. Si aún no sabes cuántos días ir, nuestra herramienta [¿cuántos días necesito?](/es/herramientas/cuantos-dias) te ayuda a elegir una duración que deje margen para comparar fechas.",
        ],
        bullets: [],
      },
      {
        heading: "2. Compara aeropuertos cercanos y rutas distintas",
        paragraphs: [
          "Muchas ciudades tienen más de un aeropuerto, y los más pequeños a veces son más baratos. Revisa todos los aeropuertos a los que podrías llegar sin problema y suma el coste y el tiempo del trayecto hasta ellos. Una tarifa más barata desde un aeropuerto a dos horas solo es un ahorro si llegar hasta él cuesta menos que la diferencia.",
          "Mira también más allá de los vuelos directos. Una ruta con una escala puede salir más barata, sobre todo en viajes largos. Compara el ahorro con el tiempo extra y el riesgo de una conexión justa, y elige escalas con un único billete para que la aerolínea se encargue de recolocarte si el primer vuelo se retrasa. Nuestro [comprobador de tiempo de escala](/es/herramientas/tiempo-de-escala) te ayuda a valorar si la conexión es suficiente.",
        ],
        bullets: [],
      },
      {
        heading: "3. Busca ida y vuelta, pero también solo ida",
        paragraphs: [
          "Un billete de ida y vuelta no siempre es más barato que dos de solo ida. En muchas rutas cortas, sobre todo con aerolíneas de bajo coste, cada trayecto tiene su propio precio, así que combinar dos billetes de ida, incluso con aerolíneas distintas, puede salir más barato o darte mejores horarios.",
          "A cambio, pierdes protección. Con dos billetes separados, un retraso en la ida no es problema de la aerolínea de la vuelta, y si pierdes una conexión entre billetes separados normalmente es responsabilidad tuya. Los billetes separados funcionan mejor en viajes sencillos de punto a punto con margen de sobra.",
        ],
        bullets: [],
      },
      {
        heading: "4. Entiende qué incluye cada tarifa",
        paragraphs: [
          "Dos tarifas con el mismo precio pueden ser productos muy distintos. Antes de comparar, revisa qué incluye cada una: equipaje de mano, maleta facturada, elección de asiento, cambios y reembolsos. Las tarifas básicas son baratas en parte porque dejan todo eso fuera. Nuestra guía sobre [cómo fijan las aerolíneas el precio de los vuelos](/es/blog/como-fijan-las-aerolineas-el-precio-de-los-vuelos) explica cómo encajan las clases tarifarias.",
          "Lee las condiciones de cambio y cancelación. Si tus planes pueden cambiar, una tarifa algo más cara que permite cambios puede salir más barata que una básica que tengas que perder. Nuestra guía sobre [los cargos de las aerolíneas de bajo coste](/es/blog/cargos-de-las-aerolineas-de-bajo-coste) explica los extras más habituales.",
        ],
        bullets: [],
      },
      {
        heading: "5. Compara el coste total, no el precio del anuncio",
        paragraphs: [
          "La tarifa es solo una parte de lo que cuesta volar. Suma los extras que vas a necesitar, el trayecto hasta y desde cada aeropuerto y el valor de tu tiempo. Una llegada de madrugada que obliga a coger un taxi en lugar del tren, o una noche más de hotel por un vuelo muy temprano, pueden borrar el ahorro.",
          "En la Unión Europea, las aerolíneas y las agencias deben mostrar el precio final con todos los impuestos y cargos inevitables, y los suplementos opcionales deben ofrecerse de forma que tú decidas añadirlos. Eso facilita comparar, pero el equipaje y los asientos tienes que sumarlos tú. Nuestra [calculadora del coste del equipaje](/es/herramientas/coste-del-equipaje) compara hasta tres tarifas con sus extras, y la [calculadora de presupuesto de viaje](/es/herramientas/calculadora-presupuesto-viaje) suma vuelos, alojamiento y gastos diarios.",
        ],
        bullets: [
          "El equipaje que de verdad vas a llevar, de mano y facturado",
          "La elección de asiento, si necesitáis ir juntos",
          "El transporte al aeropuerto en origen y destino, a las horas a las que llegas y sales",
          "El alojamiento extra que obligan los vuelos muy tempranos o muy tardíos",
        ],
      },
      {
        heading: "6. Sigue los precios en lugar de adivinar el mejor día",
        paragraphs: [
          "Seguro que has oído que un día de la semana o un número fijo de semanas antes siempre es lo más barato. Las tarifas dependen de la demanda y de los asientos que quedan en cada vuelo, así que no hay una regla que funcione en todas las rutas. Es más fiable empezar a mirar precios con tiempo y reservar cuando una tarifa te parezca buena para tu viaje.",
          "Crea alertas de precio para tu ruta y tus fechas en uno o dos buscadores. Seguir los mismos vuelos durante un tiempo te enseña cuál es un precio normal, para reconocer una buena tarifa cuando aparezca. En épocas de mucha demanda, como vacaciones escolares, puentes o grandes eventos, los vuelos más populares se llenan, así que rara vez compensa esperar al último momento.",
        ],
        bullets: [],
      },
      {
        heading: "7. Mira la web de la aerolínea antes de reservar",
        paragraphs: [
          "Los comparadores son muy útiles para encontrar opciones, pero conviene consultar el mismo vuelo en la web de la propia aerolínea antes de pagar. El precio suele ser igual o parecido, y reservar directamente facilita los cambios, los reembolsos y las incidencias, porque tratas con la aerolínea y no con un intermediario.",
          "Si reservas con un tercero, elige una empresa conocida, lee sus condiciones de cambio y cancelación y comprueba que el precio final incluye todo lo que necesitas.",
        ],
        bullets: [],
      },
      {
        heading: "8. Conoce tus derechos si algo cambia",
        paragraphs: [
          "Un billete barato también tiene derechos. Según las normas europeas, en muchos vuelos los pasajeros pueden tener derecho a asistencia, como comida y alojamiento, durante retrasos largos, y a reembolso o transporte alternativo, y en algunos casos a una compensación fija, si un vuelo se cancela con poca antelación o llega con mucho retraso, salvo circunstancias extraordinarias.",
          "Las normas cambian según el país y la aerolínea, así que revisa las fuentes oficiales enlazadas abajo para tu viaje. Cuando tengas los vuelos, nuestro [planificador de viajes con IA](/es/planificar) convierte tus fechas en un plan día a día.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question:
          "¿Es más barato reservar vuelos un día concreto de la semana?",
        answer:
          "No hay una regla fiable que diga que un día de reserva siempre es el más barato. Las tarifas dependen de la demanda y de los asientos que quedan en cada vuelo. Comparar precios entre fechas y crear alertas es una forma más segura de encontrar una buena tarifa.",
      },
      {
        question: "¿Suben los precios si busco la misma ruta varias veces?",
        answer:
          "Los precios cambian a menudo porque se venden asientos y la demanda varía, y eso puede parecer que suben mientras buscas. Buscar en una ventana privada no hace daño, pero comparar varias fuentes y la web de la aerolínea importa mucho más.",
      },
      {
        question: "¿Las aerolíneas de bajo coste son siempre las más baratas?",
        answer:
          "No siempre. Cuando sumas el equipaje, el asiento y el trayecto hasta aeropuertos secundarios, una aerolínea tradicional puede costar lo mismo o menos. Compara el precio total del viaje que vas a hacer de verdad, no solo la tarifa base.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "trucos-para-encontrar-vuelos-baratos",
        "cargos-de-las-aerolineas-de-bajo-coste",
        "como-fijan-las-aerolineas-el-precio-de-los-vuelos",
        "cuanto-tiempo-de-escala-necesito",
        "vuelos-con-billetes-separados",
      ],
    },
    sources: [SOURCES.euAirRightsEs, SOURCES.eu1008Es, SOURCES.aesaPassengers],
  },
  {
    slug: "trucos-para-encontrar-vuelos-baratos",
    locale: "es",
    translationOf: "cheap-flight-tips",
    photo: "flight-tips",
    category: "flights",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    title: "Trucos para vuelos baratos: 12 formas de ahorrar",
    description:
      "Doce formas prácticas de pagar menos por tus vuelos, desde viajar en temporada media y llevar poco equipaje hasta las alertas de precio y los trucos que evitar.",
    headline: "Trucos para encontrar vuelos baratos: 12 formas de ahorrar",
    intro:
      "Ahorrar en vuelos suele salir de muchas decisiones pequeñas, no de un gran truco. Estos doce consejos tratan las fechas, las rutas, el equipaje y la reserva, y también algunos trucos populares que es mejor evitar. Úsalos junto con nuestra guía paso a paso sobre [cómo encontrar vuelos baratos](/es/blog/como-encontrar-vuelos-baratos).",
    sections: [
      {
        heading: "Trucos de fechas",
        paragraphs: [
          "Cuándo viajas influye en el precio más que casi cualquier otra cosa. La demanda sube y baja con las temporadas, las vacaciones escolares y los eventos, y las tarifas la siguen. Nuestra guía sobre [cómo fijan las aerolíneas el precio de los vuelos](/es/blog/como-fijan-las-aerolineas-el-precio-de-los-vuelos) explica por qué.",
        ],
        bullets: [
          "1. Viaja en temporada media. Las semanas justo antes y después de la temporada alta de un destino suelen traer tarifas más bajas, menos gente y todavía buen tiempo.",
          "2. Evita, si puedes, las vacaciones escolares, los puentes y los grandes eventos. Los vuelos de esas fechas se llenan rápido. Si tus fechas son flexibles, moverte una semana puede marcar la diferencia.",
          "3. Prueba horarios menos populares. Los vuelos a primera hora, a última hora y entre semana suelen tener menos demanda que los de viernes y domingo por la tarde. Comprueba antes que haya transporte público a esas horas en origen y destino.",
        ],
      },
      {
        heading: "Trucos de rutas",
        paragraphs: [
          "Cambiar cómo llegas a un sitio puede importar tanto como cuándo. Estos consejos amplían las tarifas entre las que puedes elegir.",
        ],
        bullets: [
          "4. Revisa todos los aeropuertos cercanos. Los aeropuertos pequeños o secundarios pueden tener tarifas más baratas, pero suma el coste y el tiempo de llegar a ellos antes de decidir.",
          "5. Acepta una escala. En rutas largas, un vuelo con escala suele ser más barato que el directo. Mantén las escalas en un único billete y deja tiempo razonable entre vuelos.",
          "6. Prueba un viaje multidestino. Llegar a una ciudad y volver desde otra, por ejemplo entrar por Roma y salir por Venecia, evita desandar camino y a veces ahorra dinero.",
          "7. Cuidado con los vuelos de posicionamiento. A veces sale más barato coger un vuelo corto o un tren hasta un aeropuerto grande y empezar allí el viaje largo. Deja mucho margen, porque con billetes separados no estás protegido si el primer trayecto se retrasa; nuestra guía sobre [vuelos con billetes separados](/es/blog/vuelos-con-billetes-separados) explica los riesgos.",
        ],
      },
      {
        heading: "Trucos de equipaje y extras",
        paragraphs: [
          "Los extras son donde una tarifa barata se convierte poco a poco en cara. Planificarlos con antelación mantiene el total bajo control.",
        ],
        bullets: [
          "8. Viaja ligero. Si puedes ir solo con el artículo personal gratuito o con una maleta de cabina, te ahorras la maleta facturada. Revisa las medidas y el peso de tu aerolínea y mide tu bolso en casa con nuestro [comprobador de medidas del equipaje de mano](/es/herramientas/medidas-equipaje-de-mano).",
          "9. No pagues por elegir asiento si no te importa dónde sentarte. El asiento gratuito que te asignan al facturar está bien. Si ir juntos es importante, compara el coste de los asientos con una tarifa que los incluya.",
          "10. Factura online y ten la tarjeta de embarque a mano. Algunas aerolíneas cobran por facturar en el aeropuerto o por imprimir allí la tarjeta de embarque. Revisa las reglas de tu tarifa en nuestra guía sobre [los cargos de las aerolíneas de bajo coste](/es/blog/cargos-de-las-aerolineas-de-bajo-coste).",
        ],
      },
      {
        heading: "Trucos para reservar",
        paragraphs: [
          "Un poco de preparación antes de pagar te ayuda a reconocer una buena oferta y a no perderla.",
        ],
        bullets: [
          "11. Crea alertas de precio pronto. Seguir la misma ruta durante un tiempo te enseña el rango normal de precios, para reservar con seguridad cuando una tarifa baje en lugar de adivinar.",
          "12. Usa los puntos con cabeza. Los puntos de aerolíneas y tarjetas pueden abaratar un billete, pero compara las tasas de las reservas con puntos con una tarifa pagada, y no gastes más solo por acumular puntos.",
        ],
      },
      {
        heading: "Trucos que es mejor evitar",
        paragraphs: [
          "Algunos trucos muy compartidos pueden salir mal. El llamado «hidden city» consiste en reservar un vuelo con escala en la ciudad a la que de verdad quieres ir y no subir al último trayecto. Las condiciones de transporte de la mayoría de las aerolíneas lo prohíben, las maletas facturadas van al destino final y la aerolínea puede cancelar el resto de la reserva, incluida la vuelta.",
          "Desconfía también de las tarifas muy baratas en webs de reserva desconocidas con condiciones poco claras. Si algo sale mal, recuperar el dinero puede ser difícil. Reservar con la aerolínea o con una agencia conocida, y guardar los correos de confirmación, te deja en una posición mucho más fuerte.",
        ],
        bullets: [],
      },
      {
        heading: "Herramientas que facilitan estos trucos",
        paragraphs: [
          "No necesitas programas especiales para ahorrar en vuelos, pero algunos hábitos ayudan. Usa un buscador con vista de fechas flexibles o de mes completo para ver precios de muchos días a la vez, y crea alertas para las rutas que te interesan para enterarte de las bajadas sin mirar cada día.",
          "Apunta los precios que ves para una ruta durante un par de semanas. Cuesta un minuto y convierte una sensación vaga de si una tarifa es buena en algo que puedes juzgar de verdad.",
          "Por último, planifica el viaje alrededor de los vuelos que encuentres. Nuestro [planificador de viajes con IA](/es/planificar) compara opciones de vuelo para tus fechas y prepara un plan día a día según los horarios que elijas, para que un vuelo barato pero incómodo no te cueste un día sin darte cuenta.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Con cuánta antelación debo reservar un vuelo?",
        answer:
          "No hay una respuesta única para todas las rutas. Empieza a mirar precios con tiempo, sobre todo para vacaciones y eventos populares, y reserva cuando veas una tarifa buena comparada con lo que has ido siguiendo.",
      },
      {
        question: "¿Está permitido el truco del «hidden city»?",
        answer:
          "La mayoría de las aerolíneas lo prohíben en sus condiciones de transporte. Puede hacer que tu maleta facturada acabe en otra ciudad y que la aerolínea cancele el resto de tu reserva, así que no compensa el riesgo.",
      },
      {
        question: "¿Compensan los vuelos con escala?",
        answer:
          "A menudo sí en viajes largos, siempre que la escala esté en un único billete y deje tiempo suficiente entre vuelos. Compara el ahorro con el tiempo extra de viaje y con cómo te afectaría un retraso.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "como-encontrar-vuelos-baratos",
        "cargos-de-las-aerolineas-de-bajo-coste",
        "como-fijan-las-aerolineas-el-precio-de-los-vuelos",
        "como-planificar-un-viaje-barato",
      ],
    },
    sources: [SOURCES.euAirRightsEs, SOURCES.aesaPassengers, SOURCES.eu1008Es],
  },
  {
    slug: "cargos-de-las-aerolineas-de-bajo-coste",
    locale: "es",
    translationOf: "budget-airline-fees-explained",
    photo: "airline-fees",
    category: "flights",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    title: "Cargos de las aerolíneas low cost: qué revisar antes",
    description:
      "Los cargos de las aerolíneas de bajo coste: equipaje de mano, maleta facturada, asientos, facturación, pago y cambios, y cómo comparar el precio real.",
    headline: "Los cargos de las aerolíneas de bajo coste, explicados",
    intro:
      "Las aerolíneas de bajo coste mantienen bajas sus tarifas base cobrando aparte cosas que antes iban incluidas. Eso puede ahorrarte dinero, pero solo si sabes qué extras necesitas antes de reservar. Esta guía explica los cargos más habituales y cómo comparar el precio real de una tarifa.",
    sections: [
      {
        heading: "Cómo funcionan las tarifas de bajo coste",
        paragraphs: [
          "Una tarifa de bajo coste suele cubrir un asiento en el vuelo y un artículo personal pequeño, como un bolso o una mochila que quepa debajo del asiento de delante. Casi todo lo demás, desde una maleta de cabina más grande hasta elegir asiento, puede ser un extra con su propio precio.",
          "Los nombres de los cargos, los precios y las franquicias cambian entre aerolíneas e incluso entre tarifas de la misma aerolínea, y se modifican con el tiempo. Usa esta guía como lista de lo que debes revisar y confirma siempre las reglas actuales en la web de la aerolínea para tu reserva concreta.",
        ],
        bullets: [],
      },
      {
        heading: "Equipaje: artículo personal, maleta de cabina y facturada",
        paragraphs: [
          "El equipaje es la sorpresa más habitual. Revisa tres cosas de tu tarifa: qué cuenta como artículo personal gratuito, si incluye una maleta de cabina para el compartimento superior y cuánto cuesta facturar. Cada uno tiene sus propias medidas y, a menudo, su peso máximo. Nuestra guía sobre [qué cabe debajo del asiento del avión](/es/blog/que-cabe-debajo-del-asiento-del-avion) explica cómo comprobar el artículo personal.",
          "Mide y pesa tu equipaje en casa. Las aerolíneas pueden cobrar en la puerta de embarque por bultos demasiado grandes, y esos recargos suelen ser más altos que añadir la maleta al reservar. Nuestro [comprobador de medidas del equipaje de mano](/es/herramientas/medidas-equipaje-de-mano) y la [calculadora de peso de la maleta](/es/herramientas/peso-de-la-maleta) comprueban tu equipaje con los límites de tu reserva.",
          "Recuerda que, además de las normas de la aerolínea, están las del control de seguridad. Los líquidos y algunos objetos tienen sus propias restricciones, que cambian según el país y el aeropuerto.",
        ],
        bullets: [],
      },
      {
        heading: "Asientos y embarque",
        paragraphs: [
          "En muchas aerolíneas de bajo coste el asiento se asigna gratis al facturar, y elegirlo cuesta dinero. Si viajas solo y no te importa dónde sentarte, la opción gratuita suele bastar.",
          "Las familias y los grupos que quieren ir juntos deben revisar la política de la aerolínea. Algunas sientan automáticamente a los niños pequeños con un adulto; otras esperan que pagues. El embarque prioritario, a veces incluido con la maleta de cabina, es otro extra que conviene comparar con lo que de verdad necesitas.",
        ],
        bullets: [],
      },
      {
        heading: "Facturación y tarjeta de embarque",
        paragraphs: [
          "La mayoría de las aerolíneas de bajo coste esperan que factures online dentro de un plazo antes de la salida. Algunas cobran por facturar en el aeropuerto o por imprimir allí la tarjeta de embarque. Pon un recordatorio para cuando se abra la facturación online y guarda la tarjeta de embarque en el móvil o imprímela en casa.",
          "Si viajas fuera de tu país, la aerolínea puede pedirte los datos del pasaporte antes de facturar. Ten tus documentos listos; nuestra guía de [documentos para viajar](/es/blog/documentos-para-viajar) explica qué revisar antes de salir.",
        ],
        bullets: [],
      },
      {
        heading: "Pago, cambios y corrección de nombres",
        paragraphs: [
          "Mira con atención la última pantalla de pago. Algunas aerolíneas o agencias añaden cargos por ciertos métodos de pago, y por el camino pueden ofrecerte extras como seguros; añade solo lo que quieras.",
          "Las tarifas básicas suelen tener reglas estrictas para los cambios, con un cargo más la diferencia de tarifa. Corregir un nombre también puede costar dinero, así que comprueba la ortografía con tu pasaporte o DNI antes de pagar. Si tus planes no están claros, compara el coste de una tarifa flexible con el riesgo de pagar cambios después.",
        ],
        bullets: [],
      },
      {
        heading: "Cómo comparar el precio real",
        paragraphs: [
          "Para comparar tarifas de forma justa, monta en cada aerolínea el viaje que vas a hacer: el mismo equipaje, los asientos si los necesitas y los cargos de facturación o pago. En la UE, el precio mostrado debe incluir todos los impuestos y cargos inevitables, lo que ayuda, pero los extras opcionales tienes que sumarlos tú en cada opción.",
          "Después suma el trayecto hasta y desde el aeropuerto. Nuestra guía sobre [cómo encontrar vuelos baratos](/es/blog/como-encontrar-vuelos-baratos) explica este enfoque del coste total, y nuestros [trucos para vuelos baratos](/es/blog/trucos-para-encontrar-vuelos-baratos) cubren formas de evitar muchos de estos cargos.",
          "Nuestra [calculadora del coste del equipaje](/es/herramientas/coste-del-equipaje) hace esta suma para hasta tres tarifas a la vez, por persona y para todo el viaje.",
        ],
        bullets: [
          "Medidas del artículo personal y si incluye maleta de cabina",
          "Precio de la maleta facturada al reservar frente a después",
          "Reglas de elección de asiento si necesitáis ir juntos",
          "Plazo de facturación online y cargo por facturar en el aeropuerto",
          "Cargos por método de pago en la última pantalla",
          "Reglas de cambio, cancelación y corrección de nombre de tu tarifa",
        ],
      },
      {
        heading: "El día del vuelo: cómo evitar cargos en el aeropuerto",
        paragraphs: [
          "La mayoría de los cargos inesperados llegan en el aeropuerto, cuando ya es tarde para comparar. Antes de salir de casa, comprueba que tu equipaje cumple las medidas y el peso de tu tarifa, que has facturado online si la aerolínea lo exige y que tienes la tarjeta de embarque en el móvil o impresa.",
          "Llega con tiempo para la cola de entrega de equipaje y el control, sobre todo en horas punta. Si un bulto va justo, ponte lo que más pesa o pásalo al artículo personal antes que arriesgarte a un recargo. Si tienes dudas sobre una norma, la web de la aerolínea tiene la última palabra, no un comparador.",
          "Guarda la confirmación de la reserva y los recibos de los extras. Si te cobran algo que crees haber pagado, es mucho más fácil resolverlo con los papeles a mano.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question:
          "¿Cuánto cuesta de verdad un vuelo barato con equipaje y asiento?",
        answer:
          "Suma la tarifa base, el equipaje que vas a llevar, el asiento si necesitas elegirlo y los cargos de facturación o pago que aparecen antes de pagar. Después añade el trayecto hasta y desde el aeropuerto. Compara ese total entre aerolíneas, no la tarifa del anuncio.",
      },
      {
        question: "¿Es más barato añadir la maleta al reservar o después?",
        answer:
          "Añadir la maleta al reservar o con tiempo antes del vuelo suele ser más barato que hacerlo cerca de la salida, y mucho más que pagar por un bulto demasiado grande en la puerta de embarque. Revisa los precios de tu aerolínea en cada momento.",
      },
      {
        question: "¿Tengo que pagar para sentarme con mi acompañante?",
        answer:
          "En muchas aerolíneas de bajo coste, elegir asientos juntos cuesta dinero, mientras que los asientos gratuitos se asignan al azar al facturar. Las políticas para familias con niños pequeños cambian, así que revisa las normas de la aerolínea antes de reservar.",
      },
      {
        question: "¿El precio anunciado tiene que incluir los impuestos?",
        answer:
          "En la Unión Europea, el precio mostrado debe incluir todos los impuestos, tasas y cargos inevitables, y los suplementos opcionales deben ofrecerse para que tú decidas añadirlos. Fuera de la UE las normas cambian, así que revisa el precio final antes de pagar.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "como-encontrar-vuelos-baratos",
        "trucos-para-encontrar-vuelos-baratos",
        "como-fijan-las-aerolineas-el-precio-de-los-vuelos",
        "que-cabe-debajo-del-asiento-del-avion",
        "que-llevar-en-el-equipaje-de-mano",
      ],
    },
    sources: [SOURCES.eu1008Es, SOURCES.euAirRightsEs, SOURCES.aesaPassengers],
  },
  {
    slug: "reserva-de-vuelo-para-visado",
    locale: "es",
    translationOf: "dummy-ticket-for-visa",
    photo: "documents",
    category: "practical",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    title: "Reserva de vuelo para visado: qué se acepta",
    description:
      "Qué es de verdad un «billete falso» o una reserva de vuelo para el visado, qué presentar en la solicitud, las opciones legales y cómo comprobar una reserva.",
    headline: "Reserva de vuelo para el visado: qué se acepta y qué no",
    intro:
      "Si vas a pedir un visado (o una visa), puede que te pidan mostrar tus planes de viaje, y mucha gente busca un «billete falso» o «dummy ticket» para cumplir ese paso sin pagar un vuelo. Esta guía explica con palabras sencillas qué suele significar, qué piden normalmente las solicitudes, las opciones seguras y legales, y por qué un billete falso o editado puede costarte mucho más que uno real.",
    sections: [
      {
        heading: "Qué se quiere decir con «billete falso» o «dummy ticket»",
        paragraphs: [
          "«Dummy ticket» es un nombre informal que abarca cosas muy distintas. A veces es una reserva de vuelo real que una aerolínea o una agencia mantiene durante un tiempo sin el pago completo. A veces es un simple itinerario de vuelo con los vuelos que piensas coger. Y a veces es un documento hecho para parecer un billete pagado o una reserva confirmada cuando no existe ninguna reserva.",
          "Las dos primeras pueden ser perfectamente legítimas, siempre que las describas con honestidad. La tercera es un documento falso. La diferencia importa, porque las autoridades valoran tu solicitud según si tus documentos son auténticos. Nuestro [ejemplo de itinerario de vuelo](/es/blog/ejemplo-de-itinerario-de-vuelo) muestra la diferencia línea a línea.",
        ],
        bullets: [
          "Una reserva retenida: una reserva real en el sistema de la aerolínea, a menudo con fecha límite.",
          "Un itinerario de vuelo: un plan de los vuelos que piensas coger, sin reserva detrás.",
          "Un billete falso: un documento que afirma una reserva o un pago que no existe.",
        ],
      },
      {
        heading: "Qué suelen pedir las solicitudes de visado",
        paragraphs: [
          "Cada país fija sus propias normas, y también cada consulado. Para un visado Schengen, la Comisión Europea indica que necesitas documentos sobre el motivo de tu estancia, el alojamiento, los medios económicos y tu intención de volver, y que los consulados pueden pedir documentos adicionales. Muchos consulados piden reservas de viaje o un itinerario como parte de esto, así que lee siempre la lista del consulado donde presentas la solicitud.",
          "Algunos países incluso desaconsejan pagar el viaje demasiado pronto. El Gobierno británico, por ejemplo, recomienda no reservar el viaje hasta tener la decisión sobre el visado, y avisa de que no reembolsa los gastos si la solicitud se deniega o se retrasa.",
          "Así que antes de buscar cualquier tipo de billete, localiza la lista oficial de documentos de tu visado y comprueba exactamente qué pide: un billete pagado, una reserva, un itinerario o nada. Nuestra guía de [documentos para viajar](/es/blog/documentos-para-viajar) explica dónde encontrar los requisitos oficiales de entrada.",
        ],
        bullets: [],
      },
      {
        heading: "Itinerario de vuelo para el visado: qué presentar",
        paragraphs: [
          "Los consulados usan palabras distintas para la parte de los vuelos, y esas palabras te dicen qué quieren. «Itinerario de viaje» o «itinerario de vuelos previstos» suele significar un plan que muestra cómo llegas y cómo te vas. «Reserva de vuelo» o «prueba de reserva» significa una reserva real que se puede comprobar. «Billete de vuelta» o «billete pagado» significa que tienes que haberlo comprado. Si la redacción no está clara, pregunta al consulado o a su centro de visados antes de gastar dinero.",
          "Presentes lo que presentes, debe coincidir con el resto de la solicitud. Los nombres deben escribirse exactamente como en cada pasaporte, las fechas deben ser las mismas que en el formulario, el alojamiento y el seguro de viaje, y la ruta debe mostrar cómo entras y sales del país o la zona que cubre el visado.",
          "Llámalo por su nombre. Un plan de vuelos previstos debe decir que es un plan y no una reserva.",
        ],
        bullets: [
          "El nombre de cada viajero, como en su pasaporte",
          "Fechas de ida y vuelta que coincidan con el formulario",
          "Aeropuertos y números de vuelo de cada trayecto",
          "Un localizador solo si existe una reserva real",
          "Fechas coherentes con el alojamiento y el seguro",
        ],
      },
      {
        heading: "Opciones seguras y legales",
        paragraphs: [
          "Si necesitas mostrar tus planes de vuelo sin arriesgar mucho dinero, hay formas honestas de hacerlo. La adecuada depende de lo que pida tu consulado y de lo seguras que sean tus fechas.",
        ],
        bullets: [
          "Reserva una tarifa flexible o reembolsable, y lee las reglas de cambio y reembolso antes de pagar.",
          "Pregunta si la aerolínea permite retener una tarifa o pagar más tarde; algunas lo permiten durante unos días, a veces por un pequeño cargo.",
          "Pide a una agencia de viajes una reserva real y pregunta cuánto tiempo seguirá activa.",
          "Si basta con un itinerario, prepara un plan claro de tus vuelos previstos y preséntalo como itinerario, no como reserva.",
        ],
      },
      {
        heading: "Por qué los billetes falsos o editados son un riesgo",
        paragraphs: [
          "Un billete o una confirmación sin reserva real detrás a menudo se puede comprobar, por ejemplo buscando el localizador en la web de la aerolínea. Si no coincide, la solicitud puede denegarse, y pierdes la tasa del visado y el tiempo invertido.",
          "Las consecuencias pueden ir mucho más allá de una solicitud. Las directrices del Ministerio del Interior británico, por ejemplo, indican que las solicitudes pueden denegarse por documentos o declaraciones falsas y que, si se detecta engaño, las solicitudes futuras pueden denegarse durante hasta 10 años. Otros países tienen sus propias sanciones.",
          "Ten cuidado con las webs que venden «billetes» sin marca de agua ni aviso por un precio. Si el documento afirma una reserva que no existe, el riesgo es tuyo, no del vendedor.",
        ],
        bullets: [],
      },
      {
        heading: "Cómo comprobar que una reserva es real",
        paragraphs: [
          "Si alguien te da una reserva, compruébala tú antes de usarla. Una reserva auténtica existe en el sistema de la propia aerolínea, así que deberías poder encontrarla en la web de la aerolínea, no solo en la del vendedor.",
        ],
        bullets: [
          "Busca el localizador en la sección «gestionar reserva» de la aerolínea con tu apellido.",
          "Comprueba que tu nombre está escrito exactamente como en tu pasaporte.",
          "Comprueba que las fechas, los números de vuelo y la ruta coinciden con tu solicitud.",
          "Pregunta cuánto tiempo sigue activa la reserva y qué pasa después.",
        ],
      },
      {
        heading: "Nuestro itinerario de vuelo gratuito para planificar",
        paragraphs: [
          "El [planificador de viajes con IA](/es/planificar) gratuito de AIFlyTrip crea un plan día a día con un vuelo sugerido y un itinerario de vuelo gratuito para planificar. Te ayuda a decidir fechas, rutas y un presupuesto aproximado antes de reservar nada.",
          "Está claramente marcado como que no es un billete ni una reserva: no se reserva ni se retiene ningún asiento y no hay localizador. Úsalo para planificar tu viaje, y usa una de las opciones legítimas de arriba si tu solicitud pide una reserva. Si comparas tarifas, nuestra guía sobre [cómo encontrar vuelos baratos](/es/blog/como-encontrar-vuelos-baratos) explica cómo comparar tarifas flexibles.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Es legal un «dummy ticket»?",
        answer:
          "Depende de lo que sea. Una reserva real retenida por una aerolínea o una agencia es legítima. Un documento que afirma una reserva o un pago que no existe es un documento falso, y usarlo en una solicitud de visado puede llevar a una denegación y a prohibiciones más largas.",
      },
      {
        question:
          "¿Puedo usar el itinerario gratuito de AIFlyTrip para el visado?",
        answer:
          "Es un documento de planificación, claramente marcado como que no es un billete ni una reserva, sin localizador. Si tu consulado acepta un itinerario, puedes presentarlo con honestidad como tus vuelos previstos. Si pide una reserva, usa una reserva real o una tarifa flexible.",
      },
      {
        question:
          "¿Puedo presentar un itinerario de vuelo en lugar de un billete?",
        answer:
          "A menudo sí. Muchos consulados aceptan un itinerario o una reserva en lugar de un billete pagado, y algunos desaconsejan comprar antes de la decisión. Revisa la redacción de la lista de documentos de tu consulado, y si pide una reserva, no presentes un plan como si lo fuera.",
      },
      {
        question: "¿Qué es una reserva de vuelo para el visado?",
        answer:
          "Es una reserva real en el sistema de una aerolínea, a menudo durante un tiempo limitado y a veces sin el pago completo. Tiene un localizador que el consulado puede comprobar con la aerolínea. Es distinta de un plan de vuelos previstos, que no tiene reserva detrás.",
      },
      {
        question: "¿Tengo que comprar el vuelo antes de tener el visado?",
        answer:
          "No siempre. Los requisitos cambian según el país y el consulado, y algunos gobiernos, como el británico, recomiendan no reservar el viaje hasta tener la decisión del visado. Revisa la lista oficial de documentos de tu solicitud.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "ejemplo-de-itinerario-de-vuelo",
        "billete-de-salida-del-pais",
        "documentos-para-viajar",
        "como-encontrar-vuelos-baratos",
      ],
    },
    sources: [
      SOURCES.euSchengenVisa,
      SOURCES.govUkVisaProcessing,
      SOURCES.govUkFalseDocuments,
      SOURCES.esTravelAdvice,
    ],
  },
  {
    slug: "billete-de-salida-del-pais",
    locale: "es",
    translationOf: "proof-of-onward-travel",
    photo: "documents",
    category: "practical",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    title: "Billete de salida del país: qué piden las aerolíneas",
    description:
      "Por qué las aerolíneas piden un billete de salida del país, a quién se lo piden, qué suele servir y las opciones honestas si viajas solo con billete de ida.",
    headline: "Billete de salida del país: qué es y cómo demostrarlo",
    intro:
      "La prueba de salida es lo que demuestra que piensas abandonar el país al que vuelas, como un vuelo de vuelta o un billete hacia otro destino. La mayoría de los viajeros con billete de ida y vuelta nunca se lo plantean. Quien viaja solo con ida puede encontrarse con que se lo piden en el mostrador de facturación, e incluso que no le dejan embarcar sin él. Esta guía explica por qué pasa y las formas honestas de ir preparado.",
    sections: [
      {
        heading: "Por qué te lo pide la aerolínea antes de embarcar",
        paragraphs: [
          "Muchos países solo dejan entrar a los visitantes si pueden demostrar que piensan salir dentro del tiempo de estancia permitido. La norma es del país de destino, pero normalmente es la aerolínea la que lo comprueba primero, al facturar o en la puerta de embarque.",
          "Las aerolíneas lo comprueban porque asumen el riesgo. En muchos países, la aerolínea que lleva a un pasajero al que luego se le niega la entrada tiene que devolverlo, y además puede ser multada. Por eso el personal consulta los requisitos de entrada para tu pasaporte y tu destino y los aplica antes de embarcar. Si exigen un billete de salida y no puedes mostrarlo, la aerolínea puede negarse a llevarte.",
          "Por eso que te lo pidan no es un juicio sobre ti. El agente sigue una lista, y lo más sencillo es tener el documento adecuado preparado.",
        ],
        bullets: [],
      },
      {
        heading: "A quién se lo suelen pedir",
        paragraphs: [
          "Es mucho más probable que te lo pidan en unas situaciones que en otras. Ninguna significa que te vayan a negar el embarque; simplemente son los casos en que conviene prepararse.",
        ],
        bullets: [
          "Viajas con un billete solo de ida",
          "Entras como turista sin un visado tramitado previamente",
          "Tu vuelo de vuelta es posterior a la estancia que normalmente te permitirían",
          "Piensas salir por tierra o por mar en lugar de en avión",
          "Haces un viaje largo por varios países sin un plan fijo",
        ],
      },
      {
        heading: "Qué suele servir como prueba",
        paragraphs: [
          "Lo que se acepta depende del país y, a veces, de la persona que lo revisa. La prueba más aceptada es un vuelo confirmado de salida del país, de vuelta a casa o hacia otro país que te admita, con fecha dentro de tu estancia permitida.",
          "Algunos países aceptan también un billete de salida en autobús, tren o ferry, mientras que otros esperan un vuelo. Una reserva que el personal pueda comprobar, con tu nombre, la fecha y un localizador, vale mucho más que una captura de pantalla de una búsqueda. Un plan de vuelos previstos no es una reserva; nuestro [ejemplo de itinerario de vuelo](/es/blog/ejemplo-de-itinerario-de-vuelo) explica la diferencia.",
        ],
        bullets: [],
      },
      {
        heading: "Cómo comprobar la norma para tu viaje",
        paragraphs: [
          "Empieza por las recomendaciones de viaje oficiales para tu destino. Las fichas por país del Ministerio de Asuntos Exteriores suelen tener un apartado de requisitos de entrada que indica si pueden pedir billete de vuelta o de salida, y la embajada o la web de inmigración del propio destino tienen la última palabra.",
          "El personal de las aerolíneas suele consultar una base de datos común de requisitos de entrada. El IATA Travel Centre, enlazado abajo, permite consultar los requisitos por pasaporte y destino. Si algo no está claro, contacta con la aerolínea antes de viajar y pregunta qué querrá ver su personal. Nuestra guía de [documentos para viajar](/es/blog/documentos-para-viajar) recoge lo demás que conviene revisar a la vez.",
        ],
        bullets: [],
      },
      {
        heading: "Opciones honestas si tienes un billete solo de ida",
        paragraphs: [
          "No necesitas inventarte nada. Hay varias formas reales de tener un billete de salida, y la adecuada depende de lo fijos que sean tus planes y de cuánta flexibilidad quieras pagar.",
          "Elijas la que elijas, lee las condiciones de la tarifa antes de pagar para saber qué puedes cambiar o recuperar. Nuestra guía sobre [cómo encontrar vuelos baratos](/es/blog/como-encontrar-vuelos-baratos) explica cómo comparar tarifas flexibles con las básicas.",
        ],
        bullets: [
          "Reserva el vuelo de vuelta o de continuación que de verdad esperas coger, con una tarifa que permita cambiar la fecha",
          "Reserva una tarifa reembolsable y cancélala si cambian tus planes, dentro de sus condiciones",
          "Pregunta a la aerolínea o a una agencia si pueden retener una reserva real durante un tiempo",
          "Si el país lo acepta, compra un billete de salida en autobús, tren o ferry",
          "Usa millas para el vuelo de salida si el billete con puntos se puede cambiar o cancelar",
        ],
      },
      {
        heading: "Qué no hacer",
        paragraphs: [
          "No edites una confirmación, no reutilices una antigua ni compres un documento que afirme una reserva que no existe. Las reservas se comprueban con la aerolínea en segundos, y mostrar un documento falso a una aerolínea o a un agente fronterizo puede llevar a que te nieguen el embarque o la entrada y a problemas con futuras solicitudes de visado.",
          "Ten cuidado con las webs que venden billetes de salida por un pequeño precio. Algunas hacen una reserva real de corta duración y otras solo venden una página convincente. Si usas una, busca tú la reserva en la web de la aerolínea antes de confiar en ella y entérate de cuándo se cancelará. Nuestra guía sobre la [reserva de vuelo para el visado](/es/blog/reserva-de-vuelo-para-visado) explica cómo comprobar que una reserva es real.",
        ],
        bullets: [],
      },
      {
        heading: "En el aeropuerto",
        paragraphs: [
          "Lleva la prueba donde puedas verla sin conexión a internet: un archivo guardado en el móvil y, si puedes, una copia impresa. Ten el localizador a mano, porque el personal puede consultarlo. Llega con tiempo, porque resolver un documento que falta en el mostrador es lento.",
          "Si no te dejan embarcar por no tener billete de salida, lo más rápido suele ser comprar allí mismo un billete adecuado, otra razón para conocer de antemano las condiciones de las tarifas. Mantén la calma y pregunta al agente qué requisito se aplica exactamente, para comprar lo correcto.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question:
          "¿Puede una aerolínea no dejarme embarcar sin billete de vuelta?",
        answer:
          "Sí. Si los requisitos de entrada del destino exigen un billete de vuelta o de salida y no puedes mostrarlo, la aerolínea puede negarse a llevarte, porque podría tener que devolverte si te niegan la entrada.",
      },
      {
        question:
          "¿Sirve un billete de autobús o de tren como billete de salida?",
        answer:
          "En algunos países sí y en otros no, y cada agente puede ser más estricto que la norma escrita. Revisa los requisitos oficiales de entrada del destino y pregunta a tu aerolínea antes de confiar en algo que no sea un vuelo.",
      },
      {
        question: "¿Basta con un itinerario de vuelo como billete de salida?",
        answer:
          "Solo si es el itinerario de una reserva real, con un localizador que se pueda comprobar. Un plan de vuelos previstos muestra tus intenciones pero no es una reserva, y el personal de la aerolínea normalmente no lo aceptará.",
      },
      {
        question: "¿Necesito billete de salida si ya tengo visado?",
        answer:
          "Depende del país y del tipo de visado. Algunos visados se conceden según tus planes de viaje y algunos de larga duración eliminan la necesidad. Revisa las condiciones de tu visado y las indicaciones oficiales del destino.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "ejemplo-de-itinerario-de-vuelo",
        "reserva-de-vuelo-para-visado",
        "documentos-para-viajar",
        "como-encontrar-vuelos-baratos",
      ],
    },
    sources: [
      SOURCES.iata,
      SOURCES.esTravelAdvice,
      SOURCES.esTravellerRegistry,
    ],
  },
  {
    slug: "mejores-planificadores-de-viajes-con-ia",
    locale: "es",
    translationOf: "best-ai-trip-planners",
    photo: "plan-trip",
    category: "planning",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    title: "Mejores planificadores de viajes con IA gratis: 8 comparados",
    description:
      "Comparamos 8 planificadores de viajes con IA gratis, de Gemini y ChatGPT a Mindtrip, Wanderlog y Layla: qué hace bien cada uno, qué es gratis y para quién es.",
    headline:
      "Los mejores planificadores de viajes con IA: opciones gratis y para qué sirve cada una",
    intro:
      "El mejor planificador de viajes con IA depende de lo que necesites. Para un primer borrador rápido, un asistente general como ChatGPT o Google Gemini funciona bien. Para planificar sobre un mapa con amigos, destaca Wanderlog. Para planificar y reservar en el mismo sitio, mira Mindtrip o Layla. Para un plan día a día gratis con estimación de presupuesto y sin registro, está AIFlyTrip. Abajo tienes una respuesta rápida para cada necesidad y luego qué hace cada herramienta, qué es gratis y qué tener en cuenta.",
    sections: [
      {
        heading:
          "Respuesta rápida: el mejor planificador con IA para cada caso",
        paragraphs: [
          "Las ocho herramientas pueden preparar un itinerario gratis. Se diferencian en lo que pasa después: si puedes verlo en un mapa, editarlo con amigos, reservar desde él o guardarlo sin cuenta.",
        ],
        bullets: [
          "Para un primer borrador rápido: ChatGPT",
          "Si ya planificas con Google Maps: Google Gemini y el Modo IA del buscador",
          "Para planificar y reservar en el mismo sitio: Mindtrip",
          "Para planificar chateando, con ayuda humana opcional: Layla",
          "Para planificar sobre un mapa con amigos: Wanderlog",
          "Para un itinerario sencillo guardado en PDF: Wonderplan",
          "Si ya reservas con Trip.com: TripGenie",
          "Para un plan gratis sin registro y con presupuesto estimado: AIFlyTrip",
        ],
      },
      {
        heading: "Cómo los comparamos",
        paragraphs: [
          "Revisamos la web y las páginas de ayuda de cada herramienta en octubre de 2026 y nos hicimos las mismas preguntas con todas: qué crea, qué se puede hacer gratis, si necesitas cuenta, si puedes editar el plan, si muestra un mapa y si puedes reservar desde ella. No damos puntuaciones, porque las funciones y lo que se ofrece gratis cambian a menudo. Comprueba los planes actuales en la web de cada herramienta antes de contar con una función.",
          "Una nota sobre imparcialidad: AIFlyTrip publica esta guía y nuestro planificador es una de las herramientas de la lista. Lo describimos igual que a las demás, incluido lo que no hace.",
        ],
        bullets: [],
      },
      {
        heading: "ChatGPT: para un primer borrador rápido",
        paragraphs: [
          "Un asistente de IA general suele ser la forma más rápida de tener un plan aproximado. Describe tu viaje en una o dos frases y obtienes un borrador día a día que puedes ir cambiando al responder. Maneja bien peticiones poco habituales, como un viaje tranquilo con un niño pequeño o una ruta pensada alrededor de trayectos en tren.",
          "A cambio, es una conversación, no un planificador. No hay un mapa de tus días ni reservas, y detalles como los días de apertura o los tiempos de trayecto pueden estar desactualizados si la herramienta no consulta la web. Úsalo para dar forma a las ideas y luego comprueba los detalles.",
        ],
        bullets: [],
      },
      {
        heading: "Google Gemini y el Modo IA: si ya usas Google Maps",
        paragraphs: [
          "Google explica que Gemini usa Google Maps, Vuelos y Hoteles para crear itinerarios y tiene en cuenta el tiempo de trayecto entre lugares, y que el Modo IA del buscador puede crear un plan de viaje en un panel lateral a partir de una descripción breve. Si lo permites, Gemini también puede leer las confirmaciones de vuelo y hotel de Gmail y planificar alrededor de ellas.",
          "Los planes se pueden exportar a Google Docs o Gmail, o guardar como lista en Google Maps, algo práctico si te orientas con Maps durante el viaje. Las funciones cambian según el país y el idioma, y necesitas una cuenta de Google.",
        ],
        bullets: [],
      },
      {
        heading: "Mindtrip: para planificar y reservar en el mismo sitio",
        paragraphs: [
          "Mindtrip combina un chat con IA con una página de viaje que reúne tu itinerario, las ideas guardadas y las reservas. Puedes empezar con una pregunta, una foto o un enlace a un artículo o un vídeo, y te sugiere lugares, restaurantes y actividades que puedes añadir a tus días.",
          "Permite buscar y reservar vuelos, alojamiento y restaurantes desde el mismo sitio, y puedes planificar con amigos o familia. Planificar es gratis; creas un perfil para que aprenda tu forma de viajar.",
        ],
        bullets: [],
      },
      {
        heading: "Layla: para planificar chateando, con ayuda humana opcional",
        paragraphs: [
          "Layla convierte una conversación sobre tus ideas y preferencias en un plan de viaje. Según sus preguntas frecuentes, planificar es gratis, sin suscripción ni cargo por planificar, y solo pagas lo que decidas reservar.",
          "Puedes reservar tú mismo hoteles, vuelos, traslados y actividades, o pedir a uno de sus asesores de viaje humanos que se encargue. Encaja bien si quieres la rapidez de la IA pero prefieres que una persona intervenga en un viaje complicado.",
        ],
        bullets: [],
      },
      {
        heading: "Wanderlog: para planificar sobre un mapa con amigos",
        paragraphs: [
          "Wanderlog muestra el itinerario y un mapa uno al lado del otro, así que es fácil ver si un día va en zigzag por la ciudad. Varias personas pueden editar un viaje en tiempo real, y puede importar reservas de vuelos y hoteles, controlar gastos y dividirlos.",
          "La versión gratuita cubre el planificador básico. Algunos extras, como la optimización de rutas y más asistencia con IA, forman parte de su plan Pro de pago, así que revisa qué funciones necesitas antes de decidirte.",
        ],
        bullets: [],
      },
      {
        heading: "Wonderplan: para un itinerario sencillo guardado en PDF",
        paragraphs: [
          "Wonderplan genera un itinerario a medida a partir de tu destino, fechas, intereses y presupuesto, te deja reordenar el plan y descargarlo en PDF para tenerlo sin conexión. Se describe como gratuito, al menos por ahora.",
          "Necesitas iniciar sesión para usar todas sus funciones. Encaja con quien quiere un plan ordenado para imprimir o guardar, más que una aplicación completa de reservas.",
        ],
        bullets: [],
      },
      {
        heading: "TripGenie de Trip.com: si ya reservas con Trip.com",
        paragraphs: [
          "TripGenie es el asistente de IA de la aplicación y la web de Trip.com. Responde por texto o por voz, sugiere lugares que ver y donde comprar con mapas, imágenes y enlaces de reserva, y guarda un itinerario estructurado en tus viajes.",
          "Está pensado para reservar a través de Trip.com, así que encaja mejor si ya usas esa web para vuelos y hoteles.",
        ],
        bullets: [],
      },
      {
        heading:
          "AIFlyTrip: para un plan gratis sin registro y con presupuesto estimado",
        paragraphs: [
          "AIFlyTrip convierte tu destino, fechas, presupuesto, ritmo e intereses en un itinerario día a día agrupado por zonas, con un vuelo sugerido y una estimación del coste total del viaje. Puedes crear un plan sin cuenta; solo la necesitas para guardar planes entre dispositivos o para comprar el PDF imprimible opcional, que es el único extra de pago.",
          "Lo que no hace: AIFlyTrip no reserva vuelos ni hoteles, y sus opciones de vuelo vienen por ahora de un entorno de pruebas, así que son ejemplos para planificar y no tarifas reales. Es una herramienta de planificación, así que combínala con una aerolínea o una web de reservas cuando vayas a comprar. Puedes probar el [planificador de viajes con IA](/es/planificar) con tus fechas.",
        ],
        bullets: [],
      },
      {
        heading:
          "Cómo sacar un mejor itinerario de cualquier planificador con IA",
        paragraphs: [
          "Todas las herramientas dan mejores resultados cuanto más les cuentas. Una petición vaga da un plan genérico; una concreta da un plan que puedes usar de verdad.",
        ],
        bullets: [
          "Indica las fechas, las horas de llegada y salida y dónde te alojas",
          "Di tu ritmo: una o dos cosas principales al día, o todo lo posible",
          "Nombra tus imprescindibles, las pocas cosas que harían que el viaje mereciera la pena",
          "Menciona limitaciones como movilidad, niños, dieta o un presupuesto diario",
          "Pide que agrupe cada día por zonas e incluya el tiempo de trayecto entre lugares",
          "Pide una alternativa para cada día por si llueve o algo está cerrado",
        ],
      },
      {
        heading: "Qué comprobar antes de fiarte de un itinerario hecho con IA",
        paragraphs: [
          "Los planificadores con IA son buenos con la estructura y las ideas, pero pueden equivocarse en los detalles. Trata cualquier itinerario, incluido el nuestro, como un borrador y confirma lo que te estropearía un día si estuviera mal. Nuestro [ejemplo de itinerario de viaje](/es/blog/ejemplo-de-itinerario-de-viaje) muestra cómo es un plan realista, con un ejemplo completo.",
        ],
        bullets: [
          "Días y horarios de apertura, en la web oficial de cada atracción",
          "Si un lugar necesita entrada con hora reservada de antemano",
          "Tiempos de trayecto reales, sobre todo en excursiones y cambios de ciudad",
          "Precios actuales, que las herramientas de IA a menudo estiman con datos antiguos",
          "Requisitos de entrada para tu nacionalidad, en fuentes oficiales",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Cuál es el mejor planificador de viajes con IA gratis?",
        answer:
          "Depende de cómo planifiques. ChatGPT y Google Gemini son los mejores para un borrador rápido, Wanderlog para planificar sobre un mapa con amigos, Mindtrip y Layla para planificar y reservar a la vez, y AIFlyTrip para un plan día a día gratis con presupuesto estimado y sin registro.",
      },
      {
        question: "¿Hay algún planificador de viajes con IA totalmente gratis?",
        answer:
          "Varios permiten planificar gratis. Layla dice que planificar no tiene suscripción ni cargo, Mindtrip es gratuito y AIFlyTrip permite crear planes sin cuenta. Otros, como Wanderlog, tienen una versión gratuita con algunas funciones en un plan de pago.",
      },
      {
        question:
          "¿Puede un planificador con IA reservar mis vuelos y hoteles?",
        answer:
          "Algunos sí. Mindtrip, Layla y TripGenie de Trip.com conectan la planificación con la reserva. Otros, como ChatGPT, Wonderplan y AIFlyTrip, te ayudan a planificar, y reservas tú con una aerolínea o una web de reservas.",
      },
      {
        question: "¿Puede la IA planificar un viaje por carretera?",
        answer:
          "Sí, los asistentes generales como ChatGPT y Gemini pueden preparar una ruta con paradas y días de conducción, y los planificadores con mapa te ayudan a ver el recorrido. Comprueba siempre los tiempos reales de conducción y los horarios en una aplicación de mapas antes de salir.",
      },
      {
        question: "¿Son fiables los planificadores de viajes con IA?",
        answer:
          "Son buenos con la estructura y las sugerencias, pero pueden fallar en detalles como los días de apertura, los precios o los tiempos de trayecto. Usa el plan como borrador y confirma todo lo que dependa de fechas en fuentes oficiales antes de viajar.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "ejemplo-de-itinerario-de-viaje",
        "como-planificar-un-viaje",
        "cuantos-dias-de-viaje",
      ],
    },
    sources: [
      SOURCES.googleGeminiTrips,
      SOURCES.mindtrip,
      SOURCES.laylaFaq,
      SOURCES.wanderlog,
      SOURCES.wonderplan,
      SOURCES.tripGenie,
    ],
  },
  {
    slug: "cuanto-tiempo-de-escala-necesito",
    locale: "es",
    translationOf: "how-much-layover-time-do-you-need",
    photo: "layover",
    category: "flights",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    title: "¿Cuánto tiempo de escala necesito entre vuelos?",
    description:
      "Cómo saber si una conexión entre vuelos es segura: control de pasaportes, cambio de terminal, maletas facturadas, billetes separados y qué pasa si la pierdes.",
    headline: "¿Cuánto tiempo de escala necesitas?",
    intro:
      "Una conexión corta parece perfecta al reservar y se ve muy distinta cuando tu primer vuelo aterriza veinte minutos tarde. No hay un número exacto que valga para todo, pero sí una forma fiable de saber si una escala es cómoda, justa o una apuesta. Esta guía te la explica.",
    sections: [
      {
        heading: "Empieza por lo que permite la aerolínea",
        paragraphs: [
          "Los aeropuertos y las aerolíneas fijan un tiempo mínimo de conexión para cada aeropuerto, según lo que se tarda normalmente en pasar de un vuelo a otro. Cuando reservas vuelos con escala en un único billete, el itinerario que te ofrecen ya debería cumplir ese mínimo.",
          "El mínimo es exactamente eso: el tiempo más corto que suele funcionar cuando todo va bien. No tiene en cuenta un aterrizaje con retraso, una cola larga en el control de pasaportes o una puerta al otro extremo de una terminal enorme. Tómalo como el suelo, no como el objetivo.",
        ],
        bullets: [],
      },
      {
        heading: "Qué se come tu tiempo de conexión",
        paragraphs: [
          "Repasa lo que de verdad tienes que hacer entre vuelos. Cada paso añade tiempo, y en algunos aeropuertos tendrás que hacer varios.",
        ],
        bullets: [
          "Cambiar de terminal, sobre todo si hay que coger un tren o un autobús entre ellas",
          "Pasar el control de pasaportes, por ejemplo al entrar en el espacio Schengen o salir de él",
          "Volver a pasar el control de seguridad, algo que muchos aeropuertos exigen en las conexiones",
          "Recoger y volver a facturar el equipaje, algo obligatorio en el primer punto de entrada de algunos países, como Estados Unidos",
          "Las distancias a pie en aeropuertos muy grandes, y el cierre del embarque bastante antes de la salida",
        ],
      },
      {
        heading: "¿Un único billete o billetes separados?",
        paragraphs: [
          "Esto importa más que los minutos. Con un único billete, la aerolínea es responsable de llevarte a tu destino final. Si el primer vuelo se retrasa y pierdes la conexión, normalmente te recolocará en el siguiente vuelo disponible sin coste.",
          "Con billetes separados, la segunda aerolínea no tiene ninguna obligación de esperarte ni de recolocarte, y puede que tengas que comprar un billete nuevo. Si combinas billetes separados para ahorrar, deja un margen mucho mayor y piensa si perder el vuelo costaría más de lo que ahorras. Nuestra guía sobre [vuelos con billetes separados](/es/blog/vuelos-con-billetes-separados) explica los riesgos con detalle.",
        ],
        bullets: [],
      },
      {
        heading: "Cuándo añadir más tiempo",
        paragraphs: [
          "Date más margen si se cumple alguna de estas situaciones: es tu primera vez en ese aeropuerto, tienes que pasar control de pasaportes o volver a facturar, viajas con niños o necesitas asistencia, el primer vuelo suele llegar tarde o vuelas en una época de mucho tráfico.",
          "Los vuelos de largo radio también aterrizan con menos puntualidad que los cortos, y una cola larga en inmigración puede comerse buena parte de la conexión. Si el siguiente vuelo del día sale muchas horas después, perder la conexión se convierte en una espera larga, otra razón para elegir una escala más holgada.",
        ],
        bullets: [],
      },
      {
        heading: "Cómo aprovechar una conexión corta",
        paragraphs: [
          "Si tu conexión va justa, un poco de preparación ayuda. Elige un asiento en la parte delantera del avión si puedes, lleva un bulto que puedas subir a cabina y consulta antes de salir de casa las terminales de llegada y salida de ambos vuelos.",
          "Al aterrizar, mira las pantallas de salidas enseguida en lugar de fiarte de la puerta impresa en la tarjeta de embarque, porque las puertas cambian. Sigue las indicaciones de conexiones o tránsitos del aeropuerto, que suelen ser más rápidas que salir por llegadas.",
        ],
        bullets: [],
      },
      {
        heading: "Si pierdes la conexión",
        paragraphs: [
          "Con un único billete, ve directamente al mostrador de conexiones o de atención al cliente de la aerolínea, o usa su aplicación, para que te recoloquen. Guarda las tarjetas de embarque y los recibos de comida o alojamiento.",
          "Según dónde vueles y la causa del retraso, puedes tener derecho a asistencia, como comida y hotel, y en algunos casos a una compensación. Según las normas europeas, se valora por el retraso con el que llegas a tu destino final. Nuestra guía sobre [qué hacer si pierdes un vuelo de conexión](/es/blog/perder-un-vuelo-de-conexion) explica los pasos y tus derechos.",
        ],
        bullets: [],
      },
      {
        heading: "Elegir una escala que puedas disfrutar",
        paragraphs: [
          "Una escala larga no siempre es tiempo perdido. Unas horas dan para comer tranquilo y estirar las piernas, y algunos viajeros eligen a propósito una parada larga para partir un viaje de largo radio. Si estás comparando, mira el tiempo total del viaje, el precio y lo estresante que sería la conexión si algo se retrasa.",
          "Cuando tengas los vuelos, nuestro [planificador de viajes con IA](/es/planificar) organiza el resto del viaje según tu hora de llegada, y nuestra guía sobre [los cargos de las aerolíneas de bajo coste](/es/blog/cargos-de-las-aerolineas-de-bajo-coste) te ayuda si la conexión incluye una aerolínea de bajo coste.",
        ],
        bullets: [],
      },
      {
        heading: "Una forma rápida de valorar cualquier escala",
        paragraphs: [
          "Cuando compares opciones, hazte cuatro preguntas sobre cada conexión. ¿Es con un único billete? ¿Cambias de terminal o pasas control de pasaportes? ¿Tienes que recoger y volver a facturar el equipaje? ¿Y cada cuánto sale el siguiente vuelo a tu destino si pierdes este?",
          "Si las respuestas son un único billete, misma terminal, sin control de pasaportes, sin maletas y vuelos frecuentes, una conexión corta suele bastar. Cada respuesta en sentido contrario es un motivo para añadir tiempo. Nuestro [comprobador de tiempo de escala](/es/herramientas/tiempo-de-escala) gratuito repasa estas preguntas por ti.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Basta con una escala de una hora?",
        answer:
          "Puede bastar en un aeropuerto pequeño, con un único billete y sin control de pasaportes ni equipaje que volver a facturar. En conexiones internacionales, con cambio de terminal o con billetes separados, una hora suele ir justa, así que deja más tiempo.",
      },
      {
        question: "¿Tengo que recoger las maletas durante la escala?",
        answer:
          "Con un único billete, el equipaje suele ir facturado hasta el destino final. Algunos países, como Estados Unidos, obligan a recogerlo y volver a facturarlo en el primer punto de entrada, así que compruébalo para tu ruta.",
      },
      {
        question: "¿Qué pasa si pierdo una conexión con billetes separados?",
        answer:
          "La segunda aerolínea normalmente no tiene obligación de recolocarte, así que puede que tengas que comprar un billete nuevo. Por eso las conexiones con billetes separados necesitan mucho más margen que los vuelos reservados juntos.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "perder-un-vuelo-de-conexion",
        "vuelos-con-billetes-separados",
        "como-encontrar-vuelos-baratos",
        "como-combatir-el-jet-lag",
      ],
    },
    sources: [SOURCES.euAirRightsEs, SOURCES.eu261Es, SOURCES.aesaPassengers],
  },
  {
    slug: "perder-un-vuelo-de-conexion",
    locale: "es",
    translationOf: "missed-connecting-flight",
    photo: "layover",
    category: "flights",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    title: "¿Has perdido un vuelo de conexión? Qué hacer y tus derechos",
    description:
      "Qué hacer si pierdes un vuelo de conexión: a quién acudir primero, cómo te recolocan con un único billete o con billetes separados y tus derechos de asistencia.",
    headline: "Has perdido tu vuelo de conexión: qué hacer ahora",
    intro:
      "Perder una conexión es estresante, pero lo que pasa después sigue reglas bastante previsibles. Lo que más importa es si los vuelos estaban en un único billete y por qué perdiste el segundo. Esta guía te lleva paso a paso por la primera hora y después explica qué puedes esperar de la aerolínea y qué puedes reclamar.",
    sections: [
      {
        heading: "Los primeros diez minutos",
        paragraphs: [
          "Actúa rápido, porque las plazas del siguiente vuelo son para quien las pide primero. Si todavía vas en el primer vuelo retrasado, avisa a la tripulación de que tienes una conexión justa; a veces saben si van a esperar al siguiente vuelo o de qué puerta sale.",
          "En cuanto bajes del avión, haz varias cosas a la vez en lugar de una detrás de otra.",
        ],
        bullets: [
          "Mira la pantalla de salidas: puede que tu siguiente vuelo también vaya con retraso",
          "Abre la aplicación de la aerolínea, que a menudo ofrece un vuelo nuevo antes que cualquier agente",
          "Ponte en la cola del mostrador de conexiones o de atención al cliente",
          "Llama a la aerolínea mientras esperas, porque el centro de atención también puede recolocarte",
          "Guarda todas las tarjetas de embarque y haz una foto de la pantalla de salidas",
        ],
      },
      {
        heading: "¿Un único billete o billetes separados?",
        paragraphs: [
          "Si los dos vuelos están en la misma reserva, con un único localizador, la aerolínea te ha vendido un viaje hasta tu destino final y es responsable de llevarte. Cuando su propio retraso te hace perder la conexión, normalmente te pondrá en el siguiente vuelo disponible sin coste.",
          "Si compraste dos billetes separados, cada aerolínea solo responde de su propio vuelo. La segunda normalmente te tratará como un pasajero que no se presentó, y puede que tengas que comprar un billete nuevo. Nuestra guía sobre [cuánto tiempo de escala necesitas](/es/blog/cuanto-tiempo-de-escala-necesito) explica por qué los billetes separados necesitan mucho más margen.",
        ],
        bullets: [],
      },
      {
        heading: "Cómo conseguir que te recoloquen",
        paragraphs: [
          "Antes de llegar al mostrador, busca los vuelos que te vendrían bien, incluidos los de aerolíneas asociadas y los que van a aeropuertos cercanos. Los agentes están desbordados, y un pasajero que sabe qué vuelo quiere a menudo lo consigue.",
          "Pregunta qué opciones hay si el siguiente vuelo sale muchas horas después o al día siguiente. Según la aerolínea y las normas aplicables, pueden incluir otra ruta, otra aerolínea o el reembolso de la parte no utilizada si el viaje ya no tiene sentido. Pregunta también por tu maleta facturada: con un único billete debería seguirte al nuevo vuelo, pero conviene confirmarlo.",
        ],
        bullets: [],
      },
      {
        heading: "Tus derechos en la Unión Europea",
        paragraphs: [
          "Las normas de la Unión Europea protegen a los pasajeros de vuelos que salen de un aeropuerto de la UE y de vuelos que llegan a la UE con una aerolínea europea. En los vuelos con conexión vendidos en una única reserva, lo que cuenta es el retraso con el que llegas a tu destino final, no la duración del primer retraso.",
          "Mientras esperas, la aerolínea debe atenderte: comida y bebida en proporción a la espera, hotel y transporte hasta él si tienes que pasar la noche, y una forma de comunicarte. Si llegas a tu destino final con tres horas o más de retraso, también puedes tener derecho a una compensación fija, salvo que la causa escape al control de la aerolínea, como un temporal. Las páginas oficiales enlazadas abajo explican las condiciones y los importes.",
        ],
        bullets: [],
      },
      {
        heading: "Tus derechos fuera de la UE",
        paragraphs: [
          "Fuera de la Unión Europea, cada país tiene sus propias normas. En Estados Unidos, por ejemplo, no existe un derecho legal general a compensación por un retraso o una conexión perdida; lo que recibes depende de los compromisos de cada aerolínea, que suelen incluir la recolocación y, en retrasos causados por ella, comida u hotel.",
          "Algunos viajes internacionales están cubiertos además por convenios que permiten reclamar los perjuicios causados por un retraso. Si tienes dudas, pide a la aerolínea su política por escrito y consulta la autoridad de aviación del país desde el que vuelas.",
        ],
        bullets: [],
      },
      {
        heading: "Si no fue culpa de la aerolínea",
        paragraphs: [
          "A veces el primer vuelo llegó a su hora y aun así perdiste la conexión, por una cola larga en pasaportes, un control de seguridad lento o simplemente por perderte. Con un único billete, acude igualmente a la aerolínea. Muchas te pasarán a un vuelo posterior, a veces sin coste y a veces con un cargo, porque la conexión que te vendieron debía ser viable.",
          "Si viajabas con billetes separados, revisa si tu seguro de viaje cubre la pérdida de conexión y qué tiempo mínimo exige entre vuelos. Algunas pólizas excluyen las conexiones que organizas tú. Nuestra guía sobre el [seguro de viaje](/es/blog/seguro-de-viaje-que-cubre) explica qué mirar en la póliza.",
        ],
        bullets: [],
      },
      {
        heading: "Cómo reclamar después",
        paragraphs: [
          "Las reclamaciones se presentan a la aerolínea que operó el vuelo retrasado. Usa el formulario de su web y cuenta los hechos con claridad: localizador, números de vuelo, horas de llegada previstas y reales a tu destino final y qué pides.",
          "Si la aerolínea lo rechaza o no responde, normalmente puedes acudir a un servicio de resolución de conflictos o al organismo nacional competente; en España es la Agencia Estatal de Seguridad Aérea (AESA). No necesitas una empresa de reclamaciones, y usarla supone renunciar a parte de lo que recibas.",
        ],
        bullets: [
          "Las tarjetas de embarque y la confirmación de la reserva",
          "Los recibos de comidas, transporte y alojamiento",
          "Cualquier mensaje de la aerolínea con el motivo del retraso",
          "Una nota de tu hora real de llegada",
        ],
      },
      {
        heading: "Cómo reducir el riesgo la próxima vez",
        paragraphs: [
          "Reserva las conexiones en un único billete siempre que puedas, evita que el segundo trayecto sea el último vuelo del día y deja más tiempo cuando tengas que pasar control de pasaportes o cambiar de terminal. Nuestro [comprobador de tiempo de escala](/es/herramientas/tiempo-de-escala) te ayuda a saber si una conexión es cómoda, justa o arriesgada antes de reservarla.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Me recolocará gratis la aerolínea si pierdo la conexión?",
        answer:
          "Si los dos vuelos estaban en un único billete y el retraso de la aerolínea te hizo perder el segundo, normalmente te recolocará sin coste. Con billetes separados, la segunda aerolínea no tiene obligación de ayudarte y puede que tengas que comprar un billete nuevo.",
      },
      {
        question: "¿Tengo derecho a compensación por perder una conexión?",
        answer:
          "Según las normas europeas puedes tenerlo si los vuelos estaban en una única reserva, llegaste a tu destino final con tres horas o más de retraso y la causa dependía de la aerolínea. Fuera de la UE depende de las normas de cada país y de los compromisos de la aerolínea.",
      },
      {
        question: "¿Qué pasa con mi maleta facturada si pierdo la conexión?",
        answer:
          "Con un único billete, la maleta normalmente se envía en el vuelo al que te recolocan, aunque puede llegar más tarde que tú. Pide al agente que lo confirme y, si no aparece, denúncialo en el mostrador de equipajes antes de salir del aeropuerto.",
      },
      {
        question: "¿Tiene que pagarme el hotel la aerolínea?",
        answer:
          "Según las normas europeas, sí, cuando tienes que pasar la noche esperando el vuelo al que te han recolocado, junto con el transporte hasta el hotel. En otros lugares depende de la política de la aerolínea y de si causó el retraso, así que pregunta en el mostrador.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "cuanto-tiempo-de-escala-necesito",
        "vuelos-con-billetes-separados",
        "seguro-de-viaje-que-cubre",
        "cargos-de-las-aerolineas-de-bajo-coste",
      ],
    },
    sources: [SOURCES.euAirRightsEs, SOURCES.eu261Es, SOURCES.aesaPassengers],
  },
  {
    slug: "vuelos-con-billetes-separados",
    locale: "es",
    translationOf: "self-transfer-flights",
    photo: "flight-tips",
    category: "flights",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    title: "Vuelos con billetes separados: ¿merece la pena el riesgo?",
    description:
      "Qué es un vuelo «self-transfer» con billetes separados, en qué se diferencia de una escala normal, sus riesgos con maletas y fronteras, y cuándo compensa.",
    headline: "Vuelos con billetes separados: qué son y cuándo merecen la pena",
    intro:
      "Al buscar un vuelo a veces aparece una opción marcada como «self-transfer» o «conexión por tu cuenta» mucho más barata que el resto. Significa que el viaje está formado por billetes separados y que asumes un riesgo que normalmente asume la aerolínea. A veces compensa. Esta guía explica qué cambia, qué puede salir mal y cómo decidir.",
    sections: [
      {
        heading: "Qué es un vuelo con billetes separados",
        paragraphs: [
          "En una escala normal, una aerolínea o un grupo de aerolíneas asociadas te vende todo el viaje en un único billete. Un «self-transfer» une dos o más billetes que no tienen nada que ver entre sí, a menudo de aerolíneas distintas. Puedes montarlo tú o puede montarlo una web de reservas y vendértelo como un solo viaje.",
          "El precio puede ser más bajo porque combina aerolíneas que no trabajan juntas, como dos de bajo coste. Pero para cada aerolínea eres simplemente un pasajero de su propio vuelo. Ninguna sabe nada de la otra ni responde por ella.",
        ],
        bullets: [],
      },
      {
        heading: "Qué cambia respecto a una escala normal",
        paragraphs: [
          "La diferencia no es solo quién paga si algo sale mal. Varias cosas que la aerolínea gestiona sin que lo notes en una escala normal pasan a ser cosa tuya.",
        ],
        bullets: [
          "Equipaje: lo recoges en el aeropuerto de conexión y lo vuelves a facturar para el siguiente vuelo",
          "Facturación: facturas por separado cada vuelo, y la entrega de equipaje del segundo cierra bastante antes de la salida",
          "Frontera: recoger el equipaje suele implicar entrar en el país, así que necesitas poder entrar",
          "Seguridad: vuelves a pasar el control como cualquier pasajero que sale",
          "Retrasos: si el primer vuelo llega tarde, la segunda aerolínea no te esperará ni te recolocará",
        ],
      },
      {
        heading: "La trampa de los requisitos de entrada",
        paragraphs: [
          "Es el riesgo que más se pasa por alto. En una escala normal a menudo puedes quedarte en la zona de tránsito sin entrar formalmente en el país. Con billetes separados normalmente tienes que pasar el control de pasaportes para llegar a la sala de recogida de equipajes y a los mostradores de facturación, lo que significa cumplir los requisitos de entrada de ese país aunque solo vayas a estar dos horas.",
          "Comprueba antes de comprar los requisitos oficiales de entrada y tránsito del país de conexión para tu pasaporte. La primera aerolínea también puede negarse a llevarte si no los cumples. Nuestra guía sobre el [billete de salida del país](/es/blog/billete-de-salida-del-pais) explica cómo revisan las aerolíneas los documentos en el mostrador.",
        ],
        bullets: [],
      },
      {
        heading: "Qué pasa si el primer vuelo llega tarde",
        paragraphs: [
          "Si pierdes el segundo vuelo, ese billete normalmente se pierde. Compras uno nuevo al precio que tenga ese día, y los vuelos posteriores de esa misma reserva pueden cancelarse también. Los derechos de los pasajeros siguen aplicándose al vuelo retrasado, pero solo a ese vuelo, y no cubren el billete separado que perdiste.",
          "Nuestra guía sobre [qué hacer si pierdes un vuelo de conexión](/es/blog/perder-un-vuelo-de-conexion) explica los pasos en el aeropuerto en ambos casos.",
        ],
        bullets: [],
      },
      {
        heading: "Garantías y seguros",
        paragraphs: [
          "Algunas webs que venden viajes con billetes separados incluyen una garantía para recolocarte o reembolsarte si un retraso rompe la conexión. Es una promesa del vendedor, no de la aerolínea, así que lee las condiciones: qué retrasos cubre, cómo tienes que contactar con ellos y si te dan un vuelo nuevo o solo te devuelven el dinero.",
          "Los seguros de viaje a veces cubren la pérdida de conexión, pero las pólizas a menudo excluyen las conexiones que organizas tú o exigen un tiempo mínimo entre vuelos. Revisa la redacción y, si no está clara, pregunta a la aseguradora por escrito antes de contar con ello.",
        ],
        bullets: [],
      },
      {
        heading: "Cuándo compensa un vuelo con billetes separados",
        paragraphs: [
          "Es una opción razonable cuando el ahorro es real y perder la conexión sería una molestia, no un desastre.",
          "Es una mala opción cuando tienes que llegar un día concreto, por una boda, la salida de un crucero o un circuito, o cuando el vuelo siguiente es el único en un día o más.",
        ],
        bullets: [
          "El ahorro es grande comparado con lo que costaría un billete de sustitución",
          "Tienes muchas horas entre vuelos, o haces noche",
          "Los dos vuelos usan el mismo aeropuerto, a ser posible la misma terminal",
          "Viajas solo con equipaje de mano",
          "Hay varios vuelos posteriores que podrías coger en su lugar",
          "Puedes entrar sin problemas en el país de conexión",
        ],
      },
      {
        heading: "Cómo hacerlo más seguro",
        paragraphs: [
          "Deja mucho más tiempo que en una escala normal. No hay un número exacto, porque depende del aeropuerto, de las colas de pasaportes y de si llevas maletas, pero varias horas es un punto de partida sensato, y hacer noche es lo más seguro en cualquier viaje importante. Nuestro [comprobador de tiempo de escala](/es/herramientas/tiempo-de-escala) te deja probar una conexión marcando billetes separados.",
          "Convertir el hueco en una parada suele ser la mejor solución: reserva el segundo vuelo para el día siguiente y disfruta de una tarde en la ciudad de conexión. Nuestra guía sobre [cómo encontrar vuelos baratos](/es/blog/como-encontrar-vuelos-baratos) explica cómo comparar el coste total frente a una escala normal, incluido el equipaje en ambas aerolíneas.",
        ],
        bullets: [
          "Factura online los dos vuelos antes de salir de casa",
          "Conoce la terminal de cada vuelo y cómo ir de una a otra",
          "Revisa las normas y los precios del equipaje de las dos aerolíneas, no solo de una",
          "Elige una tarifa flexible para el segundo vuelo si la diferencia de precio es pequeña",
          "Guarda los dos localizadores donde puedas verlos sin conexión",
        ],
      },
    ],
    faqs: [
      {
        question: "¿Qué significa «self-transfer» en una reserva de vuelo?",
        answer:
          "Significa que el viaje está formado por billetes separados en lugar de un único billete con escala. Recoges tu equipaje, vuelves a facturar para el siguiente vuelo y asumes tú el riesgo si un retraso te hace perderlo.",
      },
      {
        question: "¿Tengo que recoger las maletas con billetes separados?",
        answer:
          "Sí, casi siempre. Como los billetes son independientes, tu maleta solo va facturada hasta el aeropuerto de conexión. La recoges allí, lo que normalmente implica pasar el control de pasaportes, y la vuelves a facturar con la siguiente aerolínea.",
      },
      {
        question: "¿Cuánto tiempo debo dejar con billetes separados?",
        answer:
          "Mucho más que en una escala normal. Deja varias horas como punto de partida, más si llevas maletas facturadas o tienes que pasar control de pasaportes, y plantéate hacer noche en cualquier viaje en el que llegar a tiempo sea importante.",
      },
      {
        question:
          "¿Estoy protegido si pierdo una conexión con billetes separados?",
        answer:
          "No por las aerolíneas. La segunda normalmente te tratará como un pasajero que no se presentó. Puede cubrirte una garantía de la web que te vendió el viaje o un seguro de viaje, pero solo dentro de sus condiciones.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "perder-un-vuelo-de-conexion",
        "cuanto-tiempo-de-escala-necesito",
        "como-encontrar-vuelos-baratos",
        "billete-de-salida-del-pais",
      ],
    },
    sources: [SOURCES.euAirRightsEs, SOURCES.aesaPassengers, SOURCES.iata],
  },
];
