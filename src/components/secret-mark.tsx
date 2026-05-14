import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useProgress, toggleCheckpoint } from "../lib/progress";
import { playSfx } from "../lib/audio";
import { regions } from "../data/map-layout";

const SECRET_ID = "p6-secret-cache";

export function SecretMark({ revealed }: { revealed: boolean }) {
  const progress = useProgress();
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const found = !!progress.checked[SECRET_ID];
  const observatory = regions.find((r) => r.phaseId === "the-observatory");
  if (!observatory) return null;
  const x = observatory.cx + 130;
  const y = observatory.cy - 220;

  function discover() {
    if (!found) {
      playSfx("seal");
      toggleCheckpoint(SECRET_ID);
    }
  }

  return (
    <g transform={`translate(${x}, ${y})`}>
      {found ? (
        <motion.g
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
        >
          <circle r="20" fill="#ecc25a" stroke="#1c1610" strokeWidth="1.4" />
          <text
            y="4"
            textAnchor="middle"
            fontFamily="Cinzel, serif"
            fontSize="14"
            fill="#1c1610"
            letterSpacing="2"
          >
            X
          </text>
          <text
            y="40"
            textAnchor="middle"
            fontFamily="Cinzel, serif"
            fontSize="8"
            letterSpacing="3"
            fill="#1c1610"
            fontStyle="italic"
            opacity="0.7"
          >
            cartographer's secret cache
          </text>
        </motion.g>
      ) : (
        <g
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={discover}
          style={{ cursor: "pointer", pointerEvents: "all" }}
        >
          <circle
            r="22"
            fill="transparent"
            stroke={revealed || hovered ? "#a73a26" : "transparent"}
            strokeWidth="1.4"
            strokeDasharray="3 4"
            opacity={revealed ? 0.9 : hovered ? 0.6 : 0}
          />
          {!reduced && (revealed || hovered) && (
            <motion.circle
              r="28"
              fill="none"
              stroke="#a73a26"
              strokeWidth="0.8"
              opacity="0.5"
              animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          {(revealed || hovered) && (
            <text
              y="-30"
              textAnchor="middle"
              fontFamily="Cinzel, serif"
              fontSize="8"
              letterSpacing="3"
              fill="#a73a26"
              fontStyle="italic"
              opacity="0.85"
            >
              something hidden here
            </text>
          )}
        </g>
      )}
    </g>
  );
}
