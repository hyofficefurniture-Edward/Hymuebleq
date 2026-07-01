# Asset Plan

- Last updated: 2026-06-30
- Principle: use existing approved Hymueble assets first; do not use unauthorized external commercial imagery as production assets.

## Current Existing Assets

Location: `public/assets/hymueble/`

Major groups:

- `hoteles/`: hotel hero, room, bathroom, outdoor, bar, restaurant, conference, lobby/catalog images.
- `oficinas/`: office hero and category images.
- `salud/`: healthcare spaces and category images.
- `educacion/`: education spaces and category images.
- `residencial/`: villa, bedroom, dining, terrace, closet, sofa images.
- `fabrica/`: factory production, packaging, aerial legacy image, and technical drawing/customization image.
- `recursos/`: CNC factory, production line, blog/video hero images.
- `contacto/`: hotel lobby and production line contact images.
- `generated/`: AI-generated premium showroom and process visuals for local preview only.
- `showroom/`: real Matterport thumbnail stills and a composite showroom hero created from the user-provided tour links.
- `casos/`: copied case/project materials from the approved company资料 folder.
- `fabrica/produccion/`: additional factory/production images copied from company资料.
- `qualification/`: rendered qualification/certificate proof images from approved corporate PDF material.
- `brand/`: company logo assets for Header and structured data.

## Used Assets

- Home hero: generated premium virtual showroom atrium WebP, used as an atmospheric project/showroom visual rather than real case proof.
- Sector cards: one hero image per sector.
- Hotel catalog: page-specific category images, including a dedicated bar-counter catalog visual to reduce repeated image use.
- Virtual Showroom: real Matterport thumbnail stills for hotel, office, healthcare, and education, plus a composite hero built from those stills. All Matterport entries now open in an in-site modal instead of a new browser tab.
- Quality-control process: four real process visuals for material finishing, mock-up room approval, production follow-up, and export preparation.
- Project cards: real company-material images and processed alternate angles for Kempinski, Hilton, Raffles/dining, and Huntington.
- Factory page: generated premium production hero, real/cropped production image, technical drawing, workshop sanding, material review visual, and qualification proof cards.
- Factory qualification module: rendered corporate qualification proof images for industrial park, honors, and certificate matrix.
- Contact page: project consultation board, generated export packaging visual, and factory hero background for manufacturing base card.
- Resource pages: CNC and assembly line images.
- Global Header: Hongye Shengda company logo WebP beside the Hymueble brand name.

## Formal vs Placeholder

- Formal for preview: current WebP assets under `public/assets/hymueble/` copied from approved user/company materials or converted from approved preview assets.
- Temporary generated visuals: `public/assets/hymueble/generated/*.webp`; use for premium atmosphere, hub hero imagery and process visualization where real proof imagery is not yet selected. Do not treat as real case proof.
- Placeholder: WhatsApp number, form backend, deeper certificate-by-certificate metadata, and some case metadata.
- Company logo: formal company identity asset provided by the user and cross-checked against `https://www.hyhotelfurniture.com/`.
- No external commercial imagery is used as production page imagery.

## Page Mapping

- `/`: compressed generated showroom hero, sector images, real-material project cards, real quality-control process cards, stable factory video cover, factory strip.
- `/showroom/`: real Matterport composite hero, four Matterport thumbnail cards, and Matterport links that open in the shared in-site showroom modal.
- `/hoteles/`: hotel catalog, hotel Matterport CTA, project cards.
- `/catalogo/hoteleria/`: distinct hotel catalog hero, directory category cards, dedicated bar-counter image, and real mock-up visual.
- `/proyectos/hoteleria/`: project portfolio hero and real hotel project references using copied company materials.
- `/fabrica/`: generated factory production hero, production strip, real material finishing visual, and first qualification proof module.
- `/contacto/`: project consultation board, real export-preparation visual, and B2B inquiry form.
- Global navigation: `public/assets/hymueble/brand/hongye-shengda-logo.webp` as company logo next to `Hymueble`; also used by Organization JSON-LD.

## Added Asset Files / 2026-06-29

Company logo:

- Source: user-provided screenshot from the official `https://www.hyhotelfurniture.com/` logo reference.
- Cross-check: the official site exposes a matching logo asset at Leadong CDN (`bianzu.svg`), but the embedded SVG is large, so the local preview uses a cropped WebP made from the user-provided logo image.
- `public/assets/hymueble/brand/hongye-shengda-logo.webp`: active Header company logo, 360 x 210 WebP, about 8KB.
- Use status: formal company logo for preview; replace with original design-source transparent logo before final launch if the design team provides one.

Generated concept visuals:

- `public/assets/hymueble/generated/home-virtual-showroom-atrium.webp`: compressed active homepage and showroom hero.
- `public/assets/hymueble/generated/showroom-hotel-premium.webp`: compressed hotel showroom concept retained as backup; active showroom cards now use Matterport thumbnails.
- `public/assets/hymueble/generated/quality-material-review.webp`: homepage quality-control material confirmation card.
- `public/assets/hymueble/generated/quality-mockup-room.webp`: homepage mock-up room / pilot approval card.
- `public/assets/hymueble/generated/quality-production-followup.webp`: homepage production follow-up card.
- `public/assets/hymueble/generated/quality-export-packaging.webp`: homepage export packaging card.
- `public/assets/hymueble/generated/catalog-hub-material-library.webp`: catalog hub hero visual.
- `public/assets/hymueble/generated/project-portfolio-review.webp`: project hub hero visual.
- `public/assets/hymueble/fabrica/produccion/factory-production-hero.webp`: active factory page hero visual, copied from generated production-followup asset for layout-specific use.
- `public/assets/hymueble/contacto/produccion/project-consultation-board.webp`: active contact page consultation visual, copied from generated project portfolio asset for layout-specific use.

Cleaned in v0.21:

- Removed unused large PNG preview files from `public/assets/hymueble/generated/` after replacing active showroom usage with compressed WebP files and real Matterport thumbnails.

Converted in v0.22:

- Converted all remaining Hymueble JPG/JPEG/PNG assets to WebP.
- Removed old JPG/JPEG/PNG source files from `public/assets/hymueble`.
- Current rendered site images and Open Graph images use WebP.
- Current `public/assets/hymueble` size is about 11MB; current `dist` size is about 14MB.

Real Matterport showroom thumbnails:

- Sources:
  - `https://my.matterport.com/show/?m=XJAMZN562aG`
  - `https://my.matterport.com/show/?m=qhkf4QiGoGQ`
  - `https://my.matterport.com/show/?m=ErY9m83UR4w`
  - `https://my.matterport.com/show/?m=8HKTwkAB7pS`
- `public/assets/hymueble/showroom/matterport-hotel-thumb.webp`
- `public/assets/hymueble/showroom/matterport-office-thumb.webp`
- `public/assets/hymueble/showroom/matterport-healthcare-thumb.webp`
- `public/assets/hymueble/showroom/matterport-education-thumb.webp`
- `public/assets/hymueble/showroom/matterport-showroom-hero.webp`: composite hero made from the four Matterport thumbnails for `/showroom/`.

Showroom interaction status / 2026-06-30:

- Matterport sources remain the four user-provided links.
- Active site behavior uses an in-site modal iframe, not new-tab navigation.
- Modal UX verification:
  - opens Matterport inside Hymueble
  - locks background scroll
  - focuses the `Cerrar` button after opening
  - restores focus to the original showroom card after closing
  - resets iframe `src` to `about:blank` after close

Processed hotel catalog visual:

- Source: `/Users/yoyo/Documents/工作台/50_运营系统/网站/hymueble独立站资料/鸿业家具公司部分资料/Fenmi 原始下载图/已编辑/吧台/NATUZZI ITALIA-吧台/NATUZZI ITALIA-Bar Counter-Skyline/产品图/10003.jpeg`
- `public/assets/hymueble/hoteles/catalogo/hotel-bar-counter.webp`: dedicated bar catalog card visual for `/catalogo/hoteleria/`.

Processed real process and video visuals:

- Sources:
  - `酒店官网-高质量产品页面&公司简介资料/成案案例/workshop hotel furniture.jpg`
  - `酒店官网-高质量产品页面&公司简介资料/Picture from  Mock-UP Hongye/微信图片_20250801141549.jpg`
  - `酒店官网-高质量产品页面&公司简介资料/酒店官网生产设备和工序资料/酒店家具-02五轴数控加工实木工序-意大利Bacci进口-高精设备03/`
  - `酒店官网-高质量产品页面&公司简介资料/酒店官网生产设备和工序资料/酒店家具--08国际标准产品检测包装/`
