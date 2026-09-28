import { useEffect, useState } from "react";

/**
 * Visitor-side exploration rewards — separate from Yessica's real achievements.
 * Finding hidden corners of the site lights up stars in a small constellation.
 */
export const DISCOVERIES = [
  { id: "stargazer", label: "Stargazer", hint: "Chart a body in the observatory" },
  { id: "surveyor", label: "Surveyor", hint: "Open a mission log" },
  { id: "archivist", label: "Archivist", hint: "Consult the published archives" },
  { id: "operator", label: "Operator", hint: "Find the hidden console" },
  { id: "fortune", label: "Fortune Seeker", hint: "Crack open a fortune" },
  { id: "portrait", label: "Portrait Subject", hint: "Sit for the station photobooth" },
] as const;

export type DiscoveryId = (typeof DISCOVERIES)[number]["id"];

const KEY = "ys-discoveries";
const EVENT = "ys-discovery";

export function getDiscovered(): Set<string> {
  try {
    return new Set<string>(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
  } catch {
    return new Set();
  }
}

export function discover(id: DiscoveryId) {
  const found = getDiscovered();
  if (found.has(id)) return;
  found.add(id);
  localStorage.setItem(KEY, JSON.stringify([...found]));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useDiscoveries() {
  const [found, setFound] = useState<Set<string>>(getDiscovered);

  useEffect(() => {
    const sync = () => setFound(getDiscovered());
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  return found;
}
