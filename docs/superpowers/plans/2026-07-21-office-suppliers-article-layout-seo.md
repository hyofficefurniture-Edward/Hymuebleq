# Office Suppliers Article Layout and SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved A editorial layout and the approved narrow SEO corrections to the office-suppliers article, while preserving its H1, body copy, ranking, tables, FAQ, CTA, and conversion position.

**Architecture:** Keep production behavior inside the existing Astro page plus one restored image asset. Add one `.office-guide` scope, semantic grouping wrappers around existing nodes, and a page-scoped `<style>` block; do not modify shared components or global CSS. Prove safety with generated-HTML fingerprints, image status checks, existing project QA, targeted Playwright geometry, and desktop/tablet/mobile screenshots.

**Tech Stack:** Astro 5, semantic HTML, page-scoped CSS, Playwright 1.61, ffmpeg image crop, pnpm QA scripts, GitHub Pages.

## Global Constraints

- Modify production behavior only in `src/pages/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026.astro`.
- Add only `public/assets/hymueble/recursos/blog/images/hym-02-oficina-ergonomica.jpg` as the restored production asset.
- Do not modify `BaseLayout.astro`, `CTA.astro`, shared CSS, `blog.astro`, Sitemap code, navigation, data files, forms, or other routes.
- Keep the URL, `canonicalPath`, keywords array, H1, all H2–H4 text/order, body copy, ranking, lists, table cells, FAQ answers, CTA copy, and brand signature unchanged.
- Keep all existing valid image sources, alt text, captions, order, lazy-loading attributes, and file contents unchanged.
- Change only the approved SEO fields: Title, Meta Description, Article `dateModified`, absolute Article image/logo URLs, the fixed current visible date source, the restored Hero dimensions, and two internal-link targets.
- Keep the visible date exactly `Guía de Compra · 21 de julio de 2026`.
- Keep all ten suppliers and feature only HYMUEBLE / Hongye Furniture Group.
- Keep `.agents/` and `AGENTS.md` untracked and out of every commit.
- Treat the known private catalog-PDF absolute-path CI failure as out of scope and report it separately if it appears.

---

### Task 1: Capture the generated-page baseline

**Files:**
- Read: `src/pages/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026.astro`
- Generate outside Git: `/tmp/hymueble-office-before.html`
- Generate outside Git: `/tmp/hymueble-office-fingerprint.mjs`
- Generate outside Git: `/tmp/hymueble-office-before.json`

**Interfaces:**
- Consumes: commit `64d3570` before any production-page or image edit.
- Produces: normalized HTML evidence used by Tasks 2 and 5.

- [ ] **Step 1: Confirm scope and branch state**

Run:

```bash
git status --short
git diff main...HEAD -- src/pages/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026.astro public/assets/hymueble/recursos/blog/images/
```

Expected: status contains only `.agents/` and `AGENTS.md`; the production diff is empty.

- [ ] **Step 2: Build and preserve the current generated page**

Run:

```bash
pnpm build
cp dist/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026/index.html /tmp/hymueble-office-before.html
```

Expected: Astro check/build pass and the preserved HTML exists.

- [ ] **Step 3: Create the temporary fingerprint utility**

Create `/tmp/hymueble-office-fingerprint.mjs` with this exact content:

```js
import fs from "node:fs/promises";
import { chromium } from "playwright";

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  throw new Error("Usage: node fingerprint.mjs INPUT_HTML OUTPUT_JSON");
}

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
  const main = document.querySelector("main");
  const textClone = main?.cloneNode(true);
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
      type: meta('meta[property="og:type"]'),
      locale: meta('meta[property="og:locale"]'),
      siteName: meta('meta[property="og:site_name"]'),
      imageAlt: meta('meta[property="og:image:alt"]'),
    },
    twitter: {
      card: meta('meta[name="twitter:card"]'),
      title: meta('meta[name="twitter:title"]'),
      description: meta('meta[name="twitter:description"]'),
      image: meta('meta[name="twitter:image"]'),
    },
    headings: [...document.querySelectorAll("main h1, main h2, main h3, main h4")].map((heading) => ({
      tag: heading.tagName,
      text: content(heading),
    })),
    jsonLd,
    visibleDate: content(document.querySelector(".resource-hero-copy .eyebrow")),
    bodyText: content(textClone),
    tables: [...document.querySelectorAll("main table")].map((table) =>
      [...table.rows].map((row) => [...row.cells].map((cell) => content(cell))),
    ),
    images: [...(main?.querySelectorAll("img") ?? [])].map((image) => ({
      src: image.getAttribute("src"),
      alt: image.getAttribute("alt"),
      width: image.getAttribute("width"),
      height: image.getAttribute("height"),
      loading: image.getAttribute("loading"),
      decoding: image.getAttribute("decoding"),
      fetchpriority: image.getAttribute("fetchpriority"),
    })),
    links: [...(main?.querySelectorAll("a") ?? [])].map((link) => ({
      href: link.getAttribute("href"),
      text: content(link),
    })),
  };
});

await browser.close();
await fs.writeFile(outputPath, `${JSON.stringify(fingerprint, null, 2)}\n`);
```

- [ ] **Step 4: Export and assert the baseline**

Run:

```bash
node /tmp/hymueble-office-fingerprint.mjs /tmp/hymueble-office-before.html /tmp/hymueble-office-before.json
node - <<'NODE'
const f = require('/tmp/hymueble-office-before.json');
const types = f.jsonLd.map((item) => item['@type']);
const rows = f.tables.map((table) => table.length - 1);
if (f.title !== 'Top 10 Proveedores de Mobiliario de Oficina Ergonómico 2026 | Guía B2B') throw new Error('unexpected baseline title');
if (f.description.length !== 169) throw new Error('unexpected baseline meta length');
if (f.visibleDate !== 'Guía de Compra · 21 de julio de 2026') throw new Error('unexpected baseline date');
if (f.headings.filter((item) => item.tag === 'H1').length !== 1) throw new Error('H1 count');
if (rows.join(',') !== '6,4,10,4,7') throw new Error(`table rows ${rows}`);
if (f.images.length !== 7 || f.links.length !== 3) throw new Error('image/link count');
if (types.join(',') !== 'Organization,Article,FAQPage') throw new Error(`schema ${types}`);
console.log('office article baseline: ok');
NODE
```

Expected: `office article baseline: ok`.

---

### Task 2: Repair the Hero and apply the approved SEO fields

**Files:**
- Create: `public/assets/hymueble/recursos/blog/images/hym-02-oficina-ergonomica.jpg`
- Modify: `src/pages/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026.astro:1-80`

**Interfaces:**
- Consumes: Task 1 baseline and existing `hym-02-img-06.png`.
- Produces: a 550×309 Hero at the already-published URL and the approved metadata/schema/internal links.

- [ ] **Step 1: Reproduce the missing-image failure**

Run:

```bash
test ! -f public/assets/hymueble/recursos/blog/images/hym-02-oficina-ergonomica.jpg
curl -sS -o /dev/null -w '%{http_code}\n' https://hymueble.com/assets/hymueble/recursos/blog/images/hym-02-oficina-ergonomica.jpg
```

Expected: the local file test passes and curl prints `404`.

- [ ] **Step 2: Restore the existing URL with a deterministic crop**

Run:

```bash
ffmpeg -hide_banner -loglevel error -y \
  -i public/assets/hymueble/recursos/blog/images/hym-02-img-06.png \
  -vf 'crop=550:309:0:70' -q:v 3 \
  public/assets/hymueble/recursos/blog/images/hym-02-oficina-ergonomica.jpg
sips -g pixelWidth -g pixelHeight public/assets/hymueble/recursos/blog/images/hym-02-oficina-ergonomica.jpg
```

Expected: JPEG output is exactly 550×309 and contains only the existing office-space evidence image.

- [ ] **Step 3: Apply the exact approved metadata and schema values**

