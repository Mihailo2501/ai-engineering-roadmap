# Audio credits and licensing

All audio in this directory is original to the project, synthesized via ffmpeg
lavfi filters during the autonomous build of the AI Engineering Roadmap.
No third-party samples were used. License: same as the project (MIT).

Tracks and how they were generated:

| File | Role | Synthesis approach |
|---|---|---|
| `ambient-cartographer.mp3` | Looping background drone | Four detuned sine partials over A2, mild LFO tremolo, gentle dual-tap echo, slow fade in and out so it loops cleanly. ~32s. |
| `sfx-stamp.mp3` | Wax stamp drop / checkpoint commit | Two damped sine partials at 92 Hz and 168 Hz plus a brief noise transient. ~320ms. |
| `sfx-wax-seal.mp3` | Slower wax-seal squish for the seal pour | Damped sines at 72 Hz and 128 Hz with low-passed click. ~400ms. |
| `sfx-page-turn.mp3` | Page turn for log open / pages | Brown noise burst, bandpass at 2.4 kHz, in-out fades. ~500ms. |
| `sfx-quill-scratch.mp3` | Path draw and quill writing | Pink noise burst, narrow bandpass at 3.8 kHz, tremolo at 22 Hz. ~450ms. |
| `sfx-open.mp3` | Modal open / panel open | Two short damped sines at 340 Hz and 520 Hz. ~220ms. |
| `sfx-close.mp3` | Modal close / panel close | Two short damped sines at 220 Hz and 340 Hz, low-passed. ~260ms. |

To regenerate any track, run: `node scripts/generate-sounds.mjs` from the repo
root. ffmpeg must be on the PATH. The script is self-contained and reads no
external files. Any swap of these placeholders for a curated track from
Pixabay, Mixkit, or Freesound can drop into this directory under the same
filename without code changes.
