# Tally 联系表单建表规格

本文件只整理当前 `/contacto/` 原生表单的代码事实与后续 Tally 建表建议，不代表已经创建 Tally 表单，也不要求立即替换现有表单。

## 1. 当前代码位置

| 项目 | 当前确认 |
|---|---|
| 页面路径 | `src/pages/contacto.astro` |
| 页面 URL | `/contacto/` |
| 表单组件 | `src/components/ContactForm.astro` |
| 页面使用方式 | `<ContactForm />` 默认模式，不传 `compact`、`catalogLead` 或自定义 `submitLabel` |
| 表单样式 | `src/styles/partials/30-contact-form-cta.css` |
| 外层两栏布局 | `src/styles/partials/20-showroom-quality.css` 的 `.form-shell` |
| demo 提交脚本与附件文件名脚本 | `src/layouts/BaseLayout.astro` |
| 表单 action 配置 | `src/data/site.ts` 的 `formConfig.action` |
| 上线配置说明 | `docs/project-brain/05-开发/07-环境变量与上线配置.md` |

当前 `/contacto/` 页面顶部是两栏结构：左侧白色表单卡片，右侧图片与辅助说明面板。右侧内容包含图片、`Cotización por proyecto`、H1 `Solicita cotización de muebles para tu proyecto`、说明文案、WhatsApp CTA 和 showroom CTA。后续嵌入 Tally 时建议保留右侧图片与辅助内容，因为它承担低摩擦询盘说明和 WhatsApp 备选转化。

当前表单标题与说明：

- 表单 eyebrow：`Consulta rápida`
- 表单标题：`Cotización de proyecto con 5 datos iniciales.`
- 表单说明：`Para cotizar con más precisión, puedes enviar los detalles técnicos después. Si ya tienes planos, lista FF&E, cantidades o fotos de referencia, adjúntalos abajo.`
- 提交按钮：`Enviar mi consulta de proyecto`

当前成功、失败、隐私和 demo 状态：

- 配置真实 action 时的成功提示文案：`¡Muchas gracias! Recibimos tu consulta y te contactaremos en menos de 24 horas por WhatsApp o correo.`
- 未配置 action 时的 demo 提示文案：`Modo de vista previa: este formulario no se envió. Para cotizar ahora, usa WhatsApp o correo.`
- 当前失败提示：代码中未配置，Tally 内需要单独设置；当前状态标记为 `需要人工确认`。
- 隐私提示：`Tu información se usa para atender tu consulta. Consulta nuestra política de privacidad.`
- 隐私链接：`/privacidad/`
- 当前是否依赖 `PUBLIC_HYMUEBLE_FORM_ACTION`：是。`src/data/site.ts` 读取 `import.meta.env.PUBLIC_HYMUEBLE_FORM_ACTION?.trim()`。
- 当前是否存在 demo form 标记：是。当 `PUBLIC_HYMUEBLE_FORM_ACTION` 为空时，表单生成 `data-demo-form`，全站脚本拦截提交并显示 demo 提示；配置真实 action 后不再生成 `data-demo-form`。

## 2. 当前表单字段清单

以下为 `/contacto/` 当前默认 `<ContactForm />` 渲染出的字段。`catalog_interest` 只在图册弹窗 `catalogLead` 模式下出现，当前 `/contacto/` 页面不出现。

