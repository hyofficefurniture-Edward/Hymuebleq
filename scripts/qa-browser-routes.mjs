import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:4321";
const outputDir = path.join(root, "output", "playwright", "v085-browser-demo-walkthrough");
const reportPath = path.join(outputDir, "report.json");

const routes = [
  "/",
  "/hoteles/",
  "/oficinas/",
  "/salud/",
  "/educacion/",
  "/residencial/",
  "/catalogo/",
  "/catalogo/hoteles/",
  "/catalogo/hoteles/habitaciones/",
  "/catalogo/hoteles/muebles-de-bano/",
  "/catalogo/hoteles/muebles-exteriores/",
  "/catalogo/hoteles/muebles-para-bar/",
  "/catalogo/hoteles/muebles-para-restaurante/",
  "/catalogo/hoteles/mobiliario-para-conferencias/",
  "/catalogo/oficinas/",
  "/catalogo/salud/",
  "/catalogo/educacion/",
  "/catalogo/residencial/",
  "/proyectos/",
  "/proyectos/hoteles/",
  "/proyectos/oficinas/",
  "/proyectos/salud/",
  "/proyectos/educacion/",
  "/proyectos/residencial/",
  "/fabrica/",
  "/showroom/",
  "/recursos/",
  "/recursos/blog/",
  "/recursos/top-10-fabricantes-muebles-hoteles-china-2026/",
  "/recursos/videos/",
  "/contacto/",
];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const failures = [];
const warnings = [];
const routeResults = [];
const interactionResults = [];

const slug = (route) => (route === "/" ? "home" : route.replace(/^\/|\/$/g, "").replace(/\//g, "-"));

const isServerReachable = async (browser) => {
  const page = await browser.newPage();
  try {
    const response = await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 10000 });
    return response?.ok() ?? false;
  } catch {
    return false;
  } finally {
    await page.close();
  }
};

const auditRoute = async (page, viewport, route) => {
  const url = new URL(route, baseUrl).toString();
  const response = await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  if (!response?.ok()) {
    failures.push(`${viewport.name} ${route}: HTTP ${response?.status() ?? "no response"}.`);
    return;
  }

  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    const step = Math.max(240, Math.floor(window.innerHeight * 0.7));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    await new Promise((resolve) => requestAnimationFrame(resolve));
  });
  await page.waitForFunction(() => window.scrollY === 0, undefined, { timeout: 5000 });

  const result = await page.evaluate(() => {
    const pageOverflow = Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth);
    const brokenImages = [...document.images]
      .filter((image) => image.currentSrc && image.complete && image.naturalWidth === 0)
      .map((image) => image.getAttribute("src") || image.currentSrc);
    const unfinishedText = [...document.body.querySelectorAll("body *:not(script):not(style)")]
      .filter((node) => {
        const element = node;
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const hasElementChildren = [...element.children].some((child) => {
          const childRect = child.getBoundingClientRect();
          const childStyle = window.getComputedStyle(child);
          return childRect.width > 0 && childRect.height > 0 && childStyle.visibility !== "hidden" && childStyle.display !== "none";
        });
        return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none" && !hasElementChildren;
      })
      .map((node) => node.textContent?.trim() ?? "")
      .filter((text) => /待确认|发布前补充|\bTODO\b|Lorem ipsum/.test(text));
    const longVisibleTexts = [...document.querySelectorAll("p, .lead, .section-note, .card-body p, .info-card span, .footer-signature p")]
      .map((node) => {
        const element = node;
        const style = window.getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const text = element.textContent?.replace(/\s+/g, " ").trim() ?? "";
        return { text, width: Math.round(rect.width), height: Math.round(rect.height), display: style.display, visibility: style.visibility };
      })
      .filter((item) => item.width > 0 && item.height > 0 && item.display !== "none" && item.visibility !== "hidden")
      .filter((item) => item.text.length > 360)
      .slice(0, 5);
    return { pageOverflow, brokenImages, unfinishedText, longVisibleTexts };
  });

  if (result.pageOverflow > 0) {
    failures.push(`${viewport.name} ${route}: page horizontal overflow ${result.pageOverflow}px.`);
  }
  if (result.brokenImages.length > 0) {
    failures.push(`${viewport.name} ${route}: broken images ${result.brokenImages.join(", ")}.`);
  }
  if (result.unfinishedText.length > 0) {
    failures.push(`${viewport.name} ${route}: unfinished text residue found.`);
  }
  if (result.longVisibleTexts.length > 0) {
    warnings.push(`${viewport.name} ${route}: ${result.longVisibleTexts.length} long visible text block(s) over 360 chars.`);
  }

  routeResults.push({ viewport: viewport.name, route, ...result });

  if (["/", "/showroom/", "/contacto/"].includes(route)) {
    await page.screenshot({
      path: path.join(outputDir, `${viewport.name}-${slug(route)}.png`),
      fullPage: false,
    });
  }
};

