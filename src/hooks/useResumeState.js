import { useState, useCallback } from "react";
import { EMPTY_DATA, SAMPLE_DATA } from "../data/sampleData";

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

export function useResumeState() {
  const [resume, setResume] = useState(EMPTY_DATA);

  // ── Load sample ──────────────────────────────────────────────────────────
  const loadSample = useCallback(() => setResume(SAMPLE_DATA), []);
  const clearAll   = useCallback(() => setResume(EMPTY_DATA),  []);

  // ── Personal / summary / skills / links (flat fields) ───────────────────
  const setPersonal = useCallback((field, value) =>
    setResume(r => ({ ...r, personal: { ...r.personal, [field]: value } })), []);

  const setSummary = useCallback((value) =>
    setResume(r => ({ ...r, summary: value })), []);

  const setSkills = useCallback((value) =>
    setResume(r => ({ ...r, skills: value })), []);

  const setLinks = useCallback((field, value) =>
    setResume(r => ({ ...r, links: { ...r.links, [field]: value } })), []);

  // ── Education ────────────────────────────────────────────────────────────
  const addEducation = useCallback(() =>
    setResume(r => ({
      ...r,
      education: [...r.education, { id: makeId("edu"), institution: "", degree: "", year: "", grade: "" }],
    })), []);

  const updateEducation = useCallback((id, field, value) =>
    setResume(r => ({
      ...r,
      education: r.education.map(e => e.id === id ? { ...e, [field]: value } : e),
    })), []);

  const removeEducation = useCallback((id) =>
    setResume(r => ({ ...r, education: r.education.filter(e => e.id !== id) })), []);

  // ── Experience ───────────────────────────────────────────────────────────
  const addExperience = useCallback(() =>
    setResume(r => ({
      ...r,
      experience: [...r.experience, { id: makeId("exp"), company: "", role: "", duration: "", description: "" }],
    })), []);

  const updateExperience = useCallback((id, field, value) =>
    setResume(r => ({
      ...r,
      experience: r.experience.map(e => e.id === id ? { ...e, [field]: value } : e),
    })), []);

  const removeExperience = useCallback((id) =>
    setResume(r => ({ ...r, experience: r.experience.filter(e => e.id !== id) })), []);

  // ── Projects ─────────────────────────────────────────────────────────────
  const addProject = useCallback(() =>
    setResume(r => ({
      ...r,
      projects: [...r.projects, { id: makeId("proj"), name: "", tech: "", description: "", link: "" }],
    })), []);

  const updateProject = useCallback((id, field, value) =>
    setResume(r => ({
      ...r,
      projects: r.projects.map(p => p.id === id ? { ...p, [field]: value } : p),
    })), []);

  const removeProject = useCallback((id) =>
    setResume(r => ({ ...r, projects: r.projects.filter(p => p.id !== id) })), []);

  return {
    resume,
    loadSample,
    clearAll,
    setPersonal,
    setSummary,
    setSkills,
    setLinks,
    addEducation,    updateEducation,    removeEducation,
    addExperience,   updateExperience,   removeExperience,
    addProject,      updateProject,      removeProject,
  };
}
