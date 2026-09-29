import { useEffect, useRef, useState } from "react";
import type { ProjectMedia } from "../data/profile";

interface Props {
  media?: ProjectMedia[];
  /** Project name, used for alt text. */
  label: string;
}

/**
 * One frame at a time, stepped with the arrows. Media keeps the numbering it
 * had on disk, so the sequence is whatever order the files were named in.
 *
 * Videos never preload — a clip only downloads once someone presses play.
 */
export function ProjectGallery({ media, label }: Props) {
  const [i, setI] = useState(0);
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

  const item = media[Math.min(i, count - 1)];
  const step = (delta: number) => setI((prev) => (prev + delta + count) % count);

  return (
    <div className="gallery">
      <div
        className="gallery__stage"
        tabIndex={0}
        role="group"
        aria-label={`${label} media, ${i + 1} of ${count}`}
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
        {item.type === "video" ? (
          <video
            key={item.src}
            ref={videoRef}
            className="gallery__media"
            src={item.src}
            poster={item.poster}
            controls
            preload="none"
            playsInline
          />
        ) : (
          <img
            key={item.src}
            className="gallery__media"
            src={item.src}
            alt={`${label}, ${i + 1} of ${count}`}
            loading="lazy"
          />
        )}

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
            {i + 1} / {count}
          </span>
          <div className="gallery__dots">
            {media.map((m, n) => (
              <button
                key={m.src}
                type="button"
                className={`gallery__dot${n === i ? " gallery__dot--on" : ""}`}
                onClick={() => setI(n)}
                aria-label={`Go to ${n + 1}`}
                aria-current={n === i}
              />
            ))}
          </div>
          <button type="button" className="gallery__next-btn" onClick={() => step(1)}>
            Next ›
          </button>
        </div>
      )}
    </div>
  );
}
