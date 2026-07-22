# 办公家具供应商文章排版与 SEO 设计

## 2026-07-21 质量门禁更正

实施时发现仓库的 `pnpm qa:static` 对所有 `/assets/hymueble/` 页面图片强制使用 WebP，并要求新生成路由进入 `sitemap.xml`。因此最终实施使用 WebP 版 Hero 与 6 张正文图，同步博客列表卡片图片地址，并只向站点地图补入本文路由。画面、alt、正文、排名、数据、FAQ 与 CTA 保持不变；本更正优先于下文原先的 JPG 路径说明。

## 目标

在不改变文章核心内容、排名立场和转化路径的前提下，将
`/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026/`
改为与已上线酒店供应商文章一致的 A「精致采购期刊」视觉体系，并修复该页已确认的技术 SEO 问题。

最终页面应保持老板原稿的文字和顺序，但在桌面端拥有受控阅读宽度、清晰的供应商层级和可读的宽表，在手机端拥有紧凑的方法论、局部可滑动表格、自然比例图片和明确的 FAQ 分组。

## 已批准的设计方向

采用 A 方案，且只做页面内的手术式实现：

- 复用酒店供应商文章的白色、暖米色、深海军蓝和品牌金色视觉语言。
- 保留全部 10 家供应商及当前排名顺序。
- 仅突出 HYMUEBLE / Hongye Furniture Group。
- 方法论桌面端保留语义表格，手机端转为紧凑纵向行。
- 五张表格保持真实表格语义，宽表只在自身容器内横向滚动。
- FAQ 答案始终可见，不引入折叠交互。
- 不抽取共享组件，不修改全站 CSS，不影响其他路由。

不采用：

1. 只调字号和间距：无法解决 Top 10 文字墙、HYMUEBLE 层级和移动宽表问题。
2. 抽取全站文章组件：会扩大影响面，本次没有足够的多文章治理需求。

## 修改范围

允许修改：

- `src/pages/recursos/top-10-proveedores-mobiliario-oficina-ergonomico-2026.astro`
- `src/pages/recursos/blog.astro`，仅将本文卡片图片切换为同图 WebP。
- `src/pages/sitemap.xml.ts`，仅补入本文路由。

允许新增：

- Hero 与 6 张正文图的 `hym-02-*.webp` 网页版；原始 JPG/PNG 保留。
- 本设计文档。
- 对应实施计划。

不修改：

- `src/layouts/BaseLayout.astro`
- `src/components/CTA.astro`
- `src/styles/` 下的共享样式
- 导航、目录数据、项目数据、联系表单或其他路由
- 当前未跟踪的 `.agents/` 和 `AGENTS.md`

## SEO 页面角色审计

### 分类

该 URL 本轮分类为 `Apply`，但仅限下述已命名字段和技术修复。

### 页面角色与关键词边界

- 页面角色：信息型供应商比较／办公家具采购指南。
- Main intent：`proveedores de mobiliario de oficina ergonómico`。
- Supporting intent：`mobiliario de oficina ergonómico`、`proveedor de muebles de oficina`、`comparativa de proveedores de mobiliario de oficina`。
- B2B 限定：Top 10、2026、China、MOQ、BIFMA、项目规模和 LATAM 支持。
- 不承接 `/oficinas/` 的行业主词 `muebles de oficina`。
- 不承接 `/catalogo/oficinas/` 的目录主词 `catálogo de muebles de oficina`。
- 不新增零售、低价、单件购买、库存、购物车或本地城市意图。

仓库证据：2026-07-05 的四个 LATAM 市场 Keyword Planner 导出中，`proveedores de mobiliario de oficina` 和 `mobiliario de oficina ergonomico` 均记录为月均 50；该数据只用于说明长尾存在，不作为流量或排名承诺。

### 已确认漂移

