# 执行摘要

## 本轮完成

- 已创建 docs/seo-keyword-expansion/ 第二轮 SEO 关键词扩展文档包。
- 已读取上一轮 docs/seo-keyword-audit/ 资料，并延续上一轮页面分工结论。
- 已保留 Keyword Planner 原始导出：raw-keyword-planner-expanded-export.csv、raw-keyword-planner-historical-metrics-export.csv、raw-discover-hotel-keyword-ideas.csv。
- 已生成 02 酒店 Discover 关键词整理 CSV 和 03 历史指标整理 CSV。
- 已完成 32 个关键词的 SERP 意图验证，并输出扩展评分表、页面关键词映射、抢词检查和上线动作清单。
- 未启用广告，未创建 campaign，未设置预算、广告组、广告素材或付款信息。

## 关键结论

1. 酒店仍是最清楚的商业主线：/hoteles/ 承接 muebles para hoteles，/catalogo/hoteles/ 承接 catálogo de muebles para hoteles，/proyectos/hoteles/ 做 proof，不抢主词。
2. 办公词搜索量强但竞争高：/catalogo/oficinas/ 的 H1/语义需要上线前对齐 catálogo de muebles de oficina。
3. brainstorming 是高量低匹配词：不能做家具页主词，协作办公页应改为 muebles para espacios colaborativos de oficina。
4. 教育和医疗有真实机会：mobiliario escolar、mobiliario hospitalario 有量，但上线前不建议大改，先等 GSC 验证细分类。
5. 工厂词应集中给 /fabrica/：首页保留总品牌/项目家具语义，不抢 fabricante de muebles en China。
6. 转化词集中给 /contacto/：其他页面只保留 CTA，不做 cotización 主 SEO。
7. 案例页包括项目页、单个客户案例页，都应作为 proof pages，不承担主流量词。

## 数据限制

- 酒店组 Discover new keywords 已成功导出；办公、教育、医疗、住宅、工厂和转化组没有成功继续批量 Discover 导出，本轮没有伪造这些组的 Planner Discover 数据。
- raw-keyword-planner-expanded-export.csv 是预测摘要，且位置显示中国；不是关键词级预测，因此不用于评分。
- raw-keyword-planner-historical-metrics-export.csv 提供 87 个关键词历史指标；地区为 Mexico、Colombia、Peru、Chile，语言 UI 显示所有语言。
- SERP 验证是人工抽样，不是排名承诺。

## 是否建议上线

从关键词结构看，可以上线，但建议先处理两个 P0 文案问题：

1. /catalogo/oficinas/ H1 对齐 catálogo de muebles de oficina / catálogo de muebles para oficinas。
2. /catalogo/oficinas/colaboracion-y-brainstorming/ 的 Title/H1/Meta 主词从 brainstorming 调整为 muebles para espacios colaborativos de oficina。

表单、真实联系方式、技术 launch blockers 不属于本轮关键词扩展结论，需另行验收。

## 下一步

- 若要严格补齐 Keyword Planner 数据，下一轮只做办公、教育、医疗、住宅、工厂、转化六组 Discover 批量导出，不改站点。
- 若进入代码修改，只做 P0/P1 Title/H1/Meta 小范围调整，然后跑 pnpm build、pnpm qa:static、pnpm qa:catalogs 和浏览器抽查。
