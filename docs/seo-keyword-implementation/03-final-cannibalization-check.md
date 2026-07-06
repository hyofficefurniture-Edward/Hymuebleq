# Final cannibalization check

## 结论

当前关键词落地方案可以避免主要抢词，但前提是下一轮源码应用严格执行本文件和 `01/02` 的主承接规则：行业页、目录页、案例页和联系页不能互相抢 Title / H1 主词。

| 冲突组 | 冲突关键词 | 涉及页面 | 最终主承接页面 | 其他页面应如何降级 | 改 Title | 改 H1 | 改 Meta | 改内链锚文本 | 人工确认 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 酒店行业 vs 酒店目录 vs 酒店案例 | `muebles para hoteles`; `catálogo de muebles para hoteles`; `proyectos de mobiliario hotelero` | `/hoteles/`; `/catalogo/hoteles/`; `/proyectos/hoteles/` | `/hoteles/` 承接 `muebles para hoteles`; `/catalogo/hoteles/` 承接 `catálogo...`; `/proyectos/hoteles/` 承接 `proyectos...` | 目录页只用 `catálogo` 语义；案例页只用 proof/project/reference 语义 | Yes for P0 pages | Yes for P0 pages | Yes for P0 pages | Yes | No |
| 酒店小类泛产品词 | `sillas para restaurante`; `mesas para restaurante`; `sillas de terraza`; `muebles para exteriores`; `sillas para bar` | 酒店餐厅、户外、酒吧小类页 | 没有任何页面用泛产品词做 Main | 只能放 H2、正文、FAQ、alt；必须加 hotel/project/context | Yes where currently generic | Yes where currently generic | Yes | Yes | No |
| 酒店会议 vs 办公会议 | `salas de conferencia`; `salas de juntas`; `muebles para salas de reunión` | `/catalogo/hoteles/mobiliario-para-conferencias/`; `/catalogo/oficinas/salas-de-reunion/` | 酒店页承接 `muebles para salas de conferencia de hotel`; 办公页承接 `muebles para salas de juntas` | 酒店页加 `hotel/eventos/banquetes`；办公页加 `oficina/corporativa` | Yes if touched | Yes if touched | Yes | Yes | No |
| 办公行业 vs 办公目录 vs 办公案例 | `muebles de oficina`; `catálogo de muebles de oficina`; `proyectos de mobiliario de oficina` | `/oficinas/`; `/catalogo/oficinas/`; `/proyectos/oficinas/` | `/oficinas/` 承接 `muebles de oficina`; `/catalogo/oficinas/` 承接 `catálogo...`; `/proyectos/oficinas/` 承接 `proyectos...` | 目录页不把行业词放 Title/H1；案例页只做 proof | Yes | Yes | Yes | Yes | No |
| 协作办公页 vs 方法论流量 | `brainstorming`; `lluvia de ideas` | `/catalogo/oficinas/colaboracion-y-brainstorming/` | 无主承接页面 | 降级为 Content-only 场景词；Title/H1 改为 `muebles para espacios colaborativos de oficina` | Yes | Yes | Yes | Yes | No URL change |
| 办公椅小类 vs 办公行业页 | `sillas de oficina`; `muebles de oficina` | `/oficinas/`; `/catalogo/oficinas/sillas-de-oficina/` | `/oficinas/` 承接行业词；小类页承接 `sillas de oficina para empresas` | 小类页必须加 `para empresas/proyectos/volumen`，不能抢行业主词 | Optional | Optional | Optional | Yes | No |
| 教育行业 vs 教育目录 | `mobiliario escolar`; `catálogo de mobiliario escolar` | `/educacion/`; `/catalogo/educacion/` | `/educacion/` 承接 `mobiliario escolar` | 目录页承接 catálogo + aula/biblioteca/comedor/laboratorio | Yes if touched | Yes if touched | Yes | Yes | No |
| 医疗行业 vs 医疗目录 | `mobiliario hospitalario`; `catálogo de mobiliario hospitalario` | `/salud/`; `/catalogo/salud/` | `/salud/` 承接 `mobiliario hospitalario` | 目录页承接 catálogo + consultorios/enfermería/habitaciones/laboratorio | Yes if touched | Yes if touched | Yes | Yes | No |
| 住宅行业 vs 住宅目录 | `muebles para proyectos residenciales`; `catálogo de mobiliario residencial para proyectos` | `/residencial/`; `/catalogo/residencial/` | `/residencial/` 承接项目主词 | 目录页承接 catálogo + unidades modelo/apartamentos/villas | No in P0/P1 | No in P0/P1 | No in P0/P1 | Optional | Yes before source edit |
| 首页 vs 工厂页 | `fabricante de muebles comerciales`; `fabricante de muebles a medida`; `fabricante de muebles en China` | `/`; `/fabrica/` | `/` 承接 `fabricante de muebles comerciales`; `/fabrica/` 承接 `fabricante de muebles a medida` | 首页可提 China/factory as support；工厂页主讲 a medida/producción/control/exportación | Yes if touched | Yes if touched | Yes | Yes | No |
| 联系页 vs 其他 CTA | `solicitar cotización de muebles`; `cotización de muebles de oficina`; `cotización de muebles para hoteles` | `/contacto/`; all industry/catalog pages | `/contacto/` 承接 `solicitar cotización de muebles` | 其他页面只在 CTA 附近使用 cotización，不做页面主词 | Yes for `/contacto/` | Yes for `/contacto/` | Yes | Yes | No |
| 目录聚合页 vs sector catalogs | `catálogo de mobiliario comercial`; sector catalog keywords | `/catalogo/`; `/catalogo/hoteles/`; `/catalogo/oficinas/`; etc. | Sector pages承接 sector catalog；`/catalogo/` 只承接商业家具总目录 | 聚合页不抢酒店/办公/教育/医疗/住宅目录主词 | Needs review | Needs review | Needs review | Needs review | Yes |
| 案例聚合页 vs industry projects | `proyectos de mobiliario comercial`; `proyectos de mobiliario hotelero`; `proyectos de mobiliario de oficina` | `/proyectos/`; `/proyectos/hoteles/`; `/proyectos/oficinas/` | Industry project pages承接行业案例词；`/proyectos/` 只承接总案例词 | 聚合页不抢行业案例页 | Needs review | Needs review | Needs review | Needs review | Yes |

## 禁止进入 Title / H1 的词

- `brainstorming`
- `lluvia de ideas`
- `sillas para restaurante`
- `mesas para restaurante`
- `sillas para bar`
- `sillas de terraza`
- `muebles para exteriores`
- `sillas de oficina`
- `escritorio`
- `silla ergonomica`
- `muebles de lujo`
- `decoración`
- `precio`
- `barato`
- `segunda mano`
- 品牌导航词、本地城市词、Spain-only 语境词、成人/汽车旅馆相关词。
