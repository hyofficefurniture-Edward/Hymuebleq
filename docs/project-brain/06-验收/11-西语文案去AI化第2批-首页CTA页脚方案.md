# Hymueble 西语文案去 AI 化第 2 批方案：首页首屏、首页 CTA、页脚信任文案

日期：2026-07-03

状态：方案待审批，不改代码。

## A. 本批边界

本批只审核并试改：

- 首页 meta title / description：作为首页 SEO 支撑项。
- 首页首屏：eyebrow、H1、lead、主 CTA、次 CTA、首屏 proof strip。
- 首页底部核心 CTA：当前由 `CTA` 组件默认文案渲染。
- 页脚信任文案：logo 旁简介、联系入口、底部版权/信任句。

本批不碰：

- URL、页面结构、视觉设计。
- 首页后续大段模块，如 showrooms、video、catalog、process、factory evidence、FAQ。
- Hotel / Office / Salud / Educación / Residencial 页面。
- 项目案例、目录页、下载页。
- 全站共享 CTA 按钮文案，除非你明确批准提前处理共享组件。原因：`CTA.astro` 的按钮会影响多个页面，SOP 中共享 CTA 原计划在第 7 批。

## B. 高质量同行研究表

> 说明：以下页面均已通过联网打开原站核验。只学习高质量同行的表达模式，不复制原文。混合电商站只学习 B2B 项目表达，不学习购物车、价格、SKU、库存和折扣口吻。

