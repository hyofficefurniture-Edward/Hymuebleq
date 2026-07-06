# 合并关键词机会评分表

## 合并范围

- 酒店组 Discover：沿用上一轮 raw-discover-hotel-keyword-ideas.csv。
- 非酒店组 Discover：本轮补齐 office、factory、education、health、residential、conversion 六组。
- 历史指标：沿用 03-keyword-planner-volume-forecast.csv。
- SERP 意图：沿用 05-serp-intent-validation-expanded.md，不重新发散。
- 页面角色：沿用 06/07 的行业页、目录页、案例页、转化页分工。

## 评分口径

- 搜索需求：Keyword Planner Discover 优先，其次历史指标；无量不等于无价值。
- B2B 采购意图：供应商、厂家、目录、项目、机构采购优先；零售、价格、二手、品牌导航降级。
- 页面匹配：只映射到现有 URL，不新增 URL。
- 拉美本土化：优先保留 Mexico、Colombia、Peru、Chile 真实返回的西语表达；不按西班牙本土或英语直译表达优先。

| keyword | target_url | keyword_type | avg_monthly_searches | competition | bid_low | bid_high | b2b_fit | page_fit | commercial_value | final_score | priority | data_basis | intent_judgment |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mobiliario escolar | /educacion/ | education industry | 5000 | 中 | 10.35 | 48.36 | 5 | 5 | 4 | 87 | P0 | education Discover + historical metrics | strong LatAm education furniture phrase |
| muebles para hoteles | /hoteles/ | hotel industry | 500 | 中 | 12.99 | 55.80 | 5 | 5 | 5 | 86 | P0 | hotel Discover + historical metrics | B2B hotel supplier, catalog, and contract intent |
| muebles de oficina | /oficinas/ | office industry | 50000 | 高 | 12.01 | 288.17 | 3 | 5 | 5 | 84 | P0 | office Discover | very high LatAm volume but retail/catalog mix; use with project qualifier |
| mobiliario de oficina | /oficinas/ | office industry | 5000 | 高 | 15.52 | 375.03 | 4 | 5 | 5 | 84 | P0 | office Discover + historical metrics | B2B and catalog mix; strong sector phrase |
| muebles para oficina | /oficinas/ | office industry | 5000 | 高 | 12.24 | 413.27 | 4 | 5 | 5 | 84 | P0 | office Discover + historical metrics | high volume, natural LatAm wording, retail mix |
| mobiliario hospitalario | /salud/ | health industry | 500 | 中 | 5.91 | 28.01 | 5 | 5 | 4 | 82 | P1 | health Discover + historical metrics | strong hospital furniture phrase |
| mobiliario hotelero | /hoteles/ | hotel industry | 50 | 中 | 16.81 | 64.11 | 5 | 5 | 5 | 81 | P1 | hotel Discover + historical metrics | supplier and contract furniture intent |
| puestos de trabajo para oficina | /catalogo/oficinas/ | office subcategory | 500 | 低 | 4.09 | 18.70 | 4 | 5 | 4 | 81 | P1 | office Discover + historical metrics | clear workstation intent |
| mobiliario para bibliotecas escolares | /catalogo/educacion/ | education subcategory | 50 | 低 | 5.61 | 18.03 | 5 | 5 | 4 | 81 | P1 | education Discover + historical metrics | library furniture, low competition |
| catálogo de muebles de oficina | /catalogo/oficinas/ | office catalog | 500 | 高 | 8.77 | 58.14 | 5 | 5 | 4 | 80 | P1 | office Discover + historical metrics | catalog intent, prior P0 |
| fabricante de muebles a medida | /fabrica/ | factory | 50 | 高 | 5.66 | 19.56 | 5 | 5 | 5 | 79 | P1 | factory Discover + historical metrics | Discover-confirmed factory/custom furniture phrase |
| cotización de muebles de oficina | /contacto/ | conversion | 50 | 高 | 73.15 | 173.46 | 5 | 5 | 5 | 79 | P1 | conversion Discover + historical metrics | Discover-confirmed volume and high commercial intent |
| muebles escolares | /educacion/ | education industry | 500 | 中 | 11.19 | 50.40 | 5 | 4 | 4 | 78 | P1 | education Discover + historical metrics | natural LatAm phrase, mixed retail/procurement |
| pupitres escolares | /catalogo/educacion/ | education product | 5000 | 中 | 3.33 | 31.91 | 4 | 4 | 4 | 78 | P1 | education Discover | high LatAm education furniture volume |
| muebles para habitaciones de hotel | /catalogo/hoteles/ | hotel subcategory | 50 | 中 | 9.86 | 39.61 | 5 | 5 | 4 | 77 | P1 | hotel Discover + historical metrics | guestroom furniture intent |
| mobiliario para aulas escolares | /catalogo/educacion/ | education subcategory | 50 | 中 | 4.68 | 12.28 | 5 | 5 | 4 | 77 | P1 | education Discover + historical metrics | classroom furniture intent |
| mobiliario para comedores escolares | /catalogo/educacion/ | education subcategory | 50 | 中 | — | — | 5 | 5 | 4 | 77 | P1 | education Discover + historical metrics | school dining furniture intent |
| fabricantes de mobiliario escolar | /educacion/ | education supplier | 50 | 中 | 11.95 | 140.65 | 5 | 4 | 5 | 77 | P1 | education Discover | low volume, strong B2B supplier value |
| mobiliario para oficina | /oficinas/ | office industry | 5000 | 高 | 18.94 | 287.00 | 4 | 4 | 4 | 76 | P1 | office Discover | Discover-confirmed office phrase |
| solicitar cotización de muebles | /contacto/ | conversion | — | 未知 | — | — | 5 | 5 | 5 | 76 | P1 | conversion Discover + historical metrics | no volume returned, but strongest generic RFQ page role |
| cotizar proyecto de mobiliario | /contacto/ | conversion | — | 未知 | — | — | 5 | 5 | 5 | 76 | P1 | conversion Discover + historical metrics | no volume returned, high B2B conversion value |
| estaciones de trabajo para oficina | /catalogo/oficinas/ | office subcategory | 500 | 高 | 16.14 | 91.65 | 4 | 5 | 4 | 75 | P1 | office Discover + historical metrics | workstation intent, high competition |
| muebles para escuelas | /educacion/ | education industry | 50 | 中 | 17.39 | 64.52 | 5 | 4 | 4 | 73 | P1 | education Discover + historical metrics | institution buyer phrase |
| muebles hospitalarios | /salud/ | health industry | 50 | 中 | 1.59 | 13.24 | 5 | 4 | 4 | 73 | P1 | health Discover + historical metrics | natural phrase, mixed medical ecommerce |
| catálogo de muebles para hoteles | /catalogo/hoteles/ | hotel catalog | — | — | — | — | 5 | 5 | 4 | 72 | P1 | historical metrics | catalog browsing intent |
| mobiliario colaborativo | /catalogo/oficinas/colaboracion-y-brainstorming/ | office subcategory | 50 | 中 | — | — | 4 | 5 | 4 | 72 | P1 | office Discover + historical metrics | collaborative furniture intent |
| muebles para espacios colaborativos | /catalogo/oficinas/colaboracion-y-brainstorming/ | office subcategory | 50 | 未知 | — | — | 4 | 5 | 4 | 72 | P1 | office Discover + historical metrics | better than brainstorming for buyer intent |
| proveedor de mobiliario comercial | /fabrica/ | supplier | — | 未知 | — | — | 5 | 4 | 5 | 72 | P1 | factory Discover + historical metrics | B2B supplier phrase; no volume returned |
| fabricante de muebles en China | /fabrica/ | factory | — | 未知 | — | — | 4 | 5 | 5 | 71 | P1 | factory Discover + historical metrics | page-role fit, but Discover did not return volume |
| fábrica de muebles en China | /fabrica/ | factory | — | 未知 | — | — | 4 | 5 | 5 | 71 | P1 | factory Discover + historical metrics | page-role fit, but Discover did not return volume |
| sillas escolares | /catalogo/educacion/ | education product | 500 | 高 | 7.58 | 45.09 | 4 | 4 | 4 | 71 | P1 | education Discover | education product/category intent |
| butacas escolares | /catalogo/educacion/ | education product | 500 | 高 | 15.40 | 55.59 | 4 | 4 | 4 | 71 | P1 | education Discover | LatAm classroom seating term |
| mesas escolares | /catalogo/educacion/ | education product | 500 | 高 | 6.60 | 32.79 | 4 | 4 | 4 | 71 | P1 | education Discover | classroom furniture intent |
| mesas de laboratorio escolar | /catalogo/educacion/ | education subcategory | 50 | 高 | 18.62 | 61.80 | 5 | 4 | 4 | 71 | P1 | education Discover | Discover-confirmed lab school phrase |
| mobiliario para hospitales | /salud/ | health industry | 50 | 高 | 5.78 | 45.05 | 5 | 4 | 4 | 71 | P1 | health Discover | Discover-confirmed health buyer phrase |
| muebles para hospitales | /salud/ | health industry | 50 | 高 | 3.72 | 25.26 | 5 | 4 | 4 | 71 | P1 | health Discover | institutional furniture phrase |
| mobiliario para clínicas y hospitales | /salud/ | health industry | 50 | 高 | — | — | 5 | 4 | 4 | 71 | P1 | health Discover | LatAm clinic/hospital phrase |
| muebles para salas de juntas | /catalogo/oficinas/ | office subcategory | 50 | 高 | 14.70 | 75.69 | 4 | 5 | 4 | 70 | P1 | office Discover + historical metrics | meeting room furniture intent |
| muebles para lobby de hotel | /catalogo/hoteles/ | hotel subcategory | 50 | 中 | 9.41 | 20.55 | 4 | 4 | 4 | 68 | P2 | hotel Discover | lobby/public area intent |
| enviar proyecto de mobiliario por whatsapp | /contacto/ | conversion | — | 未知 | — | — | 5 | 4 | 4 | 68 | P2 | conversion Discover + historical metrics | no volume returned, high sales-process fit |
| catálogos de mobiliario para proyectos | /recursos/ | content/catalog | — | — | — | — | 5 | 4 | 4 | 68 | P2 | historical metrics | resource/catalog support term |
| mobiliario para laboratorios educativos | /catalogo/educacion/ | education subcategory | — | 未知 | — | — | 4 | 5 | 4 | 67 | P2 | education Discover + historical metrics | page-role fit; seed returned adjacent lab-school phrases |
| mobiliario para consultorios médicos | /catalogo/salud/ | health subcategory | — | 未知 | — | — | 4 | 5 | 4 | 67 | P2 | health Discover + historical metrics | consulting room page role fit |
| estaciones de enfermería | /catalogo/salud/ | health subcategory | — | 未知 | — | — | 4 | 5 | 4 | 67 | P2 | health Discover + historical metrics | niche but commercial hospital-space fit |
| fabrica de muebles a pedido | /fabrica/ | factory | 50 | 高 | — | — | 4 | 4 | 4 | 66 | P2 | factory Discover | LatAm custom wording; review spelling/accent and B2B fit |
| sillas de oficina | /catalogo/oficinas/ | office product | 50000 | 高 | 5.53 | 76.68 | 2 | 3 | 3 | 63 | P2 | office Discover | very high volume, mostly retail and single-product SERP |
| escritorios para oficina | /catalogo/oficinas/ | office product | 50000 | 高 | 7.80 | 119.74 | 2 | 3 | 3 | 63 | P2 | office Discover | very high volume, retail/product intent; avoid sector main keyword |
| muebles para proyectos residenciales | /residencial/ | residential project | — | 未知 | — | — | 4 | 4 | 4 | 63 | P2 | residential Discover + historical metrics | no volume returned; page role remains project-led |
| muebles para unidades modelo | /catalogo/residencial/ | residential project | — | 未知 | — | — | 4 | 4 | 4 | 63 | P2 | residential Discover + historical metrics | no volume returned; high project relevance |
| control de calidad de muebles | /recursos/blog/ | content | 50.0 | 低 | — | — | 3 | 4 | 3 | 63 | P2 | historical metrics | trust content, not main commercial page |
| sillones hospitalarios | /catalogo/salud/ | health product | 50 | 中 | 1.60 | 37.42 | 3 | 3 | 3 | 55 | P2 | health Discover | product term, use only in catalog context |
| mobiliario para apartamentos de lujo | /catalogo/residencial/ | residential project | — | 未知 | — | — | 3 | 4 | 3 | 54 | Observe | residential Discover + historical metrics | no volume returned; luxury retail risk |
| muebles para villas de lujo | /catalogo/residencial/ | residential project | — | 未知 | — | — | 2 | 4 | 3 | 49 | Observe | residential Discover + historical metrics | no volume returned; retail/inspiration risk |
| brainstorming | /catalogo/oficinas/colaboracion-y-brainstorming/ | information | 50000.0 | 低 | 6.13 | 46.96 | 1 | 1 | 1 | 40 | Reject | historical metrics | methodology intent, not furniture procurement |
| fabricantes de closets a la medida | /fabrica/ | factory noise | 500 | 高 | 6.88 | 25.10 | 2 | 2 | 2 | 36 | Reject | factory Discover | Discover volume but local residential closet intent |
| mobiliario escolar precios | /educacion/ | education price | 50 | 高 | 5.32 | 31.49 | 1 | 2 | 2 | 34 | Reject | education Discover | price-shopping intent, not main B2B SEO |
| los pinos muebles hospitalarios | /salud/ | health brand noise | 50 | 高 | — | — | 1 | 1 | 1 | 34 | Reject | health Discover | brand/local navigational intent |

## 合并后的关键变化

- /oficinas/ 的主词建议从 `muebles para oficina` 校准为 `muebles de oficina`，但 Title/H1 必须加 `para proyectos` 或 `para empresas` 限定，避免被零售意图带偏。
- /fabrica/ 的主词建议从 `fabricante de muebles en China` 校准为 `fabricante de muebles a medida`，China/fábrica/exportación 放辅助语义。
- /educacion/ 的 `mobiliario escolar` 继续成立，并新增 `pupitres escolares`、`sillas escolares`、`mesas escolares` 作为目录/H2 机会。
- /salud/ 的 `mobiliario hospitalario` 继续成立，并新增 `mobiliario para hospitales`、`mobiliario para clínicas y hospitales`。
- /residencial/ 和 /catalogo/residencial/ 未获得搜索量支撑，继续只做项目型低频高价值承接，不追高流量。
- /contacto/ 保持 `solicitar cotización de muebles` 作为主语义；`cotización de muebles de oficina` 是有量的转化辅助词。
