import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { phases } from "../data/roadmap";
import { regions, MAP_WIDTH, MAP_HEIGHT, scribesTent } from "../data/map-layout";
import { MapBackground } from "./map-background";
import { CheckpointIcon } from "./checkpoint-icon";
import { ProgressCartouche } from "./progress-cartouche";
import { CompassNeedle } from "./compass-needle";
import { RegionIllustration } from "./region-illustration";
import { FogOfWar } from "./fog-of-war";
import { AmbientFlourishes } from "./ambient-flourishes";
import { AudioToggle } from "./audio-toggle";
import { SecretMark } from "./secret-mark";
import { KonamiOverlay, useKeyboardFastTravel } from "./konami-overlay";
import { QuillCursor } from "./quill-cursor";
import { useProgress } from "../lib/progress";

type Props = {
  onOpenScribesTent: () => void;
  onOpenVoyageLog: () => void;
};

export function CartographerMap({ onOpenScribesTent, onOpenVoyageLog }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const progress = useProgress();
  const reduced = useReducedMotion();
  const [scale, setScale] = useState(1);
  const [konamiRevealed, setKonamiRevealed] = useState(false);
  const [quill, setQuill] = useState(false);
  useKeyboardFastTravel();

  useEffect(() => {
    function measure() {
      if (!scrollerRef.current) return;
      const h = scrollerRef.current.clientHeight;
      const w = scrollerRef.current.clientWidth;
      const target = Math.min(h / MAP_HEIGHT, w / (MAP_WIDTH * 0.42));
      const next = Math.max(0.42, Math.min(1, target));
      setScale(next);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const phaseCompletion = (phaseId: string) => {
    const phase = phases.find((p) => p.id === phaseId);
    if (!phase) return false;
    const total = phase.resources.filter((r) => !r.secret).length;
    const checked = phase.resources.filter(
      (r) => !r.secret && progress.checked[r.id]
    ).length;
    return total > 0 && checked === total;
  };

  const isUnlocked = (idx: number) => {
    if (idx === 0) return true;
    const prev = phases[idx - 1];
    return phaseCompletion(prev.id);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      <div
        ref={scrollerRef}
        className="relative w-full h-full overflow-x-auto overflow-y-hidden scroll-smooth-x"
        role="region"
        aria-label="Cartographer's roadmap. Scroll horizontally to chart the voyage."
      >
        <div
          className="relative origin-top-left"
          style={{
            width: MAP_WIDTH * scale,
            height: MAP_HEIGHT * scale,
          }}
        >
          <div
            data-roadmap-canvas
            className="absolute top-0 left-0"
            style={{
              width: MAP_WIDTH,
              height: MAP_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <MapBackground />

            <button
              type="button"
              onClick={onOpenScribesTent}
              aria-label="Open scribe's tent: study workflow"
              className="absolute outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-md"
              style={{
                left: scribesTent.x - 60,
                top: scribesTent.y - 60,
                width: 120,
                height: 120,
              }}
            >
              <svg viewBox="0 0 120 120" width="120" height="120">
                <g stroke="#1c1610" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 95 L60 35 L100 95 Z" fill="#f4ead3" />
                  <path d="M60 35 L60 95" />
                  <path d="M52 95 L52 70 Q60 60 68 70 L68 95" fill="#e7d6ad" />
                  <path d="M60 30 L60 22 L70 18" />
                  <path d="M20 95 L100 95" />
                  <circle cx="40" cy="85" r="2" fill="#1c1610" />
                  <circle cx="80" cy="85" r="2" fill="#1c1610" />
                </g>
                <text
                  x="60"
                  y="115"
                  textAnchor="middle"
                  fontFamily="Cinzel, serif"
                  fontSize="8"
                  letterSpacing="3"
                  fill="#1c1610"
                  opacity="0.7"
                >
                  SCRIBE'S TENT
                </text>
              </svg>
            </button>

            {phases.map((phase) => {
              const placement = regions.find((r) => r.phaseId === phase.id);
              if (!placement) return null;
              const unlocked = isUnlocked(phase.index);
              const complete = phaseCompletion(phase.id);

              return (
                <motion.div
                  key={phase.id}
                  className="absolute"
                  style={{
                    left: placement.cx - placement.illustrationWidth / 2,
                    top: placement.cy - placement.illustrationHeight / 2,
                    width: placement.illustrationWidth,
                  }}
                  initial={reduced ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: unlocked ? 1 : 0.55, y: 0 }}
                  transition={{ duration: 0.8, delay: phase.index * 0.08 }}
                  data-phase={phase.id}
                >
                  <div className="relative" style={{ width: placement.illustrationWidth }}>
                    <div
                      className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
                      style={{ top: placement.bannerOffsetY }}
                    >
                      <svg
                        viewBox="0 0 240 80"
                        width="260"
                        height="80"
                        className="drop-shadow-sm"
                        aria-hidden
                      >
                        <path
                          d="M10 18 Q10 6 22 6 H218 Q230 6 230 18 V52 Q230 70 212 70 L28 70 Q10 70 10 52 Z"
                          fill="#f4ead3"
                          stroke="#1c1610"
                          strokeWidth="1.2"
                        />
                        <path
                          d="M0 18 L10 18 L4 28 Z M240 18 L230 18 L236 28 Z M0 52 L10 52 L4 42 Z M240 52 L230 52 L236 42 Z"
                          fill="#1c1610"
                          opacity="0.7"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                        <p className="font-display text-[9px] tracking-[0.4em] uppercase text-faded-red">
                          Phase {phase.index}
                        </p>
                        <p className="font-display text-base md:text-lg text-ink leading-tight text-center">
                          {phase.region}
                        </p>
                        {complete && (
                          <p className="font-display text-[9px] tracking-[0.3em] uppercase text-gold mt-0.5">
                            charted
                          </p>
                        )}
                      </div>
                    </div>

                    <RegionIllustration
                      phaseId={phase.id}
                      width={placement.illustrationWidth}
                      height={placement.illustrationHeight}
                    />

                    {phase.resources
                      .filter((r) => !r.secret)
                      .map((resource, i) => {
                        const offset = placement.checkpointOffsets[i];
                        if (!offset) return null;
                        return (
                          <div
                            key={resource.id}
                            className="absolute"
                            style={{
                              left: placement.illustrationWidth / 2 + offset.x - 36,
                              top: placement.illustrationHeight / 2 + offset.y - 28,
                            }}
                          >
                            <CheckpointIcon
                              id={resource.id}
                              title={resource.title}
                              url={resource.url}
                              kind={resource.kind}
                              size={52}
                            />
                          </div>
                        );
                      })}
                  </div>
                </motion.div>
              );
            })}

            <AmbientFlourishes />
            <svg
              className="absolute inset-0 pointer-events-none"
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              style={{ pointerEvents: "none" }}
            >
              <g style={{ pointerEvents: "all" }}>
                <SecretMark revealed={konamiRevealed} />
              </g>
            </svg>
            <FogOfWar phases={phases} isUnlocked={isUnlocked} />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="pointer-events-auto absolute top-4 right-4 md:top-6 md:right-6">
          <ProgressCartouche />
        </div>
        <div className="pointer-events-auto absolute bottom-4 right-4 md:bottom-6 md:right-6">
          <div className="bg-parchment/85 backdrop-blur-sm rounded-full p-2 border border-ink/20 shadow-md">
            <CompassNeedle size={130} />
          </div>
        </div>
        <div className="pointer-events-auto absolute bottom-4 left-4 md:bottom-6 md:left-6 flex gap-3 items-center flex-wrap">
          <button
            type="button"
            onClick={onOpenVoyageLog}
            className="font-display text-xs tracking-[0.3em] uppercase text-ink bg-parchment/85 backdrop-blur-sm border border-ink/30 rounded-sm px-4 py-3 hover:bg-gold-pale hover:text-ink transition-colors shadow-md"
          >
            voyage log
          </button>
          <button
            type="button"
            aria-pressed={quill}
            onClick={() => setQuill((q) => !q)}
            className="font-display text-xs tracking-[0.3em] uppercase text-ink bg-parchment/85 backdrop-blur-sm border border-ink/30 rounded-sm px-3 py-3 hover:bg-gold-pale transition-colors shadow-md"
            title="Toggle quill cursor (writes ink trail behind you)"
          >
            {quill ? "quill on" : "quill off"}
          </button>
          <AudioToggle />
        </div>
      </div>
      <KonamiOverlay onActivate={() => setKonamiRevealed(true)} />
      <QuillCursor enabled={quill} />
    </div>
  );
}
