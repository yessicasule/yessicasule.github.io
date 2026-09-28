import { motion } from "framer-motion";

export type CrewAction = "terminal" | "theme-light" | "fortune";

/**
 * The full crew stands after Education, in the classic order.
 * Only the two Sith open the door to Explorer Mode — the others keep watch.
 */
const crew = [
  { id: "obi-wan", name: "Obi-Wan Kenobi", image: "assets/lego/obi-wan.png", gate: false, action: "theme-light" as CrewAction },
  { id: "darth-vader", name: "Darth Vader", image: "assets/lego/darth-vader.png", gate: true },
  { id: "r2d2", name: "R2-D2", image: "assets/lego/r2d2.png", gate: false, action: "terminal" as CrewAction },
  { id: "darth-maul", name: "Darth Maul", image: "assets/lego/darth-maul.png", gate: true },
  { id: "jar-jar", name: "Jar Jar Binks", image: "assets/lego/jar-jar.png", gate: false, action: "fortune" as CrewAction },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const figureVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface LegoExplorersProps {
  onAction?: (action: CrewAction) => void;
}

export function LegoExplorers({ onAction }: LegoExplorersProps) {
  const enterExplorer = () => {
    window.location.hash = "#/explorer";
  };

  return (
    <section id="explorers" className="section" aria-label="The crew">
      <div className="container">
        <motion.div
          className="lego-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {crew.map((c) =>
            c.gate ? (
              <motion.button
                key={c.id}
                className="lego-figure"
                variants={figureVariants}
                onClick={enterExplorer}
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`${c.name} — enter Explorer Mode`}
              >
                <div className="lego-figure__img-wrap">
                  <img src={c.image} alt="" />
                </div>
                <span className="lego-figure__name">{c.name}</span>
              </motion.button>
            ) : (
              <motion.button
                key={c.id}
                className="lego-figure"
                variants={figureVariants}
                onClick={() => c.action && onAction?.(c.action)}
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={c.name}
              >
                <div className="lego-figure__img-wrap">
                  <img src={c.image} alt={c.name} />
                </div>
                <span className="lego-figure__name">{c.name}</span>
              </motion.button>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
}
