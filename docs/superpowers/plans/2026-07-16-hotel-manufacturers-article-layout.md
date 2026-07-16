# Hotel Manufacturers Article Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved A editorial layout to the hotel-manufacturers article without changing any SEO value, copy, heading, table cell, link, date, or image attribute.

**Architecture:** Keep the change inside the existing Astro page. Add one `.hotel-guide` scope, semantic grouping wrappers around existing nodes, and a scoped `<style>` block; do not change shared components or global CSS. Verify safety by comparing generated-HTML fingerprints from before and after the layout change, then run the existing CSS, build, static, and browser QA.

**Tech Stack:** Astro 5, scoped CSS, semantic HTML, Playwright 1.61, existing pnpm QA scripts.

## Global Constraints

- Modify only `src/pages/recursos/top-10-fabricantes-muebles-hoteles-china-2026.astro` for production behavior.
- Do not modify `BaseLayout.astro`, `CTA.astro`, global CSS, Sitemap, navigation, data files, or other routes.
- Keep all frontmatter constants, `BaseLayout` props, Article JSON-LD, and FAQPage JSON-LD byte-for-byte unchanged.
- Keep all H1–H4 text, hierarchy, order, body copy, lists, table cells, links, CTA copy, and brand-signature copy unchanged.
- Keep all seven article images in the same order with the same `src`, `alt`, `width`, `height`, loading, decoding, and fetch-priority attributes.
- Do not add visible directory, anchor-navigation, summary, tag, section-label, or accordion copy from the demos.
- Keep `.agents/` and `AGENTS.md` untracked and out of every commit.
- Treat the known private catalog-PDF path failure as out of scope and report it separately if it appears.

---

### Task 1: Capture the pre-layout generated-page baseline

**Files:**
- Read: `src/pages/recursos/top-10-fabricantes-muebles-hoteles-china-2026.astro`
- Generate outside Git: `/tmp/hymueble-top10-before.html`
- Generate outside Git: `/tmp/hymueble-article-fingerprint.mjs`
- Generate outside Git: `/tmp/hymueble-top10-before.json`

**Interfaces:**
- Consumes: the current branch before any production-page edit.
- Produces: one generated HTML baseline and one normalized JSON fingerprint for Task 4.

- [ ] **Step 1: Confirm the production page is still unchanged**

Run:

```bash
git status --short
git diff main...HEAD -- src/pages/recursos/top-10-fabricantes-muebles-hoteles-china-2026.astro
```

Expected: status lists only the pre-existing `.agents/` and `AGENTS.md`; the page diff is empty.

- [ ] **Step 2: Build the current page and preserve its generated HTML**

Run:

```bash
pnpm build
cp dist/recursos/top-10-fabricantes-muebles-hoteles-china-2026/index.html /tmp/hymueble-top10-before.html
```

Expected: Astro check and build pass, and `/tmp/hymueble-top10-before.html` exists.

- [ ] **Step 3: Create the temporary fingerprint utility**

Create `/tmp/hymueble-article-fingerprint.mjs` with this complete behavior:

```js
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  throw new Error("Usage: node fingerprint.mjs INPUT_HTML OUTPUT_JSON");
}

const playwrightUrl = pathToFileURL(
  path.resolve(process.cwd(), "node_modules/playwright/index.mjs"),
).href;
const { chromium } = await import(playwrightUrl);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setContent(await fs.readFile(inputPath, "utf8"));

const fingerprint = await page.evaluate(() => {
  const content = (element) =>
    element?.textContent?.replace(/\s+/g, " ").trim() ?? "";
  const meta = (selector) =>
    document.querySelector(selector)?.getAttribute("content") ?? "";
  const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map((script) => JSON.parse(script.textContent || "{}"));
  const articleRoot = document.querySelector("main");
  const textClone = articleRoot?.cloneNode(true);
  textClone?.querySelectorAll("script, style").forEach((node) => node.remove());

  return {
    title: document.title,
    description: meta('meta[name="description"]'),
    keywords: meta('meta[name="keywords"]'),
    robots: meta('meta[name="robots"]'),
    canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
    openGraph: {
      title: meta('meta[property="og:title"]'),
      description: meta('meta[property="og:description"]'),
      url: meta('meta[property="og:url"]'),
      image: meta('meta[property="og:image"]'),
    },
    twitter: {
      title: meta('meta[name="twitter:title"]'),
      description: meta('meta[name="twitter:description"]'),
      image: meta('meta[name="twitter:image"]'),
    },
    headings: [...document.querySelectorAll("h1, h2, h3, h4")].map((heading) => ({
      tag: heading.tagName,
      text: content(heading),
    })),
    jsonLd,
    visibleDate: content(document.querySelector(".resource-hero-copy .eyebrow")),
    bodyText: content(textClone),
    tables: [...document.querySelectorAll("table")].map((table) =>
      [...table.rows].map((row) =>
        [...row.cells].map((cell) => content(cell)),
      ),
    ),
    images: [...(articleRoot?.querySelectorAll("img") ?? [])].map((image) => ({
      src: image.getAttribute("src"),
      alt: image.getAttribute("alt"),
      width: image.getAttribute("width"),
      height: image.getAttribute("height"),
      loading: image.getAttribute("loading"),
      decoding: image.getAttribute("decoding"),
      fetchpriority: image.getAttribute("fetchpriority"),
    })),
    links: [...(articleRoot?.querySelectorAll("a") ?? [])].map((link) => ({
      href: link.getAttribute("href"),
      text: content(link),
    })),
  };
});

await browser.close();
await fs.writeFile(outputPath, `${JSON.stringify(fingerprint, null, 2)}\n`);
```

