import { PageHero } from "../components/PageHero";
import { glossary } from "../data/glossary";

export function GlossaryPage() {
  return (
    <>
      <PageHero
        eyebrow="Reference"
        title="Glossary"
        intro="Short definitions for the unusual terms surfaced across the roadmap. Phase badges point to where each concept first shows up."
      />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="mb-6 text-sm text-slate-500">
          {glossary.length} terms, alphabetized.
        </p>
        <dl className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm">
          {glossary.map((entry) => (
            <div
              key={entry.term}
              className="grid gap-2 px-5 py-5 sm:grid-cols-[220px_1fr] sm:gap-6 sm:px-6"
            >
              <dt className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-base font-semibold text-slate-900">
                  {entry.term}
                </span>
                {entry.phase !== undefined ? (
                  <span className="inline-flex shrink-0 items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                    Phase {entry.phase}
                  </span>
                ) : null}
              </dt>
              <dd className="text-sm leading-relaxed text-slate-700">
                {entry.def}
              </dd>
            </div>
          ))}
        </dl>
        <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <p>
            Missing a term?{" "}
            <a
              href="https://github.com/Mihailo2501/ai-engineering-roadmap"
              className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-slate-900 hover:decoration-slate-500"
              target="_blank"
              rel="noreferrer noopener"
            >
              Open an issue on GitHub
            </a>
            .
          </p>
        </footer>
      </main>
    </>
  );
}
