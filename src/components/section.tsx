import type { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, children, className }: Props) {
  return (
    <section
      id={id}
      className={`relative px-6 py-12 md:px-12 md:py-16 ${className ?? ""}`}
    >
      {(eyebrow || title) && (
        <header className="mb-8">
          {eyebrow && (
            <p className="font-display uppercase tracking-[0.4em] text-xs text-faded-red mb-2">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-display text-3xl md:text-4xl text-ink">
              {title}
            </h2>
          )}
        </header>
      )}
      <div>{children}</div>
    </section>
  );
}