| # | 搜索关键词 | 网站 / URL | 国家 / 市场 | 页面类型 | 是否已打开核验 | 是否高质量同行 | 可学习表达模式 | 是否仅作为反例 | 排除原因 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `site:.mx mobiliario para proyectos empresas cotización showroom muebles México` | Linea Italia: https://lineaitalia.com.mx/ | 墨西哥 | 首页 / 办公家具 | 是 | 是 | `muebles de oficina`、showroom、企业需求、线下分支支撑信任 | 否 | 无 |
| 2 | `site:.mx mobiliario para proyectos empresas cotización showroom muebles México` | Gebesa: https://www.gebesa.com/ | 墨西哥 | 首页 / 办公家具 | 是 | 是 | `muebles de oficina y mobiliario corporativo`、`solicitar cotización`、catálogos、certificaciones、casos | 否 | 无 |
| 3 | `site:.mx mobiliario para proyectos empresas cotización showroom muebles México` | PM Steele: https://www.pmsteele.com.mx/ | 墨西哥 | 首页 / 办公家具 / 工业存储 | 是 | 是 | `asesoría para tu proyecto`、`solicita cotización`、showrooms、catálogos、contacto | 否 | 无 |
| 4 | `México muebles para hotel a medida cotización proyecto mobiliario hotelero` | Embeka hotel: https://embeka.com.mx/muebles-para-hotel/ | 墨西哥 | 酒店家具页 | 是 | 是 | `muebles para hotel`、`Cuéntanos tu proyecto`、`cotización personalizada`、低风险表达如避免 retrasos/sorpresas | 否 | 无 |
| 5 | `México muebles sobre diseño oficina hotel cotización proyecto` | Embeka sobre diseño: https://embeka.com.mx/muebles-sobre-diseno/ | 墨西哥 | 定制 / 工厂能力 | 是 | 是 | `planos`、`renders`、`un solo fabricante`、`una sola cotización`、流程拆解 | 否 | 无 |
| 6 | `site:.co mobiliario para empresas proyectos cotización muebles Colombia` | Mepal: https://www.mepal.com.co/ | 哥伦比亚 | 首页 / 办公家具 | 是 | 是，混合站 | `COTIZA AQUÍ`、面向 corporativo/salud/educación/hoteles、`catálogo`、`proyectos` | 否，混合 | 不学习 `carrito`、ofertas、tienda online |
| 7 | `DUCON Colombia muebles oficina diseño producción suministro instalación` | Ducon: https://www.ducon.com.co/ | 哥伦比亚 | About / 能力 | 是 | 是 | `diseño, producción, suministro e instalación`、按预算和空间需求响应 | 否 | 无 |
| 8 | `Colombia mobiliario oficina fabricación propia control de calidad cotización WhatsApp` | Induaya: https://induaya.com.co/ | 哥伦比亚 | 首页 / 信任 | 是 | 是 | 生产自有、控制质量、`proyectos a medida`、WhatsApp cotización | 否 | 无 |
| 9 | `MUMA Colombia mobiliario corporativo proyectos oficinas` | MUMA: https://www.muma.co/ | 哥伦比亚 / 区域 | 首页 / contract brand | 是 | 是，混合站 | contract、区域覆盖、工作/教育/等待/酒店场景、商业咨询入口 | 否，混合 | 不学习价格、电商商品卡 |
| 10 | `MUMA Colombia proyectos mobiliario corporativo` | MUMA proyectos: https://www.muma.co/blogs/proyectos | 哥伦比亚 / 区域 | 项目案例 | 是 | 是 | 项目按 corporativo/educativo/hospitalidad/salud 分类，案例说明空间体验 | 否 | `soluciones integrales` 需谨慎，不单独学习 |
| 11 | `Kassani Colombia mobiliario corporativo proyectos oficinas` | Kassani corporativo: https://kassani.com/mobiliario-corporativo/ | 哥伦比亚 | 办公 / 目录 | 是 | 是 | `catálogo de muebles corporativos`、ergonomía、funcionalidad、espacios de trabajo | 否 | `altos estándares` 这类形容词需有证据时才用 |
| 12 | `NIHM Workplace Perú mobiliario oficina proyectos corporativos` | NIHM Workplace: https://nihmworkplace.com/ | 秘鲁 | 首页 / 办公项目 | 是 | 是 | `muebles de oficina para proyectos corporativos`、Durabilidad、ergonomía、empresas en Lima/Perú | 否 | 无 |
| 13 | `Estilo Oficina Perú mobiliario corporativo a medida empresas` | Estilo Oficina corporativo: https://estilooficina.com/mobiliario-corporativo/ | 秘鲁 | 企业家具 | 是 | 是 | `mobiliario corporativo a la medida`、目标/预算、企业客服支持 | 否 | 不学习过度泛行业覆盖 |
| 14 | `Mobiliario de oficina Lima a medida cotización empresas` | Adecor: https://www.adecor.pe/mobiliarios-de-oficina/ | 秘鲁 | 办公家具 / 询价 | 是 | 是 | `solicita tu cotización`、a medida、FAQ 回答材料/时间/预算，低压力解释 `depende` | 否 | `gratis` 是否使用需谨慎 |
| 15 | `Metal Office Perú mobiliario oficinas proyectos arquitectos diseñadores` | Metal Office: https://www.metaloffice.pe/mobiliario-de-oficinas/ | 秘鲁 | 项目 / 办公 | 是 | 是 | 直接点出项目痛点：medidas、retrasos、acabados、comunicación técnica；`extensión de tu equipo` | 否 | 无 |
| 16 | `site:.cl mobiliario oficina proyectos empresas cotización Chile` | SC Office: https://scoffice.cl/ | 智利 | 首页 / 办公项目 | 是 | 是 | `muebles de oficina y proyectos integrales`、`cotización`、`ver catálogo de muebles` | 否 | 无 |
| 17 | `Chile mobiliario oficina proyectos empresas cotización` | Dasec: https://dasec.cl/ | 智利 | 首页 / 目录 | 是 | 是，混合站 | `cotizar proyecto`、fabricación nacional、despacho coordinado、asesoría para empresas | 否，混合 | 不学习 carrito、ofertas、tienda |
| 18 | `mobiliario comercial corporativo a medida proyectos Perú` | Mobico: https://mobiliariocomercial.pe/ | 秘鲁 | 首页 / 商业家具 | 是 | 是 | diseño、fabricación、instalación、planta propia、mobiliario comercial/corporativo a medida | 否 | `alta calidad` 不单独学习 |

