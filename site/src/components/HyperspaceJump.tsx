import { useEffect, useRef, useState } from "react";

interface HyperspaceJumpProps {
  onDone: () => void;
}

/** Full-screen hyperspace warp played when entering Explorer Mode. */
export function HyperspaceJump({ onDone }: HyperspaceJumpProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      onDone();
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const stars = Array.from({ length: 220 }, () => {
      const angle = Math.random() * Math.PI * 2;
      return {
        angle,
        dist: 20 + Math.random() * Math.min(cx, cy) * 0.4,
        speed: 1.5 + Math.random() * 2.5,
      };
    });

    let raf = 0;
    const start = performance.now();

    const loop = (t: number) => {
      const elapsed = t - start;
      ctx.fillStyle = "rgba(6, 5, 12, 0.35)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(220, 230, 255, 0.85)";
      ctx.lineWidth = 1.6;

      for (const s of stars) {
        const prev = s.dist;
        s.speed *= 1.045;
        s.dist += s.speed;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(s.angle) * prev, cy + Math.sin(s.angle) * prev);
        ctx.lineTo(cx + Math.cos(s.angle) * s.dist, cy + Math.sin(s.angle) * s.dist);
        ctx.stroke();
        if (s.dist > Math.max(cx, cy) * 1.6) {
          s.dist = 20 + Math.random() * 60;
          s.speed = 1.5 + Math.random() * 2.5;
        }
      }

      if (elapsed < 1500) {
        raf = requestAnimationFrame(loop);
      } else {
        setFading(true);
        setTimeout(onDone, 480);
      }
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className={`warp${fading ? " warp--fade" : ""}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