| 顺序 | label | placeholder | name | 字段类型 | 必填 | 选项 / 接受格式 | 备注 |
|---:|---|---|---|---|---|---|---|
| 0 | 无 | 无 | `source_path` | hidden | 是，自动生成 | 当前值为 `Astro.url.pathname`，在 `/contacto/` 为 `/contacto/` | 系统追踪字段，不是用户可见字段 |
| 1 | `Nombre o empresa *` | `Tu nombre o empresa` | `company` | text | 是 | 无 | 当前 input 未显式写 `type`，浏览器默认为 text |
| 2 | `WhatsApp *` | `+52 55 0000 0000` | `whatsapp` | text | 是 | 无 | 当前代码未使用 `type="tel"` |
| 3 | `País o ciudad del proyecto *` | `Ej. Ciudad de México, Bogotá` | `location` | text | 是 | 无 | 国家或城市合并字段 |
| 4 | `Tipo de proyecto *` | 首个空选项：`Selecciona un sector` | `sector` | select | 是 | `Hoteles`, `Oficinas`, `Salud`, `Educación`, `Residencial`, `Otro` | 空值为未选择状态 |
| 5 | `¿Qué proyecto de muebles necesitas cotizar? *` | `Ej. habitaciones y lobby para hotel, 80 habitaciones aproximadas, apertura en 3 meses...` | `message` | textarea | 是 | 无 | 当前 5 个必填数据之一 |
| 6 | `Adjuntar planos o lista FF&E del proyecto` / `Opcional` | 文件控件显示：`Ningún archivo seleccionado` | `attachments` | file | 否 | `.pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.webp,.zip,.rar,.dwg,.dxf` | 支持 `multiple`；自定义按钮文案：`Seleccionar archivos` |
| 7 | `Correo` | `tucorreo@empresa.com` | `email` | email | 否 | 无 | 位于 `Agregar detalles opcionales` 折叠区 |
| 8 | `Espacios a equipar` | `Habitaciones, lobby, restaurante...` | `spaces` | text | 否 | 无 | 位于可选折叠区 |
| 9 | `Cantidad aproximada` | `Ej. 80 habitaciones, 120 puestos` | `quantity` | text | 否 | 无 | 位于可选折叠区 |
| 10 | `Estado del proyecto` | 首个空选项：`Selecciona una etapa` | `stage` | select | 否 | `Idea inicial`, `Con planos o lista FF&E`, `En cotización`, `En construcción o remodelación`, `Compra urgente` | 位于可选折叠区 |
| 11 | `Tiempo estimado` | `Ej. apertura en 3 meses` | `timeline` | text | 否 | 无 | 位于可选折叠区 |
| 12 | `Presupuesto o rango objetivo` | `Opcional: rango estimado` | `budget` | text | 否 | 无 | 位于可选折叠区 |

当前附件说明文案：`Planos, lista FF&E, cantidades, fotos de referencia o archivos comprimidos ayudan a preparar una cotización más precisa.`

## 3. Tally 应创建的字段清单

Tally 主表单建议以当前 `/contacto/` 默认表单为基础，不加入当前页面不存在的新业务字段。唯一建议调整是：把 `Correo` 从可选折叠区提前到主表单可见区，但仍保持非必填。

| Tally 字段 | 建议 Tally 类型 | 对应当前 name | 必填 | 说明 |
|---|---|---|---|---|
| `Nombre o empresa` | Short answer | `company` | 是 | 保留当前 label 和 placeholder |
| `WhatsApp` | Short answer 或 Phone number | `whatsapp` | 是 | 为贴近当前代码，字段名仍按 WhatsApp；如 Tally 电话字段会限制格式，可改 Short answer |
| `Correo` | Email | `email` | 否 | 建议放在主表单可见区，label 可写为 `Correo (opcional)`；不要放进折叠区 |
| `País o ciudad del proyecto` | Short answer | `location` | 是 | 保留国家/城市合并输入，降低填写压力 |
| `Tipo de proyecto` | Dropdown 或 Multiple choice | `sector` | 是 | 选项与当前代码一致 |
| `¿Qué proyecto de muebles necesitas cotizar?` | Long answer | `message` | 是 | 保留为主要项目描述 |
| `Adjuntar planos o lista FF&E del proyecto` | File upload | `attachments` | 否 | 允许多文件；文件类型按当前 accept 配置 |
| `Espacios a equipar` | Short answer | `spaces` | 否 | 可选 |
| `Cantidad aproximada` | Short answer | `quantity` | 否 | 可选 |
| `Estado del proyecto` | Dropdown 或 Multiple choice | `stage` | 否 | 选项与当前代码一致 |
| `Tiempo estimado` | Short answer | `timeline` | 否 | 可选 |
| `Presupuesto o rango objetivo` | Short answer | `budget` | 否 | 可选 |
| `source_path` | Hidden field | `source_path` | 建议自动 | 当前原生表单已有隐藏字段；Tally 可用隐藏字段或 embed 参数记录 `/contacto/` |