- [ ] **Step 4: Export and sanity-check the baseline**

Run:

```bash
node /tmp/hymueble-article-fingerprint.mjs /tmp/hymueble-top10-before.html /tmp/hymueble-top10-before.json
node -e 'const f=require("/tmp/hymueble-top10-before.json"); const types=f.jsonLd.map(x=>x["@type"]); if(f.title!=="Top 10 fabricantes de muebles para hoteles en China (2026)"||f.headings.filter(x=>x.tag==="H1").length!==1||f.tables.length!==4||f.images.length!==7||types.join(",")!=="Organization,Article,FAQPage") process.exit(1); console.log("article baseline: ok")'
```

Expected: `article baseline: ok`. The three generated JSON-LD blocks are the
global Organization schema plus this page's Article and FAQPage schemas.

---

### Task 2: Add isolated editorial structure without changing content

**Files:**
- Modify: `src/pages/recursos/top-10-fabricantes-muebles-hoteles-china-2026.astro:74-336`

**Interfaces:**
- Consumes: the exact existing article nodes and Task 1 baseline.
- Produces: `.hotel-guide` as the page scope and semantic class hooks used by Task 3.

- [ ] **Step 1: Add the page scope and section modifiers**

Apply these exact structural hooks:

```astro
<div class="hotel-guide">
```

Change the nine existing section opening tags, in their current order, to:

```astro
<section class="section article-hero">
<section class="section alt article-section article-context">
<section class="section article-section article-methodology">
<section class="section alt article-section article-ranking">
<section class="section article-section article-comparison">
<section class="section alt article-section article-budget">
<section class="section article-section article-mistakes">
<section class="section alt article-section article-faq">
<section class="section brand-signature">
```

Place the existing CTA between the FAQ closing tag and brand-signature opening
tag, then close the page scope after the brand-signature closing tag:

```astro
</div>
```

Keep the two JSON-LD scripts outside and immediately before `.hotel-guide`.

- [ ] **Step 2: Add width and table hooks**

Use these exact class additions:

```astro
<div class="container article-prose">
<div class="container article-prose article-prose--wide">
<div class="container article-wide">
<div class="resource-table-wrapper methodology-table">
<div class="resource-table-wrapper capability-table">
<div class="resource-table-wrapper comparison-table">
<div class="resource-table-wrapper budget-table">
```

The context, mistakes, FAQ, and ranking prose containers use `.article-prose`; the comparison and budget containers use `.article-wide`.

- [ ] **Step 3: Group existing manufacturer content**

Wrap each existing manufacturer block with:

```astro
<article class="manufacturer-entry">
</article>
```

Use this modifier only for the second block:

```astro
<article class="manufacturer-entry manufacturer-entry--featured">
</article>
```

Inside the second block, wrap only the three consecutive case figures after “Casos representativos en América Latina”:

```astro
<div class="project-gallery">
</div>
```

Move no content: insert the opening gallery wrapper immediately before the
existing hotel-exterior figure, and insert its closing tag immediately after
the existing boutique-hotel figure. Do not move the factory figure, capability
table, or final lobby figure out of the second manufacturer block.

- [ ] **Step 4: Add list, FAQ, and mobile methodology hooks**

Apply:

```astro
<ol class="editorial-list">
<blockquote class="data-callout">
<ol class="compact-list">
<article class="faq-item">
</article>
```

