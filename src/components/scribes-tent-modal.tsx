import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ScribesTentModal({ open, onClose }: Props) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-[1px]"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="scribe-title"
            className="relative bg-parchment border-2 border-ink rounded-sm shadow-xl max-w-2xl w-full p-8 md:p-10 font-body text-ink"
            initial={reduced ? false : { opacity: 0, y: 24, rotate: -0.4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <p className="font-display text-xs tracking-[0.4em] uppercase text-faded-red mb-2">
              The Scribe's Tent
            </p>
            <h2 id="scribe-title" className="font-display text-3xl text-ink mb-4">
              How the journey gets written down
            </h2>
            <p className="text-ink-soft leading-relaxed mb-4">
              This map tracks <em>that</em> you've sailed each leg. The actual
              note-taking, the sketches, the half-baked questions, the code
              experiments, those all live in a separate study scratchpad:
              <span className="font-display tracking-wider">
                {" "}AI Engineering Study
              </span>.
            </p>
            <div className="rounded-sm border border-ink/20 bg-parchment-deep/60 p-4 my-4 text-sm font-mono">
              /Users/mihailo/Projects/Project 15 - AI Engineering Study/
            </div>
            <ul className="text-ink-soft space-y-2 list-none ml-0 mb-4">
              <li>
                <span className="font-display tracking-wider text-ink">
                  open sessions in Project 15
                </span>
                , not here. This site is the visual artifact, that one is the
                workshop.
              </li>
              <li>
                <span className="font-display tracking-wider text-ink">
                  name sessions
                </span>{" "}
                using the pattern{" "}
                <code className="text-faded-red">
                  /rename p&lt;phase&gt;-&lt;topic-slug&gt;
                </code>
                . Example:{" "}
                <code className="text-faded-red">p2-mcp-spec-deep-read</code>.
              </li>
              <li>
                <span className="font-display tracking-wider text-ink">
                  one markdown file per resource
                </span>
                , dropped into{" "}
                <code className="text-faded-red">
                  notes/phase-&lt;n&gt;-&lt;region&gt;/
                </code>
                . The folder structure mirrors the regions on this map.
              </li>
              <li>
                <span className="font-display tracking-wider text-ink">
                  separate concerns
                </span>
                : the seals on this map track completion. The notes there hold
                the actual thinking. Don't try to merge the two.
              </li>
            </ul>
            <p className="text-ink-soft text-sm italic mb-6">
              The tent doesn't gate progress. It just points the lantern at
              where the real work happens.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="font-display tracking-[0.25em] uppercase text-sm bg-ink text-parchment px-6 py-3 rounded-sm hover:bg-faded-red transition-colors"
            >
              continue charting
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
