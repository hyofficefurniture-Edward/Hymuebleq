# Next Codex source implementation prompt

下面 prompt 可直接给下一轮 Codex 使用。

```text
你现在执行 Hymueble SEO 关键词布局源码应用。

必须先读取：

- docs/seo-keyword-implementation/00-source-priority-and-rules.md
- docs/seo-keyword-implementation/01-final-keyword-implementation-map.md
- docs/seo-keyword-implementation/02-page-keyword-placement-plan.md
- docs/seo-keyword-implementation/03-final-cannibalization-check.md
- docs/seo-keyword-implementation/04-implementation-readiness-summary.md
- docs/seo-keyword-implementation/06-full-site-url-keyword-coverage.md

执行边界：

1. 只执行 01 和 02 中允许执行的 P0 / P1 项。
   - 06 只作为全站 URL 关键词规划状态补齐和风险边界参考；06 中标为 P2 / Observe / No SEO action / Exec No 的页面不得自动进入本轮源码应用。
2. 不重新做关键词研究。
3. 不重新做 Keyword Planner。
4. 不重新做 SERP。
5. 不修改 URL。
6. 不新增页面。
7. 不删除页面。
8. 不大面积重写正文。
9. 不修改联系方式。
10. 不修改案例事实。
11. 不改变主导航结构。
12. 不引入价格、库存、购物车、SKU、折扣、评分或普通零售电商语义。
13. 不把 high-volume retail keywords 放入 Title / H1。
14. 不让联系页抢行业主词。
15. 不让工厂页和首页抢同一个主词。

允许修改：

- Title
- Meta Description
- H1
- 必要 H2
- 少量首屏文案，用于自然前置 Main keyword
- 图片 alt
- CTA 附近文案
- 内链锚文本

优先执行 P0 页面：

- /
- /hoteles/
- /catalogo/hoteles/
- /catalogo/hoteles/habitaciones/
- /catalogo/hoteles/muebles-exteriores/
- /catalogo/hoteles/muebles-para-restaurante/
- /oficinas/
- /catalogo/oficinas/
- /catalogo/oficinas/colaboracion-y-brainstorming/
- /contacto/

可执行 P1 页面，但必须保持小范围：

- /catalogo/hoteles/mobiliario-para-conferencias/
- /catalogo/hoteles/muebles-para-bar/
- /catalogo/oficinas/puestos-de-trabajo/
- /catalogo/oficinas/salas-de-reunion/
- /fabrica/
- /educacion/
- /catalogo/educacion/
- /salud/
- /catalogo/salud/

暂不执行：

- /catalogo/hoteles/muebles-de-bano/
- /proyectos/hoteles/
- /catalogo/oficinas/oficinas-ejecutivas/
- /catalogo/oficinas/recepcion-y-salas-de-espera/
- /catalogo/oficinas/sillas-de-oficina/
- /proyectos/oficinas/
- /residencial/
- /catalogo/residencial/
- /recursos/
- /recursos/blog/
- /recursos/videos/
- /catalogo/
- /proyectos/

关键落地规则：

- /hoteles/ 主承接 `muebles para hoteles`。
- /catalogo/hoteles/ 主承接 `catálogo de muebles para hoteles`。
- /proyectos/hoteles/ 不抢酒店行业主词，只做 proof。
- /oficinas/ 主承接 `muebles de oficina`。
- /catalogo/oficinas/ 主承接 `catálogo de muebles de oficina`。
- /catalogo/oficinas/colaboracion-y-brainstorming/ 主承接 `muebles para espacios colaborativos de oficina`，`brainstorming` 只能作为场景词。
- /fabrica/ 主承接 `fabricante de muebles a medida`，China/fábrica/exportación 做辅助。
- /contacto/ 主承接 `solicitar cotización de muebles`，不抢行业页主词。

验收要求：

1. 每个修改过的页面只有一个 Main keyword。
2. 不得出现多个页面用同一主关键词做 Title/H1。
3. 高搜索但偏零售的词只能进入 H2、正文、FAQ、alt 或不使用。
4. Title/H1/Meta 不得出现 price、stock、cart、SKU、barato、segunda mano 等零售电商语义。
5. 酒店目录页仍然是 reference / RFQ / WhatsApp / catalog 语义，不是电商。
6. 联系页继续保持低压力 RFQ 语义：datos iniciales、puedes enviar、si ya tienes、podemos revisarlos después。
7. 所有改动必须是小范围、可回滚、与页面角色直接相关。

执行后必须运行：

- git diff --check
- pnpm build
- pnpm qa:static
- pnpm qa:catalogs

如果页面可见文案、H1、布局文本长度有变化，还需要启动本地预览并做浏览器抽查。若已有 dev server，用现有端口；否则启动 pnpm dev。

最终汇报：

1. 修改了哪些文件。
2. 哪些页面应用了关键词。
3. 哪些页面跳过以及原因。
4. 跑了哪些验证命令，结果如何。
5. 是否还有人工确认项。
```
