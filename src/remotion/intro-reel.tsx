import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring } from "remotion";
import {
  Parchment,
  QuillTitle,
  CompassRoseSpin,
  palette,
  fonts,
  phaseSummaries,
} from "./shared";

export function IntroReel() {
  return (
    <Parchment>
      <Sequence from={0} durationInFrames={120}>
        <TitleScene />
      </Sequence>
      <Sequence from={100} durationInFrames={150}>
        <RegionMontage />
      </Sequence>
      <Sequence from={240} durationInFrames={90}>
        <CompassScene />
      </Sequence>
      <Sequence from={300} durationInFrames={60}>
        <SetSailScene />
      </Sequence>
    </Parchment>
  );
}

function TitleScene() {
  const frame = useCurrentFrame();
  const sub = spring({
    fps: 30,
    frame: Math.max(0, frame - 36),
    config: { damping: 18 },
  });
  const fadeOut = interpolate(frame, [96, 120], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: fadeOut,
      }}
    >
      <div style={{ position: "relative" }}>
        <QuillTitle text="A I  E n g i n e e r i n g" size={66} duration={42} />
      </div>
      <div style={{ marginTop: 18, position: "relative" }}>
        <QuillTitle text="R o a d m a p" size={104} delay={18} duration={50} letterSpacing={18} />
      </div>
      <div
        style={{
          marginTop: 36,
          fontFamily: fonts.body,
          fontStyle: "italic",
          fontSize: 22,
          color: palette.inkSoft,
          opacity: sub,
        }}
      >
        a cartographer's chart of the voyage ahead
      </div>
    </AbsoluteFill>
  );
}

function RegionMontage() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {phaseSummaries.map((p, i) => {
        const localDelay = i * 18;
        const enter = spring({
          fps: 30,
          frame: Math.max(0, frame - localDelay),
          config: { damping: 18 },
        });
        const exit = interpolate(
          frame,
          [localDelay + 80, localDelay + 120],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const opacity = enter * exit;
        const lift = (1 - enter) * 20;
        return (
          <div
            key={p.region}
            style={{
              position: "absolute",
              left: 80 + (i % 3) * 380,
              top: 120 + Math.floor(i / 3) * 220,
              opacity,
              transform: `translateY(${lift}px)`,
              fontFamily: fonts.display,
              color: palette.ink,
              width: 340,
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontSize: 12,
                letterSpacing: 6,
                color: palette.fadedRed,
                textTransform: "uppercase",
              }}
            >
              Phase {p.index}
            </div>
            <div style={{ fontSize: 34, lineHeight: 1.05, marginTop: 6 }}>
              {p.region}
            </div>
            <div
              style={{
                fontFamily: fonts.body,
                fontSize: 16,
                fontStyle: "italic",
                color: palette.inkSoft,
                marginTop: 6,
              }}
            >
              {p.tagline}
            </div>
            <svg
              width="320"
              height="6"
              viewBox="0 0 320 6"
              style={{ marginTop: 10 }}
            >
              <path
                d="M0 3 L300 3"
                stroke={palette.ink}
                strokeWidth="0.8"
                strokeDasharray="3 4"
                opacity="0.6"
              />
              <circle cx="0" cy="3" r="2" fill={palette.ink} />
              <circle cx="300" cy="3" r="2" fill={palette.fadedRed} />
            </svg>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

function CompassScene() {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [70, 90], [1, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeIn * fadeOut,
        flexDirection: "column",
      }}
    >
      <CompassRoseSpin size={300} spinUntil={70} />
      <div
        style={{
          marginTop: 24,
          fontFamily: fonts.display,
          fontSize: 22,
          letterSpacing: 8,
          color: palette.ink,
          textTransform: "uppercase",
        }}
      >
        set your bearings
      </div>
    </AbsoluteFill>
  );
}

function SetSailScene() {
  const frame = useCurrentFrame();
  const enter = spring({ fps: 30, frame, config: { damping: 18 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          fontFamily: fonts.display,
          fontSize: 72,
          letterSpacing: 14,
          color: palette.ink,
          opacity: enter,
          transform: `scale(${0.92 + enter * 0.08})`,
        }}
      >
        SET SAIL
      </div>
      <div
        style={{
          fontFamily: fonts.body,
          fontStyle: "italic",
          fontSize: 18,
          color: palette.inkSoft,
          marginTop: 14,
          opacity: enter,
        }}
      >
        six phases. one summit. press on.
      </div>
    </AbsoluteFill>
  );
}
