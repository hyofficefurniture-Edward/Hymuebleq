# Hymueble SEO 关键词审计执行计划

## 目标理解

本轮不是泛泛做 SEO 文案优化，而是为 Hymueble 西班牙语 B2B 商用家具站做上线前关键词体检。核心判断对象包括页面关键词是否合理、是否符合拉美西语 B2B 项目采购语境、页面之间是否抢词、真实 SERP 是否支持该商业意图，以及 Keyword Planner 是否能提供可用潜力数据。

本轮默认以源码中的真实路由、构建后的 HTML 和 `src/data/site.ts` / `src/data/catalogReferences.ts` / `src/data/projectEvidence.ts` 为准。若文档与源码冲突，记录为审计发现，不按过期文档判断。

## 页面角色判断方法

- 首页：品牌与总定位入口，承接商业家具、项目家具、工厂直供和主要行业入口，不抢单一行业主词。
- 行业解决方案页：承接行业采购大词，例如 `muebles para hoteles`、`muebles para oficinas`、`mobiliario escolar`。
- 目录聚合页：承接目录型关键词，例如 `catálogo de muebles para hoteles`，不抢行业解决方案页主词。
- 产品细分类页：承接空间、产品、使用场景长尾词，例如 `muebles para habitaciones de hotel`。
- 项目案例页：承接案例、参考、交付证明类关键词，不写成产品目录页。
- 工厂页：承接 fabricante / fábrica / producción / control de calidad 类关键词。
- 联系页：承接 cotización / contacto / enviar proyecto 类转化词，不抢行业大词。
- 资源页：承接信息型内容和未来内容扩展，不抢商业页主词。

## 关键词合理性判断方法

每个页面按以下维度判断：

- 西语表达是否自然，避免直译或内部术语当主词。
- 是否符合拉美 B2B 项目采购行为，而不是零售、电商、博客或方法论意图。
- 是否能自然进入 Title、H1、Meta、H2、CTA、图片 alt 和内链锚文本。
- 是否与页面角色一致。
- 是否与其他页面重复抢同一主词。
- 是否支持工厂直供、项目家具、批量采购、定制生产、出口支持和 RFQ 转化。

## SERP 验证方法

抽样验证最多 50 个关键词，优先覆盖：

- 酒店核心词和酒店页面组冲突词。
- 办公核心词和办公页面组冲突词。
- 工厂、供应商、项目采购和转化词。
- URL 或页面标题中存在不自然风险的词。
- 可能偏零售、电商、marketplace、博客或方法论的词。

每个词观察可用互联网搜索结果的前页类型，记录代表性 SERP 类型、采购意图、是否适合作主词、是否需要降级为辅助词或正文场景词。

说明：本轮 SERP 验证为可用互联网 SERP 抽样，不等同于精确国家级、城市级、移动端、无痕 Google 排名报告，也不替代 Google Search Console、Ahrefs 或 Semrush。

## Keyword Planner 检查方法

生成 50-150 个关键词批量上传清单：

- `05-keyword-planner-upload-list.csv`：仅关键词，可直接上传。
- `06-keyword-planner-upload-list-with-context.csv`：带 URL、类型和理由，供内部审计。

若当前浏览器可访问 Google Ads Keyword Planner，则只进入 `Get search volume and forecasts`，语言设为 Spanish，地区优先 Mexico、Colombia、Peru、Chile，导出 CSV 到 `docs/seo-keyword-audit/raw-keyword-planner-export.csv`。

严禁创建 campaign、设置预算、发布广告、创建广告组、修改付款或账户设置。若 Google Ads 要求进入广告创建或付款/投放流程，则停止并标记为未完成。

若无法访问 Keyword Planner，不伪造搜索量、CPC、竞争程度；相关字段统一标记为 `Pending`。

## 预计输出文件

- `00-execution-plan.md`
- `01-seo-keyword-inventory.md`
- `02-seo-keyword-conflicts.md`
- `03-serp-validation-plan.md`
- `04-serp-validation-results.md`
- `05-keyword-planner-upload-list.csv`
- `06-keyword-planner-upload-list-with-context.csv`
- `07-keyword-planner-results.md`
- `08-keyword-potential-scorecard.md`
- `09-page-keyword-map-final.md`
- `10-prelaunch-seo-fix-list.md`
- `11-codex-implementation-prompt.md`
- `12-executive-summary.md`
- 若直接改代码，再输出 `13-code-changes.md`。

## 执行边界

- 先审计、先验证、后建议，最后才判断是否低风险改代码。
- 默认不大改正文、不新增页面、不删除页面、不改导航结构、不启用广告。
- URL 只做审慎建议，除非证据充分且属于 P0，否则不直接修改。
- 不展示、不记录、不提交真实 secret、cookie、Ads 账户敏感信息或 `.env` 值。
- 不把目录页改成零售电商，不使用价格、库存、购物车、SKU 逻辑。

## 风险提醒

- 当前项目有真实联系信息和 Google/Ads 访问风险，所有外部工具操作必须避开广告投放和敏感信息输出。
- Keyword Planner 数据可能因账号权限、地区设置或 Google Ads 引导流程而无法导出，不能用主观估计替代。
- SERP 抽样只能判断搜索意图，不代表排名、搜索量或最终转化。
- 高风险词如 `brainstorming`、`laboratorios y STEAM`、`cuidados y recuperación`、`penthouses y apartamentos de lujo` 需重点验证，但不预设结论。