- 新文章尚未列入 `docs/url-list.md` 和 `docs/seo-keyword-implementation/06-full-site-url-keyword-coverage.md`。
- 本轮只报告该治理漂移，不顺手改动旧状态文档。
- Hero 与 OG/Twitter 共同引用的 `hym-02-oficina-ergonomica.jpg` 当前仓库不存在，线上返回 404。
- 可见日期由 `new Date()` 在构建时生成，而 Article Schema 固定为 2026-07-17；重新部署会让日期继续漂移。

## 已批准的 SEO 字段

### Title

当前：

`Top 10 Proveedores de Mobiliario de Oficina Ergonómico 2026 | Guía B2B`

改为：

`Top 10 proveedores de mobiliario de oficina ergonómico (2026)`

理由：从 70 个字符缩短到 61 个字符，保留供应商比较长尾、品类和年份，去掉重复的通用尾缀。

### Meta Description

当前：

`Ranking actualizado de los 10 mejores proveedores de mobiliario de oficina ergonómico en China. Comparativa de capacidad, certificaciones y precios para compradores B2B.`

改为：

`Compare 10 proveedores de mobiliario de oficina ergonómico en China en 2026: capacidad, certificaciones, MOQ, precios y soporte para proyectos B2B.`

理由：从 169 个字符缩短到 147 个字符；去掉无法验证的 `mejores`，增加文章表格真实覆盖的 MOQ 和项目支持语义。

### 日期与 Article Schema

- 新增常量 `publicationDateLabel = "21 de julio de 2026"`，保持上线前当前可见日期不变并停止每日漂移。
- `datePublished` 保持 `2026-07-17`。
- `dateModified` 更新为 `2026-07-21`，对应图片补充、排版和 SEO 修订。
- Article `headline` 继续从 `pageTitle` 取得。
- Article `publisher.logo.url` 改为绝对 URL。
- Article 新增绝对 `image` URL。

### 主图

- 保持 `pageImage` 和 Hero `src` 的原 URL 不变。
- 使用现有 `hym-02-img-06.png` 的办公空间画面生成一个 16:9 JPG，补到缺失的原路径。
- 裁切只保留办公空间主体；不生成新客户、地点、认证或性能事实。
- Hero 添加与实际新文件一致的 `width` 和 `height`，减少布局跳动。

### 内链

仅把现有文字变为链接，不新增或改写可见句子：

- 首段现有 `mobiliario de oficina` 链接到 `/oficinas/`。
- HYMUEBLE 产品表现有 `Sillas ergonómicas` 链接到 `/catalogo/oficinas/sillas-de-oficina/`。

不新增其他正文链接，不改 CTA。

## 内容冻结层

以下内容保持不变：

- URL 和 `canonicalPath`
- keywords 数组
- H1 文本、数量和标签
- H1–H4 的标签层级、文本和顺序
- 全部正文、列表、排名、表格单元格、FAQ、CTA 和品牌签名文案
- 10 家供应商顺序及评价立场
- FAQPage JSON-LD 的问题和答案
- 全部现有链接的锚文本；只增加上述两个目标明确的内部链接
- 现有 6 张有效正文素材的文件内容、顺序和 alt
- 五张表格的数据和顺序
- 联系方式、表单行为和共享 CTA 结构

允许的精确差异：

- Title、Meta Description 和由 `pageTitle` 派生的 OG/Twitter/Article headline。
- Article `dateModified`、绝对 logo URL 和新增 image URL。
- 动态日期表达式变为当前可见日期常量，但页面显示文字保持不变。
- 原路径主图从 404 变为 200，Hero 新增尺寸属性。
- 两个现有文本片段新增内部链接。
- 页面结构类名、语义包裹和 inline layout style 的清理。

## 页面结构

### 页面作用域

在两段页面 JSON-LD 后增加 `.office-guide` 外层。页面专属 CSS 放在该 Astro 文件底部，并全部以 `.office-guide` 为作用域。

### Hero

- 日期、H1 和两段引言保留在左侧。
- 修复后的主图和原图注保留在右侧。
- 桌面端使用接近 45/55 的双栏，900px 以下回到单栏。
- 图片保持 16:9、自然高度、轻圆角和克制阴影。

