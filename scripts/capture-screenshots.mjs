import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const out = path.join(root, "public/screenshots");
mkdirSync(out, { recursive: true });

const URL_HASH = process.env.AER_URL ?? "http://localhost:4173/";

const partialCheckedIds = [
  "p0-m01-05", "p0-m06-10", "p0-m11-15", "p0-m16-20", "p0-m21-25",
  "p1-bea", "p1-12factor", "p1-patterns",
  "p2-mcp", "p2-cc-101",
];
const seedChecked = {};
let t = Date.now() - 86400000 * 14;
for (const id of partialCheckedIds) {
  seedChecked[id] = { at: t };
  t += 86400000;
}
const partialProgress = { checked: seedChecked };
const emptyProgress = { checked: {} };

async function capture(name, opts) {
  console.log(`capturing ${name}...`);
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: opts.width, height: opts.height },
    deviceScaleFactor: opts.scale ?? 2,
    reducedMotion: "reduce",
  });
  await context.addInitScript((data) => {
    try {
      window.localStorage.setItem("aer:progress:v1", JSON.stringify(data));
    } catch (err) {
      console.warn("[seed] localStorage failed", err);
    }
  }, opts.progress ?? emptyProgress);
  const page = await context.newPage();
  await page.goto(URL_HASH, { waitUntil: "networkidle" });
  await page.waitForSelector("h1");
  await page.waitForTimeout(opts.wait ?? 800);
  if (opts.scrollTo) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
    }, opts.scrollTo);
    await page.waitForTimeout(300);
  }
  await page.screenshot({
    path: path.join(out, `${name}.png`),
    fullPage: !!opts.fullPage,
    type: "png",
  });
  await browser.close();
  console.log(`  -> screenshots/${name}.png`);
}

const URL_GLOSSARY = URL_HASH + "#/glossary";
const URL_STUDY = URL_HASH + "#/study";

await capture("home-fresh", {
  width: 1440,
  height: 960,
  progress: emptyProgress,
});

await capture("home-progress", {
  width: 1440,
  height: 960,
  progress: partialProgress,
});

await capture("phase-detail", {
  width: 1440,
  height: 960,
  progress: partialProgress,
  scrollTo: "#the-workshop",
});

await capture("mobile", {
  width: 414,
  height: 896,
  scale: 2,
  progress: partialProgress,
});

async function captureUrl(name, url, opts) {
  console.log(`capturing ${name}...`);
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: opts.width, height: opts.height },
    deviceScaleFactor: opts.scale ?? 2,
    reducedMotion: "reduce",
  });
  await context.addInitScript((data) => {
    try {
      window.localStorage.setItem("aer:progress:v1", JSON.stringify(data));
    } catch (err) {
      console.warn("[seed] localStorage failed", err);
    }
  }, opts.progress ?? emptyProgress);
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForSelector("h1");
  await page.waitForTimeout(opts.wait ?? 600);
  await page.screenshot({
    path: path.join(out, `${name}.png`),
    fullPage: !!opts.fullPage,
    type: "png",
  });
  await browser.close();
  console.log(`  -> screenshots/${name}.png`);
}

await captureUrl("glossary", URL_GLOSSARY, {
  width: 1440,
  height: 960,
  progress: partialProgress,
});

await captureUrl("study-workflow", URL_STUDY, {
  width: 1440,
  height: 960,
  progress: partialProgress,
});

console.log("done.");
