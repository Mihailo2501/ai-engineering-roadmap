import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { setAudio, useProgress } from "../lib/progress";
import { startAmbient, stopAmbient, playSfx } from "../lib/audio";

export function AudioToggle() {
  const progress = useProgress();
  const reduced = useReducedMotion();
  const on = progress.audio;

  useEffect(() => {
    if (on) startAmbient();
    else stopAmbient();
  }, [on]);

  function toggle() {
    const next = !on;
    setAudio(next);
    if (next) {
      startAmbient();
      playSfx("open");
    } else {
      stopAmbient();
    }
  }

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? "Audio on. Tap to mute." : "Audio off. Tap to enable."}
      onClick={toggle}
      className="bg-parchment/85 backdrop-blur-sm border border-ink/30 rounded-sm px-3 py-2 flex items-center gap-2 text-ink hover:bg-gold-pale transition-colors shadow-md"
    >
      <motion.svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        animate={reduced ? {} : { scale: on ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 1.4, repeat: on ? Infinity : 0 }}
      >
        <g stroke="#1c1610" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M3 9 L3 15 L8 15 L13 19 L13 5 L8 9 Z" fill="#1c1610" />
          {on ? (
            <g>
              <path d="M16 8 q 3 4 0 8" />
              <path d="M19 5 q 6 7 0 14" />
            </g>
          ) : (
            <g>
              <line x1="16" y1="8" x2="22" y2="16" />
              <line x1="22" y1="8" x2="16" y2="16" />
            </g>
          )}
        </g>
      </motion.svg>
      <span className="font-display text-[10px] tracking-[0.3em] uppercase">
        {on ? "audio on" : "audio off"}
      </span>
    </button>
  );
}
