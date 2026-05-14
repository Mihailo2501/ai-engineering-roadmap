import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const phases = [
  { index: 0, region: "Home Port", tagline: "where the journey begins" },
  { index: 1, region: "The Library", tagline: "canon reading and lay of the land" },
  { index: 2, region: "Harbor of Protocols", tagline: "the programmatic surface" },
  { index: 3, region: "The Workshop", tagline: "open source and memory beyond rag" },
  { index: 4, region: "Framework Crossroads", tagline: "many maps, one voyage" },
  { index: 5, region: "The Observatory", tagline: "evals discipline" },
  { index: 6, region: "The Summit", tagline: "cloud capstone and cost engineering" },
];

async function main() {
  console.log("bundling remotion project...");
  const bundleLocation = await bundle({
    entryPoint: path.join(root, "src/remotion/index.tsx"),
    webpackOverride: (config) => config,
  });
  console.log("bundle ready at", bundleLocation);

  for (const phase of phases) {
    const outPath = path.join(
      root,
      "public/cinematics",
      `phase-${phase.index}-completion.mp4`
    );
    console.log(`\nrendering ${outPath}`);
    const comp = await selectComposition({
      serveUrl: bundleLocation,
      id: "PhaseCompletion",
      inputProps: {
        phaseIndex: phase.index,
        region: phase.region,
        tagline: phase.tagline,
      },
    });
    await renderMedia({
      composition: comp,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: outPath,
      inputProps: {
        phaseIndex: phase.index,
        region: phase.region,
        tagline: phase.tagline,
      },
      crf: 26,
      pixelFormat: "yuv420p",
      concurrency: 2,
      logLevel: "warn",
    });
  }

  console.log("\nall phase cinematics rendered.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
