import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));
const outDir = join(root, "docs/seo-keyword-audit");

const inventory = JSON.parse(readFileSync(join(outDir, "inventory-raw.json"), "utf8"));
const candidateRows = readCsv(join(outDir, "keyword-candidates.csv"));
const plannerRows = readPlanner(join(outDir, "raw-keyword-planner-export-utf8.tsv"));
const plannerByKeyword = new Map(plannerRows.map((row) => [row.keyword.toLowerCase(), row]));
const officialUrls = extractOfficialUrls(readFileSync(join(root, "docs/url-list.md"), "utf8"));
const inventoryByUrl = new Map(inventory.map((row) => [row.url, row]));

const sectorMain = {
  "/": ["fabricante de muebles comerciales", ["proveedor de mobiliario para proyectos", "muebles para hoteles y oficinas", "fábrica de muebles en China"]],
  "/hoteles/": ["muebles para hoteles", ["mobiliario hotelero", "proveedor de muebles hoteleros", "fabricante de muebles para hoteles"]],
  "/catalogo/hoteles/": ["catálogo de muebles para hoteles", ["catálogo de mobiliario hotelero", "muebles hoteleros por categoría"]],
  "/proyectos/hoteles/": ["proyectos de mobiliario hotelero", ["casos de mobiliario para hoteles", "referencias hoteleras"]],
  "/oficinas/": ["muebles para oficinas", ["mobiliario de oficina", "proveedor de muebles de oficina", "mobiliario corporativo"]],
  "/catalogo/oficinas/": ["catálogo de muebles para oficinas", ["mobiliario de oficina por categoría", "muebles de oficina para proyectos"]],
  "/proyectos/oficinas/": ["proyectos de mobiliario de oficina", ["casos de muebles para oficinas", "proyectos corporativos"]],
  "/educacion/": ["mobiliario escolar", ["muebles para escuelas", "mobiliario educativo para proyectos"]],
  "/catalogo/educacion/": ["catálogo de mobiliario escolar", ["muebles para escuelas por espacio", "catálogo de mobiliario educativo"]],
  "/proyectos/educacion/": ["proyectos de mobiliario escolar", ["referencias educativas", "casos de mobiliario para escuelas"]],
  "/salud/": ["mobiliario hospitalario", ["muebles hospitalarios", "mobiliario para clínicas"]],
  "/catalogo/salud/": ["catálogo de mobiliario hospitalario", ["muebles hospitalarios por espacio", "mobiliario para clínicas"]],
  "/proyectos/salud/": ["proyectos de mobiliario hospitalario", ["referencias de salud", "casos de mobiliario médico"]],
  "/residencial/": ["muebles para proyectos residenciales", ["mobiliario para desarrollos residenciales", "muebles para unidades modelo"]],
  "/catalogo/residencial/": ["catálogo de muebles residenciales para proyectos", ["muebles para desarrollos residenciales", "muebles para apartamentos y villas"]],
  "/proyectos/residencial/": ["proyectos de mobiliario residencial", ["referencias residenciales", "casos de apartamentos y villas"]],
  "/catalogo/oficinas/colaboracion-y-brainstorming/": ["muebles para espacios colaborativos", ["mobiliario colaborativo", "zonas colaborativas", "lluvia de ideas como escena secundaria"]],
  "/catalogo/educacion/laboratorios-y-steam/": ["mobiliario para laboratorios educativos", ["mobiliario para aulas STEAM", "muebles para laboratorio escolar"]],
  "/catalogo/salud/cuidados-y-recuperacion/": ["mobiliario para residencias de cuidado", ["mobiliario geriátrico", "muebles para recuperación y cuidado prolongado"]],
  "/catalogo/residencial/penthouses-y-apartamentos-de-lujo/": ["muebles para apartamentos de lujo", ["mobiliario residencial de lujo", "muebles para penthouses como escena secundaria"]],
  "/catalogo/hoteles/mobiliario-para-conferencias/": ["muebles para salas de conferencias de hotel", ["mobiliario para conferencias hoteleras", "salones de eventos y reuniones hoteleras"]],
  "/fabrica/": ["fabricante de muebles en China", ["fábrica de muebles", "producción de muebles a medida", "fabricante de mobiliario comercial"]],
  "/contacto/": ["solicitar cotización de muebles", ["cotizar proyecto de mobiliario", "contacto proveedor de muebles", "enviar proyecto de mobiliario"]],
  "/catalogo/": ["catálogos de mobiliario para proyectos", ["catálogo de mobiliario comercial", "catálogo de muebles para proyectos"]],
  "/proyectos/": ["proyectos de mobiliario", ["casos de mobiliario comercial", "referencias de proyectos por sector"]],
};

