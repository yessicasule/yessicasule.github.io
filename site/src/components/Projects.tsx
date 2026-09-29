import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "../data/profile";
import { ProjectGallery } from "./ProjectGallery";
import { discover } from "../lib/discoveries";
import { Section } from "./Section";

const panelVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
      opacity: { duration: 0.25, delay: 0.1 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      opacity: { duration: 0.15 },
      height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
    },
  },
};

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  // The Explorer terminal's `open <id>` command lands here.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (projects.some((p) => p.id === id)) {
        setOpenId(id);
        discover("surveyor");
      }
    };
    window.addEventListener("ys-open-project", onOpen);
    return () => window.removeEventListener("ys-open-project", onOpen);
  }, []);

  const row = (p: Project) => {
    const open = openId === p.id;
    return (
      <article className={`acc__item${open ? " acc__item--open" : ""}`} key={p.id}>
        <h4 style={{ margin: 0 }}>
          <button
            type="button"
            className="acc__trigger"
            aria-expanded={open}
            aria-controls={`panel-${p.id}`}
            onClick={() => {
              setOpenId(open ? null : p.id);
              if (!open) discover("surveyor");
            }}
          >
            <span className="acc__name">{p.short}</span>
            <span className="acc__domain">{p.domain}</span>
            <motion.svg
              className="acc__chevron"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </button>
        </h4>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`panel-${p.id}`}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ overflow: "hidden" }}
            >
              <div className="acc__panel-inner">
                <div className="acc__col-text">
                <p className="acc__full-title">{p.title}</p>
                <p>{p.overview}</p>
                {p.problem && (
                  <div className="case">
                    <h5 className="case__label">The problem</h5>
                    <p>{p.problem}</p>
                  </div>
                )}
                {p.details && (
                  <div className="case">
                    <h5 className="case__label">Approach</h5>
                    <p>{p.details}</p>
                  </div>
                )}
                {p.challenges && (
                  <div className="case">
                    <h5 className="case__label">What made it hard</h5>
                    <p>{p.challenges}</p>
                  </div>
                )}
                {p.outcomes && (
                  <div className="case">
                    <h5 className="case__label">Outcome</h5>
                    <p>{p.outcomes}</p>
                  </div>
                )}
                <ul className="chips" aria-label="Technology stack">
                  {p.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                </div>

                <div className="acc__col-media">
                <ProjectGallery media={p.media} label={p.short} />
                {(p.github || p.paperLink || p.demoLink) && (
                  <div className="acc__links">
                    {p.github && (
                      <a className="btn btn--small" href={p.github} target="_blank" rel="noreferrer">
                        GitHub
                      </a>
                    )}
                    {p.paperLink && (
                      <a className="btn btn--small" href={p.paperLink} target="_blank" rel="noreferrer">
                        Research Paper
                      </a>
                    )}
                    {p.demoLink && (
                      <a className="btn btn--small" href={p.demoLink} target="_blank" rel="noreferrer">
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    );
  };

  return (
    <Section id="projects" title="Projects">
      <h3 className="group__label">Selected work</h3>
      <div className="acc">{featured.map(row)}</div>

      {other.length > 0 && (
        <>
          <h3 className="group__label group__label--muted">Also built</h3>
          <div className="acc acc--muted">{other.map(row)}</div>
        </>
      )}
    </Section>
  );
}