不建议加入的新字段：

- SKU、购物车、库存、单价、在线支付等电商字段。
- 公司规模、职位、预算币种等当前代码未出现且可能增加填写压力的字段。
- `catalog_interest` 不属于 `/contacto/` 默认表单；只有未来图册弹窗接 Tally 时才需要单独处理。

## 4. Tally 字段顺序

建议顺序基本沿用当前表单，但把非必填的 `Correo` 提前到主表单可见区，避免用户必须点击 `Agregar detalles opcionales` 才能看到邮箱栏：

1. `Nombre o empresa`
2. `WhatsApp`
3. `Correo (opcional)`
4. `País o ciudad del proyecto`
5. `Tipo de proyecto`
6. `¿Qué proyecto de muebles necesitas cotizar?`
7. `Adjuntar planos o lista FF&E del proyecto`
8. 分隔/说明：`Agregar detalles opcionales`
9. `Espacios a equipar`
10. `Cantidad aproximada`
11. `Estado del proyecto`
12. `Tiempo estimado`
13. `Presupuesto o rango objetivo`
14. 隐私提示
15. 提交按钮：`Enviar mi consulta de proyecto`

如果 Tally 无法做折叠区，可用一个短说明块代替：`Datos opcionales para preparar una cotización más precisa.`

## 5. 必填字段

当前必填字段只有 5 个：

| 字段 | name |
|---|---|
| `Nombre o empresa` | `company` |
| `WhatsApp` | `whatsapp` |
| `País o ciudad del proyecto` | `location` |
| `Tipo de proyecto` | `sector` |
| `¿Qué proyecto de muebles necesitas cotizar?` | `message` |

附件、邮箱、空间、数量、项目阶段、周期和预算均为可选。

## 6. 附件上传要求

当前代码确认的附件字段：

- label：`Adjuntar planos o lista FF&E del proyecto`
- 可选标记：`Opcional`
- name：`attachments`
- type：`file`
- 是否多文件：是，当前 input 带 `multiple`
- 允许文件类型：`.pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.webp,.zip,.rar,.dwg,.dxf`
- 文件按钮文案：`Seleccionar archivos`
- 空状态文案：`Ningún archivo seleccionado`
- 说明文案：`Planos, lista FF&E, cantidades, fotos de referencia o archivos comprimidos ayudan a preparar una cotización más precisa.`

Tally 配置建议：

- 开启多文件上传。
- 文件类型尽量限制为当前 accept 列表；如果 Tally 不支持 `.dwg`、`.dxf`、`.rar` 等格式，需要人工确认是否放宽为“允许所有文件”或改为提示客户通过 WhatsApp/邮件补发。
- 如果 Tally 免费/当前套餐不支持文件上传，需要人工确认替代方案：云盘上传、Tally 付费附件、或后端接收。

## 7. 西语成功提示建议

优先沿用当前配置成功提示：

`¡Muchas gracias! Recibimos tu consulta y te contactaremos en menos de 24 horas por WhatsApp o correo.`

可作为 Tally Thank You 页面文案：

`¡Muchas gracias! Recibimos tu consulta de proyecto. Revisaremos los datos iniciales y te contactaremos en menos de 24 horas por WhatsApp o correo para indicar el siguiente paso.`

## 8. 西语失败提示建议

当前原生代码没有失败提示；Tally 失败态需要在 Tally 或嵌入层单独确认。

建议失败提示：

`No pudimos enviar el formulario en este momento. Puedes intentarlo de nuevo o escribirnos por WhatsApp para continuar con tu cotización.`

