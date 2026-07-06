# 扩展关键词评分表

## 评分规则

- 搜索需求 25%：来自 Keyword Planner 历史指标或酒店 Discover。
- B2B 采购意图 25%：SERP 和词义是否偏项目采购、供应商、工厂、目录。
- 页面匹配度 20%：是否有现成 URL 能承接，不需要新增页面或改 URL。
- 商业转化价值 20%：是否接近 RFQ、批量采购、项目家具、工厂/供应商选择。
- 竞争机会 10%：低竞争得分高，高竞争得分低；无数据按中性处理。

数据边界：raw-keyword-planner-expanded-export.csv 是预测摘要，不是关键词级预测；本表不使用其中的预测数。

| keyword | target_url | keyword_type | avg_monthly_searches | competition | bid_low | bid_high | b2b_fit | page_fit | commercial_value | search_demand | competition_opportunity | final_score | priority | observed_intent |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| muebles para hoteles | /hoteles/ | 行业主词 | 500 | 中 | 12.99 | 55.80 | 5 | 5 | 5 | 4 | 3 | 91 | P0 | B2B 供应商/目录/酒店家具采购混合 |
| mobiliario de oficina | /oficinas/ | 行业主词 | 5,000 | 高 | 15.52 | 410.48 | 4 | 5 | 5 | 5 | 2 | 89 | P0 | 品牌/供应商/零售混合，搜索量大 |
| muebles para oficina | /oficinas/ | 行业主词 | 5,000 | 高 | 12.35 | 413.27 | 4 | 5 | 5 | 5 | 2 | 89 | P0 | 搜索量大，竞争高，零售混入 |
| puestos de trabajo para oficina | /catalogo/oficinas/puestos-de-trabajo/ | 产品细分类 | 500 | 低 | 4.09 | 18.70 | 4 | 5 | 4 | 4 | 5 | 86 | P0 | 产品目录意图明确，竞争低 |
| mobiliario escolar | /educacion/ | 行业主词 | 5,000 | 高 | 11.60 | 50.41 | 5 | 4 | 4 | 5 | 2 | 86 | P0 | 供应商/学校家具目录，搜索量大 |
| catálogo de muebles de oficina | /catalogo/oficinas/ | 目录词 | 500 | 高 | 8.77 | 58.14 | 5 | 5 | 4 | 4 | 2 | 85 | P0 | 目录意图强，上一轮 P0 |
| mobiliario hotelero | /hoteles/ | 行业主词 | 50 | 中 | 16.81 | 64.11 | 5 | 5 | 5 | 2 | 3 | 81 | P0 | 供应商、contract、行业目录混合 |
| mobiliario para habitaciones de hotel | /catalogo/hoteles/habitaciones/ | 产品细分类 | 50 | 低 | — | — | 5 | 5 | 4 | 2 | 5 | 81 | P0 | 客房家具长尾，竞争低 |
| mobiliario para bibliotecas escolares | /catalogo/educacion/bibliotecas/ | 产品细分类 | 50 | 低 | 6.38 | 18.03 | 5 | 5 | 4 | 2 | 5 | 81 | P0 | 长尾低竞争，适合目录小类 |
| mobiliario para comedores escolares | /catalogo/educacion/comedores-escolares/ | 产品细分类 | 50 | 低 | 5.32 | 19.07 | 5 | 5 | 4 | 2 | 5 | 81 | P0 | 长尾低竞争，适合目录小类 |
| proyectos de mobiliario de oficina | /proyectos/oficinas/ | 案例词 | 50 | 低 | — | — | 5 | 5 | 4 | 2 | 5 | 81 | P0 | 适合办公案例页证明 |
| estaciones de trabajo para oficina | /catalogo/oficinas/puestos-de-trabajo/ | 产品细分类 | 500 | 高 | 16.14 | 91.65 | 4 | 5 | 4 | 4 | 2 | 80 | P0 | 搜索量明确但竞争高 |
| cotización de muebles de oficina | /contacto/ | 转化词 | 50 | 高 | 73.15 | 173.46 | 5 | 5 | 5 | 2 | 2 | 79 | P0 | 有量且高商业意图 |
| muebles para hotel | /hoteles/ | 行业变体 | 500 | 中 | 12.99 | 55.80 | 4 | 4 | 4 | 4 | 3 | 78 | P0 | Discover 新增，高度接近主词 |
| muebles escolares | /educacion/ | 行业主词 | 500 | 中 | 12.78 | 59.99 | 4 | 4 | 4 | 4 | 3 | 78 | P0 | 教育采购和零售混合 |
| mobiliario hospitalario | /salud/ | 行业主词 | 500 | 中 | 5.91 | 28.01 | 4 | 4 | 4 | 4 | 3 | 78 | P0 | 医疗家具/设备目录/供应商混合 |
| proveedores de muebles para hoteles | /hoteles/ | 供应商词 | 50 | 中 | 29.61 | 46.16 | 5 | 4 | 5 | 2 | 3 | 77 | P1 | B2B 采购意图强 |
| muebles para habitaciones de hotel | /catalogo/hoteles/habitaciones/ | 产品细分类 | 50 | 中 | 9.86 | 39.61 | 5 | 5 | 4 | 2 | 3 | 77 | P1 | 酒店客房家具采购意图清楚 |
| mobiliario para aulas escolares | /catalogo/educacion/aulas-escolares/ | 产品细分类 | 50 | 中 | 2.76 | 12.28 | 5 | 5 | 4 | 2 | 3 | 77 | P1 | 学校教室家具，匹配目录页 |
| proyectos de mobiliario | /proyectos/ | 案例词 | 50 | 低 | — | — | 5 | 4 | 4 | 2 | 5 | 77 | P1 | 适合案例总页证明，不做主流量押注 |
| muebles para escuelas | /educacion/ | 行业主词 | 500 | 高 | 13.45 | 47.06 | 4 | 4 | 4 | 4 | 2 | 76 | P1 | 采购意图较明确，竞争高 |
| fabricante de muebles en China | /fabrica/ | 工厂词 | — | — | — | — | 5 | 5 | 5 | 1 | 3 | 76 | P1 | 榜单/平台/厂家查询，适合工厂页 |
| fábrica de muebles en China | /fabrica/ | 工厂词 | — | — | — | — | 5 | 5 | 5 | 1 | 3 | 76 | P1 | 供应链/厂家意图清楚 |
| solicitar cotización de muebles | /contacto/ | 转化词 | — | — | — | — | 5 | 5 | 5 | 1 | 3 | 76 | P1 | 转化明确，但 Planner 未返回量 |
| cotizar proyecto de mobiliario | /contacto/ | 转化词 | — | — | — | — | 5 | 5 | 5 | 1 | 3 | 76 | P1 | 项目询价意图明确 |
| proveedor de muebles de oficina | /oficinas/ | 供应商词 | 50 | 高 | 30.64 | 204.51 | 5 | 4 | 5 | 2 | 2 | 75 | P1 | B2B 采购意图强 |
| fabricante de muebles de oficina | /oficinas/ | 工厂词 | 50 | 高 | 30.57 | 181.86 | 5 | 4 | 5 | 2 | 2 | 75 | P1 | 采购意图强但可能与 /fabrica/ 重叠 |
| muebles de hotel | /hoteles/ | 行业变体 | 500 | 低 | 7.48 | 101.95 | 3 | 4 | 3 | 4 | 5 | 73 | P1 | Discover 新增但可能混入零售/二手 |
| fabricante de muebles para hoteles | /hoteles/ | 工厂词 | — | — | — | — | 5 | 4 | 5 | 1 | 3 | 72 | P1 | 供应商/厂家意图强，但 Planner 未返回量 |
| catálogo de muebles para hoteles | /catalogo/hoteles/ | 目录词 | — | — | — | — | 5 | 5 | 4 | 1 | 3 | 72 | P1 | 目录/供应商/平台混合 |
| muebles para espacios colaborativos | /catalogo/oficinas/colaboracion-y-brainstorming/ | 产品细分类 | 50 | — | — | — | 4 | 5 | 4 | 2 | 3 | 72 | P1 | 比 brainstorming 更符合采购 |
| mobiliario colaborativo | /catalogo/oficinas/colaboracion-y-brainstorming/ | 产品细分类 | 50 | 中 | — | — | 4 | 5 | 4 | 2 | 3 | 72 | P1 | 适合主词或辅助词 |
| proveedor de mobiliario comercial | /fabrica/ | 供应商词 | — | — | — | — | 5 | 4 | 5 | 1 | 3 | 72 | P1 | B2B 意图强，但可能与首页重叠 |
| mobiliario contract para hoteles | /hoteles/ | 行业长尾 | 50 | 高 | — | — | 5 | 4 | 4 | 2 | 2 | 71 | P1 | contract 意图强，适合正文/H2 |
| mobiliario corporativo | /oficinas/ | 行业长尾 | 50 | 高 | 16.42 | 143.32 | 5 | 4 | 4 | 2 | 2 | 71 | P1 | B2B 匹配好，搜索量小 |
| mobiliario para hoteles y restaurantes | /catalogo/hoteles/muebles-para-restaurante/ | 场景细分类 | 50 | 高 | 10.54 | 46.61 | 4 | 5 | 4 | 2 | 2 | 70 | P1 | 高竞争但项目场景明确 |
| muebles para salas de juntas | /catalogo/oficinas/salas-de-reunion/ | 产品细分类 | 50 | 高 | 14.70 | 75.69 | 4 | 5 | 4 | 2 | 2 | 70 | P1 | 办公会议室家具，转化明确 |
| fabricante de muebles a medida | /fabrica/ | 工厂词 | 50 | 高 | 5.66 | 19.56 | 4 | 5 | 4 | 2 | 2 | 70 | P1 | 有量但较泛，适合工厂页辅助 |
| muebles para lobby de hotel | /catalogo/hoteles/ | 场景细分类 | 50 | 中 | 9.41 | 20.55 | 4 | 4 | 4 | 2 | 3 | 68 | P1 | Discover 新增，适合目录正文/H2 |
| muebles hospitalarios | /salud/ | 行业主词 | 50 | 中 | 1.59 | 13.24 | 4 | 4 | 4 | 2 | 3 | 68 | P1 | 搜索量较小但采购场景明确 |
| catálogos de mobiliario para proyectos | /catalogo/ | 目录词 | — | — | — | — | 5 | 4 | 4 | 1 | 3 | 68 | P1 | 适合资源/总目录，不抢行业页 |
| mobiliario para laboratorios educativos | /catalogo/educacion/laboratorios-y-steam/ | 产品细分类 | — | — | — | — | 4 | 5 | 4 | 1 | 3 | 67 | P1 | SERP 显示学校实验室家具供应商 |
| mobiliario para consultorios médicos | /catalogo/salud/consultorios-medicos/ | 产品细分类 | — | — | — | — | 4 | 5 | 4 | 1 | 3 | 67 | P1 | 医疗电商混入，仍可做小类词 |
| mobiliario para laboratorios clínicos | /catalogo/salud/laboratorios-y-areas-clinicas/ | 产品细分类 | — | — | — | — | 4 | 5 | 4 | 1 | 3 | 67 | P1 | 医疗实验室家具，可观察 |
| mueble recepcion hotel | /catalogo/hoteles/ | 场景细分类 | 50 | 低 | — | — | 3 | 4 | 3 | 2 | 5 | 63 | P2 | 有酒店接待场景，但表达不够自然 |
| muebles para proyectos residenciales | /residencial/ | 项目行业词 | — | — | — | — | 4 | 4 | 4 | 1 | 3 | 63 | P2 | 项目型表达好，搜索量未知 |
| muebles para habitaciones hospitalarias | /catalogo/salud/hospitalizacion-y-habitaciones/ | 产品细分类 | — | — | — | — | 3 | 5 | 4 | 1 | 3 | 62 | P2 | 更具体但 Planner 未返回量 |
| control de calidad de muebles | /recursos/blog/ | 内容词 | 50 | 低 | — | — | 3 | 3 | 3 | 2 | 5 | 59 | P2 | 可做信任型内容，不做核心页面主词 |
| estaciones de enfermería | /catalogo/salud/estaciones-de-enfermeria/ | 产品细分类 | — | — | — | — | 3 | 5 | 3 | 1 | 3 | 58 | P2 | 利基词，页面匹配但需求未知 |
| mobiliario para apartamentos de lujo | /catalogo/residencial/penthouses-y-apartamentos-de-lujo/ | 产品细分类 | — | — | — | — | 3 | 5 | 3 | 1 | 3 | 58 | P2 | 容易偏灵感/零售，需项目语境 |
| muebles para villas de lujo | /catalogo/residencial/villas-y-mansiones/ | 产品细分类 | — | — | — | — | 2 | 5 | 3 | 1 | 3 | 53 | P2 | 住宅豪宅语境强但 B2B 较弱 |
| brainstorming | /catalogo/oficinas/colaboracion-y-brainstorming/ | 信息词 | 50,000 | 低 | 6.13 | 46.96 | 1 | 1 | 1 | 5 | 1 | 40 | Reject | 搜索量极高但主要是方法论，不适合作家具采购主词 |

## P0 结论

- 酒店主入口继续用 muebles para hoteles / mobiliario hotelero，不要让目录页和案例页抢同一个主词。
- 办公主入口有量但竞争高；/catalogo/oficinas/ 的 H1 要优先对齐 catálogo de muebles de oficina / catálogo de muebles para oficinas。
- /catalogo/oficinas/colaboracion-y-brainstorming/ 不应把 brainstorming 当主词，改用 muebles para espacios colaborativos 或 mobiliario colaborativo。
- 教育和医疗主词有量，但上线前不建议大范围重写，先保证行业页和目录页分工清楚。

## Reject / 不建议主推

- brainstorming：搜索量高，但意图偏方法论，不适合作家具采购主词。
- 二手、酒店品牌名、motel、Paris/Sheraton/Westin 等酒店 Discover 噪音：不进入 Hymueble 主词池。
- 单独的 penthouses / villas de lujo：容易偏地产/灵感/零售，只能在住宅项目语境里辅助使用。
