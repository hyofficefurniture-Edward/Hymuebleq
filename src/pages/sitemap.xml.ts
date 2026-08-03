import type { APIRoute } from "astro";
import { catalogCategoryDetails } from "../data/catalogReferences";
import { categories, hotelCatalog, projects } from "../data/site";

const staticPaths = [
  "/",
  "/catalogo/",
  "/catalogo/hoteles/",
  "/proyectos/",
  "/proyectos/hoteles/",
  "/fabrica/",
  "/showroom/",
  "/contacto/",
  "/privacidad/",
  "/recursos/",
  "/recursos/blog/",
  "/recursos/top-10-fabricantes-muebles-hoteles-china-2026/",
  "/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026/",
  "/recursos/top-10-empresas-mobiliario-escolar-china-2026/",
  "/recursos/fabricante-vs-distribuidor-muebles-comerciales-2026/",
  "/recursos/videos/",
  "/productos/",
  "/productos/pagina-2/",
  "/productos/armario-hotelero-empotrado-chapa-madera/",
  "/productos/sofa-curvo-lobby-hotel-mesa-centro/",
  "/productos/mesa-conferencias-ejecutiva-nogal-sillas/",
  "/productos/mesa-centro-redonda-chapa-madera-metal/",
  "/productos/minibar-hotel-chapa-nogal-ventilacion/",
  "/productos/mesa-sillas-restaurante-hotel-chapa-madera/",
  "/productos/mesa-banquetes-plegable-chapa-sillas/",
  "/productos/armario-suite-hotelera-chapa-madera-led/",
  "/productos/paneles-pared-chapa-madera-hotel/",
  "/productos/sofa-modular-recto-tela-otomana-hotel/",
  "/productos/sofa-moderno-dos-plazas-tapizado-hotel/",
  "/productos/mesita-noche-flotante-usb-hotel/",
  "/productos-oficina/",
  "/productos-oficina/pagina-2/",
  "/productos-oficina/escritorio-ejecutivo-gerente-chapa-madera/",
  "/productos-oficina/estacion-trabajo-modular-oficina-abierta/",
  "/productos-oficina/mesa-reuniones-modular-corporativos/",
  "/productos-oficina/silla-ergonomica-oficina-soporte-lumbar/",
  "/productos-oficina/silla-diseno-respaldo-geometrico/",
  "/productos-oficina/sofa-modular-lounge-oficina/",
  "/productos-oficina/mobiliario-modular-zonas-breakout/",
  "/productos-oficina/mostrador-recepcion-corporativa-medida/",
  "/productos-oficina/workstation-diseno-premium-paneles-acusticos/",
  "/productos-oficina/cabina-acustica-insonorizada-oficina/",
  "/productos-oficina/libreria-oficina-ejecutiva-chapa-madera/",
  "/productos-oficina/solucion-integral-seating-corporativos/",
];

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL("https://hymueble.com");
  const paths = [
    ...staticPaths,
    ...categories.flatMap((category) => [category.href, category.catalog, category.projects]),
    ...hotelCatalog.map((item) => item.href),
    ...catalogCategoryDetails.map((item) => `/catalogo/${item.sector}/${item.slug}/`),
    ...projects.map((project) => project.href),
  ];
  const urls = [...new Set(paths)].sort();
  const items = urls
    .map((route) => {
      const loc = new URL(route, siteUrl).toString();
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
  </url>`;
    })
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>
`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
