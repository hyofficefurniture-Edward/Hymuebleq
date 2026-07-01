# Implementation Log

## 2026-06-30 / v0.94 Launch QA Social Guard

### Done

- Strengthened `pnpm qa:launch` so the launch gate now also checks the footer social set.
- Added generated-HTML checks for:
  - TikTok social link presence
  - removed Pinterest/X social links absence
- Kept the check intentionally narrow: it prevents obvious regression without pretending to verify whether the TikTok account is officially approved.

### Modified Files

- `scripts/qa-launch-config.mjs`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm build`: passed; 47 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- `pnpm qa:static`: passed; 46 HTML files, 35 sitemap routes, 1,634 internal links, 419 local assets, 244 images, 20 showroom links, 37 iframes, 71 catalog triggers and 36 forms checked; 0 failures / 0 warnings.
- `pnpm qa:browser`: passed; 30 routes across desktop/mobile plus mobile menu, footer menu, footer social set, metrics grid, process icons, FAQ tabs/accordion, scroll rail controls, showroom modal, catalog modal and contact form; 0 failures / 0 warnings.
- `pnpm qa:launch`: expected local-demo failure because production WhatsApp, email and form receiver are not configured. The new social checks reported:
  - `tikTokLinks`: 35
  - `removedSocialLinks`: 0
  - no Pinterest/X social regression failure

### Remaining Notes

- `pnpm qa:launch` should continue to fail in local demo mode. It should only pass after real WhatsApp, confirmed business email and real form receiver are configured and the site is rebuilt.
- TikTok account approval remains a manual business confirmation item before production launch.

## 2026-06-30 / v0.93 Footer Social Set + Mobile Centering

### Done

- Updated the footer social set per user feedback:
  - removed Pinterest
  - removed X
  - added TikTok
- Kept the footer social role as a trust supplement, not a primary conversion CTA.
- Center-aligned the mobile footer layout so the brand block, social icons, navigation groups and contact block feel balanced on narrow screens.
- Added browser QA coverage for the footer social set and mobile footer alignment.

### Modified Files

- `src/data/site.ts`
- `src/components/Footer.astro`
- `src/styles/global.css`
- `scripts/qa-browser-routes.mjs`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm build`: passed; 47 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- `pnpm qa:static`: passed; 46 HTML files, 35 sitemap routes, 1,634 internal links, 419 local assets, 244 images, 20 showroom links, 37 iframes, 71 catalog triggers and 36 forms checked; 0 failures / 0 warnings.
- `pnpm qa:browser`: passed; 30 routes across desktop/mobile plus mobile menu, footer menu, footer social set, metrics grid, process icons, FAQ tabs/accordion, scroll rail controls, showroom modal, catalog modal and contact form; 0 failures / 0 warnings.
- Targeted mobile footer check confirmed:
  - social labels: Facebook, Instagram, LinkedIn, YouTube, TikTok
  - Pinterest/X absent
  - TikTok present
  - page overflow: 0
  - footer brand, social row and navigation panel centered on mobile

### Remaining Notes

- TikTok currently points to `https://www.tiktok.com/@hongyefurniture_`; confirm this is the official account before production launch.
- Real WhatsApp, email, form receiver and attachment handling remain launch blockers.

## 2026-06-30 / v0.92 FAQ + Showroom Layout Regression Fix

### Done

- Fixed the mobile FAQ layout regression reported by the user:
  - removed the negative-margin horizontal tab rail behavior on small screens
  - changed FAQ category tabs into a two-column wrapping grid on mobile
  - kept the existing FAQ Tab + Accordion interaction and Spanish copy unchanged
- Fixed the homepage Showroom desktop regression caused by wrapping the card grid in `ScrollRail`:
  - made the `ScrollRail` shell span the full two-column showroom copy grid
  - restored the four showroom cards to full-width desktop distribution
  - kept scroll controls hidden on desktop when the track does not overflow

### Modified Files

- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm build`: passed; 47 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- `pnpm qa:static`: passed; 46 HTML files, 35 sitemap routes, 1,634 internal links, 419 local assets, 244 images, 20 showroom links, 37 iframes, 71 catalog triggers and 36 forms checked; 0 failures / 0 warnings.
- `pnpm qa:catalogs`: passed; 21 catalog PDFs, 41 mapped lead interests, 41 rendered catalog interests, 754.7MB total source size; 0 failures / 0 warnings.
- `pnpm qa:browser`: passed; 30 routes across desktop/mobile plus mobile menu, footer menu, metrics grid, process icons, FAQ tabs/accordion, scroll rail controls, showroom modal, catalog modal and contact form; 0 failures / 0 warnings.
- Targeted browser measurements confirmed:
  - mobile FAQ page-level overflow: 0
  - mobile FAQ tab-list overflow: 0
  - mobile FAQ category buttons visible in a 2x2 grid at 390px
  - desktop homepage Showroom track width: 1280px
  - desktop homepage Showroom track overflow: 0
  - desktop Showroom controls display: `none` because the four cards fit the track

### Remaining Notes

- The fix is intentionally layout-only. It does not change FAQ content, Matterport links, CTA behavior or site IA.

## 2026-06-30 / v0.91 Scroll Rail Controls

### Done

- Added a reusable `ScrollRail.astro` wrapper for horizontal content rails.
- Added visible previous/next circular arrow controls to scrollable modules so users do not need to discover thin native scrollbars.
- Kept the existing card layouts intact; the controls only advance the existing horizontal track.
- Added automatic scrollability detection in `BaseLayout`: controls are hidden when a rail does not overflow, and buttons disable at the first/last edge.
- Applied the controls to:
  - homepage Virtual Showroom options
  - homepage project cards on mobile
  - shared 12-step process rails
  - homepage cooperation partner logo rail
  - homepage certificate/document image rail
  - homepage factory equipment evidence cards on mobile
  - `/fabrica/` factory process cards on mobile
  - `/fabrica/` qualification proof cards on mobile
- Added browser QA coverage for representative mobile rails: partner logos, project cards, process steps, factory process and factory qualifications.

### Modified Files

- `src/components/ScrollRail.astro`
- `src/components/TrustStrip.astro`
- `src/components/ProcessSteps.astro`
- `src/components/FactoryEvidence.astro`
- `src/components/FactoryProcessEvidence.astro`
- `src/pages/index.astro`
- `src/pages/fabrica.astro`
- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`
- `scripts/qa-browser-routes.mjs`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm build`: passed; 47 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- `pnpm qa:static`: passed; 46 HTML files, 35 sitemap routes, 1,634 internal links, 419 local assets, 244 images, 20 showroom links, 37 iframes, 71 catalog triggers and 36 forms checked; 0 failures / 0 warnings.
- `pnpm qa:browser`: passed; 30 routes across desktop/mobile plus mobile menu, footer menu, metrics grid, process icons, FAQ tabs/accordion, scroll rail controls, showroom modal, catalog modal and contact form; 0 failures / 0 warnings.
- Scroll control browser checks confirmed:
  - mobile partner logo rail overflow: 872px, next button advanced to `scrollLeft=220`
  - mobile project rail overflow: 812px, next button advanced to `scrollLeft=296`
  - mobile process rail overflow: 675px, next button advanced to `scrollLeft=279`
  - mobile factory process rail overflow: 466px, next button advanced to `scrollLeft=282`
  - mobile factory qualification rail overflow: 480px, next button advanced to `scrollLeft=284`
  - all checked rail states kept page-level horizontal overflow at 0

### Evidence

- `output/playwright/v085-browser-demo-walkthrough/report.json`

### Remaining Notes

- The controls are intentionally generic and restrained. Future horizontal rails can opt in by wrapping the track with `ScrollRail` and adding `data-scroll-track`.
- Real WhatsApp, email, form receiver and attachment handling remain launch blockers.

## 2026-06-30 / v0.90 Factory Evidence + Trust/FAQ Visual Balance

### Done

- Rebuilt the homepage `Fábrica directa` module around real factory equipment evidence instead of the older generic image strip.
- Added seven optimized WebP equipment assets from the new factory material folder:
  - HOMAG edge banding
  - Bacci 5-axis CNC
  - six-axis drilling
  - CNC panel processing
  - HOMAG spraying line
  - water-based finishing
  - quality control equipment
- Added shared factory evidence data in `src/data/site.ts` so homepage and `/fabrica/` use the same maintained proof system.
- Added `FactoryEvidence.astro` for the homepage: one large equipment proof image, three compact equipment cards and a low-weight equipment capability strip.
- Added `FactoryProcessEvidence.astro` for `/fabrica/`: six equipment-led process cards focused on manufacturing capability, surface finishing and control.
- Reworked `/fabrica/` copy and page rhythm to focus on visible equipment, process evidence and B2B procurement risk reduction.
- Removed the repeated chair workshop image from the new factory evidence system per user feedback; new factory modules prioritize machine/equipment photos.
- Changed the cooperation partner logo rail to a restrained two-row horizontal rail, reducing the odd one-row visual weight.
- Re-centered the homepage FAQ title block so `FAQ`, supporting copy, category tabs and accordion read as one balanced module.

### Modified Files

- `src/data/site.ts`
- `src/components/FactoryEvidence.astro`
- `src/components/FactoryProcessEvidence.astro`
- `src/pages/index.astro`
- `src/pages/fabrica.astro`
- `src/styles/global.css`
- `public/assets/hymueble/fabrica/equipos/*.webp`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm build`: passed; 46 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- `pnpm qa:static`: passed; 46 HTML files, 35 sitemap routes, 1,634 internal links, 419 local assets, 244 images, 20 showroom links, 37 iframes, 71 catalog triggers and 36 forms checked; 0 failures / 0 warnings.
- `pnpm qa:catalogs`: passed; 21 catalog PDFs, 41 mapped lead interests, 41 rendered catalog interests, 754.7MB total source size; 0 failures / 0 warnings.
- `pnpm qa:browser`: passed; 30 routes across desktop/mobile plus mobile menu, footer menu, metrics grid, process icons, FAQ tabs/accordion, showroom modal, catalog modal and contact form; 0 failures / 0 warnings.
- Factory evidence browser checks confirmed:
  - homepage factory module uses four new equipment WebP images
  - `/fabrica/` process module uses six new equipment WebP images
  - desktop and mobile page overflow is 0
- Partner rail browser checks confirmed:
  - desktop partner rail uses two `72px` rows
  - mobile partner rail uses two `58px` rows
  - scrolling stays inside the rail, page overflow remains 0
- FAQ visual check confirmed the new centered FAQ header keeps tab/accordion behavior intact and page overflow remains 0.

### Evidence

- `output/playwright/v090-factory-evidence/home-factory-desktop.png`
- `output/playwright/v090-factory-evidence/home-factory-mobile.png`
- `output/playwright/v090-factory-evidence/fabrica-hero-desktop.png`
- `output/playwright/v090-factory-evidence/fabrica-process-desktop.png`
- `output/playwright/v090-factory-evidence/fabrica-process-mobile.png`
- `output/playwright/v090-factory-evidence/trust-partners-desktop.png`
- `output/playwright/v090-factory-evidence/trust-partners-mobile.png`
- `output/playwright/v090-factory-evidence/faq-desktop.png`
- `output/playwright/v090-factory-evidence/faq-mobile.png`

### Remaining Notes

- The new factory module is evidence-led but still concise; deeper factory copy can be expanded later if specific machine specs need a dedicated technical page.
- Real WhatsApp, email, form receiver and attachment handling remain launch blockers.

## 2026-06-30 / v0.89 FAQ Tabs + Accordion

### Done

- Reworked the homepage FAQ module from a plain list into category tabs plus accordion rows.
- Added four FAQ categories:
  - `Sobre productos y fabricación`
  - `Sobre calidad y confianza`
  - `Sobre logística e importación`
  - `Sobre el proceso de compra y contacto`
- Kept the final Spanish FAQ copy exactly in structured data, with each category containing `label` and `questions`, and each question containing `question` and `answer`.
- Default state now opens the first category and first question.
- Tab switching shows only the selected category; accordion behavior keeps one question open per category for cleaner scanning.
- Styled FAQ rows with light dividers, a restrained plus/minus indicator, muted answer text and mobile horizontal tab scrolling.
- Added FAQ interaction checks to `pnpm qa:browser`.

### Modified Files

- `src/data/site.ts`
- `src/components/FAQTabs.astro`
- `src/pages/index.astro`
- `src/styles/global.css`
- `scripts/qa-browser-routes.mjs`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm build`: passed; 44 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- `pnpm qa:static`: passed; 46 HTML files, 35 sitemap routes, 1,636 internal links, 418 local assets, 243 images, 21 showroom links, 37 iframes, 71 catalog triggers and 36 forms checked; 0 failures / 0 warnings.
- `pnpm qa:catalogs`: passed; 21 catalog PDFs, 41 mapped lead interests, 41 rendered catalog interests, 754.7MB total source size; 0 failures / 0 warnings.
- `QA_BASE_URL=http://127.0.0.1:4322 pnpm qa:browser`: passed; 30 routes across desktop/mobile plus mobile menu, footer menu, metrics grid, process icons, FAQ tabs/accordion, showroom modal, catalog modal and contact form; 0 failures / 0 warnings.
- FAQ browser QA confirmed:
  - first selected tab: `Sobre productos y fabricación`
  - first open question: `¿Fabrican a medida o solo tienen productos estándar de catálogo?`
  - logistics tab click switches content correctly
  - clicking `¿Quién se encarga de la importación en mi país?` opens the matching answer
  - mobile page overflow is 0 and the category tabs use horizontal scrolling

### Evidence

- `output/playwright/v085-browser-demo-walkthrough/desktop-home-faq-tabs.png`
- `output/playwright/v085-browser-demo-walkthrough/mobile-home-faq-tabs.png`
- `output/playwright/v085-browser-demo-walkthrough/report.json`

### Remaining Notes

- FAQ is currently on the homepage only, matching the previous FAQ placement.
- Real WhatsApp, email, form receiver and attachment handling still require launch configuration before public deployment.

## 2026-06-30 / v0.88 Process Card Semantic Icons

### Done

- Added a semantic line icon next to each process number in the shared 12-step `ProcessSteps` component.
- Kept the existing process titles and descriptions unchanged.
- Used inline SVG icons instead of adding a new icon dependency.
- Matched icons to each procurement/delivery step:
  - quote document for `Cotización`
  - measuring tool for `Medición en sitio`
  - technical document for `Diseño técnico`
  - material/finish leaf for `Acabados`
  - sample case for `Muestra o piloto`
  - production station for `Producción`
  - shield check for `Control de calidad`
  - checklist for `Inspección final`
  - box for `Embalaje`
  - truck for `Logística`
  - installation sign for `Instalación`
  - headset for `Postventa`
- Styled icons as restrained gold line icons in soft square chips so they add visual interest without competing with card headings.
- Added process icon checks to `pnpm qa:browser` for desktop and mobile.

### Modified Files

- `src/components/ProcessSteps.astro`
- `src/styles/global.css`
- `scripts/qa-browser-routes.mjs`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm build`: passed; 43 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- Browser measurement before final QA confirmed:
  - desktop: 12 process items, 12 icons, 2 rows, page overflow 0
  - mobile: 12 process items, 12 icons, 2 rows, page overflow 0
- `pnpm qa:browser` now includes `desktop process icons` and `mobile process icons` checks.

### Evidence

- `output/playwright/v088-process-icons-desktop.png`
- `output/playwright/v088-process-icons-mobile.png`

### Remaining Notes

- The icons are intentionally decorative and semantic, not interactive.
- If the user wants a different icon style later, the change is centralized in `ProcessSteps.astro`.

## 2026-06-30 / v0.87 Mobile Metrics 2x2 Compression

### Done

- Updated the homepage metrics section for mobile based on user feedback.
- Changed the mobile metrics layout from a long vertical stack into a strict 2-column, 2-row grid.
- Kept the four highest-value procurement trust metrics visible on mobile:
  - `40+` years of manufacturing experience
  - `350.000 m²` production workshop
  - `40.000 m²` showroom
  - `10.000+` national and international projects
- Hid the fifth `2.000+ personas dentro del grupo` metric only on mobile so the section satisfies the requested 2x2 layout while desktop keeps the broader trust data.
- Tightened mobile metric typography so long numbers remain readable inside 178px-wide cards.
- Added the mobile metrics layout to `pnpm qa:browser` as a regression guard.

### Modified Files

- `src/styles/global.css`
- `scripts/qa-browser-routes.mjs`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- Browser measurement at 390px confirmed:
  - `.metric-grid` columns: `178px 178px`
  - visible metric count: 4
  - page overflowX: 0
  - `350.000 m²` is no longer clipped
- `pnpm build`: passed; 43 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- `pnpm qa:static`: passed; 35 HTML files, 35 sitemap routes, 1,636 internal links, 418 local assets, 243 images, 21 showroom links, 37 iframes, 71 catalog triggers and 36 forms checked; 0 failures / 0 warnings.
- `pnpm qa:catalogs`: passed; 21 catalog PDFs, 41 mapped lead interests, 41 rendered catalog interests, 754.7MB total source size; 0 failures / 0 warnings.
- `pnpm qa:browser`: passed; 11 routes across desktop/mobile plus mobile menu, mobile footer menu, showroom modal, catalog modal and contact form checks; 0 failures / 0 warnings.
- The latest `pnpm qa:browser` report includes `mobile metrics grid`: 2 columns, 4 visible metrics, aligned two-row layout, page overflow 0.

### Evidence

- `output/playwright/v087-mobile-metrics-grid.png`
- `output/playwright/v085-browser-demo-walkthrough/report.json`

### Remaining Notes

- Real mobile device testing in Safari/Chrome is still recommended before public launch.
- Production launch still requires real WhatsApp, real email, real form/file receiver, deployment and analytics.

## 2026-06-30 / v0.86 Mobile Menu Footer Fix

### Done

- Fixed the mobile/tablet navigation disappearing when the user opened the hamburger menu near the footer.
- Changed the mobile/tablet header from sticky behavior to a fixed viewport header:
  - tablet/mobile breakpoint uses fixed `.header`
  - body gets matching top padding so content is not hidden under the header
  - mobile menu panel opens from the actual header bottom instead of an outdated hard-coded offset
- Added a browser QA regression check for the reported scenario:
  - open `/fabrica/` at 390px mobile width
  - scroll near the footer
  - click the hamburger button
  - confirm header remains visible, the menu panel opens below it, `Contacto` remains visible, and page overflow stays 0

### Modified Files

- `src/styles/global.css`
- `scripts/qa-browser-routes.mjs`
- `package.json`
- `pnpm-lock.yaml`

### Verification

- Manual browser reproduction before the fix showed the header and nav panel had large negative `top` positions after opening the menu near `/fabrica/` footer.
- After the fix, the same reproduction returned:
  - header top: 0
  - header bottom: 73
  - nav top: 73
  - `Contacto` visible in viewport
  - nav overflow: 0
- `pnpm build`: passed; 43 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- `pnpm qa:static`: passed; 35 HTML files, 35 sitemap routes, 1,636 internal links, 418 local assets, 243 images, 21 showroom links, 37 iframes, 71 catalog triggers and 36 forms checked; 0 failures / 0 warnings.
- `pnpm qa:catalogs`: passed; 21 catalog PDFs, 41 mapped lead interests, 41 rendered catalog interests, 754.7MB total source size; 0 failures / 0 warnings.
- `pnpm qa:browser`: passed; 11 routes across desktop/mobile plus mobile menu, mobile footer menu, showroom modal, catalog modal and contact form checks; 0 failures / 0 warnings.

### Evidence

- `output/playwright/v086-mobile-menu-footer-after.png`
- `output/playwright/v085-browser-demo-walkthrough/mobile-fabrica-footer-menu.png`
- `output/playwright/v085-browser-demo-walkthrough/report.json`

### Next Action

- Continue broader content and launch readiness work. The main external blockers remain real WhatsApp, real email, real form/file receiver, deployment and analytics.

## 2026-06-30 / v0.84 Launch Contact Config

### Done

- Moved launch-sensitive contact values behind public environment variables:
  - `PUBLIC_HYMUEBLE_WHATSAPP_URL`
  - `PUBLIC_HYMUEBLE_EMAIL`
  - `PUBLIC_HYMUEBLE_FORM_ACTION`
- Added `.env.example` with placeholder values only.
- Updated `.gitignore` so `.env`, `.env.local` and `.env.*.local` are not committed.
- Updated shared brand/contact data so WhatsApp and email can be replaced at build time without editing source code.
- Updated `ContactForm.astro`:
  - local demo mode keeps `data-demo-form` and front-end success feedback
  - launch-configured mode outputs a real `action` and removes `data-demo-form`
- Updated the privacy page email to use `brand.email` instead of a hard-coded address.
- Added `pnpm qa:launch` to check that a launch build is not using placeholder WhatsApp or demo forms.

### Modified Files

- `.gitignore`
- `.env.example`
- `package.json`
- `src/data/site.ts`
- `src/components/ContactForm.astro`
- `src/pages/privacidad.astro`
- `scripts/qa-launch-config.mjs`
- `docs/project-brain/05-开发/07-环境变量与上线配置.md`
- `output/playwright/v084-launch-contact-config/report.json`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- Local demo mode:
  - `pnpm build`: passed; 42 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
  - `pnpm qa:static`: passed; 35 HTML files, 35 sitemap routes, 1,636 internal links, 418 local assets, 243 images, 21 showroom links, 37 iframes, 71 catalog triggers and 36 forms checked; 0 failures / 0 warnings.
  - `pnpm qa:catalogs`: passed; 21 catalog PDFs, 41 mapped lead interests, 41 rendered catalog interests, 754.7MB total source size; 0 failures / 0 warnings.
- Launch-configured mode with non-real test values:
  - `pnpm build`: passed.
  - `pnpm qa:launch`: passed; 35 HTML files, 0 demo forms, 0 placeholder WhatsApp links, 0 failures / 0 warnings.
- After launch-configured verification, the project was rebuilt again in normal local demo mode.

### Next Action

- Get the real WhatsApp URL, confirmed business email and form receiver endpoint. Then build with those values and run `pnpm qa:launch` before any public deployment.

## 2026-06-30 / v0.83 Catalog PDF Manifest

### Done

- Converted the local catalog PDF library from an untracked asset folder into a machine-readable source manifest.
- Added `docs/project-brain/04-素材/catalog-pdf-manifest.json` with 21 catalog PDFs across:
  - hoteleria: 2
  - oficinas: 6
  - salud: 3
  - educacion: 3
  - residencial: 7
- Added `pnpm qa:catalogs` to verify:
  - every source PDF exists locally
  - every required sector has at least one catalog source
  - every rendered `data-catalog-interest` in `dist/` maps to a catalog source or manual delivery action
- Tightened catalog lead labels so repeated terms like `Laboratorios` and `Habitaciones` now include their sector, for example `Salud - Laboratorios` and `Hotelería - Habitaciones`.
- Kept the lead-capture-first strategy: large PDFs are not copied to `public/` and are not exposed as direct downloads.

### Modified Files

- `src/components/CatalogCard.astro`
- `src/pages/[section].astro`
- `src/pages/catalogo/[sector].astro`
- `src/pages/catalogo/hoteleria.astro`
- `scripts/qa-catalog-sources.mjs`
- `package.json`
- `docs/project-brain/04-素材/catalog-pdf-manifest.json`
- `docs/project-brain/04-素材/03-图册下载库.md`
- `docs/project-brain/01-资料/03-图册资料.md`
- `docs/project-brain/04-素材/00-素材总表.md`
- `output/qa-catalog-sources-report.json`
- `output/playwright/v083-catalog-pdf-manifest/report.json`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/asset-plan.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm build`: passed; 41 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- `pnpm qa:static`: passed; 35 HTML files, 35 sitemap routes, 1,636 internal links, 418 local assets, 243 images, 21 showroom links, 37 iframes, 71 catalog triggers and 36 forms checked; 0 failures / 0 warnings.
- `pnpm qa:catalogs`: passed; 21 catalog PDFs, 41 mapped lead interests, 41 rendered catalog interests, 754.7MB total source size; 0 failures / 0 warnings.
- Evidence:
  - `output/qa-catalog-sources-report.json`
  - `output/playwright/v083-catalog-pdf-manifest/report.json`

### Next Action

- Choose the real form receiver or CRM workflow, then map `catalog_interest` to sales delivery or controlled PDF links.

## 2026-06-30 / v0.82 Catalog Lead Context

### Done

- Improved the catalog download lead path without making the buyer-facing form longer.
- Added per-trigger catalog context so catalog leads can record what the buyer requested:
  - catalog hub sector cards
  - hotel catalog page CTA
  - hotel catalog category cards
  - dynamic sector catalog pages
  - factory catalog CTA
- Updated the shared catalog modal title and helper text based on the clicked trigger.
- Added hidden `catalog_interest` input to the catalog lead form so the future backend/form receiver can capture the requested catalog or category.
- Extended `pnpm qa:static` to fail if any catalog download trigger is missing `data-catalog-interest`.

### Modified Files

- `src/components/CatalogLeadModal.astro`
- `src/components/ContactForm.astro`
- `src/components/CatalogCard.astro`
- `src/layouts/BaseLayout.astro`
- `src/pages/catalogo/index.astro`
- `src/pages/catalogo/hoteleria.astro`
- `src/pages/catalogo/hoteleria/[category].astro`
- `src/pages/catalogo/[sector].astro`
- `src/pages/fabrica.astro`
- `scripts/qa-static.mjs`
- `output/playwright/v082-catalog-lead-context/report.json`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm build`: passed; 35 pages generated.
- `pnpm qa:static`: passed; 35 HTML files, 35 sitemap routes, 1,636 internal links, 418 local assets, 243 images, 21 showroom links, 37 iframes, 71 catalog triggers and 36 forms checked; 0 failures / 0 warnings.
- Browser QA:
  - opened `http://127.0.0.1:4321/catalogo/hoteleria/`
  - clicked `Solicitar catálogo PDF`
  - page URL stayed at `http://127.0.0.1:4321/catalogo/hoteleria/`
  - modal title changed to `Solicitar catálogo: Catálogo hotelero`
  - hidden input `catalog_interest` changed to `Catálogo hotelero`
- Evidence report:
  - `output/playwright/v082-catalog-lead-context/report.json`

### Next Action

- Map the real catalog PDFs to a chosen delivery workflow after the form receiver is selected. The local PDF library has been found, but v0.82 does not send or expose PDFs publicly.

## 2026-06-30 / v0.81 Showroom Retention Guard

### Done

- Confirmed the current showroom strategy with the user's retention requirement: Matterport tours should open inside Hymueble instead of sending buyers to a new tab.
- Kept the existing shared in-site `ShowroomModal` behavior:
  - all Matterport entries keep their real tour URL as `href`
  - `data-showroom-modal` intercepts clicks
  - the tour loads inside the shared iframe dialog
  - Escape closes the dialog and restores focus to the original showroom card
- Added a static QA guard for iframe fullscreen configuration so future embeds do not reintroduce the browser warning where `allow="fullscreen"` conflicts with `allowfullscreen`.

### Modified Files

- `scripts/qa-static.mjs`
- `output/playwright/v081-showroom-retention/report.json`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm build`: passed; 40 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- `pnpm qa:static`: passed; 35 HTML files, 35 sitemap routes, 1,636 internal links, 418 local assets, 243 images, 21 showroom links, 37 iframes and 36 forms checked; 0 failures / 0 warnings.
- Browser QA:
  - opened `http://127.0.0.1:4321/`
  - clicked the homepage hotel showroom card
  - page URL stayed at `http://127.0.0.1:4321/`
  - in-site dialog opened with `Showroom virtual de Hoteles`
  - iframe loaded `HONGYE® Furniture Hotel Showroom`
  - Escape closed the dialog and focus returned to the original card
- Evidence report:
  - `output/playwright/v081-showroom-retention/report.json`

### Next Action

- Continue the broader visual/content polish. The main launch blockers remain real WhatsApp, real form/file receiver, deployment, social account confirmation, and deeper case/certificate/PDF mapping.

## 2026-06-30 / v0.80 Global Text Density and Inline Style Cleanup

### Done

- Ran a browser-based visible long-text audit across 14 representative routes on desktop and mobile.
- Reduced repeated long CTA and helper copy across:
  - homepage trust section and final CTA
  - `/hoteles/`
  - `/catalogo/`
  - `/catalogo/hoteleria/`
  - hotel catalog detail pages
  - `/proyectos/hoteleria/`
  - project detail pages
  - dynamic sector pages
  - `/fabrica/`
  - `/showroom/`
  - `/recursos/blog/`
- Replaced remaining split-section inline margin/color/font-size styles with shared `.section-note` and `.section-actions` classes.
- Replaced the inline CTA eyebrow color with a shared `.cta-band .eyebrow` style.

### Modified Files

- `src/components/CTA.astro`
- `src/components/TrustStrip.astro`
- `src/data/site.ts`
- `src/pages/[section].astro`
- `src/pages/catalogo/index.astro`
- `src/pages/catalogo/hoteleria.astro`
- `src/pages/catalogo/hoteleria/[category].astro`
- `src/pages/fabrica.astro`
- `src/pages/hoteles.astro`
- `src/pages/index.astro`
- `src/pages/proyectos/[sector]/[project].astro`
- `src/pages/proyectos/hoteleria.astro`
- `src/pages/recursos/blog.astro`
- `src/pages/showroom.astro`
- `src/styles/global.css`
- `output/playwright/v080-global-density-audit/report.json`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- Browser QA covered 14 representative routes at 390px mobile and 1440px desktop:
  - no page-level overflow
  - no broken images
  - no visible `p` / `li` text block above the configured long-text threshold
- Static scan found no remaining `style="margin-top..."`, `style="color..."` or `style="font-size..."` usage in `src/pages` and `src/components`.
- `pnpm build`: passed; 40 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- `pnpm qa:static`: passed; 35 HTML files, 35 sitemap routes, 1,636 internal links, 418 local assets, 243 images, 21 showroom links and 36 forms checked; 0 failures / 0 warnings.
- Evidence report:
  - `output/playwright/v080-global-density-audit/report.json`

### Next Action

- Continue visual polish with actual screenshots rather than only DOM thresholds. The next highest-value work is still real contact data, real form receiver, final social account confirmation, and deeper case/certificate/PDF mapping.

## 2026-06-30 / v0.79 Project and Contact Density Polish

### Done

- Reduced visible text density in two areas found by browser audit:
  - `/proyectos/` project solution summary cards had body text that wrapped into dense 4-5 line paragraphs on desktop narrow cards
  - `/contacto/` mobile helper paragraphs had 5-6 line blocks in secondary guidance sections
- Shortened Spanish B2B copy while preserving the same business meaning and conversion paths.
- Moved contact page inline paragraph/button spacing styles into reusable CSS classes.

### Modified Files

- `src/data/site.ts`
- `src/pages/contacto.astro`
- `src/styles/global.css`
- `output/playwright/v079-density-polish/report.json`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- Browser QA:
  - `/contacto/` at 1440px and 390px: page-level overflow = 0, broken images = 0
  - `/proyectos/` at 1440px and 390px: page-level overflow = 0, broken images = 0
  - mobile contact helper text now stays within 3-4 line blocks in the sampled sections
  - desktop project solution summary card paragraphs no longer appear as 4-5 line dense blocks
- `pnpm build`: passed; 40 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- `pnpm qa:static`: passed; 35 HTML files, 35 sitemap routes, 1,636 internal links, 418 local assets, 243 images, 21 showroom links and 36 forms checked; 0 failures / 0 warnings.
- Evidence report:
  - `output/playwright/v079-density-polish/report.json`

### Next Action

- Continue visual QA on remaining content-heavy pages, especially `/fabrica/`, `/catalogo/` and detail pages. Launch blockers remain real WhatsApp, real form receiver, confirmed business email/social accounts and deeper case/certificate metadata.

## 2026-06-30 / v0.78 Medium Header and Mobile Overflow Polish

### Done

- Fixed a real page-level horizontal overflow found during browser QA:
  - at 1280px, the Header right CTA group and partner logo rail caused an 88px page overflow
  - at 390px, mobile section summary text inherited the desktop two-column `.section-head` layout and caused a 16px page overflow
- Updated responsive CSS only, without changing page structure or business copy:
  - medium desktop Header now hides the extra `Showroom` pill between 1081px and 1320px while keeping `Cotizar`
  - mobile `.section-head` is forced to a single column
  - horizontal rails now have explicit `width`, `max-width`, `min-width` and containment boundaries
  - partner/certificate rails stay internally scrollable without widening the page

### Modified Files

- `src/styles/global.css`
- `output/playwright/v078-header-rail-overflow/report.json`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- Browser QA:
  - homepage at 1280px: page-level horizontal overflow reduced from 88px to 0
  - homepage at 390px: page-level horizontal overflow reduced from 16px to 0
  - homepage at 390px: broken images = 0
  - 11 sampled core routes checked on desktop/mobile reported 0 page overflow, 0 broken images, 0 Matterport modal issues and 0 unfinished residue
- `pnpm build`: passed; 40 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- `pnpm qa:static`: passed; 35 HTML files, 35 sitemap routes, 1,636 internal links, 418 local assets, 243 images, 21 showroom links and 36 forms checked; 0 failures / 0 warnings.
- Evidence report:
  - `output/playwright/v078-header-rail-overflow/report.json`

### Next Action

- Continue route-level visual polish and real-data enrichment. The strongest remaining launch blockers are still real WhatsApp, real form receiver, confirmed business email/social accounts and deeper case/certificate metadata.

## 2026-06-30 / v0.77 Static QA Gate and Showroom Retention Check

### Done

- Added a reusable static QA command for the generated Astro site:
  - checks generated HTML routes
  - checks sitemap coverage
  - checks internal links
  - checks local asset references, including URL-encoded Chinese filenames
  - checks WebP usage for Hymueble assets
  - checks privacy links and floating WhatsApp entry
  - checks demo form structure
  - checks Matterport showroom links stay inside the shared in-site modal
- Confirmed the current showroom behavior matches the user requirement:
  - Matterport tours open through the Hymueble site modal
  - Matterport links do not use `target="_blank"`
  - iframe supports fullscreen through `allowfullscreen`
  - closing the modal resets the iframe to `about:blank`

### Modified Files

- `package.json`
- `scripts/qa-static.mjs`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm build`: passed; 40 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- `pnpm qa:static`: passed.
- Static QA result:
  - 35 generated HTML files
  - 35 sitemap routes
  - 1,636 internal links checked
  - 418 local assets checked
  - 243 images checked
  - 21 Matterport showroom links checked
  - 36 demo forms checked
  - 0 failures
  - 0 warnings
- Report written to `output/qa-static-report.json`.
- Browser QA on the homepage:
  - clicked the hotel Matterport showroom card
  - page URL stayed on `http://127.0.0.1:4321/`
  - the in-site dialog `Showroom virtual de Hoteles` opened
  - the Matterport tour loaded inside the dialog iframe
  - focus moved to the `Cerrar` button

### Next Action

- Continue visual/content polish and real launch preparation. Before public launch, still confirm real WhatsApp, real form receiver, business email and final social accounts.

## 2026-06-30 / v0.76 Form Submission Structure and Success Feedback Accessibility

### Done

- Hardened the shared project inquiry form without connecting a real backend:
  - added `method="post"` so the form has a real submission method when a receiver is connected later
  - added `enctype="multipart/form-data"` so optional project attachments are structurally ready for a file-capable receiver
  - added `data-form-purpose="project-inquiry"` as a stable hook for future analytics or backend integration
- Improved form success feedback accessibility:
  - success message now uses `role="status"` and `aria-live="polite"`
  - success message is focusable with `tabindex="-1"`
  - demo submission moves focus to the success message after showing it

### Modified Files

- `src/components/ContactForm.astro`
- `src/layouts/BaseLayout.astro`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm build`: passed; 39 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- Static HTML check on `/contacto/` confirmed:
  - `method="post"`
  - `enctype="multipart/form-data"`
  - `data-form-purpose="project-inquiry"`
  - `role="status"`
  - `aria-live="polite"`
  - `tabindex="-1"`
- Browser QA on `/contacto/`:
  - filled the 5 required fields
  - selected `Hoteles`
  - submitted the demo form
  - page stayed on `/contacto/`
  - `.project-form.is-sent` became active
  - success message displayed
  - active element became `.form-success`

### Next Action

- The UI and HTML structure are now closer to a real file-capable inquiry flow, but launch still requires choosing and connecting the actual form receiver.

## 2026-06-30 / v0.75 Privacy Page and Form Trust Closure

### Done

- Added a Spanish privacy policy page at `/privacidad/`.
- Kept the policy content practical and restrained:
  - what information may be received from B2B project inquiries
  - why Hymueble uses the information
  - how optional project files are handled
  - commercial follow-up channels
  - internal/project-service use
  - correction/deletion contact route
- Connected privacy entry points:
  - contact form privacy line
  - catalog lead modal form because it reuses `ContactForm`
  - footer bottom link
  - sitemap static paths
- Added a minimal legal-page layout so the page is readable and consistent with the current B2B visual system.
- Updated current-status and launch checklist documents so L-007 is no longer listed as missing a policy page.

### Modified Files

- `src/pages/privacidad.astro`
- `src/components/ContactForm.astro`
- `src/components/Footer.astro`
- `src/pages/sitemap.xml.ts`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm build`: passed; 39 checked files, 0 errors, 0 warnings, 0 hints; 35 pages generated.
- Browser QA checked `/privacidad/` and `/contacto/` at desktop 1440 x 1000 and mobile 390 x 900:
  - `/privacidad/` returns the expected page and H1.
  - 7 privacy content blocks render.
  - page-level horizontal overflow is 0.
  - broken images: 0.
  - canonical URL is `https://hymueble.com/privacidad/`.
  - contact form privacy link points to `/privacidad/`.
  - footer privacy link points to `/privacidad/`.
  - sitemap includes `/privacidad/`.
- Evidence directory:
  - `output/playwright/v075-privacy-page/`

### Next Action

- Continue launch hardening: real WhatsApp, form receiver, privacy policy final review, analytics and deployment settings.

## 2026-06-30 / v0.74 Showroom Modal Focus Management and Asset Plan Sync

### Done

- Improved the in-site showroom modal UX without changing the visual design:
  - opening a showroom now moves focus to the `Cerrar` button
  - closing the modal restores focus to the original showroom card/link
  - Escape still closes the modal
  - iframe `src` still resets to `about:blank` after close
- Updated the asset plan so the documentation reflects the current v0.74 state:
  - current date
  - home hero WebP usage
  - generated visuals as temporary atmosphere/process support
  - Matterport entries opening inside the shared site modal
  - modal focus and scroll-lock verification notes
- Updated planning documents that were still pointing to older v0.32/v0.42/v0.58 states:
  - next task board now references v0.74 and the in-site showroom modal
  - launch checklist now separates demo-ready showroom/form UX from remaining launch blockers

### Modified Files

- `src/layouts/BaseLayout.astro`
- `docs/project-brain/asset-plan.md`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/implementation-log.md`

### Verification

- Browser QA checked homepage mobile at 390 x 900:
  - showroom modal opens in-site
  - active element after open is the `Cerrar` button
  - `body.modal-open` is active while the modal is open
  - Escape closes the modal
  - focus returns to the original showroom card
  - iframe `src` resets to `about:blank`
- Build verification:
  - `pnpm build`: passed; 38 checked files, 0 errors, 0 warnings, 0 hints; 34 pages generated.
- Evidence directory:
  - `output/playwright/v074-showroom-focus/`

### Next Action

- Continue launch/readiness hardening: real WhatsApp number, form receiver, case evidence completion, and final deployment settings.

## 2026-06-30 / v0.73 Georgebuild Layout, In-Site Showroom Modal and Density Pass

### Done

- Continued the Georgebuild-inspired visual polish while keeping Hymueble's existing URL structure, navigation and B2B conversion logic.
- Rebuilt the trust/cooperation section into a restrained proof area:
  - removed the four duplicated project case cards from this section
  - kept partner/certificate evidence visible through low-density logo and certificate rails
  - retained certification chips as supporting proof instead of another card wall
- Removed the repeated dark showroom card from the homepage hero image so the right side works as a clean premium scene image.
- Converted all Matterport showroom entrances from new-tab external jumps into an in-site modal:
  - links use `data-showroom-modal`
  - iframe opens inside the site
  - close button, backdrop close and Esc close are supported
  - iframe `src` is cleared after closing
- Reduced visual density across high-scroll areas:
  - compacted `/proyectos/` route summaries and sector links
  - simplified hotel catalog tiles
  - turned mobile homepage project cards into a horizontal rail
  - compressed mobile quality, factory and qualification sections
- Tightened the final type scale:
  - homepage desktop H1 reduced to about 56px
  - general desktop H1 reduced to about 54px
  - mobile H1 reduced to about 34px
- Removed obsolete `.showroom-hero-card` CSS after the hero card was deleted from the DOM.

### Modified Files

- `src/components/ShowroomModal.astro`
- `src/layouts/BaseLayout.astro`
- `src/pages/index.astro`
- `src/pages/hoteles.astro`
- `src/pages/fabrica.astro`
- `src/pages/proyectos/index.astro`
- `src/pages/proyectos/hoteleria.astro`
- `src/pages/catalogo/hoteleria.astro`
- `src/pages/[section].astro`
- `src/pages/contacto.astro`
- `src/pages/showroom.astro`
- `src/pages/recursos/videos.astro`
- `src/components/TrustStrip.astro`
- `src/styles/global.css`
- `src/data/site.ts`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/06-验收/08-Georgebuild排版优化-v0.59.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm build`: passed; 38 checked files, 0 errors, 0 warnings, 0 hints; 34 pages generated.
- Playwright route audit covered desktop and mobile for:
  - `/`
  - `/hoteles/`
  - `/catalogo/`
  - `/catalogo/hoteleria/`
  - `/proyectos/`
  - `/proyectos/hoteleria/`
  - `/fabrica/`
  - `/showroom/`
  - `/recursos/blog/`
  - `/recursos/videos/`
  - `/contacto/`
- Audit result:
  - page-level horizontal overflow: 0
  - broken images after scrolling/lazy loading: 0
  - Matterport `target="_blank"` residue: 0
- Showroom modal QA confirmed:
  - desktop and mobile modal opens in-site
  - iframe uses the correct Matterport URL
  - body scroll locks while modal is open
  - close button and Esc close reset modal state
- Source scan confirmed obsolete `.showroom-hero-card` styles no longer exist.
- Evidence directories:
  - `output/playwright/v068-showroom-modal/`
  - `output/playwright/v072-post-density-audit/`
  - `output/playwright/v073-final-smoke/`

### Next Action

- Continue high-value polish on the remaining lighter pages: industry detail pages, catalog sector pages, project detail pages and final launch checklist.
- Replace placeholder contact details when the real WhatsApp number and form receiver are available.

## 2026-06-30 / v0.58 Resource Subpages Formalization

### Done

- Replaced `/recursos/blog/` from a placeholder-style page with a B2B resource page for procurement preparation.
- Added structured blog guide cards for:
  - project quote preparation
  - factory supplier evaluation
  - quality review before volume production
  - import and FF&E information preparation
- Replaced `/recursos/videos/` from a placeholder-style page with a visual resource page.
- Kept the corporate YouTube video embedded in-page with fullscreen support.
- Added video-use cards and four Matterport showroom cards for hotels, offices, healthcare and education.
- Added responsive resource-page CSS and removed the old `.placeholder-page` styles because no resource page uses that placeholder layout anymore.

### Modified Files

- `src/pages/recursos/blog.astro`
- `src/pages/recursos/videos.astro`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/03-页面/00-页面总表.md`
- `docs/project-brain/03-页面/11-资源页.md`
- `docs/project-brain/implementation-log.md`
- `docs/project-brain/06-验收/00-验收总表.md`

### Verification

- `pnpm run build`: passed; 37 checked files, 0 errors, 0 warnings, 0 hints; 34 pages generated.
- Static scan confirmed no `placeholder-page` class remains in resource pages or global CSS.
- Browser QA checked:
  - `/recursos/blog/` desktop at 1440 x 1100.
  - `/recursos/blog/` mobile at 390 x 1000.
  - `/recursos/videos/` desktop at 1440 x 1100.
  - `/recursos/videos/` mobile at 390 x 1000.
- Browser QA confirmed:
  - page-level horizontal overflow is 0.
  - broken images: 0.
  - no placeholder class or placeholder/preview residual text.
  - conversion CTA exists.
  - showroom references exist.
  - `/recursos/videos/` keeps 1 embedded YouTube iframe.
- Screenshot/report evidence:
  - `output/playwright/v058-resource-subpages/resource-subpages-report.json`
  - `output/playwright/v058-resource-subpages/blog-desktop.png`
  - `output/playwright/v058-resource-subpages/blog-mobile.png`
  - `output/playwright/v058-resource-subpages/videos-desktop.png`
  - `output/playwright/v058-resource-subpages/videos-mobile.png`

### Next Action

- Continue replacing lightweight pages with stronger evidence-based content, especially deeper industry pages and case detail evidence.

## 2026-06-30 / v0.57 Footer Top CTA Removal

### Done

- Removed the large top CTA section from the global footer per user feedback.
- Deleted the duplicated footer closing content:
  - `Cierre del proyecto`
  - `¿Listo para cotizar tu proyecto de mobiliario?`
  - brief chips for project information
  - commercial response CTA panel
- Kept the lower footer structure intact: brand, social links, solution links, B2B procurement links and contact entries.
- Cleaned the now-unused footer CTA CSS selectors.

### Modified Files

- `src/components/Footer.astro`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/implementation-log.md`
- `docs/project-brain/06-验收/00-验收总表.md`

### Verification

- `pnpm run build`: passed; 37 checked files, 0 errors, 0 warnings, 0 hints; 34 pages generated.
- Source scan confirmed no remaining `footer-closing`, `footer-brief`, `footer-action-panel`, `Cierre del proyecto` or `¿Listo para cotizar` in the footer source/styles.
- Browser QA checked `/contacto/`:
  - desktop 1440 x 1100
  - mobile 390 x 1000
- Browser QA confirmed:
  - Footer still exists.
  - Removed CTA text is absent.
  - Brand and 6 social links remain.
  - Desktop footer grid remains 4 columns.
  - Mobile footer stacks to 1 column.
  - Page-level horizontal overflow is 0.
  - Footer broken images: 0.
- Screenshot/report evidence:
  - `output/playwright/v057-footer-cta-removal/footer-removal-report.json`
  - `output/playwright/v057-footer-cta-removal/contacto-footer-desktop.png`
  - `output/playwright/v057-footer-cta-removal/contacto-footer-mobile.png`

### Next Action

- Continue route-level visual polish. Footer no longer duplicates the page-level quote CTAs, but real WhatsApp and form/file receiver are still launch prerequisites.

## 2026-06-30 / v0.56 Upload Button Text Readability Fix

### Done

- Fixed the upload button readability issue reported from the contact form screenshot.
- Scoped the generic `.file-upload label` selector to the direct field label only, so it no longer overrides the custom upload button label.
- Increased selector specificity for `.file-upload-control .file-upload-button` so the button keeps white text on a dark background.
- Kept the Spanish upload CTA text as `Seleccionar archivos`.

### Modified Files

- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/implementation-log.md`
- `docs/project-brain/06-验收/00-验收总表.md`

### Verification

- `pnpm run build`: passed; 37 checked files, 0 errors, 0 warnings, 0 hints; 34 pages generated.
- Browser QA checked `/contacto/` mobile at 390 x 1000:
  - Upload button text is `Seleccionar archivos`.
  - File empty state is `Ningún archivo seleccionado`.
  - Computed button text color is `rgb(255, 255, 255)`.
  - Computed button background is `rgb(18, 26, 34)`.
  - Page-level horizontal overflow is 0.
- Screenshot/report evidence:
  - `output/playwright/v056-upload-button-text/upload-button-text-report.json`
  - `output/playwright/v056-upload-button-text/contacto-mobile-upload-button.png`

### Next Action

- Continue launch hardening. The upload UI is visible and readable, but actual attachment delivery still depends on the future form receiver.

## 2026-06-30 / v0.55 Visible Attachment Upload Field

### Done

- Added a visible, non-required attachment upload field to the shared `ContactForm` component.
- Kept the upload field outside `Agregar detalles opcionales` because drawings, FF&E lists and project schedules are high-intent buyer signals.
- Supported multiple file selection with common project file types:
  - PDF
  - Word
  - Excel / CSV
  - images
  - ZIP / RAR
  - DWG / DXF
- Replaced the native English browser file button with a Spanish custom control:
  - `Seleccionar archivos`
  - `Ningún archivo seleccionado`
  - dynamic selected-file text for one or multiple files
- Kept the field optional so buyers can still submit a first-contact inquiry without sharing documents immediately.

### Modified Files

- `src/components/ContactForm.astro`
- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/implementation-log.md`
- `docs/project-brain/06-验收/00-验收总表.md`

### Verification

- `pnpm run build`: passed; 37 checked files, 0 errors, 0 warnings, 0 hints; 34 pages generated.
- Browser QA checked:
  - `/contacto/` desktop at 1440 x 1100.
  - `/contacto/` mobile at 390 x 1000.
  - `/catalogo/hoteleria/` catalog modal open at 1440 x 1000.
- Browser QA confirmed:
  - Attachment field exists in contact page and catalog modal.
  - Custom upload button is visible and uses Spanish text `Seleccionar archivos`.
  - Empty file state shows `Ningún archivo seleccionado`.
  - Field is not required.
  - Field supports multiple files.
  - Field is not inside the optional details disclosure.
  - `Agregar detalles opcionales` remains closed by default.
  - Submitting the form without an attachment still shows the success message.
  - Desktop and mobile sampled states have 0 page-level horizontal overflow.
  - Confirmed broken images: 0.
- Screenshot/report evidence:
  - `output/playwright/v055-visible-attachment-field/attachment-field-report.json`
  - `output/playwright/v055-visible-attachment-field/contacto-desktop-custom.png`
  - `output/playwright/v055-visible-attachment-field/contacto-mobile-custom.png`
  - `output/playwright/v055-visible-attachment-field/catalog-modal-attachment-custom.png`

### Next Action

- Choose the real form receiver before launch. The upload field is present in the frontend, but actual file reception still requires backend, form service, CRM or cloud-drive integration.

## 2026-06-30 / v0.54 SVG Favicon Replacement

### Done

- Replaced the favicon source with the user-provided official SVG logo:
  - `/Users/yoyo/Downloads/hongye-logo-transparent.svg`
- Overwrote `public/favicon.svg` with the official SVG instead of the previous cropped favicon.
- Regenerated favicon fallback assets from the embedded official SVG image:
  - `public/favicon.png`
  - `public/favicon.webp`
  - `public/apple-touch-icon.png`
- Updated the document head so browsers prefer `/favicon.svg` first, with PNG fallback and Apple Touch Icon preserved.

### Modified Files

- `public/favicon.svg`
- `public/favicon.png`
- `public/favicon.webp`
- `public/apple-touch-icon.png`
- `src/layouts/BaseLayout.astro`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/implementation-log.md`
- `docs/project-brain/06-验收/00-验收总表.md`

### Verification

- `pnpm run build`: passed; 37 checked files, 0 errors, 0 warnings, 0 hints; 34 pages generated.
- Browser QA checked `/contacto/` at 1440 x 900:
  - Head favicon links now include `/favicon.svg`, `/favicon.png` and `/apple-touch-icon.png`.
  - `/favicon.svg` returns 200 with `image/svg+xml`.
  - `/favicon.png` returns 200 with `image/png`.
  - `/apple-touch-icon.png` returns 200 with `image/png`.
  - Page-level horizontal overflow is 0.
  - Confirmed broken images: 0.
- Screenshot/report evidence:
  - `output/playwright/v054-svg-favicon/svg-favicon-report.json`
  - `output/playwright/v054-svg-favicon/contacto-favicon-check.png`

### Next Action

- Continue launch hardening and content evidence work; real WhatsApp and form receiver remain the largest business blockers.

## 2026-06-29 / v0.53 Official Transparent Logo Replacement

### Done

- Replaced the site-wide company logo asset with the user-provided official transparent WebP file.
- Kept the existing canonical logo path so Header, Footer and Organization JSON-LD all use the new logo without changing data contracts.
- Generated small-tab assets from the same official logo source:
  - `public/favicon.webp`
  - `public/favicon.png`
  - `public/apple-touch-icon.png`
- Updated the document head to use the new WebP favicon, PNG fallback and Apple Touch Icon.
- Adjusted Header and Footer logo sizing so the new wider transparent logo fits without crowding navigation or mobile CTA controls.

### Modified Files

- `public/assets/hymueble/brand/hongye-shengda-logo.webp`
- `public/favicon.webp`
- `public/favicon.png`
- `public/apple-touch-icon.png`
- `src/layouts/BaseLayout.astro`
- `src/components/Header.astro`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/implementation-log.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`

### Verification

- `pnpm run build`: passed; 37 checked files, 0 errors, 0 warnings, 0 hints; 34 pages generated.
- Browser QA checked:
  - `/` desktop at 1440 x 900.
  - `/` mobile at 390 x 844.
  - `/contacto/` desktop at 1440 x 900.
- Browser QA confirmed:
  - Header logo loads from `/assets/hymueble/brand/hongye-shengda-logo.webp` with natural size 900 x 477.
  - Footer logo loads from the same new WebP asset.
  - Favicon links are `/favicon.webp`, `/favicon.png` and `/apple-touch-icon.png`.
  - Sampled pages have 0 page-level horizontal overflow.
  - `/` and `/contacto/` have 0 confirmed broken images after scroll-based image verification.
- Screenshot/report evidence:
  - `output/playwright/v053-logo-replacement/logo-replacement-report.json`
  - `output/playwright/v053-logo-replacement/home-desktop.png`
  - `output/playwright/v053-logo-replacement/home-mobile.png`
  - `output/playwright/v053-logo-replacement/contacto-desktop.png`

### Next Action

- Continue launch hardening: real WhatsApp number, real form receiver, privacy copy, more case evidence and final deployment settings.

## 2026-06-29 / v0.52 Full Route Stability Sweep

### Done

- Ran a full browser QA sweep across all 34 generated internal routes after the low-friction form update.
- Confirmed every route returns 200 and keeps the core commercial UI elements:
  - Header
  - Footer
  - floating WhatsApp entry
- Checked page-level horizontal overflow, broken images, unfinished visible residue, non-WebP Hymueble images, missing core elements and internal link format issues.
- Rechecked the mobile menu at 390 x 844; the menu opens correctly, keeps 21 links available and shows `Contacto`.

### Modified Files

- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/implementation-log.md`
- `docs/project-brain/06-验收/00-验收总表.md`

### Verification

- `pnpm run build`: passed; 37 checked files, 0 errors, 0 warnings, 0 hints; 34 pages generated.
- Browser QA summary:
  - 34 routes checked.
  - 0 bad status routes.
  - 0 page-level overflow routes.
  - 0 broken image routes.
  - 0 unfinished residue routes.
  - 0 non-WebP Hymueble image routes.
  - 0 missing core element routes.
  - 0 internal bad link routes.
- Screenshot/report evidence:
  - `output/playwright/v052-full-route-sweep/full-route-sweep-report.json`
  - `output/playwright/v052-full-route-sweep/mobile-menu-open.png`

### Next Action

- Continue deep content proofing: real case fields, certificate evidence, stronger project-detail pages and launch checklist.

## 2026-06-29 / v0.51 Low-Friction Inquiry Form

### Done

- Reduced the project inquiry form from a long visible questionnaire to a low-friction first-contact form.
- Kept only 5 required visible fields for initial inquiry:
  - `company`
  - `whatsapp`
  - `location`
  - `sector`
  - `message`
- Moved email, spaces, quantity, project stage, timeline and budget/range into a default-closed optional details area.
- Updated contact-page copy to tell buyers they can start with basic information and provide technical details later.
- Kept the same component compatible with the catalog download modal, so catalog lead capture also uses the lower-resistance flow.

### Modified Files

- `src/components/ContactForm.astro`
- `src/pages/contacto.astro`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/implementation-log.md`
- `docs/project-brain/06-验收/00-验收总表.md`

### Verification

- `pnpm run build`: passed; 37 checked files, 0 errors, 0 warnings, 0 hints; 34 pages generated.
- Browser QA checked:
  - `/contacto/` desktop at 1440 x 1100.
  - `/contacto/` mobile at 390 x 1100.
  - `/catalogo/hoteleria/` catalog modal open at 1440 x 1000.
- All sampled states reported 0 broken images and 0 page-level horizontal overflow.
- Required visible fields are now exactly `company`, `whatsapp`, `location`, `sector`, `message`.
- Optional details remain closed by default on contact page and catalog modal.
- Screenshot/report evidence:
  - `output/playwright/v051-low-friction-form/low-friction-form-report.json`
  - `output/playwright/v051-low-friction-form/contacto-desktop.png`
  - `output/playwright/v051-low-friction-form/contacto-mobile.png`
  - `output/playwright/v051-low-friction-form/catalog-modal-open.png`

### Next Action

- Continue reducing density in deeper project/detail pages and then rerun a full 34-route internal link/image/overflow sweep.

## 2026-06-29 / v0.50 Deep Density And Form Grouping Pass

### Done

- Grouped the contact form into procurement sections as an intermediate step before v0.51.
- Shortened hotel, hotel catalog and hotel project page copy so those pages scan faster.
- Verified the grouped form and hotel path with browser screenshots before the user requested a lower-resistance form approach.

### Modified Files

- `src/components/ContactForm.astro`
- `src/pages/contacto.astro`
- `src/pages/hoteles.astro`
- `src/pages/catalogo/hoteleria.astro`
- `src/pages/proyectos/hoteleria.astro`
- `src/styles/global.css`

### Verification

- `pnpm run build`: passed.
- Browser QA checked `/contacto/`, `/hoteles/`, `/catalogo/hoteleria/`, `/proyectos/hoteleria/` and catalog modal.
- The grouped form was technically valid but visually still heavier than ideal for first-contact conversion, so v0.51 replaced it with the lower-friction form.

## 2026-06-29 / v0.49 Visual Density Polish Pass

### Done

- Implemented the first code pass from the v0.48 visual density audit.
- Added global layout and typography tokens for container width, section spacing, text width, grid gap and card gap.
- Reduced oversized typography on homepage, showroom, route bridge, solution intro, contact hero and footer closing CTA while preserving strong first-screen impact.
- Tightened homepage copy in the hero, showroom section, route bridge and quality control section.
- Shortened quality-control proof and checkpoint copy so cards scan faster and feel less like internal process documentation.
- Reduced showroom and quality card height/padding pressure and improved section spacing consistency.

### Modified Files

- `src/styles/global.css`
- `src/pages/index.astro`
- `src/pages/contacto.astro`
- `src/components/Footer.astro`
- `src/data/site.ts`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/implementation-log.md`
- `docs/project-brain/06-验收/00-验收总表.md`

### Verification

- `pnpm run build`: passed; 37 checked files, 0 errors, 0 warnings, 0 hints; 34 pages generated.
- Browser screenshot QA passed on:
  - `/` at 1440 x 1300 and 390 x 1100.
  - `/showroom/` at 1440 x 1200.
  - `/contacto/` at 1440 x 1200.
  - `/` mobile menu open at 390 x 844.
- All sampled states reported 0 broken images and 0 page-level horizontal overflow.
- Typography check after polish:
  - Homepage H1 desktop: 56px.
  - Homepage H1 mobile: 38px.
  - Homepage ordinary H2 samples: 30-40px on mobile/desktop.
  - Homepage showroom H2: 48px as a featured experience section.
  - Contact page H1: 50px.
  - Showroom page H1: 56px.
- Functional counts remained intact: homepage keeps 4 showroom cards, 4 quality proof cards, 6 quality checkpoints, 6 footer social links, and mobile menu shows `Contacto`.
- Screenshot/report evidence:
  - `output/playwright/v049-visual-density-polish/visual-density-report.json`
  - `output/playwright/v049-visual-density-polish/home-desktop.png`
  - `output/playwright/v049-visual-density-polish/home-mobile.png`
  - `output/playwright/v049-visual-density-polish/showroom-desktop.png`
  - `output/playwright/v049-visual-density-polish/contacto-desktop.png`
  - `output/playwright/v049-visual-density-polish/mobile-menu-open.png`

### Next Action

- Continue the second visual density pass on deeper pages: hotel category pages, project listing/detail pages, factory proof sections and contact form grouping.

## 2026-06-29 / v0.48 Visual Density Audit

### Done

- Added a full visual density and typography audit for the current v0.47 boss-demo preview.
- Defined global rules for section density, font scale, spacing, card rhythm, CTA hierarchy, image usage, and mobile stacking.
- Translated the user's design principles into concrete page-module recommendations for home, showroom, hotel, catalog, projects, factory, quality control, contact, and footer.
- Added before/after structures for factory strength, hotel furniture solutions, and quality control modules.
- Added executable CSS/layout guidance for the next polish pass.

### Modified Files

- `docs/project-brain/06-验收/07-视觉排版密度审计-v0.48.md`
- `docs/project-brain/implementation-log.md`

### Verification

- Documentation-only pass. No source code was changed.
- Build was not rerun because this pass does not affect runtime output.

### Next Action

- Use this audit as the standard for the next visual polish implementation pass, starting with the highest-density sections: homepage hero/showroom, hotel hero value points, factory proof, quality control, contact form, and footer.

## 2026-06-29 / v0.2 Baseline

### Done

- Built Astro static site with core pages and sector routes.
- Added catalog and project hubs.
- Added six hotel category pages.
- Added project detail pages from current data.
- Added factory page.
- Added resource hub.
- Added project inquiry form, catalog lead modal, and local success feedback.
- Ran build and link checks; 33 pages generated and internal links passed.
- Browser-checked key pages, forms, modal, and mobile menu.
- Cleared visible Chinese/internal wording from frontend pages.

### Key Files

- `src/pages/index.astro`
- `src/pages/hoteles.astro`
- `src/pages/catalogo/index.astro`
- `src/pages/catalogo/hoteleria.astro`
- `src/pages/catalogo/hoteleria/[category].astro`
- `src/pages/proyectos/index.astro`
- `src/pages/proyectos/hoteleria.astro`
- `src/pages/proyectos/[sector]/[project].astro`
- `src/pages/fabrica.astro`
- `src/pages/contacto.astro`
- `src/data/site.ts`
- `src/styles/global.css`
- `docs/project-brain/`

### Verification

- `pnpm run build`: passed.
- Internal link crawl: 33 pages, no 404.
- Browser checks: no broken images or horizontal overflow on sampled pages.
- Contact form: local success feedback works.
- Catalog modal: opens and local success feedback works.
- Mobile menu: opens at 390px viewport without horizontal overflow.

### Current Blockers

- Real WhatsApp number not provided.
- Real backend not connected.
- Certificate and case evidence need deeper ingestion.

### Next Action

- Upgrade homepage visual impact and Virtual Showroom prominence for v0.3.

## 2026-06-29 / v0.3 Visual Polish Pass

### Done

- Added root-level project-brain documents required by the current goal objective.
- Upgraded the homepage hero from a conventional split layout to an immersive spatial hero.
- Added homepage Virtual Showroom hero card and standalone showroom section.
- Added homepage Quality Control section to make risk reduction more explicit.
- Centralized the Matterport URL in `brand.showroom`.
- Added Showroom entry to Header and Footer.
- Added stable CSS-only motion: hero drift, showroom glow, card lift, and quality-step hover.
- Added reduced-motion protection.

### Modified Files

- `src/pages/index.astro`
- `src/pages/hoteles.astro`
- `src/pages/catalogo/hoteleria.astro`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/data/site.ts`
- `src/styles/global.css`
- `docs/project-brain/project-inventory.md`
- `docs/project-brain/brand-positioning.md`
- `docs/project-brain/website-strategy.md`
- `docs/project-brain/content-system.md`
- `docs/project-brain/visual-direction.md`
- `docs/project-brain/asset-plan.md`
- `docs/project-brain/page-map.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build` passed after the first homepage polish.
- Browser screenshot QA confirmed the new hero has no horizontal overflow and shows Virtual Showroom entries on desktop and mobile.
- Desktop CTA visibility was improved by reducing hero H1 max size and tightening spacing.

### Next Action

- Re-run build and link checks after Header/Footer Showroom and motion additions.
- Read visual/animation subagent reports and merge the strongest suggestions.

## 2026-06-29 / v0.4 Showroom And Asset De-dup Pass

### Done

- Added `/showroom/` as a dedicated Virtual Showroom hub.
- Added the four user-provided Matterport links: hotel, office, healthcare, and education.
- Added the five user-provided group website links to the showroom page.
- Changed Header/Footer Showroom links to local `/showroom/`.
- Changed hotel and hotel catalog showroom CTAs to the hotel Matterport URL.
- Generated and copied four additional premium showroom visuals for local preview.
- Copied real company/case/factory materials from the approved资料 folder into `public/assets/hymueble/`.
- Replaced repeated project-card imagery with case/factory-specific visuals.
- Removed repeated image `src` occurrences within the same rendered page.
- Cleaned temporary PDF render and Playwright directories.

### Modified Files

- `src/pages/showroom.astro`
- `src/pages/index.astro`
- `src/pages/hoteles.astro`
- `src/pages/catalogo/hoteleria.astro`
- `src/pages/catalogo/hoteleria/[category].astro`
- `src/pages/proyectos/index.astro`
- `src/pages/proyectos/[sector]/[project].astro`
- `src/pages/fabrica.astro`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/FactoryStrip.astro`
- `src/data/site.ts`
- `src/styles/global.css`
- `public/assets/hymueble/generated/`
- `public/assets/hymueble/casos/`
- `public/assets/hymueble/fabrica/produccion/`

### Verification

- `pnpm run build`: passed; 34 pages generated.
- Internal link crawl: 34 HTML files checked, no missing internal targets.
- Repeated image audit: no repeated image `src` within the same rendered HTML page.
- Browser screenshot QA after hero typography adjustment: homepage and `/showroom/` desktop/mobile had no horizontal overflow, no broken images, and clear H1/header separation.
- HTTP checks: `/proyectos/`, `/fabrica/`, and `/proyectos/hoteleria/grand-kempinski-hotel/` returned 200 from the local dev server.

### Notes

- Later browser screenshot checks for project/factory pages timed out in the browser-control channel, so those pages were validated by build, link crawl, image audit, and HTTP 200 checks instead.
- Visual subagent recommendations were merged in principle: showroom as a conversion asset, generated visuals as temporary atmosphere, real company materials for proof, and no repeated image use on the same page.

### Next Action

- Add real quality-control, packaging, certificate, and showroom-still proof modules.
- Consider a small IntersectionObserver reveal system only after mobile performance is rechecked.

## 2026-06-29 / v0.5 Quality Visual Proof Pass

### Done

- Added four distinct generated process visuals for the homepage Quality Control section.
- Rebuilt the homepage quality module from text-only cards into visual process cards.
- Kept each quality step mapped to a different image: material review, mock-up room, production follow-up, and export packaging.
- Preserved the no-repeat rule: no repeated image `src` within the same rendered page.
- Documented generated process visuals as preview assets, not final real proof.

### Modified Files

- `src/pages/index.astro`
- `src/data/site.ts`
- `src/styles/global.css`
- `public/assets/hymueble/generated/quality-material-review.webp`
- `public/assets/hymueble/generated/quality-mockup-room.webp`
- `public/assets/hymueble/generated/quality-production-followup.webp`
- `public/assets/hymueble/generated/quality-export-packaging.webp`
- `docs/project-brain/asset-plan.md`
- `docs/project-brain/project-inventory.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated.
- Internal link crawl: 34 HTML files checked, no missing internal targets.
- Repeated image audit: no repeated image `src` within the same rendered HTML page.
- Local image audit: no missing local image assets.
- Playwright desktop check at 1440px: no horizontal overflow, no broken images, and 4 quality cards loaded.
- Playwright mobile check at 390px: no horizontal overflow, no broken images, no sampled text overflow, and 4 quality cards loaded.

### Next Action

- Replace generated quality/process visuals with strong real company proof photos if the selected materials are polished enough for launch.
- Continue certificate and case-evidence ingestion.

## 2026-06-29 / v0.6 Global Image Reuse Reduction

### Done

- Audited image usage frequency across all 34 generated HTML pages.
- Reduced the highest global repeated image count from 9x to 5x.
- Removed unrelated hotel project-card fallback from office, healthcare, and residential project pages.
- Added separate catalog hub and project hub hero visuals.
- Added `catalogImage` and `projectImage` fields to sector category data so homepage, catalog, and project routes do not all reuse the same sector hero.
- Removed case images from ordinary hotel catalog detail support panels, keeping real case imagery focused on project/case contexts.

### Modified Files

- `src/data/site.ts`
- `src/pages/catalogo/index.astro`
- `src/pages/catalogo/[sector].astro`
- `src/pages/catalogo/hoteleria/[category].astro`
- `src/pages/proyectos/index.astro`
- `src/pages/proyectos/[sector].astro`
- `public/assets/hymueble/generated/catalog-hub-material-library.webp`
- `public/assets/hymueble/generated/project-portfolio-review.webp`
- `docs/project-brain/asset-plan.md`
- `docs/project-brain/project-inventory.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated.
- No repeated image `src` within the same rendered page.
- No missing local image assets.
- No missing internal links.
- Local HTTP 200 checks passed for `/catalogo/`, `/proyectos/`, and `/proyectos/oficinas/`.

### Remaining Image Notes

- Some real case images still appear up to 5x because the same cases are intentionally shown on home, project, hotel, and detail routes.
- The right way to reduce this further is to ingest more approved alternate photos for each case, not to replace real cases with unrelated decorative imagery.

## 2026-06-29 / v0.7 Factory Qualification Proof Pass

### Done

- Rendered selected pages from the approved corporate qualification PDF into web-ready JPG proof images.
- Added a visual qualification evidence module to `/fabrica/`.
- Added certification highlight chips for ISO, GREENGUARD, BIFMA, CFCC, China Environmental Labeling, and EPD signals.
- Expanded the contact form with B2B procurement fields for quantity, timeline, and target budget/range.
- Documented the qualification image source and replacement status in `asset-plan.md`.

### Modified Files

- `src/components/ContactForm.astro`
- `src/data/site.ts`
- `src/pages/fabrica.astro`
- `src/styles/global.css`
- `public/assets/hymueble/qualification/industrial-park-workshops.webp`
- `public/assets/hymueble/qualification/honors-overview.webp`
- `public/assets/hymueble/qualification/certificate-matrix.webp`
- `docs/project-brain/asset-plan.md`
- `docs/project-brain/project-inventory.md`
- `docs/project-brain/page-map.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated.
- Local image audit: no missing local image assets.
- Internal link crawl: no missing internal targets.
- Repeated image audit: no repeated image `src` within the same rendered HTML page after follow-up v0.8 fixes.
- Playwright checks passed for `/fabrica/` and `/contacto/` desktop/mobile states during the verification pass.

### Next Action

- Continue ingesting alternate case angles and stronger real proof photos to further reduce global image reuse without weakening credibility.

## 2026-06-29 / v0.8 Core Visual De-Dup and Polish Pass

### Done

- Replaced the low-quality factory hero image with a cleaner premium production visual.
- Reworked factory strip sources to remove the blurred aerial hero and the watermarked assembly-line image from active factory strip use.
- Replaced contact page hotel-lobby/watermarked factory visuals with a project consultation board and export-packaging visual.
- Replaced the contact map-card background so it no longer uses the blurred factory aerial image.
- Compressed active showroom PNG visuals into lighter JPG variants for homepage/showroom use.
- Separated the main hotel path hero images: `/hoteles/`, `/catalogo/hoteleria/`, and `/proyectos/hoteleria/` now use distinct visual roles.
- Fixed hotel category support-image mismatches for bar and conference pages.
- Cleared all same-page repeated image `src` findings after the visual changes.

### Modified Files

- `src/data/site.ts`
- `src/pages/fabrica.astro`
- `src/pages/contacto.astro`
- `src/pages/index.astro`
- `src/pages/showroom.astro`
- `src/pages/catalogo/hoteleria.astro`
- `src/pages/catalogo/hoteleria/[category].astro`
- `src/pages/proyectos/hoteleria.astro`
- `src/styles/global.css`
- `public/assets/hymueble/generated/home-virtual-showroom-atrium.webp`
- `public/assets/hymueble/generated/showroom-hotel-premium.webp`
- `public/assets/hymueble/fabrica/produccion/factory-production-hero.webp`
- `public/assets/hymueble/fabrica/produccion/export-packaging-proof.webp`
- `public/assets/hymueble/contacto/produccion/project-consultation-board.webp`
- `docs/project-brain/asset-plan.md`
- `docs/project-brain/project-inventory.md`
- `docs/project-brain/page-map.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated.
- Static audit: 34 HTML files checked; no missing local images, no missing internal links, and no same-page repeated image `src`.
- Playwright desktop checks passed for `/fabrica/`, `/contacto/`, `/catalogo/hoteleria/`, and `/proyectos/hoteleria/`: no horizontal overflow, no broken images, and expected hero images loaded.
- Screenshots saved to `output/playwright/v08-fabrica-desktop.png` and `output/playwright/v08-contacto-desktop.png`.

### Remaining Image Notes

- Some real case images still appear up to 5x globally because the same projects appear on homepage, project hub, sector project page, and detail pages.
- More alternate case angles should be ingested next, especially Hilton, Kempinski, Raffles, and Huntington.
- Matterport showroom stills are still not extracted; current showroom visuals are generated preview assets.

## 2026-06-29 / v0.9 Initial Case Evidence Enrichment

### Done

- Re-read the Excel planning workbook and created a dedicated v0.8 planning-gap audit document.
- Rendered selected pages from Grand Kempinski, Hilton DoubleTree, and Raffles PDF materials for visual inspection.
- Added conservative evidence tags to project detail pages without inventing missing year, city, room count, or monetary fields.
- Updated the case evidence database with the four currently active cases and their source-material paths.

### Modified Files

- `src/pages/proyectos/[sector]/[project].astro`
- `docs/project-brain/06-验收/06-策划案差距审计-v0.8.md`
- `docs/project-brain/04-素材/02-案例证据库.md`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/project-inventory.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated.
- Playwright check passed for `/proyectos/hoteleria/hilton-doubletree-hotel/`: no horizontal overflow, no broken images, and evidence tags rendered.

### Remaining Case Notes

- Exact city/country, delivery year, hotel room count, and detailed supply scope still need extraction from richer source material or manual confirmation.
- Raffles currently has stronger packaging/documentary evidence than polished page imagery; continue extracting alternate pages before using it as a primary visual.

## 2026-06-29 / v0.10 Cooperation And Certification Trust Strip

### Done

- Added a reusable `TrustStrip` component for buyer-facing cooperation and certification signals.
- Added `cooperationSignals` and `hotelCooperationSignals` to the site data source.
- Replaced the weaker homepage and hotel-page proof-card sections with a more structured trust wall.
- Kept the first version text-based instead of image-logo-based to avoid introducing unreviewed logo files during the local preview stage.
- Added responsive behavior: desktop grid, tablet two-column grid, mobile single-column cards.

### Modified Files

- `src/components/TrustStrip.astro`
- `src/data/site.ts`
- `src/pages/index.astro`
- `src/pages/hoteles.astro`
- `src/pages/fabrica.astro`
- `src/styles/global.css`
- `docs/project-brain/project-inventory.md`
- `docs/project-brain/implementation-log.md`
- `docs/project-brain/06-验收/06-策划案差距审计-v0.8.md`
- `docs/project-brain/06-验收/03-问题清单.md`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings, and 0 hints.
- Static audit: 34 HTML files checked; no missing local images, no missing internal links, and no same-page repeated image `src`.
- Playwright checks passed for `/` and `/hoteles/` at 1440px and 390px: no horizontal overflow, no broken images, and trust signals rendered.
- Screenshots saved to `output/playwright/v010-home-trust-desktop.png` and `output/playwright/v010-hoteles-trust-mobile.png`.

### Remaining Trust Notes

- The current trust strip is a factual signal wall, not a final logo wall.
- Before launch, decide whether to use official logo images, text-only references, or a mixed proof section based on available authorization and brand standards.

## 2026-06-29 / v0.11 Hotel Case Multi-Angle Image Pass

### Done

- Added scenario-specific project image fields: `homeImage`, `hotelImage`, `hubImage`, `listingImage`, and `detailImage`.
- Updated `ProjectCard` so pages can request the right image role instead of reusing one global image.
- Extracted and processed alternate angles for Grand Kempinski and Hilton from named case PDF materials.
- Added Raffles proof/process imagery from the Raffles PDF and a warm hospitality restaurant alternate from local company material for homepage use.
- Updated homepage, hotel page, project hub, hotel project listing, sector project routes, and project detail hero/support images.

### Modified Files

- `src/components/ProjectCard.astro`
- `src/data/site.ts`
- `src/pages/index.astro`
- `src/pages/hoteles.astro`
- `src/pages/proyectos/index.astro`
- `src/pages/proyectos/hoteleria.astro`
- `src/pages/proyectos/[sector].astro`
- `src/pages/proyectos/[sector]/[project].astro`
- `public/assets/hymueble/casos/`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings, and 0 hints.
- Static audit: 34 HTML files checked; no missing local images, no missing internal links, and no same-page repeated image `src`.
- Hotel case images that previously appeared 5x were split into separate image roles.
- Playwright checked `/proyectos/hoteleria/` and `/hoteles/`: no horizontal overflow, no broken images, and project cards rendered the intended images.
- Screenshot saved to `output/playwright/v011-proyectos-hoteleria-desktop.png` and `output/playwright/v011-hoteles-desktop.png`.

## 2026-06-29 / v0.12 Huntington And Sector Image De-Dup Pass

### Done

- Ingested multiple Huntington School Of Lagos images from the approved installation-material folder.
- Added clean/cropped Huntington image roles: campus exterior, classroom, reception, auditorium installation, project model, and workstations.
- Removed high-frequency Huntington reuse by assigning different image roles to homepage, project hub, education listing, and detail page.
- Changed office, healthcare, education, and residential `projectImage` values to distinct directory/category visuals instead of reusing the same sector card image.
- Reduced global image frequency so the current maximum is 3 occurrences for any one image.

### Modified Files

- `src/data/site.ts`
- `src/pages/proyectos/[sector]/[project].astro`
- `public/assets/hymueble/casos/huntington-campus-exterior.webp`
- `public/assets/hymueble/casos/huntington-classroom-lab.webp`
- `public/assets/hymueble/casos/huntington-reception-installation.webp`
- `public/assets/hymueble/casos/huntington-auditorium-installation.webp`
- `public/assets/hymueble/casos/huntington-project-model.webp`
- `public/assets/hymueble/casos/raffles-restaurant-warm-case.webp`
- `docs/project-brain/asset-plan.md`
- `docs/project-brain/04-素材/02-案例证据库.md`
- `docs/project-brain/project-inventory.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings, and 0 hints.
- Static audit: no missing local images, no missing internal links, no same-page repeated image `src`.
- Global image frequency audit: highest current image frequency is 3.
- Playwright checked homepage desktop and Huntington detail mobile: no horizontal overflow, no broken images, and intended project images rendered.
- Screenshots saved to `output/playwright/v012-home-desktop.png`, `output/playwright/v012-huntington-mobile.png`, and source contact sheets under `output/playwright/`.

### Remaining Image Notes

- Hotel catalog category images still appear up to 3x because `/hoteles/`, `/catalogo/hoteleria/`, and specific category pages intentionally share category visuals.
- Raffles still has fewer polished exact case-space angles than Kempinski/Hilton/Huntington; current alternates balance visual quality and proof conservatism.

## 2026-06-29 / v0.13 Real Showroom And Image Frequency Pass

### Done

- Replaced generated showroom card visuals with real Matterport thumbnail stills from the four user-provided showroom links.
- Created a composite showroom hero from the four Matterport stills so `/showroom/` does not repeat the hotel thumbnail as both hero and card.
- Added a dedicated bar-counter catalog image from company material for the hotel catalog page.
- Extended `CatalogCard` with an optional image role so `/hoteles/`, `/catalogo/hoteleria/`, and hotel category pages can use different image roles without duplicating page structure.
- Split Hilton and Raffles project image roles further across hotel page, listing page, and detail page.
- Reduced global rendered image frequency from 3 to 2 while keeping no same-page repeated image `src`.

### Modified Files

- `src/components/CatalogCard.astro`
- `src/data/site.ts`
- `src/pages/showroom.astro`
- `src/pages/catalogo/hoteleria.astro`
- `src/pages/catalogo/hoteleria/[category].astro`
- `public/assets/hymueble/showroom/matterport-hotel-thumb.webp`
- `public/assets/hymueble/showroom/matterport-office-thumb.webp`
- `public/assets/hymueble/showroom/matterport-healthcare-thumb.webp`
- `public/assets/hymueble/showroom/matterport-education-thumb.webp`
- `public/assets/hymueble/showroom/matterport-showroom-hero.webp`
- `public/assets/hymueble/hoteles/catalogo/hotel-bar-counter.webp`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings, and 0 hints.
- Static audit: 34 HTML files checked; no missing local images, no missing internal links, and no same-page repeated image `src`.
- Global image frequency audit: highest current image frequency is 2.
- Playwright checked `/showroom/` desktop/mobile, `/catalogo/hoteleria/` desktop, and `/catalogo/hoteleria/muebles-para-bar/` mobile: no horizontal overflow and no broken images.
- Screenshots saved to `output/playwright/v013-showroom-desktop.png`, `output/playwright/v013-showroom-mobile.png`, `output/playwright/v013-catalogo-hoteleria-desktop.png`, and `output/playwright/v013-bar-category-mobile.png`.

### Remaining Image Notes

- Some generated process visuals remain for local demo polish: quality-control, mock-up room, production follow-up, export packaging, and contact consultation.
- Matterport thumbnails are real tour stills, but manual capture may produce more controlled crops before launch.
- Global frequency 2 is acceptable for the current static preview; keep the same audit after future page additions.

## 2026-06-29 / v0.14 Real Process Visual And Video Cover Pass

### Done

- Replaced the homepage quality-control process visuals with real company process images: material finishing, mock-up room, production follow-up, and export preparation.
- Replaced the generated factory material-review image on `/fabrica/` with a real material finishing image.
- Replaced the generated mock-up visual on `/catalogo/hoteleria/` with a real hotel mock-up room image.
- Replaced the generated export-packaging visual on `/contacto/` with a real export-preparation / protected-chair image.
- Replaced the homepage YouTube iframe with a stable factory video cover link to avoid a black local-preview frame.

### Modified Files

- `src/data/site.ts`
- `src/pages/index.astro`
- `src/pages/fabrica.astro`
- `src/pages/contacto.astro`
- `src/pages/catalogo/hoteleria.astro`
- `src/styles/global.css`
- `public/assets/hymueble/fabrica/produccion/real-material-finishing.webp`
- `public/assets/hymueble/fabrica/produccion/real-mockup-room.webp`
- `public/assets/hymueble/fabrica/produccion/real-production-followup.webp`
- `public/assets/hymueble/fabrica/produccion/real-export-packaging.webp`
- `public/assets/hymueble/fabrica/produccion/factory-video-cover.webp`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings, and 0 hints.
- Static audit: 34 HTML files checked; no missing local images, no missing internal links, and no same-page repeated image `src`.
- Generated images still rendered only in non-proof visual roles: homepage hero, catalog hub hero, and project hub hero.
- Global image frequency audit: highest current image frequency remains 2.
- Playwright checked homepage, `/contacto/`, and `/fabrica/`: no horizontal overflow, no broken images, and homepage video module now uses `factory-video-cover.jpg` with zero iframes.
- Screenshots saved to `output/playwright/v014-home-video-cover-desktop.png`, `output/playwright/v014-contacto-real-packaging-mobile.png`, and `output/playwright/v014-fabrica-real-material-desktop.png`.

### Remaining Image Notes

- Some real production images include company-site watermarking or Chinese factory signage because they come from existing company material. Acceptable for local preview; consider a no-watermark polish pass before public launch.
- Remaining generated visuals are mainly atmospheric/hub images rather than proof claims.

## 2026-06-29 / v0.14.1 Corporate Video Link Consistency Pass

### Done

- Updated the homepage corporate video link to the new user-provided YouTube URL.
- Updated `/recursos/videos/` to use the same corporate video URL so the site does not expose two different corporate videos.
- Synchronized current status docs from v0.13 wording to v0.14 where they describe the active demo state.

### Modified Files

- `src/pages/index.astro`
- `src/pages/recursos/videos.astro`
- `docs/project-brain/asset-plan.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/06-验收/04-老板演示准备.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings, and 0 hints.
- Static audit: 34 HTML files checked; old corporate video ID appears on 0 pages, and the new video ID appears on homepage and `/recursos/videos/`.
- Static audit also confirmed no missing local images, no missing internal links, and no same-page repeated image `src`.
- Playwright checked homepage desktop and `/recursos/videos/` mobile: new corporate video link is present, old video link is absent, no broken images, and no horizontal overflow.
- Screenshot saved to `output/playwright/v0141-videos-new-link-mobile.png`.

## 2026-06-29 / v0.15 12-Step Project Delivery Process Pass

### Done

- Re-read the Excel planning workbook and identified that the project service process was underrepresented: the plan specifies a full process from quotation through post-sale support.
- Expanded the shared `processSteps` data from 6 steps to 12 steps.
- Updated `ProcessSteps` so every card shows an explicit step number, improving scanability for B2B buyers.
- Updated homepage and hotel page process copy to describe a full project-delivery path instead of a shortened production-only flow.
- Synchronized current project-brain status files to v0.15 and corrected stale homepage/hotel page notes that still described the site as v0.1.

### Modified Files

- `src/data/site.ts`
- `src/components/ProcessSteps.astro`
- `src/styles/global.css`
- `src/pages/index.astro`
- `src/pages/hoteles.astro`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/03-页面/01-首页.md`
- `docs/project-brain/03-页面/02-酒店页.md`
- `docs/project-brain/05-开发/00-开发总览.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/06-验收/04-老板演示准备.md`
- `docs/project-brain/page-map.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings, and 0 hints.
- Static audit: 34 HTML files checked; every page that renders `ProcessSteps` now has 12 process cards.
- Static audit also confirmed no missing local images, no missing internal links, and no same-page repeated image `src`.
- Playwright checked homepage desktop: 12 process cards render from `Cotización` to `Postventa`, no broken images, and no horizontal overflow.
- Playwright checked `/hoteles/` at 390px mobile width: 12 process cards render, no broken images, and no horizontal overflow.
- Screenshots saved to `output/playwright/v015-home-process-12-desktop.png` and `output/playwright/v015-hoteles-process-12-mobile.png`.

### Remaining Notes

- The 12-step flow is now aligned with the planning workbook, but future polish can add icons or phase grouping if the page becomes visually too dense.
- Installation remains described as optional support because the planning workbook marks local installation as additional-cost / project-dependent.

## 2026-06-29 / v0.16 Case Fact Field Pass

### Done

- Reviewed hotel case sources and rendered PDF previews for Grand Kempinski, Hilton DoubleTree, Raffles, Hilton Tashkent Uzbekistan, and Kempinski Hotel & Resort Sariya Yanbu.
- Confirmed many case PDFs are image-based and do not reliably expose text fields, so no unsupported year, room-count, amount, or exact address was invented.
- Added conservative fact fields to visible project cards: project type, confirmed space/supply scope, and evidence source.
- Updated case detail summaries and evidence tags so hotel case pages better match the planning workbook requirement for B2B project evidence.
- Added Hilton Tashkent Uzbekistan and Kempinski Hotel & Resort Sariya Yanbu to the case evidence library as candidate cases for later use once high-quality cover images are selected.

### Modified Files

- `src/data/site.ts`
- `src/components/ProjectCard.astro`
- `src/pages/proyectos/[sector]/[project].astro`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/03-页面/04-酒店项目页.md`
- `docs/project-brain/04-素材/02-案例证据库.md`
- `docs/project-brain/05-开发/00-开发总览.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/06-验收/04-老板演示准备.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings, and 0 hints.
- Static audit: 34 HTML files checked; project fact blocks render on homepage, hotel page, project hub, hotel project listing, and education project listing.
- Static audit also confirmed no missing local images, no missing internal links, and no same-page repeated image `src`.
- Playwright checked `/proyectos/hoteleria/` desktop: three hotel cards render fact fields, no broken images, and no horizontal overflow.
- Playwright checked Hilton detail at 390px mobile width: six summary cards and five evidence tags render, no broken images, and no horizontal overflow.
- Screenshots saved to `output/playwright/v016-proyectos-hoteleria-facts-desktop.png` and `output/playwright/v016-hilton-detail-facts-mobile.png`.

### Remaining Notes

- Hilton Tashkent and Kempinski Sariya Yanbu are not yet shown as front-end cards because the available rendered PDF previews are too narrow for polished card covers.
- Case years, room counts, exact cities for some cases, and material/finish specifics remain pending unless they appear in a reliable source.

## 2026-06-29 / v0.17 Inquiry Form Conversion Field Pass

### Done

- Audited the contact form against the goal requirement for project type, space, quantity, budget, and timeline.
- Added explicit `Espacios a equipar` and `Estado del proyecto` fields to the shared `ContactForm` component.
- Updated contact page copy so buyers understand they can include spaces, project stage, plans, FF&E lists, materials, timeline, and budget range.
- Kept the form as a local preview demo with success feedback only; no false claim of backend submission or file upload was added.
- Because the catalog modal reuses `ContactForm`, all catalog download lead forms now collect the same richer B2B project fields.

### Modified Files

- `src/components/ContactForm.astro`
- `src/pages/contacto.astro`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/03-页面/05-联系页.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/page-map.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings, and 0 hints.
- Static audit: 34 HTML files checked; enhanced contact fields are present wherever the shared contact/catalog modal form is rendered.
- Static audit also confirmed no missing local images, no missing internal links, and no same-page repeated image `src`.
- Playwright checked `/contacto/` at 390px mobile width: filled all fields including `Espacios a equipar` and `Estado del proyecto`, success feedback displayed, no broken images, and no horizontal overflow.
- Playwright checked `/catalogo/hoteleria/` desktop catalog modal: enhanced fields exist, modal success feedback displayed, no broken images, and no horizontal overflow.
- Screenshots saved to `output/playwright/v017-contact-form-enhanced-mobile.png` and `output/playwright/v017-catalog-modal-enhanced-form-desktop.png`.

### Remaining Notes

- Real backend submission, file upload, CRM routing, and real WhatsApp number remain launch-phase tasks.

## 2026-06-29 / v0.18 SEO Metadata Foundation Pass

### Done

- Added shared SEO metadata support in `BaseLayout`: canonical URL, robots, theme color, Open Graph, Twitter Card and Organization JSON-LD.
- Used the configured site URL `https://hymueble.com` for canonical and social preview URLs.
- Added page-specific social preview images for the homepage, hotel route, hotel catalog, hotel projects, factory, showroom, contact, resource pages, dynamic sector pages, catalog pages and project detail pages.
- Kept the work invisible to the page layout: no visible module or copy was changed in this pass.

### Modified Files

- `src/layouts/BaseLayout.astro`
- `src/pages/index.astro`
- `src/pages/hoteles.astro`
- `src/pages/catalogo/index.astro`
- `src/pages/catalogo/hoteleria.astro`
- `src/pages/catalogo/[sector].astro`
- `src/pages/catalogo/hoteleria/[category].astro`
- `src/pages/proyectos/index.astro`
- `src/pages/proyectos/hoteleria.astro`
- `src/pages/proyectos/[sector].astro`
- `src/pages/proyectos/[sector]/[project].astro`
- `src/pages/fabrica.astro`
- `src/pages/showroom.astro`
- `src/pages/contacto.astro`
- `src/pages/recursos/index.astro`
- `src/pages/recursos/blog.astro`
- `src/pages/recursos/videos.astro`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/03-页面/00-页面总表.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/page-map.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static audit: 34 HTML files checked; canonical, robots, Open Graph, Twitter Card and JSON-LD are present on every generated page.
- Static audit also confirmed all OG images exist in `dist`, with no missing local images, no missing internal links and no same-page repeated image `src`.
- Playwright checked homepage and `/contacto/`: canonical, OG title, OG image, Twitter card and JSON-LD are present; no broken images and no horizontal overflow.
- Screenshots saved to `output/playwright/v018-home-seo-desktop.png` and `output/playwright/v018-contact-seo-desktop.png`.

### Remaining Notes

- The configured production URL is currently `https://hymueble.com`; confirm the final domain before deployment if the brand domain changes.
- SEO text is foundation-level only. Later passes should add richer page-specific descriptions, sitemap/robots deployment checks, and structured data for project/case pages if needed.

## 2026-06-29 / v0.19 Sitemap And Robots Pass

### Done

- Added a dynamic `robots.txt` endpoint that allows crawling and points to the Hymueble sitemap.
- Added a dynamic `sitemap.xml` endpoint generated from existing route data: static routes, sector routes, catalog routes, hotel category routes and project detail routes.
- Avoided hand-maintaining a static sitemap so future route additions can be picked up from `site.ts`.
- Updated launch-preparation docs to mark SEO metadata, sitemap and robots as foundation items already implemented.

### Modified Files

- `src/pages/robots.txt.ts`
- `src/pages/sitemap.xml.ts`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/page-map.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Build generated `/robots.txt` and `/sitemap.xml`.
- Static audit: sitemap contains 34 unique URLs; every URL maps to an existing generated HTML page; every generated HTML page appears in sitemap.
- `robots.txt` includes `User-agent: *`, `Allow: /` and `Sitemap: https://hymueble.com/sitemap.xml`.
- Local dev server check: `http://127.0.0.1:4321/robots.txt` returns the expected robots file, and `http://127.0.0.1:4321/sitemap.xml` returns 34 `<loc>` entries.

### Remaining Notes

- Confirm final domain before deployment. If the domain changes, update `astro.config.mjs` so canonical, OG, robots and sitemap URLs stay aligned.

## 2026-06-29 / v0.20 Sector Showroom And Responsive QA Pass

### Done

- Ran a responsive QA sweep across `/`, `/hoteles/`, `/catalogo/hoteleria/`, `/proyectos/hoteleria/`, `/showroom/` and `/contacto/` on desktop and mobile.
- Confirmed the sampled pages had no horizontal overflow and no broken images.
- Added a sector-specific Virtual Showroom module to the shared industry page route for offices, healthcare and education.
- Kept residential unchanged because no residential Matterport link is available.
- Updated office, healthcare and education page docs from old "pending planning" wording to current light-preview status.

### Modified Files

- `src/pages/[section].astro`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/03-页面/07-办公页.md`
- `docs/project-brain/03-页面/08-医疗页.md`
- `docs/project-brain/03-页面/09-教育页.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/page-map.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Route audit confirmed `/oficinas/`, `/salud/` and `/educacion/` include a showroom module, while `/residencial/` does not.
- Static audit: 34 HTML files checked; no missing metadata, no missing local images, no missing internal links and no same-page repeated image `src`.
- Playwright checked `/oficinas/` at 390px mobile width: office Matterport link is present, no broken images and no horizontal overflow.
- Screenshot saved to `output/playwright/v020-oficinas-showroom-mobile.png`.

### Remaining Notes

- Office, healthcare and education are still lighter than the hotel route. They now have credible showroom entry points, but still need deeper case fields, catalogs and proof modules.

## 2026-06-29 / v0.22 Full WebP Image Optimization Pass

### Done

- Converted all remaining JPG/JPEG/PNG files under `public/assets/hymueble` to WebP.
- Updated source and project-brain asset references from old raster extensions to `.webp`.
- Deleted old JPG/JPEG/PNG files from the Hymueble asset tree so static builds do not copy them into `dist`.
- Kept SVG assets such as the favicon unchanged.

### Modified Areas

- `public/assets/hymueble/**`
- `src/**/*.astro`
- `src/**/*.ts`
- `src/styles/global.css`
- `docs/project-brain/**`

### Verification

- Converted 49 files; old raster total was about 13.7MB and new WebP total is about 5.4MB.
- `public/assets/hymueble` is now about 11MB.
- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static audit: 34 HTML pages checked; no missing images, no missing internal links, no repeated same-page image `src`, no non-WebP Hymueble `<img>` sources, no non-WebP Hymueble Open Graph images.
- `dist/assets/hymueble` contains 0 JPG/PNG files; generated `dist` is about 14MB.
- Playwright checked `/` and `/showroom/`: no non-WebP Hymueble images, no broken images and no horizontal overflow.
- Screenshots saved to `output/playwright/v022-home-webp-desktop.png` and `output/playwright/v022-showroom-webp-desktop.png`.

### Remaining Notes

- This pass optimizes current local static assets only. Later speed work can add responsive image sizes, lazy-loading priorities, preload for hero images and CDN/cache headers during deployment.

## 2026-06-29 / v0.23 Image Loading Strategy Pass

### Done

- Added explicit image loading strategy across shared components and direct page images.
- Marked hero / first-viewport images as `loading="eager"`, `decoding="async"` and `fetchpriority="high"`.
- Marked below-fold card, process, factory, showroom, qualification and split-band images as `loading="lazy"` with async decoding.
- Kept the previous WebP optimization intact.

### Modified Files

- `src/components/Hero.astro`
- `src/components/CatalogCard.astro`
- `src/components/ProjectCard.astro`
- `src/components/CategoryGrid.astro`
- `src/components/FactoryStrip.astro`
- `src/pages/index.astro`
- `src/pages/[section].astro`
- `src/pages/hoteles.astro`
- `src/pages/catalogo/index.astro`
- `src/pages/catalogo/hoteleria.astro`
- `src/pages/catalogo/hoteleria/[category].astro`
- `src/pages/proyectos/index.astro`
- `src/pages/proyectos/[sector]/[project].astro`
- `src/pages/fabrica.astro`
- `src/pages/contacto.astro`
- `src/pages/showroom.astro`
- `src/pages/recursos/index.astro`
- `src/pages/recursos/blog.astro`
- `src/pages/recursos/videos.astro`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static audit: 34 HTML pages checked; every `<img>` has `loading` and `decoding="async"`.
- Static audit also confirmed no missing local images, no non-WebP Hymueble images and no missing internal links.
- Static audit counted 34 eager images and 130 lazy images across generated HTML.
- Playwright checked `/` and `/catalogo/hoteleria/`: no missing loading/decoding attributes, one high-priority first-viewport image per page, no non-WebP images and no horizontal overflow.
- Additional homepage scroll check found no broken loaded images.

### Remaining Notes

- Lazy images may remain unloaded until the user scrolls; that is expected browser behavior. Later performance work can add responsive `srcset` and explicit image dimensions.

## 2026-06-29 / v0.24 Hero Image Preload Pass

### Done

- Added a single page-level image preload in `BaseLayout` for the current page's main visual image.
- Kept canonical and Open Graph image URLs absolute with `https://hymueble.com`.
- Kept preload URLs relative for local preview so `http://127.0.0.1:4321/` preloads local assets instead of production-domain images.
- Aligned hotel catalog category pages so the preloaded image matches the visible hero image.

### Modified Files

- `src/layouts/BaseLayout.astro`
- `src/pages/catalogo/hoteleria/[category].astro`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/05-开发/06-上线准备清单.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static audit: 34 HTML pages checked; each page has exactly one image preload, every preload is a relative WebP path, every preloaded file exists, and Open Graph images remain absolute production URLs.
- Browser check on `/`: preload resolves to `http://127.0.0.1:4321/assets/hymueble/generated/home-virtual-showroom-atrium.webp`, Open Graph remains `https://hymueble.com/assets/hymueble/generated/home-virtual-showroom-atrium.webp`, no missing image loading attributes, no non-WebP images and no horizontal overflow.

### Remaining Notes

- Next performance layer can add responsive image variants and explicit width/height metadata for high-traffic pages.

## 2026-06-29 / v0.25 Homepage Project Solutions Polish

### Done

- Added structured `projectSolutions` data for four B2B project routes: hotels/resorts, offices, residential real estate, and commercial/institutional spaces.
- Added a new dark homepage `Project Solutions` section between product categories and project references.
- Each solution card now explains the buyer's procurement challenge, how Hymueble reduces risk, proof points, and conversion CTAs.
- Styled the section as a high-contrast project advisory band instead of another ordinary product grid.

### Modified Files

- `src/data/site.ts`
- `src/pages/index.astro`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/03-页面/01-首页.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/page-map.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static audit: 34 HTML files checked; no missing images, no non-WebP Hymueble images, no missing loading/decoding attributes, no missing internal links and no same-page repeated image `src`.
- Static audit confirmed homepage renders 4 solution cards.
- Playwright checked the new homepage section on desktop and 390px mobile: 4 cards render, no broken loaded images, no non-WebP images and no horizontal overflow.
- Screenshots saved to `output/playwright/v025-home-solutions-desktop.png` and `output/playwright/v025-home-solutions-mobile.png`.

### Remaining Notes

- The solution routes are strong enough for the current demo, but later passes can add dedicated commercial-space pages if that becomes a navigation priority.

## 2026-06-29 / v0.26 Home and Project Boundary Correction

### Done

- Accepted first-round review feedback that the heavy homepage `Project Solutions` block overlapped too much with `Catálogo` and `/proyectos/`.
- Removed the heavy solution-card section from the homepage.
- Added a lighter homepage route bridge that separates buyer intent into `Catálogo`, `Proyectos` and `Contacto`.
- Kept the full project-solution logic on `/proyectos/`, where it belongs as the project procurement hub.
- Changed the lower `/proyectos/` sector section copy from a concept explanation to quick sector entries.
- Updated `docs/project-brain` so the boundary is recoverable in future iterations.

### Modified Files

- `src/pages/index.astro`
- `src/pages/proyectos/index.astro`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/03-页面/01-首页.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/page-map.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static audit: 34 HTML files checked; no missing images, no non-WebP Hymueble images, no missing loading/decoding attributes, no missing internal links and no same-page repeated image `src`.
- Static audit confirmed homepage renders 3 route bridge cards and 0 solution cards.
- Static audit confirmed `/proyectos/` renders 4 solution cards and the quick-entry sector section.
- Playwright mobile check on `/`: 3 route bridge cards, 0 solution cards, no horizontal overflow.
- Playwright mobile check on `/proyectos/`: 4 solution cards, 0 route bridge cards, no horizontal overflow.
- Screenshots saved to `output/playwright/v026-route-boundary/v026-home-route-bridge-mobile.png` and `output/playwright/v026-route-boundary/v026-proyectos-solutions-mobile.png`.

### Remaining Notes

- This correction makes the homepage a routing and persuasion page, while `/proyectos/` carries the deeper project-solution explanation.

## 2026-06-29 / v0.27 Homepage Quality Control Chain

### Done

- Strengthened the homepage quality-control section to match the strategy requirement for material confirmation, sample confirmation, production follow-up, packing inspection and pre-shipment inspection.
- Kept the existing four real process images and added six text checkpoints instead of adding repeated images.
- Added structured `qualityCheckpoints` data to keep the section editable from `src/data/site.ts`.

### Modified Files

- `src/data/site.ts`
- `src/pages/index.astro`
- `src/styles/global.css`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static audit confirmed homepage renders 6 quality checkpoints and includes final inspection / packaging-review copy.
- Static audit found no missing images, no non-WebP Hymueble images, no missing loading/decoding attributes, no missing internal links and no same-page repeated image `src`.

### Remaining Notes

- Real QC/photo evidence can still be expanded later with more certificate-level metadata and inspection photos.

## 2026-06-29 / v0.28 Company Logo Integration

### Done

- Added the Hongye Shengda company logo requested by the user.
- Created a cropped WebP logo asset from the user-provided logo image and cross-checked it against the official hotel site logo reference.
- Added `brand.logo` to the site data model.
- Added the company logo to the global Header beside the `Hymueble` brand name.
- Updated Organization JSON-LD to use the company logo instead of the generic favicon.
- Added responsive header rules: 390px mobile keeps logo + Hymueble; 360px narrow mobile keeps logo only to avoid header crowding.

### Modified Files

- `public/assets/hymueble/brand/hongye-shengda-logo.webp`
- `src/data/site.ts`
- `src/components/Header.astro`
- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/05-开发/02-页面开发状态.md`
- `docs/project-brain/page-map.md`
- `docs/project-brain/asset-plan.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static audit confirmed the logo file exists in `dist`, every generated page references the WebP logo, Organization JSON-LD points to the production-domain logo URL, and the homepage has exactly one rendered logo image.
- Static audit found no missing images, no non-WebP Hymueble images, no missing loading/decoding attributes, no missing internal links and no same-page repeated image `src`.
- Playwright desktop check on `/`: logo loads at natural size 360 x 210, Header has no horizontal overflow.
- Playwright mobile checks: 390px shows logo + Hymueble with no overflow; 360px shows logo-only compact brand with menu visible and no overflow.
- Screenshots saved to `output/playwright/v028-company-logo/v028-logo-desktop.png`, `output/playwright/v028-company-logo/v028-logo-mobile-390.png`, and `output/playwright/v028-company-logo/v028-logo-mobile-360.png`.

### Remaining Notes

- Before final launch, replace the cropped WebP with the original design-source transparent logo if the brand team provides it.

## 2026-06-29 / v0.29 Boss Demo Readiness Docs

### Done

- Updated the boss-demo preparation document from the older v0.16 wording to the current v0.28 local preview state.
- Added a 5-8 minute demo route covering Home, Showroom, Hotels, Hotel Catalog, Hotel Projects, Factory and Contact.
- Added recommended Chinese talking points for explaining the site as a Spanish B2B project-procurement lead-generation site.
- Updated the acceptance table with a second-round v0.28 conditional pass.
- Updated the next-task control document so it reflects completed demo-version work and separates remaining real-data, contact, deployment and launch tasks.

### Modified Files

- `docs/project-brain/06-验收/04-老板演示准备.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/implementation-log.md`

### Verification

- Documentation pass only; no site code changed.
- The updated docs now identify the current site as v0.28 for boss-demo purposes.
- Remaining launch gaps are explicitly separated from local-demo readiness: real WhatsApp, form backend, deployment, tracking, source logo file, certificate/case/PDF evidence mapping.

### Remaining Notes

- Next practical pass should be an actual browser click-through on the v0.28 demo route, then either fix any visual issues found or proceed to real-data enrichment.

## 2026-06-29 / v0.30 Boss Demo Browser Click-through

### Done

- Ran the v0.28 boss-demo route in a real browser session.
- Checked core local preview routes: Home, Showroom, Hotels, Hotel Catalog, Hotel Projects, Factory and Contact.
- Verified the hotel catalog lead modal opens, accepts demo project data and displays the Spanish success message.
- Verified the contact inquiry form accepts demo project data and displays the Spanish success message.
- Verified 390px mobile homepage Header, logo, CTA and expanded mobile navigation.
- Updated the acceptance table with the browser-click results.

### Modified Files

- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- Local server returned HTTP 200 before browser testing.
- Final `pnpm run build` after the documentation and browser-QA pass completed successfully: 34 pages, 0 errors, 0 warnings and 0 hints.
- Desktop browser route sweep found 0 horizontal overflow and 0 broken images on `/`, `/showroom/`, `/hoteles/`, `/catalogo/hoteleria/`, `/proyectos/hoteleria/`, `/fabrica/` and `/contacto/`.
- All seven checked routes retained WhatsApp and form/contact paths.
- The hotel catalog modal and contact page form both showed: `¡Muchas gracias! Recibimos tu consulta y te contactaremos en menos de 24 horas por WhatsApp o correo.`
- Mobile 390px menu expansion showed the main navigation and sector sublinks.

### Remaining Notes

- This was a browser interaction pass, not a production backend test. Form submissions remain front-end only.
- The WhatsApp number is still the placeholder number and must be replaced before any external demo or launch.

## 2026-06-29 / v0.31 Showroom Conversion Path Reinforcement

### Done

- Added a hotel showroom decision bridge to `/proyectos/hoteleria/` so hotel case browsing can continue directly into the Matterport hotel showroom before inquiry.
- Added a showroom-to-factory bridge to `/fabrica/` so buyers can align space references before discussing production, samples and timelines.
- Added showroom CTAs to `/contacto/`, including a lightweight bridge for buyers who do not yet have a complete FF&E list.
- Kept the change scoped to existing `split-band` and button styles instead of adding a new component or visual system.

### Modified Files

- `src/pages/proyectos/hoteleria.astro`
- `src/pages/fabrica.astro`
- `src/pages/contacto.astro`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/page-map.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static HTML audit after build confirmed `/proyectos/hoteleria/`, `/fabrica/` and `/contacto/` now each contain one direct Matterport hotel showroom link plus internal `/showroom/` links.
- Static HTML audit found no non-WebP Hymueble images and no repeated image `src` on those three pages.
- Browser desktop checks on those three pages found 0 horizontal overflow, 0 broken images, and expected Matterport / `/showroom/` links.

### Remaining Notes

- Playwright CLI viewport resizing did not apply reliably in this run, so this pass does not claim a fresh mobile screenshot verification for the new sections.
- The new sections reuse existing responsive `.split-band` styles that have been validated in earlier mobile checks.

## 2026-06-29 / v0.32 Header WhatsApp Floating CTA

### Done

- Removed the `WhatsApp` text button from the desktop Header action cluster to reduce crowding.
- Changed the Header quote CTA from `Solicitar cotización` to `Cotizar` so it visually balances better with the `Showroom` button.
- Added a fixed green WhatsApp floating icon through `BaseLayout`, so every generated page has a persistent WhatsApp entry without consuming Header space.
- Used inline SVG and CSS only; no external icon asset or new dependency was added.

### Modified Files

- `src/components/Header.astro`
- `src/layouts/BaseLayout.astro`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static HTML audit confirmed all 34 generated pages include `class="whatsapp-float"`.
- Static HTML audit confirmed no generated page has `>WhatsApp<` inside the Header markup.
- Static HTML audit confirmed every Header includes `Cotizar`.
- Playwright screenshots captured the updated Header and floating WhatsApp icon:
  - `output/playwright/v033-header-whatsapp/header-desktop.png` at 1920 x 360.
  - `output/playwright/v033-header-whatsapp/header-mobile.png` at 390 x 844.

### Remaining Notes

- The WhatsApp URL still uses the placeholder number until the real business number is provided.

## 2026-06-29 / v0.33 Project-Brain Acceptance Sync

### Done

- Synchronized the acceptance table, boss-demo preparation notes, content-system CTA library, and next-task control document with the v0.32 Header / WhatsApp state.
- Added the third-round acceptance record for the Header visual fix, floating WhatsApp icon, Showroom conversion path and screenshot evidence.
- Removed the stale note that `/proyectos/hoteleria/`, `/fabrica/` and `/contacto/` lacked direct Matterport links, because v0.31 added those paths.
- Clarified that `Cotizar` is the short Header-only CTA, while longer quotation and WhatsApp wording belongs inside page sections, footer, or contextual copy.

### Modified Files

- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/06-验收/04-老板演示准备.md`
- `docs/project-brain/content-system.md`
- `docs/project-brain/00-总控/03-下一步任务.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static HTML audit confirmed all 34 pages still have the floating WhatsApp entry, no Header contains `>WhatsApp<`, and every Header contains `Cotizar`.
- Current acceptance and demo-prep docs now point to v0.32 rather than the older v0.28 demo route.

### Remaining Notes

- The second-round v0.28 row remains in the acceptance table as historical evidence.

## 2026-06-29 / v0.34 Header CTA Recheck and Static Audit

### Done

- Rechecked the Header crowding fix after the user feedback: the Header keeps `Showroom` and `Cotizar`, while WhatsApp is handled by the fixed green floating icon.
- Ran a full static audit against the generated `dist` output rather than checking only the visible screenshot route.
- Updated the current-status and acceptance docs so the v0.34 audit evidence survives context compression.

### Modified Files

- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static HTML audit covered 34 generated pages, 1570 internal links, 205 local images, 17 Matterport links and 2 YouTube links with no errors.
- Static audit confirmed each generated page has exactly one `class="whatsapp-float"` entry.
- Static audit confirmed every Header contains `Showroom` and `Cotizar`, with no Header `WhatsApp` text button.
- Static audit confirmed all local page images exist, are WebP, are not repeated within the same page, and include `alt`, `loading` and `decoding` attributes.

### Remaining Notes

- The WhatsApp URL still uses the placeholder number until the real business number is provided.
- The forms still use front-end demo success feedback and are not connected to a real backend.

## 2026-06-29 / v0.35-v0.36 Process Grid Polish

### Done

- Changed the shared 12-step process grid from 4 columns x 3 rows to 6 columns x 2 rows on desktop.
- Shortened each Spanish process description while keeping the same 12 B2B delivery stages.
- Changed the mobile process layout from 12 stacked rows to a 2-row horizontal swipe strip, reducing section height on phones.
- Kept the implementation in the existing `ProcessSteps` data and `.process` CSS rather than adding a new component.

### Modified Files

- `src/data/site.ts`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/03-页面/01-首页.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Browser check at 1440px confirmed 12 process cards render as 6 columns x 2 rows with no page horizontal overflow.
- Browser check at 390px confirmed 12 process cards render as 2 horizontal rows inside a swipeable process container; the page itself has no horizontal overflow and has 0 broken images.

### Remaining Notes

- Mobile users need to swipe horizontally to see all 12 process steps; this is intentional to avoid an overly long mobile section.

## 2026-06-29 / v0.37 Mobile Navigation Fit

### Done

- Compressed mobile navigation row height, submenu spacing and submenu text size so the full navigation is visible on common phone screens.
- Added a bounded, independently scrollable mobile menu area with `overflow-y: auto`, `max-height` and touch scrolling.
- Reduced the mobile Header action sizing so `Cotizar` and the menu button fit inside narrow screens without horizontal overflow.
- Kept the existing Header structure and navigation data unchanged.

### Modified Files

- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Browser check at 390px confirmed `Cotizar` and the menu button both fit within the viewport with page horizontal overflow equal to 0.
- Browser check at 390px confirmed the expanded menu contains 21 links and the final `Contacto` link is visible without initial scrolling.
- The mobile menu retains internal scrolling for shorter device heights.

### Remaining Notes

- Very short mobile browser viewports may still require scrolling inside the menu, but the scroll is contained in the menu rather than the page.

## 2026-06-29 / v0.38 Footer Conversion Redesign

### Done

- Replaced the simple footer with a richer two-part conversion footer inspired by the user's reference template.
- Added a dark WebP-backed footer CTA for project quotation and showroom exploration.
- Added a footer brand card with logo, project WhatsApp entry, email entry and response promise.
- Added grouped footer navigation for sectors, B2B buying paths, project capabilities and the five company site links.
- Removed the visible local-preview disclaimer from the copyright line so the demo reads more like a polished standalone site.

### Modified Files

- `src/components/Footer.astro`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Browser check at 1440px confirmed the footer renders the CTA, 5-column information area, 25 footer links and 5 company site links with no page horizontal overflow.
- Browser check at 390px confirmed the footer collapses to one column with no page horizontal overflow.
- Footer-specific image check confirmed the logo loads normally and the footer background references a local WebP asset.

### Remaining Notes

- The WhatsApp URL still uses the placeholder number until the real business number is provided.
- Contact email and footer routing should be revisited before production deployment if the business wants a domain-specific inbox or CRM endpoint.

## 2026-06-29 / v0.39 Remove Group-Site Traffic Leakage

### Done

- Removed the `Sitios del grupo` footer column because it could redirect Hymueble traffic to parallel company sites and create internal lead competition.
- Rebalanced the footer desktop grid to a brand card plus three information columns: `Sectores`, `Compra B2B` and `Capacidades`.
- Removed the `/showroom/` page's `Sitios especializados del grupo` section for the same traffic-retention reason.
- Deleted the now-unused footer `companySites` import and removed the obsolete `.footer-sites` arrow styling.

### Modified Files

- `src/components/Footer.astro`
- `src/pages/showroom.astro`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static audit confirmed all 34 generated HTML pages contain no `Sitios del grupo`, no `Sitios especializados del grupo`, and none of the five company-site URLs.
- Browser check at 1440px confirmed the footer renders as one brand card plus three information columns, with no group-site heading or company-site links.
- Browser check at 390px confirmed the footer collapses to one column with no horizontal overflow and no broken footer images.

### Remaining Notes

- Company-site URLs can still remain in `src/data/site.ts` as source inventory for internal reference, but they are no longer surfaced as customer-facing traffic exits.

## 2026-06-29 / v0.40 Demo Residue Cleanup

### Done

- Removed visible "to be completed before launch" wording from the contact page manufacturing-base section.
- Replaced hotel case-detail delivery fields that said year and room count were pending confirmation with a professional evidence-based phrase that does not invent unverified data.
- Kept the factual constraint intact: the site still does not claim exact years, room counts or legal address data where those details have not been mapped from approved source materials.

### Modified Files

- `src/pages/contacto.astro`
- `src/pages/proyectos/[sector]/[project].astro`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Text audit confirmed source and generated pages contain no `pendiente de confirmar`, `antes de publicar`, `datos legales`, `dirección final`, `Vista previa`, `validación comercial` or `Información final`.
- Browser check at 390px on `/contacto/` confirmed no demo-residue text and no horizontal overflow.
- Browser check at 1440px on `/proyectos/hoteleria/grand-kempinski-hotel/` confirmed no pending-confirmation text and no horizontal overflow.

### Remaining Notes

- Exact case years, room counts and formal address/legal fields still require approved source mapping before final publication.
- Footer visual design review was superseded by the v0.41 premium footer implementation.

## 2026-06-29 / v0.41 Premium Footer and Social Links

### Done

- Replaced the previous footer with a stronger premium closing panel: large project quotation CTA, concise project brief chips, commercial response panel and integrated navigation.
- Added social media icon buttons for Facebook, Instagram, LinkedIn, YouTube, Pinterest and X.
- Kept the user's traffic-retention rule: no `Sitios del grupo` column and no links to the parallel company standalone sites in generated customer-facing pages.
- Used public company-source social URLs from `https://hysdfurniture.com/`; TikTok was omitted because no real company TikTok URL was found.

### Modified Files

- `src/components/Footer.astro`
- `src/data/site.ts`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static audit confirmed all 34 generated HTML pages contain the new footer CTA and all 6 social links.
- Static audit confirmed all 34 generated HTML pages contain no `Sitios del grupo`, no `Sitios especializados del grupo`, and none of the five company-site URLs.
- Browser check at 1440px confirmed the new footer has 6 SVG social icons, no broken footer images and no horizontal overflow.
- Browser check at 390px confirmed the mobile footer has 6 SVG social icons, no broken footer images and no horizontal overflow.
- Screenshot evidence:
  - `output/playwright/v041-footer-premium-social/footer-desktop.png`
  - `output/playwright/v041-footer-premium-social/footer-mobile.png`

### Remaining Notes

- Social account URLs should be confirmed by the user before production launch.
- WhatsApp still uses the placeholder number until the real business number is provided.
- Forms still use front-end demo feedback and are not connected to a real backend.

## 2026-06-29 / v0.42 Embedded YouTube Video

### Done

- Replaced the homepage corporate video cover link with an embedded YouTube player inside the existing right-side 16:9 video frame.
- Added fullscreen-capable iframe permissions through `allowfullscreen` and `allow` including `fullscreen`.
- Updated `/recursos/videos/` to use the same embedded corporate video instead of an external YouTube jump.
- Removed obsolete homepage video overlay/play-button CSS that was only needed for the old cover-link treatment.

### Modified Files

- `src/pages/index.astro`
- `src/pages/recursos/videos.astro`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/03-页面/01-首页.md`
- `docs/project-brain/03-页面/11-资源页.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static audit confirmed `/` and `/recursos/videos/` each contain one `youtube.com/embed/a1ECkth6WnQ` iframe.
- Static audit confirmed `/` and `/recursos/videos/` contain no old `youtu.be/a1ECkth6WnQ` playback link.
- Browser check at 1440px on `/` confirmed the iframe stays inside the right-side 16:9 frame, has fullscreen permission and has no horizontal overflow.
- Browser check at 390px on `/` confirmed the iframe stacks under the text, remains 16:9 and has no horizontal overflow.
- Browser check at 1440px on `/recursos/videos/` confirmed the embedded player renders in the page hero with fullscreen permission and no horizontal overflow.
- Screenshot evidence:
  - `output/playwright/v042-youtube-embed/home-desktop.png`
  - `output/playwright/v042-youtube-embed/home-mobile.png`
  - `output/playwright/v042-youtube-embed/videos-desktop.png`

### Remaining Notes

- YouTube embed playback still depends on YouTube network availability in the viewer's environment.
- The embedded YouTube player can display YouTube's native controls and branding, which is expected for an official YouTube iframe.

## 2026-06-29 / v0.43 Hero Value Points Redesign

### Done

- Replaced the old bordered Hero value cards with a non-clickable icon-based value-points layout inspired by the user's reference.
- Moved the value points between the Hero lead paragraph and the two CTA buttons so the CTA hierarchy is clearer.
- Added `ValuePoints.astro` as the reusable component for Hero value messaging.
- Applied the change through the shared `Hero.astro`, covering sector pages plus corresponding catalog and project pages.
- Removed obsolete `.hero-points` styles from generated output.

### Modified Files

- `src/components/ValuePoints.astro`
- `src/components/Hero.astro`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/03-页面/00-页面总表.md`
- `docs/project-brain/03-页面/02-酒店页.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Browser checks covered `/hoteles/`, `/oficinas/`, `/catalogo/hoteleria/`, `/catalogo/oficinas/`, `/proyectos/hoteleria/` and `/proyectos/oficinas/`.
- Browser checks confirmed value points sit below the lead and above CTAs, contain 4 SVG icons, have no interactive links/buttons and produce no horizontal overflow.
- Static audit confirmed 15 sector/catalog/project pages contain 4 `value-point` items and all 34 generated HTML pages contain no `hero-points`.
- Screenshot evidence:
  - `output/playwright/v043-value-points/hoteles-desktop.png`
  - `output/playwright/v043-value-points/hoteles-mobile.png`
  - `output/playwright/v043-value-points/catalogo-hoteleria-desktop.png`
  - `output/playwright/v043-value-points/proyectos-hoteleria-desktop.png`

### Remaining Notes

- The value labels are intentionally generic B2B factory strengths; later content passes can make them sector-specific if the project needs more nuanced copy per industry.

## 2026-06-29 / v0.45 Homepage Showroom De-dup Redesign

### Done

- Removed the duplicated left-side hotel featured showroom card from the homepage Virtual Showroom section.
- Promoted the four sector showroom cards into the primary content of the section.
- Changed the desktop/tablet layout to 2x2 large image cards for stronger visual impact.
- Kept the mobile layout as a horizontal card strip so the section does not become a long vertical stack.
- Removed unused CSS for the old featured showroom visual and floating overlay.

### Modified Files

- `src/pages/index.astro`
- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/03-页面/01-首页.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static search confirmed the old `.showroom-feature`, `.showroom-visual` and `.showroom-floating` hooks are no longer present.
- Browser checks on `/` covered 1440px desktop, 900px tablet and 390px mobile.
- Browser checks confirmed the Showroom section has 0 left featured cards, 4 image cards, 4 Matterport links, 0 broken images and 0 page-level horizontal overflow.
- Screenshot evidence:
  - `output/playwright/v045-showroom-single-column/showroom-desktop.png`
  - `output/playwright/v045-showroom-single-column/showroom-tablet.png`
  - `output/playwright/v045-showroom-single-column/showroom-mobile.png`

### Remaining Notes

- Matterport tours depend on the external Matterport service and viewer network conditions.
- The standalone `/showroom/` page was not redesigned in this pass; this change only addresses the homepage Showroom module requested by the user.

## 2026-06-29 / v0.46 Footer Contact Compact Layout

### Done

- Tightened the Footer `Contacto` column based on the user's screenshot feedback.
- Fixed the CSS cascade where `.footer-contact-block a` was first defined as flex but later overridden by the generic footer column link rule.
- Reduced contact icon size from 34px to 30px.
- Reduced contact link text to 15px with a tighter line-height and max width so long labels wrap more neatly.

### Modified Files

- `src/styles/global.css`
- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Static search confirmed `.footer-contact-block a` is no longer grouped with `.footer-col a` in the generic block-style rule.
- Browser checks on `/` covered 1440px desktop and 390px mobile footer states.
- Browser checks confirmed 3 footer contact links render as flex rows, contact link font size is 15px, icons are 30px, footer/page horizontal overflow is 0, and footer broken images are 0.
- Screenshot evidence:
  - `output/playwright/v046-footer-contact-compact/footer-desktop.png`
  - `output/playwright/v046-footer-contact-compact/footer-mobile.png`

### Remaining Notes

- Footer contact details still use the current placeholder WhatsApp and `proyectos@hymueble.com` until the business confirms final production contact details.

## 2026-06-29 / v0.47 Boss Demo Walkthrough QA

### Done

- Ran a full automated browser walkthrough for the boss-demo route.
- Covered Home, Showroom, Hotels, Hotel Catalog, Hotel Projects, Hilton case detail, Factory and Contact.
- Submitted the hotel catalog lead modal with demo B2B project data and confirmed the Spanish success feedback.
- Submitted the main Contact page inquiry form with demo B2B project data and confirmed the Spanish success feedback.
- Checked the 390px mobile menu after expansion and confirmed the final `Contacto` link remains visible.
- Scanned the checked routes for visible unfinished/demo-residue wording.

### Modified Files

- `docs/project-brain/00-总控/01-当前状态.md`
- `docs/project-brain/06-验收/00-验收总表.md`
- `docs/project-brain/06-验收/04-老板演示准备.md`
- `docs/project-brain/implementation-log.md`

### Verification

- `command -v npx`: passed.
- `pnpm run build`: passed; 34 pages generated with 0 errors, 0 warnings and 0 hints.
- Browser route checks confirmed `/`, `/showroom/`, `/hoteles/`, `/catalogo/hoteleria/`, `/proyectos/hoteleria/`, `/proyectos/hoteleria/hilton-doubletree-hotel/`, `/fabrica/` and `/contacto/` return 200.
- The 8 checked routes had 0 page-level horizontal overflow, 0 broken images, the WhatsApp floating entry, 6 footer social links, 3 flex footer contact links and no visible unfinished wording from the configured residue scan.
- Catalog modal and Contact form both reached the Spanish success message after demo submissions.
- Mobile menu at 390px opened with 21 links and the final `Contacto` link visible without initial scrolling.
- Screenshot and JSON evidence:
  - `output/playwright/v047-boss-demo-walkthrough/boss-demo-walkthrough-report.json`
  - `output/playwright/v047-boss-demo-walkthrough/route-home.png`
  - `output/playwright/v047-boss-demo-walkthrough/route-showroom.png`
  - `output/playwright/v047-boss-demo-walkthrough/catalog-modal-success.png`
  - `output/playwright/v047-boss-demo-walkthrough/contact-form-success.png`
  - `output/playwright/v047-boss-demo-walkthrough/mobile-menu-open.png`

### Remaining Notes

- The route is ready for local boss-demo review, but production launch still needs the real WhatsApp number, final form backend/CRM endpoint, confirmed social account URLs and richer case evidence fields.

## 2026-07-02 / v0.95 Project Evidence, Case Images and Detail Narratives

### Done

- Upgraded the project evidence model for the five sector families: hotels, offices, healthcare, education and residential.
- Replaced weak hotel cards with stronger documented cases: Grand Kempinski, Hilton DoubleTree, Pianzaihuang Hot Spring Hotel, Leezy Hotel Yongkang, Hilton Tashkent and Radisson Collection Lingang Shanghai.
- Replaced the weak office product-render card with `Macwell Electronic Technology Industrial Park`.
- Added new WebP case assets under `public/assets/hymueble/casos/` after visual review of source contact sheets and selected assets.
- Added or expanded SEO title, SEO description, keywords, source URL, evidence label, facts, overview, visible spaces and procurement value for the new case set.
- Updated the project detail template so every project detail page renders a narrative `Lectura del proyecto` section instead of relying only on summary cards.
- Synchronized the current case evidence SOP and evidence library docs.

### Modified Files

- `src/data/site.ts`
- `src/pages/proyectos/[sector]/[project].astro`
- `docs/project-brain/04-素材/02-案例证据库.md`
- `docs/project-brain/04-素材/07-项目案例证据分级与SEO流程.md`
- `docs/project-brain/05-开发/08-项目案例添加流程.md`
- `public/assets/hymueble/casos/*.webp`

### Verification

- `pnpm qa`: passed.
- `git diff --check`: passed.
- `pnpm qa:browser`: passed.
- Browser screenshots reviewed:
  - `output/playwright/oficinas-project-cards-wait.png`
  - `output/playwright/hoteles-project-cards-wait.png`
  - `output/playwright/macwell-narrative-spanish.png`
  - `output/playwright/pianzaihuang-narrative-wait.png`

### Remaining Notes

- Historical redirect pages such as `/proyectos/hoteleria/raffles-hotel/` still exist for backward compatibility, but current hotel project cards now use the six stronger documented hotel cases.
- Production deployment, real form receiving and real WhatsApp configuration were not changed in this pass.

## 2026-07-02 / v0.96 Sector Homepage Trust Module Alignment

### Done

- Confirmed the user feedback: office, healthcare, education and residential homepages were showing a large CTA band in the same content position where the hotel page shows the trust/cooperation module.
- Made `TrustStrip` configurable so the hotel page can keep hotel-specific copy while other sectors can use their own reference labels and partner tiles.
- Replaced the misplaced CTA band on `/oficinas/`, `/salud/`, `/educacion/` and `/residencial/` with sector-specific `Cooperación y respaldo` modules.
- Kept the bottom CTA in place; only the misplaced mid-page module was changed.

### Modified Files

- `src/components/TrustStrip.astro`
- `src/pages/[section].astro`

### Verification

- `pnpm qa`: passed with 0 errors, 0 warnings and 0 hints.
- `git diff --check`: passed.
- `pnpm qa:browser`: passed.
- Browser screenshots reviewed:
  - `output/playwright/oficinas-trust-strip.png`
  - `output/playwright/salud-trust-strip.png`
  - `output/playwright/educacion-trust-strip.png`
  - `output/playwright/residencial-trust-strip.png`

### Remaining Notes

- The trust evidence images remain the shared certificate/factory proof set. Future passes can add sector-specific proof images if higher-quality evidence is available.
