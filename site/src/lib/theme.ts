import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

const KEY = "ys-theme";
const EVENT = "ys-theme-change";

export function getTheme(): Theme {
  return localStorage.getItem(KEY) === "dark" ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(KEY, theme);
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getTheme);

  useEffect(() => {
    const sync = () => setThemeState(getTheme());
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  return [theme, applyTheme] as const;
}
