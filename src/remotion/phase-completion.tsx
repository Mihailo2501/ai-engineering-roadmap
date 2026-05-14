import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring } from "remotion";
import { Parchment, InkStamp, palette, fonts } from "./shared";

export type PhaseCompletionProps = {
  phaseIndex: number;
  region: string;
  tagline: string;
};

export const phaseCompletionDefaults: PhaseCompletionProps = {
  phaseIndex: 1,
  region: "The Library",
  tagline: "canon reading and lay of the land",
};

export function PhaseCompletion(props: PhaseCompletionProps) {
  return (
    <Parchment>
      <Sequence from={0} durationInFrames={60}>
        <BannerRipple {...props} />
      </Sequence>
      <Sequence from={36} durationInFrames={120}>
        <StampDown {...props} />
      </Sequence>
      <Sequence from={130} durationInFrames={50}>
        <Outro {...props} />
      </Sequence>
    </Parchment>
  );
}

function BannerRipple({ phaseIndex, region }: PhaseCompletionProps) {
  const frame = useCurrentFrame();
  const reveal = spring({ fps: 30, frame, config: { damping: 18 } });
  const ripple = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 800 220" width="900" height="240">
        <defs>
          <linearGradient id="bannerFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={palette.parchment} />
            <stop offset="100%" stopColor={palette.parchmentDeep} />
          </linearGradient>
        </defs>
        <g style={{ transform: `scaleX(${reveal})`, transformOrigin: "400px 110px" }}>
          <path
            d={`M40 60 Q 40 30 70 30 H 730 Q 760 30 760 60 V 160 Q 760 190 730 190 L 70 190 Q 40 190 40 160 Z`}
            fill="url(#bannerFill)"
            stroke={palette.ink}
            strokeWidth="2"
          />
          <path
            d="M0 60 L40 60 L20 90 Z M800 60 L760 60 L780 90 Z M0 160 L40 160 L20 130 Z M800 160 L760 160 L780 130 Z"
            fill={palette.ink}
            opacity="0.8"
          />
        </g>
        <g
          style={{
            opacity: reveal,
            transform: `translateY(${(1 - reveal) * 10}px)`,
          }}
        >
          <text
            x="400"
            y="105"
            textAnchor="middle"
            fontFamily={fonts.display}
            fontSize="20"
            letterSpacing="10"
            fill={palette.fadedRed}
          >
            PHASE {phaseIndex} CHARTED
          </text>
          <text
            x="400"
            y="158"
            textAnchor="middle"
            fontFamily={fonts.display}
            fontSize="46"
            letterSpacing="6"
            fill={palette.ink}
          >
            {region}
          </text>
        </g>
        <g opacity={ripple * 0.4}>
          <path
            d="M 70 195 Q 200 207 400 197 T 730 195"
            stroke={palette.ink}
            strokeWidth="1.4"
            fill="none"
          />
          <path
            d="M 70 200 Q 200 212 400 202 T 730 200"
            stroke={palette.ink}
            strokeWidth="0.7"
            fill="none"
          />
        </g>
      </svg>
    </AbsoluteFill>
  );
}

function StampDown({ region }: PhaseCompletionProps) {
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <InkStamp label={region.toUpperCase()} size={300} />
    </AbsoluteFill>
  );
}

function Outro({ tagline }: PhaseCompletionProps) {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 60,
      }}
    >
      <div
        style={{
          fontFamily: fonts.body,
          fontStyle: "italic",
          fontSize: 24,
          color: palette.inkSoft,
          opacity: fadeIn,
          letterSpacing: 2,
        }}
      >
        {tagline}
      </div>
    </AbsoluteFill>
  );
}
