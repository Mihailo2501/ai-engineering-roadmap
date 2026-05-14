import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Dot = { id: number; x: number; y: number };

export function QuillCursor({ enabled }: { enabled: boolean }) {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dots, setDots] = useState<Dot[]>([]);
  const counter = useRef(0);
  const lastDotRef = useRef<{ x: number; y: number; t: number }>({
    x: 0,
    y: 0,
    t: 0,
  });

  useEffect(() => {
    if (!enabled || reduced) {
      document.documentElement.style.cursor = "";
      return;
    }
    document.documentElement.style.cursor = "none";
    function onMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
      const now = performance.now();
      const last = lastDotRef.current;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 14 && now - last.t > 24) {
        lastDotRef.current = { x: e.clientX, y: e.clientY, t: now };
        counter.current += 1;
        const id = counter.current;
        setDots((d) => [...d.slice(-22), { id, x: e.clientX, y: e.clientY }]);
        window.setTimeout(() => {
          setDots((d) => d.filter((x) => x.id !== id));
        }, 1200);
      }
    }
    function onLeave() {
      setPos(null);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, reduced]);

  if (!enabled || reduced || !pos) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden>
      <AnimatePresence>
        {dots.map((d) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0.7, scale: 0.9 }}
            animate={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute w-1.5 h-1.5 rounded-full bg-ink"
            style={{ left: d.x - 3, top: d.y - 3 }}
          />
        ))}
      </AnimatePresence>
      <svg
        viewBox="0 0 32 32"
        width="36"
        height="36"
        className="absolute"
        style={{ left: pos.x - 4, top: pos.y - 4 }}
      >
        <g stroke="#1c1610" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="#f4ead3">
          <path d="M2 30 L8 24 L24 4 L28 8 L8 28 Z" />
          <path d="M22 6 L26 10" />
          <path d="M5 27 L7 29" />
          <path d="M8 24 q 4 -2 6 -6 q 4 -6 10 -10" fill="none" opacity="0.7" />
        </g>
        <circle cx="2" cy="30" r="1.6" fill="#1c1610" />
      </svg>
    </div>
  );
}
