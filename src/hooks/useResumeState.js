// 📁 Location: src/hooks/useResumeState.js  ← MODIFIED (replace entire file)

import { useState, useCallback, useEffect } from "react";
import { EMPTY_DATA, SAMPLE_DATA } from "../data/sampleData";

const LS_KEY = "resumeBuilderData";

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return EMPTY_DATA;
    const parsed = JSON.parse(raw);
    return {
      personal:   { ...EMPTY_DATA.personal,   ...(parsed.personal   ?? {}) },
      summary:    parsed.summary    ?? "",
      education:  parsed.education  ?? [],
      experience: parsed.experience ?? [],
      projects:   parsed.projects   ?? [],
      skills:     parsed.skills     ?? "",
      links:      { ...EMPTY_DATA.links,       ...(parsed.links      ?? {}) },
    };
  } catch {
    return EMPTY_DATA;
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  } catch {}
}

export function useResumeState() {
  const [resume, setResume] = useState(() => loadFromStorage());

  useEffect(() => {
    saveToStorage(resume);
  }, [resume]);

  const loadSample = useCallback(() => setResume(SAMPLE_DATA), []);
  const clearAll   = useCallback(() => {
    setResume(EMPTY_DATA);
    localStorage.removeItem(LS_KEY);
  }, []);

  const setPersonal = useCallback((field, value) =>
    setResume(r => ({ ...r, personal: { ...r.personal, [field]: value } })), []);
  const setSummary = useCallback((value) =>
    setResume(r => ({ ...r, summary: value })), []);
  const setSkills = useCallback((value) =>
    setResume(r => ({ ...r, skills: value })), []);
  const setLinks = useCallback((field, value) =>
    setResume(r => ({ ...r, links: { ...r.links, [field]: value } })), []);

  const addEducation = useCallback(() =>
    setResume(r => ({ ...r, education: [...r.education, { id: makeId("edu"), institution: "", degree: "", year: "", grade: "" }] })), []);
  const updateEducation = useCallback((id, field, value) =>
    setResume(r => ({ ...r, education: r.education.map(e => e.id === id ? { ...e, [field]: value } : e) })), []);
  const removeEducation = useCallback((id) =>
    setResume(r => ({ ...r, education: r.education.filter(e => e.id !== id) })), []);

  const addExperience = useCallback(() =>
    setResume(r => ({ ...r, experience: [...r.experience, { id: makeId("exp"), company: "", role: "", duration: "", description: "" }] })), []);
  const updateExperience = useCallback((id, field, value) =>
    setResume(r => ({ ...r, experience: r.experience.map(e => e.id === id ? { ...e, [field]: value } : e) })), []);
  const removeExperience = useCallback((id) =>
    setResume(r => ({ ...r, experience: r.experience.filter(e => e.id !== id) })), []);

  const addProject = useCallback(() =>
    setResume(r => ({ ...r, projects: [...r.projects, { id: makeId("proj"), name: "", tech: "", description: "", link: "" }] })), []);
  const updateProject = useCallback((id, field, value) =>
    setResume(r => ({ ...r, projects: r.projects.map(p => p.id === id ? { ...p, [field]: value } : p) })), []);
  const removeProject = useCallback((id) =>
    setResume(r => ({ ...r, projects: r.projects.filter(p => p.id !== id) })), []);

  return {
    resume, loadSample, clearAll,
    setPersonal, setSummary, setSkills, setLinks,
    addEducation, updateEducation, removeEducation,
    addExperience, updateExperience, removeExperience,
    addProject, updateProject, removeProject,
  };
}