Change the frontmatter to these values:

```astro
const pageTitle = "Top 10 proveedores de mobiliario de oficina ergonómico (2026)";
const pageDescription = "Compare 10 proveedores de mobiliario de oficina ergonómico en China en 2026: capacidad, certificaciones, MOQ, precios y soporte para proyectos B2B.";
const publicationDateLabel = "21 de julio de 2026";
```

Keep `datePublished: "2026-07-17"`, then use:

```js
publisher: {
  "@type": "Organization",
  name: "Hymueble",
  logo: {
    "@type": "ImageObject",
    url: "https://hymueble.com/assets/hymueble/brand/hymueble-logo.webp",
  },
},
dateModified: "2026-07-21",
image: "https://hymueble.com" + pageImage,
```

Replace only the dynamic date expression with:

```astro
{publicationDateLabel}
```

Add only these Hero dimensions:

```astro
width="550" height="309"
```

- [ ] **Step 4: Add the two approved internal links without changing text**

In the first introduction paragraph, wrap the existing phrase as:

```astro
<a href="/oficinas/">mobiliario de oficina</a>
```

In the first cell of the HYMUEBLE product table, wrap the existing phrase as:

```astro
<a href="/catalogo/oficinas/sillas-de-oficina/">Sillas ergonómicas</a>
```

- [ ] **Step 5: Build and assert the approved SEO delta**

Run:

```bash
pnpm build
node /tmp/hymueble-office-fingerprint.mjs dist/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026/index.html /tmp/hymueble-office-seo.json
node - <<'NODE'
const assert = require('node:assert/strict');
const before = require('/tmp/hymueble-office-before.json');
const after = require('/tmp/hymueble-office-seo.json');
assert.equal(after.title, 'Top 10 proveedores de mobiliario de oficina ergonómico (2026)');
assert.equal(after.description, 'Compare 10 proveedores de mobiliario de oficina ergonómico en China en 2026: capacidad, certificaciones, MOQ, precios y soporte para proyectos B2B.');
assert.equal(after.visibleDate, before.visibleDate);
assert.deepEqual(after.headings, before.headings);
assert.equal(after.bodyText, before.bodyText);
assert.deepEqual(after.tables, before.tables);
assert.equal(after.images.length, 7);
assert.deepEqual(after.images.slice(1), before.images.slice(1));
assert.equal(after.images[0].width, '550');
assert.equal(after.images[0].height, '309');
assert.equal(after.links.length, 5);
assert.deepEqual(after.links.slice(-3), before.links.slice(-3));
const article = after.jsonLd.find((item) => item['@type'] === 'Article');
assert.equal(article.datePublished, '2026-07-17');
assert.equal(article.dateModified, '2026-07-21');
assert.equal(article.image, 'https://hymueble.com/assets/hymueble/recursos/blog/images/hym-02-oficina-ergonomica.jpg');
assert.equal(article.publisher.logo.url, 'https://hymueble.com/assets/hymueble/brand/hymueble-logo.webp');
console.log('approved SEO delta: ok');
NODE
git diff --check
```

Expected: build passes, `approved SEO delta: ok`, and diff check passes.

- [ ] **Step 6: Commit the SEO and asset repair**

Run:

```bash
git add src/pages/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026.astro public/assets/hymueble/recursos/blog/images/hym-02-oficina-ergonomica.jpg
git commit -m "fix: repair office article SEO and hero"
```

Expected: one commit containing only the named page and image.

---

### Task 3: Add isolated editorial structure

**Files:**
- Modify: `src/pages/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026.astro:55-341`

**Interfaces:**
- Consumes: the exact article nodes from Task 2.
- Produces: `.office-guide` and semantic class hooks for Task 4.

- [ ] **Step 1: Add the page scope and section modifiers**

Insert `<div class="office-guide">` after the two page JSON-LD scripts and close it after the brand-signature section. Apply these section classes in current order:

