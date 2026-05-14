import { motion, useReducedMotion } from "framer-motion";
import { regions, MAP_WIDTH, MAP_HEIGHT } from "../data/map-layout";

type Props = {
  className?: string;
};

export function MapBackground({ className }: Props) {
  const reduced = useReducedMotion();

  const pathPoints = regions.map((r) => ({
    x: r.cx,
    y: r.cy,
    label: r.phaseId,
  }));

  let dPath = "";
  for (let i = 0; i < pathPoints.length - 1; i++) {
    const a = pathPoints[i];
    const b = pathPoints[i + 1];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const sag = 40 * (i % 2 === 0 ? 1 : -1);
    if (i === 0) dPath += `M ${a.x} ${a.y} `;
    dPath += `Q ${mx} ${my + sag} ${b.x} ${b.y} `;
  }

  return (
    <svg
      className={`absolute inset-0 ${className ?? ""}`}
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="seaGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4d7d7a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2f5a5a" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="landGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f0e2bc" />
          <stop offset="100%" stopColor="#d8c294" />
        </linearGradient>
        <pattern
          id="hatch"
          x="0"
          y="0"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <line x1="0" y1="0" x2="0" y2="6" stroke="#1c1610" strokeWidth="0.35" opacity="0.5" />
        </pattern>
        <filter id="inkBleed" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
        <pattern id="wave" x="0" y="0" width="80" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M0 10 Q 20 0 40 10 T 80 10"
            fill="none"
            stroke="#2f5a5a"
            strokeOpacity="0.4"
            strokeWidth="0.7"
          />
        </pattern>
      </defs>

      <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#f4ead3" />

      <g opacity="0.85">
        <path
          d={`M 0 1080 Q 220 1020 440 1060 T 880 1020 T 1320 1060 T 1760 1040 T 2200 1080 T ${MAP_WIDTH} 1060 L ${MAP_WIDTH} ${MAP_HEIGHT} L 0 ${MAP_HEIGHT} Z`}
          fill="url(#seaGrad)"
        />
        <rect
          x="0"
          y="1040"
          width={MAP_WIDTH}
          height={MAP_HEIGHT - 1040}
          fill="url(#wave)"
          opacity="0.6"
        />
      </g>

      <g opacity="0.55">
        <path
          d="M -40 1040 Q 200 980 380 1010 T 720 940 T 1100 1000 Q 1280 1040 1340 1000 T 1640 940 T 1980 1000 T 2400 920 T ${MAP_WIDTH + 40} 980"
          fill="url(#landGrad)"
          stroke="#1c1610"
          strokeWidth="1"
        />
      </g>

      <g stroke="#1c1610" strokeWidth="0.9" fill="none" opacity="0.5">
        <path d="M 100 760 L 220 720 L 360 700 L 460 680 L 580 660 L 720 640 L 860 620 L 980 600 L 1100 580 L 1240 560 L 1380 540 L 1520 520 L 1660 500 L 1800 480 L 1940 460 L 2080 440 L 2220 400 L 2360 360 L 2500 320 L 2640 280 L 2780 240" />
      </g>

      {Array.from({ length: 18 }).map((_, i) => {
        const x = 80 + i * 156;
        const y = 240 + ((i * 37) % 220);
        const r = 22 + ((i * 13) % 38);
        return (
          <g key={i} opacity="0.7" filter="url(#inkBleed)">
            <path
              d={`M ${x} ${y} q ${r * 0.3} -${r * 0.5} ${r * 0.8} 0 q ${r * 0.4} -${r * 0.6} ${r * 0.7} 0 q ${r * 0.4} -${r * 0.3} ${r * 0.5} ${r * 0.2}`}
              fill="none"
              stroke="#1c1610"
              strokeWidth="0.6"
            />
          </g>
        );
      })}

      <path
        d={dPath}
        fill="none"
        stroke="#1c1610"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="6 8"
        opacity="0.7"
      />

      {pathPoints.map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y + 80} r="6" fill="#1c1610" />
          <circle cx={p.x} cy={p.y + 80} r="3" fill="#f4ead3" />
        </g>
      ))}

      <g
        transform={`translate(${MAP_WIDTH - 220}, 120)`}
        fontFamily="Cinzel, serif"
        fill="#1c1610"
      >
        <text
          x="0"
          y="0"
          fontSize="22"
          letterSpacing="6"
          textAnchor="middle"
          opacity="0.85"
        >
          MARE NESCIO
        </text>
        <text
          x="0"
          y="22"
          fontSize="10"
          letterSpacing="4"
          textAnchor="middle"
          opacity="0.55"
          fontStyle="italic"
        >
          the unknown sea
        </text>
      </g>

      <g transform="translate(120, 160)" fontFamily="Cinzel, serif" fill="#1c1610">
        <text
          x="0"
          y="0"
          fontSize="22"
          letterSpacing="6"
          textAnchor="middle"
          opacity="0.85"
        >
          TERRA AGENTUM
        </text>
        <text
          x="0"
          y="22"
          fontSize="10"
          letterSpacing="4"
          textAnchor="middle"
          opacity="0.55"
          fontStyle="italic"
        >
          land of the agents
        </text>
      </g>

      <g transform={`translate(${MAP_WIDTH / 2}, ${MAP_HEIGHT - 100})`}>
        <text
          fontFamily="Cinzel, serif"
          fontSize="13"
          letterSpacing="6"
          textAnchor="middle"
          fill="#1c1610"
          opacity="0.55"
          fontStyle="italic"
        >
          hic sunt agentes
        </text>
      </g>

      {!reduced && (
        <motion.g
          initial={{ opacity: 0.55 }}
          animate={{ opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M 380 1110 q 20 -8 40 0 t 40 0 t 40 0"
            stroke="#1c1610"
            strokeWidth="0.6"
            fill="none"
            opacity="0.45"
          />
          <path
            d="M 1480 1110 q 20 -8 40 0 t 40 0 t 40 0"
            stroke="#1c1610"
            strokeWidth="0.6"
            fill="none"
            opacity="0.45"
          />
          <path
            d="M 2480 1130 q 20 -8 40 0 t 40 0 t 40 0"
            stroke="#1c1610"
            strokeWidth="0.6"
            fill="none"
            opacity="0.45"
          />
        </motion.g>
      )}
    </svg>
  );
}
