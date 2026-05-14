import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useProgress, getLastCheckpointId } from "../lib/progress";
import { phases } from "../data/roadmap";

function targetAngle(checkpointId: string | null): number {
  if (!checkpointId) return 0;
  for (let p = 0; p < phases.length; p++) {
    const phase = phases[p];
    const idx = phase.resources.findIndex((r) => r.id === checkpointId);
    if (idx >= 0) {
      const phaseFraction = p / Math.max(1, phases.length - 1);
      return -45 + phaseFraction * 90;
    }
  }
  return 0;
}

type Props = {
  size?: number;
  className?: string;
};

export function CompassNeedle({ size = 140, className }: Props) {
  const progress = useProgress();
  const reduced = useReducedMotion();
  const [wobble, setWobble] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setWobble((w) => (w === 0 ? 1 : 0));
    }, 1800);
    return () => window.clearInterval(id);
  }, [reduced]);

  const lastId = getLastCheckpointId();
  const angle = targetAngle(lastId) + (wobble === 0 ? -1.6 : 1.6);
  void progress;

  return (
    <div
      className={`relative inline-block ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-label="Compass needle pointing toward last completed checkpoint"
      role="img"
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <defs>
          <radialGradient id="compassFace" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#f4ead3" />
            <stop offset="100%" stopColor="#d8c294" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="url(#compassFace)" stroke="#1c1610" strokeWidth="1.4" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#1c1610" strokeWidth="0.4" opacity="0.4" />
        <g fontFamily="Cinzel, serif" fill="#1c1610" fontSize="6" textAnchor="middle">
          <text x="50" y="14">N</text>
          <text x="86" y="52">E</text>
          <text x="50" y="92">S</text>
          <text x="14" y="52">W</text>
        </g>
        <g stroke="#1c1610" strokeWidth="0.5" opacity="0.5">
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const r1 = i % 6 === 0 ? 36 : 38;
            const r2 = 42;
            const x1 = 50 + Math.cos(a) * r1;
            const y1 = 50 + Math.sin(a) * r1;
            const x2 = 50 + Math.cos(a) * r2;
            const y2 = 50 + Math.sin(a) * r2;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
        <motion.g
          style={{ originX: "50px", originY: "50px" }}
          animate={{ rotate: angle }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
        >
          <polygon points="50,16 55,50 50,84 45,50" fill="#a73a26" stroke="#1c1610" strokeWidth="0.6" />
          <polygon points="50,16 55,50 50,50" fill="#7a2818" />
          <polygon points="50,84 45,50 50,50" fill="#1c1610" />
          <circle cx="50" cy="50" r="3.5" fill="#1c1610" />
          <circle cx="50" cy="50" r="1.4" fill="#ecc25a" />
        </motion.g>
      </svg>
    </div>
  );
}