质量筛选结论：

- 本批正向样本数量：18 个已打开页面。
- 可作为强正向样本：Linea Italia、Gebesa、PM Steele、Embeka、Ducon、Induaya、NIHM、Metal Office、SC Office、Mobico。
- 混合样本：Mepal、MUMA、Dasec、Adecor。只学习其 B2B 项目、目录、询价表达，不学习电商价格、购物车、促销和 `gratis`。
- 没有把低质量/野鸡站作为正向依据。

## C. 同行表达归纳

### C1. 常见 CTA

- `Solicitar cotización`
- `Cotiza tu proyecto`
- `Cotización ahora`
- `Cuéntanos tu proyecto`
- `Solicitar asesoría`
- `Ver catálogo de muebles`
- `Hablar por WhatsApp`

对 Hymueble 的应用：

- 首页首屏 CTA 应保留 `cotización`，不只写 `Contáctenos`。
- 次 CTA 可以保留 `showroom`，但最好和“cotizar 前先参考”相关。
- 共享 CTA 中的 `gratuita` 有轻微广告感，建议后续统一处理。

### C2. 常见动词

- `fabricamos`
- `diseñamos`
- `equipamos`
- `suministramos`
- `instalamos`
- `coordinamos`
- `revisamos`
- `cotizamos`

对 Hymueble 的应用：

- 首页要多用“生产、控制、出口、报价、支持”这些动作，少用抽象态度词。
- 因 Hymueble 是中国工厂出口型供应商，不能写成本地装修公司或本地安装团队。

### C3. 常见采购材料表达

- `planos`
- `medidas`
- `cantidades`
- `acabados`
- `materiales`
- `referencias`
- `presupuesto`
- `cronograma`
- `catálogo`

对 Hymueble 的应用：

- 首页 CTA 和页脚可以提示客户先发 sector、ciudad、espacios、cantidades aproximadas。
- 不要要求客户一开始就必须有完整 FF&E 或图纸。

### C4. 工厂 / 项目 / 案例表达

- 高质量同行通常把“项目”具体化为空间、材料、预算、流程、交付或案例。
- 可信表达不是“somos líderes”，而是“设计/生产/供应/安装/质检/项目分类/目录/案例/联系人”。
- Metal Office 的项目痛点表达值得学习：尺寸不准、延误、沟通不清、收尾不一致，这些比空泛品牌话术更能触发采购注意。

### C5. 需要避免的反例

- `compra en línea`、`carrito`、`ofertas`、单品价格、SKU。
- 单独出现的 `soluciones integrales`。
- `calidad superior`、`líder en la industria`、`comprometidos con la excelencia`。
- 过度 `premium / lujo / exclusivo`，除非页面有明确证据。
- 把出口工厂写成本地室内设计/装修施工公司。

## D. 心理学 / UX 分析

本批页面位置靠近第一印象，客户心理压力主要有：

1. 不确定 Hymueble 是不是适合自己的项目类型。
2. 不知道是否可以只带初步资料来询价。
3. 担心中国供应商沟通复杂、出口包装和质量风险高。
4. 担心页面只是品牌口号，不能回答实际采购问题。
5. 看到 `cotización gratuita` 可能产生轻微广告/低价线索感，不像严肃 B2B 项目询价。

对应处理：

- 首屏第一句话直接说明：`muebles para proyectos comerciales` + `Latinoamérica` + `fabricación directa en China`。
- lead 不堆形容词，直接列行业、质量控制、出口包装、cotización。
- 首页 CTA 文案保留 `cotización`，次 CTA 用 showroom 降低沟通压力。
- CTA 区使用 `puedes compartir`、`cantidades aproximadas`、`si todavía no tienes...`。
- 页脚信任句保留“项目、工厂、质量、出口”而不是品牌自夸。

