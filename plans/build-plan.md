# Build plan

## Execution mode: single autonomous `/goal`

This entire project ships under one `/goal` invocation. No human-in-the-loop checkpoints. Claude makes all creative decisions (fonts, illustrations, audio, animation timing, Remotion storyboards) using best judgment. If Mihailo doesn't love something after deployment, he requests a revision and it gets swapped at the end.

The 10 milestones below are internal scaffolding for Claude to work through systematically. They are NOT separate `/goal` invocations.

Estimated total wall-clock: 5-8 hours fully autonomous. Mihailo's involvement: fire the `/goal`, walk away, review the live URL when it's done, request any revisions.

## The `/goal` command

Mihailo fires this once from a Claude Code session opened in the Project 14 directory:

```
/goal Build the entire AI Engineering Roadmap site per CLAUDE.md and this build-plan.md. Work through all 10 milestones autonomously without pausing. Make every creative decision using best judgment: fonts, illustrations via GPT image 2 through Codex, audio selection via Pixabay/Mixkit/Freesound based on metadata and tags, interaction timing, Remotion cinematic storyboards. Deploy to GitHub Pages. Final state: live URL accessible, README contains screenshots and the live URL, Lighthouse 90+ on Performance, Accessibility, Best Practices, SEO, zero console errors.
```

## Risk notes

- Token cost for a 5-8 hour autonomous run: roughly $30-100 in API usage with caching helping
- `/goal` shipped only on May 12, 2026; long autonomous runs at this scale are unproven
- Claude will make creative choices Mihailo wouldn't have made; the bet is that revision cost is lower than gate cost

## Milestone 1: Scaffold

**Goal:**

> Scaffold a Vite + React 19 + TypeScript + MDX + Tailwind 4 + Framer Motion + Remotion project at the repo root. Install all dependencies. Set up routing with react-router. Configure GitHub Actions workflow that deploys to GitHub Pages on push to main. Dev server boots cleanly with `npm run dev`, build passes with `npm run build`. Homepage renders a placeholder "AI Engineering Roadmap" h1 with no console errors.

**Completion condition for Haiku:** `npm run dev` boots without errors, `npm run build` exits 0, the index page renders the expected h1, the GitHub Actions workflow file exists at `.github/workflows/deploy.yml`.

**Estimated wall-clock:** 5-10 minutes.

## Milestone 2: Design tokens and base components

**Goal:**

> Define design tokens in Tailwind config (parchment, ink, faded red, gold, muted teal, plus the two serif font families). Implement base components: `Section`, `CheckpointIcon` (with localStorage-backed checked state), `ProgressCartouche`, `CompassNeedle`, `PhaseRegion` shell. Create a demo route at `/demo` that renders all base components with sample data. No real illustrations yet, use SVG placeholders.

**Completion condition for Haiku:** `/demo` route renders all five components, clicking a `CheckpointIcon` persists state across reload, progress cartouche updates in real time, no console errors.

**Estimated wall-clock:** 20-30 minutes.

**Manual review after:** confirm token palette, typography, component shapes. This is the last chance to redirect the visual language cheaply.

## Milestone 3: Static map layout with placeholder illustrations

**Goal:**

> Implement the full cartographer's map at `/` as one large horizontally-scrollable SVG. Six phase regions positioned with the journey arc (Home Port left, Summit right). Dotted ink paths connect regions in order. Each phase region contains its checkpoint icons positioned within the region. All illustrations are placeholder rectangles labeled with region names ("THE LIBRARY", "HARBOR OF PROTOCOLS", etc). Region names rendered in the display serif. The compass cartouche sits in the bottom-right with a static compass rose.

**Completion condition for Haiku:** root route renders the map SVG, all six regions are present and labeled, paths connect them in order, the compass cartouche shows total progress count, no console errors.

**Estimated wall-clock:** 30-45 minutes.

**Manual review after:** confirm map composition and region positioning before illustrations are generated.

## Milestone 4: Illustrations via GPT image 2 (Codex-assisted, Mihailo-approved)

**Not a /goal milestone.** Iterative creative work.

Process:
1. Codex generates 3-5 variants per phase region using a consistent ink-line illustration prompt
2. Mihailo eyeballs each batch, picks the best, requests refinements if needed
3. Final selections drop into `public/illustrations/` as PNGs with consistent naming
4. Map component swaps placeholders for real PNGs

**Estimated wall-clock:** 1-1.5 hours of generation + review.

## Milestone 5: Interactions and ambient animations

**Goal:**

> Implement Framer Motion animations across the map. Hover state on checkpoint icons (lift + tilt + glow). Click-to-check sequence (icon compress, ink stamp drop with spring physics, ink splatter SVG, path draw via stroke-dasharray, compass needle re-orient, progress odometer roll). Ambient loops (compass needle wobble, water wave loops, smoke wisps from Workshop, breathing pulse on "you are here" marker, sea monster blink at map edges). Respect `prefers-reduced-motion`.

**Completion condition for Haiku:** clicking a checkpoint plays the full sequence, ambient animations run continuously, the "you are here" marker moves to the most recently completed checkpoint, no console errors, accessibility check passes.

**Estimated wall-clock:** 1-1.5 hours.

## Milestone 6: Fog of war + voyage log sidebar + Scribe's Tent

**Goal:**

