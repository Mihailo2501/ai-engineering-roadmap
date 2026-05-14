// Inlines the main entry CSS file into dist/index.html so the first paint
// does not require a separate CSS round-trip. Vite's css-code-split is on by
// default and the entry stylesheet is tiny, so inlining trades a couple of
// kilobytes of HTML for one less render-blocking fetch.

import { readFileSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dist = path.resolve(__dirname, "..", "dist");
const indexPath = path.join(dist, "index.html");

const html = readFileSync(indexPath, "utf8");
const linkPattern = /<link[^>]+rel="stylesheet"[^>]+href="(\.\/assets\/[^"]+\.css)"[^>]*>/g;
let updated = html;
let inlined = 0;

updated = updated.replace(linkPattern, (match, href) => {
  const cssPath = path.join(dist, href.replace(/^\.\//, ""));
  try {
    const css = readFileSync(cssPath, "utf8");
    if (css.length > 40 * 1024) {
      console.warn(`[inline-css] ${href} is larger than 40 KB; leaving as link.`);
      return match;
    }
    inlined += 1;
    const sizeKb = (statSync(cssPath).size / 1024).toFixed(1);
    console.log(`[inline-css] inlining ${href} (${sizeKb} KB)`);
    return `<style data-inline-from="${href}">${css}</style>`;
  } catch (err) {
    console.warn("[inline-css] failed to read", cssPath, err);
    return match;
  }
});

if (inlined > 0) {
  writeFileSync(indexPath, updated);
  console.log(`[inline-css] rewrote ${indexPath} (${inlined} stylesheet${inlined > 1 ? "s" : ""} inlined)`);
} else {
  console.log("[inline-css] nothing to inline");
}
