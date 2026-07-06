import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const failures = [];
const warnings = [];

const requiredEnv = {
  PUBLIC_HYMUEBLE_WHATSAPP_URL: process.env.PUBLIC_HYMUEBLE_WHATSAPP_URL,
  PUBLIC_HYMUEBLE_EMAIL: process.env.PUBLIC_HYMUEBLE_EMAIL,
};

const confirmedWhatsappPath = "wa.me/8615019774832";
const confirmedEmail = "ao@hysdfurniture.com";

if (requiredEnv.PUBLIC_HYMUEBLE_WHATSAPP_URL && !requiredEnv.PUBLIC_HYMUEBLE_WHATSAPP_URL.includes(confirmedWhatsappPath)) {
  failures.push("PUBLIC_HYMUEBLE_WHATSAPP_URL must point to the confirmed public WhatsApp number before launch.");
}

if (requiredEnv.PUBLIC_HYMUEBLE_EMAIL && requiredEnv.PUBLIC_HYMUEBLE_EMAIL !== confirmedEmail) {
  failures.push("PUBLIC_HYMUEBLE_EMAIL must match the confirmed business email before launch.");
}

const collectHtmlFiles = (dir) => {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
};

let htmlFiles = 0;
let demoForms = 0;
let placeholderWhatsappLinks = 0;
let confirmedWhatsappLinks = 0;
let oldEmailLinks = 0;
let confirmedEmailLinks = 0;
let web3FormsActions = 0;
let accessKeyInputs = 0;
let tikTokLinks = 0;
let removedSocialLinks = 0;

if (fs.existsSync(distDir)) {
  for (const file of collectHtmlFiles(distDir)) {
    htmlFiles += 1;
    const html = fs.readFileSync(file, "utf8");
    demoForms += (html.match(/<form\b[^>]*data-demo-form/gi) ?? []).length;
    placeholderWhatsappLinks += (html.match(/wa\.me\/000000000000/g) ?? []).length;
    confirmedWhatsappLinks += (html.match(/wa\.me\/8615019774832/g) ?? []).length;
    oldEmailLinks += (html.match(/proyectos@hymueble\.com/g) ?? []).length;
    confirmedEmailLinks += (html.match(/ao@hysdfurniture\.com/g) ?? []).length;
    web3FormsActions += (html.match(/<form\b[^>]*action=(["'])https:\/\/api\.web3forms\.com\/submit\1/gi) ?? []).length;
    accessKeyInputs += (html.match(/<input\b[^>]*name=(["'])access_key\1/gi) ?? []).length;
    tikTokLinks += (html.match(/https:\/\/www\.tiktok\.com\//g) ?? []).length;
    removedSocialLinks += (html.match(/https:\/\/(?:www\.)?(?:pinterest\.com|x\.com)\//g) ?? []).length;
  }
} else {
  warnings.push("dist/ does not exist. Run a production build with the launch environment before qa:launch.");
}

if (demoForms > 0) {
  failures.push(`Generated HTML still contains ${demoForms} demo form marker(s). Configure PUBLIC_HYMUEBLE_FORM_ACTION and rebuild before launch.`);
}

if (htmlFiles > 0 && (web3FormsActions === 0 || accessKeyInputs === 0 || web3FormsActions !== accessKeyInputs)) {
  failures.push("Generated forms must point to Web3Forms and include matching access_key inputs before launch.");
}

if (placeholderWhatsappLinks > 0) {
  failures.push(`Generated HTML still contains ${placeholderWhatsappLinks} placeholder WhatsApp link(s). Configure PUBLIC_HYMUEBLE_WHATSAPP_URL and rebuild before launch.`);
}

if (confirmedWhatsappLinks === 0) {
  failures.push("Generated HTML does not contain the confirmed WhatsApp number.");
}

if (oldEmailLinks > 0) {
  failures.push(`Generated HTML still contains ${oldEmailLinks} old default email occurrence(s).`);
}

if (confirmedEmailLinks === 0) {
  failures.push("Generated HTML does not contain the confirmed business email.");
}

if (removedSocialLinks > 0) {
  failures.push(`Generated HTML still contains ${removedSocialLinks} removed Pinterest/X social link(s). Rebuild with the current footer social set before launch.`);
}

if (htmlFiles > 0 && tikTokLinks === 0) {
  failures.push("Generated HTML does not contain a TikTok social link. Confirm the footer social set before launch.");
}

const report = {
  htmlFiles,
  demoForms,
  placeholderWhatsappLinks,
  confirmedWhatsappLinks,
  oldEmailLinks,
  confirmedEmailLinks,
  web3FormsActions,
  accessKeyInputs,
  tikTokLinks,
  removedSocialLinks,
  checkedEnvKeys: Object.keys(requiredEnv),
  failures,
  warnings,
};

fs.mkdirSync(path.join(root, "output"), { recursive: true });
fs.writeFileSync(path.join(root, "output", "qa-launch-config-report.json"), `${JSON.stringify(report, null, 2)}\n`);

if (failures.length > 0) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(report, null, 2));
