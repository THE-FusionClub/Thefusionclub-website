export type ThemeMode = "day" | "night";

const STORAGE_KEY = "tfc-theme";

export function getStoredTheme(): ThemeMode | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  if (v === "day" || v === "night") return v;
  return null;
}

export function applyTheme(mode: ThemeMode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (mode === "night") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined") return "day";
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "night"
    : "day";
}

export function setStoredTheme(mode: ThemeMode) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, mode);
}

