# Resource Article Trust Repair Implementation Plan

> **For agentic workers:** Execute this plan inline and verify each completed task before moving to the next task.

**Goal:** Repair two published resource articles so that their claims, calculations, images, metadata, and calls to action are useful for B2B buyers without presenting unsupported material as verified customer or factory evidence.

**Architecture:** Keep the existing Astro routes and page-specific layouts. Make surgical copy and structured-data changes inside the two page files, update only the two matching cards in the blog listing, and replace the five referenced image assets with clearly labeled conceptual images.

**Tech Stack:** Astro 5, TypeScript, static HTML, page-scoped CSS, JSON-LD, WebP/PNG image assets.

## Global Constraints

- Do not change either URL or canonical path.
- Do not change shared navigation, contact details, form behavior, or unrelated routes.
- Preserve useful figures only as visible planning scenarios or calculation inputs.
- Remove unsupported customer identity, detailed location, testimonial, guarantee, warranty, installation, and response-time claims.
- Do not present generated images as real factory or project evidence.
- Keep visible FAQ content and FAQ JSON-LD semantically identical.

---

### Task 1: Repair the school supplier guide

**Files:**
- Modify: `src/pages/recursos/top-10-empresas-mobiliario-escolar-china-2026.astro`

- [x] Change the page from an authoritative ranking to a supplier-screening guide.
- [x] Preserve the approved `Top 10` format with ten source-linked profiles and state that the order is editorial, not a quality score.
- [x] Remove unsupported methodology, testimonials, customer locations, performance claims, warranty, installation, and response commitments.
- [x] Keep numerical examples only inside labeled scenarios or calculation tables.
- [x] Remove unsupported competitor superlatives and exact operational claims.
- [x] Correct ISO, CE, EN 1729, emissions, and product-document wording.
- [x] Add role-safe internal links and synchronize FAQ JSON-LD.

### Task 2: Repair the manufacturer-versus-distributor guide

**Files:**
- Modify: `src/pages/recursos/fabricante-vs-distribuidor-muebles-comerciales-2026.astro`

- [x] Distinguish direct factory purchasing, China-based intermediaries, and local distributors.
- [x] Convert the named hotel example into a transparent, anonymous planning calculation.
- [x] Remove unsupported universal savings, MOQ, timing, warranty, installation, and complaint-resolution promises.
- [x] Fix Spanish terminology and table errors.
- [x] Add role-safe internal links and synchronize FAQ JSON-LD.

### Task 3: Replace the five article images

**Files:**
- Replace: `public/assets/hymueble/recursos/blog/images/hym-03-img-01-aula-escolar.webp`
- Replace: `public/assets/hymueble/recursos/blog/images/hym-03-img-02-planta-produccion.webp`
- Replace: `public/assets/hymueble/recursos/blog/images/hym-04-img-01-linea-produccion-fabrica.png`
- Replace: `public/assets/hymueble/recursos/blog/images/hym-04-img-02-control-calidad-muebles.png`
- Replace: `public/assets/hymueble/recursos/blog/images/hym-04-img-03-contenedor-exportacion.png`
- Modify: `src/pages/recursos/blog.astro`

- [x] Generate five conceptual editorial images without text, logos, customer identity, or watermarks.
- [x] Inspect every image for visual errors and misleading documentary cues.
- [x] Save optimized final assets in the workspace and update width, height, alt, captions, and blog-card descriptions.

### Task 4: Verify the repaired pages

- [x] Scan both source files for removed customer locations, false testimonials, fixed guarantees, and misleading image captions.
- [x] Run `pnpm build`.
- [x] Run `pnpm qa:static`.
- [x] Run `pnpm qa:browser`. The full-site script reached an existing strict-selector failure on the homepage `.home-project-rail`; no target-article failure was reported before that point.
- [x] Review both target routes and their blog cards at desktop and mobile widths, including tables, images, CTA links, metadata, and structured data.
