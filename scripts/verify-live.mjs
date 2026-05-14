import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const out = path.resolve(__dirname, "..", "public", "screenshots");
mkdirSync(out, { recursive: true });

const URL = process.env.AER_URL ?? "https://mihailo2501.github.io/ai-engineering-roadmap/";

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1.5,
});
await context.addInitScript(() => {
  try {
    window.localStorage.setItem(
      "aer:progress:v1",
      JSON.stringify({
        checked: {},
        audio: false,
        cinematicsPlayed: { intro: Date.now() },
        introSeen: true,
        voyageLogOpen: false,
      })
    );
  } catch {}
});
const errors = [];
context.on("weberror", (e) => errors.push("weberror: " + e.error().message));
const page = await context.newPage();
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push("console: " + msg.text());
});
console.log("loading", URL);
const response = await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
console.log("status:", response?.status());
await page.waitForTimeout(2500);
await page.screenshot({
  path: path.join(out, "live-home.png"),
  type: "png",
  fullPage: false,
});
console.log("screenshot ->", path.join(out, "live-home.png"));
if (errors.length === 0) {
  console.log("no console errors detected");
} else {
  console.log("errors detected:");
  for (const e of errors) console.log("  -", e);
}
await browser.close();
process.exit(errors.length === 0 ? 0 : 1);