- `public/assets/hymueble/fabrica/produccion/real-material-finishing.webp`
- `public/assets/hymueble/fabrica/produccion/real-mockup-room.webp`
- `public/assets/hymueble/fabrica/produccion/real-production-followup.webp`
- `public/assets/hymueble/fabrica/produccion/real-export-packaging.webp`
- `public/assets/hymueble/fabrica/produccion/factory-video-cover.webp`

Processed company material:

- Source: `/Users/yoyo/Documents/工作台/50_运营系统/网站/hymueble独立站资料/鸿业家具公司部分资料/酒店官网-高质量产品页面&公司简介资料/酒店官网生产设备和工序资料/酒店家具--08国际标准产品检测包装/Global-Ready Packaging-hotel furnitue.png`
- `public/assets/hymueble/fabrica/produccion/export-packaging-proof.webp`: cropped/compressed factory production image used in the factory strip.

Copied company materials:

- `public/assets/hymueble/casos/kempinski-reception.webp`
- `public/assets/hymueble/casos/hilton-suite-room.webp`
- `public/assets/hymueble/casos/raffles-dining-room.webp`
- `public/assets/hymueble/casos/huntington-workstations.webp`
- `public/assets/hymueble/fabrica/produccion/factory-chair-production.webp`
- `public/assets/hymueble/fabrica/produccion/workshop-sanding.webp`

Processed case alternates:

- Sources: `PDF成功案例 2024-2025/酒店/Grand Kempinski Hotel.pdf`, `PDF成功案例 2024-2025/酒店/The Hilton DoubleTree Hotel.pdf`, `四季&莱佛士酒店素材/Raffles Hotel.pdf`, local hotel 成案案例 images, and `现场安装图Huntington School Of Lagos/`.
- `public/assets/hymueble/casos/kempinski-exterior-case.webp`
- `public/assets/hymueble/casos/kempinski-lobby-reception-case.webp`
- `public/assets/hymueble/casos/kempinski-guestroom-case.webp`
- `public/assets/hymueble/casos/kempinski-dining-bar-case.webp`
- `public/assets/hymueble/casos/kempinski-lake-exterior-case.webp`
- `public/assets/hymueble/casos/hilton-exterior-case.webp`
- `public/assets/hymueble/casos/hilton-project-installation-case.webp`
- `public/assets/hymueble/casos/hilton-king-room-case.webp`
- `public/assets/hymueble/casos/hilton-room-view-case.webp`
- `public/assets/hymueble/casos/hilton-public-area-case.webp`
- `public/assets/hymueble/casos/raffles-packaging-proof-case.webp`
- `public/assets/hymueble/casos/raffles-custom-wall-case.webp`
- `public/assets/hymueble/casos/raffles-installation-case.webp`
- `public/assets/hymueble/casos/raffles-restaurant-warm-case.webp`
- `public/assets/hymueble/casos/huntington-campus-exterior.webp`
- `public/assets/hymueble/casos/huntington-classroom-lab.webp`
- `public/assets/hymueble/casos/huntington-reception-installation.webp`
- `public/assets/hymueble/casos/huntington-auditorium-installation.webp`
- `public/assets/hymueble/casos/huntington-project-model.webp`

Use note:

- Multi-angle case images are used to avoid repeating one project image across homepage, project hub, sector listing, detail hero, and detail support sections.
- Hotel catalog image roles are split across hotel page cards, catalog cards, and category pages to avoid one category image carrying multiple page contexts.
- Proof/process images now use real company materials where they carry manufacturing, mock-up, or export-preparation claims.
- Current static audit shows no same-page repeated image `src` and the highest global image frequency is 2.
- Cropped Huntington installation images were selected/cropped to avoid visible phone watermark where possible.
- Some Raffles proof images are documentary/process visuals, so they are used as support evidence rather than polished hero imagery.

Rendered qualification proof from corporate PDF:

- Source: `/Users/yoyo/Documents/工作台/50_运营系统/网站/hymueble独立站资料/鸿业家具公司部分资料/案例项目/PDF成功案例 2024-2025/案例 合集 -Corporate Qualification Documents of Hongye Furniture Group(2025-10).pdf`
- `public/assets/hymueble/qualification/industrial-park-workshops.webp`: industrial park and workshop overview for `/fabrica/`.
- `public/assets/hymueble/qualification/honors-overview.webp`: honors/license/corporate qualification overview for `/fabrica/`.
- `public/assets/hymueble/qualification/certificate-matrix.webp`: certificate matrix visual for `/fabrica/`.

