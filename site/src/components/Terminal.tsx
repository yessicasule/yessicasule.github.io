import { useEffect, useRef, useState } from "react";
import { identity, projects, paper } from "../data/profile";
import { discover } from "../lib/discoveries";
import { applyTheme } from "../lib/theme";

interface TerminalProps {
  open: boolean;
  onClose: () => void;
}

interface Line {
  text: string;
  kind: "in" | "out";
}

const WELCOME = [
  "GALACTIC EMPIRE DEATH STAR CONSOLE",
  "Unauthorized access is… encouraged.",
  "Type 'help' to begin.",
];

function respond(cmd: string): { out: string[]; close?: boolean } {
  const [name, ...rest] = cmd.trim().split(/\s+/);
  const arg = rest.join(" ").toLowerCase();

  switch (name.toLowerCase()) {
    case "help":
      return {
        out: [
          "Available commands:",
          "  whoami            who runs this observatory",
          "  projects          list mission logs",
          "  open <id>         open a mission log on the main desk",
          "  paper             read the published research (PDF)",
          "  contact           how to reach Yessica",
          "  theme dark|light  switch the observatory lights",
          "  clear             wipe the console",
          "  exit              close the console",
          "…and a few commands that are not on this list.",
        ],
      };
    case "whoami":
      return {
        out: [
          `${identity.name} — ${identity.tagline}.`,
          `${identity.role}. ${identity.location}.`,
          "Willing to learn. Will deliver results.",
        ],
      };
    case "ls":
    case "projects":
      return {
        out: [
          "Mission logs:",
          ...projects.map((p) => `  ${p.id.padEnd(24)} ${p.short}`),
          "Use: open <id>",
        ],
      };
    case "open": {
      const target = projects.find((p) => p.id === arg || p.short.toLowerCase() === arg);
      if (!target) return { out: [`No mission log named '${arg}'. Try 'projects'.`] };
      window.dispatchEvent(new CustomEvent("ys-open-project", { detail: target.id }));
      window.location.hash = "#projects";
      return { out: [`Opening mission log: ${target.title}`], close: true };
    }
    case "paper":
      discover("archivist");
      window.open(paper.pdfHref, "_blank", "noreferrer");
      return { out: [`Opening: ${paper.title} (${paper.venue}, ${paper.role}).`] };
    case "contact":
      return {
        out: [
          `email     ${identity.email}`,
          `linkedin  ${identity.linkedin}`,
          `github    ${identity.github}`,
        ],
      };
    case "theme":
      if (arg === "dark" || arg === "light") {
        applyTheme(arg);
        return { out: [arg === "dark" ? "Lights out. Welcome to deep space." : "Sunrise restored."] };
      }
      return { out: ["Usage: theme dark|light"] };
    case "archives":
      return {
        out: [
          "ARCHIVES: 5 mission logs, 1 published paper, 4 instrument ratings.",
          "If an item does not appear in our records, it does not exist.",
        ],
      };
    case "holocron":
      return {
        out: ["Holocron unlocked. It contains a single line:", "  'Your focus determines your reality.'"],
      };
    case "hyperspace":
      window.dispatchEvent(new CustomEvent("ys-hyperspace"));
      return { out: ["Punch it."] };
    case "exit":
      return { out: [], close: true };
    case "clear":
      return { out: ["__CLEAR__"] };
    case "":
      return { out: [] };
    default:
      return { out: [`command not found: ${name} — try 'help'`] };
  }
}

export function Terminal({ open, onClose }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>(WELCOME.map((text) => ({ text, kind: "out" })));
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      discover("operator");
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, open]);

  if (!open) return null;

  const submit = () => {
    const cmd = value;
    setValue("");
    const { out, close } = respond(cmd);
    if (out[0] === "__CLEAR__") {
      setLines([]);
      return;
    }
    setLines((prev) => [
      ...prev,
      { text: `> ${cmd}`, kind: "in" as const },
      ...out.map((text) => ({ text, kind: "out" as const })),
    ]);
    if (close) onClose();
  };

  return (
    <div className="terminal-overlay" role="dialog" aria-modal="true" aria-label="Observatory console">
      <div className="terminal">
        <div className="terminal__bar">
          <span>observatory — console</span>
          <button type="button" className="terminal__close" onClick={onClose} aria-label="Close console">
            ✕
          </button>
        </div>
        <div className="terminal__scroll" ref={scrollRef}>
          {lines.map((l, i) => (
            <p key={i} className={`terminal__line terminal__line--${l.kind}`}>
              {l.text}
            </p>
          ))}
        </div>
        <form
          className="terminal__input-row"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <span aria-hidden="true">❯</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
            }}
            spellCheck={false}
            autoComplete="off"
            aria-label="Console command"
          />
        </form>
      </div>
    </div>
  );
}