心理学依据来自 NN/g 相关原则：可信网站需要清楚、当前、完整的信息；表单和询价要降低信息负担；B2B 用户需要为复杂采购建立短名单和内部说服材料。

## E. SEO 关键词护栏

首页必须保留或前置：

- `muebles para proyectos comerciales`
- `mobiliario comercial`
- `proyectos en Latinoamérica`
- `fabricación directa en China`
- `proveedor`
- `cotización`
- `catálogo`
- `WhatsApp`
- `control de calidad`
- `exportación`
- `hoteles`
- `oficinas`

首页首屏建议关键词布局：

- Meta title：`Muebles para proyectos comerciales...` 前置。
- Meta description：以 `Muebles para proyectos comerciales...` 开头。
- Eyebrow：保留 `Proveedor` + `proyectos B2B`。
- H1：以 `Muebles para proyectos comerciales...` 开头。
- Lead：以 `Muebles para hoteles, oficinas...` 开头。
- Primary CTA：`Solicitar cotización de proyecto`。
- Footer signature：以 `Muebles para proyectos...` 开头。

## F. 逐模块问题清单

| 页面 | 模块 | 原文 | 问题类型 | 对转化的影响 | 同行表达依据 | 心理学 / UX 依据 | SEO 风险 | 是否需要业务确认 |
|---|---|---|---|---|---|---|---|---|
| 首页 | meta title | `Hymueble \| Mobiliario comercial para proyectos en Latinoamérica` | SEO 前置不足 | 品牌在最前，主搜索词不够前置 | NIHM、Gebesa、PM Steele 都把品类词放得更靠前 | 搜索结果第一眼应说明卖什么 | 中：主词不在最前 | 否 |
| 首页 | meta description | `Proveedor de mobiliario para proyectos comerciales...` | 可更具体 | 有定位，但行业、质量、出口可以更直接 | 多个同行把行业、项目和能力写在前段 | 降低不确定性 | 低：关键词已在，但可更强 | 否 |
| 首页首屏 | eyebrow | `Proveedor de mobiliario para proyectos` | 可更 B2B | 有定位，但未突出 B2B 项目家具 | 同行常用 empresas/proyectos/cotización | 让客户快速判断是否匹配 | 低 | 否 |
| 首页首屏 | H1 | `Mobiliario comercial para proyectos en Latinoamérica, directo de fábrica en China` | SEO 还可以，但 `muebles` 不在 H1 | `mobiliario` 对专业买家可以，但 `muebles` 搜索更直观 | 同行 H1 常直接用 `muebles de oficina`、`muebles para hotel` | 首屏要让采购客户立刻知道品类 | 中：`muebles` 缺失 | 否 |
| 首页首屏 | lead | `Muebles para proyectos comerciales, hoteles y oficinas con fabricación directa en China, control de calidad y soporte de exportación.` | 覆盖行业不全；语气略像关键词句 | 未提 salud/educación/residencial，客户可能以为只做 hotel/office | Mepal、MUMA、Estilo Oficina都列多个场景 | 降低“是否适合我行业”的疑问 | 低 | 否 |
| 首页首屏 | primary CTA | `Solicitar cotización` | 基本合格 | 可更项目化 | 同行常用 `cotiza tu proyecto`、`solicitar cotización` | 具体 CTA 降低犹豫 | 低 | 否 |
| 首页首屏 | secondary CTA | `Explorar showroom virtual` | 合格但可降低压力 | 可强调先看再询价 | Linea Italia、PM Steele 使用 showroom；Embeka 用项目咨询 | 让客户先收集参考，不必马上提交完整资料 | 低 | 否 |
| 首页首屏 | proof strip | `Sin intermediarios`、`5 sectores comerciales`、`Control de calidad`、`Exportación y embalaje` | `Sin intermediarios`略口号化 | 有攻击性/销售腔，证据感略弱 | Induaya、Mobico 更常说 fabricación/controles/proceso | 用证据替代强口号 | 低 | 否 |
| 首页底部 CTA | title | `¿Tienes un proyecto de mobiliario?` | SEO 前置不足 | 问句自然，但主词不在句首 | 同行更常用 `Cotiza tu proyecto` | CTA 区应具体说明下一步 | 中 | 否 |
| 首页底部 CTA | text | `Comparte alcance, ciudad, cantidades y plazo. Revisamos tu solicitud y respondemos en horario laboral.` | 低压力还不够 | 没有说明资料不完整也可开始 | Adecor、Embeka 的表单/FAQ会解释资料、预算、项目阶段 | 降低表单压力 | 低 | 否 |
| 首页底部 CTA | button | `Solicitar cotización gratuita` | CTA 语气风险 / 共享组件影响 | `gratuita` 有广告感；但改组件会影响多页 | B2B 同行更常见 `solicitar cotización` 或 `cotiza tu proyecto` | 严肃项目采购不必强调免费 | 低 | 否 |
| 页脚 | signature paragraph | `Mobiliario B2B directo de fábrica para proyectos comerciales, hoteleros e institucionales.` | 可更具体 | 没有出现 `muebles`、`control de calidad`、`exportación` | 高质量同行页脚/信任区常保留联系、目录、项目、保障 | 页脚是最后的信任补强 | 中 | 否 |
| 页脚 | contact link | `Formulario de proyecto` | 可更转化 | `proyecto` 有，但 `cotización` 缺失 | 同行联系入口常用 cotización/WhatsApp | 让客户知道表单用途 | 低 | 否 |
| 页脚 | bottom trust | `Mobiliario B2B directo de fábrica para proyectos.` | 稍短、证据不足 | 页脚底部可承接首页定位 | 同行底部通常保留品牌+联系方式+能力 | 最后一次确认供应商定位 | 中 | 否 |