Insert each FAQ opening tag immediately before its existing `h3` and the
closing tag immediately after its following `p`. Add `data-label="Evalúa"` to
the second cell and `data-label="Importa"` to the third cell of every
methodology body row. Do not add a label to the first cell and do not change
cell text.

- [ ] **Step 5: Verify that the diff contains structure only**

Run:

```bash
git diff --word-diff=porcelain -- src/pages/recursos/top-10-fabricantes-muebles-hoteles-china-2026.astro
```

Expected: additions and removals are tags, class names, and `data-label` attributes; no frontmatter value, visible text, table cell, link, or image attribute changes.

---

### Task 3: Implement the scoped A-layout visual system

**Files:**
- Modify: `src/pages/recursos/top-10-fabricantes-muebles-hoteles-china-2026.astro` after `</BaseLayout>`

**Interfaces:**
- Consumes: the class hooks from Task 2.
- Produces: desktop, tablet, and mobile editorial layouts isolated to `.hotel-guide`.

- [ ] **Step 1: Add the scoped desktop foundation**

Add one Astro `<style>` block. Every selector must begin with `.hotel-guide` or be nested under it. Implement these exact layout values:

```css
.hotel-guide {
  --article-ink: #121a22;
  --article-muted: #596672;
  --article-gold: #987848;
  --article-line: #e7e2d9;
  --article-warm: #f8f7f4;
  overflow: clip;
}

.hotel-guide .article-hero {
  padding-block: clamp(64px, 6vw, 96px);
  background: linear-gradient(180deg, #fff 0%, #f8f7f4 100%);
}

.hotel-guide .article-hero .resource-hero-grid {
  grid-template-columns: minmax(0, .88fr) minmax(480px, 1.12fr);
  gap: clamp(42px, 5vw, 78px);
}

.hotel-guide .article-section {
  padding-block: clamp(68px, 6vw, 88px);
}

.hotel-guide .article-prose {
  width: min(840px, calc(100% - 48px));
}

.hotel-guide .article-prose--wide {
  width: min(980px, calc(100% - 48px));
}

.hotel-guide .article-wide {
  width: min(1240px, calc(100% - 48px));
}
```

Set article H2 spacing, paragraph/list line-height, figure rhythm, figcaption style, and `overflow-wrap:anywhere` for H2–H4 without changing global type rules.

- [ ] **Step 2: Style methodology and all table families**

Implement:

- `.resource-table-wrapper`: contained horizontal overflow, 1px border, 8px radius, white background.
- Tables: full width, collapsed borders, 14–16px cells, left alignment.
- Header: `#101820` background and white text.
- Alternating body rows: `#fbfaf8`.
- `.methodology-table`: no fixed minimum width on desktop.
- `.comparison-table table`: `min-width: 980px`.
- `.budget-table table`: `min-width: 760px`.
- `.capability-table table`: `min-width: 0`.
- `.comparison-table tbody tr:nth-child(2)`: warm highlighted background and dark text.

- [ ] **Step 3: Style ranking, HYMUEBLE, gallery, mistakes, and FAQ**

Implement:

- `.manufacturer-entry`: top border, 30–34px vertical padding.
- `.manufacturer-entry--featured`: warm background, gold-tinted border, 8px radius, 28–34px internal spacing, natural height.
- `.project-gallery`: three equal columns, 14px gap; images remain uncropped with `height:auto`.
- `.compact-list`: three equal columns, no default markers, 16px gaps; each `li` gets a restrained border and warm background.
- `.faq-item`: 22–26px vertical padding and a top divider; answers remain visible.
- `.brand-signature`: smaller section padding and top border.

- [ ] **Step 4: Add tablet and mobile rules**

At `max-width: 900px`:

```css
.hotel-guide .article-hero .resource-hero-grid {
  grid-template-columns: 1fr;
}

.hotel-guide .project-gallery {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.hotel-guide .compact-list {
  grid-template-columns: 1fr;
}
```

At `max-width: 620px`:

- Set section padding to 46–56px.
- Set all article containers to `calc(100% - 32px)`.
- Set body copy to 16px and approximately 1.7 line-height.
- Turn the methodology `<thead>` into visually hidden content.
- Set methodology `table`, `tbody`, `tr`, and `td` to block layout.
- Give every methodology row a divider and 14–16px vertical padding.
- Display `td[data-label]::before` as a small gold uppercase label.
- Keep comparison and budget tables as horizontal-scroll tables.
- Set `.project-gallery` to one column.
- Reduce featured-block padding without removing its distinction.

