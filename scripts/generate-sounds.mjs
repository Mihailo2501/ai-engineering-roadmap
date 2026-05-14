// Generates the audio assets in public/sounds/ via ffmpeg lavfi synthesis.
// Run once before committing: `node scripts/generate-sounds.mjs`.
// Autonomous synthesis trades curated character for self-sufficiency: the tracks
// are deliberately understated so the visual map carries the narrative weight.

import { execSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const OUT = "public/sounds";
mkdirSync(OUT, { recursive: true });

function run(name, filterDesc, mp3Args = "-b:a 96k -ar 44100 -ac 1") {
  const cmd = `ffmpeg -y -hide_banner -loglevel error -f lavfi -i "${filterDesc}" ${mp3Args} "${OUT}/${name}"`;
  process.stdout.write(`generating ${name}...`);
  execSync(cmd, { stdio: "inherit" });
  process.stdout.write(" done\n");
}

run(
  "sfx-stamp.mp3",
  "aevalsrc=exprs='0.85*sin(2*PI*92*t)*exp(-t*7) + 0.45*sin(2*PI*168*t)*exp(-t*11) + 0.25*(random(0)-0.5)*exp(-t*22)':duration=0.32:sample_rate=44100,highpass=f=40,lowpass=f=2400"
);

run(
  "sfx-wax-seal.mp3",
  "aevalsrc=exprs='0.7*sin(2*PI*72*t)*exp(-t*8) + 0.5*sin(2*PI*128*t)*exp(-t*16) + 0.18*(random(0)-0.5)*exp(-t*30)':duration=0.4:sample_rate=44100,lowpass=f=1800"
);

run(
  "sfx-page-turn.mp3",
  "anoisesrc=color=brown:duration=0.5:amplitude=0.35,bandpass=f=2400:width_type=h:w=1600,volume=0.55,afade=t=in:d=0.04,afade=t=out:st=0.18:d=0.3"
);

run(
  "sfx-quill-scratch.mp3",
  "anoisesrc=color=pink:duration=0.45:amplitude=0.35,bandpass=f=3800:width_type=h:w=1600,tremolo=f=22:d=0.6,volume=0.4,afade=t=in:d=0.04,afade=t=out:st=0.2:d=0.25"
);

run(
  "sfx-open.mp3",
  "aevalsrc=exprs='0.45*sin(2*PI*340*t)*exp(-t*16) + 0.25*sin(2*PI*520*t)*exp(-t*22)':duration=0.22:sample_rate=44100,highpass=f=120"
);

run(
  "sfx-close.mp3",
  "aevalsrc=exprs='0.5*sin(2*PI*220*t)*exp(-t*14) + 0.2*sin(2*PI*340*t)*exp(-t*20)':duration=0.26:sample_rate=44100,lowpass=f=1400"
);

run(
  "ambient-cartographer.mp3",
  "aevalsrc=exprs='0.18*sin(2*PI*110*t)*(1+0.15*sin(2*PI*0.07*t)) + 0.12*sin(2*PI*146.83*t)*(1+0.1*sin(2*PI*0.05*t+1.2)) + 0.08*sin(2*PI*220*t)*(1+0.08*sin(2*PI*0.09*t+2.1)) + 0.06*sin(2*PI*293.66*t)*(1+0.1*sin(2*PI*0.11*t+0.6))':duration=32:sample_rate=44100,lowpass=f=2400,aecho=0.6:0.4:600|1200:0.3|0.18,volume=0.55,afade=t=in:d=2.5,afade=t=out:st=29:d=3",
  "-b:a 96k -ar 44100 -ac 1"
);

console.log("\nall audio assets generated under", OUT);
