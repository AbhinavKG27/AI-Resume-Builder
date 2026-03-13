// 📁 Location: src/hooks/useThemeState.js  ← NEW FILE
// Persists selected color theme in localStorage.
// Injects --rv-accent CSS variable onto document root whenever theme changes.
// All resume templates read --rv-accent for headings, borders, sidebar bg.

import { useState, useCallback, useEffect } from "react";
import { THEMES, DEFAULT_THEME } from "../data/themes";

const LS_KEY = "resumeBuilderTheme";

function findTheme(id) {
  return THEMES.find(t => t.id === id) ?? THEMES.find(t => t.id === DEFAULT_THEME);
}

function loadTheme() {
  try {
    return localStorage.getItem(LS_KEY) || DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function applyThemeToDom(themeId) {
  const t = findTheme(themeId);
  if (!t) return;
  const root = document.documentElement;
  // Primary accent used by resume
  root.style.setProperty("--rv-accent",       t.color);
  root.style.setProperty("--rv-accent-h",     String(t.css.h));
  root.style.setProperty("--rv-accent-s",     t.css.s);
  root.style.setProperty("--rv-accent-l",     t.css.l);
  // Lighter variant for sidebar bg (Modern template)
  root.style.setProperty("--rv-sidebar-bg",   `hsl(${t.css.h}, ${t.css.s}, ${t.css.l})`);
  // Soft tint for skill chips in sidebar
  root.style.setProperty("--rv-accent-tint",  `hsl(${t.css.h}, ${t.css.s}, 92%)`);
  root.style.setProperty("--rv-accent-text",  `hsl(${t.css.h}, ${t.css.s}, 18%)`);
}

export function useThemeState() {
  const [themeId, setThemeId] = useState(() => loadTheme());

  // Apply on mount + whenever themeId changes
  useEffect(() => {
    applyThemeToDom(themeId);
  }, [themeId]);

  const setTheme = useCallback((id) => {
    setThemeId(id);
    try { localStorage.setItem(LS_KEY, id); } catch {}
  }, []);

  return { themeId, setTheme, themes: THEMES };
}
