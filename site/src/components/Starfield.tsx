import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
}

/**
 * Full-page ambient canvas. Dark theme: twinkling stars. Light theme: drifting
 * warm motes. Listens for the terminal's `hyperspace` command to briefly warp.
 * Renders a single static frame under prefers-reduced-motion.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let raf = 0;
    let warpUntil = 0;

    const seed = () => {
      const count = Math.min(280, Math.floor((canvas.width * canvas.height) / 8200));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0.4 + Math.random() * 1.4,
        vx: -0.02 - Math.random() * 0.05,
        vy: 0.01 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.2,
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      seed();
      if (reduced) draw(0);
    };

    const draw = (t: number) => {
      const dark = document.documentElement.dataset.theme === "dark";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const warping = t < warpUntil;

      for (const s of stars) {
        const tw = reduced ? 0.75 : 0.55 + 0.45 * Math.sin(s.phase + (t / 1000) * s.speed);
        if (dark) {
          ctx.fillStyle = `rgba(252, 255, 235, ${0.25 + 0.6 * tw})`;
        } else {
          ctx.fillStyle = `rgba(168, 85, 36, ${0.08 + 0.14 * tw})`;
        }

        if (warping && dark) {
          ctx.fillRect(s.x, s.y, 26 * s.speed, s.r);
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }

        if (!reduced) {
          const boost = warping ? 40 : 1;
          s.x += s.vx * s.speed * boost;
          s.y += s.vy * s.speed;
          if (s.x < -30) s.x = canvas.width + 5;
          if (s.y > canvas.height + 5) s.y = -5;
        }
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onWarp = () => {
      warpUntil = performance.now() + 2200;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("ys-hyperspace", onWarp);
    if (!reduced) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("ys-hyperspace", onWarp);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
