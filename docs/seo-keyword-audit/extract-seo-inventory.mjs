import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const distDir = join(root, "dist");
const outDir = join(root, "docs/seo-keyword-audit");

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return full.endsWith(".html") ? [full] : [];
  });
}

function decodeEntities(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(value = "") {
  return decodeEntities(value.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "));
}

function firstMatch(html, regex) {
  return decodeEntities(html.match(regex)?.[1] ?? "");
}

function allMatches(html, regex, limit = 20) {
  return [...html.matchAll(regex)].map((match) => stripTags(match[1])).filter(Boolean).slice(0, limit);
}

function unique(values, limit = 20) {
  const seen = new Set();
  const result = [];
  for (const value of values) {
    const normalized = value.replace(/\s+/g, " ").trim();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(normalized);
    if (result.length >= limit) break;
  }
  return result;
}

function urlFromFile(file) {
  let rel = relative(distDir, file).replaceAll("\\", "/");
  rel = rel.replace(/index\.html$/, "");
  return `/${rel}`.replace(/\/+/g, "/");
}

function classifyPage(url) {
  if (url === "/") return "首页";
  if (["/hoteles/", "/oficinas/", "/educacion/", "/salud/", "/residencial/"].includes(url)) return "行业解决方案页";
  if (url === "/catalogo/") return "目录聚合页";
  if (/^\/catalogo\/[^/]+\/$/.test(url)) return "行业目录页";
  if (/^\/catalogo\/[^/]+\/[^/]+\/$/.test(url)) return "产品细分类页";
  if (url === "/proyectos/") return "案例聚合页";
  if (/^\/proyectos\/[^/]+\/$/.test(url)) return "行业案例页";
  if (/^\/proyectos\/[^/]+\/[^/]+\/$/.test(url)) return "案例详情页";
  if (url === "/fabrica/") return "工厂页";
  if (url === "/contacto/") return "联系转化页";
  if (url.startsWith("/recursos/")) return "资源页";
  if (url === "/showroom/") return "Showroom 页";
  if (url === "/privacidad/") return "法律页";
  return "其他";
}

function inferKeyword(title, h1, url) {
  const text = `${h1 || title}`.replace(/\s*\|\s*Hymueble\s*$/i, "").trim();
  if (url === "/") return "muebles para proyectos comerciales";
  if (url === "/contacto/") return "solicitar cotización";
  if (url === "/fabrica/") return "fabricante de muebles en China";
  return text.charAt(0).toLowerCase() + text.slice(1);
}

const rows = walk(distDir)
  .map((file) => {
    const html = readFileSync(file, "utf8");
    const url = urlFromFile(file);
    const title = firstMatch(html, /<title>([\s\S]*?)<\/title>/i);
    const description = firstMatch(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
    const keywords = firstMatch(html, /<meta\s+name="keywords"\s+content="([^"]*)"/i);
    const h1 = firstMatch(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h2 = unique(allMatches(html, /<h2[^>]*>([\s\S]*?)<\/h2>/gi, 12), 8);
    const ctas = unique(allMatches(html, /<a\b[^>]*class="[^"]*\bbtn\b[^"]*"[^>]*>([\s\S]*?)<\/a>/gi, 20), 10);
    const alts = unique([...html.matchAll(/<img\b[^>]*\balt="([^"]*)"/gi)].map((match) => decodeEntities(match[1])), 12);
    const links = unique([...html.matchAll(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)]
      .map((match) => `${stripTags(match[2])} -> ${decodeEntities(match[1])}`)
      .filter((item) => !item.includes("javascript:")), 14);
    const lead = firstMatch(html, /<p class="lead">([\s\S]*?)<\/p>/i) || firstMatch(html, /<p class="section-note">([\s\S]*?)<\/p>/i);
    return {
      url,
      pageType: classifyPage(url),
      title,
      description,
      h1,
      h2,
      lead,
      ctas,
      alts,
      links,
      currentKeyword: inferKeyword(title, h1, url),
      metaKeywords: keywords,
    };
  })
  .sort((a, b) => a.url.localeCompare(b.url));

writeFileSync(join(outDir, "inventory-raw.json"), `${JSON.stringify(rows, null, 2)}\n`);

const markdown = [
  "# Raw SEO HTML Extract",
  "",
  `Generated from \`dist\` pages: ${rows.length}.`,
  "",
  "| URL | 页面类型 | Title | Meta Description | H1 | H2 摘要 | CTA 摘要 | Alt 摘要 |",
  "| --- | --- | --- | --- | --- | --- | --- | --- |",
  ...rows.map((row) => `| ${row.url} | ${row.pageType} | ${row.title} | ${row.description} | ${row.h1} | ${row.h2.join("<br>")} | ${row.ctas.join("<br>")} | ${row.alts.join("<br>")} |`),
  "",
].join("\n");

writeFileSync(join(outDir, "inventory-raw.md"), markdown);
