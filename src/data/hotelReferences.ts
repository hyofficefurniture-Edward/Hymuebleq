const img = (file: string) => `/assets/hymueble/hoteles/referencias/${file}`;

export interface HotelReference {
  categorySlug: string;
  filter: string;
  title: string;
  image: string;
  alt: string;
  summary: string;
  applications: string[];
  customization: string;
  ctaInterest: string;
}

const r = (
  categorySlug: string,
  filter: string,
  title: string,
  imageFile: string,
  alt: string,
  summary: string,
  applications: string[],
  customization: string,
): HotelReference => ({
  categorySlug,
  filter,
  title,
  image: img(imageFile),
  alt,
  summary,
  applications,
  customization,
  ctaInterest: `Hotelería - referencia: ${title}`,
});

export const hotelReferences: HotelReference[] = [
  r("habitaciones", "Habitación completa", "Habitación con cama y cabecera integrada", "habitaciones-ref-01.webp", "habitación de hotel con cama y cabecera integrada", "Referencia para coordinar cama, cabecera, luz lateral y mobiliario fijo en un mismo paquete de habitación.", ["Habitación estándar", "Remodelación por lote"], "Medidas, chapa, tapicería, enchufes y acabados por plano."),
  r("habitaciones", "Cabecera y muro", "Muro de cabecera para habitación piloto", "habitaciones-ref-02.webp", "muro de cabecera para habitación piloto de hotel", "Composición de cabecera y paneles laterales para revisar proporción, material y tono antes de producir por volumen.", ["Habitación piloto", "Suite compacta"], "Ancho, módulos laterales, iluminación y ranuras técnicas ajustables."),
  r("habitaciones", "Lounge de suite", "Zona lounge para suite hotelera", "habitaciones-ref-03.webp", "zona lounge con sofá para suite hotelera", "Referencia para integrar sofá, mesas auxiliares y asientos de descanso dentro de suites o habitaciones premium.", ["Suite", "Rincón de descanso"], "Tapicería, longitud, densidad de espuma y patas según concepto interior."),
  r("habitaciones", "Almacenamiento", "Armario y escritorio coordinados", "habitaciones-ref-04.webp", "armario y escritorio coordinados para habitación de hotel", "Solución para ordenar guardado, tocador y superficie de trabajo con una lectura visual consistente.", ["Suite", "Larga estadía"], "Puertas, cajones, minibar, espejo e iluminación interior configurables."),
  r("habitaciones", "Trabajo y apoyo", "Escritorio compacto para huésped ejecutivo", "habitaciones-ref-05.webp", "escritorio compacto para huésped ejecutivo en hotel", "Referencia para habitaciones de negocio donde se requiere superficie de trabajo sin saturar la circulación.", ["Hotel urbano", "Habitación ejecutiva"], "Largo, gestión de cables, cajones y acabado técnico a medida."),
  r("habitaciones", "Panel TV", "Panel de TV con apoyo y almacenamiento", "habitaciones-ref-06.webp", "panel de TV con apoyo y almacenamiento para habitación hotelera", "Módulo visual para integrar TV, repisas y almacenamiento ligero en habitaciones de hotel.", ["Habitación estándar", "Suite con vista"], "Canalización, repisas, nichos y terminación coordinados con FF&E."),

  r("muebles-de-bano", "Vanity y lavabo", "Vanity suspendido para baño hotelero", "bano-ref-01.webp", "vanity suspendido para baño de hotel", "Referencia para cotizar mueble de lavabo, espejo y zona de apoyo con apariencia limpia y fácil mantenimiento.", ["Baño de habitación", "Suite"], "Cubierta, lavabo, cajones y acabados resistentes a humedad."),
  r("muebles-de-bano", "Baño premium", "Baño premium con lavabo y almacenamiento", "bano-ref-02.webp", "baño premium de hotel con lavabo y almacenamiento", "Escena para revisar una solución de baño más completa, con materiales oscuros y presencia visual para proyectos premium.", ["Hotel boutique", "Suite premium"], "Mueble bajo lavabo, cubierta, espejo, iluminación y herrajes por especificación."),
  r("muebles-de-bano", "Lavabo completo", "Conjunto de lavabo, espejo y repisas", "bano-ref-03.webp", "conjunto de lavabo espejo y repisas para baño hotelero", "Referencia para alinear mueble, espejo, repisas y acabados de muro en una misma revisión de baño.", ["Baño estándar", "Remodelación"], "Formato de espejo, largo de cubierta, nichos y materiales coordinados."),
  r("muebles-de-bano", "Almacenamiento", "Vanity compacto con apoyo de amenidades", "bano-ref-04.webp", "vanity compacto con amenidades para baño de hotel", "Solución de baño compacta para ordenar amenidades, toallas y área de lavabo sin perder limpieza visual.", ["Baño compacto", "Hotel urbano"], "Profundidad, puertas, repisas, ventilación y cubierta configurables."),
  r("muebles-de-bano", "Suite y spa", "Baño de suite con mobiliario de apoyo", "bano-ref-05.webp", "baño de suite con mobiliario de apoyo para hotel", "Referencia para baños de suite o spa donde la composición visual importa tanto como la resistencia diaria.", ["Suite", "Área wellness"], "Materiales, tapicería técnica, cubiertas y acabados resistentes a humedad."),
  r("muebles-de-bano", "Baño completo", "Solución de baño para habitación piloto", "bano-ref-06.webp", "solución de baño para habitación piloto de hotel", "Punto de partida para revisar mueble, espejo, paneles y acabado general antes de cerrar producción por lote.", ["Habitación piloto", "Compra por volumen"], "Componentes, tonos, medidas y documentación técnica ajustables."),

  r("muebles-exteriores", "Lounge exterior", "Lounge exterior para terraza de hotel", "exterior-ref-01.webp", "lounge exterior para terraza de hotel", "Referencia para terrazas y rooftops con sofás, mesas bajas y asientos de conversación.", ["Terraza", "Rooftop"], "Módulos, tejidos exteriores, cojines y distribución por plano."),
  r("muebles-exteriores", "Piscina y descanso", "Área de piscina con asientos de exterior", "exterior-ref-02.webp", "área de piscina con asientos exteriores para hotel", "Escena para revisar mobiliario exterior resistente, cómodo y coherente con amenidades de resort.", ["Piscina", "Resort"], "Estructura, tejido, cojines y tratamiento exterior según clima."),
  r("muebles-exteriores", "Resort lounge", "Day lounge para resort y terraza premium", "exterior-ref-03.webp", "day lounge para resort y terraza premium", "Referencia para crear zonas de descanso con presencia visual en resorts, terrazas amplias o áreas VIP.", ["Resort", "Área VIP"], "Medidas, cojines, módulos y colores coordinados con el paisaje."),
  r("muebles-exteriores", "Comedor exterior", "Comedor exterior para restaurante de hotel", "exterior-ref-04.webp", "comedor exterior para restaurante de hotel", "Conjunto de mesas, sillas y sombrillas para desayunadores o restaurantes al aire libre.", ["Restaurante exterior", "Terraza"], "Capacidad, cubierta, estructura y materiales resistentes a intemperie."),
  r("muebles-exteriores", "Patio hotelero", "Patio interior con mobiliario de conversación", "exterior-ref-05.webp", "patio interior de hotel con mobiliario de conversación", "Referencia para patios y jardines donde el mobiliario debe ordenar circulación y zonas de permanencia.", ["Patio", "Jardín"], "Mix de mesas, sillas, sofás y acabados por ambiente."),
  r("muebles-exteriores", "Paquete exterior", "Paquete exterior para amenidades de resort", "exterior-ref-06.webp", "paquete exterior para amenidades de resort", "Selección de mobiliario para revisar terraza, piscina y áreas abiertas como un paquete de proyecto.", ["Resort", "Compra por lote"], "Composición, cantidades, materiales y colores por zona."),

  r("muebles-para-bar", "Barra y servicio", "Barra hotelera con seating de lounge", "bar-ref-01.webp", "barra hotelera con seating de lounge", "Referencia para bares interiores donde barra, mesas y asientos deben trabajar como una escena social completa.", ["Lobby bar", "Bar interior"], "Frente, cubierta, iluminación, tapicería y almacenamiento según operación."),
  r("muebles-para-bar", "Bancos altos", "Barra con bancos altos tapizados", "bar-ref-02.webp", "barra con bancos altos tapizados para hotel", "Composición clara para cotizar bancos altos, barra y zona de consumo en hoteles o rooftops.", ["Barra", "Rooftop"], "Altura, reposapiés, tapicería, estructura y acabado personalizables."),
  r("muebles-para-bar", "Bar lounge", "Lounge social para bar de hotel", "bar-ref-03.webp", "lounge social para bar de hotel", "Referencia para zonas de consumo informal con mesas, sillas lounge y una atmósfera más relajada.", ["Bar lounge", "Terraza cubierta"], "Mesas, butacas, colores y distribución según concepto interior."),
  r("muebles-para-bar", "Lounge privado", "Lounge de bar con asientos bajos", "bar-ref-04.webp", "lounge de bar con asientos bajos para hotel", "Escena para revisar sofás bajos, mesas de apoyo y asientos de conversación en bar o espera premium.", ["Lobby bar", "Lounge"], "Tapicería, módulos, espuma, patas y tonos coordinados."),
  r("muebles-para-bar", "Servicio", "Estación de servicio para bar y coffee corner", "bar-ref-05.webp", "estación de servicio para bar y coffee corner de hotel", "Mueble de apoyo para ordenar equipos, vajilla ligera, botellas y operación diaria en zonas de servicio.", ["Servicio de bar", "Coffee corner"], "Compartimentos, cubierta, ventilación y medidas por flujo de trabajo."),
  r("muebles-para-bar", "Bar completo", "Set completo para bar de hotel", "bar-ref-06.webp", "set completo para bar de hotel", "Vista de conjunto para discutir barra, back bar, mesas y asientos antes de preparar una propuesta por proyecto.", ["Apertura", "Remodelación"], "Componentes, cantidades, acabados e iluminación por zona."),

  r("muebles-para-restaurante", "Booths y bancas", "Banca curva para restaurante hotelero", "restaurante-ref-01.webp", "banca curva para restaurante hotelero", "Referencia para crear zonas de comedor con bancas, mesas y sillas coordinadas para alta rotación.", ["Restaurante", "Buffet"], "Longitud, respaldo, tapicería, base y módulos por layout."),
  r("muebles-para-restaurante", "Restaurante premium", "Restaurante con mesas y seating coordinado", "restaurante-ref-02.webp", "restaurante de hotel con mesas y seating coordinado", "Escena premium para revisar mesas, sillas, butacas y relación con barra o zona de servicio.", ["Restaurante", "Hotel boutique"], "Cubiertas, bases, tapicería, colores y cantidades por plano."),
  r("muebles-para-restaurante", "Comedor lounge", "Comedor lounge con bancas tapizadas", "restaurante-ref-03.webp", "comedor lounge con bancas tapizadas para hotel", "Referencia para restaurantes donde el asiento tipo lounge aporta comodidad y diferencia visual.", ["Restaurante premium", "Bar-restaurante"], "Altura de respaldo, módulos, tela, espuma y mesa asociada."),
  r("muebles-para-restaurante", "Salón comedor", "Salón comedor para operación hotelera", "restaurante-ref-04.webp", "salón comedor para operación hotelera", "Vista de sala para estimar mezcla de mesas, sillas y circulación de servicio en restaurantes de hotel.", ["Comedor", "Desayunador"], "Capacidad, medidas, acabados y distribución por flujo operativo."),
  r("muebles-para-restaurante", "Bar-restaurante", "Zona bar-restaurante con seating mixto", "restaurante-ref-05.webp", "zona bar restaurante con seating mixto para hotel", "Referencia para combinar barra, mesas, sillas y lounge seating dentro de un mismo concepto de alimentos y bebidas.", ["Bar-restaurante", "Restaurante premium"], "Mix de piezas, tapicería, bases, colores y acabados coordinados."),
  r("muebles-para-restaurante", "Paquete comedor", "Paquete de restaurante para cotización por proyecto", "restaurante-ref-06.webp", "paquete de restaurante para cotización por proyecto hotelero", "Imagen de referencia para alinear alcance completo de restaurante antes de definir cantidades y materiales.", ["Apertura", "Compra por volumen"], "Mesas, sillas, bancas, apoyo de servicio y layout por proyecto."),

  r("mobiliario-para-conferencias", "Salón flexible", "Salón flexible con sillas para evento", "conferencias-ref-01.webp", "salón flexible con sillas para evento hotelero", "Referencia para salones donde la prioridad es cambiar configuración entre conferencia, capacitación y evento.", ["Conferencia", "Evento corporativo"], "Sillas, mesas auxiliares, acabados y almacenamiento según rotación."),
  r("mobiliario-para-conferencias", "Auditorio", "Montaje tipo auditorio para hotel", "conferencias-ref-02.webp", "montaje tipo auditorio para hotel", "Escena para revisar capacidad, visibilidad y mobiliario de apoyo en eventos institucionales o presentaciones.", ["Auditorio", "Presentación"], "Sillas, mesas, podio de apoyo y acabados coordinados."),
  r("mobiliario-para-conferencias", "Reunión ejecutiva", "Sala de reunión ejecutiva", "conferencias-ref-03.webp", "sala de reunión ejecutiva para hotel", "Referencia para espacios corporativos con mesa central, sillas cómodas y almacenamiento discreto.", ["Sala de reunión", "Back service"], "Mesa, cableado, sillas, credenza y paneles según sala."),
  r("mobiliario-para-conferencias", "Capacitación", "Sala de capacitación con mesas modulares", "conferencias-ref-04.webp", "sala de capacitación con mesas modulares para hotel", "Solución para reuniones internas, capacitación o salones corporativos que requieren mesas reconfigurables.", ["Capacitación", "Reunión"], "Formato, cableado, tablero, base y acabado por configuración."),
  r("mobiliario-para-conferencias", "Banquete", "Montaje de banquete y evento social", "conferencias-ref-05.webp", "montaje de banquete y evento social en hotel", "Referencia para estimar mesas, sillas y operación de salones usados en bodas, banquetes y eventos sociales.", ["Banquete", "Boda"], "Diámetro de mesas, sillas, almacenamiento y acabado según rotación."),
  r("mobiliario-para-conferencias", "Paquete de salón", "Paquete para salón de conferencias", "conferencias-ref-06.webp", "paquete para salón de conferencias hoteleras", "Vista de conjunto para cotizar salón completo con mesas, sillas y apoyo operativo por layout.", ["Conferencia", "Compra por lote"], "Configuración, cantidades, acabados y accesorios por plano."),
];

export const getHotelReferencesByCategory = (categorySlug: string) =>
  hotelReferences.filter((reference) => reference.categorySlug === categorySlug);

export const getHotelReferenceFilters = (references: HotelReference[]) =>
  [...new Set(references.map((reference) => reference.filter))];
