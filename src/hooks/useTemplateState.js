// 📁 Location: src/hooks/useTemplateState.js  ← NEW FILE
// Manages selected template with localStorage persistence.
// Key: "resumeBuilderTemplate"

import { useState, useCallback } from "react";
import { DEFAULT_TEMPLATE } from "../data/templates";

const LS_KEY = "resumeBuilderTemplate";

function loadTemplate() {
  try {
    return localStorage.getItem(LS_KEY) || DEFAULT_TEMPLATE;
  } catch {
    return DEFAULT_TEMPLATE;
  }
}

function saveTemplate(id) {
  try {
    localStorage.setItem(LS_KEY, id);
  } catch {}
}

export function useTemplateState() {
  const [template, setTemplateState] = useState(() => loadTemplate());

  const setTemplate = useCallback((id) => {
    setTemplateState(id);
    saveTemplate(id);
  }, []);

  return { template, setTemplate };
}