## G. 试改稿

| 页面 | 模块 | 原文 | 建议改写 | 保留关键词 | SEO 前置检查 | 拉美 B2B 用语检查 | 心理压力检查 | 是否建议本批执行 |
|---|---|---|---|---|---|---|---|---|
| 首页 | meta title | `Hymueble \| Mobiliario comercial para proyectos en Latinoamérica` | `Muebles para proyectos comerciales en Latinoamérica \| Hymueble` | `muebles`, `proyectos comerciales`, `Latinoamérica` | `Muebles para proyectos comerciales` 在最前 | 符合 B2B 搜索 | 无压力问题 | 建议 |
| 首页 | meta description | `Proveedor de mobiliario para proyectos comerciales en Latinoamérica, con fabricación directa en China para hoteles, oficinas, salud, educación y desarrollos residenciales.` | `Muebles para proyectos comerciales en Latinoamérica, con fabricación directa en China para hoteles, oficinas, salud, educación y residencias.` | `muebles`, `proyectos comerciales`, `fabricación directa en China`, `hoteles`, `oficinas` | 主词在句首 | 自然采购语义 | 不要求资料 | 建议 |
| 首页首屏 | eyebrow | `Proveedor de mobiliario para proyectos` | `Proveedor de muebles para proyectos B2B` | `proveedor`, `muebles`, `proyectos B2B` | `Proveedor de muebles` 前置 | 符合采购语义 | 不增加压力 | 建议 |
| 首页首屏 | H1 | `Mobiliario comercial para proyectos en Latinoamérica, directo de fábrica en China` | `Muebles para proyectos comerciales en Latinoamérica, con fabricación directa en China` | `muebles`, `proyectos comerciales`, `Latinoamérica`, `fabricación directa en China` | `Muebles para proyectos comerciales` 在句首 | 清楚直接 | 不增加压力 | 建议 |
| 首页首屏 | lead | `Muebles para proyectos comerciales, hoteles y oficinas con fabricación directa en China, control de calidad y soporte de exportación.` | `Muebles para hoteles, oficinas, salud, educación y desarrollos residenciales, con control de calidad, embalaje de exportación y apoyo para preparar tu cotización.` | `muebles`, `hoteles`, `oficinas`, `control de calidad`, `exportación`, `cotización` | `Muebles para hoteles...` 在句首 | 覆盖行业和项目采购 | `preparar tu cotización` 比硬销售低压 | 建议 |
| 首页首屏 | primary CTA | `Solicitar cotización` | `Solicitar cotización de proyecto` | `Solicitar cotización`, `proyecto` | `Solicitar cotización` 在句首 | 同行常见 CTA | 具体但不强迫 | 建议 |
| 首页首屏 | secondary CTA | `Explorar showroom virtual` | `Revisar showroom virtual` | `showroom` | SEO 不是主 CTA，可接受 | 更像采购前参考动作 | `revisar` 比 `explorar` 更业务化 | 建议 |
| 首页首屏 | proof strip 1 | `Sin intermediarios` | `Fabricación directa` | `fabricación` | 能力词前置 | 证据感更强 | 不夸张 | 建议 |
| 首页首屏 | proof strip 2 | `5 sectores comerciales` | `5 sectores de proyecto` | `sectores`, `proyecto` | 保留项目词 | 更 B2B | 不增加压力 | 建议 |
| 首页首屏 | proof strip 3 | `Control de calidad` | 保留：`Control de calidad` | `control de calidad` | 通过 | 采购信任词 | 不增加压力 | 建议保留 |
| 首页首屏 | proof strip 4 | `Exportación y embalaje` | `Embalaje de exportación` | `exportación`, `embalaje` | `Embalaje` 前置，语义更标准 | 出口采购语义 | 不增加压力 | 建议 |
| 首页底部 CTA | title | `¿Tienes un proyecto de mobiliario?` | `Cotización de muebles para tu proyecto` | `cotización`, `muebles`, `proyecto` | `Cotización de muebles` 在句首 | 采购动作清楚 | 不强迫 | 建议，只改首页调用文案 |
| 首页底部 CTA | text | `Comparte alcance, ciudad, cantidades y plazo. Revisamos tu solicitud y respondemos en horario laboral.` | `Puedes compartir sector, ciudad, espacios, cantidades aproximadas y plazo. Si todavía no tienes planos o lista FF&E, los revisamos después por WhatsApp o correo.` | `sector`, `ciudad`, `cantidades`, `planos`, `lista FF&E`, `WhatsApp` | 段落非主 SEO，可接受 | 真实 RFQ 语气 | 明确资料可后补 | 建议，只改首页调用文案 |
| 首页底部 CTA | primary button | `Solicitar cotización gratuita` | `Solicitar cotización de proyecto` | `cotización`, `proyecto` | 通过 | 比 `gratuita` 更 B2B | 不诱导低价心态 | 暂缓：这是共享组件按钮，建议第 7 批或单独批准 |
| 页脚 | signature paragraph | `Mobiliario B2B directo de fábrica para proyectos comerciales, hoteleros e institucionales.` | `Muebles para proyectos comerciales, hoteleros e institucionales, con fabricación directa en China, control de calidad y soporte de exportación.` | `muebles`, `proyectos`, `fabricación directa`, `control de calidad`, `exportación` | `Muebles para proyectos` 在句首 | 工厂/出口信任更清楚 | 不增加压力 | 建议 |
| 页脚 | contact link | `Formulario de proyecto` | `Formulario de cotización` | `formulario`, `cotización` | `Formulario de cotización` 清楚 | 真实询价入口 | 降低不确定性 | 建议 |
| 页脚 | bottom trust | `© 2026 Hymueble. Mobiliario B2B directo de fábrica para proyectos.` | `© 2026 Hymueble. Muebles para proyectos B2B con fabricación directa y soporte de exportación.` | `muebles`, `proyectos B2B`, `fabricación`, `exportación` | `Muebles para proyectos` 前置 | 更采购化 | 不增加压力 | 建议 |