```astro
<section class="section article-hero">
<section class="section alt article-section article-context">
<section class="section article-section article-methodology">
<section class="section alt article-section article-ranking">
<section class="section article-section article-comparison">
<section class="section alt article-section article-budget">
<section class="section article-section article-cost">
<section class="section alt article-section article-mistakes">
<section class="section alt article-section article-faq">
<section class="section brand-signature">
```

Keep the CTA between FAQ and brand signature and inside `.office-guide`.

- [ ] **Step 2: Add exact reading-width and table hooks**

Use `.article-prose` for context, ranking, mistakes, and FAQ. Use `.article-prose.article-prose--wide` for methodology. Use `.article-wide` for comparison, budget, and cost.

Apply the table wrappers:

```astro
<div class="resource-table-wrapper methodology-table">
<div class="resource-table-wrapper capability-table">
<div class="resource-table-wrapper comparison-table">
<div class="resource-table-wrapper budget-table">
<div class="resource-table-wrapper cost-table">
```

Add `data-label="Evalúa"` and `data-label="Importa"` to the second and third cell of all six methodology body rows.

- [ ] **Step 3: Group all ten suppliers**

Wrap each supplier from its `h3` through the last node before the next supplier `h3`:

```astro
<article class="supplier-entry">
</article>
```

Insert the opening tag immediately before each existing supplier `h3` and the closing tag immediately after that supplier's final existing node; do not replace, summarize, or move any inner node.

Use only for supplier 2:

```astro
<article class="supplier-entry supplier-entry--featured">
```

The featured block must include both HYMUEBLE figures, the “Qué fabricamos” H4 and table, the installation H4/list, and the final “No es para usted” paragraph. Keep the Quama image in supplier 3 and the UE Furniture image in supplier 4.

- [ ] **Step 4: Add list and FAQ group hooks**

Use:

```astro
<ol class="editorial-list">
<blockquote class="data-callout">
<ol class="compact-list">
<article class="faq-item">
```

Wrap each FAQ `h3 + p` pair in one `.faq-item`; keep all answers visible.

- [ ] **Step 5: Remove the six repeated inline layout-style bundles**

For the six body figures, remove only the existing `style` attributes from `<figure>`, `<img>`, and `<figcaption>`. Keep every `src`, `alt`, caption, loading, decoding, order, and surrounding section unchanged. Do not remove the Hero alignment style or brand-signature text-align style.

- [ ] **Step 6: Prove structure-only content safety and commit**

Run:

```bash
pnpm build
node /tmp/hymueble-office-fingerprint.mjs dist/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026/index.html /tmp/hymueble-office-structure.json
node - <<'NODE'
const assert = require('node:assert/strict');
const seo = require('/tmp/hymueble-office-seo.json');
const current = require('/tmp/hymueble-office-structure.json');
assert.deepEqual(current, seo);
console.log('structure content fingerprint: identical');
NODE
test "$(rg -o 'class="supplier-entry' src/pages/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026.astro | wc -l | tr -d ' ')" = "10"
test "$(rg -o 'supplier-entry--featured' src/pages/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026.astro | wc -l | tr -d ' ')" = "1"
test "$(rg -o 'class="faq-item"' src/pages/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026.astro | wc -l | tr -d ' ')" = "6"
git diff --check
git add src/pages/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026.astro
git commit -m "refactor: structure office suppliers article"
```

Expected: exact fingerprint match, counts 10/1/6, and one page-only commit.

---

### Task 4: Implement the scoped editorial visual system

**Files:**
- Modify: `src/pages/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026.astro` after `</BaseLayout>`

**Interfaces:**
- Consumes: Task 3 class hooks.
- Produces: desktop, tablet, and mobile layouts isolated to `.office-guide`.

- [ ] **Step 1: Add the complete scoped style block**

Append this exact block after `</BaseLayout>`; do not split selectors into shared CSS:

```astro
<style>
  .office-guide {
    --article-ink: #121a22;
    --article-muted: #596672;
    --article-gold: #987848;
    --article-line: #e7e2d9;
    --article-warm: #f8f7f4;
    overflow: clip;
  }

  .office-guide img {
    height: auto;
  }

  .office-guide .article-hero {
    padding-block: clamp(64px, 6vw, 96px);
    background: linear-gradient(180deg, #fff 0%, #f8f7f4 100%);
  }

  .office-guide .article-hero .resource-hero-grid {
    grid-template-columns: minmax(0, .88fr) minmax(480px, 1.12fr);
    gap: clamp(42px, 5vw, 78px);
  }

  .office-guide .article-hero .resource-hero-media img {
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .office-guide .article-section {
    padding-block: clamp(68px, 6vw, 88px);
  }

  .office-guide .article-prose {
    width: min(840px, calc(100% - 48px));
  }

  .office-guide .article-prose--wide {
    width: min(980px, calc(100% - 48px));
  }

  .office-guide .article-wide {
    width: min(1240px, calc(100% - 48px));
  }

  .office-guide .article-section h2 {
    margin: 0 0 22px;
  }

  .office-guide .article-section h3 {
    margin: 24px 0 10px;
  }

  .office-guide .article-section h4 {
    margin: 30px 0 10px;
  }

  .office-guide .article-hero h1,
  .office-guide .article-section h2,
  .office-guide .article-section h3,
  .office-guide .article-section h4 {
    overflow-wrap: anywhere;
  }

  .office-guide .article-section p,
  .office-guide .article-section li {
    color: var(--article-muted);
    line-height: 1.74;
  }

  .office-guide .article-section p {
    margin: 0 0 18px;
  }

  .office-guide .article-section ol:not(.compact-list),
  .office-guide .article-section ul {
    margin: 20px 0 24px;
    padding-left: 24px;
  }

  .office-guide .article-section li + li {
    margin-top: 9px;
  }

  .office-guide .article-prose figure {
    display: grid;
    justify-items: center;
    margin: 30px 0 34px;
    text-align: center;
  }

  .office-guide .article-prose figure img {
    width: auto;
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(18, 26, 34, .08);
  }

  .office-guide .article-prose figcaption {
    max-width: 740px;
    margin-top: 10px;
    color: var(--article-muted);
    font-size: 13px;
    line-height: 1.55;
  }

  .office-guide .data-callout {
    margin: 24px 0 0;
    padding: 20px 22px;
    border-left: 3px solid var(--article-gold);
    border-radius: 0 8px 8px 0;
    background: var(--article-warm);
  }

  .office-guide .data-callout p:last-child {
    margin: 0;
  }

  .office-guide .resource-hero-copy a,
  .office-guide .article-prose a,
  .office-guide .resource-table-wrapper a {
    color: var(--article-gold);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
  }

  .office-guide .resource-table-wrapper {
    max-width: 100%;
    margin: 26px 0;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    border: 1px solid var(--article-line);
    border-radius: 8px;
    background: #fff;
    -webkit-overflow-scrolling: touch;
  }

  .office-guide .resource-table-wrapper table {
    width: 100%;
    border-collapse: collapse;
    color: var(--article-muted);
    font-size: 14px;
    line-height: 1.5;
  }

  .office-guide .resource-table-wrapper th,
  .office-guide .resource-table-wrapper td {
    padding: 14px 16px;
    border-top: 1px solid var(--article-line);
    text-align: left;
    vertical-align: top;
  }

  .office-guide .resource-table-wrapper th {
    border-top: 0;
    background: #101820;
    color: #fff;
    font-size: 13px;
    font-weight: 800;
  }

  .office-guide .resource-table-wrapper tbody tr:nth-child(even) {
    background: #fbfaf8;
  }

  .office-guide .methodology-table table,
  .office-guide .capability-table table {
    min-width: 0;
  }

  .office-guide .comparison-table table {
    min-width: 1120px;
  }

  .office-guide .budget-table table {
    min-width: 760px;
  }

  .office-guide .cost-table table {
    min-width: 820px;
  }

  .office-guide .comparison-table tbody tr:nth-child(2) {
    background: #efe6d9;
    color: var(--article-ink);
  }

  .office-guide .supplier-entry {
    padding: 32px 0;
    border-top: 1px solid var(--article-line);
  }

  .office-guide .supplier-entry > h3 {
    margin-top: 0;
  }

  .office-guide .supplier-entry--featured {
    height: auto;
    margin: 10px 0;
    padding: 32px;
    border: 1px solid rgba(152, 120, 72, .38);
    border-radius: 8px;
    background: var(--article-warm);
  }

  .office-guide .compact-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin: 24px 0 0;
    padding: 0;
    list-style: none;
  }

  .office-guide .compact-list li {
    margin: 0;
    padding: 20px;
    border: 1px solid var(--article-line);
    border-radius: 8px;
    background: var(--article-warm);
  }

  .office-guide .faq-item {
    padding: 24px 0;
    border-top: 1px solid var(--article-line);
  }

  .office-guide .faq-item h3 {
    margin: 0 0 10px;
  }

  .office-guide .faq-item p {
    display: block;
    margin: 0;
  }

  .office-guide .brand-signature {
    padding-block: clamp(34px, 4vw, 50px);
    border-top: 1px solid var(--article-line);
  }

  @media (max-width: 900px) {
    .office-guide .article-hero .resource-hero-grid {
      grid-template-columns: 1fr;
    }

    .office-guide .compact-list {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 620px) {
    .office-guide .article-hero,
    .office-guide .article-section {
      padding-block: 52px;
    }

    .office-guide .article-hero .resource-hero-grid,
    .office-guide .article-prose,
    .office-guide .article-prose--wide,
    .office-guide .article-wide,
    .office-guide .brand-signature .container {
      width: calc(100% - 32px);
    }

    .office-guide .article-hero p:not(.eyebrow),
    .office-guide .article-section p,
    .office-guide .article-section li {
      font-size: 16px;
      line-height: 1.7;
    }

    .office-guide .article-hero .resource-hero-media figcaption {
      position: static;
      padding: 12px 14px;
      border: 0;
      border-radius: 0;
      background: #101820;
    }

    .office-guide .methodology-table {
      overflow: hidden;
    }

    .office-guide .methodology-table thead {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      padding: 0;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
      border: 0;
    }

    .office-guide .methodology-table table,
    .office-guide .methodology-table tbody,
    .office-guide .methodology-table tr,
    .office-guide .methodology-table td {
      display: block;
      width: 100%;
    }

    .office-guide .methodology-table tr {
      padding: 15px 0;
      border-top: 1px solid var(--article-line);
    }

    .office-guide .methodology-table tr:first-child {
      border-top: 0;
    }

    .office-guide .methodology-table td {
      padding: 3px 16px;
      border: 0;
    }

    .office-guide .methodology-table td:first-child {
      margin-bottom: 5px;
      color: var(--article-ink);
      font-weight: 800;
    }

    .office-guide .methodology-table td[data-label]::before {
      display: block;
      margin: 7px 0 2px;
      color: var(--article-gold);
      content: attr(data-label);
      font-size: 10px;
      font-weight: 900;
      letter-spacing: .08em;
      line-height: 1.2;
      text-transform: uppercase;
    }

    .office-guide .supplier-entry--featured {
      margin-inline: 0;
      padding: 22px 18px;
    }

    .office-guide .brand-signature {
      padding-block: 34px;
    }
  }
</style>
```

