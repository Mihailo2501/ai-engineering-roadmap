import { motion } from "framer-motion";
import { useProgress } from "../lib/progress";
import { phases, totalCheckpoints } from "../data/roadmap";

type Props = {
  className?: string;
};

export function ProgressCartouche({ className }: Props) {
  const progress = useProgress();
  const total = totalCheckpoints();
  const visibleChecked = Object.keys(progress.checked).filter((id) =>
    phases.some((p) => p.resources.some((r) => r.id === id && !r.secret))
  ).length;
  const pct = total === 0 ? 0 : Math.round((visibleChecked / total) * 100);

  const phaseDots = phases.map((phase) => {
    const phaseTotal = phase.resources.filter((r) => !r.secret).length;
    const phaseChecked = phase.resources.filter(
      (r) => !r.secret && progress.checked[r.id]
    ).length;
    const complete = phaseTotal > 0 && phaseChecked === phaseTotal;
    return { id: phase.id, idx: phase.index, complete, region: phase.region };
  });

  return (
    <aside
      className={`pointer-events-auto select-none ${className ?? ""}`}
      aria-label="Voyage progress"
    >
      <div className="relative w-[260px] md:w-[300px]">
        <svg viewBox="0 0 300 140" className="w-full h-auto drop-shadow-sm">
          <defs>
            <linearGradient id="cartoucheFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f4ead3" />
              <stop offset="100%" stopColor="#e7d6ad" />
            </linearGradient>
          </defs>
          <path
            d="M10 30 Q10 10 30 10 H270 Q290 10 290 30 V100 Q290 130 260 130 L40 130 Q10 130 10 100 Z"
            fill="url(#cartoucheFill)"
            stroke="#1c1610"
            strokeWidth="1.5"
          />
          <path
            d="M18 32 Q18 18 32 18 H268 Q282 18 282 32 V98 Q282 122 258 122 L42 122 Q18 122 18 98 Z"
            fill="none"
            stroke="#1c1610"
            strokeWidth="0.6"
            opacity="0.4"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-3">
          <p className="font-display text-[10px] tracking-[0.4em] uppercase text-faded-red mb-1">
            Voyage Progress
          </p>
          <motion.p
            className="font-display text-3xl text-ink"
            key={`${visibleChecked}-${total}`}
            initial={{ scale: 0.85, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 22 }}
          >
            {visibleChecked} <span className="text-ink-faded">/</span> {total}
          </motion.p>
          <p className="font-body text-xs text-ink-soft mt-0.5">
            {pct}% charted
          </p>
          <div className="flex gap-1.5 mt-2" role="list" aria-label="Phase completion">
            {phaseDots.map((d) => (
              <span
                key={d.id}
                role="listitem"
                title={`Phase ${d.idx}: ${d.region}`}
                className={`block w-3 h-3 rounded-full border ${
                  d.complete
                    ? "bg-gold-bright border-ink"
                    : "bg-parchment-deep border-ink-faded"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