## H. 三重自检

### H1. Google SEO 自检

| 模块 | 检查 | 判断 |
|---|---|---|
| 首页 meta title | `Muebles para proyectos comerciales` 前置 | 通过 |
| 首页 meta description | `Muebles para proyectos comerciales` 前置 | 通过 |
| 首页 H1 | `Muebles para proyectos comerciales` 前置 | 通过 |
| 首页 lead | `Muebles para hoteles, oficinas...` 前置 | 通过 |
| 主 CTA | `Solicitar cotización` 前置 | 通过 |
| CTA title | `Cotización de muebles` 前置 | 通过 |
| 页脚 signature | `Muebles para proyectos` 前置 | 通过 |
| 页脚 bottom | `Muebles para proyectos B2B` 前置 | 通过 |

### H2. 拉美 B2B 用语自检

| 检查项 | 判断 |
|---|---|
| 使用 `cotización / proyecto / WhatsApp / catálogo / showroom` 等采购入口 | 通过 |
| 保留 `muebles / mobiliario / proyectos comerciales / hoteles / oficinas` | 通过 |
| 不使用 `líder / excelencia / calidad superior` | 通过 |
| 不学习电商词 `carrito / comprar / oferta / SKU / precio` | 通过 |
| 不把 Hymueble 写成本地装修公司 | 通过 |

