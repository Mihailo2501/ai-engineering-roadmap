import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const palette = {
  parchment: "#f4ead3",
  parchmentDeep: "#e7d6ad",
  ink: "#1c1610",
  inkSoft: "#3a2f24",
  inkFaded: "#6e5b46",
  fadedRed: "#a73a26",
  fadedRedDeep: "#7a2818",
  gold: "#c89a3a",
  goldBright: "#ecc25a",
  goldPale: "#f4dca0",
  teal: "#4d7d7a",
  tealDeep: "#2f5a5a",
};

export const fonts = {
  display: '"Cinzel", "Trajan Pro", "Cormorant Garamond", serif',
  body: '"Source Serif 4", "Lora", Georgia, serif',
};

export function Parchment({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: palette.parchment,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at top left, rgba(232,220,184,0.55), transparent 60%), radial-gradient(ellipse at bottom right, rgba(201,180,137,0.55), transparent 65%)",
        }}
      />
      <BorderFrame />
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}

export function BorderFrame() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1280 720"
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0 }}
    >
      <rect
        x="14"
        y="14"
        width="1252"
        height="692"
        fill="none"
        stroke={palette.ink}
        strokeWidth="1.5"
        opacity="0.8"
      />
      <rect
        x="26"
        y="26"
        width="1228"
        height="668"
        fill="none"
        stroke={palette.ink}
        strokeWidth="0.7"
        opacity="0.5"
        strokeDasharray="2 3"
      />
      <g
        fill={palette.ink}
        opacity="0.7"
      >
        <Corner x={14} y={14} rotate={0} />
        <Corner x={1266} y={14} rotate={90} />
        <Corner x={1266} y={706} rotate={180} />
        <Corner x={14} y={706} rotate={270} />
      </g>
    </svg>
  );
}

