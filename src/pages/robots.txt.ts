import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site ?? new URL("https://hymueble.com");

  return new Response(`User-agent: *
Allow: /

Sitemap: ${new URL("/sitemap.xml", siteUrl).toString()}
`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