- [ ] **Step 2: Run CSS/build/static checks and commit**

Run:

```bash
pnpm qa:css
pnpm build
pnpm qa:static
node /tmp/hymueble-office-fingerprint.mjs dist/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026/index.html /tmp/hymueble-office-styled.json
diff -u /tmp/hymueble-office-structure.json /tmp/hymueble-office-styled.json
git diff --check
git add src/pages/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026.astro
git commit -m "style: refine office suppliers article"
```

Expected: all checks pass, fingerprint diff is empty, and the commit changes only the target page.

---

### Task 5: Complete responsive, content, and regression QA

**Files:**
- Read: `dist/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026/index.html`
- Generate outside Git: `/tmp/hymueble-office-final.json`
- Generate under ignored output: `output/playwright/office-suppliers-*.png`
- Generate under ignored output: `output/playwright/office-suppliers-layout-metrics.json`

**Interfaces:**
- Consumes: Tasks 1–4 and their fingerprints.
- Produces: final SEO delta evidence, zero content/layout regression evidence, and visual screenshots.

- [ ] **Step 1: Run the complete applicable project QA**

Run:

```bash
pnpm qa:css
pnpm build
pnpm qa:static
git diff --check
```

Expected: all commands pass.

- [ ] **Step 2: Start the built site and run full browser regression QA**

