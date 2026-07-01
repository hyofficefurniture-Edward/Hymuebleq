import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const manifestPath = path.join(root, "docs", "project-brain", "04-素材", "catalog-pdf-manifest.json");
const reportPath = path.join(root, "output", "qa-catalog-sources-report.json");

const failures = [];
const warnings = [];

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const catalogs = Array.isArray(manifest.catalogs) ? manifest.catalogs : [];
const manualInterests = Array.isArray(manifest.manualInterests) ? manifest.manualInterests : [];
const sourceInterests = new Set(manualInterests.map((item) => item.value).filter(Boolean));
const sectors = new Map();
let totalBytes = 0;

if (catalogs.length === 0) {
  failures.push("Catalog PDF manifest has no catalogs.");
}

for (const catalog of catalogs) {
  if (!catalog.id || !catalog.sector || !catalog.titleEs || !catalog.sourcePath) {
    failures.push(`Catalog entry is missing required metadata: ${JSON.stringify(catalog)}`);
    continue;
  }

  sectors.set(catalog.sector, (sectors.get(catalog.sector) ?? 0) + 1);

  if (!Array.isArray(catalog.leadInterests) || catalog.leadInterests.length === 0) {
    failures.push(`${catalog.id}: missing leadInterests.`);
  } else {
    for (const interest of catalog.leadInterests) {
      sourceInterests.add(interest);
    }
  }

  if (!fs.existsSync(catalog.sourcePath)) {
    failures.push(`${catalog.id}: source PDF does not exist: ${catalog.sourcePath}`);
    continue;
  }

  const stat = fs.statSync(catalog.sourcePath);
  if (!stat.isFile()) {
    failures.push(`${catalog.id}: source path is not a file.`);
  }
  if (stat.size <= 0) {
    failures.push(`${catalog.id}: source PDF is empty.`);
  }
  totalBytes += stat.size;
}

for (const requiredSector of ["hoteleria", "oficinas", "salud", "educacion", "residencial"]) {
  if (!sectors.has(requiredSector)) {
    failures.push(`Missing catalog source for sector: ${requiredSector}`);
  }
}

const catalogInterestsInHtml = new Set();
if (fs.existsSync(distDir)) {
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

  for (const file of collectHtmlFiles(distDir)) {
    const html = fs.readFileSync(file, "utf8");
    for (const match of html.matchAll(/\sdata-catalog-interest=(["'])(.*?)\1/gi)) {
      catalogInterestsInHtml.add(match[2]);
    }
  }

  for (const interest of catalogInterestsInHtml) {
    if (!sourceInterests.has(interest)) {
      failures.push(`Catalog interest is not mapped in manifest: ${interest}`);
    }
  }
} else {
  warnings.push("dist/ does not exist; run `pnpm build` before full catalog interest coverage check.");
}

const report = {
  manifest: path.relative(root, manifestPath),
  catalogCount: catalogs.length,
  sectors: Object.fromEntries([...sectors.entries()].sort()),
  mappedLeadInterests: sourceInterests.size,
  htmlCatalogInterests: catalogInterestsInHtml.size,
  totalSourceSizeMb: Number((totalBytes / 1024 / 1024).toFixed(1)),
  deliveryPolicy: manifest.deliveryPolicy,
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
