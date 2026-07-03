import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const reportPath = path.join(root, "output", "qa-static-report.json");

const failures = [];
const warnings = [];

const fileExists = (targetPath) => fs.existsSync(targetPath) && fs.statSync(targetPath).isFile();

const normalizeInternalPath = (url) => {
  if (!url || url.startsWith("#")) return null;
  if (/^(https?:|mailto:|tel:|sms:|whatsapp:)/i.test(url)) return null;

  const clean = url.split("#")[0].split("?")[0];
  if (!clean || clean === "#") return null;
  return clean.startsWith("/") ? clean : `/${clean}`;
};

const routeToDistPath = (route) => {
  if (route === "/") return path.join(distDir, "index.html");
  if (path.extname(route)) return path.join(distDir, route);
  return path.join(distDir, route, "index.html");
};

const assetToDistPath = (assetPath) => {
  try {
    return path.join(distDir, decodeURIComponent(assetPath));
  } catch {
    return path.join(distDir, assetPath);
  }
};

const collectHtmlFiles = (dir) => {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
};

if (!fs.existsSync(distDir)) {
  throw new Error("dist/ does not exist. Run `pnpm build` before `pnpm qa:static`.");
}

const htmlFiles = collectHtmlFiles(distDir);
if (htmlFiles.length === 0) {
  throw new Error("No generated HTML files found in dist/.");
}

let internalLinksChecked = 0;
let localAssetsChecked = 0;
let imageCount = 0;
let showroomLinks = 0;
let iframeCount = 0;
let catalogTriggers = 0;
let forms = 0;
const sitemapRoutes = new Set();
const redirectRoutes = new Set();

