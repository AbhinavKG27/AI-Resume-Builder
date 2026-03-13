// 📁 Location: src/data/templates.js  ← NEW FILE
// Template definitions — layout/style metadata only.
// Content and scoring logic are completely unaffected by template choice.

export const TEMPLATES = [
  {
    id: "classic",
    label: "Classic",
    description: "Traditional serif layout. Safe for all industries.",
  },
  {
    id: "modern",
    label: "Modern",
    description: "Clean sans-serif with subtle left accent bar.",
  },
  {
    id: "minimal",
    label: "Minimal",
    description: "Maximum whitespace. Let the content breathe.",
  },
];

export const DEFAULT_TEMPLATE = "classic";
