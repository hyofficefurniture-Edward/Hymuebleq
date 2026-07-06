# 执行摘要

## 本次完成了什么

- 已构建站点并从 93 个静态 HTML 输出中抽取 SEO 字段；正式 inventory 按 `docs/url-list.md` 的 82 个现网 URL 输出。
- 已完成页面角色判断、当前关键词反推、推荐关键词重分配、页面抢词检查。
- 已完成 23 个关键词的互联网 SERP 抽样验证。
- 已生成 88 个 Keyword Planner 批量查询词，并成功导出 Google Ads Keyword Planner 历史指标。
- 未启用广告、未创建 campaign、未设置预算、未点击 `制作广告系列`。

## 关键问题

1. 酒店和办公三页体系分工基本正确，但行业页、目录页、案例页之间仍重复使用大词，需要靠 Title/H1/锚文本明确分工。
2. `/catalogo/oficinas/` 的 H1 不如 Title 清楚，建议上线前改为 `Catálogo de muebles para oficinas`。
3. `brainstorming` 是最高风险词：Keyword Planner 有量，但 SERP 主要偏方法论/协作空间内容，不适合作家具采购商业页主词。
4. `mobiliario para conferencias` 可用，但应更具体为 `muebles para salas de conferencias de hotel`。
5. `STEAM`、`cuidados y recuperación`、`penthouses` 不是本轮 P0，但均应上线后观察 GSC，再决定是否微调 Title/H1 或 URL。

## 哪些问题最影响上线前 SEO

- P0：办公目录 H1 与主词不完全对齐。
- P0：office collaboration 小类把 `brainstorming` 放在 URL/keywords/语义中，可能吸引非采购流量。
- P1：酒店会议家具页主词过泛，可能与办公会议室或活动家具混淆。

## 不适合作主关键词的词

- `brainstorming`：可做正文场景词，不做 Title/H1 主词。
- `cuidados y recuperación`：语义偏宽，建议换成护理/康复/照护空间更明确表达。
- `penthouses` 单独使用：容易偏地产/灵感，不适合作 B2B 家具主词。
- `mobiliario para conferencias` 单独使用：可用但偏泛，建议加 hotel/salas/eventos 限定。

## 页面抢词风险

- `/hoteles/` 应主承接 `muebles para hoteles`，`/catalogo/hoteles/` 用 `catálogo de muebles para hoteles`，`/proyectos/hoteles/` 用 `proyectos de mobiliario hotelero`。
- `/oficinas/` 应主承接 `muebles para oficinas`，`/catalogo/oficinas/` 用 `catálogo de muebles para oficinas`，`/proyectos/oficinas/` 用 `proyectos de mobiliario de oficina`。
- `/` 与 `/fabrica/` 的 factory/manufacturer 词有轻微重叠，但不是 P0；工厂页更适合强承接。

## 建议改 Title / H1 / Meta 的页面

- `/catalogo/oficinas/`：H1 上线前建议改。
- `/catalogo/oficinas/colaboracion-y-brainstorming/`：Title/H1/Meta 上线前建议改，URL 暂不直接改。
- `/catalogo/hoteles/mobiliario-para-conferencias/`：Title/H1 上线后 30 天内可改。
- `/catalogo/educacion/laboratorios-y-steam/`、`/catalogo/salud/cuidados-y-recuperacion/`、`/catalogo/residencial/penthouses-y-apartamentos-de-lujo/`：上线后结合 GSC 观察。

## URL 建议

- 不建议本轮直接改 URL。
- `/catalogo/oficinas/colaboracion-y-brainstorming/` 可作为候选 URL 改为 `/catalogo/oficinas/espacios-colaborativos/`，但需要人工确认上线状态、redirect、内链、sitemap、catalog manifest 影响。

## SERP 验证结论

- 酒店和办公核心词有真实 B2B/供应商/目录结果，但也混入 retail/marketplace，因此页面文案必须保持项目、批量、定制、工厂和 RFQ 语境。
- 工厂词适合 `/fabrica/`，不建议首页过度抢 fabricante/fábrica。
- 转化词适合 `/contacto/`；其他页面保留 cotización CTA 不构成 SEO 抢词。

## Keyword Planner 潜力检查结论

- 成功查询并导出 87 个关键词历史指标，原始文件已保存。
- 地区：Mexico、Colombia、Peru、Chile。
- 语言：当前 UI 显示 `所有语言` 且不可编辑；关键词本身为西语，因此数据可用于方向参考，但不是严格 Spanish-only。
- Google Ads 提示更详细统计需要投放广告系列，本轮没有进入投放流程。
- 高量但低匹配词：`brainstorming`。高匹配词包括 `mobiliario de oficina`、`mobiliario escolar`、`catálogo de muebles de oficina`、`puestos de trabajo para oficina`、`mobiliario hospitalario` 等。

## 当前是否建议上线

从关键词结构看，可以上线，但建议先处理两个 P0 低风险文案问题：`/catalogo/oficinas/` H1 和 collaboration/brainstorming 小类主词。表单系统、真实联系方式等 launch blockers 不属于本轮 SEO 审计结论。

## 上线后 Search Console 观察重点

- `muebles para hoteles` vs `catálogo de muebles para hoteles` vs `proyectos de mobiliario hotelero` 的展示 URL 是否分清。
- `muebles para oficinas`、`catálogo de muebles de oficina`、`puestos de trabajo para oficina`、`estaciones de trabajo para oficina` 的展示和点击。
- `brainstorming` 是否带来无效曝光。
- `STEAM`、`cuidados`、`penthouses` 是否产生非采购流量。

## 下一步建议

执行 `11-codex-implementation-prompt.md` 中的 P0/P1 小范围 Title/H1/Meta 修改，然后跑 `pnpm build`、`pnpm qa:static`、`pnpm qa:catalogs`。