> Implement fog of war: regions for incomplete phases shrouded in animated drifting fog using SVG masks. Completing all checkpoints in a phase triggers a fog dissipation animation revealing the next region. Implement the voyage log: toggleable right-side slide-out panel showing all completed checkpoints as quill-and-ink log entries with timestamps and an optional reflection text field per entry (persisted in localStorage). Implement the **Scribe's Tent**: a small ink-line tent illustration positioned near Home Port on the map. Clicking it opens a modal panel explaining the study workflow: notes live in Project 15 at `/Users/mihailo/Projects/Project 15 - AI Engineering Study/`, sessions should be opened from that directory, session naming uses `/rename p<phase>-<topic-slug>` pattern, notes go in `notes/phase-<n>-<region>/` as one markdown file per resource. The Scribe's Tent does not gate any progress; it is a help/onboarding element using the same modal pattern as the voyage log.

**Completion condition for Haiku:** initial state shows only Home Port unfogged, completing a phase triggers the next region's fog to dissipate, voyage log toggles cleanly and displays entries with timestamps, reflection notes persist across reload, Scribe's Tent icon is visible near Home Port and clicking it opens a modal with the workflow explanation.

**Estimated wall-clock:** 1.5-2 hours.

## Milestone 7: Audio system

**Goal:**

> Implement audio playback with toggleable ambient soundtrack and reactive SFX (quill scratch on path draw, wax seal squish on stamp, page turn on log toggle). Audio off by default, toggle persisted in localStorage. All audio files in `public/sounds/`, sourced ahead of this milestone.

**Pre-milestone sourcing (autonomous):** Browse Pixabay Music, Pixabay SFX, Mixkit, Freesound. Identify 3-5 candidate tracks per audio slot. Document URLs in `public/sounds/candidates.md`. Mihailo reviews and picks. Final selections copied to `public/sounds/` with `credits.md` listing source and license.

**Completion condition for Haiku:** audio toggle button works, selected ambient track loops cleanly, SFX play on the right interactions, mute preference persists, all sound files credited in `public/sounds/credits.md`.

**Estimated wall-clock:** 30-45 minutes of autonomous work plus Mihailo's listening review.

## Milestone 8: Remotion cinematics

**Goal:**

> Build three Remotion compositions: intro reel (~12s), phase completion ceremony template (~6s, parameterized per phase), capstone reveal (~30s). Render all eight MP4s (intro + 6 phase completions + capstone). Upload to Cloudflare R2. Integrate a `CinematicPlayer` modal that plays each cinematic when its trigger fires (first visit, phase completion, all phases complete). Each cinematic plays once per user (localStorage gates).

**Completion condition for Haiku:** all eight MP4s exist on R2 with public URLs, the player modal plays the right cinematic at the right trigger, replay protection works (LocalStorage gates fire correctly), the capstone cinematic offers a downloadable copy.

**Estimated wall-clock:** 2-3 hours (iterative on storyboards and timing).

**Manual review during:** Mihailo approves storyboards before final render, approves final timing of each sequence.

## Milestone 9: Stretch features

**Goal:**

> Implement: (a) cursor as quill icon with fading ink trail on mouse movement; (b) one hidden secret checkpoint somewhere on the map that doesn't show in normal progress but awards a special stamp when found; (c) hi-res PDF export of the current map state using `html-to-image` or `react-pdf`; (d) LinkedIn share image generator that snapshots the map with a clean overlay; (e) Konami code listener that activates "fast travel" mode showing keyboard shortcuts per checkpoint.

**Completion condition for Haiku:** quill cursor renders and trails work, secret checkpoint is reachable via documented hint, PDF export downloads a valid file, share image generator produces a 1200x630 PNG, Konami code triggers the fast-travel overlay, all features documented in README.

**Estimated wall-clock:** 1-1.5 hours.

## Milestone 10: Polish and ship

**Goal:**

> Final polish pass. All console.errors and warnings resolved. Lighthouse score 90+ on Performance, Accessibility, Best Practices, SEO. Open Graph meta tags configured with custom share image. Favicon set. README updated with screenshots and the live URL. Repo pushed to GitHub. GitHub Pages deploy succeeds. Live URL accessible.

**Completion condition for Haiku:** Lighthouse passes thresholds, live URL responds 200, README contains the live URL and at least two screenshots.

**Estimated wall-clock:** 20-30 minutes.

## Summary

| # | Milestone | Type | Wall-clock |
|---|---|---|---|
| 1 | Scaffold | /goal | 5-10 min |
| 2 | Tokens + base components | /goal | 20-30 min |
| 3 | Static map layout | /goal | 30-45 min |
| 4 | Illustrations | manual (Codex + review) | 1-1.5 hrs |
| 5 | Interactions + ambient | /goal | 1-1.5 hrs |
| 6 | Fog of war + voyage log + Scribe's Tent | /goal | 1.5-2 hrs |
| 7 | Audio | /goal + Mihailo review | 30-45 min + listening |
| 8 | Remotion cinematics | /goal + storyboard review | 2-3 hrs |
| 9 | Stretch features | /goal | 1-1.5 hrs |
| 10 | Polish and ship | /goal | 20-30 min |

**Total autonomous /goal time:** approximately 5-7 hours.
**Total Mihailo review time:** approximately 1.5-2 hours (illustration approval, audio selection, storyboard approval).
**Total elapsed wall-clock:** 6-9 hours.
