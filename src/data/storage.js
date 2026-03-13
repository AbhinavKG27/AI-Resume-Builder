// Simple sessionStorage wrapper
// All project data is stored per-session under these keys:
//   rb_artifacts   → { rb_step_1_artifact: { name, size, ts }, ... }
//   rb_screenshots → { rb_step_1_ss: { name, ts }, ... }
//   rb_feedback    → { 1: "worked" | "error", ... }
//   rb_proof_links → { lovable: "", github: "", deploy: "" }

export const storage = {
  get(key) {
    try {
      return JSON.parse(sessionStorage.getItem(key));
    } catch {
      return null;
    }
  },

  set(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      // sessionStorage unavailable (private mode etc.) — fail silently
    }
  },
};