Use rule:

- Generated visuals can support high-end atmosphere and process UX where real proof imagery is not yet selected.
- Matterport thumbnails are the active showroom visuals in v0.14.
- Generated process visuals can support demo clarity and premium perception, but should be replaced with approved real QC / packaging photography before final launch when available.
- Generated layout-specific copies can improve active page composition, but the originals remain the source of truth for replacement tracking.
- Copied company materials can support project/case/factory credibility in the local preview.
- Raffles PDF first page was rendered for inspection but not used as a cover because it is packaging evidence rather than a polished case visual.

## AI / Future Asset Prompts

Use these only for clearly marked temporary concept imagery if real materials are missing:

- Generated concept tested in chat, suitable for Virtual Showroom direction: `Premium virtual showroom entrance for a Spanish B2B commercial furniture brand, immersive hotel lobby and office furniture hybrid space, cinematic architectural lighting, warm walnut wood, natural stone, soft gold accent line, subtle dark UI frame feeling, no logos, no readable text, no people, photorealistic, high-end international project furniture website hero background, 16:9 composition`
- `Premium hotel lobby furniture showroom, Latin American B2B procurement website hero, cinematic architectural lighting, natural stone, warm wood, no logos, no text, photorealistic, high-end commercial interior`
- `Modern office project furniture solution, corporate workspace, premium desks and lounge seating, architectural composition, natural daylight, no logos, no text`
- `Virtual showroom entrance for commercial furniture brand, immersive 3D interior preview, dark premium UI frame, subtle gold accent, no readable text`
- `Furniture factory quality control scene, inspector checking finished hotel furniture, clean production environment, premium manufacturing brand`

## Copyright Risk Notes

- External websites may be used for visual reference only.
- Do not copy commercial photos, logos, page layouts, or written copy into the site.
- Before launch, verify rights for every certificate, logo, project photo, and PDF.

## Replacement Priorities

1. Replace remaining generated hub/hero visuals where better real proof imagery is available.
2. Higher-control Matterport stills if manual captures outperform the current thumbnail exports.
3. More detailed certificate pages and launch-ready certificate metadata.
4. More complete case photo sets for Hilton, Kempinski, Raffles, Huntington.
5. Real catalog PDF cover thumbnails.

## Catalog PDF Source Status

Local catalog PDFs have been found under:

- `/Users/yoyo/Documents/工作台/50_运营系统/网站/hymueble独立站资料/hymueble图册/`

Current use:

- v0.83 does not expose or send the PDFs directly.
- Catalog CTA clicks now record the requested catalog/category in the hidden `catalog_interest` field.
- Real PDF delivery should be connected after choosing the form receiver or CRM workflow.
- `docs/project-brain/04-素材/catalog-pdf-manifest.json` maps 21 local PDF files to 41 rendered catalog interests.
- `pnpm qa:catalogs` verifies the local files exist and that rendered catalog interests are mapped.

Priority examples found:

- Hotel furniture overall solution catalog.
- Hotel furniture sofa catalog.
- Office desk/chair/cabinet, reception, office chair and acoustic booth catalogs.
- Healthcare, education and residential catalog folders.

## User Authorization Update

The user explicitly allowed the project to go beyond local images when needed:

- Search for visual references.
- Generate AI visual materials.
- Plan interaction and motion assets.
- Use additional visual materials if they are safe, appropriate, and clearly tracked.

Execution rule:

- External commercial images remain references only.
- AI-generated visuals must be marked as temporary/placeholder until approved.
- Existing self-owned Hymueble materials remain the preferred production asset source.
- Do not repeat the same image `src` multiple times within the same rendered page.
- Keep full-site image frequency low; v0.14 target is no image above 2 rendered occurrences in the static build.
- Avoid using the same hero/category image across homepage, catalog hub, project hub, and sector routes when a distinct approved or generated visual is available.
- If a real case appears in multiple project contexts, reuse is acceptable temporarily; reduce it by adding alternate photo angles from the same case, not by replacing it with unrelated imagery.
- Any generated or found asset used in the site must be recorded here with source, page, and replacement status.
