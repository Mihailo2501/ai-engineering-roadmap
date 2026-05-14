import { motion, useReducedMotion } from "framer-motion";
import { MAP_WIDTH, MAP_HEIGHT, regions } from "../data/map-layout";
import { phases } from "../data/roadmap";
import { useProgress, getLastCheckpointId } from "../lib/progress";

export function AmbientFlourishes() {
  const reduced = useReducedMotion();
  const progress = useProgress();

  const workshopCenter = regions.find((r) => r.phaseId === "the-workshop");
  const summit = regions.find((r) => r.phaseId === "the-summit");

  const lastId = getLastCheckpointId();
  let hereCoord: { x: number; y: number } | null = null;
  if (lastId) {
    for (const phase of phases) {
      const idx = phase.resources.findIndex((r) => r.id === lastId);
      if (idx === -1) continue;
      const region = regions.find((r) => r.phaseId === phase.id);
      if (!region) break;
      const offset = region.checkpointOffsets[idx];
      if (!offset) break;
      hereCoord = {
        x: region.cx + offset.x,
        y: region.cy + offset.y,
      };
      break;
    }
  }
  void progress;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      aria-hidden
    >
      {workshopCenter && !reduced && (
        <g
          transform={`translate(${workshopCenter.cx}, ${workshopCenter.cy - 80})`}
        >
          {[0, 1, 2].map((i) => (
            <motion.ellipse
              key={i}
              cx={0}
              cy={-i * 24}
              rx={12 + i * 4}
              ry={5 + i * 2}
              fill="#f4ead3"
              opacity={0.7 - i * 0.18}
              initial={{ x: -6, y: 12, opacity: 0 }}
              animate={{
                x: [-6, 6, -2],
                y: [12, -10 - i * 6, -36 - i * 10],
                opacity: [0, 0.7 - i * 0.18, 0],
              }}
              transition={{
                duration: 6 + i * 1.4,
                repeat: Infinity,
                delay: i * 1.2,
                ease: "easeOut",
              }}
            />
          ))}
        </g>
      )}

      {!reduced && (
        <g transform={`translate(${MAP_WIDTH - 240}, ${MAP_HEIGHT - 140})`}>
          <motion.g
            initial={{ opacity: 0.55 }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M0 0 q 14 -14 28 0 q 4 -16 18 -2 q 6 -14 18 4"
              fill="none"
              stroke="#1c1610"
              strokeWidth="1.1"
              strokeLinecap="round"
              opacity="0.75"
            />
            <circle cx="6" cy="-2" r="0.9" fill="#1c1610" />
            <circle cx="20" cy="-6" r="0.9" fill="#1c1610" />
            <motion.circle
              cx="34"
              cy="-6"
              r="1.4"
              fill="#a73a26"
              animate={{ opacity: [1, 0, 1, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.04, 0.08, 1] }}
            />
            <path
              d="M50 4 q 8 8 0 16 q -10 6 -16 -4"
              fill="none"
              stroke="#1c1610"
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0.65"
            />
            <text
              x="20"
              y="22"
              fontFamily="Cinzel, serif"
              fontSize="6"
              letterSpacing="3"
              fill="#1c1610"
              opacity="0.5"
              fontStyle="italic"
            >
              hic sunt agentes
            </text>
          </motion.g>
        </g>
      )}

      {summit && !reduced && (
        <g transform={`translate(${summit.cx}, ${summit.cy - 70})`}>
          <motion.g
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle r="36" fill="#ecc25a" opacity="0.2" />
          </motion.g>
        </g>
      )}

      {hereCoord && !reduced && (
        <g transform={`translate(${hereCoord.x}, ${hereCoord.y})`}>
          <motion.circle
            r="28"
            fill="none"
            stroke="#a73a26"
            strokeWidth="1.2"
            opacity="0.7"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.2, 0.6], opacity: [0, 0.65, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle
            r="40"
            fill="none"
            stroke="#a73a26"
            strokeWidth="0.8"
            opacity="0.4"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [0.7, 1.3, 0.7], opacity: [0, 0.4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          />
          <text
            x="0"
            y="-46"
            textAnchor="middle"
            fontFamily="Cinzel, serif"
            fontSize="10"
            letterSpacing="3"
            fill="#a73a26"
            fontStyle="italic"
            opacity="0.85"
          >
            you are here
          </text>
        </g>
      )}

      {!reduced &&
        regions.map((r, idx) => {
          if (idx === regions.length - 1) return null;
          const next = regions[idx + 1];
          const phase = phases[idx];
          const nextPhase = phases[idx + 1];
          if (!phase || !nextPhase) return null;
          const prevDone =
            phase.resources.filter((res) => !res.secret).length > 0 &&
            phase.resources.every(
              (res) => res.secret || progress.checked[res.id]
            );
          if (!prevDone) return null;
          const mx = (r.cx + next.cx) / 2;
          const my = (r.cy + next.cy) / 2 + 40 * (idx % 2 === 0 ? 1 : -1);
          return (
            <motion.path
              key={`gold-${r.phaseId}`}
              d={`M ${r.cx} ${r.cy} Q ${mx} ${my} ${next.cx} ${next.cy}`}
              fill="none"
              stroke="#ecc25a"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.6 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              style={{ mixBlendMode: "multiply" }}
            />
          );
        })}
    </svg>
  );
}