### H3. 客户心理压力自检

| 压力来源 | 处理方式 | 判断 |
|---|---|---|
| 不确定是否适合自己的行业 | lead 覆盖 hoteles、oficinas、salud、educación、residencial | 通过 |
| 不知道是否能先简单询价 | CTA text 使用 `puedes compartir`、`cantidades aproximadas` | 通过 |
| 没有图纸/FF&E | CTA text 使用 `si todavía no tienes planos o lista FF&E...` | 通过 |
| 担心出口和质量风险 | 首屏和页脚保留 `control de calidad`、`embalaje de exportación` | 通过 |
| 担心点 CTA 后被强销售 | 次 CTA 保留 showroom，支持先看参考再询价 | 通过 |

## I. 是否建议进入代码修改

建议进入第 2 批代码修改，但必须等你审批。

建议本批执行：

1. `src/pages/index.astro`
   - meta title / description。
   - 首页首屏 eyebrow、H1、lead。
   - 首页首屏 primary/secondary CTA。
   - 首页首屏 proof strip。
   - 首页 `<CTA />` 调用改为首页专属 title/text。

2. `src/components/Footer.astro`
   - logo 旁简介。
   - `Formulario de proyecto` 改为 `Formulario de cotización`。
   - footer bottom trust sentence。

暂不建议本批执行：

- `src/components/CTA.astro` 的按钮 `Solicitar cotización gratuita`。原因：这是共享组件按钮，影响多个页面。建议第 7 批统一处理，除非你明确批准本批提前处理共享 CTA 按钮。
- Footer 的导航结构和栏目名。
- 首页除首屏和底部 CTA 之外的其他模块。

需要你审批的点：

1. 是否接受 H1 改为：`Muebles para proyectos comerciales en Latinoamérica, con fabricación directa en China`。
2. 是否接受首页底部 CTA title/text 的低压力版本。
3. 是否本批只改首页 `<CTA />` 调用，不改 `CTA.astro` 共享按钮。
4. 是否接受页脚将 `Mobiliario B2B` 前置改为 `Muebles para proyectos...`。

审批通过后，下一步才进入小范围代码修改，并运行：

```bash
git diff --check
pnpm build
pnpm qa:static
pnpm qa:browser
```

如果后续批准提前改共享 CTA 按钮，再追加检查受影响页面。