const testMobileMenu = async (page) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
  await page.locator("[data-menu-button]").click();
  const state = await page.evaluate(() => {
    const nav = document.querySelector("[data-nav-links]");
    const contacto = [...document.querySelectorAll("[data-nav-links] a")].find((link) => link.textContent?.trim() === "Contacto");
    const navRect = nav?.getBoundingClientRect();
    const contactoRect = contacto?.getBoundingClientRect();
    return {
      navOpen: nav?.classList.contains("is-open") ?? false,
      bodyMenuOpen: document.body.classList.contains("menu-open"),
      contactoVisible: !!contactoRect && contactoRect.bottom <= window.innerHeight + 1,
      navOverflow: navRect ? Math.max(0, Math.round(navRect.right - window.innerWidth)) : 0,
    };
  });

  if (!state.navOpen || !state.bodyMenuOpen) {
    failures.push("mobile menu: menu did not open.");
  }
  if (state.navOverflow > 0) {
    failures.push(`mobile menu: nav overflows viewport by ${state.navOverflow}px.`);
  }
  if (!state.contactoVisible) {
    warnings.push("mobile menu: Contacto is not visible in the first mobile menu viewport.");
  }
  interactionResults.push({ name: "mobile menu", ...state });
};

const testMobileMenuNearFooter = async (page) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(new URL("/fabrica/", baseUrl).toString(), { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(250);
  await page.locator("[data-menu-button]").click();
  await page.waitForTimeout(150);
  const state = await page.evaluate(() => {
    const header = document.querySelector(".header");
    const nav = document.querySelector("[data-nav-links]");
    const contacto = [...document.querySelectorAll("[data-nav-links] a")].find((link) => link.textContent?.trim() === "Contacto");
    const rect = (element) => {
      const box = element?.getBoundingClientRect();
      return box
        ? {
            top: Math.round(box.top),
            bottom: Math.round(box.bottom),
            width: Math.round(box.width),
            height: Math.round(box.height),
          }
        : null;
    };
    return {
      scrollY: Math.round(window.scrollY),
      navOpen: nav?.classList.contains("is-open") ?? false,
      header: rect(header),
      nav: rect(nav),
      contacto: rect(contacto),
      navOverflow: nav ? Math.max(0, Math.round(nav.getBoundingClientRect().right - window.innerWidth)) : 0,
    };
  });

  const headerVisible = !!state.header && state.header.top >= 0 && state.header.bottom <= 90;
  const navVisible = !!state.nav && state.nav.top >= (state.header?.bottom ?? 0) && state.nav.top < 120;
  const contactoVisible = !!state.contacto && state.contacto.bottom <= 844;
  if (!state.navOpen) {
    failures.push("mobile footer menu: menu did not open near the footer.");
  }
  if (!headerVisible) {
    failures.push("mobile footer menu: fixed header is not visible near the footer.");
  }
  if (!navVisible) {
    failures.push("mobile footer menu: nav panel is not aligned below the fixed header.");
  }
  if (!contactoVisible) {
    failures.push("mobile footer menu: Contacto is not visible near the footer.");
  }
  if (state.navOverflow > 0) {
    failures.push(`mobile footer menu: nav overflows viewport by ${state.navOverflow}px.`);
  }
  await page.screenshot({
    path: path.join(outputDir, "mobile-fabrica-footer-menu.png"),
    fullPage: false,
  });
  interactionResults.push({
    name: "mobile footer menu",
    ...state,
    headerVisible,
    navVisible,
    contactoVisible,
  });
};

const testFooterSocialLinks = async (page) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
  await page.locator(".footer").scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const state = await page.evaluate(() => {
    const socialLinks = [...document.querySelectorAll(".social-links a")];
    const labels = socialLinks.map((link) => link.getAttribute("aria-label"));
    const hrefs = socialLinks.map((link) => link.getAttribute("href"));
    const social = document.querySelector(".social-links");
    const logo = document.querySelector(".footer-logo");
    const footerPanel = document.querySelector(".footer-nav-panel");
    const socialRect = social?.getBoundingClientRect();
    const panelRect = footerPanel?.getBoundingClientRect();
    return {
      labels,
      hrefs,
      pageOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
      textAlign: footerPanel ? window.getComputedStyle(footerPanel).textAlign : "",
      socialJustify: social ? window.getComputedStyle(social).justifyContent : "",
      logoJustify: logo ? window.getComputedStyle(logo).justifyContent : "",
      socialCentered:
        !!socialRect &&
        !!panelRect &&
        Math.abs((socialRect.left + socialRect.width / 2) - (panelRect.left + panelRect.width / 2)) <= 2,
      hasTikTok: labels.includes("TikTok"),
      hasPinterest: labels.includes("Pinterest") || hrefs.some((href) => href?.includes("pinterest.com")),
      hasX: labels.includes("X") || hrefs.some((href) => href?.includes("x.com")),
    };
  });

  const expected = ["Facebook", "Instagram", "LinkedIn", "YouTube", "TikTok"];
  if (state.labels.join("|") !== expected.join("|")) {
    failures.push(`footer social: expected ${expected.join(", ")} but found ${state.labels.join(", ")}.`);
  }
  if (!state.hasTikTok || state.hasPinterest || state.hasX) {
    failures.push("footer social: TikTok/Pinterest/X social set is incorrect.");
  }
  if (state.pageOverflow > 0) {
    failures.push(`footer social: mobile page overflows by ${state.pageOverflow}px.`);
  }
  if (state.textAlign !== "center" || state.socialJustify !== "center" || state.logoJustify !== "center" || !state.socialCentered) {
    failures.push("footer social: mobile footer alignment is not centered.");
  }
  interactionResults.push({ name: "footer social links", ...state });
};