Run `pnpm preview` in a persistent terminal, then:

```bash
QA_BASE_URL=http://127.0.0.1:4321 pnpm qa:browser
```

Expected: all registered routes/viewports pass. The target office article is verified separately in Steps 3–4 because the pre-existing route registry does not yet include it and modifying that shared script is outside scope.

- [ ] **Step 3: Capture target screenshots with the Playwright CLI**

Run:

```bash
pnpm exec playwright screenshot --viewport-size='1440,900' --full-page --wait-for-timeout=1000 http://127.0.0.1:4321/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026/ output/playwright/office-suppliers-desktop.png
pnpm exec playwright screenshot --viewport-size='1024,768' --full-page --wait-for-timeout=1000 http://127.0.0.1:4321/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026/ output/playwright/office-suppliers-tablet.png
pnpm exec playwright screenshot --viewport-size='390,844' --full-page --wait-for-timeout=1000 http://127.0.0.1:4321/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026/ output/playwright/office-suppliers-mobile.png
```

Expected: three full-page screenshots with a non-broken Hero.

- [ ] **Step 4: Measure the target route at all three viewports**

Create `/tmp/hymueble-office-layout-check.mjs` with this exact content:

```js
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright";

const url = "http://127.0.0.1:4321/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026/";
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch({ headless: true });
const results = [];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  const response = await page.goto(url, { waitUntil: "networkidle" });
  assert.equal(response?.status(), 200, `${viewport.name} HTTP`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    const step = Math.max(240, Math.floor(window.innerHeight * 0.7));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(() =>
    [...document.querySelectorAll("main img")].every((image) => image.complete && image.naturalWidth > 0),
  );

  const metrics = await page.evaluate(() => {
    const wrappers = [...document.querySelectorAll(".office-guide .resource-table-wrapper")];
    const images = [...document.querySelectorAll("main img")].map((image) => ({
      src: image.getAttribute("src"),
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
    }));
    const faqAnswers = [...document.querySelectorAll(".faq-item p")].map((answer) => {
      const rect = answer.getBoundingClientRect();
      return { width: Math.round(rect.width), height: Math.round(rect.height) };
    });
    const wrapperMetrics = wrappers.map((wrapper) => {
      const rect = wrapper.getBoundingClientRect();
      return {
        className: wrapper.className,
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        clientWidth: wrapper.clientWidth,
        scrollWidth: wrapper.scrollWidth,
      };
    });
    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      documentWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      images,
      supplierCount: document.querySelectorAll(".supplier-entry").length,
      featuredCount: document.querySelectorAll(".supplier-entry--featured").length,
      faqCount: document.querySelectorAll(".faq-item").length,
      faqAnswers,
      wrappers: wrapperMetrics,
      methodologyRowDisplay: getComputedStyle(document.querySelector(".methodology-table tbody tr")).display,
    };
  });

  assert.equal(metrics.documentWidth, metrics.clientWidth, `${viewport.name} page overflow`);
  assert.equal(metrics.images.length, 7, `${viewport.name} image count`);
  assert.ok(metrics.images.every((image) => image.naturalWidth > 0), `${viewport.name} broken image`);
  assert.equal(metrics.supplierCount, 10, `${viewport.name} supplier count`);
  assert.equal(metrics.featuredCount, 1, `${viewport.name} featured count`);
  assert.equal(metrics.faqCount, 6, `${viewport.name} FAQ count`);
  assert.ok(metrics.faqAnswers.every((answer) => answer.width > 0 && answer.height > 0), `${viewport.name} hidden FAQ`);
  assert.equal(metrics.wrappers.length, 5, `${viewport.name} table wrapper count`);
  assert.ok(metrics.wrappers.every((wrapper) => wrapper.left >= -1 && wrapper.right <= metrics.clientWidth + 1), `${viewport.name} wrapper overflow`);

  if (viewport.name === "mobile") {
    assert.equal(metrics.methodologyRowDisplay, "block", "mobile methodology layout");
    for (const family of ["comparison-table", "budget-table", "cost-table"]) {
      const wrapper = metrics.wrappers.find((item) => item.className.includes(family));
      assert.ok(wrapper && wrapper.scrollWidth > wrapper.clientWidth, `mobile ${family} local scroll`);
    }
  }

  results.push({ name: viewport.name, ...metrics });
  await page.close();
}

await browser.close();
await fs.mkdir("output/playwright", { recursive: true });
await fs.writeFile(
  "output/playwright/office-suppliers-layout-metrics.json",
  `${JSON.stringify(results, null, 2)}\n`,
);
console.log("office article responsive metrics: ok");
```