如果附件上传失败，可用：

`No pudimos recibir los archivos adjuntos. Puedes enviar primero los datos del proyecto y compartir planos, lista FF&E o referencias después por WhatsApp o correo.`

## 9. Tally 表单视觉建议

当前外层视觉结构：

- 页面第一屏为 `.section` 内的 `.container.form-shell`。
- `.form-shell` 桌面端两栏：左侧 `minmax(360px, 1fr)` 表单，右侧 `minmax(0, .84fr)` 辅助内容，间距 `34px`。
- 平板/移动端 `.form-shell` 改为单栏。
- 表单外层 `.form-card`：白色背景、`1px solid var(--line)` 边框、`8px` 圆角、`24px` 内边距。
- 当前 `.form-card` 本身未设置明显阴影；按钮有阴影。
- 表单内部 `.project-form`：桌面两列网格，`18px` gap；移动端单列。
- 表单 intro 是浅绿色块：边框、`8px` 圆角、`#f4f7f4` 背景。
- 输入框：白底、`1px #d9d5cc` 边框、`6px` 圆角、`12px 13px` padding。
- 附件区：浅米色背景 `#fbf7ef`、金色弱边框、`8px` 圆角。
- 主按钮文案：`Enviar mi consulta de proyecto`；主按钮视觉为金色渐变胶囊按钮。

Tally 嵌入建议：

- 优先使用透明或白底嵌入，让外层继续由独立站 `.form-card` 控制。
- Tally 内部字体尽量接近当前 Inter / system sans-serif。
- 圆角控制在 6-8px；不要使用过大的圆角。
- 主色靠近当前金色 `#c2a378`，深色按钮/强调色可参考 `#121a22`，辅助绿色可参考 `#1c6159`。
- 尽量隐藏 Tally 默认大标题，或让标题与当前 `Consulta rápida` / `Cotización de proyecto con 5 datos iniciales.` 保持一致，避免重复标题。
- 若 Tally iframe 高度固定，需要预留可选字段展开后的高度，避免内部滚动条过早出现。

## 10. 后续嵌入独立站时需要注意的事项

1. 不要删除当前原生表单，除非已经确认 Tally 表单能稳定接收文本、附件和通知。
2. 当前 `/contacto/` 的右侧图片、WhatsApp CTA、showroom CTA 和后续说明区建议保留；Tally 只替代表单区域。
3. 当前原生表单依赖 `PUBLIC_HYMUEBLE_FORM_ACTION` 控制真实 action 与 `data-demo-form`。如果完全改为 Tally iframe，需同步更新或绕开 `qa:launch` 对 demo form 的检查逻辑，避免残留原生 demo form 造成上线检查失败。
4. Tally 接收端必须确认附件能力；当前原生表单设计目标是 `multipart/form-data` + `attachments`。
5. 不要把私密 token、账号密钥或 webhook secret 放入前端公开环境变量。`PUBLIC_` 环境变量会进入静态 HTML，只能放公开 URL 或公开联系信息。
6. 嵌入后需要做一次真实测试询盘，确认 Tally 后台收到：必填字段、可选字段、附件、来源路径、通知邮件/CRM 推送。
7. 成功页或成功消息应继续承诺 `menos de 24 horas por WhatsApp o correo`，除非业务侧修改响应 SLA。
8. 如果 Tally 无法保留字段 `name`，至少要在 Tally 字段标题或内部字段映射中保留本文件的 name 对照，方便后续 CRM、表格导出和自动化处理。
9. 图册弹窗 `CatalogLeadModal.astro` 也复用 `ContactForm.astro`，但它不是本次 `/contacto/` 表单范围；未来接 Tally 图册表单时需要单独处理 `catalog_interest`。
10. 嵌入完成后建议验证：`/contacto/` 桌面与移动端无横向溢出、表单高度正常、隐私链接可访问、WhatsApp CTA 仍可点击、附件上传限制符合 Tally 实际能力。
