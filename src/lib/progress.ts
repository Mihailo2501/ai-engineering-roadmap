import { useSyncExternalStore } from "react";

const KEY = "aer:progress:v1";

export type CheckpointRecord = {
  at: number;
  reflection?: string;
};

export type ProgressState = {
  checked: Record<string, CheckpointRecord>;
  audio: boolean;
  cinematicsPlayed: Record<string, number>;
  introSeen: boolean;
  voyageLogOpen: boolean;
};

const empty: ProgressState = {
  checked: {},
  audio: false,
  cinematicsPlayed: {},
  introSeen: false,
  voyageLogOpen: false,
};

function read(): ProgressState {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      checked: parsed.checked ?? {},
      audio: !!parsed.audio,
      cinematicsPlayed: parsed.cinematicsPlayed ?? {},
      introSeen: !!parsed.introSeen,
      voyageLogOpen: !!parsed.voyageLogOpen,
    };
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
  const next: ProgressState = { ...cache, checked: { ...cache.checked } };
  if (next.checked[id]) {
    delete next.checked[id];
  } else {
    next.checked[id] = { at: Date.now() };
  }
  persist(next);
}

export function setReflection(id: string, reflection: string) {
  if (!cache.checked[id]) return;
  const next: ProgressState = {
    ...cache,
    checked: {
      ...cache.checked,
      [id]: { ...cache.checked[id], reflection: reflection.trim() || undefined },
    },
  };
  persist(next);
}

export function setAudio(on: boolean) {
  persist({ ...cache, audio: on });
}

export function setVoyageLogOpen(open: boolean) {
  persist({ ...cache, voyageLogOpen: open });
}

export function markCinematicPlayed(id: string) {
  persist({
    ...cache,
    cinematicsPlayed: { ...cache.cinematicsPlayed, [id]: Date.now() },
  });
}

export function markIntroSeen() {
  if (cache.introSeen) return;
  persist({ ...cache, introSeen: true });
}

export function isCheckpointChecked(id: string): boolean {
  return !!cache.checked[id];
}

export function getCheckedCount(): number {
  return Object.keys(cache.checked).length;
}

export function getRecentCheckpoints(limit = 12) {
  return Object.entries(cache.checked)
    .map(([id, rec]) => ({ id, ...rec }))
    .sort((a, b) => b.at - a.at)
    .slice(0, limit);
}

export function getLastCheckpointId(): string | null {
  let bestId: string | null = null;
  let bestAt = 0;
  for (const [id, rec] of Object.entries(cache.checked)) {
    if (rec.at > bestAt) {
      bestAt = rec.at;
      bestId = id;
    }
  }
  return bestId;
}

export function resetAllProgress() {
  persist(empty);
}
