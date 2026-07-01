import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const stylesDir = path.join(root, "src", "styles");
const globalPath = path.join(stylesDir, "global.css");
const outputDir = path.join(root, "output");
const reportPath = path.join(outputDir, "qa-css-structure-report.json");

const expectedImports = [
  "./partials/00-foundation.css",
  "./partials/10-home-hero-cards.css",
  "./partials/11-solutions-process.css",
  "./partials/12-factory-qualification.css",
  "./partials/13-trust-video.css",
  "./partials/14-resources.css",
  "./partials/20-showroom-quality.css",
  "./partials/30-contact-form-cta.css",
  "./partials/31-footer.css",
  "./partials/32-responsive-tablet.css",
  "./partials/33-responsive-mobile.css",
  "./partials/34-responsive-small.css",
  "./partials/40-visual-overrides.css",
  "./partials/41-home-layout-responsive.css",
  "./partials/42-trust-evidence.css",
  "./partials/43-modal-project-summary.css",
  "./partials/44-catalog-factory-mobile.css",
  "./partials/45-final-type-legal-safeguards.css",
];

const failures = [];
const warnings = [];

const readFile = (filePath) => fs.readFileSync(filePath, "utf8");
const lineCount = (text) => (text.length === 0 ? 0 : text.split("\n").length);

if (!fs.existsSync(globalPath)) {
  failures.push("src/styles/global.css is missing.");
}

let globalLines = 0;
let actualImports = [];
let nonImportContentLines = [];

if (fs.existsSync(globalPath)) {
  const globalCss = readFile(globalPath);
  globalLines = lineCount(globalCss);
  const withoutComments = globalCss.replace(/\/\*[\s\S]*?\*\//g, "");
  const lines = withoutComments
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  actualImports = lines
    .filter((line) => line.startsWith("@import"))
    .map((line) => {
      const match = line.match(/^@import\s+["']([^"']+)["'];$/);
      return match?.[1] ?? line;
    });

  nonImportContentLines = lines.filter((line) => !line.startsWith("@import"));

  if (globalLines > 80) {
    failures.push(`src/styles/global.css has ${globalLines} lines. Keep it as a small import entrypoint.`);
  }

  if (nonImportContentLines.length > 0) {
    failures.push("src/styles/global.css contains non-import CSS after comments are removed.");
  }

  if (JSON.stringify(actualImports) !== JSON.stringify(expectedImports)) {
    failures.push("src/styles/global.css import order does not match the approved CSS split structure.");
  }
}

const partialReports = expectedImports.map((importPath) => {
  const partialPath = path.join(stylesDir, importPath);
  const exists = fs.existsSync(partialPath);
  const css = exists ? readFile(partialPath) : "";
  const lines = exists ? lineCount(css) : 0;
  let braceBalance = 0;

  for (const char of css.replace(/\/\*[\s\S]*?\*\//g, "")) {
    if (char === "{") braceBalance += 1;
    if (char === "}") braceBalance -= 1;
  }

  if (!exists) {
    failures.push(`${importPath} is imported by global.css but the file is missing.`);
  }

  if (braceBalance !== 0) {
    failures.push(`${importPath} has unbalanced CSS braces.`);
  }

  if (lines > 2200) {
    warnings.push(`${importPath} has ${lines} lines. Consider splitting or cleaning old selectors before it grows further.`);
  }

  return {
    file: importPath,
    exists,
    lines,
    braceBalance,
  };
});

const report = {
  globalCss: {
    path: "src/styles/global.css",
    lines: globalLines,
    imports: actualImports,
    nonImportContentLines: nonImportContentLines.length,
  },
  expectedImports,
  partials: partialReports,
  failures,
  warnings,
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

if (failures.length > 0) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(report, null, 2));
