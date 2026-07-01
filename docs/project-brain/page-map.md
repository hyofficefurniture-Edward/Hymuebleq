# Page Map

- Last updated: 2026-06-29
- Scope: current local preview plus next polish direction

## Global SEO Metadata

Status: implemented in v0.18 through `BaseLayout`.

Every generated page now includes:

- Canonical URL using `https://hymueble.com`
- `robots` directive
- Open Graph title, description, URL and image
- Twitter summary large image metadata
- Theme color
- Organization JSON-LD

Core routes and dynamic routes pass a page-specific share image so social previews do not all fall back to the homepage visual.

## Crawl Files

Status: implemented in v0.19.

- `/robots.txt` allows crawling and points to `https://hymueble.com/sitemap.xml`.
- `/sitemap.xml` is generated from current route data, not a hand-maintained static file.
- Current sitemap coverage: 34 URLs, matching 34 generated HTML pages.

## Home `/`

Goal: communicate Hymueble as an international B2B project furniture solution brand within the first screen.

Modules:

- Premium immersive hero
- Trust metrics
- Virtual Showroom entry
- Product / collection routes by sector
- Purchase route bridge: Catalog / Projects / Contact
- Project references
- 12-step B2B procurement and delivery process
- Factory and supply-chain capability
- Quality control proof and checkpoints
- FAQ
- Final inquiry CTA

Primary CTA: `Solicitar cotización`

Secondary CTA: `Explorar showroom virtual`

Route bridge logic:

- `Catálogo`: product families, sector spaces, furniture categories.
- `Proyectos`: buyer pain points, risk-reduction logic, project routes and proof.
- `Contacto`: country, city, spaces, quantities, budget, timeline and quotation request.

Process coverage: quotation, site measurement when applicable, technical design, finishes, sample or pilot room, production, in-process QC, final inspection, export packing, logistics, optional installation support, and post-sale support.

## Products / Collections `/catalogo/`

Goal: organize product discovery by project sector, not isolated SKUs.

Modules:

- Catalog hub hero
- Five sector cards
- Lead capture through catalog modal

CTA: `Solicitar PDF`, `Ver catálogo`

## Hotel Catalog `/catalogo/hoteleria/`

Goal: make hotel buyers choose by space: rooms, bathrooms, outdoor, bar, restaurant, conference.

Modules:

- Hotel catalog hero
- Distinct room/category visual instead of reusing the hotel landing hero
- Six hotel category cards
- Virtual Showroom module
- Catalog lead modal

CTA: `Cotizar mi proyecto ahora`, `Ver showroom virtual`, `Solicitar catálogo PDF`

## Project Solutions `/proyectos/`

Goal: show that Hymueble supports multiple B2B project types.

Modules:

- Project hub hero
- Project solution advisory module with buyer pain points, risk-reduction logic and CTA
- Quick sector entries
- Current project references

CTA: `Consultar proyecto similar`

Project Solutions coverage:

- Hoteles y resorts: FF&E, habitaciones, áreas públicas, showroom hotelero and hotel case references.
- Oficinas: corporate workspaces, meeting rooms, reception and volume procurement.
- Residencial e inmobiliario: developments, villas, model apartments and coordinated furniture packages.
- Comercial e institucional: restaurants, commercial spaces, health, education and mixed-scope inquiries.

## Hotel Projects `/proyectos/hoteleria/`

Goal: show hotel project experience and route buyers to comparable consultation.

Modules:

- Hotel project hero
- Project portfolio visual instead of reusing the hotel landing/catalog hero
- Project cards
- Hotel showroom decision bridge
- B2B cooperation band
- Contact CTA

CTA: `Consultar un proyecto similar`, `Entrar al showroom hotelero`

## Factory `/fabrica/`

Goal: prove China supply-chain and production coordination capability.

Modules:

- Factory hero
- Metrics
- Direct factory comparison
- Production equipment capabilities
- Customization module
- Showroom-to-factory decision bridge
- Visual qualification evidence
- Certification highlights
- Quality-control support

CTA: `Agendar una visita`, `Cuéntanos tu proyecto`, `Ver showrooms por sector`

## Quality Control

Current status: implemented as a distinct homepage section in v0.27.

Covered messages:

- Material confirmation
- Sample / pilot confirmation
- Production follow-up
- Packing inspection
- Pre-shipment inspection
- Evidence before shipment
- Lower project procurement risk

## Contact `/contacto/`

Goal: collect B2B project inquiry information.

Modules:

- Contact hero / image panel
- Project consultation/material board visual
- Project inquiry form with company, location, WhatsApp, email, sector, spaces, quantity, project stage, timeline, budget and detailed requirements
- Guidance for better quotation
- Factory / packaging support visual
- Showroom reference bridge before inquiry submission
- WhatsApp/contact CTA

CTA: `Enviar mi consulta de proyecto`, `Ver showroom primero`

## Virtual Showroom

Current status: `/showroom/` exists as the dedicated showroom hub. Homepage, header, and footer link to `/showroom/`; hotel and hotel catalog pages link directly to the hotel Matterport experience.

Target CTA:

- `Explorar showroom virtual`
- `Entrar al showroom virtual`
- `Ver showroom virtual`

Links:

- Hoteles: `https://my.matterport.com/show/?m=XJAMZN562aG`
- Oficinas: `https://my.matterport.com/show/?m=qhkf4QiGoGQ`
- Salud: `https://my.matterport.com/show/?m=ErY9m83UR4w`
- Educación: `https://my.matterport.com/show/?m=8HKTwkAB7pS`

Placement:

- Homepage: showroom section and navigation entry.
- `/showroom/`: dedicated hub with all four Matterport links.
- `/hoteles/` and `/catalogo/hoteleria/`: direct hotel showroom CTAs.
- `/proyectos/hoteleria/`: direct hotel showroom CTA before B2B cooperation band.
- `/fabrica/`: showroom-to-factory bridge for aligning space references before discussing production.
- `/contacto/`: showroom reference bridge before inquiry submission.
- `/oficinas/`, `/salud/`, `/educacion/`: sector-specific showroom module added in v0.20.
- `/residencial/`: no Matterport module yet because no residential showroom link has been provided.

Group sites:

- Hoteles: `https://www.hyhotelfurniture.com/`
- Oficinas: `https://www.hyofficefurniture.com/`
- Salud: `https://www.hyhealthcarefurniture.com/`
- Educación: `https://hyeducationfurniture.com/`
- Residencial: `https://fenmicasa.com/`
