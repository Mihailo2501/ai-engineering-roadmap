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

const sampleProgress = {
  checked: {
    "p0-m01-05": { at: Date.now() - 86400000 * 12 },
    "p0-m06-10": { at: Date.now() - 86400000 * 11 },
    "p0-m11-15": { at: Date.now() - 86400000 * 10 },
    "p0-m16-20": { at: Date.now() - 86400000 * 9 },
    "p0-m21-25": { at: Date.now() - 86400000 * 8 },
    "p1-bea": { at: Date.now() - 86400000 * 7 },
    "p1-12factor": { at: Date.now() - 86400000 * 6 },
    "p1-patterns": { at: Date.now() - 86400000 * 5 },
    "p1-swebench": { at: Date.now() - 86400000 * 4 },
    "p1-gaia": { at: Date.now() - 86400000 * 3 },
    "p1-taubench": { at: Date.now() - 86400000 * 2 },
    "p2-mcp": { at: Date.now() - 86400000 * 1.5 },
    "p2-cc-101": { at: Date.now() - 86400000 },
  },
  audio: false,
  cinematicsPlayed: { intro: Date.now() },
  introSeen: true,
  voyageLogOpen: false,
};

async function capture(name, opts) {
  console.log(`capturing ${name}...`);
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: opts.width, height: opts.height },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  await context.addInitScript((data) => {
    try {
      window.localStorage.setItem("aer:progress:v1", JSON.stringify(data));
    } catch (err) {
      console.warn("[seed] localStorage failed", err);
    }
  }, sampleProgress);
  const page = await context.newPage();
  await page.goto(URL_HASH, { waitUntil: "networkidle" });
  await page.waitForTimeout(opts.wait ?? 1500);
  if (opts.scrollPct !== undefined) {
    await page.evaluate((pct) => {
      const scroller = document.querySelector('[role="region"]');
      if (scroller) {
        const max = scroller.scrollWidth - scroller.clientWidth;
        scroller.scrollLeft = Math.max(0, max * pct);
      }
    }, opts.scrollPct);
    await page.waitForTimeout(500);
  }
  await page.screenshot({
    path: path.join(out, `${name}.png`),
    fullPage: false,
    type: "png",
  });
  await browser.close();
  console.log(`  -> screenshots/${name}.png`);
}

await capture("map-home", { width: 1920, height: 1080, wait: 2200, scrollPct: 0 });
await capture("map-mid", { width: 1920, height: 1080, wait: 2200, scrollPct: 0.5 });
await capture("map-summit", { width: 1920, height: 1080, wait: 2200, scrollPct: 1 });

async function generateOg() {
  console.log("generating og-image.png...");
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.setContent(
    `<!doctype html><html><head><meta charset="utf-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;1,8..60,400&display=swap" rel="stylesheet" />
    <style>
      body { margin: 0; background: #f4ead3; font-family: "Cinzel", serif; color: #1c1610; }
      .frame { width: 1200px; height: 630px; padding: 56px; box-sizing: border-box; }
      .inner { border: 2px solid #1c1610; width: 100%; height: 100%; padding: 48px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; position: relative; }
      .eyebrow { font-size: 18px; letter-spacing: 12px; color: #a73a26; text-transform: uppercase; }
      .title { font-size: 88px; line-height: 1; margin-top: 14px; letter-spacing: 4px; }
      .sub { font-family: "Source Serif 4", serif; font-style: italic; font-size: 26px; color: #3a2f24; margin-top: 14px; max-width: 880px; }
      .row { display: flex; justify-content: space-between; align-items: flex-end; }
      .small { font-size: 14px; letter-spacing: 6px; text-transform: uppercase; color: #6e5b46; }
      .compass { position: absolute; right: 56px; top: 56px; }
      svg { display: block; }
    </style></head><body>
      <div class="frame"><div class="inner">
        <div class="compass">
          <svg viewBox="0 0 80 80" width="92" height="92">
            <circle cx="40" cy="40" r="37" fill="#e7d6ad" stroke="#1c1610" stroke-width="1.6"/>
            <polygon points="40,8 46,40 40,72 34,40" fill="#a73a26" stroke="#1c1610" stroke-width="0.6"/>
            <circle cx="40" cy="40" r="3" fill="#1c1610"/>
          </svg>
        </div>
        <div>
          <div class="eyebrow">A Cartographer's Chart</div>
          <div class="title">AI Engineering Roadmap</div>
          <div class="sub">Six phases. Dozens of checkpoints. One summit. Every stamp is a leg of the voyage charted.</div>
        </div>
        <div class="row">
          <div class="small">set sail</div>
          <div class="small">${new Date().getFullYear()}</div>
        </div>
      </div></div>
    </body></html>`,
    { waitUntil: "networkidle" }
  );
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(root, "public", "og-image.png"),
    type: "png",
    omitBackground: false,
  });
  await browser.close();
  console.log("  -> public/og-image.png");
}

await generateOg();
console.log("done.");
