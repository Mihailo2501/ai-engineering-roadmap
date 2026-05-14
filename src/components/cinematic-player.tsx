import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  markCinematicPlayed,
  markIntroSeen,
  useProgress,
} from "../lib/progress";
import { phases } from "../data/roadmap";

type Trigger =
  | { kind: "intro" }
  | { kind: "phase"; phaseIndex: number; region: string }
  | { kind: "capstone" };

function srcFor(t: Trigger): string {
  switch (t.kind) {
    case "intro":
      return "./cinematics/intro-reel.mp4";
    case "phase":
      return `./cinematics/phase-${t.phaseIndex}-completion.mp4`;
    case "capstone":
      return "./cinematics/capstone-reveal.mp4";
  }
}

function keyFor(t: Trigger): string {
  switch (t.kind) {
    case "intro":
      return "intro";
    case "phase":
      return `phase-${t.phaseIndex}`;
    case "capstone":
      return "capstone";
  }
}

function titleFor(t: Trigger): string {
  switch (t.kind) {
    case "intro":
      return "Welcome, cartographer.";
    case "phase":
      return `${t.region} charted.`;
    case "capstone":
      return "The voyage is complete.";
  }
}

export function CinematicPlayer() {
  const progress = useProgress();
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [queue, setQueue] = useState<Trigger[]>([]);
  const [active, setActive] = useState<Trigger | null>(null);
  const prevCompleteRef = useRef<Set<number> | null>(null);
  const prevAllCompleteRef = useRef<boolean | null>(null);

  const phaseComplete = useMemo(() => {
    const set = new Set<number>();
    for (const phase of phases) {
      const total = phase.resources.filter((r) => !r.secret).length;
      const done = phase.resources.filter(
        (r) => !r.secret && progress.checked[r.id]
      ).length;
      if (total > 0 && done === total) set.add(phase.index);
    }
    return set;
  }, [progress.checked]);

  const allComplete = phaseComplete.size === phases.length;

  useEffect(() => {
    if (!progress.introSeen && !progress.cinematicsPlayed["intro"]) {
      setQueue((q) =>
        q.find((x) => x.kind === "intro") ? q : [...q, { kind: "intro" }]
      );
    }
  }, [progress.introSeen, progress.cinematicsPlayed]);

  useEffect(() => {
    if (prevCompleteRef.current === null) {
      prevCompleteRef.current = new Set(phaseComplete);
      return;
    }
    const newly: Trigger[] = [];
    for (const idx of phaseComplete) {
      if (!prevCompleteRef.current.has(idx)) {
        if (!progress.cinematicsPlayed[`phase-${idx}`]) {
          const phase = phases.find((p) => p.index === idx);
          if (phase) {
            newly.push({ kind: "phase", phaseIndex: idx, region: phase.region });
          }
        }
      }
    }
    prevCompleteRef.current = new Set(phaseComplete);
    if (newly.length > 0) {
      setQueue((q) => [...q, ...newly]);
    }
  }, [phaseComplete, progress.cinematicsPlayed]);

  useEffect(() => {
    if (prevAllCompleteRef.current === null) {
      prevAllCompleteRef.current = allComplete;
      return;
    }
    if (allComplete && !prevAllCompleteRef.current) {
      if (!progress.cinematicsPlayed["capstone"]) {
        setQueue((q) => [...q, { kind: "capstone" }]);
      }
    }
    prevAllCompleteRef.current = allComplete;
  }, [allComplete, progress.cinematicsPlayed]);

  useEffect(() => {
    if (!active && queue.length > 0) {
      setActive(queue[0]);
      setQueue((q) => q.slice(1));
    }
  }, [active, queue]);

  useEffect(() => {
    if (!active) return;
    const k = keyFor(active);
    markCinematicPlayed(k);
    if (active.kind === "intro") markIntroSeen();
  }, [active]);

  function dismiss() {
    setActive(null);
  }

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={keyFor(active)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.001 : 0.3 }}
        >
          <button
            type="button"
            aria-label="skip »"
            onClick={dismiss}
            className="absolute top-6 right-6 font-display text-xs tracking-[0.4em] uppercase text-parchment hover:text-gold-bright transition-colors"
          >
            skip &raquo;
          </button>
          <div className="w-full max-w-5xl px-4">
            <p className="font-display text-xs tracking-[0.4em] uppercase text-gold-bright mb-2">
              {active.kind === "intro" && "INTRO REEL"}
              {active.kind === "phase" && `PHASE ${active.phaseIndex}`}
              {active.kind === "capstone" && "CAPSTONE REVEAL"}
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-parchment mb-4">
              {titleFor(active)}
            </h2>
            <div className="relative bg-ink border-2 border-parchment/30 shadow-2xl rounded-sm overflow-hidden">
              <video
                ref={videoRef}
                src={srcFor(active)}
                autoPlay
                playsInline
                controls
                onEnded={dismiss}
                className="w-full h-auto block"
              />
            </div>
            {active.kind === "capstone" && (
              <a
                href={srcFor(active)}
                download="ai-engineering-roadmap-capstone.mp4"
                className="inline-block mt-4 font-display text-xs tracking-[0.3em] uppercase text-gold-bright hover:text-parchment transition-colors"
              >
                download capstone reel
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