const testMobileMetricsGrid = async (page) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
  await page.locator(".metric-grid").scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const state = await page.evaluate(() => {
    const grid = document.querySelector(".metric-grid");
    const metrics = [...document.querySelectorAll(".metric")];
    const visibleMetrics = metrics.filter((metric) => getComputedStyle(metric).display !== "none");
    const rect = (element) => {
      const box = element?.getBoundingClientRect();
      return box
        ? {
            top: Math.round(box.top),
            left: Math.round(box.left),
            width: Math.round(box.width),
            height: Math.round(box.height),
            bottom: Math.round(box.bottom),
          }
        : null;
    };
    return {
      columns: grid ? getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length : 0,
      visibleCount: visibleMetrics.length,
      grid: rect(grid),
      metrics: visibleMetrics.map(rect),
      pageOverflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
    };
  });

  const expectedRows = state.metrics.length === 4 && state.metrics[0]?.top === state.metrics[1]?.top && state.metrics[2]?.top === state.metrics[3]?.top;
  if (state.columns !== 2) {
    failures.push(`mobile metrics grid: expected 2 columns, found ${state.columns}.`);
  }
  if (state.visibleCount !== 4) {
    failures.push(`mobile metrics grid: expected 4 visible metrics, found ${state.visibleCount}.`);
  }
  if (!expectedRows) {
    failures.push("mobile metrics grid: visible metrics are not arranged as two aligned rows.");
  }
  if (state.pageOverflow > 0) {
    failures.push(`mobile metrics grid: page overflows by ${state.pageOverflow}px.`);
  }
  interactionResults.push({ name: "mobile metrics grid", ...state, expectedRows });
};

