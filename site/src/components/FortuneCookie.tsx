import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { QUOTES, type Quote } from "../data/quotes";
import { discover } from "../lib/discoveries";

interface FortuneCookieProps {
  open: boolean;
  onClose: () => void;
}

function pickQuote(previous?: Quote): Quote {
  let q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  while (QUOTES.length > 1 && q === previous) {
    q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  }
  return q;
}

/** Deterministic crumb burst pattern (x offset, y offset, size). */
const CRUMBS = [
  { x: -68, y: -44, s: 5 },
  { x: 58, y: -58, s: 7 },
  { x: -34, y: 54, s: 5 },
  { x: 46, y: 48, s: 8 },
  { x: -82, y: 8, s: 6 },
  { x: 76, y: 2, s: 5 },
  { x: -14, y: -74, s: 6 },
  { x: 22, y: 70, s: 5 },
  { x: -52, y: -12, s: 4 },
  { x: 38, y: -20, s: 4 },
];

const SHAKE = {
  rotate: [0, -7, 7, -10, 10, -4, 0],
  transition: { duration: 0.55, times: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1] },
};

const springOut = (x: number, rotate: number) => ({
  x,
  y: 14,
  rotate,
  transition: { delay: 0.6, type: "spring" as const, stiffness: 240, damping: 15 },
});

export function FortuneCookie({ open, onClose }: FortuneCookieProps) {
  const reduced = useReducedMotion();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [crackId, setCrackId] = useState(0);

  useEffect(() => {
    if (open) {
      setQuote((prev) => pickQuote(prev ?? undefined));
      setCrackId((n) => n + 1);
      discover("fortune");
    }
  }, [open]);

  if (!open || !quote) return null;

  const again = () => {
    setQuote((prev) => pickQuote(prev ?? undefined));
    setCrackId((n) => n + 1);
  };

  return (
    <div className="cookie-overlay" role="dialog" aria-modal="true" aria-label="Fortune cookie" onClick={onClose}>
      <div className="cookie" onClick={(e) => e.stopPropagation()}>
        {reduced ? (
          <div className="cookie__stage cookie__stage--static" key={crackId}>
            <div className="cookie__slip">
              <p className="cookie__text">“{quote.text}”</p>
              <p className="cookie__source">— {quote.source}</p>
            </div>
          </div>
        ) : (
          <div className="cookie__stage" key={crackId}>
            {/* anticipation shake, then the halves spring apart */}
            <motion.div className="cookie__shell" animate={SHAKE} aria-hidden="true">
              <motion.div
                className="cookie__half cookie__half--left"
                initial={{ x: 0, y: 0, rotate: 0 }}
                animate={springOut(-86, -32)}
              />
              <motion.div
                className="cookie__half cookie__half--right"
                initial={{ x: 0, y: 0, rotate: 0 }}
                animate={springOut(86, 32)}
              />
            </motion.div>

            {/* flash at the moment of the crack */}
            <motion.div
              className="cookie__flash"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.85, 0], scale: [0.6, 1.25, 1.5] }}
              transition={{ delay: 0.55, duration: 0.55, times: [0, 0.3, 1] }}
              aria-hidden="true"
            />

            {/* crumb burst */}
            {CRUMBS.map((c, i) => (
              <motion.span
                key={i}
                className="cookie__crumb"
                style={{ width: c.s, height: c.s }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 1 }}
                animate={{ x: c.x, y: c.y + 30, opacity: [0, 1, 1, 0], scale: [1, 1, 0.5] }}
                transition={{ delay: 0.58 + i * 0.015, duration: 0.75, ease: "easeOut" }}
                aria-hidden="true"
              />
            ))}

            {/* the fortune unfurls */}
            <motion.div
              className="cookie__slip"
              initial={{ opacity: 0, scale: 0.25, rotateX: 85, y: 30 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              transition={{ delay: 0.82, type: "spring", stiffness: 170, damping: 15 }}
            >
              <p className="cookie__text">“{quote.text}”</p>
              <p className="cookie__source">— {quote.source}</p>
            </motion.div>
          </div>
        )}

        <div className="cookie__actions">
          <button type="button" className="btn btn--small" onClick={again}>
            Crack another
          </button>
          <button type="button" className="btn btn--small" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
