import { PageHero } from "../components/PageHero";

export function StudyWorkflowPage() {
  return (
    <>
      <PageHero
        eyebrow="How I work through this"
        title="Study workflow"
        intro="The site tracks completion. The actual notes, summaries, and code experiments live in a separate scratchpad project. This page is the missing manual."
      />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <article className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Two projects, separate concerns
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              This site (Project 14) is a tracker. The only thing it stores is
              which resources are checked off. It has no notes field, no
              reflections, no transcripts. That is on purpose.
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              The actual studying happens in a second local project: Project 15
              — AI Engineering Study. That project is a markdown scratchpad
              organized by phase. Notes can be as long, messy, or unfinished
              as they need to be without polluting the tracker.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Tile
                label="Project 14"
                title="This site"
                sub="Tracker. One checkbox per resource. Lives in your browser."
              />
              <Tile
                label="Project 15"
                title="Study scratchpad"
                sub="Notes. One markdown file per resource. Lives on your machine."
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Where to open Claude Code sessions
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Always open Claude Code from inside the Project 15 directory, not
              this one. Project 14 is the artifact; Project 15 is the
              workspace.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-900 px-4 py-3 text-sm text-slate-100">
              <code>cd "Projects/Project 15 - AI Engineering Study/"{"\n"}claude</code>
            </pre>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              That way every session has the study notes as its working
              directory and Claude can read, edit, and create markdown files
              alongside whatever code experiment you are running.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              How to name sessions
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Use the <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.9em] text-slate-800">/rename</code>{" "}
              slash command with this pattern, so old sessions are easy to find
              later:
            </p>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-900 px-4 py-3 text-sm text-slate-100">
              <code>/rename p&lt;phase&gt;-&lt;topic-slug&gt;</code>
            </pre>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Examples:
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
              <li>
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-800">/rename p1-building-effective-agents</code>
              </li>
              <li>
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-800">/rename p2-mcp-deep-dive</code>
              </li>
              <li>
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-800">/rename p3-stagehand</code>
              </li>
              <li>
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-800">/rename p5-hamel-evals</code>
              </li>
            </ul>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              The phase number matches a section on the roadmap. The topic slug
              is short, kebab-case, and points at the resource. Two-word slugs
              are fine; three-word slugs are usually too long.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Where notes go inside Project 15
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              One folder per resource, sitting inside a phase folder that
              mirrors the roadmap section. The canonical note file inside is
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.9em] text-slate-800"> notes.md</code>.
              Any extra artifacts (PDFs, code experiments, screenshots,
              transcripts) live in the same resource folder so the scratchpad
              for one card stays self-contained.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-900 px-4 py-3 text-sm text-slate-100">
              <code>
{`Project 15 - AI Engineering Study/
  notes/
    phase-0-foundation/
      m01-05/
        notes.md
      m06-10/
        notes.md
    phase-1-canon/
      building-effective-agents/
        notes.md
        printable-version.pdf
      12-factor-agents/
        notes.md
      swe-bench/
        notes.md
        example-trace.json
    phase-2-mcp/
      claude-code-101/
        notes.md
      ...`}
              </code>
            </pre>
            <p className="mt-3 text-base leading-relaxed text-slate-700">
              Folder names are kebab-case and match the resource. The phase
              folder is the natural Claude Code working directory: open it as
              the session root and the resource subfolders are one
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.9em] text-slate-800"> cd</code> away.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              The loop
            </h2>
            <ol className="mt-3 space-y-3 text-base leading-relaxed text-slate-700">
              <li>
                <span className="font-semibold text-slate-900">1.</span> Pick a
                resource on the{" "}
                <a
                  href="#/"
                  className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 hover:text-slate-900 hover:decoration-slate-500"
                >
                  roadmap
                </a>
                .
              </li>
              <li>
                <span className="font-semibold text-slate-900">2.</span> Open
                Claude Code in Project 15 and rename the session with the
                pattern above.
              </li>
              <li>
                <span className="font-semibold text-slate-900">3.</span> Work
                through the resource. Capture notes in the matching markdown
                file as you go.
              </li>
              <li>
                <span className="font-semibold text-slate-900">4.</span> When
                you are done, come back here and check the box.
              </li>
            </ol>
          </section>
        </article>

        <footer className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <p>
            Back to the{" "}
            <a
              href="#/"
              className="font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-slate-900 hover:decoration-slate-500"
            >
              roadmap
            </a>
            .
          </p>
        </footer>
      </main>
    </>
  );
}

function Tile({
  label,
  title,
  sub,
}: {
  label: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-base font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{sub}</p>
    </div>
  );
}
