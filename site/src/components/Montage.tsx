/**
 * @deprecated This component has been replaced by AchievementsMontage.tsx.
 * Kept for reference only. Remove at next cleanup pass.
 */
import { useEffect, useState } from "react";
import { montage } from "../data/profile";

const INTERVAL_MS = 4000;

export function Montage() {
  const [reduced] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced || montage.length < 2) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % montage.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [reduced]);

  if (reduced) {
    return (
      <div className="montage-static">
        {montage.map((img) => (
          <img key={img.src} src={img.src} alt={img.alt} loading="lazy" />
        ))}
      </div>
    );
  }

  return (
    <div className="montage" role="img" aria-label="Photo montage of achievements">
      {montage.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt=""
          className={i === active ? "montage--active" : undefined}
        />
      ))}
    </div>
  );
}
