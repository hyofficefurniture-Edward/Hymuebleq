# 下一轮 Codex 实施 Prompt

## 修改范围

只执行本审计确认的低风险 SEO 文案修改，不重新发散关键词策略。

## 允许修改的文件

- `src/pages/catalogo/[sector].astro` 或对应数据字段：只改 `/catalogo/oficinas/` 可见 H1/标题表达。
- `src/data/catalogReferences.ts`：只改 office collaboration 小类、hotel conference 小类的 SEO title/subtitle/keywords/alt 可见词面；不得改 manifest-facing `catalogInterest`，除非同步修改 catalog manifest 并跑 QA。
- `src/pages/catalogo/hoteles/[category].astro`：只改 `mobiliario-para-conferencias` 的 `seoTitle/subtitle/keywords/supportAlt`。

## 禁止修改的内容

- 不改 URL slug，除非用户单独批准 redirect 方案。
- 不新增页面、不删页面、不改主导航结构。
- 不改联系方式、客户事实、案例事实、项目名称、表单逻辑、广告账户。
- 不大段重写正文，不加入价格、库存、购物车、SKU 或零售语义。

## 逐项修改清单

1. `/catalogo/oficinas/`：H1 从弱表达改为 `Catálogo de muebles para oficinas`。
2. `/catalogo/oficinas/colaboracion-y-brainstorming/`：Title/H1 主词改为 `Muebles para espacios colaborativos de oficina`；`brainstorming` 只保留在正文/辅助 keywords。
3. `/catalogo/hoteles/mobiliario-para-conferencias/`：Title/H1 改为 `Muebles para salas de conferencias de hotel`；辅助词保留 `mobiliario para conferencias hoteleras`。
4. 可选 P1：住宅、教育、健康高风险分类页只做 Title/H1 小幅明确，不改 URL。

## 测试命令

```bash
pnpm build
pnpm qa:static
pnpm qa:catalogs
```

如果 visible copy 改动较多，再运行：

```bash
pnpm qa:browser
```

## 验收标准

- 构建通过，0 errors / 0 warnings。
- 静态 QA 和 catalog QA 通过。
- 不出现中文残留、未闭合标签、manifest interest mismatch。
- `brainstorming` 不再作为该页 Title/H1 主词。
- `/catalogo/oficinas/` H1 明确包含 `muebles para oficinas`。
- 不产生 URL、导航和联系信息变化。

## 回滚要求

所有修改必须集中在上述文件；如 QA 失败，先 revert 本批修改，不回滚用户已有未跟踪文件或无关改动。
