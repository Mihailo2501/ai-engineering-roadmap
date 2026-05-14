import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-2 max-w-2xl text-base text-slate-600">{intro}</p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
