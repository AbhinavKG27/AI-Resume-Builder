// 📁 Location: src/hooks/useAppTheme.js  ← NEW FILE
// Manages app-wide dark/light mode.
// Persists to localStorage under key "appThemeMode".
// Applies data-theme="dark" | "light" to document.documentElement.
// All CSS variables are overridden via [data-theme="light"] in global.css.

import { useState, useCallback, useEffect } from "react";

const LS_KEY = "appThemeMode";

function getInitial() {
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return "dark"; // default to dark
}

function applyTheme(mode) {
  document.documentElement.setAttribute("data-theme", mode);
}

export function useAppTheme() {
  const [mode, setMode] = useState(() => {
    const initial = getInitial();
    applyTheme(initial);
    return initial;
  });

  useEffect(() => {
    applyTheme(mode);
    try { localStorage.setItem(LS_KEY, mode); } catch {}
  }, [mode]);

  const toggle = useCallback(() => {
    setMode(m => m === "dark" ? "light" : "dark");
  }, []);

  return { mode, toggle, isDark: mode === "dark" };
}