const sitemapPath = path.join(distDir, "sitemap.xml");
if (fileExists(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  for (const match of sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]+)<\/loc>/g)) {
    sitemapRoutes.add(match[1]);
    if (match[1].includes("/hoteleria/")) {
      failures.push(`sitemap.xml: old hoteleria URL is listed: ${match[1]}.`);
    }
  }
} else {
  failures.push("Missing dist/sitemap.xml.");
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const route = `/${path.relative(distDir, file).replace(/index\.html$/, "").replace(/\\/g, "/")}`.replace(/\/+$/, "/");
  const displayRoute = route === "//" ? "/" : route;
  const isRedirectPage = /<meta\b[^>]*http-equiv=(["'])refresh\1/i.test(html);

  if (isRedirectPage) {
    redirectRoutes.add(displayRoute);
    const refreshTarget = html.match(/<meta\b[^>]*http-equiv=(["'])refresh\1[^>]*content=(["'])\s*\d+\s*;\s*url=([^"']+)\2/i)?.[3];
    const internalRedirect = normalizeInternalPath(refreshTarget);
    if (internalRedirect && !fileExists(routeToDistPath(internalRedirect))) {
      failures.push(`${displayRoute}: redirect target is missing ${internalRedirect}.`);
    }
    continue;
  }

  const canonicalCount = (html.match(/rel="canonical"/g) ?? []).length;
  if (canonicalCount !== 1) {
    failures.push(`${displayRoute}: expected exactly one canonical link, found ${canonicalCount}.`);
  }

  if (html.includes("/hoteleria/")) {
    failures.push(`${displayRoute}: old hoteleria URL fragment found in generated HTML.`);
  }

  const forbiddenFragments = ["待确认", "发布前补充", "TODO", "Lorem ipsum", "placeholder-page"];
  for (const fragment of forbiddenFragments) {
    if (html.includes(fragment)) {
      failures.push(`${displayRoute}: found unfinished/demo residue "${fragment}".`);
    }
  }

  if (!html.includes("class=\"whatsapp-float\"")) {
    failures.push(`${displayRoute}: missing floating WhatsApp CTA.`);
  }

  if (!html.includes("href=\"/privacidad/\"")) {
    failures.push(`${displayRoute}: missing privacy link.`);
  }

  if (html.includes("hyhotelfurniture.com") || html.includes("hyofficefurniture.com") || html.includes("hyhealthcarefurniture.com") || html.includes("hyeducationfurniture.com") || html.includes("fenmicasa.com")) {
    failures.push(`${displayRoute}: contains group-site traffic leakage link.`);
  }

  for (const match of html.matchAll(/<a\b[^>]*href=(["'])(.*?)\1[^>]*>/gi)) {
    const tag = match[0];
    const href = match[2];
    if (href.includes("my.matterport.com/show/")) {
      showroomLinks += 1;
      if (!tag.includes("data-showroom-modal")) {
        failures.push(`${displayRoute}: Matterport link is missing data-showroom-modal.`);
      }
      if (/target=(["'])_blank\1/i.test(tag)) {
        failures.push(`${displayRoute}: Matterport link opens a new tab.`);
      }
    }

    const internal = normalizeInternalPath(href);
    if (!internal) continue;
    if (internal.includes("/hoteleria/")) {
      failures.push(`${displayRoute}: old hoteleria internal link ${href}.`);
    }
    internalLinksChecked += 1;
    const target = routeToDistPath(internal);
    if (!fileExists(target)) {
      failures.push(`${displayRoute}: broken internal link ${href}.`);
    }
  }

  for (const match of html.matchAll(/<(?:button|a)\b[^>]*data-download-catalog[^>]*>/gi)) {
    catalogTriggers += 1;
    const tag = match[0];
    const interestMatch = tag.match(/\sdata-catalog-interest=(["'])(.*?)\1/i);
    if (!interestMatch?.[2]?.trim()) {
      failures.push(`${displayRoute}: catalog download trigger is missing data-catalog-interest.`);
    }
  }

  for (const match of html.matchAll(/<iframe\b[^>]*>/gi)) {
    iframeCount += 1;
    const tag = match[0];
    const allowMatch = tag.match(/\sallow=(["'])(.*?)\1/i);
    const hasAllowFullscreen = /\sallowfullscreen(?:\s|>|=)/i.test(tag);
    if (hasAllowFullscreen && allowMatch?.[2]?.split(";").map((value) => value.trim().toLowerCase()).includes("fullscreen")) {
      failures.push(`${displayRoute}: iframe allow contains fullscreen while allowfullscreen is present.`);
    }
  }

  for (const match of html.matchAll(/<(?:img|script|source)\b[^>]*(?:src|srcset)=(["'])(.*?)\1[^>]*>/gi)) {
    const tag = match[0];
    const src = match[2].split(" ")[0];
    const internal = normalizeInternalPath(src);
    if (!internal) continue;
    localAssetsChecked += 1;
    if (!fileExists(assetToDistPath(internal))) {
      failures.push(`${displayRoute}: missing local asset ${src}.`);
    }

    if (tag.toLowerCase().startsWith("<img")) {
      imageCount += 1;
      if (!/\salt=(["']).*?\1/i.test(tag)) {
        failures.push(`${displayRoute}: image missing alt attribute for ${src}.`);
      }
      if (internal.startsWith("/assets/hymueble/") && !internal.endsWith(".webp")) {
        failures.push(`${displayRoute}: Hymueble image is not WebP: ${src}.`);
      }
    }
  }

  for (const match of html.matchAll(/<link\b[^>]*href=(["'])(.*?)\1[^>]*>/gi)) {
    const href = match[2];
    const internal = normalizeInternalPath(href);
    if (!internal) continue;
    if (internal.startsWith("/assets/") || internal.startsWith("/_astro/") || internal.startsWith("/favicon") || internal.startsWith("/apple-touch-icon")) {
      localAssetsChecked += 1;
      if (!fileExists(assetToDistPath(internal))) {
        failures.push(`${displayRoute}: missing linked asset ${href}.`);
      }
    }
  }

  for (const match of html.matchAll(/<form\b[^>]*data-demo-form[^>]*>/gi)) {
    forms += 1;
    const tag = match[0];
    if (!/method=(["'])post\1/i.test(tag)) {
      failures.push(`${displayRoute}: demo form missing method="post".`);
    }
    if (!/enctype=(["'])multipart\/form-data\1/i.test(tag)) {
      failures.push(`${displayRoute}: demo form missing multipart enctype.`);
    }
    if (!/data-form-purpose=(["'])project-inquiry\1/i.test(tag)) {
      failures.push(`${displayRoute}: demo form missing data-form-purpose.`);
    }
  }
}

if (showroomLinks === 0) {
  failures.push("No Matterport showroom links found in generated HTML.");
}

if (forms === 0) {
  warnings.push("No demo forms found in generated HTML.");
}

for (const file of htmlFiles) {
  const relative = path.relative(distDir, file).replace(/index\.html$/, "").replace(/\\/g, "/");
  const route = `/${relative}`.replace(/\/+$/, "/");
  const sitemapRoute = route === "//" ? "/" : route;
  if (redirectRoutes.has(sitemapRoute)) {
    continue;
  }
  if (sitemapRoutes.size > 0 && !sitemapRoutes.has(sitemapRoute)) {
    failures.push(`${sitemapRoute}: generated route missing from sitemap.xml.`);
  }
}

const report = {
  htmlFiles: htmlFiles.length,
  redirectPages: redirectRoutes.size,
  sitemapRoutes: sitemapRoutes.size,
  internalLinksChecked,
  localAssetsChecked,
  imageCount,
  showroomLinks,
  iframeCount,
  catalogTriggers,
  forms,
  failures,
  warnings,
};

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

if (failures.length > 0) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(report, null, 2));
