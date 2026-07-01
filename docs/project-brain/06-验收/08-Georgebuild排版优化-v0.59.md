# Georgebuild 排版优化验收记录 v0.59

- 日期：2026-06-30
- 范围：全站视觉系统、首页首屏、通用 Hero、卡片网格、showroom 区、资源视频页、footer 节奏
- 参考：`https://www.georgebuild.com/`
- 原则：参考 B2B 建材类排版语言，不复制对方素材、文案或像素级页面

## 已完成

- 全站容器从偏紧的展示型宽度调整到更适合 B2B 建材/项目网站的宽屏节奏。
- 首页首屏改为浅色编辑式结构：左侧大标题与 CTA，右侧大场景图，showroom 作为浮层体验卡。
- 通用 Hero 应用于行业页、目录页、项目页、工厂页，整体更接近 Georgebuild 的大图 + 大标题 + 短文案结构。
- 卡片系统改为更图像主导：更大的场景图、更强阴影、更清晰的内容区。
- showroom 区改为深色高对比体验区，四个 Matterport 入口更像核心转化资产。
- 资源视频页修正为稳定双栏，视频区域不再挤在左侧。
- 移动端 Header 重新压缩 logo、品牌名、Cotizar 与菜单按钮，避免品牌区域拥挤。
- 首页浅色 Hero 内的次级 showroom CTA 改为深色文字，避免白字不可读。
- 素材原则已写入 `visual-direction.md`：不重复滥用图片；缺图时可生成高质量无人物或背影场景图。
- 图片复用已做一轮低风险调整：footer 背景从 showroom 主图换为材料/项目板场景；工厂页 showroom 说明图换为独立高端酒店空间图，减少同一张图在多个大模块反复出现。
- v0.60 调整首页品类区层级：第一行两张大卡 `Oficinas`、`Hoteles`，第二行三张小卡 `Salud`、`Educación`、`Residencial`，保持第一阶段重点行业优先。
- v0.61 降低首页 Hero proof strip 视觉重心：去掉白底、边框和阴影，改为低饱和文字信息条，避免和主 CTA 竞争。
- v0.62 收敛全站字号阶梯：降低超大 H1、showroom 大标题、卡片标题和数据数字上限，提高正文行高，让页面更有呼吸感。

## 技术验收

- `pnpm build`：通过。
- Astro check：37 个文件，0 errors，0 warnings，0 hints。
- Astro build：34 个静态页面生成成功。
- Playwright 截图目录：`output/playwright/v059-georgebuild-layout/`

## 截图覆盖

- `/` desktop / mobile
- `/hoteles/` desktop / mobile
- `/catalogo/hoteleria/` desktop / mobile
- `/proyectos/hoteleria/` desktop / mobile
- `/fabrica/` desktop / mobile
- `/recursos/videos/` desktop / mobile
- `/contacto/` desktop / mobile

## 自动检查结果

- 桌面端关键页：无横向溢出。
- 桌面端关键页：无缺失图片。
- 移动端关键页：无缺失图片。
- 移动端流程模块保留 2 行横向滑动，因此 `document.scrollWidth` 会记录到由流程卡片产生的横向内容；视觉上页面主体不出现跑版。若后续要求技术指标也严格为 0，可把流程模块改成 2 列 6 行或折叠式步骤。

## v0.62 字号采样

- 首页桌面 H1：`62px / 66.34px`
- 行业页桌面 H1：`58px / 62.64px`
- 普通 H2：`42px / 47.88px`
- 首页移动端 H1：约 `35px / 39px`
- 移动端 H2：约 `28px / 33px`

## 仍需后续设计判断

- 当前没有新增 AI 生成图片，因为现有素材足以支撑本轮排版系统优化。
- 若继续做第二轮视觉增强，建议优先补生成图的场景：
  - 办公高端协作空间，无人物
  - 医养接待与病房家具空间，无人物
  - 教育图书馆/实验室家具空间，无正脸人物
  - 出口包装与项目交付场景，尽量只出现局部工位或背影

## v0.63-v0.72 追加优化记录

- v0.63：移动端流程模块增加内部横向容器，页面主体横向溢出归零。
- v0.64-v0.66：合作伙伴与证书模块重做为克制型信任区，保留品牌/证书露出，但不再用大面积文字卡堆叠；删除与项目案例重复的四个案例卡。
- v0.65：删除首页首屏图片上的 showroom 深色转化卡，改为纯场景图承载高级感，避免与后续 showroom 区重复。
- v0.67：压缩 `/proyectos/` 页面密度，把大图方案卡和入口卡改为短文本摘要与轻量行业入口。
- v0.68：全站 Matterport 展厅入口改为站内弹窗播放，不再跳转新标签，降低客户离站概率。
- v0.70：移动端继续减密度，压缩项目卡、目录卡、质量控制、首页项目案例等长模块高度。
- v0.71：压缩工厂页移动端证明材料区、设备图组和能力卡，减少长屏滚动疲劳。
- v0.73：继续收敛全站字号，首页桌面 H1 从约 62px 降至 56px，通用 H1 控制在约 54px，移动端 H1 控制在约 34px。

## v0.72 自动复检

- `pnpm build`：通过。
- Astro check：38 个文件，0 errors，0 warnings，0 hints。
- Astro build：34 个静态页面生成成功。
- Playwright 截图与报告目录：`output/playwright/v072-post-density-audit/`
- 覆盖路由：`/`、`/hoteles/`、`/catalogo/`、`/catalogo/hoteleria/`、`/proyectos/`、`/proyectos/hoteleria/`、`/fabrica/`、`/showroom/`、`/recursos/blog/`、`/recursos/videos/`、`/contacto/`。
- 桌面端与移动端：无横向溢出、无缺失图片。
- Matterport 展厅：未发现 `target="_blank"` 外跳残留；已统一进入站内弹窗。
- v0.73 轻量复检：核心页桌面/移动端无横向溢出；滚动加载后无缺失图片。
- v0.73 最终烟测：`output/playwright/v073-final-smoke/` 确认首页桌面/移动端无旧 hero showroom 卡，展厅弹窗可在站内打开，打开时锁定背景滚动，Esc 关闭后 iframe 重置为 `about:blank`。
