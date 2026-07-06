# SEO keyword implementation source priority and rules

## 本轮目标

本轮只生成关键词落地执行依据，不修改源码、不改 URL、不新增页面、不删除页面、不重新跑 Keyword Planner、不重新做 SERP。

输出用途：给下一轮 Codex 源码应用使用，限定下一轮只做 Title、Meta、H1、必要 H2、少量首屏文案、图片 alt、CTA 附近文案和内链锚文本。

## 最终依据文件

### 酒店页面组

最高优先级：

- `docs/seo-keyword-expansion/18-hotel-page-keyword-map-revised.md`
- `docs/seo-keyword-expansion/19-hotel-keyword-expansion-summary.md`

采用规则：

- 酒店行业页、酒店目录页、酒店细分类页、酒店案例页均以 `18` 为执行依据。
- `19` 用于解释高搜索产品词为什么只能降级为 H2、正文、FAQ、alt 或 CTA 语境，不能直接做 Title/H1 主词。
- 酒店页面如果与旧 `06` 或旧审计文件冲突，采用 `18/19`。

### 非酒店页面组

最高优先级：

- `docs/seo-keyword-expansion/12-final-page-keyword-map-revised.md`
- `docs/seo-keyword-expansion/13-revised-prelaunch-keyword-action-list.md`
- `docs/seo-keyword-expansion/14-non-hotel-expansion-summary.md`

采用规则：

- 非酒店行业页、目录页、工厂页、联系页、资源页以 `12` 为主。
- 修改时机和优先级以 `13` 为主。
- 有搜索量但不适合 Hymueble 的词、低搜索但高商业价值的词、LATAM 本土化筛查，以 `14` 为主。

## 参考文件

以下文件只作为旧结论和冲突来源，不作为最终执行依据：

- `docs/seo-keyword-audit/09-page-keyword-map-final.md`
- `docs/seo-keyword-expansion/06-final-page-keyword-map.md`
- `docs/seo-keyword-expansion/09-executive-summary.md`

## 已发现的新旧冲突

| 冲突点 | 旧结论 | 最新结论 | 最终采用 |
| --- | --- | --- | --- |
| `/oficinas/` 主词 | `muebles para oficina` / `muebles para oficinas` | `muebles de oficina`，Title/H1 加 `para proyectos` 限定 | `muebles de oficina` |
| `/fabrica/` 主词 | `fabricante de muebles en China` | `fabricante de muebles a medida`，China 词作为辅助证明 | `fabricante de muebles a medida` |
| 酒店户外页主词 | `mobiliario exterior para hoteles` | `muebles para exteriores de hotel` | `muebles para exteriores de hotel` |
| 酒店产品高搜索词 | 可进入相关页辅助 | 必须带 hotel/project/category 语境，不做主词 | 降级为 Secondary / Content-only / alt |
| `brainstorming` | 旧 URL/语义中出现 | 搜索意图偏方法论，不能做 Title/H1 主词 | Content-only；主词改为 `muebles para espacios colaborativos` |
| 工厂 China 词 | 可做工厂页主词 | Discover 更支持 `fabricante de muebles a medida` | China 词降级为 Secondary |

## 关键词选择规则

最终排序：

1. 拉美真实搜索表达。
2. B2B 项目采购意图。
3. 页面角色匹配。
4. SERP 意图匹配。
5. Keyword Planner 搜索潜力。
6. 竞争机会。

执行规则：

- 每个页面只能有 1 个 Main keyword。
- 同一个 Main keyword 只能由一个页面主承接。
- 行业页承接行业主词。
- 目录页承接 `catálogo` / category / reference browsing 词。
- 细分类页承接具体产品词、空间词和项目长尾词。
- 案例页承接 proof / project / reference 词，不追主流量词。
- 联系页承接报价、表单、WhatsApp、catalog inquiry 词，不抢行业词。
- 工厂页承接 fabricante / fábrica / a medida / China / export-support 词，不和首页抢同一个主词。

## LATAM 和 B2B 边界

- 优先 Mexico、Colombia、Peru、Chile 的 Keyword Planner 和 SERP 语境。
- Panama、Ecuador、Dominican Republic 等其他拉美市场作为语义筛查参考。
- Spain 语境只作低权重参考。
- `contract`、`FF&E`、`equipamiento` 等词可在正文解释，但不作为拉美主词。
- 目录页可以像目录，但业务逻辑不能像电商：禁止 price、stock、cart、SKU、discount、rating、单件零售购买语义。

## 本轮禁止事项

- 不修改源码。
- 不修改 URL。
- 不新增页面。
- 不删除页面。
- 不改主导航结构。
- 不大面积重写正文。
- 不重新做 Keyword Planner。
- 不重新做 SERP。
- 不启用广告、不设置预算、不修改 Google Ads 账户。
- 不修改联系方式。
- 不修改案例事实。
- 不把高搜索但偏零售的词放入 Title / H1。
- 不把低质量、Spain 偏向、品牌导航、本地城市、二手、低价词塞进 Hymueble 页面。