function Corner({ x, y, rotate }: { x: number; y: number; rotate: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rotate})`}>
      <path
        d="M0 0 L36 0 L34 4 L8 4 L8 30 L4 32 L0 30 Z"
        fill={palette.ink}
        opacity="0.85"
      />
      <circle cx="16" cy="16" r="2" fill={palette.fadedRed} />
    </g>
  );
}

export function QuillTitle({
  text,
  size = 86,
  delay = 0,
  duration = 90,
  letterSpacing = 12,
}: {
  text: string;
  size?: number;
  delay?: number;
  duration?: number;
  letterSpacing?: number;
}) {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delay);
  const reveal = Math.min(1, local / duration);
  const inkBloom = interpolate(local, [0, duration * 0.4, duration], [0, 1, 1]);
  const characters = text.split("");
  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontSize: size,
        letterSpacing,
        color: palette.ink,
        textShadow: `0 1px 0 rgba(0,0,0,${0.05 + inkBloom * 0.1})`,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {characters.map((c, i) => {
        const charLocal = local - i * (duration / Math.max(1, characters.length));
        const charProgress = Math.max(0, Math.min(1, charLocal / 12));
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: charProgress,
              transform: `translateY(${(1 - charProgress) * 8}px)`,
              whiteSpace: "pre",
            }}
          >
            {c}
          </span>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: -8,
          transform: "translateX(-50%)",
          width: `${reveal * 60}%`,
          height: 2,
          background: palette.ink,
          opacity: 0.3,
        }}
      />
    </div>
  );
}

export function CompassRoseSpin({
  size = 200,
  spinUntil = 90,
}: {
  size?: number;
  spinUntil?: number;
}) {
  const frame = useCurrentFrame();
  const spin = interpolate(frame, [0, spinUntil], [0, 720], {
    extrapolateRight: "clamp",
  });
  const settle = spring({
    fps: 30,
    frame: Math.max(0, frame - spinUntil),
    config: { damping: 14, stiffness: 70 },
  });
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      <defs>
        <radialGradient id="compFace" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor={palette.parchment} />
          <stop offset="100%" stopColor={palette.parchmentDeep} />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#compFace)" stroke={palette.ink} strokeWidth="1.4" />
      <g fontFamily={fonts.display} fontSize="6" fill={palette.ink} textAnchor="middle">
        <text x="50" y="14">N</text>
        <text x="86" y="52">E</text>
        <text x="50" y="92">S</text>
        <text x="14" y="52">W</text>
      </g>
      <g
        style={{
          transformOrigin: "50px 50px",
          transform: `rotate(${spin - 45 + settle * 45}deg)`,
        }}
      >
        <polygon
          points="50,16 55,50 50,84 45,50"
          fill={palette.fadedRed}
          stroke={palette.ink}
          strokeWidth="0.6"
        />
        <polygon points="50,16 55,50 50,50" fill={palette.fadedRedDeep} />
        <polygon points="50,84 45,50 50,50" fill={palette.ink} />
        <circle cx="50" cy="50" r="3.5" fill={palette.ink} />
        <circle cx="50" cy="50" r="1.4" fill={palette.goldBright} />
      </g>
    </svg>
  );
}

export function InkStamp({
  label,
  delay = 0,
  size = 320,
}: {
  label: string;
  delay?: number;
  size?: number;
}) {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delay);
  const drop = spring({
    fps: 30,
    frame: local,
    config: { damping: 16, stiffness: 100 },
  });
  const scale = interpolate(drop, [0, 1], [2.6, 1]);
  const opacity = interpolate(drop, [0, 0.4, 1], [0, 1, 1]);
  const splatter = interpolate(local, [0, 8, 30], [0, 1, 1.4], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
      }}
    >
      <svg viewBox="0 0 240 240" width={size} height={size}>
        <defs>
          <radialGradient id="stampGold" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={palette.goldPale} />
            <stop offset="60%" stopColor={palette.goldBright} />
            <stop offset="100%" stopColor="#a87918" />
          </radialGradient>
        </defs>
        <circle
          cx="120"
          cy="120"
          r="100"
          fill="url(#stampGold)"
          stroke={palette.ink}
          strokeWidth="2"
          opacity="0.95"
        />
        <circle cx="120" cy="120" r="86" fill="none" stroke={palette.ink} strokeWidth="1" opacity="0.5" />
        <circle cx="120" cy="120" r="74" fill="none" stroke={palette.ink} strokeWidth="0.6" opacity="0.4" strokeDasharray="2 3" />
        <text
          x="120"
          y="128"
          textAnchor="middle"
          fontFamily={fonts.display}
          fontSize="20"
          letterSpacing="6"
          fill={palette.ink}
        >
          {label}
        </text>
        <text
          x="120"
          y="160"
          textAnchor="middle"
          fontFamily={fonts.display}
          fontSize="9"
          letterSpacing="4"
          fill={palette.ink}
          opacity="0.7"
          fontStyle="italic"
        >
          mare nostrum
        </text>
        <g fill={palette.ink} opacity={0.7 * Math.min(1, splatter)}>
          <circle cx="40" cy="60" r={4 * splatter} />
          <circle cx="200" cy="80" r={3 * splatter} />
          <circle cx="50" cy="200" r={3 * splatter} />
          <circle cx="200" cy="190" r={4 * splatter} />
          <circle cx="32" cy="120" r={2 * splatter} />
          <circle cx="220" cy="140" r={2 * splatter} />
          <circle cx="120" cy="14" r={3 * splatter} />
          <circle cx="120" cy="226" r={3 * splatter} />
        </g>
      </svg>
    </div>
  );
}

export function ParchmentScroll({
  fromY,
  toY,
  duration,
  delay = 0,
  children,
}: {
  fromY: number;
  toY: number;
  duration: number;
  delay?: number;
  children: React.ReactNode;
}) {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delay);
  const t = Math.min(1, local / duration);
  const y = interpolate(t, [0, 1], [fromY, toY]);
  return (
    <div style={{ transform: `translateY(${y}px)`, willChange: "transform" }}>
      {children}
    </div>
  );
}

export function useFadeIn(delay = 0, duration = 30) {
  const frame = useCurrentFrame();
  return interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function useFadeOut(start: number, duration = 30) {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, start + duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function useDurationSec() {
  const { fps, durationInFrames } = useVideoConfig();
  return durationInFrames / fps;
}

export type PhaseSummary = {
  index: number;
  region: string;
  tagline: string;
  illustration: string;
};

export const phaseSummaries: PhaseSummary[] = [
  { index: 0, region: "Home Port", tagline: "where the journey begins", illustration: "home-port" },
  { index: 1, region: "The Library", tagline: "canon reading and lay of the land", illustration: "the-library" },
  { index: 2, region: "Harbor of Protocols", tagline: "the programmatic surface", illustration: "harbor-of-protocols" },
  { index: 3, region: "The Workshop", tagline: "open source and memory beyond rag", illustration: "the-workshop" },
  { index: 4, region: "Framework Crossroads", tagline: "many maps, one voyage", illustration: "framework-crossroads" },
  { index: 5, region: "The Observatory", tagline: "evals discipline", illustration: "the-observatory" },
  { index: 6, region: "The Summit", tagline: "cloud capstone and cost engineering", illustration: "the-summit" },
];
