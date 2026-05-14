import { useMemo } from "react";
import { phases, totalCheckpoints, type Phase, type Resource } from "./data/roadmap";
import {
  isCheckpointChecked,
  toggleCheckpoint,
  useProgress,
} from "./lib/progress";

export default function App() {
  const progress = useProgress();
  const total = useMemo(() => totalCheckpoints(), []);
  const done = Object.keys(progress.checked).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            Personal study tracker
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            AI Engineering Roadmap
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600">
            Seven phases from re-reading the fundamentals to shipping an eval-gated agent on managed infrastructure. Check resources off as you finish them. Progress saves locally.
          </p>
          <div className="mt-6">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-slate-700">
                Overall progress
              </span>
              <span className="text-sm font-semibold tabular-nums text-slate-900">
                {done} of {total} done <span className="text-slate-500">({pct}%)</span>
              </span>
            </div>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200"
              role="progressbar"
              aria-valuenow={done}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-label="Overall roadmap progress"
            >
              <div
                className="h-full rounded-full bg-emerald-500 transition-[width] duration-300 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="space-y-12">
          {phases.map((phase) => (
            <PhaseSection key={phase.id} phase={phase} />
          ))}
        </div>
        <footer className="mt-16 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <p>
            A personal artifact. Companion study notes live in a separate scratchpad project. Source on{" "}
            <a
              href="https://github.com/Mihailo2501/ai-engineering-roadmap"
              className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-slate-900 hover:decoration-slate-500"
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </a>
            .
          </p>
        </footer>
      </main>
    </div>
  );
}

function PhaseSection({ phase }: { phase: Phase }) {
  const total = phase.resources.length;
  const done = phase.resources.reduce(
    (sum, r) => (isCheckpointChecked(r.id) ? sum + 1 : sum),
    0
  );
  const complete = done === total && total > 0;

  return (
    <section
      aria-labelledby={`phase-${phase.id}`}
      className="scroll-mt-8"
      id={phase.id}
    >
      <header className="mb-4 flex flex-col gap-1 sm:mb-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Phase {phase.index}
          </p>
          <h2
            id={`phase-${phase.id}`}
            className="mt-1 text-2xl font-semibold tracking-tight text-slate-900"
          >
            {phase.region}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">{phase.blurb}</p>
        </div>
        <span
          className={
            "shrink-0 rounded-full px-3 py-1 text-xs font-semibold tabular-nums " +
            (complete
              ? "bg-emerald-100 text-emerald-800"
              : "bg-slate-100 text-slate-700")
          }
        >
          {done} of {total} done
        </span>
      </header>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {phase.resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  const progress = useProgress();
  const checked = !!progress.checked[resource.id];

  return (
    <article
      className={
        "group flex h-full flex-col rounded-xl border bg-white p-5 shadow-sm transition-colors duration-150 " +
        (checked
          ? "border-emerald-200 bg-emerald-50/40"
          : "border-slate-200 hover:border-slate-300")
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
            {resource.source}
          </p>
          <h3
            className={
              "mt-1 text-base font-semibold leading-snug " +
              (checked ? "text-slate-700" : "text-slate-900")
            }
          >
            {resource.title}
          </h3>
        </div>
        <label className="flex shrink-0 cursor-pointer select-none items-center gap-2">
          <input
            type="checkbox"
            className="size-5 cursor-pointer rounded border-slate-300 text-emerald-600 transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            checked={checked}
            onChange={() => toggleCheckpoint(resource.id)}
            aria-label={`Mark ${resource.title} ${checked ? "incomplete" : "complete"}`}
          />
          <span className="sr-only">Toggle complete</span>
        </label>
      </div>

      {resource.note ? (
        <p className="mt-3 text-sm text-slate-600">{resource.note}</p>
      ) : null}

      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
          <ClockIcon />
          {resource.est}
        </span>
        {resource.url ? (
          <a
            href={resource.url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
          >
            Open
            <ExternalIcon />
          </a>
        ) : (
          <span className="text-xs italic text-slate-500">No link</span>
        )}
      </div>
    </article>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden="true"
      className="text-slate-500"
    >
      <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M8 4.75v3.5l2.25 1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      aria-hidden="true"
    >
      <path
        d="M6 3h7v7M13 3 7.5 8.5M11.5 9.5V13H3V4.5h3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
