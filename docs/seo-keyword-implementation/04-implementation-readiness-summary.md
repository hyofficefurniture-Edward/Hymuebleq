# Implementation readiness summary

## 是否可以进入源码应用阶段

可以进入，但建议下一轮只执行 P0 / P1，且只做字段级、小范围文案应用。

下一轮允许范围：

- Title
- Meta Description
- H1
- 必要 H2
- 少量首屏关键词前置
- CTA 附近文案
- 图片 alt
- 内链锚文本

下一轮禁止范围：

- 不改 URL。
- 不新增页面。
- 不删除页面。
- 不改主导航结构。
- 不大面积重写正文。
- 不修改联系方式。
- 不修改案例事实。
- 不重新做关键词研究。

## 可以进入下一轮源码应用的页面

### P0

| 页面 | 原因 | 执行重点 |
| --- | --- | --- |
| `/` | 目标文件列为 P0 核心页；需要保持品牌总入口，但不抢酒店、办公或工厂页主词 | Title/H1/Meta/首屏自然前置 `fabricante de muebles comerciales` |
| `/hoteles/` | 酒店行业主词证据强，`muebles para hoteles` 有足够需求和页面匹配 | Title/H1/Meta/首屏前置 `muebles para hoteles` |
| `/catalogo/hoteles/` | 目录页应明确承接 `catálogo de muebles para hoteles` | Title/H1/Meta/内链锚文本明确 catalog role |
| `/catalogo/hoteles/habitaciones/` | 客房页可用精准长尾承接产品组 | H2 加 camas/cabeceras/closets，但主词保持 room package |
| `/catalogo/hoteles/muebles-exteriores/` | 高搜索户外/露台词有机会，但必须 hotel 化 | Title/H1/Meta 使用 `muebles para exteriores de hotel` |
| `/catalogo/hoteles/muebles-para-restaurante/` | 餐厅家具搜索需求强，适合小类页承接 | 主词 hotel-qualified，泛 restaurant terms 放 H2 |
| `/oficinas/` | 旧主词需校准为 `muebles de oficina` | Title/H1 用 `Muebles de oficina para proyectos` |
| `/catalogo/oficinas/` | 目录页必须承接 `catálogo de muebles de oficina` | H1/Title/内链锚文本对齐 |
| `/catalogo/oficinas/colaboracion-y-brainstorming/` | `brainstorming` 意图错配，必须降级 | Title/H1/Meta 改为 `muebles para espacios colaborativos de oficina` |
| `/contacto/` | 转化页主词清晰 | 保持低压力 `solicitar cotización de muebles` 和 5 datos 语义 |

### P1

| 页面 | 原因 | 执行重点 |
| --- | --- | --- |
| `/catalogo/hoteles/mobiliario-para-conferencias/` | 需要避免与办公会议室抢词 | 加 hotel/eventos/banquetes 限定 |
| `/catalogo/hoteles/muebles-para-bar/` | 酒吧词有机会但泛意图强 | 保持 `muebles para bar de hotel` |
| `/catalogo/oficinas/puestos-de-trabajo/` | Planner 支持，页面匹配好 | Title/H1/Meta 保持 puestos/estaciones |
| `/catalogo/oficinas/salas-de-reunion/` | 办公会议室词可承接 | 用 `salas de juntas`，避免 hotel conference |
| `/fabrica/` | 工厂页关键词需从 China-only 校准为 a medida | 主词 `fabricante de muebles a medida`，China 辅助 |
| `/educacion/` | `mobiliario escolar` 真实需求 | H2 分流 aula/pupitres/sillas/biblioteca |
| `/catalogo/educacion/` | 目录分流价值高 | 用 catálogo + school space/product groups |
| `/salud/` | `mobiliario hospitalario` 有需求 | 避免医疗器械电商语义 |
| `/catalogo/salud/` | 医疗目录需要 consultorio/enfermería/habitación 分流 | 保持 catálogo role |

## 需要人工确认的页面

| 页面 | 原因 |
| --- | --- |
| `/catalogo/` | 目标文件提到目录聚合页角色，但最新关键词地图没有把它列为强制执行页；可先标为 Needs manual review。 |
| `/proyectos/` | 目标文件提到案例聚合页角色，但最新关键词地图没有给出完整执行依据；可先标为 Needs manual review。 |
| `/residencial/` | Discover 未返回强数据，泛家装/豪宅灵感风险高。 |
| `/catalogo/residencial/` | 同上，适合后续内容扩展，不适合当前 P0/P1 执行。 |
| `/catalogo/hoteles/muebles-de-bano/` | 精准但搜索量弱，适合 GSC 观察后再小改。 |
| `/catalogo/oficinas/oficinas-ejecutivas/` | 页面匹配好但搜索量证据弱，非 P0。 |
| `/catalogo/oficinas/recepcion-y-salas-de-espera/` | 容易与酒店/医疗接待场景混，需要人工确认具体图册/页面语义。 |
| `/catalogo/oficinas/sillas-de-oficina/` | 高搜索但零售风险强，暂不放入 P0/P1。 |

