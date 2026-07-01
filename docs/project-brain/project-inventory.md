# Project Inventory

- Last updated: 2026-06-29
- Project: Hymueble Spanish B2B independent site
- Current version: v0.14 local preview with real Matterport showroom thumbnails, showroom composite hero, real process/proof imagery for quality flow, stable factory video cover, stronger image de-duplication, first factory qualification proof module, initial case-evidence enrichment, first cooperation/certification trust strip, and multi-angle project imagery

## Repository Structure

- `src/pages/`: Astro routes for home, sector pages, catalogs, projects, factory, resources, and contact.
- `src/components/`: Shared layout and conversion components, including header, footer, CTA, cards, forms, modal, factory strip, and process steps.
- `src/data/site.ts`: Main site data source for brand, navigation, metrics, categories, catalogs, projects, process, factory capabilities, and resources.
- `src/styles/global.css`: Global visual system, layout, responsive rules, cards, modal, form, and hero styles.
- `public/assets/hymueble/`: Approved WebP asset batch plus generated process visuals, Matterport showroom thumbnails, copied case materials, and additional factory production images.
- `docs/project-brain/`: Project memory, strategy, page planning, implementation status, and QA records.

## Technology Stack

- Astro static site.
- TypeScript.
- Plain CSS with responsive media queries.
- No backend, no CMS, no real form submission yet.
- Local preview via `pnpm run dev`.

## Existing Materials

- Planning file: `/Users/yoyo/Documents/工作台/50_运营系统/网站/hymueble独立站资料/鸿业家具西班牙语独立站策划案.xlsx`.
- Latest navigation and page tree images from the Hymueble资料 directory and desktop references.
- 77 approved WebP images already copied into `public/assets/hymueble/`.
- Existing group websites for hotel, office, healthcare, education, and residential context.
- Project-brain subfolders with page, strategy, material, development, and QA records.

## Current Site Coverage

- Home: `/`
- Main sectors: `/hoteles/`, `/oficinas/`, `/salud/`, `/educacion/`, `/residencial/`
- Catalog hubs: `/catalogo/`, `/catalogo/hoteleria/`, plus sector catalog pages
- Hotel category pages: six hotel subcategory pages
- Project hubs: `/proyectos/`, `/proyectos/hoteleria/`, plus sector project pages
- Project detail pages generated from current project data
- Factory: `/fabrica/`
- Virtual Showroom: `/showroom/`
- Resources: `/recursos/`, `/recursos/blog/`, `/recursos/videos/`
- Contact: `/contacto/`

## Current Risks

- WhatsApp number is still a placeholder.
- Forms are frontend-only demo interactions.
- Case details now include conservative evidence tags and multi-angle imagery for the first four cases; country/city, year, room count, scope, and material details still need deeper extraction.
- First certificate/qualification proof materials are now mapped to the factory page; detailed certificate-by-certificate metadata still needs launch review.
- Homepage and hotel page now include a text-based cooperation/certification trust strip; image-logo authorization handling and final logo assets are still pending.
- Blog and video pages are lightweight resource entrances.
- Quality-control, mock-up, production follow-up, and export-preparation visuals now use real company materials; factory hero, catalog hub, project hub, contact consultation, and homepage atmosphere still include generated preview assets where real proof imagery is not yet selected.
- Global image reuse was reduced by separating homepage, catalog hub, project hub, catalog route, project route, showroom route, and case-card visuals where possible; current static audit shows no same-page repeated image `src` and the highest global image frequency is 2.
- Showroom cards now use real Matterport thumbnail stills from the user-provided tour links; deeper manual capture can still improve crop control before launch.

## Next Best Actions

1. Replace remaining generated hub/hero visuals with approved real proof photos when strong enough assets are selected.
2. Improve Matterport still crop quality if manual captures are better than the current tour thumbnails.
3. Expand real case photo sets, PDF-derived fields, and alternate images into project detail pages.
4. Expand certificate metadata into a clearer buyer-facing document checklist before launch.
5. Keep running build, internal link checks, duplicate-image checks, mobile checks, and form/modal interaction checks after each major polish.
