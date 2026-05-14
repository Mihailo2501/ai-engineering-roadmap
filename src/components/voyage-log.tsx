import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  setReflection,
  useProgress,
} from "../lib/progress";
import { phases, totalCheckpoints } from "../data/roadmap";
import { exportMapPdf, downloadOgCard } from "../lib/exporters";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Entry = {
  id: string;
  title: string;
  phaseIndex: number;
  region: string;
  at: number;
  reflection?: string;
};

export function VoyageLogDrawer({ open, onClose }: Props) {
  const progress = useProgress();
  const reduced = useReducedMotion();
  const [exporting, setExporting] = useState<"pdf" | "share" | null>(null);

  const checkedCount = Object.keys(progress.checked).length;
  const total = totalCheckpoints();

  async function handlePdf() {
    setExporting("pdf");
    try {
      const target =
        document.querySelector<HTMLElement>("[data-roadmap-canvas]") ??
        document.body;
      await exportMapPdf(target);
    } catch (err) {
      console.error("[exporter] pdf failed", err);
    } finally {
      setExporting(null);
    }
  }

  async function handleShare() {
    setExporting("share");
    try {
      await downloadOgCard({ checked: checkedCount, total });
    } catch (err) {
      console.error("[exporter] share image failed", err);
    } finally {
      setExporting(null);
    }
  }

  const entries = useMemo<Entry[]>(() => {
    const results: Entry[] = [];
    for (const phase of phases) {
      for (const resource of phase.resources) {
        const rec = progress.checked[resource.id];
        if (!rec) continue;
        results.push({
          id: resource.id,
          title: resource.title,
          phaseIndex: phase.index,
          region: phase.region,
          at: rec.at,
          reflection: rec.reflection,
        });
      }
    }
    return results.sort((a, b) => b.at - a.at);
  }, [progress.checked]);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          className="fixed inset-y-0 right-0 z-40 w-full max-w-md bg-parchment border-l-2 border-ink shadow-2xl flex flex-col"
          initial={reduced ? { opacity: 0 } : { x: "100%" }}
          animate={reduced ? { opacity: 1 } : { x: 0 }}
          exit={reduced ? { opacity: 0 } : { x: "100%" }}
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
          role="dialog"
          aria-label="Voyage log"
        >
          <header className="flex items-center justify-between p-6 border-b border-ink/30">
            <div>
              <p className="font-display text-xs tracking-[0.4em] uppercase text-faded-red">
                The captain's
              </p>
              <h2 className="font-display text-2xl text-ink">Voyage Log</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close voyage log"
              className="font-display text-sm tracking-[0.25em] uppercase text-ink-faded hover:text-faded-red transition-colors"
            >
              close
            </button>
          </header>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {entries.length === 0 && (
              <div className="text-ink-faded font-body italic text-sm">
                No entries yet. Stamp a checkpoint on the map and it appears
                here, timestamped, with room for a scribbled reflection.
              </div>
            )}
            {entries.map((entry) => (
              <article
                key={entry.id}
                className="border-l-2 border-faded-red/60 pl-4 pb-3"
              >
                <p className="font-display text-[10px] tracking-[0.35em] uppercase text-faded-red mb-1">
                  Phase {entry.phaseIndex} &middot; {entry.region}
                </p>
                <h3 className="font-display text-lg text-ink leading-tight">
                  {entry.title}
                </h3>
                <p className="font-body text-xs text-ink-faded mt-1">
                  charted{" "}
                  {new Date(entry.at).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <textarea
                  defaultValue={entry.reflection ?? ""}
                  onBlur={(e) => setReflection(entry.id, e.target.value)}
                  placeholder="scribble a reflection, a quote, a question..."
                  rows={2}
                  className="mt-3 w-full bg-parchment-deep/40 border border-ink/20 rounded-sm p-2 text-sm font-body text-ink resize-y focus:outline-none focus:ring-2 focus:ring-gold"
                />
              </article>
            ))}
          </div>
          <footer className="p-4 border-t border-ink/30 font-body text-xs text-ink-faded space-y-2">
            <div className="flex gap-2 flex-wrap justify-center">
              <button
                type="button"
                onClick={handlePdf}
                disabled={exporting !== null}
                className="font-display text-[10px] tracking-[0.3em] uppercase text-ink bg-parchment-deep border border-ink/30 rounded-sm px-3 py-2 hover:bg-gold-pale transition-colors disabled:opacity-50"
              >
                {exporting === "pdf" ? "rendering..." : "export PDF"}
              </button>
              <button
                type="button"
                onClick={handleShare}
                disabled={exporting !== null}
                className="font-display text-[10px] tracking-[0.3em] uppercase text-ink bg-parchment-deep border border-ink/30 rounded-sm px-3 py-2 hover:bg-gold-pale transition-colors disabled:opacity-50"
              >
                {exporting === "share" ? "rendering..." : "share image"}
              </button>
            </div>
            <p className="text-center">entries persist on this device only</p>
          </footer>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