const testProcessIcons = async (page) => {
  for (const viewport of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ]) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
    await page.locator(".process-scroll").scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
    const state = await page.evaluate(() => {
      const process = document.querySelector(".process");
      const scroll = document.querySelector(".process-scroll");
      const items = [...document.querySelectorAll(".process-item")];
      const icons = [...document.querySelectorAll(".process-icon svg")];
      const visibleIcons = icons.filter((icon) => getComputedStyle(icon.closest(".process-icon")).display !== "none");
      return {
        items: items.length,
        icons: visibleIcons.length,
        rows: [...new Set(items.map((item) => Math.round(item.getBoundingClientRect().top)))].length,
        pageOverflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
        scrollOverflow: scroll ? Math.max(0, Math.round(scroll.scrollWidth - scroll.clientWidth)) : 0,
        display: process ? getComputedStyle(process).display : "",
      };
    });

    if (state.items !== 12) {
      failures.push(`${viewport.name} process icons: expected 12 process items, found ${state.items}.`);
    }
    if (state.icons !== 12) {
      failures.push(`${viewport.name} process icons: expected 12 visible icons, found ${state.icons}.`);
    }
    if (state.pageOverflow > 0) {
      failures.push(`${viewport.name} process icons: page overflows by ${state.pageOverflow}px.`);
    }
    interactionResults.push({ name: `${viewport.name} process icons`, ...state });
  }
};

