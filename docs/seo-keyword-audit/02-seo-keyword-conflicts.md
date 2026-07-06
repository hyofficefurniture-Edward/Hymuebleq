# 关键词冲突与页面抢词风险报告

| 冲突关键词 | 涉及页面 | 当前问题 | 推荐主承接页面 | 其他页面应降级为哪些辅助词 | 是否建议修改 Title | 是否建议修改 H1 | 是否建议修改 URL | 是否建议修改导航/内链锚文本 | 风险等级 | 处理优先级 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| muebles para hoteles / mobiliario hotelero | /hoteles/ vs /catalogo/hoteles/ vs /proyectos/hoteles/ | 三页都出现酒店大词，当前分工基本成立但辅助词重复偏高。 | /hoteles/ | 目录页降级为 catálogo / por categoría；项目页降级为 proyectos / casos / referencias. | 是 | 低风险微调 | 否 | 可微调目录/项目入口锚文本 | 中 | P1 |
| muebles para oficinas / mobiliario de oficina | /oficinas/ vs /catalogo/oficinas/ vs /proyectos/oficinas/ | 三页共享办公大词；目录页 H1 `Catálogo de oficinas` 不够清楚。 | /oficinas/ | 目录页用 catálogo de muebles para oficinas；案例页用 proyectos de mobiliario de oficina。 | 是 | 是 | 否 | 可微调 | 中 | P0 |
| mobiliario escolar | /educacion/ vs /catalogo/educacion/ vs /proyectos/educacion/ | 当前行业/目录/案例分工清楚，风险低。 | /educacion/ | 目录页 catálogo；项目页 proyectos/referencias。 | 否 | 否 | 否 | 否 | 低 | P2 |
| mobiliario hospitalario | /salud/ vs /catalogo/salud/ vs /proyectos/salud/ | 当前分工清楚，细分类页需避免 `cuidados` 过宽。 | /salud/ | 目录页 catálogo；项目页 proyectos；`cuidados` 页改为 residencias/cuidado prolongado。 | 局部 | 局部 | 暂不 | 否 | 中 | P1 |
| muebles para proyectos residenciales | /residencial/ vs /catalogo/residencial/ vs /proyectos/residencial/ | 住宅词有零售/地产灵感风险，需保持项目开发商语境。 | /residencial/ | 目录页 catálogo；项目页 casos；高端空间页用 apartamentos/villas 但加 proyectos。 | 是 | 局部 | 否 | 否 | 中 | P1 |
| fabricante de muebles / fábrica de muebles | / vs /fabrica/ | 首页有 China factory 作为总信任，工厂页更适合承接 fabricante/fábrica。 | /fabrica/ | 首页保留 proveedor/mobiliario para proyectos，弱化 manufacturer 独占。 | 否 | 否 | 否 | 否 | 低 | P2 |
| solicitar cotización | /contacto/ vs 全站 CTA | 全站 CTA 使用 cotización 是转化路径，不是抢词；联系页应主承接。 | /contacto/ | 其他页作为 CTA 文案即可，不做 SEO 主词。 | 否 | 否 | 否 | 否 | 低 | P2 |

## 旧 URL 说明

`/catalogo/hoteleria/*` 与 `/proyectos/hoteleria/*` 是历史 redirect/兼容路径，不纳入主关键词承接。注意 `/proyectos/hoteleria/raffles-hotel/` 当前 redirect 到 `/proyectos/hoteles/`，不是具体案例页。
