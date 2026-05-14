# AI Engineering Roadmap — Project Context

## What this is

A personal, hosted, interactive learning roadmap visualized as an illustrated cartographer's map. Six phases of curated AI agent engineering material, each phase a region on the map, each resource a checkpoint. Click a checkpoint to mark it complete. Progress persists in localStorage. Cinematic Remotion sequences play at phase completion and at the capstone.

**Brand:** AI Engineering Roadmap. **Repo target:** `github.com/Mihailo2501/ai-agent-roadmap` (or similar). **License:** MIT.

**Distribution:** hosted via GitHub Pages from this repo. This is a personal artifact, not a distributed course. The "no hosting" rule from Project 11 (AI Agent Engineering) does not apply here.

## Locked decisions

Do not re-litigate without explicit ask:

- **Tech stack:** Vite + React 19 + TypeScript + MDX + Tailwind 4 + Framer Motion + Remotion. Same React + MDX skills as Project 11, different visual language.
- **Design:** cartographer's roadmap. Illustrated parchment map, dark ink line illustration, sepia background, gold accents for completed items, faded red for incomplete. NOT the Clay-inspired aesthetic from Project 11. This artifact is visually distinct from the course on purpose.
- **Typography:** one display serif for region names (Cinzel or similar old-world cartography flavor), one clean modern serif (Source Serif or Lora) for body and tooltips. Strict two-font rule.
- **Color palette:** off-white parchment background, ink black for line work, faded red for incomplete checkpoints, bright gold for completed stamps and walked paths, muted teal for water features.
- **Illustrations:** generated via GPT image 2 through Codex, consistent ink-line style across all six phase regions plus corner marginalia.
- **Checkpoint tracking:** localStorage per resource, no backend. Same pattern as Project 11 progress strip.
- **Cinematics:** three Remotion-rendered MP4 sequences. (1) Hero intro reel, ~12 seconds, plays first visit only, skippable. (2) Phase completion ceremony, ~6 seconds, one per phase, plays when all checkpoints in that phase are checked. (3) Capstone reveal, ~30 seconds, plays when all six phases complete. MP4s committed to the repo under `public/cinematics/` and served directly from GitHub Pages (skip Cloudflare R2 for v1, total MP4 payload should stay under 80MB which is well within GitHub's limits).
- **Audio:** ambient soundtrack plus interaction SFX (quill scratch, wax seal, stamp, page turn). Sourced from Pixabay, Mixkit, Freesound. Off by default, toggleable, preference persisted.
- **Animations:** ambient (compass wobble, water waves, smoke, breathing pulse on current marker, sea monster blinks), hover (lift + tilt), click-to-check (stamp drop, ink splatter, path draw), phase completion (banner ripple, ink scatter), scroll (parallax + stagger reveal).
- **Fog of war:** unrevealed phases shrouded in pale drifting fog. Fog lifts dramatically when previous phase completes.
- **Voyage log:** toggleable sidebar showing journey as quill-and-ink log entries with timestamps and optional reflection notes per checkpoint.
- **Stretch features:** cursor as quill with ink trail, hidden secret checkpoint somewhere on the map, hi-res PDF export of completed map, LinkedIn share image generator, Konami code fast-travel mode.

## Content: six phases

The roadmap content is locked from prior planning. Each phase has a region name and a set of resource checkpoints.

| Phase | Region name | Theme |
|---|---|---|
| 0 | Home Port | Re-read AI Agent Engineering course end to end (M01-M25) |
| 1 | The Library | Canon reading (Building Effective Agents, 12-Factor Agents, learnagenticpatterns.com) plus agent benchmarks for field literacy (SWE-bench, GAIA, τ-bench, AgentBench, BrowseComp) |
| 2 | Harbor of Protocols | MCP, Anthropic primitives, the programmatic surface (Claude Code 101 + Claude Code in Action, Agent SDK, `claude -p`, Claude Code GitHub Actions, third-party Agent SDK apps), and Anthropic Computer Use |
| 3 | The Workshop | Open source + fine-tuning (HF Agents Course full + bonuses, Karpathy Zero to Hero) plus open-source browser automation (Stagehand, browser-use) and memory architectures beyond RAG (Mem0, GraphRAG, long-term memory patterns) |
| 4 | Framework Crossroads | Multi-framework (Ed Donner Complete Agentic AI 6 weeks, LangChain Academy LangGraph TS Quickstart) plus multi-agent coordination at production scale (Cognition Devin posts, Anthropic multi-agent orchestration, Hamel's "when not to multi-agent") |
| 5 | The Observatory | Evals discipline (Hamel corpus, Forest Friends zine, Lenny's Beyond Vibe Checks, Eugene Yan, Arize Recipe Bot, DLAI eval shorts, Anthropic prompt engineering tutorial) |
| 6 | The Summit | Cloud capstone (Anthropic Managed Agents docs, Inngest, Cloud Run, Railway pgvector, ship the eval-gated agent) plus production cost engineering (prompt caching, batch API, model routing, target cost-per-session) |

Plus an appendix bucket of canonical repos and tools to study, rendered as a separate "library catalogue" section, not on the main map.

## Hard rules

- **No em dashes anywhere.** Body prose, code comments, tooltips, titles, alt text. Use commas, colons, semicolons, or split sentences.
- **Kebab-case file names** throughout.
- **No silent failures** in code. Every error logged with full context.
- **Single responsibility per file.**
- **Prefer editing existing files** over creating new ones.
- **Don't add features the task did not request.** Stay scoped to the build plan in `plans/build-plan.md`.
- **No employment, employer, mentor, or job-search references** in any output (per global CLAUDE.md hard rule).

## Build pattern

This project is being built using Claude Code's `/goal` autonomous mode (shipped May 12, 2026 in Claude Code 2.1.139) as a **single fully-autonomous run**. Mihailo fires one `/goal` covering the entire build. No human-in-the-loop checkpoints. Claude makes all creative decisions (fonts, illustrations, audio, animation timing, Remotion storyboards) using best judgment.

If Mihailo doesn't love a choice after deployment (most likely the audio, possibly an illustration), he requests a revision and it gets swapped. Revision cost is lower than gate cost.

The 10 milestones in `plans/build-plan.md` are internal scaffolding for systematic work, not separate `/goal` invocations.

**Audio selection without hearing:** Claude picks tracks based on Pixabay/Mixkit/Freesound metadata, tags, descriptions, popularity counts, BPM, and license terms. Best guess given the cartographer/medieval/parchment vibe. Mihailo swaps if needed at the end.

**Illustration selection:** Claude generates GPT image 2 outputs via Codex and picks one that fits each region without batching variants for review. If the vibe is off after deployment, regenerate with refined prompts.

## File layout (target)

```
/
├── CLAUDE.md                   # this file
├── README.md
├── LICENSE                     # MIT
├── .gitignore
├── .github/workflows/deploy.yml
├── plans/
│   └── build-plan.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── index.html
├── public/
│   ├── illustrations/          # PNGs per phase region + marginalia
│   ├── sounds/                 # MP3s for ambient + SFX
│   └── credits.md              # licensing trace for audio + imagery
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── routes.tsx
    ├── data/
    │   └── roadmap.ts          # phase + checkpoint manifest
    ├── components/
    │   ├── cartographer-map.tsx
    │   ├── checkpoint-icon.tsx
    │   ├── phase-region.tsx
    │   ├── voyage-log.tsx
    │   ├── progress-cartouche.tsx
    │   ├── compass-needle.tsx
    │   ├── fog-of-war.tsx
    │   └── cinematic-player.tsx
    ├── content/
    │   └── phases.mdx          # phase prose, resource lists
    ├── lib/
    │   ├── progress.ts         # localStorage helpers
    │   ├── audio.ts            # audio toggle + playback
    │   └── analytics.ts        # optional: track which cinematics played
    └── remotion/
        ├── intro-reel.tsx
        ├── phase-completion.tsx
        └── capstone-reveal.tsx
```

## Companion project: study scratchpad

Notes, summaries, takeaways, questions, and code experiments for actually working through the roadmap live in **Project 15 — AI Engineering Study** at `/Users/mihailo/Projects/Project 15 - AI Engineering Study/`. That project is the working scratchpad. This project (14) is the visual artifact tracking progress.

The roadmap site references this via a **Scribe's Tent** element on the map. The tent is a small ink-line illustration positioned near Home Port. Clicking it opens a modal panel explaining the study workflow:

- Where to open Claude Code sessions (in Project 15)
- How to name sessions (`/rename p<phase>-<topic-slug>`)
- Where notes go (one markdown file per resource, in the matching phase folder)
- That progress checkboxes here (Project 14) and notes there (Project 15) are intentionally separate concerns

The Scribe's Tent does not gate any progress, it is purely a help/onboarding element. It uses the same modal-overlay pattern as the voyage log.

## When in doubt

- Re-read this file before reopening a locked decision
- Ship working slices, not over-engineered abstractions
- The cartographer metaphor IS the design; do not dilute it with generic UI patterns
- This is a personal artifact; bias toward delight and polish over enterprise rigor