const testFAQTabs = async (page) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
  await page.locator("[data-faq-tabs]").scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);

  const initialState = await page.evaluate(() => {
    const selectedTab = document.querySelector("[data-faq-tab][aria-selected='true']");
    const visiblePanel = [...document.querySelectorAll("[data-faq-panel]")].find((panel) => !panel.hidden);
    const openQuestions = [...(visiblePanel?.querySelectorAll("[data-faq-question][aria-expanded='true']") ?? [])];
    return {
      tabCount: document.querySelectorAll("[data-faq-tab]").length,
      panelCount: document.querySelectorAll("[data-faq-panel]").length,
      selectedLabel: selectedTab?.textContent?.trim() ?? "",
      visiblePanelId: visiblePanel?.id ?? "",
      openQuestion: openQuestions[0]?.textContent?.replace(/\s+/g, " ").trim() ?? "",
      openCount: openQuestions.length,
      pageOverflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
    };
  });

  if (initialState.tabCount !== 4 || initialState.panelCount !== 4) {
    failures.push(`faq tabs: expected 4 tabs and 4 panels, found ${initialState.tabCount} tabs and ${initialState.panelCount} panels.`);
  }
  if (initialState.selectedLabel !== "Sobre productos y fabricación") {
    failures.push(`faq tabs: first category is not selected by default (${initialState.selectedLabel}).`);
  }
  if (!initialState.openQuestion.includes("¿Fabrican a medida")) {
    failures.push("faq tabs: first question is not open by default.");
  }
  if (initialState.openCount !== 1) {
    failures.push(`faq tabs: expected one open question by default, found ${initialState.openCount}.`);
  }
  if (initialState.pageOverflow > 0) {
    failures.push(`faq tabs: desktop page overflows by ${initialState.pageOverflow}px.`);
  }

  await page.getByRole("tab", { name: "Sobre logística e importación" }).click();
  const switchedState = await page.evaluate(() => {
    const selectedTab = document.querySelector("[data-faq-tab][aria-selected='true']");
    const visiblePanel = [...document.querySelectorAll("[data-faq-panel]")].find((panel) => !panel.hidden);
    const openQuestions = [...(visiblePanel?.querySelectorAll("[data-faq-question][aria-expanded='true']") ?? [])];
    return {
      selectedLabel: selectedTab?.textContent?.trim() ?? "",
      visiblePanelId: visiblePanel?.id ?? "",
      openQuestion: openQuestions[0]?.textContent?.replace(/\s+/g, " ").trim() ?? "",
      openCount: openQuestions.length,
    };
  });

  if (switchedState.selectedLabel !== "Sobre logística e importación") {
    failures.push("faq tabs: category click did not select logistics tab.");
  }
  if (!switchedState.openQuestion.includes("¿Cómo manejan el embalaje")) {
    failures.push("faq tabs: logistics panel did not show its first question open.");
  }
  if (switchedState.openCount !== 1) {
    failures.push(`faq tabs: logistics panel expected one open question, found ${switchedState.openCount}.`);
  }

  await page.getByRole("button", { name: /¿Quién se encarga de la importación/ }).click();
  const accordionState = await page.evaluate(() => {
    const visiblePanel = [...document.querySelectorAll("[data-faq-panel]")].find((panel) => !panel.hidden);
    const openQuestions = [...(visiblePanel?.querySelectorAll("[data-faq-question][aria-expanded='true']") ?? [])];
    return {
      openQuestion: openQuestions[0]?.textContent?.replace(/\s+/g, " ").trim() ?? "",
      openCount: openQuestions.length,
      answerVisible: [...(visiblePanel?.querySelectorAll("[data-faq-answer]") ?? [])].some(
        (answer) => !answer.hidden && answer.textContent?.includes("La importación corre por cuenta del comprador"),
      ),
    };
  });

  if (!accordionState.openQuestion.includes("¿Quién se encarga de la importación")) {
    failures.push("faq tabs: accordion did not open the clicked logistics question.");
  }
  if (accordionState.openCount !== 1) {
    failures.push(`faq tabs: accordion expected one open question after click, found ${accordionState.openCount}.`);
  }
  if (!accordionState.answerVisible) {
    failures.push("faq tabs: expected logistics answer is not visible after click.");
  }

  await page.waitForTimeout(250);
  await page.screenshot({
    path: path.join(outputDir, "desktop-home-faq-tabs.png"),
    fullPage: false,
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
  await page.locator("[data-faq-tabs]").scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const mobileState = await page.evaluate(() => {
    const tabList = document.querySelector(".faq-tab-list");
    const firstTab = document.querySelector("[data-faq-tab]");
    return {
      pageOverflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
      tabListOverflow: tabList ? Math.max(0, Math.round(tabList.scrollWidth - tabList.clientWidth)) : 0,
      firstTabWidth: firstTab ? Math.round(firstTab.getBoundingClientRect().width) : 0,
      selectedLabel: document.querySelector("[data-faq-tab][aria-selected='true']")?.textContent?.trim() ?? "",
    };
  });

  if (mobileState.pageOverflow > 0) {
    failures.push(`faq tabs: mobile page overflows by ${mobileState.pageOverflow}px.`);
  }
  if (mobileState.selectedLabel !== "Sobre productos y fabricación") {
    failures.push("faq tabs: mobile first category is not selected by default.");
  }
  await page.screenshot({
    path: path.join(outputDir, "mobile-home-faq-tabs.png"),
    fullPage: false,
  });

  interactionResults.push({
    name: "faq tabs accordion",
    initialState,
    switchedState,
    accordionState,
    mobileState,
  });
};

const testScrollRailControls = async (page) => {
  const cases = [
    { name: "mobile partner logos", route: "/", selector: ".partner-logo-rail", width: 390, height: 844 },
    { name: "mobile project cards", route: "/", selector: ".home-project-rail", width: 390, height: 844 },
    { name: "mobile process steps", route: "/", selector: ".process-scroll", width: 390, height: 844 },
    { name: "mobile factory process", route: "/fabrica/", selector: ".factory-process-evidence", width: 390, height: 844 },
    { name: "mobile factory qualifications", route: "/fabrica/", selector: ".qualification-showcase", width: 390, height: 844 },
  ];

  for (const item of cases) {
    await page.setViewportSize({ width: item.width, height: item.height });
    await page.goto(new URL(item.route, baseUrl).toString(), { waitUntil: "networkidle" });
    await page.locator(item.selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(180);

    const before = await page.evaluate((selector) => {
      const track = document.querySelector(selector);
      const shell = track?.closest("[data-scroll-rail]");
      const prev = shell?.querySelector("[data-scroll-prev]");
      const next = shell?.querySelector("[data-scroll-next]");
      const controls = shell?.querySelector(".scroll-rail-controls");
      return {
        hasTrack: !!track,
        hasShell: !!shell,
        scrollLeft: track?.scrollLeft ?? 0,
        scrollOverflow: track ? Math.max(0, Math.round(track.scrollWidth - track.clientWidth)) : 0,
        shellScrollable: shell?.classList.contains("is-scrollable") ?? false,
        controlsDisplay: controls ? getComputedStyle(controls).display : "",
        prevDisabled: prev?.disabled ?? true,
        nextDisabled: next?.disabled ?? true,
        pageOverflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
      };
    }, item.selector);

    if (!before.hasTrack || !before.hasShell) {
      failures.push(`${item.name}: scroll rail shell or track is missing.`);
      interactionResults.push({ name: item.name, before });
      continue;
    }
    if (before.scrollOverflow <= 4) {
      failures.push(`${item.name}: expected horizontal overflow inside the rail, found ${before.scrollOverflow}px.`);
      interactionResults.push({ name: item.name, before });
      continue;
    }
    if (!before.shellScrollable || before.controlsDisplay === "none") {
      failures.push(`${item.name}: scroll controls are not visible for a scrollable rail.`);
    }
    if (before.nextDisabled) {
      failures.push(`${item.name}: next button is disabled at the start of a scrollable rail.`);
    }
    if (before.pageOverflow > 0) {
      failures.push(`${item.name}: page overflows by ${before.pageOverflow}px before using rail controls.`);
    }

    await page.evaluate((selector) => {
      const track = document.querySelector(selector);
      const shell = track?.closest("[data-scroll-rail]");
      shell?.querySelector("[data-scroll-next]")?.click();
    }, item.selector);
    await page.waitForTimeout(420);

    const after = await page.evaluate((selector) => {
      const track = document.querySelector(selector);
      const shell = track?.closest("[data-scroll-rail]");
      const prev = shell?.querySelector("[data-scroll-prev]");
      const next = shell?.querySelector("[data-scroll-next]");
      return {
        scrollLeft: track?.scrollLeft ?? 0,
        prevDisabled: prev?.disabled ?? true,
        nextDisabled: next?.disabled ?? true,
        pageOverflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
      };
    }, item.selector);

    if (after.scrollLeft <= before.scrollLeft + 4) {
      failures.push(`${item.name}: next button did not advance the rail.`);
    }
    if (after.prevDisabled) {
      failures.push(`${item.name}: previous button stayed disabled after advancing the rail.`);
    }
    if (after.pageOverflow > 0) {
      failures.push(`${item.name}: page overflows by ${after.pageOverflow}px after using rail controls.`);
    }

    interactionResults.push({ name: item.name, before, after });
  }
};

const testShowroomModal = async (page) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "networkidle" });
  const beforeUrl = page.url();
  await page.locator("[data-showroom-modal]").first().click();
  await page.waitForSelector("[data-showroom-modal-shell].is-open", { timeout: 10000 });
  const state = await page.evaluate(() => {
    const modal = document.querySelector("[data-showroom-modal-shell]");
    const frame = document.querySelector("[data-showroom-modal-frame]");
    return {
      modalOpen: modal?.classList.contains("is-open") ?? false,
      frameSrc: frame?.getAttribute("src") ?? "",
      activeLabel: document.activeElement?.getAttribute("aria-label") ?? document.activeElement?.textContent?.trim() ?? "",
    };
  });
  if (page.url() !== beforeUrl) {
    failures.push(`showroom modal: page URL changed from ${beforeUrl} to ${page.url()}.`);
  }
  if (!state.modalOpen || !state.frameSrc.includes("my.matterport.com/show/")) {
    failures.push("showroom modal: Matterport iframe did not open in-site.");
  }
  if (!/cerrar/i.test(state.activeLabel)) {
    warnings.push("showroom modal: focus did not move to the close control.");
  }
  await page.screenshot({
    path: path.join(outputDir, "desktop-showroom-modal-open.png"),
    fullPage: false,
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  const closed = await page.evaluate(() => {
    const modal = document.querySelector("[data-showroom-modal-shell]");
    const frame = document.querySelector("[data-showroom-modal-frame]");
    return {
      modalOpen: modal?.classList.contains("is-open") ?? false,
      frameSrc: frame?.getAttribute("src") ?? "",
    };
  });
  if (closed.modalOpen || closed.frameSrc !== "about:blank") {
    failures.push("showroom modal: Escape did not close modal and reset iframe.");
  }
  interactionResults.push({ name: "showroom modal", beforeUrl, afterOpenUrl: page.url(), opened: state, closed });
};

const testCatalogModal = async (page) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(new URL("/catalogo/hoteles/", baseUrl).toString(), { waitUntil: "networkidle" });
  await page.locator("[data-download-catalog]").first().click();
  await page.waitForSelector("[data-catalog-modal].is-open", { timeout: 10000 });
  const state = await page.evaluate(() => ({
    title: document.querySelector("[data-catalog-modal-title]")?.textContent?.trim() ?? "",
    interest: document.querySelector("[data-catalog-interest-input]")?.value ?? "",
  }));
  if (!state.title.startsWith("Solicitar catálogo:") || !state.interest || state.interest === "Catálogo general") {
    failures.push("catalog modal: catalog interest context was not passed into the lead form.");
  }
  interactionResults.push({ name: "catalog modal", ...state });
};