## 不建议本轮修改的页面

- `/proyectos/hoteles/`
- `/proyectos/oficinas/`
- `/residencial/`
- `/catalogo/residencial/`
- `/recursos/`
- `/recursos/blog/`
- `/recursos/videos/`
- `/catalogo/`
- `/proyectos/`

原因：这些页面主要承担 proof、销售辅助、内容扩展或聚合入口，不应为了看起来完整而抢行业/目录主词。

## 只建议上线后通过 Search Console 观察的页面

- `/proyectos/hoteles/`
- `/catalogo/hoteles/muebles-de-bano/`
- `/catalogo/oficinas/oficinas-ejecutivas/`
- `/catalogo/oficinas/recepcion-y-salas-de-espera/`
- `/catalogo/oficinas/sillas-de-oficina/`
- `/residencial/`
- `/catalogo/residencial/`
- `/recursos/`
- `/recursos/blog/`
- `/recursos/videos/`

观察重点：

- 展示 URL 是否与页面角色一致。
- 是否出现零售、价格、二手、本地城市、品牌导航等无效 query。
- 产品小类页是否有足够细分曝光支持后续 H2/FAQ 微调。

## 不能使用的关键词

- `brainstorming` as Title/H1 main。
- `lluvia de ideas` as SEO main。
- `muebles de hotel usados`。
- `mobiliario hotel segunda mano`。
- `muebles para motel`。
- `mueble para motel`。
- `sillas para restaurante` as page main。
- `mesas para restaurante` as page main。
- `sillas para bar` as page main。
- `muebles para exteriores` as page main。
- `sillas de oficina` as industry page main。
- `escritorio` / `sillas de escritorio` / `silla ergonomica` as B2B page main。
- `mobiliario escolar precios` / `pupitres escolares precio`。
- `muebles de lujo` / `decoración` / `inspiración` as residential main。
- `precio`, `barato`, `segunda mano`, `stock`, `carrito`, `SKU`, brand-navigation, city-only terms。

## 高搜索词被拒绝或降级的原因

| 词 | 处理 | 原因 |
| --- | --- | --- |
| `brainstorming` | Content-only | SERP 偏方法论，不是家具采购。 |
| `sillas para restaurante` | Secondary / H2 only | 搜索量高但泛餐饮/零售，需要 `de hotel` 限定。 |
| `mesas para restaurante` | Secondary / H2 only | 同上。 |
| `sillas de terraza` | Secondary / H2 / alt | 搜索量高但庭院/零售强，需要 hotel terrace context。 |
| `muebles para exteriores` | Secondary only | 户外泛词零售强，不能直接做酒店页主词。 |
| `sillas de oficina` | Small category only | 零售和价格竞争强，不适合 `/oficinas/` 主词。 |
| `silla ergonomica` | Reject for current pages | 单件零售/电商强。 |
| `muebles de lujo` | Reject / content-only with caution | 容易变成豪宅灵感或零售家具。 |

## 低搜索词被保留的原因

| 词 | 页面 | 保留位置 | 原因 |
| --- | --- | --- | --- |
| `proveedor de muebles para hoteles` | `/hoteles/` | Secondary / body / CTA support | B2B 供应商意图强。 |
| `fabricante de muebles para hoteles` | `/hoteles/` / `/fabrica/` | Secondary / internal link | 工厂与采购意图强。 |
| `mobiliario hotelero a medida` | `/hoteles/` | Secondary / FAQ | 项目定制价值高。 |
| `muebles para habitaciones de hotel` | `/catalogo/hoteles/habitaciones/` | Main | 页面匹配极强。 |
| `muebles para salas de conferencia de hotel` | 酒店会议页 | Main | 防止与办公会议室抢词。 |
| `muebles para espacios colaborativos` | 协作办公页 | Main | 替代错误的 `brainstorming`。 |
| `fabricante de muebles a medida` | `/fabrica/` | Main | 工厂页角色匹配强。 |
| `cotizar proyecto de mobiliario` | `/contacto/` | Secondary / CTA | 转化意图强。 |

## 是否建议下一轮只执行 P0 / P1

建议。下一轮不要一次性改全站所有页面。

推荐顺序：

1. P0：酒店行业/目录/高机会细分类、办公行业/目录/协作页、联系页。
2. P1：酒店会议/酒吧、办公工作站/会议室、工厂、教育、医疗。
3. P2：住宅、资源、案例、聚合页等上线后根据 GSC 再定。

## 是否建议上线前先做关键词应用

建议上线前先做 P0。

理由：

- P0 中存在明确错配项：`brainstorming` 不能做主 SEO 词。
- `/catalogo/oficinas/` 与 `/oficinas/` 需要清楚区分行业页和目录页。
- 酒店页组已有足够 Keyword Planner + SERP + 页面角色证据，可以做字段级校准。
- 所有建议都可以通过小范围 Title/H1/Meta/H2/alt/anchor 完成，不需要改 URL 或大改正文。
