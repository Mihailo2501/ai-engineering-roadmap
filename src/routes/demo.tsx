import { Section } from "../components/section";
import { CheckpointIcon } from "../components/checkpoint-icon";
import { ProgressCartouche } from "../components/progress-cartouche";
import { CompassNeedle } from "../components/compass-needle";
import { PhaseRegion } from "../components/phase-region";
import { phases } from "../data/roadmap";
import { Link } from "react-router-dom";

export default function DemoPage() {
  return (
    <main className="min-h-screen px-6 py-10 md:px-10 md:py-14 max-w-6xl mx-auto">
      <nav className="mb-8 font-body text-sm text-ink-soft">
        <Link to="/" className="hover:text-gold">
          &larr; back to the map
        </Link>
      </nav>
      <header className="mb-10">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-faded-red">
          Cartographer's workshop
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-ink mt-2">
          Base component gallery
        </h1>
        <p className="font-body italic text-ink-soft mt-2 max-w-prose">
          The tools the cartographer carries. Clicking a checkpoint stamps it
          gold and the change persists across reloads.
        </p>
      </header>

      <Section eyebrow="Token swatches" title="Palette and type">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { name: "parchment", swatch: "bg-parchment" },
            { name: "parchment-deep", swatch: "bg-parchment-deep" },
            { name: "ink", swatch: "bg-ink" },
            { name: "ink-soft", swatch: "bg-ink-soft" },
            { name: "faded-red", swatch: "bg-faded-red" },
            { name: "gold", swatch: "bg-gold" },
            { name: "gold-bright", swatch: "bg-gold-bright" },
            { name: "teal", swatch: "bg-teal" },
          ].map((c) => (
            <div key={c.name} className="text-center">
              <div
                className={`${c.swatch} h-16 w-full rounded-sm border border-ink/30`}
              />
              <p className="mt-2 font-body text-xs text-ink-soft">{c.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div>
            <p className="font-display text-3xl text-ink">Cinzel display serif</p>
            <p className="font-display text-sm text-ink-faded uppercase tracking-[0.4em]">
              Region names and stamps
            </p>
          </div>
          <div>
            <p className="font-body text-xl text-ink">
              Source Serif 4 for body prose.
            </p>
            <p className="font-body italic text-ink-soft text-sm">
              Tooltips, blurbs, and log entries live here.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Checkpoint icons" title="Wax stamps and gold seals">
        <div className="flex flex-wrap items-end gap-x-6 gap-y-8">
          <CheckpointIcon id="demo-1" title="Sample resource one" kind="post" />
          <CheckpointIcon
            id="demo-2"
            title="With a URL hover"
            kind="doc"
            url="https://www.anthropic.com"
          />
          <CheckpointIcon id="demo-3" title="Tap me twice" kind="repo" />
          <CheckpointIcon
            id="demo-secret"
            title="Hidden cache"
            kind="post"
            secret
          />
        </div>
        <p className="font-body text-sm text-ink-faded mt-6 max-w-prose">
          Click any seal. The stamp drops, the ink splatters, the state
          persists. Reload and watch them stay charted.
        </p>
      </Section>

      <Section eyebrow="Cartouche" title="Progress display">
        <ProgressCartouche />
      </Section>

      <Section eyebrow="Compass" title="Cartographer's compass">
        <CompassNeedle size={180} />
      </Section>

      <Section eyebrow="Phase shell" title="Region preview">
        <PhaseRegion phase={phases[1]} />
      </Section>
    </main>
  );
}