const testContactForm = async (page) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(new URL("/contacto/", baseUrl).toString(), { waitUntil: "networkidle" });
  const form = page.locator("form[data-demo-form]").first();
  if ((await form.count()) === 0) {
    warnings.push("contact form: no demo form found; this may be expected in launch-configured mode.");
    return;
  }
  await form.locator("input[name='company']").fill("Empresa Demo");
  await form.locator("input[name='whatsapp']").fill("+52 55 0000 0000");
  await form.locator("input[name='location']").fill("Ciudad de México");
  await form.locator("select[name='sector']").selectOption({ label: "Hoteles" });
  await form.locator("textarea[name='message']").fill("Necesito cotizar mobiliario para habitaciones y lobby.");
  await form.locator("button[type='submit']").click();
  const successVisible = await form.locator(".form-success").isVisible();
  if (!successVisible) {
    failures.push("contact form: demo success feedback did not appear after submit.");
  }
  interactionResults.push({ name: "contact form", demoMode: true, successVisible });
};

fs.mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch();
try {
  if (!(await isServerReachable(browser))) {
    throw new Error(`Cannot reach ${baseUrl}. Start the dev server before running this QA.`);
  }

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    for (const route of routes) {
      await auditRoute(page, viewport, route);
    }
    await page.close();
  }

  const interactionPage = await browser.newPage();
  await testMobileMenu(interactionPage);
  await testMobileMenuNearFooter(interactionPage);
  await testFooterSocialLinks(interactionPage);
  await testMobileMetricsGrid(interactionPage);
  await testProcessIcons(interactionPage);
  await testFAQTabs(interactionPage);
  await testScrollRailControls(interactionPage);
  await testShowroomModal(interactionPage);
  await testCatalogModal(interactionPage);
  await testContactForm(interactionPage);
  await interactionPage.close();
} finally {
  await browser.close();
}

const report = {
  baseUrl,
  routes: routes.length,
  viewports: viewports.map(({ name, width, height }) => ({ name, width, height })),
  routeResults,
  interactionResults,
  failures,
  warnings,
};

fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

if (failures.length > 0) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(report, null, 2));
