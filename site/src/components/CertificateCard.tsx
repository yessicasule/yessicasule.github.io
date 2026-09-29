import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  href: string;
  preview: string;
  label: string;
}

/**
 * A certificate that sits beside the thing it belongs to: a thumbnail that
 * expands in place, with the PDF one click away for anyone who wants the
 * original.
 */
export function CertificateCard({ href, preview, label }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <figure className={`cert${open ? " cert--open" : ""}`}>
      <button
        type="button"
        className="cert__toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <img className="cert__thumb" src={preview} alt={label} loading="lazy" />
        <span className="cert__bar">
          <span className="cert__label">{label}</span>
          <motion.span
            className="cert__chev"
            aria-hidden="true"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            ⌄
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="cert__full"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.22 },
            }}
            style={{ overflow: "hidden" }}
          >
            <img src={preview} alt={`${label}, full view`} />
            <a className="btn btn--small" href={href} target="_blank" rel="noreferrer">
              Open PDF
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
}