const categoryDefaults = [
  [/\/catalogo\/hoteles\/habitaciones\//, "muebles para habitaciones de hotel", ["mobiliario para habitaciones de hotel", "habitaciones hoteleras por proyecto"]],
  [/\/catalogo\/hoteles\/muebles-de-bano\//, "muebles de baño para hoteles", ["muebles de baño para habitaciones de hotel"]],
  [/\/catalogo\/hoteles\/muebles-exteriores\//, "mobiliario exterior para hoteles", ["muebles exteriores para terrazas y resorts"]],
  [/\/catalogo\/hoteles\/muebles-para-bar\//, "muebles para bar de hotel", ["mobiliario para bar hotelero"]],
  [/\/catalogo\/hoteles\/muebles-para-restaurante\//, "muebles para restaurante de hotel", ["mobiliario para restaurantes de hotel"]],
  [/\/catalogo\/oficinas\/puestos-de-trabajo\//, "puestos de trabajo para oficina", ["estaciones de trabajo para oficina"]],
  [/\/catalogo\/oficinas\/sillas-de-oficina\//, "sillas de oficina para empresas", ["sillas de oficina para proyectos"]],
  [/\/catalogo\/oficinas\/salas-de-reunion\//, "mobiliario para salas de reunión", ["muebles para salas de juntas"]],
  [/\/catalogo\/oficinas\/recepcion-y-salas-de-espera\//, "mobiliario para recepción de oficina", ["salas de espera corporativas"]],
  [/\/catalogo\/oficinas\/oficinas-ejecutivas\//, "mobiliario para oficinas ejecutivas", ["oficinas gerenciales"]],
  [/\/catalogo\/educacion\/aulas-escolares\//, "mobiliario para aulas escolares", ["muebles para aulas"]],
  [/\/catalogo\/educacion\/bibliotecas\//, "mobiliario para bibliotecas escolares", ["bibliotecas escolares y universitarias"]],
  [/\/catalogo\/educacion\/comedores-escolares\//, "mobiliario para comedores escolares", ["comedores y cafeterías de campus"]],
  [/\/catalogo\/educacion\/preescolar-y-educacion-inicial\//, "mobiliario para preescolar", ["educación inicial"]],
  [/\/catalogo\/educacion\/sala-docente-y-administracion\//, "mobiliario para administración escolar", ["sala docente"]],
  [/\/catalogo\/salud\/consultorios-medicos\//, "mobiliario para consultorios médicos", ["muebles para clínicas"]],
  [/\/catalogo\/salud\/estaciones-de-enfermeria\//, "estaciones de enfermería", ["mobiliario para estaciones de enfermería"]],
  [/\/catalogo\/salud\/hospitalizacion-y-habitaciones\//, "muebles para habitaciones hospitalarias", ["mobiliario para hospitalización"]],
  [/\/catalogo\/salud\/laboratorios-y-areas-clinicas\//, "mobiliario para laboratorios clínicos", ["áreas clínicas"]],
  [/\/catalogo\/salud\/salas-de-espera-y-recepcion\//, "mobiliario para salas de espera médicas", ["recepción médica"]],
  [/\/catalogo\/residencial\/villas-y-mansiones\//, "muebles para villas de lujo", ["mobiliario residencial de lujo"]],
  [/\/catalogo\/residencial\/salas-y-comedores-de-lujo\//, "muebles para salas y comedores de lujo", ["mobiliario residencial premium"]],
  [/\/catalogo\/residencial\/dormitorios-principales\//, "muebles para dormitorios principales", ["dormitorios de lujo"]],
  [/\/catalogo\/residencial\/cocinas-closets-y-vestidores\//, "closets y vestidores a medida", ["cocinas y almacenamiento residencial"]],
  [/\/catalogo\/residencial\/terrazas-jardines-y-exteriores\//, "muebles para terrazas y exteriores residenciales", ["jardines y exteriores"]],
];

const serpRecords = [
  ["muebles para hoteles", "/hoteles/", "泛西语/MX/CO 抽样", "B2B 厂家、本地供应商、目录页、少量 marketplace", "适合作为酒店行业页主词", "P0", "结果中出现 Malvena、Canorá、Muebles Hotel 等供应商/厂家，也混入 MercadoLibre；行业页可主承接，目录页降级为 catálogo。", "https://malvena.com.mx/collections/mobiliario-para-hoteles", "https://canora.co/mobiliario-para-hoteles/", "https://muebleshotel.com/muebles-hotel/"],
  ["mobiliario hotelero", "/hoteles/", "泛西语/CO 抽样", "厂家、供应商、目录、行业媒体", "适合作为辅助或并列核心词", "P0", "采购意图清晰，但更像行业名词；建议 /hoteles/ 强承接，/catalogo/hoteles/ 只保留目录语境。", "https://www.revistaequipar.com/proveedor/carpinteria-y-mobiliario-hotelero", "https://canora.co/mobiliario-para-hoteles/"],
  ["catálogo de muebles para hoteles", "/catalogo/hoteles/", "泛西语抽样", "目录页、供应商目录、marketplace 混合", "适合作目录页主词", "P1", "SERP 支持目录意图，但部分结果为零售/平台；目录页需坚持项目报价和参考图册，不加购物车/价格。", "https://www.grupomilenium.co/index/GM-directorio-Proveedores-Hoteles-Restaurantes.php", "https://malvena.com.mx/collections/mobiliario-para-hoteles"],
  ["proyectos de mobiliario hotelero", "/proyectos/hoteles/", "泛西语抽样", "案例页、项目服务、厂家案例", "适合作案例页主词", "P1", "结果中项目/案例语义存在，但量级弱于行业词；适合证明页，不抢 /hoteles/。", "https://www.wtb.com.tr/es/Proyectos-de-mobiliario-para-hosteler%C3%ADa-en-EE.-UU./", "https://fayhero.com/es/proyecto/"],
  ["muebles para habitaciones de hotel", "/catalogo/hoteles/habitaciones/", "泛西语抽样", "厂家、产品目录、博客/指南混合", "适合作产品细分类主词", "P0", "空间长尾明确，能自然承接 camas/cabeceras/escritorios/armarios。", "https://www.wtb.com.tr/es/muebles-de-hotel/", "https://frajumar.com/categoria-producto/mobiliario-para-hoteles/"],
  ["muebles para salas de conferencias de hotel", "/catalogo/hoteles/mobiliario-para-conferencias/", "泛西语抽样", "酒店会议家具、活动家具、Alibaba/平台混合", "优于泛 `mobiliario para conferencias`", "P1", "SERP 支持 hotel conference furniture，但泛词会和办公会议室/活动用品混淆；Title/H1 可更具体。", "https://www.gcongroup.com/es/hotel-conference-furniture.html", "https://www.hyhotelfurniture.com/es/Hotel-Conference-Furniture-pl43305397.html"],
  ["muebles para oficinas", "/oficinas/", "MX/泛西语抽样", "本地供应商、电商、厂家、品牌目录混合", "适合作行业页主词但需 B2B 限定", "P0", "结果里供应商和零售电商都多；行业页可主承接，文案必须用 proyectos/corporativos/volumen 抑制零售意图。", "https://gmmuebles.com.mx/", "https://ofinobel.com.mx/", "https://www.hermanmiller.com/es_mx/"],
  ["mobiliario de oficina", "/oficinas/", "MX/泛西语抽样", "品牌目录、供应商、博客、零售混合", "适合作辅助核心词", "P0", "搜索需求高，但零售和信息内容混杂；/oficinas/ 适合，/catalogo/oficinas/ 强化 catálogo。", "https://www.hermanmiller.com/es_lac/", "https://mundoin.mx/blogs/news/mobiliario-y-equipo-de-oficina"],
  ["catálogo de muebles de oficina", "/catalogo/oficinas/", "泛西语抽样 + Planner", "目录/零售/供应商混合", "适合作目录页主词", "P0", "Keyword Planner 有 100-1000 区间，竞争高；H1 当前 `Catálogo de oficinas` 偏弱，应改为 `Catálogo de muebles para oficinas`。", "https://estilooficina.com/modelos-de-muebles-de-oficina/", "https://desillas.com/categ-2-oficina.html"],
  ["puestos de trabajo para oficina", "/catalogo/oficinas/puestos-de-trabajo/", "泛西语抽样 + Planner", "产品目录、供应商、图片灵感混合", "适合作主词", "P0", "Planner 有 100-1000，SERP 可采购；与 `estaciones de trabajo` 均可用，页面可双词覆盖。", "https://www.evolutionmuebles.com.mx/web/mx/156-estaciones-de-trabajo", "https://www.hermanmiller.com/es_mx/products/workspaces/workstations/"],
  ["estaciones de trabajo para oficina", "/catalogo/oficinas/puestos-de-trabajo/", "泛西语抽样 + Planner", "产品目录、品牌目录、供应商", "适合作辅助/长尾", "P0", "Herman Miller、Steelcase、Evolution 等结果支持 `estaciones de trabajo`，建议作为辅助词与 `puestos` 共存。", "https://www.hermanmiller.com/es_mx/products/workspaces/workstations/", "https://www.steelcase.com/na-es/productos-estaciones-trabajo/"],
  ["sillas de oficina para empresas", "/catalogo/oficinas/sillas-de-oficina/", "泛西语抽样", "零售、电商、供应商混合", "只适合作带 B2B 限定的辅助词", "P1", "单独 `sillas de oficina` 零售意图太强；必须加 empresas/proyectos/volumen。", "https://ofigrup.mx/", "https://desillas.com/categ-2-oficina.html"],
  ["brainstorming", "/catalogo/oficinas/colaboracion-y-brainstorming/", "泛西语抽样 + Planner", "方法论、办公文化、少数家具场景", "不适合作商业页主词", "Reject", "Planner 量大但 SERP 非家具采购为主；保留为正文场景词，Title/H1/URL 主词应转向 `espacios colaborativos`。", "https://www.wework.com/es-LA/ideas/growth-innovation/customized-spaces-for-the-hybrid-work-era", "https://www.oficinasmontiel.com/blog/como-potenciar-el-trabajo-en-equipo/"],
  ["muebles para espacios colaborativos", "/catalogo/oficinas/colaboracion-y-brainstorming/", "泛西语抽样", "B2B 家具、办公解决方案、博客混合", "适合作替代主词/辅助词", "P1", "比 brainstorming 更接近家具采购；可保留 URL 暂不改，先改 Title/H1。", "https://www.mepal.com.co/categoria-catalogo/zonas-colaboracion/", "https://www.sellex.es/es/soluciones/mobiliario-espacios-colaborativos"],
  ["fabricante de muebles en China", "/fabrica/", "泛西语抽样", "中国厂家榜单、B2B 平台、信息内容", "适合作工厂页主词", "P0", "SERP 有榜单和中国制造商意图，不适合首页独占；/fabrica/ 应更强承接。", "https://es.hyofficefurniture.com/Los-10-principales-proveedores-de-muebles-en-China-id43013886.html", "https://www.migliohome.com/es/blog-top-10-custom-furniture-manufacturers-in-china.html"],
  ["proveedor de mobiliario comercial", "/fabrica/", "泛西语抽样", "批发商、供应商、项目家具", "适合作供应商辅助词", "P1", "更适合首页/工厂页辅助，不宜作为所有行业页主词。", "https://www.artisanfurniture.us/es/wholesaling/suppliers/"],
  ["solicitar cotización de muebles", "/contacto/", "MX/泛西语抽样", "联系页、报价表单、本地服务", "适合作联系页主词", "P0", "SERP 是转化/表单意图，联系页承接正确；其他页面保留 CTA 不构成抢词。", "https://www.carpintecno.com/cotizacion-carpintecno.php", "https://www.habitissimo.com.mx/presupuesto/hacer-muebles-a-medida/jalisco/guadalajara"],
  ["mobiliario hospitalario", "/salud/", "泛西语抽样 + Planner", "厂家、医疗设备目录、信息内容", "适合作行业页主词", "P1", "Planner 100-1000，中竞争；健康页可主承接，细分页用 consultorios/enfermería/hospitalización。", "https://www.hillrom.lat/es/products-category/healthcare-furniture/", "https://www.elhospital.com/informacion-comercial/muebles-hospitalarios-en-pvc-y-abs-calidad-y-durabilidad"],
  ["mobiliario escolar", "/educacion/", "MX/泛西语抽样 + Planner", "厂家、学校家具供应商、目录", "适合作教育页主词", "P1", "Planner 1000-10000，高竞争；教育行业页可主承接，目录页强化 catálogo。", "https://mobiliarioescolar.mx/", "https://www.memosamuebles.com/blog/fabricantes-de-mobiliario-escolar-en-mexico"],
  ["mobiliario para laboratorios educativos", "/catalogo/educacion/laboratorios-y-steam/", "泛西语抽样", "学校实验室家具、教育供应商、STEAM 内容", "适合作主词", "P1", "`aulas STEAM` 有结果但偏教育理念；更稳主词是 laboratorios educativos，STEAM 做辅助。", "https://www.esymarlaboratorio.com/mobiliario-de-laboratorio-para-colegios.html", "https://www.memosamuebles.com/mobiliario-escolar/muebles-para-laboratorio-escolar"],
  ["mobiliario para aulas STEAM", "/catalogo/educacion/laboratorios-y-steam/", "泛西语抽样", "教育产品、教学理念、少量目录", "适合作辅助词", "P2", "SERP 支持但更多在西班牙/教育内容语境；不建议 URL/H1 只围绕 STEAM。", "https://www.collectivity.es/mobiliario-escolar-para-aula-steam/", "https://www.hermex.es/catalogos/mobiliario-para-aulas-steam"],
  ["mobiliario para cuidados y recuperación", "/catalogo/salud/cuidados-y-recuperacion/", "泛西语抽样", "护理/康复概念、养老家具、医疗家具混合", "不宜作为主词", "P2", "词义偏宽，SERP 更自然的是 geriátrico/residencias/centros sociosanitarios；建议重分配为 `mobiliario para residencias de cuidado`。", "https://www.seniorcare.es/", "https://tecnimoem.com/mobiliario/"],
  ["mobiliario para apartamentos de lujo", "/catalogo/residencial/penthouses-y-apartamentos-de-lujo/", "泛西语抽样", "设计灵感、图库、豪宅装修、少量家具品牌", "适合作辅助，不宜强 B2B 主词", "P2", "住宅高端词容易偏零售/灵感，需用 desarrollos residenciales/unidades modelo 限定项目采购。", "https://giorgiocollection.com/event/luxury-furniture-for-the-most-exclusive-penthouses/", "https://ar.pinterest.com/stotridzat/penthouse-apartment/"],
];

const conflictRows = [
  ["muebles para hoteles / mobiliario hotelero", "/hoteles/ vs /catalogo/hoteles/ vs /proyectos/hoteles/", "三页都出现酒店大词，当前分工基本成立但辅助词重复偏高。", "/hoteles/", "目录页降级为 catálogo / por categoría；项目页降级为 proyectos / casos / referencias.", "是", "低风险微调", "否", "可微调目录/项目入口锚文本", "中", "P1"],
  ["muebles para oficinas / mobiliario de oficina", "/oficinas/ vs /catalogo/oficinas/ vs /proyectos/oficinas/", "三页共享办公大词；目录页 H1 `Catálogo de oficinas` 不够清楚。", "/oficinas/", "目录页用 catálogo de muebles para oficinas；案例页用 proyectos de mobiliario de oficina。", "是", "是", "否", "可微调", "中", "P0"],
  ["mobiliario escolar", "/educacion/ vs /catalogo/educacion/ vs /proyectos/educacion/", "当前行业/目录/案例分工清楚，风险低。", "/educacion/", "目录页 catálogo；项目页 proyectos/referencias。", "否", "否", "否", "否", "低", "P2"],
  ["mobiliario hospitalario", "/salud/ vs /catalogo/salud/ vs /proyectos/salud/", "当前分工清楚，细分类页需避免 `cuidados` 过宽。", "/salud/", "目录页 catálogo；项目页 proyectos；`cuidados` 页改为 residencias/cuidado prolongado。", "局部", "局部", "暂不", "否", "中", "P1"],
  ["muebles para proyectos residenciales", "/residencial/ vs /catalogo/residencial/ vs /proyectos/residencial/", "住宅词有零售/地产灵感风险，需保持项目开发商语境。", "/residencial/", "目录页 catálogo；项目页 casos；高端空间页用 apartamentos/villas 但加 proyectos。", "是", "局部", "否", "否", "中", "P1"],
  ["fabricante de muebles / fábrica de muebles", "/ vs /fabrica/", "首页有 China factory 作为总信任，工厂页更适合承接 fabricante/fábrica。", "/fabrica/", "首页保留 proveedor/mobiliario para proyectos，弱化 manufacturer 独占。", "否", "否", "否", "否", "低", "P2"],
  ["solicitar cotización", "/contacto/ vs 全站 CTA", "全站 CTA 使用 cotización 是转化路径，不是抢词；联系页应主承接。", "/contacto/", "其他页作为 CTA 文案即可，不做 SEO 主词。", "否", "否", "否", "否", "低", "P2"],
];

writeInventory();
writeConflicts();
writeSerpPlan();
writeSerpResults();
writePlannerResults();
writeScorecard();
writeKeywordMap();
writeFixList();
writeImplementationPrompt();
writeSummary();

function readCsv(path) {
  const lines = readFileSync(path, "utf8").trim().split(/\r?\n/);
  const header = splitCsv(lines.shift());
  return lines.map((line) => Object.fromEntries(splitCsv(line).map((value, index) => [header[index], value])));
}

function splitCsv(line) {
  const out = [];
  let value = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') quoted = !quoted;
    else if (ch === "," && !quoted) {
      out.push(value);
      value = "";
    } else value += ch;
  }
  out.push(value);
  return out.map((item) => item.trim());
}

function readPlanner(path) {
  const text = readFileSync(path, "utf8");
  const rows = text.split(/\r?\n/).filter(Boolean).map((line) => line.split("\t"));
  const headerIndex = rows.findIndex((row) => row[0] === "Keyword");
  const header = rows[headerIndex];
  return rows.slice(headerIndex + 1)
    .filter((row) => row[0])
    .map((row) => Object.fromEntries(header.map((name, index) => [name, row[index] ?? ""])))
    .map((row) => ({
      keyword: row.Keyword,
      avg: row["Avg. monthly searches"] || "—",
      competition: row.Competition || "—",
      competitionIndex: row["Competition (indexed value)"] || "—",
      bidLow: row["Top of page bid (low range)"] || "—",
      bidHigh: row["Top of page bid (high range)"] || "—",
      currency: row.Currency || "TWD",
      threeMonth: row["Three month change"] || "—",
      yoy: row["YoY change"] || "—",
    }));
}

function extractOfficialUrls(text) {
  const block = text.match(/## 现网 URL[\s\S]*?```text\n([\s\S]*?)```/)?.[1] ?? "";
  return block.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function getRecommendation(url, row) {
  if (sectorMain[url]) return sectorMain[url];
  for (const [regex, main, aux] of categoryDefaults) {
    if (regex.test(url)) return [main, aux];
  }
  if (url.includes("/proyectos/") && url.split("/").filter(Boolean).length >= 3) {
    return [`proyecto de mobiliario ${inferSector(url)}`, ["referencia de entrega", "alcance del proyecto"]];
  }
  return [row.currentKeyword || row.h1 || "需要人工确认", row.metaKeywords ? row.metaKeywords.split(",").slice(0, 3).map((x) => x.trim()) : []];
}

function inferSector(url) {
  if (url.includes("/hoteles/")) return "hotelero";
  if (url.includes("/oficinas/")) return "de oficina";
  if (url.includes("/salud/")) return "hospitalario";
  if (url.includes("/educacion/")) return "escolar";
  if (url.includes("/residencial/")) return "residencial";
  return "comercial";
}

function classifyKeyword(keyword) {
  if (/cat[aá]logo/.test(keyword)) return "产品目录词";
  if (/proyecto|caso|referencia/.test(keyword)) return "案例词";
  if (/cotiz|contacto|whatsapp|enviar/.test(keyword)) return "转化词";
  if (/fabricante|f[aá]brica|producci[oó]n|exportaci[oó]n/.test(keyword)) return "工厂词";
  if (/proveedor/.test(keyword)) return "供应商词";
  if (/habitaciones|sillas|puestos|estaciones|aulas|consultorios|bar|restaurante|conferencias|baño|apartamentos|villas|laboratorios|comedores/.test(keyword)) return "产品细分类词";
  if (/c[oó]mo|qu[eé]|brainstorming|control|embalaje/.test(keyword)) return "信息词";
  return "行业词";
}

function lengthType(keyword) {
  const words = keyword.split(/\s+/).length;
  if (words <= 2) return "短尾";
  if (words <= 4) return "中尾";
  return "长尾";
}

function riskFor(url, mainKeyword) {
  if (/brainstorming|steam|cuidados-y-recuperacion|penthouses|mobiliario-para-conferencias/.test(url)) return "高";
  if (/proyectos\/[^/]+\/[^/]+/.test(url)) return "低";
  if (/catalogo\/[^/]+\/$|\/hoteles\/|\/oficinas\/|\/fabrica\/|\/contacto\//.test(url) && mainKeyword) return "中";
  return "低";
}

function escapeCell(value) {
  return String(value ?? "").replace(/\n/g, "<br>").replace(/\|/g, "\\|");
}

function mdTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(escapeCell).join(" | ")} |`),
  ].join("\n");
}

function writeInventory() {
  const rows = officialUrls.map((url) => {
    const row = inventoryByUrl.get(url) ?? {};
    const [main, aux] = getRecommendation(url, row);
    const conflict = conflictRows.find((c) => c[1].includes(url))?.[1] ?? "";
    return [
      url,
      row.pageType ?? "未构建",
      row.title ?? "",
      row.description ?? "",
      row.h1 ?? "",
      (row.h2 ?? []).slice(0, 5).join("<br>"),
      row.lead ?? "",
      (row.ctas ?? []).slice(0, 6).join("<br>"),
      `${(row.alts ?? []).length} 条；示例：${(row.alts ?? []).slice(0, 4).join(" / ")}`,
      (row.links ?? []).slice(0, 5).join("<br>"),
      row.currentKeyword ?? "",
      row.metaKeywords ?? "",
      main,
      aux.join(", "),
      aux.concat([main]).filter(Boolean).slice(0, 4).join(", "),
      lengthType(main),
      classifyKeyword(main),
      /retail|comprar|precio|carrito/i.test(`${row.title} ${row.description}`) ? "需复核" : "基本符合",
      /brainstorming|STEAM|cuidados|penthouses/i.test(`${row.title} ${row.description} ${url}`) ? "需 SERP 验证" : "基本自然",
      conflict,
      riskFor(url, main),
      riskFor(url, main) !== "低" ? "是" : "否",
      url.includes("privacidad") ? "法律页不做 SEO 主承接" : "",
    ];
  });
  const headers = ["URL", "页面类型", "当前 Title", "当前 Meta Description", "当前 H1", "主要 H2", "首屏核心表达", "CTA 文案", "图片 alt 情况", "主要内链入口", "当前主关键词", "当前辅助关键词", "推荐主关键词", "推荐辅助关键词", "推荐长尾关键词", "关键词长度分类", "搜索意图分类", "是否符合 B2B 项目采购意图", "是否符合拉美西语搜索习惯", "可能冲突页面", "风险等级", "是否需要 SERP 验证", "备注"];
  writeFileSync(join(outDir, "01-seo-keyword-inventory.md"), `# 全站 SEO 关键词审计底表\n\n来源：构建后的 \`dist\` HTML、\`docs/url-list.md\` 正式 URL 清单、页面角色规则。\n\n${mdTable(headers, rows)}\n`);
}

function writeConflicts() {
  const headers = ["冲突关键词", "涉及页面", "当前问题", "推荐主承接页面", "其他页面应降级为哪些辅助词", "是否建议修改 Title", "是否建议修改 H1", "是否建议修改 URL", "是否建议修改导航/内链锚文本", "风险等级", "处理优先级"];
  writeFileSync(join(outDir, "02-seo-keyword-conflicts.md"), `# 关键词冲突与页面抢词风险报告\n\n${mdTable(headers, conflictRows)}\n\n## 旧 URL 说明\n\n\`/catalogo/hoteleria/*\` 与 \`/proyectos/hoteleria/*\` 是历史 redirect/兼容路径，不纳入主关键词承接。注意 \`/proyectos/hoteleria/raffles-hotel/\` 当前 redirect 到 \`/proyectos/hoteles/\`，不是具体案例页。\n`);
}

function writeSerpPlan() {
  const rows = serpRecords.map((r) => [r[0], r[1], r[5] === "Reject" ? "高风险词，需要确认是否偏信息/方法论" : "核心词或冲突词，需要验证商业采购意图", r[5] === "Reject" ? "可能偏信息内容" : r[5] === "P0" ? "核心词 / 冲突词" : "高风险词 / 可能偏零售", r[2], "B2B 厂家 / 供应商 / 产品目录 / 项目案例", "不符合则降级为辅助词、正文场景词或放弃", r[5] === "P0" ? "高" : r[5] === "Reject" ? "高" : "中"]);
  const headers = ["关键词", "所属 URL", "为什么需要验证", "风险类型", "建议验证地区", "理想 SERP 类型", "如果 SERP 不符合预期如何处理", "优先级"];
  writeFileSync(join(outDir, "03-serp-validation-plan.md"), `# SERP 验证计划\n\n本轮计划验证 ${rows.length} 个关键词，不超过 50 个。优先级来自酒店、办公、工厂/供应商、转化词和高风险分类词。\n\n${mdTable(headers, rows)}\n`);
}

function writeSerpResults() {
  const rows = serpRecords.map((r) => [
    r[0],
    r[1],
    r[0],
    r[2],
    r[3],
    r[3].split("、").slice(0, 3).join("、"),
    r[6],
    /主词|主承接|适合作.*主/.test(r[4]) ? "是" : "否/谨慎",
    r[5] === "Reject" ? "否" : "是",
    r[5] === "Reject" || r[5] === "P2" ? "是" : "否",
    r[5] === "Reject" ? "是" : "否",
    replacementFor(r[0]),
    r[1],
    conflictRows.some((c) => c[1].includes(r[1])) ? "是" : "否",
    r[5] === "Reject" ? "高" : r[5] === "P0" ? "中" : "中",
    r[4],
    r.slice(7).map((url) => `[source](${url})`).join(" / "),
  ]);
  const headers = ["关键词", "当前目标页面", "实际搜索关键词", "搜索地区或搜索方式", "观察到的 SERP 结果类型", "代表性结果类型", "搜索意图判断", "是否适合作为主关键词", "是否适合作为辅助关键词", "是否只适合作为正文场景词", "是否建议放弃", "推荐替代关键词", "推荐承接页面", "是否存在页面抢词风险", "风险等级", "处理建议", "证据说明"];
  writeFileSync(join(outDir, "04-serp-validation-results.md"), `# SERP 验证结果\n\n本次验证为可用互联网 SERP 抽样，不等同于 Google Keyword Planner、Ahrefs、Semrush 或 Search Console 的精确数据。本次抽样不声称排名，只判断前页结果类型和搜索意图。\n\n${mdTable(headers, rows)}\n`);
}

function replacementFor(keyword) {
  if (keyword === "brainstorming") return "muebles para espacios colaborativos / mobiliario colaborativo";
  if (keyword.includes("cuidados")) return "mobiliario para residencias de cuidado / mobiliario geriátrico";
  if (keyword.includes("STEAM")) return "mobiliario para laboratorios educativos";
  if (keyword.includes("apartamentos de lujo")) return "muebles para apartamentos de lujo + proyectos residenciales";
  if (keyword.includes("conferencias")) return "muebles para salas de conferencias de hotel";
  return "";
}

function writePlannerResults() {
  const matched = candidateRows.map((row) => ({ ...row, planner: plannerByKeyword.get(row.keyword.toLowerCase()) }));
  const rows = matched.map((row) => [
    row.keyword,
    row.target_url,
    "Mexico, Colombia, Peru, Chile",
    "所有语言（Spanish 筛选在 UI 中不可用/禁用；关键词本身为西语）",
    row.planner?.avg ?? "Pending",
    row.planner?.competition ?? "Pending",
    row.planner?.bidLow ?? "Pending",
    row.planner?.bidHigh ?? "Pending",
    demandLabel(row.planner?.avg),
    commercialLabel(row.keyword),
    finalPriority(row, row.planner),
  ]);
  const headers = ["关键词", "目标 URL", "地区", "语言", "月均搜索量", "竞争程度", "CPC low", "CPC high", "搜索潜力判断", "商业价值判断", "最终优先级"];
  writeFileSync(join(outDir, "07-keyword-planner-results.md"), `# Keyword Planner 结果摘要\n\n已成功进入 Google Ads Keyword Planner 的 \`Get search volume and forecasts\` 路径，未创建广告系列、未设置预算、未发布广告。原始导出文件：\`raw-keyword-planner-export.csv\`；UTF-8 便读版：\`raw-keyword-planner-export-utf8.tsv\`。\n\n限制：地区已设置为 Mexico、Colombia、Peru、Chile；语言控件在当前结果页显示为禁用的“所有语言”，未能切换到 Spanish。因此搜索量/CPC 可作为西语关键词在四国的潜力参考，但不等同于严格 Spanish-only 数据。Google Ads 还提示需要投放广告系列才能获取更详细统计，本轮没有进入投放流程。\n\n${mdTable(headers, rows)}\n`);
}

function writeScorecard() {
  const rows = candidateRows.map((row) => {
    const planner = plannerByKeyword.get(row.keyword.toLowerCase());
    const searchDemandScore = scoreDemand(planner?.avg);
    const b2b = scoreB2B(row.keyword);
    const page = scorePage(row.target_url, row.keyword);
    const commercial = scoreCommercial(row.keyword);
    const opportunity = scoreCompetition(planner?.competition);
    const priority = finalPriority(row, planner);
    return [
      row.keyword,
      row.target_url,
      row.keyword_type,
      row.length_type,
      expectedIntent(row.keyword),
      observedIntent(row.keyword),
      planner?.avg ?? "Pending",
      planner?.competition ?? "Pending",
      planner?.bidLow ?? "Pending",
      planner?.bidHigh ?? "Pending",
      b2b,
      page,
      commercial,
      searchDemandScore,
      opportunity,
      priority,
      reasonFor(row.keyword, planner, priority),
      planner?.avg ? "No" : "Yes",
    ];
  });
  const headers = ["keyword", "target_url", "keyword_type", "length_type", "expected_search_intent", "observed_serp_intent", "avg_monthly_searches", "competition", "top_of_page_bid_low", "top_of_page_bid_high", "b2b_fit_score", "page_fit_score", "commercial_value_score", "search_demand_score", "competition_opportunity_score", "final_priority", "reason", "needs_search_console_followup"];
  writeFileSync(join(outDir, "08-keyword-potential-scorecard.md"), `# 关键词潜力评分表\n\n评分规则：搜索需求 25%，B2B 采购意图 25%，页面匹配度 20%，商业转化价值 20%，竞争机会 10%。由于 Keyword Planner 语言筛选未能切到 Spanish，搜索量只作为四国西语关键词参考，不作为绝对决策。\n\n${mdTable(headers, rows)}\n`);
}

function expectedIntent(keyword) {
  return classifyKeyword(keyword);
}

function observedIntent(keyword) {
  const serp = serpRecords.find((r) => r[0] === keyword);
  if (serp) return serp[3];
  if (/brainstorming/.test(keyword)) return "方法论/协作内容为主";
  if (/cotiz/.test(keyword)) return "转化表单/询价";
  if (/cat[aá]logo/.test(keyword)) return "目录/供应商目录";
  return "未单独 SERP 抽样，按 Keyword Planner + 页面角色判断";
}

function scoreDemand(avg) {
  const n = Number(avg);
  if (!avg || Number.isNaN(n)) return 1;
  if (n >= 10000) return 5;
  if (n >= 1000) return 4;
  if (n >= 100) return 3;
  if (n >= 10) return 2;
  return 1;
}

function scoreB2B(keyword) {
  if (/proyecto|proveedor|fabricante|f[aá]brica|cotiz|hospitalario|hotelero|corporativo|escolar|por volumen|empresas/.test(keyword)) return 5;
  if (/cat[aá]logo|mobiliario|oficina|hotel|escuela|cl[ií]nica/.test(keyword)) return 4;
  if (/apartamentos|villas|lujo|brainstorming/.test(keyword)) return 2;
  return 3;
}

function scorePage(url, keyword) {
  if (url.includes("brainstorming") && keyword === "brainstorming") return 1;
  if (url.includes("contacto") && /cotiz|contacto|whatsapp|enviar|proveedor/.test(keyword)) return 5;
  if (url.includes("fabrica") && /fabricante|f[aá]brica|exportaci[oó]n|calidad|proveedor/.test(keyword)) return 5;
  if (url.includes("catalogo") && /cat[aá]logo|habitaciones|sillas|puestos|mobiliario|muebles|estaciones|aulas/.test(keyword)) return 5;
  if (url.includes("proyectos") && /proyecto|caso|referencia/.test(keyword)) return 5;
  return 4;
}

function scoreCommercial(keyword) {
  if (/cotiz|proveedor|fabricante|f[aá]brica|por volumen|empresas|proyectos/.test(keyword)) return 5;
  if (/cat[aá]logo|muebles|mobiliario/.test(keyword)) return 4;
  if (/brainstorming|control|embalaje/.test(keyword)) return 2;
  return 3;
}

function scoreCompetition(comp) {
  if (comp === "低") return 5;
  if (comp === "中") return 3;
  if (comp === "高") return 2;
  return 3;
}

function finalPriority(row, planner) {
  if (row.priority === "Reject") return "Reject";
  if (/brainstorming$/.test(row.keyword)) return "Reject";
  const demand = scoreDemand(planner?.avg);
  const b2b = scoreB2B(row.keyword);
  const page = scorePage(row.target_url, row.keyword);
  const commercial = scoreCommercial(row.keyword);
  const weighted = demand * 0.25 + b2b * 0.25 + page * 0.2 + commercial * 0.2 + scoreCompetition(planner?.competition) * 0.1;
  if (row.priority === "P0" && weighted >= 3.4) return "P0";
  if (weighted >= 3.2) return "P1";
  if (weighted >= 2.4) return "P2";
  return "Reject";
}

function demandLabel(avg) {
  const score = scoreDemand(avg);
  if (score >= 4) return "高";
  if (score === 3) return "中";
  if (score === 2) return "低但可用";
  return "极低或无数据";
}

function commercialLabel(keyword) {
  const score = scoreCommercial(keyword);
  if (score >= 5) return "高";
  if (score >= 4) return "中高";
  if (score >= 3) return "中";
  return "低";
}

function reasonFor(keyword, planner, priority) {
  if (priority === "Reject") return "SERP 或词义不适合作商业页面主词";
  if (!planner?.avg) return "Keyword Planner 无量或未返回，需 Search Console 后续观察";
  return `Planner 返回 ${planner.avg}，竞争 ${planner.competition || "—"}；结合页面角色和 B2B 意图评估`;
}

function writeKeywordMap() {
  const focus = ["/", "/hoteles/", "/catalogo/hoteles/", "/proyectos/hoteles/", "/oficinas/", "/catalogo/oficinas/", "/catalogo/oficinas/colaboracion-y-brainstorming/", "/proyectos/oficinas/", "/fabrica/", "/contacto/", "/catalogo/hoteles/habitaciones/", "/catalogo/oficinas/puestos-de-trabajo/", "/catalogo/oficinas/sillas-de-oficina/", "/catalogo/hoteles/mobiliario-para-conferencias/", "/catalogo/educacion/laboratorios-y-steam/", "/catalogo/salud/cuidados-y-recuperacion/", "/catalogo/residencial/penthouses-y-apartamentos-de-lujo/"];
  const rows = focus.map((url) => {
    const row = inventoryByUrl.get(url) ?? {};
    const [main, aux] = getRecommendation(url, row);
    const priority = url.includes("brainstorming") || url.includes("catalogo/oficinas/") ? "上线前必须改" : /conferencias|cuidados|steam|penthouses/.test(url) ? "上线后可改" : "不建议改";
    return [
      url,
      row.pageType ?? "",
      main,
      aux.join(", "),
      aux.concat(main).join(", "),
      titleFor(url, main),
      h1For(url, main),
      metaFor(url, main, aux),
      anchorFor(url, main),
      url.includes("brainstorming") ? "建议观察后再改 URL；若上线前未收录，可考虑 /catalogo/oficinas/espacios-colaborativos/" : "否",
      url.includes("brainstorming") ? "可把可见导航/卡片改为 Espacios colaborativos" : "否",
      priority,
      mapReason(url),
    ];
  });
  const headers = ["URL", "页面角色", "最终推荐主关键词", "最终推荐辅助关键词", "最终推荐长尾词", "推荐 Title", "推荐 H1", "推荐 Meta Description", "推荐内链锚文本", "是否建议改 URL", "是否建议改导航名称", "修改优先级", "理由"];
  writeFileSync(join(outDir, "09-page-keyword-map-final.md"), `# 页面级最终关键词分配建议\n\n${mdTable(headers, rows)}\n`);
}

function titleFor(url, main) {
  if (url === "/") return "Fabricante de muebles comerciales para proyectos | Hymueble";
  if (url === "/catalogo/oficinas/") return "Catálogo de muebles para oficinas | Hymueble";
  if (url.includes("brainstorming")) return "Muebles para espacios colaborativos de oficina | Hymueble";
  if (url.includes("conferencias")) return "Muebles para salas de conferencias de hotel | Hymueble";
  return `${capitalize(main)} | Hymueble`;
}

function h1For(url, main) {
  if (url === "/catalogo/oficinas/") return "Catálogo de muebles para oficinas";
  if (url.includes("brainstorming")) return "Muebles para espacios colaborativos de oficina";
  if (url.includes("conferencias")) return "Muebles para salas de conferencias de hotel";
  return capitalize(main);
}

function metaFor(url, main, aux) {
  return `${capitalize(main)} para compras por proyecto, con referencias visuales, fabricación directa, revisión de materiales y cotización según cantidades, acabados y alcance.`;
}

function anchorFor(url, main) {
  if (url.includes("catalogo")) return `Ver ${main}`;
  if (url.includes("proyectos")) return `Ver ${main}`;
  if (url === "/contacto/") return "Solicitar cotización de muebles";
  return capitalize(main);
}

function mapReason(url) {
  if (url.includes("brainstorming")) return "`brainstorming` tiene volumen pero SERP de método/colaboración, no de compra; conviene no usarlo como主词。";
  if (url.includes("conferencias")) return "SERP favorece `salas de conferencias de hotel`; el término actual es usable pero demasiado genérico.";
  if (url.includes("catalogo/oficinas/")) return "H1 actual es menos claro que Title y Keyword Planner muestra demanda en `catálogo de muebles de oficina`.";
  return "分配遵循页面角色，避免行业页、目录页和案例页互抢。";
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function writeFixList() {
  const rows = [
    ["P0", "`/catalogo/oficinas/` H1 弱化为 `Catálogo de oficinas...`", "/catalogo/oficinas/", "Title/Planner/SERP 都支持 `catálogo de muebles de oficina(s)`，H1 不够明确。", "改 H1 为 `Catálogo de muebles para oficinas`，Meta/Title 可保持或微调复数。", "低，仅 SEO 文案", "低", "否"],
    ["P0", "`brainstorming` 不适合作主 SEO 词", "/catalogo/oficinas/colaboracion-y-brainstorming/", "SERP 和 Planner 显示量大但偏方法论/协作内容；家具采购意图弱。", "Title/H1 改为 `Muebles para espacios colaborativos de oficina`；`brainstorming` 降为正文场景词。URL 暂不直接改。", "中，涉及目录小类词面", "中", "URL 需人工确认"],
    ["P1", "酒店会议家具词偏泛", "/catalogo/hoteles/mobiliario-para-conferencias/", "SERP 更支持 `salas de conferencias de hotel`，泛 `conferencias` 会和办公/活动混淆。", "Title/H1 改为 `Muebles para salas de conferencias de hotel`，保留 `mobiliario para conferencias hoteleras` 辅助。", "低", "中", "否"],
    ["P1", "首页与工厂页 factory/fabricante 词略重叠", "/ 与 /fabrica/", "首页可作为总定位，工厂页更适合承接 fabricante/fábrica。", "不急改代码；未来首页 meta keywords 可弱化 fabricante，/fabrica/ 强化 fabricante en China。", "低", "低", "否"],
    ["P1", "住宅高端词可能偏零售/灵感", "/catalogo/residencial/penthouses-y-apartamentos-de-lujo/", "SERP 有 Pinterest/设计灵感/豪宅内容，B2B 项目采购意图不稳。", "H1/Meta 加 `proyectos residenciales` 或 `unidades modelo` 限定。", "低", "中", "否"],
    ["P2", "`STEAM` 可用但不宜独占主词", "/catalogo/educacion/laboratorios-y-steam/", "SERP 支持 aula STEAM，但更多是教育理念/产品包。", "主词改为 `mobiliario para laboratorios educativos`，STEAM 辅助保留。", "低", "中", "否"],
    ["P2", "`cuidados y recuperación` 语义偏宽", "/catalogo/salud/cuidados-y-recuperacion/", "SERP 更自然的是 geriátrico/residencias/sociosanitario。", "后续根据 GSC 决定是否改 Title/H1 为 `mobiliario para residencias de cuidado`。", "低", "中", "否"],
  ];
  const headers = ["优先级", "问题", "涉及 URL", "为什么是问题", "建议修改", "影响范围", "风险等级", "是否需要人工确认"];
  writeFileSync(join(outDir, "10-prelaunch-seo-fix-list.md"), `# 上线前 SEO 必改清单\n\n${mdTable(headers, rows)}\n`);
}

function writeImplementationPrompt() {
  writeFileSync(join(outDir, "11-codex-implementation-prompt.md"), `# 下一轮 Codex 实施 Prompt\n\n## 修改范围\n\n只执行本审计确认的低风险 SEO 文案修改，不重新发散关键词策略。\n\n## 允许修改的文件\n\n- \`src/pages/catalogo/[sector].astro\` 或对应数据字段：只改 \`/catalogo/oficinas/\` 可见 H1/标题表达。\n- \`src/data/catalogReferences.ts\`：只改 office collaboration 小类、hotel conference 小类的 SEO title/subtitle/keywords/alt 可见词面；不得改 manifest-facing \`catalogInterest\`，除非同步修改 catalog manifest 并跑 QA。\n- \`src/pages/catalogo/hoteles/[category].astro\`：只改 \`mobiliario-para-conferencias\` 的 \`seoTitle/subtitle/keywords/supportAlt\`。\n\n## 禁止修改的内容\n\n- 不改 URL slug，除非用户单独批准 redirect 方案。\n- 不新增页面、不删页面、不改主导航结构。\n- 不改联系方式、客户事实、案例事实、项目名称、表单逻辑、广告账户。\n- 不大段重写正文，不加入价格、库存、购物车、SKU 或零售语义。\n\n## 逐项修改清单\n\n1. \`/catalogo/oficinas/\`：H1 从弱表达改为 \`Catálogo de muebles para oficinas\`。\n2. \`/catalogo/oficinas/colaboracion-y-brainstorming/\`：Title/H1 主词改为 \`Muebles para espacios colaborativos de oficina\`；\`brainstorming\` 只保留在正文/辅助 keywords。\n3. \`/catalogo/hoteles/mobiliario-para-conferencias/\`：Title/H1 改为 \`Muebles para salas de conferencias de hotel\`；辅助词保留 \`mobiliario para conferencias hoteleras\`。\n4. 可选 P1：住宅、教育、健康高风险分类页只做 Title/H1 小幅明确，不改 URL。\n\n## 测试命令\n\n\`\`\`bash\npnpm build\npnpm qa:static\npnpm qa:catalogs\n\`\`\`\n\n如果 visible copy 改动较多，再运行：\n\n\`\`\`bash\npnpm qa:browser\n\`\`\`\n\n## 验收标准\n\n- 构建通过，0 errors / 0 warnings。\n- 静态 QA 和 catalog QA 通过。\n- 不出现中文残留、未闭合标签、manifest interest mismatch。\n- \`brainstorming\` 不再作为该页 Title/H1 主词。\n- \`/catalogo/oficinas/\` H1 明确包含 \`muebles para oficinas\`。\n- 不产生 URL、导航和联系信息变化。\n\n## 回滚要求\n\n所有修改必须集中在上述文件；如 QA 失败，先 revert 本批修改，不回滚用户已有未跟踪文件或无关改动。\n`);
}

function writeSummary() {
  writeFileSync(join(outDir, "12-executive-summary.md"), `# 执行摘要\n\n## 本次完成了什么\n\n- 已构建站点并从 93 个静态 HTML 输出中抽取 SEO 字段；正式 inventory 按 \`docs/url-list.md\` 的 82 个现网 URL 输出。\n- 已完成页面角色判断、当前关键词反推、推荐关键词重分配、页面抢词检查。\n- 已完成 ${serpRecords.length} 个关键词的互联网 SERP 抽样验证。\n- 已生成 88 个 Keyword Planner 批量查询词，并成功导出 Google Ads Keyword Planner 历史指标。\n- 未启用广告、未创建 campaign、未设置预算、未点击 \`制作广告系列\`。\n\n## 关键问题\n\n1. 酒店和办公三页体系分工基本正确，但行业页、目录页、案例页之间仍重复使用大词，需要靠 Title/H1/锚文本明确分工。\n2. \`/catalogo/oficinas/\` 的 H1 不如 Title 清楚，建议上线前改为 \`Catálogo de muebles para oficinas\`。\n3. \`brainstorming\` 是最高风险词：Keyword Planner 有量，但 SERP 主要偏方法论/协作空间内容，不适合作家具采购商业页主词。\n4. \`mobiliario para conferencias\` 可用，但应更具体为 \`muebles para salas de conferencias de hotel\`。\n5. \`STEAM\`、\`cuidados y recuperación\`、\`penthouses\` 不是本轮 P0，但均应上线后观察 GSC，再决定是否微调 Title/H1 或 URL。\n\n## 哪些问题最影响上线前 SEO\n\n- P0：办公目录 H1 与主词不完全对齐。\n- P0：office collaboration 小类把 \`brainstorming\` 放在 URL/keywords/语义中，可能吸引非采购流量。\n- P1：酒店会议家具页主词过泛，可能与办公会议室或活动家具混淆。\n\n## 不适合作主关键词的词\n\n- \`brainstorming\`：可做正文场景词，不做 Title/H1 主词。\n- \`cuidados y recuperación\`：语义偏宽，建议换成护理/康复/照护空间更明确表达。\n- \`penthouses\` 单独使用：容易偏地产/灵感，不适合作 B2B 家具主词。\n- \`mobiliario para conferencias\` 单独使用：可用但偏泛，建议加 hotel/salas/eventos 限定。\n\n## 页面抢词风险\n\n- \`/hoteles/\` 应主承接 \`muebles para hoteles\`，\`/catalogo/hoteles/\` 用 \`catálogo de muebles para hoteles\`，\`/proyectos/hoteles/\` 用 \`proyectos de mobiliario hotelero\`。\n- \`/oficinas/\` 应主承接 \`muebles para oficinas\`，\`/catalogo/oficinas/\` 用 \`catálogo de muebles para oficinas\`，\`/proyectos/oficinas/\` 用 \`proyectos de mobiliario de oficina\`。\n- \`/\` 与 \`/fabrica/\` 的 factory/manufacturer 词有轻微重叠，但不是 P0；工厂页更适合强承接。\n\n## 建议改 Title / H1 / Meta 的页面\n\n- \`/catalogo/oficinas/\`：H1 上线前建议改。\n- \`/catalogo/oficinas/colaboracion-y-brainstorming/\`：Title/H1/Meta 上线前建议改，URL 暂不直接改。\n- \`/catalogo/hoteles/mobiliario-para-conferencias/\`：Title/H1 上线后 30 天内可改。\n- \`/catalogo/educacion/laboratorios-y-steam/\`、\`/catalogo/salud/cuidados-y-recuperacion/\`、\`/catalogo/residencial/penthouses-y-apartamentos-de-lujo/\`：上线后结合 GSC 观察。\n\n## URL 建议\n\n- 不建议本轮直接改 URL。\n- \`/catalogo/oficinas/colaboracion-y-brainstorming/\` 可作为候选 URL 改为 \`/catalogo/oficinas/espacios-colaborativos/\`，但需要人工确认上线状态、redirect、内链、sitemap、catalog manifest 影响。\n\n## SERP 验证结论\n\n- 酒店和办公核心词有真实 B2B/供应商/目录结果，但也混入 retail/marketplace，因此页面文案必须保持项目、批量、定制、工厂和 RFQ 语境。\n- 工厂词适合 \`/fabrica/\`，不建议首页过度抢 fabricante/fábrica。\n- 转化词适合 \`/contacto/\`；其他页面保留 cotización CTA 不构成 SEO 抢词。\n\n## Keyword Planner 潜力检查结论\n\n- 成功查询并导出 87 个关键词历史指标，原始文件已保存。\n- 地区：Mexico、Colombia、Peru、Chile。\n- 语言：当前 UI 显示 \`所有语言\` 且不可编辑；关键词本身为西语，因此数据可用于方向参考，但不是严格 Spanish-only。\n- Google Ads 提示更详细统计需要投放广告系列，本轮没有进入投放流程。\n- 高量但低匹配词：\`brainstorming\`。高匹配词包括 \`mobiliario de oficina\`、\`mobiliario escolar\`、\`catálogo de muebles de oficina\`、\`puestos de trabajo para oficina\`、\`mobiliario hospitalario\` 等。\n\n## 当前是否建议上线\n\n从关键词结构看，可以上线，但建议先处理两个 P0 低风险文案问题：\`/catalogo/oficinas/\` H1 和 collaboration/brainstorming 小类主词。表单系统、真实联系方式等 launch blockers 不属于本轮 SEO 审计结论。\n\n## 上线后 Search Console 观察重点\n\n- \`muebles para hoteles\` vs \`catálogo de muebles para hoteles\` vs \`proyectos de mobiliario hotelero\` 的展示 URL 是否分清。\n- \`muebles para oficinas\`、\`catálogo de muebles de oficina\`、\`puestos de trabajo para oficina\`、\`estaciones de trabajo para oficina\` 的展示和点击。\n- \`brainstorming\` 是否带来无效曝光。\n- \`STEAM\`、\`cuidados\`、\`penthouses\` 是否产生非采购流量。\n\n## 下一步建议\n\n执行 \`11-codex-implementation-prompt.md\` 中的 P0/P1 小范围 Title/H1/Meta 修改，然后跑 \`pnpm build\`、\`pnpm qa:static\`、\`pnpm qa:catalogs\`。\n`);
}
