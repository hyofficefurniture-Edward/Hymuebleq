# Project Card Clickable Area Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every shared project card open its existing case-detail URL when the user clicks anywhere except the independent contact CTA.

**Architecture:** Keep the two existing anchors and use a stretched pseudo-element on the `Ver detalles` anchor to cover the card. Give the contact anchor a higher stacking level so it remains an independent target, and add a browser regression check for mouse, touch-sized viewport, and keyboard navigation.

**Tech Stack:** Astro 5, HTML anchors, CSS positioning and stacking, Playwright 1.61, existing pnpm QA scripts.

## Global Constraints

- Do not add JavaScript to the production card interaction.
- Do not change project data, project URLs, `/contacto/`, button copy, card content, or layout.
- Do not change navigation, catalog cards, product cards, or other non-`ProjectCard` cards.
- Preserve the existing `Ver detalles` and `Consultar similar` keyboard-focusable anchors.

---

### Task 1: Stretch the project-details target and protect the contact CTA

**Files:**
- Modify: `src/components/ProjectCard.astro:47-50`
- Modify: `src/styles/partials/10-home-hero-cards.css:218-230`
- Modify: `scripts/qa-browser-routes.mjs:620-710`

**Interfaces:**
- Consumes: `project.href` from the existing `ProjectCard` props and the existing `/contacto/` contact destination.
- Produces: `.project-card-details` as the stretched details anchor and `.project-card-contact` as the independent contact anchor.

- [x] **Step 1: Add a browser regression check that exercises both destinations**

Add this function before `testCatalogModal` in `scripts/qa-browser-routes.mjs`:

```js
const testProjectCardLinks = async (page) => {
  for (const viewport of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    const openHomeCard = async () => {
      await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
      const card = page.locator(".project-card").first();
      await card.scrollIntoViewIfNeeded();
      return card;
    };

    let card = await openHomeCard();
    const detailHref = await card.getByRole("link", { name: "Ver detalles" }).getAttribute("href");
    const expectedDetailPath = new URL(detailHref, baseUrl).pathname;
    const imageBox = await card.locator("img").boundingBox();
    if (!imageBox) {
      failures.push(`${viewport.name} project card: image click target is missing.`);
      continue;
    }
    await page.mouse.click(imageBox.x + imageBox.width / 2, imageBox.y + imageBox.height / 2);
    await page.waitForTimeout(200);
    const cardClickPath = new URL(page.url()).pathname;
    if (cardClickPath !== expectedDetailPath) {
      failures.push(`${viewport.name} project card: card body opened ${cardClickPath} instead of ${expectedDetailPath}.`);
    }

    card = await openHomeCard();
    await card.getByRole("link", { name: "Consultar similar" }).click();
    await page.waitForTimeout(200);
    const contactClickPath = new URL(page.url()).pathname;
    if (contactClickPath !== "/contacto/") {
      failures.push(`${viewport.name} project card: contact CTA opened ${contactClickPath} instead of /contacto/.`);
    }

    card = await openHomeCard();
    await card.getByRole("link", { name: "Ver detalles" }).focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    const keyboardDetailPath = new URL(page.url()).pathname;
    if (keyboardDetailPath !== expectedDetailPath) {
      failures.push(`${viewport.name} project card: keyboard details link opened ${keyboardDetailPath} instead of ${expectedDetailPath}.`);
    }

    card = await openHomeCard();
    await card.getByRole("link", { name: "Consultar similar" }).focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(200);
    const keyboardContactPath = new URL(page.url()).pathname;
    if (keyboardContactPath !== "/contacto/") {
      failures.push(`${viewport.name} project card: keyboard contact link opened ${keyboardContactPath} instead of /contacto/.`);
    }

    interactionResults.push({
      name: `${viewport.name} project card links`,
      expectedDetailPath,
      cardClickPath,
      contactClickPath,
      keyboardDetailPath,
      keyboardContactPath,
    });
  }
};
```

Call it in the interaction sequence after `testScrollRailControls`:

```js
  await testScrollRailControls(interactionPage);
  await testProjectCardLinks(interactionPage);
  await testShowroomModal(interactionPage);
```

- [x] **Step 2: Run the browser check and confirm the new test fails before implementation**

Run the existing development server and then:

```bash
pnpm qa:browser
```

Expected: FAIL with a project-card message because clicking the card image still leaves the page on `/`.

- [x] **Step 3: Add explicit classes to the two existing card anchors**

Replace the link markup in `src/components/ProjectCard.astro` with:

```astro
    <div class="btn-row">
      <a class="btn line project-card-details" href={project.href}>Ver detalles</a>
      <a class="btn dark project-card-contact" href="/contacto/">Consultar similar</a>
    </div>
```

- [x] **Step 4: Stretch the details target across the card and raise the contact CTA**

Add these focused rules next to the existing `.project-card` hover rules in `src/styles/partials/10-home-hero-cards.css`:

```css
.project-card {
  position: relative;
  cursor: pointer;
}

.project-card-details::after {
  position: absolute;
  z-index: 1;
  inset: 0;
  content: "";
}

.project-card-details:hover {
  transform: none;
}

.project-card-contact {
  position: relative;
  z-index: 2;
}
```

- [x] **Step 5: Run source and build validation**

Run:

```bash
pnpm qa:css
pnpm build
pnpm qa:static
```

Expected: all three commands exit successfully with no new CSS-structure, Astro, broken-link, or static-site failures.

- [x] **Step 6: Run the browser regression suite against desktop and mobile viewports**

With the development server still running, run:

```bash
pnpm qa:browser
```

Expected: PASS. The report contains `desktop project card links` and `mobile project card links`, with the card and keyboard detail paths matching the case URL and both contact paths equal to `/contacto/`.

- [x] **Step 7: Review the final diff and commit only the scoped files**

Run:

```bash
git diff --check
git diff -- src/components/ProjectCard.astro src/styles/partials/10-home-hero-cards.css scripts/qa-browser-routes.mjs docs/superpowers/plans/2026-08-03-project-card-clickable-area.md
git add src/components/ProjectCard.astro src/styles/partials/10-home-hero-cards.css scripts/qa-browser-routes.mjs docs/superpowers/plans/2026-08-03-project-card-clickable-area.md
git commit -m "feat: make project cards open case details"
```

Expected: the commit includes only the shared project-card markup, focused card CSS, its browser regression check, and this plan.
