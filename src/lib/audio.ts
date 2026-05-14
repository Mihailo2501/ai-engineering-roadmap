import { getSnapshot } from "./progress";

export type SfxName = "stamp" | "page" | "quill" | "open" | "close" | "seal";

const sources: Record<SfxName, string> = {
  stamp: "./sounds/sfx-stamp.mp3",
  page: "./sounds/sfx-page-turn.mp3",
  quill: "./sounds/sfx-quill-scratch.mp3",
  open: "./sounds/sfx-open.mp3",
  close: "./sounds/sfx-close.mp3",
  seal: "./sounds/sfx-wax-seal.mp3",
};

const cache = new Map<SfxName, HTMLAudioElement>();
let ambient: HTMLAudioElement | null = null;
let ambientStarted = false;

function get(name: SfxName): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  const existing = cache.get(name);
  if (existing) return existing;
  const a = new Audio(sources[name]);
  a.preload = "auto";
  a.volume = 0.4;
  cache.set(name, a);
  return a;
}

export function playSfx(name: SfxName, volume = 0.4) {
  if (typeof window === "undefined") return;
  const enabled = getSnapshot().audio;
  if (!enabled) return;
  const a = get(name);
  if (!a) return;
  try {
    const clone = a.cloneNode(true) as HTMLAudioElement;
    clone.volume = volume;
    void clone.play().catch(() => {});
  } catch (err) {
    console.warn("[audio] failed to play sfx", name, err);
  }
}

export function startAmbient(src = "./sounds/ambient-cartographer.mp3", volume = 0.18) {
  if (typeof window === "undefined") return;
  if (ambient && ambientStarted) return;
  if (!ambient) {
    ambient = new Audio(src);
    ambient.loop = true;
    ambient.volume = volume;
  }
  ambient.volume = volume;
  void ambient
    .play()
    .then(() => {
      ambientStarted = true;
    })
    .catch(() => {});
}

export function stopAmbient() {
  if (!ambient) return;
  ambient.pause();
  ambient.currentTime = 0;
  ambientStarted = false;
}

export function setAmbientVolume(v: number) {
  if (!ambient) return;
  ambient.volume = v;
}
