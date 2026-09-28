import { DISCOVERIES, useDiscoveries } from "../lib/discoveries";

interface ConstellationPanelProps {
  open: boolean;
  onClose: () => void;
}

/** Star positions for the 5 discoveries, drawn as a small constellation. */
const STARS: Array<{ x: number; y: number }> = [
  { x: 24, y: 88 },
  { x: 66, y: 56 },
  { x: 118, y: 72 },
  { x: 164, y: 30 },
  { x: 216, y: 48 },
];

export function ConstellationPanel({ open, onClose }: ConstellationPanelProps) {
  const found = useDiscoveries();

  if (!open) return null;

  return (
    <div className="constellation-overlay" role="dialog" aria-modal="true" aria-label="Your constellation" onClick={onClose}>
      <div className="constellation" onClick={(e) => e.stopPropagation()}>
        <div className="constellation__head">
          <h3>Your constellation</h3>
          <button type="button" className="terminal__close" onClick={onClose} aria-label="Close panel">
            ✕
          </button>
        </div>
        <p className="constellation__sub">
          {found.size} of {DISCOVERIES.length} stars lit — explore the observatory to light the rest.
        </p>
        <svg viewBox="0 0 240 110" className="constellation__chart" role="img" aria-label={`Constellation chart: ${found.size} of ${DISCOVERIES.length} stars lit`}>
          <polyline
            points={STARS.map((s) => `${s.x},${s.y}`).join(" ")}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 4"
            opacity="0.35"
          />
          {DISCOVERIES.map((d, i) => {
            const lit = found.has(d.id);
            return (
              <g key={d.id}>
                {lit && <circle cx={STARS[i].x} cy={STARS[i].y} r="7" className="constellation__glow" />}
                <circle cx={STARS[i].x} cy={STARS[i].y} r="3" className={lit ? "constellation__star constellation__star--lit" : "constellation__star"} />
              </g>
            );
          })}
        </svg>
        <ul className="constellation__list">
          {DISCOVERIES.map((d) => {
            const lit = found.has(d.id);
            return (
              <li key={d.id} className={lit ? "constellation__item constellation__item--lit" : "constellation__item"}>
                <span aria-hidden="true">{lit ? "✦" : "✧"}</span>
                <span>
                  <strong>{lit ? d.label : "———"}</strong> · {d.hint}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
