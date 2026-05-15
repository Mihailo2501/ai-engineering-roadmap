# AI Engineering Roadmap — Project Context

## What this is

A personal, hosted study tracker for AI agent engineering. Seven phases of curated resources, rendered as a clean cards UI with a progress bar and checkboxes. Progress persists in localStorage. No backend.

The site has three pages, navigated via hash routes:

- **Roadmap** (`#/`): the tracker. Seven phase sections, each a grid of resource cards.
- **Glossary** (`#/glossary`): alphabetized definitions for the unusual terms surfaced across the roadmap, with a phase badge per term.
- **Study workflow** (`#/study`): documents how the companion scratchpad (Project 15) is organized and how to name Claude Code sessions while working through resources.

**Repo:** `github.com/Mihailo2501/ai-engineering-roadmap`. **License:** MIT. **Live:** [https://mihailo2501.github.io/ai-engineering-roadmap/](https://mihailo2501.github.io/ai-engineering-roadmap/).

This is a personal artifact, not a distributed course.

## Locked decisions

Do not re-litigate without explicit ask:

- **Tech stack:** Vite + React 19 + TypeScript + Tailwind 4. No router library — a tiny custom hash router lives in `src/lib/router.ts`. No MDX, Framer Motion, Remotion, or audio. Earlier cartographer-era build is gone.
- **Design:** clean cards, neutral slate palette, Inter via system stack, emerald accent for completion. No illustrations, no ambient animations, no sound, no parchment.
- **State:** one localStorage key, `aer:progress:v1`. Just `{ checked: Record<id, { at: number }> }`. Helpers in `src/lib/progress.ts`.
- **Routing:** hash-based, manual. Three routes: `/`, `/glossary`, `/study`. Section IDs inside the roadmap (e.g. `#home-port`) intentionally fall back to the roadmap page so deep-link anchors still work.
- **Deploy:** GitHub Actions builds and pushes to GitHub Pages on every push to `main`. Workflow in `.github/workflows/deploy.yml`. `npm run build` runs `tsc -b`, `vite build`, then `node scripts/inline-css.mjs` to inline the entry CSS into `dist/index.html` for one-fewer render-blocking fetch.
- **Screenshots and verification:** `npm run screenshots` runs `scripts/capture-screenshots.mjs` against a local preview. `npm run verify` runs `scripts/verify-live.mjs` against the deployed URL and asserts zero console errors.
- **Lighthouse target:** 100/100/100/100 (Performance, Accessibility, Best Practices, SEO). Held on the last several deploys.

## Content

Seven phases, defined in `src/data/roadmap.ts`. Each `Resource` has `id`, `title`, optional `url`, `source`, `est`, and optional `note`. Resources without a `url` render as "No link" (intentional for course re-reads and the self-directed capstone).

| Phase | Region | Theme |
|---|---|---|
| 0 | Home Port | Re-read the AI Agent Engineering course end to end (M01–M25) |
| 1 | The Library | Canon reading and agent benchmarks |
| 2 | Harbor of Protocols | MCP, Anthropic primitives, the programmatic surface |
| 3 | The Workshop | Open source models, fine-tuning, memory beyond RAG |
| 4 | Framework Crossroads | Multi-framework fluency and multi-agent coordination |
| 5 | The Observatory | Evals discipline |
| 6 | The Summit | Cloud capstone and cost engineering |

Glossary content lives in `src/data/glossary.ts` and is alphabetized by `term`.

## Hard rules

- **No em dashes anywhere.** Body prose, code comments, tooltips, titles, alt text. Use commas, colons, semicolons, or split sentences.
- **Kebab-case file names** throughout (folder and file).
- **No silent failures** in code. Every error logged with full context.
- **Single responsibility per file.**
- **Prefer editing existing files** over creating new ones.
- **No employment, employer, mentor, or job-search references** in any output (per global CLAUDE.md hard rule).

## File layout

```
/
├── CLAUDE.md                   # this file
├── README.md
├── LICENSE                     # MIT
├── .gitignore
├── .github/workflows/deploy.yml
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── screenshots/            # PNGs used in README and verification
├── scripts/
│   ├── capture-screenshots.mjs # Playwright, runs against local preview
│   ├── inline-css.mjs          # post-build, inlines entry CSS
│   └── verify-live.mjs         # Playwright, asserts no console errors live
└── src/
    ├── App.tsx                 # router shell
    ├── main.tsx
    ├── components/
    │   ├── SiteHeader.tsx      # brand + three-link nav
    │   └── PageHero.tsx        # shared eyebrow/title/intro hero
    ├── data/
    │   ├── roadmap.ts          # phase + resource manifest
    │   └── glossary.ts         # alphabetized definitions
    ├── lib/
    │   ├── progress.ts         # localStorage helpers
    │   └── router.ts           # tiny hash router
    ├── pages/
    │   ├── Roadmap.tsx
    │   ├── Glossary.tsx
    │   └── StudyWorkflow.tsx
    └── styles/
        └── index.css
```

## Companion project: study scratchpad

Notes, summaries, takeaways, questions, and code experiments for working through the roadmap live in **Project 15 — AI Engineering Study** at `/Users/mihailo/Projects/Project 15 - AI Engineering Study/`. That project is the working scratchpad. This project (14) is the tracker.

Project 15's layout:

- `notes/phase-<n>-<region>/<resource-slug>/notes.md` for each resource
- Any extra artifacts (PDFs, code experiments, screenshots, transcripts) live in the same `<resource-slug>/` folder so the scratchpad for one card stays self-contained
- Session naming: `/rename p<phase>-<topic-slug>`

The site's `/#study` page documents the workflow for visitors. Project 15's own `CLAUDE.md` documents the conventions for sessions opened inside it.

## When in doubt

- Re-read this file before reopening a locked decision
- The roadmap is a checklist, not a syllabus; cards stay lean
- Resource cards never carry instructions, because every resource gets its own Claude Code session in Project 15 where navigation questions are answered
- Ship working slices, not over-engineered abstractions
