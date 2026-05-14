import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { regions, MAP_WIDTH, MAP_HEIGHT } from "../data/map-layout";
import type { Phase } from "../data/roadmap";

type Props = {
  phases: Phase[];
  isUnlocked: (idx: number) => boolean;
};

export function FogOfWar({ phases, isUnlocked }: Props) {
  const reduced = useReducedMotion();
  const locked = phases.filter((p) => !isUnlocked(p.index));

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      aria-hidden
    >
      <defs>
        <radialGradient id="fogGrad" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#f4ead3" stopOpacity="0.95" />
          <stop offset="65%" stopColor="#e7d6ad" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#c9b489" stopOpacity="0.0" />
        </radialGradient>
        <filter id="fogBlur">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <AnimatePresence>
        {locked.map((phase) => {
          const r = regions.find((x) => x.phaseId === phase.id);
          if (!r) return null;
          const w = r.illustrationWidth + 220;
          const h = r.illustrationHeight + 280;
          return (
            <motion.g
              key={phase.id}
              initial={{ opacity: 0.0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ originX: `${r.cx}px`, originY: `${r.cy}px` }}
            >
              <ellipse
                cx={r.cx}
                cy={r.cy}
                rx={w / 2}
                ry={h / 2}
                fill="url(#fogGrad)"
                filter="url(#fogBlur)"
              />
              {!reduced && (
                <motion.ellipse
                  cx={r.cx}
                  cy={r.cy - 20}
                  rx={w / 2.4}
                  ry={h / 3}
                  fill="#f4ead3"
                  fillOpacity="0.55"
                  filter="url(#fogBlur)"
                  animate={{ cx: [r.cx - 20, r.cx + 20, r.cx - 20] }}
                  transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <text
                x={r.cx}
                y={r.cy}
                textAnchor="middle"
                fontFamily="Cinzel, serif"
                fontSize="14"
                letterSpacing="6"
                fill="#1c1610"
                opacity="0.55"
                fontStyle="italic"
              >
                terra incognita
              </text>
              <text
                x={r.cx}
                y={r.cy + 22}
                textAnchor="middle"
                fontFamily="Source Serif 4, serif"
                fontSize="11"
                fill="#1c1610"
                opacity="0.45"
              >
                chart previous waters first
              </text>
            </motion.g>
          );
        })}
      </AnimatePresence>
    </svg>
  );
}
