# 扩展 SERP 意图验证

## 方法

- 抽样地区语境：拉美西语采购语境，重点参考 Mexico、Colombia、Peru、Chile。
- 观察对象：页面标题、结果类型、是否 B2B 采购、是否目录/供应商/厂家/案例/内容。
- 判定原则：能承接 RFQ、项目采购、批量/定制/工厂/供应商语义的词优先；零售、电商、二手、品牌词、方法论词降级。

| keyword | target_url | Planner avg monthly | SERP observed intent | intent match | competing result examples | decision | evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| muebles para hoteles | /hoteles/ | 500 | 酒店家具供应商、contract、目录和部分 marketplace | 高 | Malvena、Parahotel、FurnitureRoots、Revista Equipar | P0 主词 | https://malvena.com.mx/collections/mobiliario-para-hoteles; https://parahotel.es/; https://furnitureroots.com/es/mobiliario-hosteleria/ |
| mobiliario hotelero | /hoteles/ | 50 | 供应商、contract 家具、行业目录 | 高 | Frajumar、Mobihotel、ATEPAA | P0 辅助/同义主词 | https://frajumar.com/categoria-producto/mobiliario-para-hoteles/; https://www.mobihotel.es/; https://furniture.atepaa.com/es/pages/mobiliario-de-hotel |
| catálogo de muebles para hoteles | /catalogo/hoteles/ | — | 目录、供应商集合、产品分类 | 高 | Revista Equipar、FurnitureRoots、供应商目录 | P1 目录页主词 | https://www.revistaequipar.com/proveedor/muebles-para-hoteles |
| muebles para habitaciones de hotel | /catalogo/hoteles/habitaciones/ | 50 | 客房家具、酒店用品、指南和供应商 | 高 | GCON、ATEPAA、酒店家具供应商 | P0 小类主词 | https://www.gcongroup.com/es/what-types-of-hotel-furniture-are-needed.html |
| muebles para lobby de hotel | /catalogo/hoteles/ | 50 | 酒店公共区/接待家具，部分零售单品 | 中 | 酒店家具供应商与图片型结果 | P1 H2/正文 | Keyword Planner Discover export |
| mobiliario para hoteles y restaurantes | /catalogo/hoteles/muebles-para-restaurante/ | 50 | 酒店与餐饮家具供应商 | 高 | Revista Equipar、contract 供应商 | P1 小类辅助 | https://www.revistaequipar.com/proveedor/muebles-para-hoteles-y-restaurantes |
| proveedores de muebles para hoteles | /hoteles/ | 50 | 供应商查询，B2B 强 | 高 | 酒店家具供应商、行业目录 | P0 辅助转化词 | Keyword Planner Discover export |
| mobiliario contract para hoteles | /hoteles/ | 50 | contract 家具和酒店项目采购 | 高 | Frajumar、Parahotel 等 contract 页面 | P1 辅助词 | https://frajumar.com/categoria-producto/mobiliario-para-hoteles/; https://parahotel.es/ |
| mobiliario de oficina | /oficinas/ | 5,000 | 品牌、供应商、办公家具目录、零售混合 | 中高 | WellOffice、Herman Miller、PM STEELE、Uline | P0 行业词 | https://www.welloffice.co/; https://www.hermanmiller.com/es_mx/; https://www.pmsteele.com.mx/ |
| muebles para oficina | /oficinas/ | 5,000 | 本地供应商、电商、品牌目录混合 | 中 | Office Class、Uline、Grupo Demso | P0 行业词 | https://officeclass.com/; https://es.uline.mx/Cls_40/Office-Furniture; https://grupodemso.com/ |
| catálogo de muebles de oficina | /catalogo/oficinas/ | 500 | 目录/产品列表/供应商 | 高 | Sumosa、办公家具目录类站点 | P0 目录页主词 | https://www.sumosa.com/material-de-oficina/muebles-de-oficina/ |
| puestos de trabajo para oficina | /catalogo/oficinas/puestos-de-trabajo/ | 500 | 产品目录、工作站供应商、图片灵感 | 高 | Estudio4d 等产品页 | P0 小类主词 | https://www.estudio4d.com/puestos-de-trabajo.html |
| estaciones de trabajo para oficina | /catalogo/oficinas/puestos-de-trabajo/ | 500 | 办公工作站产品页和供应商 | 高 | 办公家具品牌/供应商 | P0 辅助词 | Keyword Planner historical export |
| muebles para espacios colaborativos | /catalogo/oficinas/colaboracion-y-brainstorming/ | 50 | 协作空间家具、办公解决方案、少量博客 | 高 | Sellex、Mepal、WeWork 内容结果 | P1 替代 brainstorming 主词 | https://www.sellex.es/es/soluciones/mobiliario-espacios-colaborativos; https://www.mepal.com.co/categoria-catalogo/zonas-colaboracion/ |
| mobiliario colaborativo | /catalogo/oficinas/colaboracion-y-brainstorming/ | 50 | 协作办公家具/空间解决方案 | 高 | 办公解决方案供应商 | P1 辅助词 | Keyword Planner historical export |
| brainstorming | /catalogo/oficinas/colaboracion-y-brainstorming/ | 50,000 | 方法论、会议技巧、创新文化，少数办公空间内容 | 低 | 方法内容、办公博客 | Reject 主词；可做场景词 | https://www.oficinasmontiel.com/blog/crea-espacios-brainstorming-dinamico-oficinas-modernas/ |
| mobiliario escolar | /educacion/ | 5,000 | 学校家具供应商、厂家、教育目录 | 高 | Mobiliario Escolar MX、Memosa、Muebles para colegios | P1 行业页主词 | https://mobiliarioescolar.mx/; https://www.memosamuebles.com/blog/fabricantes-de-mobiliario-escolar-en-mexico; https://mueblesparacolegios.com/ |
| muebles escolares | /educacion/ | 500 | 学校家具与零售混合 | 中高 | 教育家具供应商、目录 | P1 辅助词 | Keyword Planner historical export |
| muebles para escuelas | /educacion/ | 500 | 学校采购和电商混合 | 中 | 教育家具供应商 | P1 辅助词 | Keyword Planner historical export |
| mobiliario para laboratorios educativos | /catalogo/educacion/laboratorios-y-steam/ | — | 学校实验室家具供应商、教学设备 | 高 | Memosa、Tecnolab | P1 小类主词 | https://www.memosamuebles.com/mobiliario-escolar/muebles-para-laboratorio-escolar; https://www.tecnolab.mx/muebles-para-laboratorio-escolar |
| mobiliario para bibliotecas escolares | /catalogo/educacion/bibliotecas/ | 50 | 学校图书馆家具/供应商 | 高 | 教育家具目录 | P1 小类词 | Keyword Planner historical export |
| mobiliario para comedores escolares | /catalogo/educacion/comedores-escolares/ | 50 | 学校餐厅家具/供应商 | 高 | 教育家具目录 | P1 小类词 | Keyword Planner historical export |
| mobiliario hospitalario | /salud/ | 500 | 医疗家具、设备电商、医院/诊所供应商 | 中高 | Quirumed、Steelcase Health、医疗家具站 | P1 行业页主词 | https://www.quirumed.com/es/material-medico/mobiliario-hospitalario-y-medico; https://www.steelcase.com/na-es/descubre/informacion/health/ |
| muebles hospitalarios | /salud/ | 50 | 医疗设备/医疗家具电商和供应商 | 中 | Meditems、muebles-medicos、Redimedic | P1 辅助词 | https://meditems.com.mx/mobiliario-medico/muebles-para-consultorio-medico/; https://www.muebles-medicos.com.mx/; https://redimedicmexico.com/lineas-medicas/muebles-medicos/ |
| mobiliario para consultorios médicos | /catalogo/salud/consultorios-medicos/ | — | 诊所家具、电商、医疗供应商 | 中高 | El Hospital、Meditems | P1 小类主词 | https://www.elhospital.com/productos/mobiliario-clinico-y-de-consultorios-medicos-y-mesas-para-hospitalizacion |
| estaciones de enfermería | /catalogo/salud/estaciones-de-enfermeria/ | — | 护士站家具/医院空间，结果较少 | 中 | Hongye Spanish page、医疗家具供应商 | P2 小类观察 | https://es.hyofficefurniture.com/nurses-stations.html |
| fabricante de muebles en China | /fabrica/ | — | 中国厂家榜单、B2B 平台、采购代理内容 | 中高 | Made-in-China、Miglio、Neveitalia、Yiwu agent | P0 工厂页主词/辅助主词 | https://es.made-in-china.com/manufacturers/home-furniture.html; https://www.migliohome.com/es/product.html; https://neveitaliafurniture.com/es/top-16-chinese-furniture-manufacturers/ |
| proveedor de mobiliario comercial | /fabrica/ | — | 商业家具供应商、项目家具、批发服务 | 高 | Grupo Visnav、commercial furniture suppliers | P0 辅助词 | https://grupovisnav.com/mobiliario/; https://www.mueblesindustrialesycomerciales.com.mx/ |
| muebles para proyectos residenciales | /residencial/ | — | 住宅项目、家具包、室内设计/装修混合 | 中 | Interior Editions、Frajumar apartamentos | P1 项目型主词 | https://interioreditions.com/es/furniture-packs/; https://frajumar.com/proyectos-contract/apartamentos/ |
| mobiliario para apartamentos de lujo | /catalogo/residencial/penthouses-y-apartamentos-de-lujo/ | — | 豪宅装修、图库、零售家具、少量项目家具 | 中低 | Casa Padrino、contract apartments | P2 小类观察 | https://www.casa-padrino.de/es/muebles-de-lujo; https://frajumar.com/proyectos-contract/apartamentos/ |
| solicitar cotización de muebles | /contacto/ | — | 报价表单、本地木工/家具服务 | 中 | CarpinTecno、Carpiperg、Habitissimo | P0 转化页语义 | https://www.carpintecno.com/cotizacion-carpintecno.php; https://carpiperg.com/presupuesto/; https://www.habitissimo.com.mx/presupuesto/hacer-muebles-a-medida/ciudad-de-mexico |
| cotización de muebles de oficina | /contacto/ | 50 | 办公家具报价，商业意图强 | 高 | 供应商/报价页 | P1 转化辅助词 | Keyword Planner historical export |

## 总结

- 酒店和办公核心词具备真实商业 SERP，但结果中混入 retail/marketplace；Hymueble 页面必须一直强调项目、工厂、批量、材质确认、RFQ，而不是单件购买。
- 教育和医疗词有供应商/目录机会，但医疗 SERP 更容易混入医疗器械电商，需要页面表达更像机构项目家具。
- 工厂词适合 /fabrica/，首页不应过度抢 fabricante/fábrica。
- 转化词适合 /contacto/；其他页面保留 cotización CTA 即可。
