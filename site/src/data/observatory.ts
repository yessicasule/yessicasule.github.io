/** Bodies of the observatory's solar system — Yessica's genuine research domains. */

export interface Body {
  id: string;
  kind: "star" | "planet" | "moon";
  name: string;
  blurb: string;
  anchor: string;
  anchorLabel: string;
}

export const BODIES: Record<string, Body> = {
  core: {
    id: "core",
    kind: "star",
    name: "The Core — Artificial Intelligence",
    blurb:
      "Everything here orbits one center of gravity: building AI systems that hold up " +
      "under real conditions — from perception pipelines to poisoning-resistant defenses.",
    anchor: "#about",
    anchorLabel: "About Yessica",
  },
  vision: {
    id: "vision",
    kind: "planet",
    name: "Computer Vision & Perception",
    blurb:
      "Real-time human motion tracking from a single camera — pose estimation, signal " +
      "filtering, UDP transport, and Unity visualization for rehabilitation robotics, " +
      "built at Wired Lab, IIT Bombay.",
    anchor: "#projects",
    anchorLabel: "View mission log",
  },
  spatial: {
    id: "spatial",
    kind: "planet",
    name: "Spatial Computing & Aerospace",
    blurb:
      "AR navigation where GPS can't follow, aircraft control systems with MATLAB/Simulink " +
      "(IIT Kanpur), and satellite remote sensing with IIRS/ISRO — engineering for the " +
      "physical world, indoors and above it.",
    anchor: "#projects",
    anchorLabel: "View mission log",
  },
  "green-ai": {
    id: "green-ai",
    kind: "moon",
    name: "Green AI — moon of Perception",
    blurb:
      "An energy-aware inference framework: fuzzy-logic routing that adapts model precision " +
      "(4- to 16-bit) to prompt complexity, cutting energy without losing quality.",
    anchor: "#projects",
    anchorLabel: "View mission log",
  },
  paper: {
    id: "paper",
    kind: "moon",
    name: "PR-FIDS — moon of Perception",
    blurb:
      "Co-authored research accepted at AISIIS 2026: a poisoning-resistant federated " +
      "intrusion detection system with an adaptive honeypot defense.",
    anchor: "#research",
    anchorLabel: "Read the research",
  },
};
