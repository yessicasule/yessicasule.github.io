import { type ReactNode, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionProps {
  id: string;
  kicker?: string;
  title: string;
  wash?: boolean;
  children: ReactNode;
}

export function Section({ id, kicker, title, wash, children }: SectionProps) {
  const reduced = useReducedMotion();
  const [hasRevealed, setHasRevealed] = useState(false);

  return (
    <section id={id} className={`section${wash ? " section--wash" : ""}`} aria-labelledby={`${id}-title`}>
      <motion.div
        className="container"
        initial={reduced ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => setHasRevealed(true)}
        style={hasRevealed ? { opacity: 1, transform: "none" } : undefined}
      >
        {kicker && <p className="section__kicker">{kicker}</p>}
        <h2 className="section__title" id={`${id}-title`}>
          {title}
        </h2>
        {children}
      </motion.div>
    </section>
  );
}
