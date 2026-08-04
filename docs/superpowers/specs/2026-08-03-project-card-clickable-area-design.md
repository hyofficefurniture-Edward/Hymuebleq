# 案例卡片整卡可点击交互设计

## 目标

让所有使用共享 `ProjectCard` 组件的案例卡片在点击卡片主体任意位置时，进入该卡片现有 `Ver detalles` 所指向的案例详情页。

## 交互规则

- 将现有 `Ver detalles` 链接的可点击区域扩展到整张案例卡片，不增加 JavaScript。
- 点击图片、标题、标签、简介、项目事实或卡片空白区域，均进入 `project.href` 对应的案例详情页。
- `Ver detalles` 按钮继续进入同一案例详情页。
- `Consultar similar` 保持独立且位于扩展点击区域之上，点击后继续进入 `/contacto/`。
- 键盘用户仍可分别聚焦并激活 `Ver detalles` 和 `Consultar similar` 两个链接。

## 实现范围

- 修改共享组件 `src/components/ProjectCard.astro`，仅在需要时增加用于扩展点击区域的类名或可访问性属性。
- 修改现有案例卡片样式所在的 CSS 文件，使用定位与层级控制扩展 `Ver detalles` 的点击区域，并保持联系按钮可独立点击。
- 该共享组件当前用于首页、酒店页、行业解决方案页、项目聚合页和行业项目页，因此这些页面的案例卡片会一致生效。

## 明确不做

- 不修改案例数据、案例 URL、联系页 URL、按钮文案、卡片内容或布局。
- 不修改导航、目录卡片、产品卡片或其他非 `ProjectCard` 卡片。
- 不添加客户端脚本或新的依赖。

## 验收标准

1. 在桌面端和移动端，点击案例卡片中除 `Consultar similar` 外的区域会进入对应案例详情页。
2. 点击 `Consultar similar` 只进入 `/contacto/`，不会触发案例详情跳转。
3. `Ver detalles` 与 `Consultar similar` 均可通过键盘聚焦和激活。
4. 卡片视觉布局、文字、URL 和现有悬停效果保持不变。
5. `pnpm build`、`pnpm qa:static` 与 `pnpm qa:browser` 通过；如有预先存在的失败，单独记录。
