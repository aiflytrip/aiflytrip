import { type GuideSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type PostInput = z.input<typeof GuideSchema>;

/**
 * Spanish editions of the travel hacks batch, written for Spanish-speaking
 * readers rather than translated line by line. Each shares its English
 * post's publish date. Passenger rights are described in general terms
 * only; amounts, deadlines and eligibility come from the official sources.
 */
export const spanishHackPosts: PostInput[] = [
  {
    slug: "trucos-de-viaje-que-funcionan",
    locale: "es",
    translationOf: "travel-hacks-that-work",
    photo: "flight-tips",
    category: "planning",
    status: "published",
    publishAt: "2026-11-09",
    lastReviewed: "2026-11-09",
    title: "Trucos de viaje que funcionan de verdad (y los que no)",
    description:
      "Trucos de viaje prácticos para pagar menos por los vuelos, viajar ligero, pasar el aeropuerto sin estrés y planificar mejor, y los que casi nunca funcionan.",
    headline: "Trucos de viaje que funcionan de verdad",
    intro:
      "Internet está lleno de trucos de viaje, y muchos son mitos que se repiten una y otra vez. Los que reunimos aquí sí aguantan la prueba: hábitos sencillos que ahorran dinero, tiempo o nervios en casi cualquier viaje. Ninguno exige una estrategia de puntos ni una tarjeta especial, y al final repasamos algunos trucos populares que no suelen merecer la pena.",
    sections: [
      {
        heading: "Al reservar los vuelos",
        paragraphs: [
          "El mayor ahorro viene de la flexibilidad, no de webs secretas. Si puedes mover el viaje uno o dos días, o volar a otro aeropuerto de la misma zona, verás muchas más opciones que buscando una sola fecha y un solo aeropuerto. Nuestra guía sobre [cómo encontrar vuelos baratos](/es/blog/como-encontrar-vuelos-baratos) explica el método paso a paso.",
          "Compara siempre el precio total, no la tarifa del anuncio. Un billete barato que cobra aparte la maleta de cabina y el asiento puede salir más caro que una tarifa más completa en otra aerolínea. Nuestra [calculadora del coste del equipaje](/es/herramientas/coste-del-equipaje) te ayuda a comparar en igualdad de condiciones antes de pagar.",
        ],
        bullets: [
          "Busca un rango de fechas en lugar de un solo día",
          "Mira aeropuertos cercanos tanto en el origen como en el destino",
          "Suma el equipaje y los asientos que de verdad necesitas antes de comparar",
          "Si el precio es el mismo, reserva con la aerolínea: los cambios son más fáciles",
          "Guarda una captura de las condiciones de la tarifa y del precio pagado",
        ],
      },
      {
        heading: "Al hacer la maleta",
        paragraphs: [
          "Viajar solo con equipaje de mano ahorra tiempo en los dos aeropuertos y elimina el riesgo de que se pierda la maleta. La clave es planificar los conjuntos en lugar de meter cosas «por si acaso»: elige una gama de colores para que todo combine, lleva puestos el calzado y la chaqueta más voluminosos y, en viajes largos, cuenta con hacer una pequeña colada.",
          "Comprueba las medidas y el peso que permite tu aerolínea antes de hacer la maleta, no en la puerta de embarque. Nuestro [comprobador de medidas del equipaje de mano](/es/herramientas/medidas-equipaje-de-mano) y la guía sobre [qué llevar en el equipaje de mano](/es/blog/que-llevar-en-el-equipaje-de-mano) lo hacen rápido, y la [lista de equipaje](/es/herramientas/lista-de-equipaje) crea una lista según el destino y la duración del viaje.",
        ],
        bullets: [
          "Lleva en cabina los medicamentos, los cargadores, los documentos y una muda",
          "Mete un localizador o una tarjeta con tus datos dentro de la maleta facturada",
          "Haz una foto de la maleta y de su contenido antes de facturarla",
        ],
      },
      {
        heading: "En el aeropuerto",
        paragraphs: [
          "Casi todo el estrés del aeropuerto viene de colas que no esperabas. Haz el check-in en línea, descarga la tarjeta de embarque en el móvil y guarda una captura por si la aplicación no carga. Coloca los líquidos y los aparatos electrónicos de forma que puedas sacarlos fácilmente si te lo piden, porque las normas cambian de un aeropuerto a otro.",
          "Deja tiempo suficiente para las conexiones. Una escala que parece eficiente en una web de reservas puede ser poco realista en un aeropuerto grande o si hay que cambiar de terminal. Nuestro [comprobador de tiempo de escala](/es/herramientas/tiempo-de-escala) te da un mínimo razonable para tu ruta.",
        ],
        bullets: [
          "Instala la aplicación de la aerolínea y activa los avisos del vuelo",
          "Lleva una botella vacía para llenarla después del control",
          "Apunta la puerta y la hora de embarque, no solo la de salida",
        ],
      },
      {
        heading: "El dinero en el extranjero",
        paragraphs: [
          "Cuando un datáfono o un cajero en el extranjero te ofrece cobrarte en tu propia moneda, normalmente es mejor elegir la moneda local. Esa oferta, llamada conversión dinámica de divisas, suele aplicar un tipo de cambio menos favorable. La guía de la UE sobre dinero y gastos al viajar explica cómo funcionan los cargos con tarjeta.",
          "Lleva dos tarjetas de pago y guárdalas en sitios distintos, y avisa a tu banco del viaje si te lo pide. Algo de efectivo en moneda local sigue siendo útil en muchos sitios para taxis, mercados y propinas.",
        ],
        bullets: [],
      },
      {
        heading: "Al planificar el viaje",
        paragraphs: [
          "El truco más infravalorado es planear menos cosas al día. Agrupa las visitas por barrios, reserva solo las atracciones que de verdad se agotan y deja huecos para descansar y para las sorpresas. Nuestro [ejemplo de itinerario de viaje](/es/blog/ejemplo-de-itinerario-de-viaje) muestra cómo hacerlo, y nuestro [planificador de viajes con IA](/es/planificar) prepara un plan día a día que puedes editar.",
          "Decide cuántos días necesitas antes de reservar. Un viaje demasiado corto se te va en traslados; nuestra herramienta [¿cuántos días necesito?](/es/herramientas/cuantos-dias) propone una duración realista para cada destino.",
        ],
        bullets: [],
      },
      {
        heading: "Trucos que no suelen funcionar",
        paragraphs: [
          "Algunos consejos populares están desfasados o son simples mitos. Buscar en modo incógnito para ver precios más bajos es un ejemplo habitual: las tarifas cambian constantemente porque se venden asientos, no porque una web te recuerde. Reservar un día concreto de la semana es otro; no hay un día más barato fiable para comprar.",
          "Saltarte el último tramo de un billete (lo que se conoce como hidden city) puede incumplir las condiciones de la aerolínea, hacer que te cancelen la vuelta y es imposible con maleta facturada. Las reservas de vuelo falsas para pedir un visado también son un riesgo serio; nuestra guía sobre la [reserva de vuelo para el visado](/es/blog/reserva-de-vuelo-para-visado) explica las alternativas legales.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Cuál es el mejor truco para encontrar vuelos más baratos?",
        answer:
          "La flexibilidad. Buscar en un rango de fechas y en aeropuertos cercanos, y comparar el precio total con equipaje y asientos incluidos, ahorra más que cualquier truco o web concreta.",
      },
      {
        question: "¿Buscar en modo incógnito abarata los vuelos?",
        answer:
          "No hay pruebas sólidas de que lo haga. Los precios cambian porque se venden asientos y se ajustan las tarifas, así que ver otro precio más tarde suele ser un movimiento normal de la tarifa, no un rastreo.",
      },
      {
        question: "¿Pago en moneda local o en euros cuando estoy fuera?",
        answer:
          "Normalmente en moneda local. Cuando el datáfono ofrece convertir el importe a tu moneda, el tipo de cambio que usa suele ser peor que el que aplicaría tu propio banco.",
      },
      {
        question: "¿Merece la pena viajar solo con equipaje de mano?",
        answer:
          "En viajes cortos suele merecer la pena: te ahorras la tarifa de la maleta facturada, no esperas en la cinta y no puedes perder una maleta. Comprueba antes las medidas y el peso que permite tu aerolínea.",
      },
    ],
    related: {
      guides: [
        "como-encontrar-vuelos-baratos",
        "que-llevar-en-el-equipaje-de-mano",
        "ejemplo-de-itinerario-de-viaje",
      ],
    },
    sources: [
      SOURCES.euCardChargesEs,
      SOURCES.euAirRightsEs,
      SOURCES.aesaPassengers,
    ],
  },
  {
    slug: "indemnizacion-por-retraso-de-vuelo",
    locale: "es",
    translationOf: "flight-delay-compensation",
    photo: "layover",
    category: "flights",
    status: "published",
    publishAt: "2026-11-09",
    lastReviewed: "2026-11-09",
    title: "Vuelo retrasado o cancelado: derechos y reclamación",
    description:
      "Qué hacer si tu vuelo se retrasa o se cancela: asistencia en el aeropuerto, reembolso o vuelo alternativo, la compensación en la UE y cómo reclamar.",
    headline: "Vuelo retrasado o cancelado: tus derechos y cómo reclamar",
    intro:
      "Un retraso largo o una cancelación pueden parecer algo que simplemente hay que aguantar, pero en muchos casos tienes derechos claros: que te atiendan en el aeropuerto, elegir entre el reembolso y otro vuelo y, a veces, recibir una compensación fija. Lo que te corresponde depende sobre todo de desde dónde vuelas, con qué aerolínea y por qué se produjo la incidencia.",
    sections: [
      {
        heading: "Lo primero, en el aeropuerto",
        paragraphs: [
          "En el aeropuerto tus prioridades son llegar a tu destino y conservar pruebas. Pregunta a la aerolínea qué está pasando y qué te ofrece, y usa su aplicación o su teléfono mientras haces cola, porque las plazas en otros vuelos se acaban rápido.",
        ],
        bullets: [
          "Guarda la tarjeta de embarque y la confirmación de la reserva",
          "Haz una foto de la pantalla de salidas con el retraso o la cancelación",
          "Apunta el motivo que da la aerolínea y cuándo lo da",
          "Guarda los tiques de comidas, transporte y hotel",
          "Anota la hora real de llegada a tu destino final",
        ],
      },
      {
        heading: "Qué normas se aplican a tu vuelo",
        paragraphs: [
          "En la Unión Europea, el Reglamento (CE) n.º 261/2004 cubre los vuelos que salen de un aeropuerto de la UE con cualquier aerolínea y los que llegan a la UE con una aerolínea europea. Son las normas a las que se refiere casi todo el mundo cuando habla de indemnización por retraso. El Reino Unido mantiene unas normas equivalentes desde su salida de la UE.",
          "En Estados Unidos no hay una compensación fija por retraso, aunque el Departamento de Transporte obliga a reembolsar el billete cuando la aerolínea cancela o cambia de forma importante el vuelo y decides no viajar. Otros países tienen sus propias normas, así que consulta siempre la información oficial del país desde el que vuelas.",
        ],
        bullets: [],
      },
      {
        heading: "Asistencia, reembolso y vuelo alternativo",
        paragraphs: [
          "Con las normas de la UE, cuando el retraso es lo bastante largo, la aerolínea debe atenderte mientras esperas: comida y bebida, un medio para comunicarte y, si tienes que pasar la noche, hotel y traslado. Si no lo hace, guarda los tiques de gastos razonables y reclámalos después.",
          "Si cancelan tu vuelo, normalmente puedes elegir entre el reembolso y un transporte alternativo hasta tu destino. No aceptes un bono si no lo quieres de verdad: tienes derecho a pedir que te devuelvan el dinero.",
        ],
        bullets: [],
      },
      {
        heading: "Cuándo te corresponde una compensación",
        paragraphs: [
          "Según las normas de la UE, puedes tener derecho a una compensación de importe fijo si llegas a tu destino final con varias horas de retraso o si te cancelan el vuelo con poca antelación. El importe depende de la distancia del vuelo y de cuánto tarde llegas, y las páginas oficiales de la UE indican los umbrales vigentes.",
          "No hay compensación cuando la incidencia se debe a circunstancias extraordinarias fuera del control de la aerolínea, como un temporal, restricciones del control aéreo o riesgos de seguridad. En cambio, las averías técnicas del avión suelen ser responsabilidad de la aerolínea, así que no te conformes con una explicación vaga.",
        ],
        bullets: [],
      },
      {
        heading: "Cómo reclamar",
        paragraphs: [
          "Reclama primero directamente a la aerolínea. Casi todas tienen un formulario en línea; incluye el localizador de la reserva, el número de vuelo, la fecha, lo que ocurrió y los tiques de los gastos. Sé breve y concreto.",
          "Si la aerolínea rechaza la reclamación o no contesta, puedes acudir al organismo oficial del país. En España es la Agencia Estatal de Seguridad Aérea (AESA), que explica en su web cómo presentar la reclamación. Las empresas de reclamaciones pueden hacerlo por ti, pero se quedan con una parte de la compensación, y a menudo puedes conseguir lo mismo por tu cuenta.",
        ],
        bullets: [
          "Reclama a la aerolínea que operó el vuelo",
          "Aporta pruebas del retraso y de tu hora de llegada",
          "Pide por escrito el motivo de la incidencia",
          "Acude al organismo oficial si la aerolínea se niega",
        ],
      },
      {
        heading: "Viajes combinados y otros transportes",
        paragraphs: [
          "Si el vuelo formaba parte de un viaje combinado, puedes tener protección adicional a través del organizador del viaje, además de la aerolínea. Los retrasos y cancelaciones en tren, autobús y barco tienen sus propios derechos de los pasajeros en la UE, así que consulta las normas de ese transporte si tu viaje continúa por tierra o por mar.",
        ],
        bullets: [],
      },
      {
        heading: "Conexiones perdidas y billetes separados",
        paragraphs: [
          "Si un retraso te hace perder una conexión de la misma reserva, tus derechos suelen calcularse según la hora de llegada a tu destino final. Si compraste billetes separados, la segunda aerolínea no tiene obligación de ayudarte. Nuestras guías sobre [perder un vuelo de conexión](/es/blog/perder-un-vuelo-de-conexion) y los [vuelos con billetes separados](/es/blog/vuelos-con-billetes-separados) explican la diferencia, y la guía del [seguro de viaje](/es/blog/seguro-de-viaje-que-cubre) cuenta qué puede añadir una póliza.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question:
          "¿Cuánto tiene que retrasarse un vuelo para tener compensación?",
        answer:
          "Con las normas de la UE, la compensación depende de con cuánto retraso llegas a tu destino final y de la distancia del vuelo. Las páginas oficiales de la UE y de AESA indican los umbrales y los importes vigentes.",
      },
      {
        question: "¿Me compensan si el retraso se debe al mal tiempo?",
        answer:
          "Normalmente no. Un temporal se considera una circunstancia extraordinaria según las normas de la UE. Aun así, la aerolínea debe atenderte mientras esperas y ofrecerte reembolso o un vuelo alternativo si cancela.",
      },
      {
        question: "¿Las aerolíneas de Estados Unidos compensan los retrasos?",
        answer:
          "En Estados Unidos no hay una compensación legal general por retraso. El Departamento de Transporte sí exige el reembolso cuando la aerolínea cancela o cambia de forma importante el vuelo y decides no viajar.",
      },
      {
        question: "¿Me conviene usar una empresa de reclamaciones?",
        answer:
          "Puedes hacerlo, pero se quedan con parte del dinero. Reclamar directamente a la aerolínea y, si no responde, acudir al organismo oficial es gratis y suele funcionar igual de bien en casos sencillos.",
      },
    ],
    related: {
      guides: [
        "perder-un-vuelo-de-conexion",
        "vuelos-con-billetes-separados",
        "seguro-de-viaje-que-cubre",
      ],
    },
    sources: [
      SOURCES.euAirRightsEs,
      SOURCES.eu261Es,
      SOURCES.aesaPassengers,
      SOURCES.usDotAirConsumer,
    ],
  },
  {
    slug: "que-hacer-si-pierden-tu-maleta",
    locale: "es",
    translationOf: "lost-luggage-what-to-do",
    photo: "airline-fees",
    category: "practical",
    status: "published",
    publishAt: "2026-11-14",
    lastReviewed: "2026-11-09",
    title: "Qué hacer si la aerolínea pierde tu maleta",
    description:
      "¿Tu maleta no ha llegado? Qué hacer antes de salir del aeropuerto, cómo reclamar lo imprescindible y qué hacer si llega dañada o se pierde del todo.",
    headline: "Qué hacer si la aerolínea pierde tu maleta",
    intro:
      "Ver cómo se para la cinta sin que aparezca tu maleta es uno de los peores momentos de un viaje. La buena noticia es que la mayoría de las maletas retrasadas aparecen en pocos días, y las aerolíneas tienen un procedimiento para localizarlas y cubrir lo que necesites mientras tanto. Lo que hagas en la primera hora facilita mucho todo lo demás.",
    sections: [
      {
        heading: "Antes de salir de la sala de recogida",
        paragraphs: [
          "No salgas del aeropuerto sin denunciar la falta de la maleta. Ve al mostrador de equipajes de la aerolínea en la zona de llegadas, que puede llevar una empresa de handling, y rellena el parte de irregularidad de equipaje (PIR). Te darán un número de referencia que necesitarás para seguir la maleta y para cualquier reclamación.",
        ],
        bullets: [
          "Ten a mano el resguardo de la etiqueta (suele ir pegado a la tarjeta de embarque)",
          "Describe la maleta: color, marca, tamaño y cualquier detalle que la distinga",
          "Da una dirección y un teléfono donde puedan entregártela",
          "Pregunta qué cubre la aerolínea mientras esperas y pídelo por escrito",
          "Guarda una copia o una foto del parte",
        ],
      },
      {
        heading: "Retrasada, dañada o perdida",
        paragraphs: [
          "Las aerolíneas tratan tres situaciones de forma distinta. Una maleta retrasada llega más tarde; la mayoría aparecen y te las llevan a casa o al hotel. Una maleta dañada llegó, pero rota o con el contenido estropeado. Una maleta perdida es la que la aerolínea no encuentra pasado un plazo; a partir de ese momento se considera perdida y puedes reclamar por el contenido.",
          "En los vuelos internacionales, la responsabilidad de la aerolínea se rige sobre todo por el Convenio de Montreal, que fija importes máximos y plazos estrictos para reclamar por escrito. Los plazos para maletas dañadas o retrasadas son cortos, así que denuncia el problema en el aeropuerto y consulta los plazos exactos en las páginas oficiales.",
        ],
        bullets: [],
      },
      {
        heading: "Comprar lo imprescindible mientras esperas",
        paragraphs: [
          "Si tu maleta se retrasa, normalmente puedes reclamar los gastos razonables en artículos básicos, como productos de aseo, una muda y un cargador del móvil. La clave está en «razonables»: compra lo que necesites para uno o dos días, no un armario nuevo, y guarda todos los tiques.",
          "Revisa también tu seguro de viaje y la tarjeta con la que pagaste. Muchas pólizas cubren el retraso del equipaje, a veces a partir de un mínimo de horas. Nuestra guía del [seguro de viaje](/es/blog/seguro-de-viaje-que-cubre) explica en qué fijarte.",
        ],
        bullets: [],
      },
      {
        heading: "Si la maleta llega dañada",
        paragraphs: [
          "Revisa la maleta antes de salir de la sala de recogida. Si tiene una rueda, un asa o una cremallera rota, o llega mojada o aplastada, denúncialo en el mostrador de equipajes en ese momento y pide el parte de daños. Haz fotos de la maleta y de lo que se haya estropeado antes de moverlo.",
          "Las aerolíneas suelen excluir el desgaste normal, como arañazos y pequeñas marcas, y pueden no pagar objetos frágiles o de valor que iban en el equipaje facturado. Normalmente ofrecen reparar la maleta, cambiarla o pagar una cantidad según su antigüedad y su valor, así que guarda la prueba de lo que te costó si puedes.",
        ],
        bullets: [
          "Denuncia el daño antes de salir del aeropuerto si es posible",
          "Fotografía la maleta, la etiqueta y el daño",
          "Guarda la maleta dañada hasta que se resuelva la reclamación",
        ],
      },
      {
        heading: "Billetes separados y vuelos con conexión",
        paragraphs: [
          "Cuando todos tus vuelos van en la misma reserva, suele encargarse del parte la última aerolínea con la que volaste, aunque la maleta la perdiera otra. Con billetes separados, denuncia el problema a la aerolínea con la que facturaste la maleta en ese tramo y guarda los datos de la reserva de cada vuelo.",
        ],
        bullets: [],
      },
      {
        heading: "Cómo presentar la reclamación",
        paragraphs: [
          "Envía la reclamación a la aerolínea por escrito, con su formulario en línea si lo tiene, e incluye la referencia del parte, los datos de la reserva, los tiques y una lista de lo que falta o se ha estropeado. Para objetos de valor, ayuda tener el comprobante de compra.",
          "Si la aerolínea rechaza la reclamación o no contesta, sigue su procedimiento de quejas y después acude al organismo oficial del país. En España es la Agencia Estatal de Seguridad Aérea (AESA), y la Unión Europea explica en su portal Tu Europa los derechos de los pasajeros en toda la UE.",
        ],
        bullets: [],
      },
      {
        heading: "Cómo evitar que se pierda la maleta",
        paragraphs: [
          "La mayoría de las maletas se extravían en las conexiones, sobre todo en las cortas. Deja tiempo suficiente para el transbordo y recuerda que, con billetes separados, a menudo tendrás que recoger y volver a facturar la maleta tú mismo. Nuestro [comprobador de tiempo de escala](/es/herramientas/tiempo-de-escala) te ayuda a calcular una conexión segura.",
          "Quita las etiquetas antiguas, pon tu nombre y tus datos dentro y fuera de la maleta y plantéate llevar un localizador para poder decir a la aerolínea dónde está. Lleva en cabina todo aquello de lo que no puedas prescindir; nuestra guía sobre [qué llevar en el equipaje de mano](/es/blog/que-llevar-en-el-equipaje-de-mano) repasa lo esencial.",
        ],
        bullets: [
          "Haz una foto de la maleta y de su contenido antes de facturar",
          "Lleva en cabina los medicamentos, los objetos de valor y los documentos",
          "Comprueba que la etiqueta lleva el código del aeropuerto de destino correcto",
        ],
      },
    ],
    faqs: [
      {
        question:
          "¿Cuánto tarda una aerolínea en encontrar una maleta perdida?",
        answer:
          "La mayoría de las maletas retrasadas aparecen y se entregan en pocos días. Si la aerolínea no la encuentra pasado un plazo, se considera perdida y puedes reclamar por el contenido. Pregunta a la aerolínea por sus plazos.",
      },
      {
        question:
          "¿Puedo reclamar la ropa que compro mientras espero la maleta?",
        answer:
          "Normalmente sí, si son artículos básicos y el gasto es razonable. Guarda los tiques y compra solo lo que necesites hasta que llegue la maleta. Tu seguro de viaje también puede cubrir el retraso del equipaje.",
      },
      {
        question:
          "¿Hay un plazo para reclamar por una maleta dañada o retrasada?",
        answer:
          "Sí, y puede ser corto. En los vuelos internacionales, el Convenio de Montreal fija plazos para reclamar por escrito. Denuncia el problema en el aeropuerto y consulta los plazos en las páginas oficiales cuanto antes.",
      },
    ],
    related: {
      guides: [
        "que-llevar-en-el-equipaje-de-mano",
        "seguro-de-viaje-que-cubre",
        "indemnizacion-por-retraso-de-vuelo",
      ],
    },
    sources: [
      SOURCES.euAirRightsEs,
      SOURCES.aesaPassengers,
      SOURCES.ukCaaBaggage,
    ],
  },
  {
    slug: "cuando-reservar-vuelos",
    locale: "es",
    translationOf: "best-time-to-book-flights",
    photo: "cheap-flights",
    category: "flights",
    status: "published",
    publishAt: "2026-11-21",
    lastReviewed: "2026-11-09",
    title: "¿Cuándo es el mejor momento para reservar vuelos?",
    description:
      "Con cuánta antelación reservar vuelos, por qué el día más barato para comprar es un mito y cómo elegir el momento en temporada alta, largo y corto radio.",
    headline: "¿Cuándo es el mejor momento para reservar vuelos?",
    intro:
      "No existe un día ni una hora mágica en la que los vuelos se abaraten. Los precios de las aerolíneas se mueven con la demanda: a medida que se venden asientos, se cierran las tarifas más baratas y el precio sube, y de vez en cuando una aerolínea lanza una oferta. Lo que sí puedes controlar es cuándo empiezas a mirar, cuánta flexibilidad tienes y en qué momento dejas de esperar y reservas.",
    sections: [
      {
        heading: "Por qué cambian las tarifas",
        paragraphs: [
          "Las aerolíneas venden el mismo asiento a precios distintos, en niveles de tarifa con condiciones diferentes. Cuando se agota el nivel más barato, el siguiente pasa a ser el precio más bajo disponible. Por eso los precios suelen subir a medida que se acerca la fecha de salida, y por eso suben más rápido en las fechas más demandadas. Nuestra guía sobre [cómo fijan las aerolíneas el precio de los vuelos](/es/blog/como-fijan-las-aerolineas-el-precio-de-los-vuelos) lo explica con más detalle.",
          "Las tarifas también pueden bajar cuando la demanda es menor de lo que esperaba la aerolínea o cuando hay una promoción. Por eso merece la pena seguir los precios durante un tiempo antes de reservar, en lugar de comprar la primera tarifa que ves.",
        ],
        bullets: [],
      },
      {
        heading: "Con cuánta antelación reservar",
        paragraphs: [
          "Como regla general, empieza a mirar unos meses antes en los viajes de corto radio y antes aún en los de largo radio y en temporada alta. Reservar a última hora es una apuesta: las gangas de última hora existen, pero en las rutas con mucha demanda los asientos baratos suelen haberse vendido ya.",
          "Cuanto más demandadas sean tus fechas, antes deberías reservar. Las vacaciones escolares, Semana Santa, Navidad, los puentes y las grandes fiestas locales se llenan pronto. Si tus fechas son fijas, nuestra guía para [planificar un viaje barato](/es/blog/como-planificar-un-viaje-barato) muestra en qué más puedes ahorrar.",
        ],
        bullets: [
          "Corto radio en temporada baja: sigue los precios un par de meses antes",
          "Largo radio: empieza a mirar varios meses antes",
          "Vacaciones y fiestas: reserva tan pronto como lo permitan tus planes",
          "Escapadas flexibles de última hora: compara varias fechas y destinos",
        ],
      },
      {
        heading: "El día más barato para reservar es un mito",
        paragraphs: [
          "A menudo leerás que un día concreto de la semana es el más barato para comprar un billete. Las aerolíneas cambian los precios constantemente con sistemas automáticos, así que cualquier patrón de ese tipo es débil e irregular. El día en que vuelas importa mucho más que el día en que compras: en las rutas de ocio, los vuelos entre semana suelen ser más baratos que los de viernes y domingo.",
          "Borrar las cookies o buscar en una ventana privada tampoco baja los precios de forma fiable. Si el precio sube entre dos búsquedas, lo más probable es que se hayan vendido asientos.",
        ],
        bullets: [],
      },
      {
        heading: "La flexibilidad gana al momento de compra",
        paragraphs: [
          "Ser flexible con cuándo y desde dónde vuelas suele ahorrar más que acertar con el momento de compra. Un vuelo un día antes o después, otra hora de salida o un aeropuerto cercano pueden costar mucho menos que tu primera opción. Usa la vista de calendario o de fechas flexibles del buscador para ver una semana o un mes enteros de una vez.",
          "Sé flexible también con la duración del viaje. Pasar de siete noches a seis u ocho puede llevarte a días de ida y vuelta más baratos. Nuestra herramienta [¿cuántos días necesito?](/es/herramientas/cuantos-dias) te ayuda a decidir cuánto tiempo pide de verdad un destino, y la guía sobre [cómo encontrar vuelos baratos](/es/blog/como-encontrar-vuelos-baratos) repasa el método de búsqueda completo.",
        ],
        bullets: [
          "Compara salidas entre semana y en fin de semana",
          "Prueba los vuelos a primera hora y a última hora del día",
          "Mira aeropuertos cercanos en el origen y en el destino",
          "Compara un billete de ida y vuelta con dos billetes de solo ida",
        ],
      },
      {
        heading: "Cuándo dejar de esperar",
        paragraphs: [
          "Esperar el precio perfecto puede salir caro. Si llevas un tiempo siguiendo una ruta y la tarifa está cerca de la más baja que has visto, resérvala, sobre todo en fechas de mucha demanda. La posibilidad de ahorrar un poco más rara vez compensa el riesgo de que se agoten los asientos baratos.",
        ],
        bullets: [],
      },
      {
        heading: "Cómo usar las alertas de precio",
        paragraphs: [
          "Las alertas de precio de los buscadores de vuelos son la forma más sencilla de seguir una ruta sin mirarla cada día. Crea alertas para tus fechas preferidas y para algunas alternativas, y decide de antemano qué precio estarías dispuesto a pagar. Cuando la tarifa llegue a esa cifra, reserva en lugar de esperar otra bajada.",
          "Cuando salte la alerta, compara el coste total: el equipaje, la elección de asiento y los traslados al aeropuerto pueden convertir una tarifa barata en una cara. Nuestra [calculadora del coste del equipaje](/es/herramientas/coste-del-equipaje) y la [calculadora de presupuesto de viaje](/es/herramientas/calculadora-presupuesto-viaje) te ayudan a ver el coste completo.",
        ],
        bullets: [],
      },
      {
        heading: "Reserva con red de seguridad",
        paragraphs: [
          "Si no estás seguro de las fechas, busca tarifas que permitan cambios o usa una retención gratuita si tu aerolínea la ofrece. En los vuelos con origen o destino en Estados Unidos, las normas de ese país obligan a las aerolíneas a dejarte retener la reserva sin pagar o cancelarla sin penalización en las 24 horas siguientes a la compra, siempre que reserves al menos una semana antes de la salida.",
          "Lee las condiciones de la tarifa antes de pagar y comprueba que el precio incluye todos los impuestos y cargos obligatorios. En la UE, las aerolíneas deben mostrar el precio final con todos ellos desde el principio de la reserva.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Con cuántos meses de antelación hay que reservar un vuelo?",
        answer:
          "Empieza a mirar unos meses antes en los viajes de corto radio y varios meses antes en los de largo radio o en temporada alta. Crea alertas de precio y reserva cuando la tarifa llegue a un precio que te parezca bien.",
      },
      {
        question: "¿El martes es el día más barato para comprar vuelos?",
        answer:
          "No de forma fiable. Las aerolíneas cambian los precios constantemente, así que no hay un día más barato fijo para comprar. Influye más el día en que vuelas, y entre semana los vuelos de ocio suelen salir más baratos.",
      },
      {
        question: "¿Los vuelos bajan de precio cuando se acerca la fecha?",
        answer:
          "A veces, pero no suele pasar en las rutas con mucha demanda. A medida que se venden los asientos baratos, el precio más bajo disponible tiende a subir. Las ofertas de última hora son más probables en rutas y fechas tranquilas.",
      },
    ],
    related: {
      guides: [
        "como-encontrar-vuelos-baratos",
        "como-fijan-las-aerolineas-el-precio-de-los-vuelos",
        "trucos-para-encontrar-vuelos-baratos",
      ],
    },
    sources: [SOURCES.usDot24HourEs, SOURCES.eu1008Es, SOURCES.euAirRightsEs],
  },
  {
    slug: "consejos-control-de-seguridad-aeropuerto",
    locale: "es",
    translationOf: "airport-security-tips",
    photo: "carry-on",
    category: "practical",
    status: "published",
    publishAt: "2026-11-28",
    lastReviewed: "2026-11-09",
    title: "Control de seguridad del aeropuerto: consejos útiles",
    description:
      "Cómo pasar el control de seguridad del aeropuerto más rápido: líquidos y aparatos electrónicos, qué ropa llevar, errores habituales y normas que cambian.",
    headline: "Control de seguridad del aeropuerto: cómo pasarlo más rápido",
    intro:
      "El control de seguridad es la parte del aeropuerto sobre la que menos control tienes, pero la mayoría de los retrasos que se producen allí se pueden evitar. Las maletas se apartan para revisarlas una y otra vez por los mismos pocos motivos. Si preparas el equipaje pensando en el control y consultas las normas de tu aeropuerto de salida antes de ir, pasarás mucho menos tiempo en la cola.",
    sections: [
      {
        heading: "Consulta las normas de tu aeropuerto",
        paragraphs: [
          "Las normas de seguridad no son iguales en todas partes. Algunos aeropuertos tienen escáneres nuevos que permiten dejar los líquidos y el portátil dentro de la maleta, mientras que otros siguen pidiendo que los saques. Los límites de líquidos pueden variar entre aeropuertos del mismo país y cambian a medida que se renuevan los equipos.",
          "Antes de hacer la maleta, consulta la web de tu aeropuerto de salida y la información oficial de las autoridades de aviación, como la Agencia Estatal de Seguridad Aérea (AESA) en España. Para el vuelo de vuelta, revisa también las normas de ese aeropuerto, porque pueden ser más estrictas.",
        ],
        bullets: [],
      },
      {
        heading: "Prepara el equipaje de mano para el control",
        paragraphs: [
          "Coloca arriba todo lo que puedan pedirte que saques. Mete los líquidos en una bolsa transparente con cierre y llévala en un bolsillo exterior. Guarda el portátil y los aparatos electrónicos grandes donde puedas sacarlos sin deshacer la maleta.",
        ],
        bullets: [
          "Líquidos, geles y aerosoles en una bolsa transparente, en envases del tamaño permitido",
          "Portátil y tableta fáciles de sacar",
          "Cables y cargadores juntos en un neceser, no sueltos",
          "Nada de objetos cortantes ni herramientas en la maleta de mano",
          "Baterías de repuesto y powerbanks en cabina, no en la maleta facturada",
        ],
      },
      {
        heading: "Vístete pensando en el arco",
        paragraphs: [
          "Lleva un calzado fácil de quitar y evita los cinturones con hebillas grandes, las joyas pesadas y la ropa con mucho metal. Guarda el móvil, las llaves, la cartera y las monedas en la chaqueta o en la mochila antes de llegar a la bandeja, en lugar de vaciar los bolsillos junto a la cinta.",
          "Lleva la tarjeta de embarque y el documento de identidad en la mano o en un bolsillo accesible. Sueles necesitarlos justo antes del control y de nuevo en la puerta de embarque. Cuando tu bandeja salga del escáner, llévala al banco que hay después de la cinta antes de volver a ponerte los zapatos, el cinturón y guardar el portátil: no harás esperar a quien viene detrás y no te dejarás nada. Revisa las bandejas una última vez antes de irte.",
        ],
        bullets: [],
      },
      {
        heading: "Por qué se revisan las maletas",
        paragraphs: [
          "Que te revisen la maleta no es una acusación, pero lleva tiempo. Los motivos más habituales son líquidos olvidados en un bolsillo, envases demasiado grandes, comida que se ve densa en el escáner y bolsas tan llenas que no se distingue lo que hay dentro.",
          "Los medicamentos, la comida para bebés y los alimentos para dietas especiales suelen permitirse en mayor cantidad, pero puede que tengas que declararlos. Lleva los medicamentos con receta en su envase original. Nuestra guía para [viajar en avión con niños](/es/blog/viajar-en-avion-con-ninos) explica qué pasa con la leche y la comida infantil.",
        ],
        bullets: [],
      },
      {
        heading: "Comida, regalos y compras en el duty free",
        paragraphs: [
          "La comida sólida suele estar permitida en el equipaje de mano, pero los alimentos blandos o untables, como la mermelada, el yogur, los quesos para untar o las salsas, a menudo cuentan como líquidos. Es mejor no envolver los regalos, porque puede que el personal de seguridad tenga que mirar dentro.",
          "Los líquidos que compras en el duty free después del control suelen ir en una bolsa precintada con el tique. Si tienes una conexión, no abras la bolsa hasta tu destino final, porque puede que pases otro control y las normas del siguiente aeropuerto sean distintas.",
        ],
        bullets: [
          "Lleva en la maleta facturada quesos blandos, miel y salsas",
          "No envuelvas los regalos hasta llegar",
          "Mantén el duty free precintado y con el tique a la vista",
        ],
      },
      {
        heading: "Viajar con niños o con necesidades especiales",
        paragraphs: [
          "Las familias suelen poder usar una fila especial, y la comida infantil, la leche y los medicamentos de los niños se permiten normalmente en mayor cantidad. Si tú o alguien con quien viajas tiene una discapacidad o una enfermedad, contacta con la aerolínea o el aeropuerto antes del vuelo: muchos aeropuertos ofrecen un servicio de asistencia que facilita el paso por el control.",
        ],
        bullets: [],
      },
      {
        heading: "Horarios y filas rápidas",
        paragraphs: [
          "Llega con tiempo suficiente para el check-in, la entrega de la maleta y el control, sobre todo a primera hora de la mañana y en puentes y vacaciones, cuando las colas son más largas. Muchos aeropuertos publican los tiempos de espera habituales o recomiendan con cuánta antelación llegar.",
          "Algunos aeropuertos venden el acceso por una fila rápida, y algunos países tienen programas de viajero de confianza que agilizan el control a los pasajeros aprobados. Pueden compensar si vuelas a menudo o vas justo de tiempo, pero rara vez hacen falta si llegas con margen.",
        ],
        bullets: [],
      },
      {
        heading: "Después del control",
        paragraphs: [
          "Llena la botella de agua, comprueba la puerta de embarque y calcula cuánto se tarda en llegar, porque en los aeropuertos grandes puede estar lejos. Si tienes una conexión, nuestro [comprobador de tiempo de escala](/es/herramientas/tiempo-de-escala) te indica si es probable que tengas que volver a pasar el control. Para saber qué meter en la maleta, consulta nuestra guía sobre [qué llevar en el equipaje de mano](/es/blog/que-llevar-en-el-equipaje-de-mano).",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Todavía hay que sacar los líquidos en el control?",
        answer:
          "Depende del aeropuerto. Algunos aeropuertos con escáneres nuevos permiten dejar los líquidos en la maleta, mientras que otros siguen exigiendo una bolsa transparente aparte. Consulta la web de tu aeropuerto de salida antes de viajar.",
      },
      {
        question: "¿Puedo pasar una powerbank por el control de seguridad?",
        answer:
          "Normalmente sí, en el equipaje de mano pero no en la maleta facturada. Las aerolíneas limitan la capacidad y el número de baterías, así que consulta las normas de tu aerolínea y la información oficial antes de volar.",
      },
      {
        question: "¿Con cuánta antelación hay que llegar al aeropuerto?",
        answer:
          "Sigue la recomendación de tu aerolínea y de tu aeropuerto, y deja más margen en los momentos de más afluencia, como primera hora y las vacaciones. Los vuelos internacionales suelen necesitar más tiempo que los nacionales.",
      },
    ],
    related: {
      guides: [
        "que-llevar-en-el-equipaje-de-mano",
        "viajar-en-avion-con-ninos",
        "trucos-de-viaje-que-funcionan",
      ],
    },
    sources: [
      SOURCES.aesaPassengers,
      SOURCES.ukHandLuggage,
      SOURCES.tsaWhatCanIBring,
    ],
  },
];
