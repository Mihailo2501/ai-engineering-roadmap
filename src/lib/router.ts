import { useSyncExternalStore } from "react";

export type Route = "/" | "/glossary" | "/study";

const VALID_ROUTES: Route[] = ["/", "/glossary", "/study"];

function read(): Route {
  if (typeof window === "undefined") return "/";
  const h = window.location.hash;
  if (!h || h === "#") return "/";
  if (h.startsWith("#/")) {
    const candidate = h.slice(1);
    return (VALID_ROUTES as string[]).includes(candidate)
      ? (candidate as Route)
      : "/";
  }
  return "/";
}

const listeners = new Set<() => void>();
let cache: Route = read();

if (typeof window !== "undefined") {
  window.addEventListener("hashchange", () => {
    cache = read();
    for (const l of listeners) l();
  });
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function getSnapshot(): Route {
  return cache;
}

export function useHashRoute(): Route {
  return useSyncExternalStore(subscribe, getSnapshot, () => "/");
}
