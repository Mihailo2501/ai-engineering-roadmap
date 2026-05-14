import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring } from "remotion";
import {
  Parchment,
  CompassRoseSpin,
  InkStamp,
  palette,
  fonts,
  phaseSummaries,
} from "./shared";

export function CapstoneReveal() {
  return (
    <Parchment>
      <Sequence from={0} durationInFrames={150}>
        <MapPanOut />
      </Sequence>
      <Sequence from={120} durationInFrames={280}>
        <PhaseRollCall />
      </Sequence>
      <Sequence from={380} durationInFrames={180}>
        <CapstoneStamp />
      </Sequence>
      <Sequence from={540} durationInFrames={210}>
        <Coda />
      </Sequence>
      <Sequence from={730} durationInFrames={170}>
        <FinalLine />
      </Sequence>
    </Parchment>
  );
}

function MapPanOut() {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 150], [1.4, 0.85], {
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, 150], [200, 0], {
    extrapolateRight: "clamp",
  });
  const fade = interpolate(frame, [120, 150], [1, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: fade,
      }}
    >
      <svg
        viewBox="0 0 1280 720"
        width="1280"
        height="720"
        style={{ transform: `scale(${scale}) translateY(${y}px)`, transformOrigin: "center center" }}
      >
        <defs>
          <linearGradient id="capSea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={palette.teal} stopOpacity="0.6" />
            <stop offset="100%" stopColor={palette.tealDeep} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect x="0" y="540" width="1280" height="180" fill="url(#capSea)" />
        <path
          d="M 60 620 Q 220 580 380 600 T 700 580 T 1000 600 T 1240 580"
          stroke={palette.ink}
          fill={palette.parchmentDeep}
          strokeWidth="1.6"
          opacity="0.85"
        />
        {phaseSummaries.map((p, i) => {
          const x = 120 + i * 165;
          const y0 = 480 - i * 56;
          return (
            <g key={p.region} transform={`translate(${x},${y0})`}>
              <circle r="14" fill={palette.goldBright} stroke={palette.ink} strokeWidth="1.5" />
              <text
                y="36"
                textAnchor="middle"
                fontFamily={fonts.display}
                fontSize="12"
                letterSpacing="3"
                fill={palette.ink}
              >
                {p.region.toUpperCase()}
              </text>
            </g>
          );
        })}
        <path
          d={phaseSummaries
            .map((p, i) => {
              const x = 120 + i * 165;
              const y0 = 480 - i * 56;
              return `${i === 0 ? "M" : "L"} ${x} ${y0}`;
            })
            .join(" ")}
          fill="none"
          stroke={palette.goldBright}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </AbsoluteFill>
  );
}

function PhaseRollCall() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {phaseSummaries.map((p, i) => {
        const enterFrame = i * 30;
        const enter = spring({
          fps: 30,
          frame: Math.max(0, frame - enterFrame),
          config: { damping: 22 },
        });
        const exit = interpolate(
          frame,
          [enterFrame + 220, enterFrame + 260],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const opacity = enter * exit;
        const offset = (1 - enter) * 24;
        return (
          <div
            key={p.region}
            style={{
              opacity,
              transform: `translateY(${offset}px)`,
              display: "flex",
              alignItems: "baseline",
              gap: 32,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontFamily: fonts.display,
                fontSize: 18,
                letterSpacing: 6,
                color: palette.fadedRed,
                width: 90,
                textAlign: "right",
                textTransform: "uppercase",
              }}
            >
              Phase {p.index}
            </span>
            <span
              style={{
                fontFamily: fonts.display,
                fontSize: 36,
                letterSpacing: 4,
                color: palette.ink,
                width: 420,
              }}
            >
              {p.region}
            </span>
            <span
              style={{
                fontFamily: fonts.body,
                fontStyle: "italic",
                fontSize: 17,
                color: palette.inkSoft,
                width: 360,
              }}
            >
              {p.tagline}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

function CapstoneStamp() {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [150, 180], [1, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: fadeOut }}>
      <InkStamp label="THE VOYAGE" size={360} delay={0} />
      <div
        style={{
          position: "absolute",
          bottom: 60,
          fontFamily: fonts.display,
          fontSize: 24,
          letterSpacing: 12,
          color: palette.ink,
          textTransform: "uppercase",
        }}
      >
        is charted
      </div>
    </AbsoluteFill>
  );
}

function Coda() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <CompassRoseSpin size={260} spinUntil={120} />
      <div
        style={{
          marginTop: 24,
          fontFamily: fonts.body,
          fontStyle: "italic",
          fontSize: 20,
          color: palette.inkSoft,
          opacity: interpolate(frame, [60, 120], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        the cartographer rests. the next map is yours to draw.
      </div>
    </AbsoluteFill>
  );
}

function FinalLine() {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 30, 140, 170], [0, 1, 1, 0]);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 56,
          letterSpacing: 16,
          color: palette.ink,
          textTransform: "uppercase",
          opacity: fade,
        }}
      >
        fin
      </div>
    </AbsoluteFill>
  );
}
