# 页面抢词检查

## 高风险抢词

| 风险组 | 可能互抢页面 | 应分配的主词 | 处理建议 | 优先级 |
| --- | --- | --- | --- | --- |
| 酒店行业/目录/案例 | /hoteles/; /catalogo/hoteles/; /proyectos/hoteles/ | /hoteles/ = muebles para hoteles; /catalogo/hoteles/ = catálogo de muebles para hoteles; /proyectos/hoteles/ = proyectos de mobiliario hotelero | Title、H1、面包屑和内链锚文本要明确分工；案例页不要抢主词 | P0 |
| 办公行业/目录/案例 | /oficinas/; /catalogo/oficinas/; /proyectos/oficinas/ | /oficinas/ = muebles para oficina; /catalogo/oficinas/ = catálogo de muebles de oficina; /proyectos/oficinas/ = proyectos de mobiliario de oficina | 办公目录 H1 上线前对齐 catálogo 词 | P0 |
| brainstorming 错配 | /catalogo/oficinas/colaboracion-y-brainstorming/ | muebles para espacios colaborativos / mobiliario colaborativo | 不用 brainstorming 做 Title/H1 主词；只保留为正文场景词 | P0 |
| 工厂词 | / 与 /fabrica/ | /fabrica/ = fabricante de muebles en China; / = fabricante de muebles comerciales | 首页做品牌/总入口；工厂页承接 China/fábrica/fabricante 语义 | P1 |
| 医疗行业/目录 | /salud/ 与 /catalogo/salud/ | /salud/ = mobiliario hospitalario; /catalogo/salud/ = catálogo de mobiliario hospitalario | 医疗目录页不要抢行业页主词；用 por área / por espacio 分流 | P1 |
| 教育行业/目录 | /educacion/ 与 /catalogo/educacion/ | /educacion/ = mobiliario escolar; /catalogo/educacion/ = catálogo de mobiliario escolar | 教育目录页承接分类，不抢行业页 | P1 |
| 住宅项目/零售灵感 | /residencial/ 与 /catalogo/residencial/ | /residencial/ = muebles para proyectos residenciales; /catalogo/residencial/ = catálogo residencial para proyectos | 必须加 proyectos/desarrollos/unidades modelo，避免泛家居零售 | P2 |
| 转化词 | /contacto/ 与所有行业页 | /contacto/ = solicitar cotización de muebles | 其他页面只用 CTA，不把 cotización 做页面主词 | P1 |
| 资源内容 | /recursos/; /recursos/blog/; /fabrica/ | 资源页做 guías/control/embalaje；工厂页做 fabricante/fábrica | 内容页支撑信任，不抢商业主词 | P2 |

## URL 改动判断

- 本轮不建议直接改 URL。
- /catalogo/oficinas/colaboracion-y-brainstorming/ 可作为后续候选改为 /catalogo/oficinas/espacios-colaborativos/，但需要人工确认上线状态、redirect、内链、sitemap、catalogReferences 影响。
- 酒店、办公、教育、医疗、住宅现有行业/目录层级可以承接当前关键词，不需要新增 /soluciones/ 或拆站。
