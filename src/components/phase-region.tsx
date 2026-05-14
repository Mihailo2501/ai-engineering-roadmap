import type { ReactNode } from "react";
import { CheckpointIcon } from "./checkpoint-icon";
import { useProgress } from "../lib/progress";
import type { Phase } from "../data/roadmap";

type Props = {
  phase: Phase;
  unlocked?: boolean;
  illustration?: ReactNode;
  className?: string;
  layout?: "stack" | "horizontal";
};

export function PhaseRegion({
  phase,
  unlocked = true,
  illustration,
  className,
  layout = "stack",
}: Props) {
  const progress = useProgress();
  const total = phase.resources.filter((r) => !r.secret).length;
  const checked = phase.resources.filter(
    (r) => !r.secret && progress.checked[r.id]
  ).length;
  const complete = total > 0 && checked === total;

  return (
    <section
      id={phase.id}
      aria-label={`Phase ${phase.index}: ${phase.region}`}
      className={`relative ${className ?? ""}`}
      data-locked={!unlocked}
      data-complete={complete}
    >
      <header className="mb-4">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-faded-red">
          Phase {phase.index}
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
          {phase.region}
        </h2>
        <p className="font-body italic text-ink-soft mt-1">{phase.tagline}</p>
      </header>
      {illustration && <div className="mb-4">{illustration}</div>}
      <p className="font-body text-ink-soft max-w-prose mb-6">{phase.blurb}</p>
      <div
        className={
          layout === "horizontal"
            ? "flex flex-wrap items-start gap-x-4 gap-y-6"
            : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6"
        }
      >
        {phase.resources.map((r) => (
          <CheckpointIcon
            key={r.id}
            id={r.id}
            title={r.title}
            url={r.url}
            kind={r.kind}
            secret={r.secret}
          />
        ))}
      </div>
      <footer className="mt-4 font-body text-xs text-ink-faded">
        {checked} of {total} checkpoints stamped
        {complete && (
          <span className="ml-2 text-gold font-display tracking-widest uppercase">
            region complete
          </span>
        )}
      </footer>
    </section>
  );
}
