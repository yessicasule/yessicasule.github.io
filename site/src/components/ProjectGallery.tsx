import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProjectMedia } from "../data/profile";

interface Props {
  media?: ProjectMedia[];
  /** Project name, used for alt text. */
  label: string;
}

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 34 : -34 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -34 : 34 }),
};

/**
 * One frame at a time, stepped with the arrows. Media keeps the numbering it
 * had on disk, so the sequence is whatever order the files were named in.
 *
 * The stage is a fixed height rather than a fixed aspect ratio: these captures
 * are a mix of phone screens and desktop dashboards, and a single ratio starves
 * one or the other.
 */
export function ProjectGallery({ media, label }: Props) {
  const [[i, dir], setPos] = useState<[number, number]>([0, 0]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const count = media?.length ?? 0;

  // Stepping away from a playing clip should stop it, not leave audio running.
  useEffect(() => {
    const v = videoRef.current;
    return () => {
      if (v && !v.paused) v.pause();
    };
  }, [i]);

  if (!media || count === 0) {
    return (
      <div className="shots">
        <div className="shots__empty" aria-hidden="true">
          <span>Screenshot</span>
        </div>
      </div>
    );
  }

  const idx = Math.min(i, count - 1);
  const item = media[idx];
  const step = (delta: number) => setPos(([prev]) => [(prev + delta + count) % count, delta]);
  const goTo = (n: number) => setPos(([prev]) => [n, n > prev ? 1 : -1]);

  return (
    <div className="gallery">
      <div
        className="gallery__stage"
        tabIndex={0}
        role="group"
        aria-label={`${label} media, ${idx + 1} of ${count}`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            step(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
        }}
      >
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={item.src}
            className="gallery__frame"
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {item.type === "video" ? (
              <video
                ref={videoRef}
                className="gallery__media"
                src={item.src}
                poster={item.poster}
                controls
                // metadata, not none: the browser can then show a real first
                // frame and duration instead of an inert black box.
                preload="metadata"
                playsInline
              />
            ) : (
              <img
                className="gallery__media"
                src={item.src}
                alt={`${label}, ${idx + 1} of ${count}`}
                loading="lazy"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              className="gallery__nav gallery__nav--prev"
              onClick={() => step(-1)}
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              className="gallery__nav gallery__nav--next"
              onClick={() => step(1)}
              aria-label="Next"
            >
              ›
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="gallery__bar">
          <span className="gallery__count">
            {idx + 1} / {count}
          </span>
          <div className="gallery__dots">
            {media.map((m, n) => (
              <button
                key={m.src}
                type="button"
                className={`gallery__dot${n === idx ? " gallery__dot--on" : ""}`}
                onClick={() => goTo(n)}
                aria-label={`Go to ${n + 1}`}
                aria-current={n === idx}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