### 阅读节奏

- 普通正文宽度约 840px。
- 方法论宽度约 980px。
- 比较矩阵、预算表和成本对比表宽度约 1240px。
- 桌面区块上下留白约 68–88px；手机约 50–54px。
- 正文约 16–17px、行高约 1.7，长标题安全换行。

### 方法论

- 继续使用当前一张 `<table>`。
- 桌面端使用深色表头、细分隔线和浅斑马纹。
- 手机端视觉隐藏表头，将每个 `tr` 转成纵向行。
- 第二、三列通过 `data-label="Evalúa"` 和 `data-label="Importa"` 显示辅助标签。

### Top 10

- 每一家供应商原有节点包入 `.supplier-entry`。
- 普通供应商使用连续分隔线，不做十张厚卡。
- 第 2 家 HYMUEBLE 使用 `.supplier-entry--featured`，保留其两张图、产品表、安装列表和全部文字。
- 第 3、4 家现有图片留在各自供应商块内。
- 192px 小图保持自然尺寸并居中，不强制拉伸。

### 表格

- 方法论表和 HYMUEBLE 产品表可在当前阅读宽度内显示。
- 8 列比较矩阵设置约 1120px 最小宽度，并轻度突出 HYMUEBLE 行。
- 预算表设置约 760px 最小宽度。
- China 与本地成本表设置约 820px 最小宽度。
- 手机端只允许表格 wrapper 横向滚动，页面本身不得横向溢出。

### 常见错误、FAQ 与结尾

- 常见错误保持三项原文，桌面三列、手机单列。
- 六组 FAQ 使用 `.faq-item` 分组，答案始终展开。
- CTA 保持共享组件原样。
- 品牌签名只调整间距、分隔线和字色。

## 响应式与可访问性

- 验收视口：1440×900、1024×768、390×844。
- 390px 下标题、正文、图片、FAQ 和供应商名称不得溢出。
- 只有宽表容器允许横向滚动。
- 表格继续保留真实语义。
- FAQ 不隐藏答案。
- 不用 CSS 隐藏 SEO 文本。
- 链接继续保留键盘可访问性和现有焦点行为。

## 验收

### SEO 与内容差异清单

修改前后导出结构化页面指纹，必须满足：

- 只有本设计“允许的精确差异”发生变化。
- H1–H4 层级、文本和顺序完全一致。
- 规范化正文只允许 Title/Meta 不可见字段变化；可见正文文字保持一致。
- 五张表格行列内容完全一致，数据行分别为 6、4、10、4、7。
- FAQ 仍为 6 项。
- 供应商仍为 10 项且仅 1 项 featured。
- 正文图片仍为 7 张；主图加载成功，其余图片无破图。
- Sitemap 中目标 URL 精确出现一次。

### 项目 QA

- `pnpm qa:css`
- `pnpm build`
- `pnpm qa:static`
- 本地服务上的 `pnpm qa:browser`
- `git diff --check`

仓库通用目录 QA 若仍因 Mac 私有 PDF 绝对路径失败，单独报告为预存问题，不通过修改文章或降低标准绕过。

### 视觉 QA

- Hero 不再出现黑色破图框。
- 桌面正文行宽、标题层级和区块节奏一致。
- 手机方法论不再挤成三列小字。
- 10 家供应商全部可见，HYMUEBLE 清晰突出。
- 所有图片保持自然比例；192px 素材不被强制放大。
- 五张表格可读，手机只在表格内部滑动。
- FAQ、CTA、品牌签名和 WhatsApp 浮层无主要内容遮挡。

## 风险控制

- 页面专属 CSS 必须以 `.office-guide` 为作用域。
- 不清理既有未使用的 `SectionHead` import。
- 不改排名事实、公司数据、认证表述、价格或客户项目陈述。
- 不把治理文档缺失扩成额外 SEO 批次。
- 不提交当前已有未跟踪文件和目录。
