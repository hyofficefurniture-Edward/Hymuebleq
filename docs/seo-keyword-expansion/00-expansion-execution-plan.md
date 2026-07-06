# 第二轮关键词扩展执行计划

## 任务边界

- 目标：在上一轮 SEO 关键词审计基础上，扩展 Hymueble 全站关键词机会，整理 Keyword Planner 数据、SERP 意图、页面关键词映射和上线前动作。
- 不做：不启用广告，不创建 campaign，不设置预算/广告组/广告素材，不改 URL，不改页面正文，不伪造搜索量、CPC、竞争度或排名。
- 输出目录：docs/seo-keyword-expansion/
- 执行日期：2026-07-05。

## 已读取的上一轮材料

- docs/seo-keyword-audit/00-execution-plan.md
- docs/seo-keyword-audit/01-seo-keyword-inventory.md
- docs/seo-keyword-audit/02-seo-keyword-conflicts.md
- docs/seo-keyword-audit/03-serp-validation-plan.md
- docs/seo-keyword-audit/04-serp-validation-results.md
- docs/seo-keyword-audit/05-keyword-planner-upload-list.csv
- docs/seo-keyword-audit/06-keyword-planner-upload-list-with-context.csv
- docs/seo-keyword-audit/07-keyword-planner-results.md
- docs/seo-keyword-audit/08-keyword-potential-scorecard.md
- docs/seo-keyword-audit/09-page-keyword-map-final.md
- docs/seo-keyword-audit/10-prelaunch-seo-fix-list.md
- docs/seo-keyword-audit/12-executive-summary.md
- docs/seo-keyword-audit/raw-keyword-planner-export.csv

## 本轮数据来源

| 数据源 | 状态 | 用途 | 限制 |
| --- | --- | --- | --- |
| raw-keyword-planner-historical-metrics-export.csv | 已导出 | 87 个上一轮/扩展关键词的历史搜索量、竞争度和出价区间 | 地区为 Mexico、Colombia、Peru、Chile；历史指标页语言显示所有语言；关键词本身为西语 |
| raw-keyword-planner-expanded-export.csv | 已导出 | 作为目标要求的原始 Keyword Planner 导出保留 | 文件内容是广告系列预测摘要，且位置显示中国，不是关键词级预测；不用于关键词评分 |
| raw-discover-hotel-keyword-ideas.csv | 已导出 | 酒店种子词的 Discover new keywords 结果 | 仅酒店组成功导出；其他行业组未伪造为 Discover 导出 |
| Google SERP 抽样 | 已完成 | 判断关键词意图、竞争页面类型、页面匹配度 | 抽样 SERP，不代表排名承诺 |
| 站点源码与上一轮映射 | 已读取 | 确认 URL、页面角色、行业页/目录页/案例页分工 | 本轮只做文档，不改源码 |

## 执行步骤与验收

1. 读取上一轮审计和站点 URL 结构。验收：报告引用上一轮结论，并覆盖目标 URL。
2. 建立种子词组。验收：01 文件覆盖酒店、办公室、教育、医疗、住宅、工厂、转化和资源入口。
3. 整理 Keyword Planner 数据。验收：02 文件来自酒店 Discover，03 文件来自历史指标；不把非关键词级预测当成关键词数据。
4. SERP 意图验证。验收：05 文件至少覆盖 30 个关键词，并记录竞争页面类型。
5. 关键词评分与页面映射。验收：04/06/07 明确 P0/P1/P2/Reject、目标 URL、抢词风险。
6. 输出上线动作与摘要。验收：08/09 明确上线前、30 天内、上线后观察项和未完成数据边界。

## 关键执行判断

- 酒店 Discover 导出已经给出有价值的新词：muebles para hotel、muebles de hotel、muebles para lobby de hotel、mobiliario contract para hoteles、proveedores de muebles para hoteles 等。
- 办公、教育、医疗、住宅、工厂和转化组没有新的 Discover 批量导出；本轮只用历史指标、上一轮关键词池和 SERP 抽样，不补造 Planner 数据。
- 案例页不承担主流量词，应作为 proof pages：承接品牌信任、行业参考、内链和 RFQ 支持，不与行业页/目录页抢主词。
