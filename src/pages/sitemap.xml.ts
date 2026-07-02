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
  "/recursos/videos/",
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
  const lastmod = new Date().toISOString().slice(0, 10);
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
    <lastmod>${lastmod}</lastmod>
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
