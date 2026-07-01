import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const globalPath = path.join(root, "src/styles/global.css");
const outputPath = path.join(root, "output/css-audit/css-static-analysis.json");

const readFile = (filePath) => fs.readFileSync(filePath, "utf8");
const lineForIndex = (text, index) => text.slice(0, index).split("\n").length;

const globalCss = readFile(globalPath);
const importPattern = /@import\s+["']([^"']+)["'];/g;
const cssFiles = [...globalCss.matchAll(importPattern)].map((match) => {
  const relativePath = match[1];
  const absolutePath = path.resolve(path.dirname(globalPath), relativePath);
  return {
    relativePath: path.relative(root, absolutePath),
    absolutePath,
  };
});

if (cssFiles.length === 0) {
  cssFiles.push({
    relativePath: path.relative(root, globalPath),
    absolutePath: globalPath,
  });
}

const sourceFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "dist" || entry.name === "output") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(astro|tsx?|jsx?)$/.test(entry.name)) sourceFiles.push(full);
  }
};
walk(path.join(root, "src"));

const sourceText = sourceFiles.map((file) => readFile(file)).join("\n");

const rules = [];
const mediaQueries = [];
const important = [];
const versionComments = [];
const hardCodedColors = [];
let cssLineCount = globalCss.split("\n").length;

for (const cssFile of cssFiles) {
  const css = readFile(cssFile.absolutePath);
  cssLineCount += css.split("\n").length;

  const rulePattern = /([^{}]+)\{([^{}]*)\}/g;
  let match;
  while ((match = rulePattern.exec(css)) !== null) {
    const selector = match[1].trim().replace(/\s+/g, " ");
    const body = match[2].trim();
    if (!selector || selector.startsWith("@") || !body.includes(":")) continue;
    const declarations = {};
    for (const raw of body.split(";")) {
      const colon = raw.indexOf(":");
      if (colon < 0) continue;
      const property = raw.slice(0, colon).trim();
      const value = raw.slice(colon + 1).trim();
      if (!property || !value) continue;
      declarations[property] = value;
    }
    rules.push({
      selector,
      file: cssFile.relativePath,
      line: lineForIndex(css, match.index),
      declarationCount: Object.keys(declarations).length,
      declarations,
    });
  }

  mediaQueries.push(
    ...[...css.matchAll(/@media\s*([^{]+)\{/g)].map((item) => ({
      query: item[1].trim().replace(/\s+/g, " "),
      file: cssFile.relativePath,
      line: lineForIndex(css, item.index),
    })),
  );

  important.push(
    ...[...css.matchAll(/!important/g)].map((item) => ({
      file: cssFile.relativePath,
      line: lineForIndex(css, item.index),
    })),
  );

  versionComments.push(
    ...[...css.matchAll(/\/\*\s*(v0\.[^*]+)\*\//g)].map((item) => ({
      label: item[1].trim(),
      file: cssFile.relativePath,
      line: lineForIndex(css, item.index),
    })),
  );

  hardCodedColors.push(
    ...[...css.matchAll(/#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\)/g)]
      .map((item) => item[0])
      .filter((value) => !value.includes("var(")),
  );
}

const bySelector = new Map();
for (const rule of rules) {
  if (!bySelector.has(rule.selector)) bySelector.set(rule.selector, []);
  bySelector.get(rule.selector).push(rule);
}

const duplicateSelectors = [...bySelector.entries()]
  .filter(([, items]) => items.length > 1)
  .map(([selector, items]) => {
    const propertyCounts = {};
    for (const item of items) {
      for (const property of Object.keys(item.declarations)) {
        propertyCounts[property] = (propertyCounts[property] || 0) + 1;
      }
    }
    const repeatedProperties = Object.entries(propertyCounts)
      .filter(([, count]) => count > 1)
      .map(([property, count]) => ({ property, count }));
    return {
      selector,
      count: items.length,
      locations: items.map((item) => ({
        file: item.file,
        line: item.line,
      })),
      repeatedProperties,
    };
  })
  .sort((a, b) => b.count - a.count || b.repeatedProperties.length - a.repeatedProperties.length || a.selector.localeCompare(b.selector));

const allCss = cssFiles.map((file) => readFile(file.absolutePath)).join("\n");
const cssClasses = [...new Set([...allCss.matchAll(/\.([_a-zA-Z][-_a-zA-Z0-9]*)/g)].map((item) => item[1]))].sort();
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const hasSourceClassToken = (className) => {
  const tokenPattern = new RegExp(`(?<![-_a-zA-Z0-9])${escapeRegExp(className)}(?![-_a-zA-Z0-9])`);
  return tokenPattern.test(sourceText);
};
const sourceReferencedClasses = cssClasses.filter((className) => hasSourceClassToken(className));
const sourceUnreferencedClasses = cssClasses.filter((className) => !hasSourceClassToken(className));

const colorCounts = {};
for (const color of hardCodedColors) colorCounts[color] = (colorCounts[color] || 0) + 1;
const repeatedColors = Object.entries(colorCounts)
  .filter(([, count]) => count > 1)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30)
  .map(([value, count]) => ({ value, count }));

const report = {
  generatedAt: new Date().toISOString(),
  globalFile: path.relative(root, globalPath),
  cssFiles: cssFiles.map((file) => file.relativePath),
  cssFileCount: cssFiles.length,
  cssLineCount,
  sourceFileCount: sourceFiles.length,
  ruleCount: rules.length,
  duplicateSelectorCount: duplicateSelectors.length,
  duplicateSelectors: duplicateSelectors.slice(0, 120),
  cssClassCount: cssClasses.length,
  sourceReferencedClassCount: sourceReferencedClasses.length,
  sourceUnreferencedClassCount: sourceUnreferencedClasses.length,
  sourceUnreferencedClasses: sourceUnreferencedClasses.slice(0, 220),
  mediaQueryCount: mediaQueries.length,
  mediaQueries,
  importantCount: important.length,
  important,
  versionComments,
  repeatedColors,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({
  cssFileCount: report.cssFileCount,
  cssLineCount: report.cssLineCount,
  ruleCount: report.ruleCount,
  duplicateSelectorCount: report.duplicateSelectorCount,
  topDuplicateSelectors: report.duplicateSelectors.slice(0, 10).map((item) => ({
    selector: item.selector,
    count: item.count,
    repeatedProperties: item.repeatedProperties.map((property) => property.property),
    locations: item.locations,
  })),
  cssClassCount: report.cssClassCount,
  sourceUnreferencedClassCount: report.sourceUnreferencedClassCount,
  sourceUnreferencedClasses: report.sourceUnreferencedClasses,
  mediaQueryCount: report.mediaQueryCount,
  importantCount: report.importantCount,
  important: report.important,
}, null, 2));
console.log(`Wrote ${outputPath}`);