Run:

```bash
node /tmp/hymueble-office-layout-check.mjs
```

Expected: `office article responsive metrics: ok` and the JSON records desktop 1440×900, tablet 1024×768, and mobile 390×844.

- [ ] **Step 5: Prove the final SEO/content contract**

Run:

```bash
node /tmp/hymueble-office-fingerprint.mjs dist/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026/index.html /tmp/hymueble-office-final.json
diff -u /tmp/hymueble-office-styled.json /tmp/hymueble-office-final.json
curl -sS -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4321/assets/hymueble/recursos/blog/images/hym-02-oficina-ergonomica.jpg
rg -o 'https://hymueble.com/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026/' dist/sitemap.xml | wc -l
```

Expected: fingerprint diff is empty, local Hero returns 200, and the sitemap count is exactly 1.

- [ ] **Step 6: Inspect screenshots and branch scope**

Confirm Hero, methodology, HYMUEBLE block, all three wide tables, FAQ, CTA, signature, and WhatsApp spacing visually. Then run:

```bash
git log --oneline main..HEAD
git diff --name-only main...HEAD
git status --short
```

Expected: production diff contains only the target page and restored Hero asset; docs contain only the approved spec and plan; status contains only `.agents/` and `AGENTS.md`.

---

### Task 6: Publish, merge, and verify production

**Files:**
- No additional source changes.

**Interfaces:**
- Consumes: the reviewed and fully verified branch.
- Produces: a pushed branch, ready pull request, merged Pages deployment, and live confirmation.

- [ ] **Step 1: Push the branch**

Run:

```bash
git push -u origin codex/office-article-layout-seo
```

Expected: GitHub accepts the branch and sets upstream tracking.

- [ ] **Step 2: Open a ready-for-review pull request**

Target `main`. Include exact SEO changes, the Hero 404 repair, article-only layout scope, content-freeze evidence, QA commands, responsive metrics, and the known unrelated catalog-PDF CI note.

- [ ] **Step 3: Merge and wait for GitHub Pages**

Merge after the branch review is clean. Wait for the Pages workflow associated with the merge commit and require a successful deployment conclusion.

- [ ] **Step 4: Verify the live route**

Open:

```text
https://hymueble.com/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026/
```

Confirm HTTP 200, the restored Hero asset 200, the new Title/Meta, unchanged canonical/H1/body/ranking/tables/FAQ/CTA, Article `datePublished=2026-07-17`, `dateModified=2026-07-21`, 10 suppliers, one featured HYMUEBLE block, 6 FAQ items, no page overflow, and the A layout at desktop and mobile widths.
