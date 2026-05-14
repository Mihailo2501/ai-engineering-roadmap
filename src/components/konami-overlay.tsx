import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { phases } from "../data/roadmap";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

type Props = {
  onActivate: () => void;
};

export function KonamiOverlay({ onActivate }: Props) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let index = 0;
    function onKey(e: KeyboardEvent) {
      const expected = SEQUENCE[index];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expected) {
        index += 1;
        setProgress(index);
        if (index === SEQUENCE.length) {
          setOpen(true);
          onActivate();
          index = 0;
          setProgress(0);
        }
      } else if (key === SEQUENCE[0]) {
        index = 1;
        setProgress(1);
      } else {
        index = 0;
        setProgress(0);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onActivate]);

  function fastTravel(phaseId: string) {
    const el = document.getElementById(phaseId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    setOpen(false);
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-md px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.001 : 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0"
              aria-label="Close fast travel"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Fast travel"
              className="relative bg-parchment border-2 border-ink rounded-sm shadow-2xl p-8 max-w-xl w-full font-body text-ink"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, rotate: -0.6 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
            >
              <p className="font-display text-xs tracking-[0.4em] uppercase text-faded-red mb-2">
                Konami code accepted
              </p>
              <h2 className="font-display text-3xl text-ink mb-2">
                Fast travel
              </h2>
              <p className="font-body italic text-ink-soft mb-4">
                A cartographer's shortcut. Press a number to jump to that
                region. The secret cache, if any, is now revealed.
              </p>
              <ul className="space-y-2">
                {phases.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => fastTravel(p.id)}
                      className="w-full text-left flex items-center justify-between border-b border-ink/10 py-2 hover:bg-gold-pale transition-colors"
                    >
                      <span className="font-display text-base tracking-wider text-ink">
                        Phase {p.index} &middot; {p.region}
                      </span>
                      <kbd className="font-display text-sm tracking-[0.3em] uppercase text-faded-red border border-ink/30 rounded-sm px-2 py-0.5">
                        {p.index}
                      </kbd>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 font-body text-xs text-ink-faded italic">
                bonus: a hidden marker pulses near the observatory. it does not
                appear on normal voyages.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {progress > 0 && progress < SEQUENCE.length && (
        <div
          className="fixed bottom-4 right-1/2 translate-x-1/2 font-display text-xs tracking-[0.4em] uppercase text-faded-red bg-parchment/90 border border-ink/30 rounded-sm px-3 py-1.5 z-40"
          aria-live="polite"
        >
          {progress}/{SEQUENCE.length}
        </div>
      )}
    </>
  );
}

export function useKeyboardFastTravel() {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const n = Number.parseInt(e.key, 10);
      if (!Number.isNaN(n) && n >= 0 && n <= 6) {
        const phase = phases.find((p) => p.index === n);
        if (!phase) return;
        const el = document.getElementById(phase.id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
