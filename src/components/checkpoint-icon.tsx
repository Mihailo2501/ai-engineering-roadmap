import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { toggleCheckpoint, useProgress } from "../lib/progress";
import { playSfx } from "../lib/audio";

type Props = {
  id: string;
  title: string;
  url?: string;
  kind?: string;
  size?: number;
  secret?: boolean;
};

export function CheckpointIcon({
  id,
  title,
  url,
  kind,
  size = 56,
  secret = false,
}: Props) {
  const progress = useProgress();
  const checked = !!progress.checked[id];
  const [splatterKey, setSplatterKey] = useState(0);
  const reduced = useReducedMotion();

  function handleToggle() {
    const wasChecked = checked;
    toggleCheckpoint(id);
    setSplatterKey((k) => k + 1);
    if (!wasChecked) {
      playSfx("stamp");
    } else {
      playSfx("page");
    }
  }

  function openResource(e: React.MouseEvent) {
    if (!url) return;
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      className="relative inline-flex flex-col items-center group"
      style={{ width: size * 1.6 }}
    >
      <button
        type="button"
        aria-label={`${checked ? "Uncheck" : "Check"} ${title}`}
        aria-pressed={checked}
        onClick={handleToggle}
        className="relative outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-parchment rounded-full"
        style={{ width: size, height: size }}
      >
        <motion.svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          initial={false}
          animate={
            reduced
              ? {}
              : {
                  scale: checked ? [1, 0.85, 1.05, 1] : 1,
                  rotate: checked ? [0, -6, 4, 0] : 0,
                }
          }
          transition={{ duration: 0.55, ease: "easeOut" }}
          whileHover={reduced ? {} : { y: -3, rotate: -2 }}
          whileTap={reduced ? {} : { scale: 0.92 }}
        >
          <defs>
            <radialGradient id={`wax-${id}`} cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#d6553f" />
              <stop offset="60%" stopColor="#a73a26" />
              <stop offset="100%" stopColor="#7a2818" />
            </radialGradient>
            <radialGradient id={`gold-${id}`} cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f4dca0" />
              <stop offset="55%" stopColor="#ecc25a" />
              <stop offset="100%" stopColor="#a87918" />
            </radialGradient>
          </defs>
          <g>
            <circle
              cx="32"
              cy="32"
              r="26"
              fill={checked ? `url(#gold-${id})` : `url(#wax-${id})`}
              stroke="#1c1610"
              strokeWidth="1.4"
              opacity={secret && !checked ? 0.25 : 1}
            />
            <circle
              cx="32"
              cy="32"
              r="20"
              fill="none"
              stroke="#1c1610"
              strokeWidth="0.8"
              strokeDasharray={checked ? "0" : "2 3"}
              opacity="0.55"
            />
            {checked ? (
              <g>
                <path
                  d="M22 33 L29 40 L43 24"
                  fill="none"
                  stroke="#1c1610"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="32"
                  y="52"
                  textAnchor="middle"
                  fontSize="6"
                  fontFamily="Cinzel, serif"
                  letterSpacing="1"
                  fill="#1c1610"
                  opacity="0.5"
                >
                  SEEN
                </text>
              </g>
            ) : (
              <g
                fontFamily="Cinzel, serif"
                fill="#1c1610"
                opacity={secret ? 0.2 : 0.7}
              >
                <text
                  x="32"
                  y="36"
                  textAnchor="middle"
                  fontSize="14"
                  letterSpacing="1"
                >
                  &#10059;
                </text>
              </g>
            )}
          </g>
        </motion.svg>
        <AnimatePresence>
          {checked && !reduced && (
            <motion.svg
              key={splatterKey}
              viewBox="-20 -20 100 100"
              className="pointer-events-none absolute inset-0"
              style={{ width: size * 1.6, height: size * 1.6, left: -size * 0.3, top: -size * 0.3 }}
              initial={{ opacity: 0.85, scale: 0.6 }}
              animate={{ opacity: 0, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <g fill="#1c1610">
                <circle cx="6" cy="14" r="1.6" />
                <circle cx="58" cy="20" r="2" />
                <circle cx="14" cy="56" r="1.2" />
                <circle cx="56" cy="48" r="1.4" />
                <circle cx="-4" cy="32" r="1" />
                <circle cx="68" cy="34" r="0.9" />
                <circle cx="32" cy="-2" r="1.2" />
                <circle cx="30" cy="66" r="1.1" />
              </g>
            </motion.svg>
          )}
        </AnimatePresence>
      </button>
      <div
        className={`mt-2 px-1 text-center text-[11px] md:text-xs font-body leading-tight transition-opacity ${
          secret && !checked ? "opacity-30" : "opacity-100"
        } ${checked ? "text-ink" : "text-ink-faded"}`}
      >
        {secret && !checked ? "???" : title}
      </div>
      {url && (
        <button
          type="button"
          onClick={openResource}
          aria-label={`Open resource: ${title}`}
          className="mt-1 text-[10px] font-display tracking-widest uppercase text-faded-red hover:text-gold underline-offset-2 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
        >
          open {kind ?? "link"}
        </button>
      )}
    </div>
  );
}