- [ ] **Step 5: Run the fast structural checks**

Run:

```bash
pnpm qa:css
pnpm build
pnpm qa:static
git diff --check
```

Expected: all four commands pass.

---

### Task 4: Prove zero SEO/content drift and complete visual QA

**Files:**
- Read: `dist/recursos/top-10-fabricantes-muebles-hoteles-china-2026/index.html`
- Read: `/tmp/hymueble-top10-before.json`
- Generate outside Git: `/tmp/hymueble-top10-after.json`
- Generate outside Git: `output/playwright/hymueble-top10-desktop.png`
- Generate outside Git: `output/playwright/hymueble-top10-tablet.png`
- Generate outside Git: `output/playwright/hymueble-top10-mobile.png`

**Interfaces:**
- Consumes: Task 1 baseline and Task 3 built page.
- Produces: a zero-diff fingerprint plus responsive screenshots and QA results.

- [ ] **Step 1: Export and compare the post-layout fingerprint**

Run:

```bash
node /tmp/hymueble-article-fingerprint.mjs dist/recursos/top-10-fabricantes-muebles-hoteles-china-2026/index.html /tmp/hymueble-top10-after.json
diff -u /tmp/hymueble-top10-before.json /tmp/hymueble-top10-after.json
```

Expected: `diff` produces no output and exits 0.

- [ ] **Step 2: Start the local site and run browser QA**

Run the dev server in one terminal:

```bash
pnpm dev
```

Run browser QA against it:

```bash
QA_BASE_URL=http://127.0.0.1:4321 pnpm qa:browser
```

Expected: all route/viewports pass, including the article desktop and mobile checks.

- [ ] **Step 3: Capture responsive screenshots**

Use Playwright against
`http://127.0.0.1:4321/recursos/top-10-fabricantes-muebles-hoteles-china-2026/`
at:

- 1440×900 → `output/playwright/hymueble-top10-desktop.png`
- 1024×768 → `output/playwright/hymueble-top10-tablet.png`
- 390×844 → `output/playwright/hymueble-top10-mobile.png`

Capture full-page screenshots after `document.fonts.ready` and all seven article images report `complete && naturalWidth > 0`.

- [ ] **Step 4: Inspect visual acceptance criteria**

Confirm:

- Hero has no abnormal blank area.
- Prose width and vertical rhythm are consistent.
- Methodology is a compact desktop table and stacked mobile rows.
- All ten manufacturers are visible and HYMUEBLE is the only featured block.
- The HYMUEBLE gallery does not distort evidence images.
- Only table wrappers scroll horizontally on mobile.
- Mistakes, FAQ, CTA, brand signature, and WhatsApp do not overlap.
- `document.documentElement.scrollWidth === document.documentElement.clientWidth` at all three viewports.

- [ ] **Step 5: Verify the existing implementation commits and clean tree**

Run:

```bash
git log --oneline main..HEAD
git diff --name-only main...HEAD
git status --short
```

Expected: the branch contains the approved design/plan commits plus the
structure and scoped-style commits; the production diff contains only the
target article, while documentation diffs stay under `docs/superpowers/`.
Status still shows only `.agents/` and `AGENTS.md`.

---

### Task 5: Publish and verify production

**Files:**
- No additional source changes.

**Interfaces:**
- Consumes: the fully verified branch.
- Produces: a pushed branch, reviewable pull request, merged deployment, and live visual confirmation.

- [ ] **Step 1: Push the implementation branch**

Run:

```bash
git push -u origin codex/article-layout-a
```

Expected: GitHub accepts the branch.

- [ ] **Step 2: Open a pull request**

Create a ready-for-review PR targeting `main` with:

- Scope: article-only layout and scoped CSS.
- Explicit SEO/content fingerprint result.
- `pnpm qa:css`, `pnpm build`, `pnpm qa:static`, and `pnpm qa:browser` results.
- Note that the existing catalog-PDF absolute-path CI issue is unrelated if it appears.

- [ ] **Step 3: Merge after review and wait for deployment**

Merge only when the article diff and checks match this plan. Confirm the Pages deployment reaches success.

- [ ] **Step 4: Recheck the live URL**

Open:

```text
https://hymueble.com/recursos/top-10-fabricantes-muebles-hoteles-china-2026/
```

Verify the A layout at desktop and mobile widths and recheck Title, canonical,
H1, publication date, and all three JSON-LD blocks (Organization, Article,
FAQPage) on the live response.
