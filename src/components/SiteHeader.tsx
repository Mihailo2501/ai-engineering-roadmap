import { useHashRoute, type Route } from "../lib/router";

const links: { href: string; match: Route; label: string }[] = [
  { href: "#/", match: "/", label: "Roadmap" },
  { href: "#/glossary", match: "/glossary", label: "Glossary" },
  { href: "#/study", match: "/study", label: "Study workflow" },
];

export function SiteHeader() {
  const route = useHashRoute();
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6 sm:py-4">
        <a
          href="#/"
          className="text-sm font-semibold tracking-tight text-slate-900 transition-colors hover:text-slate-700"
        >
          AI Engineering Roadmap
        </a>
        <nav aria-label="Primary" className="-mx-1 flex items-center gap-1 text-sm">
          {links.map((link) => {
            const active = route === link.match;
            return (
              <a
                key={link.match}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={
                  "rounded-md px-3 py-1.5 font-medium transition-colors " +
                  (active
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900")
                }
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
