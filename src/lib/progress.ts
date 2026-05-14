import { useSyncExternalStore } from "react";

const KEY = "aer:progress:v1";

export type CheckpointRecord = {
  at: number;
};

export type ProgressState = {
  checked: Record<string, CheckpointRecord>;
};

const empty: ProgressState = { checked: {} };

function read(): ProgressState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as { checked?: Record<string, CheckpointRecord> };
    return { checked: parsed.checked ?? {} };
  } catch (err) {
    console.error("[progress] failed to parse localStorage", err);
    return empty;
  }
}

let cache: ProgressState = read();
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function persist(next: ProgressState) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch (err) {
    console.error("[progress] failed to write localStorage", err);
  }
  emit();
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key !== KEY) return;
    cache = read();
    emit();
  });
}

export function getSnapshot(): ProgressState {
  return cache;
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, getSnapshot, () => empty);
}

export function toggleCheckpoint(id: string) {
  const next: ProgressState = { checked: { ...cache.checked } };
  if (next.checked[id]) {
    delete next.checked[id];
  } else {
    next.checked[id] = { at: Date.now() };
  }
  persist(next);
}

export function isCheckpointChecked(id: string): boolean {
  return !!cache.checked[id];
}

export function getCheckedCount(): number {
  return Object.keys(cache.checked).length;
}

export function resetAllProgress() {
  persist(empty);
}
