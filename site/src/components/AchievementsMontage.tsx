import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { MontageImage } from "../data/profile";
import { montage } from "../data/profile";

/* ─── Arrow SVG helpers ─── */

function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
}

/* ─── Lightbox ─── */

interface LightboxProps {
  images: MontageImage[];
  startIndex: number;
  onClose: () => void;
}

function Lightbox({ images, startIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex);

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return createPortal(
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="lightbox__content"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="lightbox__close" onClick={onClose} aria-label="Close lightbox">
          ✕
        </button>

        {images.length > 1 && (
          <>
            <button className="lightbox__nav lightbox__nav--prev" onClick={prev} aria-label="Previous image">
              <ArrowLeft />
            </button>
            <button className="lightbox__nav lightbox__nav--next" onClick={next} aria-label="Next image">
              <ArrowRight />
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index].src}
            alt={images[index].alt}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <span className="lightbox__counter">
            {index + 1} / {images.length}
          </span>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
}

/* ─── Marquee ─── */

export function AchievementsMontage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [reduced] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // Manual scroll via arrows
  const scroll = useCallback(
    (dir: "left" | "right") => {
      const track = trackRef.current;
      if (!track) return;
      // Pause and manually shift
      track.style.animationPlayState = "paused";
      const shift = dir === "left" ? -280 : 280;
      const current = track.getBoundingClientRect().left;
      const parent = track.parentElement?.getBoundingClientRect().left ?? 0;
      const offset = current - parent;
      track.style.animation = "none";
      track.style.transform = `translateX(${offset + shift}px)`;

      // Resume after a moment
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          track.style.animation = "";
          track.style.animationPlayState = "";
        });
      });
    },
    [],
  );

  // The images are duplicated for seamless infinite scroll
  const duplicated = [...montage, ...montage];
  const durationSec = montage.length * 5; // 5 seconds per image

  if (reduced) {
    return (
      <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginBottom: "var(--space-4)" }}>
        {montage.map((img, i) => (
          <div
            key={img.src}
            className="marquee__item"
            onClick={() => setLightboxIndex(i)}
            role="button"
            tabIndex={0}
            aria-label={`View ${img.alt}`}
            onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(i)}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
          </div>
        ))}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <Lightbox images={montage} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <>
      <div className="marquee-wrapper" role="region" aria-label="Achievement photo montage">
        <button
          className="marquee__arrow marquee__arrow--left"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <ArrowLeft />
        </button>
        <button
          className="marquee__arrow marquee__arrow--right"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <ArrowRight />
        </button>

        <div
          className="marquee__track"
          ref={trackRef}
          style={{ "--marquee-duration": `${durationSec}s` } as React.CSSProperties}
        >
          {duplicated.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="marquee__item"
              onClick={() => setLightboxIndex(i % montage.length)}
              role="button"
              tabIndex={0}
              aria-label={`View ${img.alt}`}
              onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(i % montage.length)}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={montage} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
