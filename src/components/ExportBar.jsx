// 📁 Location: src/components/ExportBar.jsx  ← FIXED
// Fix 1: Download PDF now triggers window.print() for real browser PDF save
// Fix 2: Print uses dedicated print-only class approach

import { useState } from "react";
import { generatePlainText, validateForExport } from "../utils/exportText";
import "./ExportBar.css";

export default function ExportBar({ resume }) {
  const [copyState,   setCopyState]   = useState("idle");
  const [showWarning, setShowWarning] = useState(false);
  const [warnings,    setWarnings]    = useState([]);
  const [toast,       setToast]       = useState(false);

  // ── Shared print trigger ──────────────────────────────────────────────────
  const triggerPrint = (validateFirst = true) => {
    if (validateFirst) {
      const w = validateForExport(resume);
      if (w.length > 0) {
        setWarnings(w);
        setShowWarning(true);
        setTimeout(() => window.print(), 400);
        return;
      }
    }
    setShowWarning(false);
    window.print();
  };

  // ── Download PDF — triggers real browser print dialog ────────────────────
  const handleDownloadPDF = () => {
    // Show toast first, then open print dialog (user saves as PDF)
    setToast(true);
    setTimeout(() => setToast(false), 3000);
    setTimeout(() => triggerPrint(false), 300);
  };

  // ── Print ─────────────────────────────────────────────────────────────────
  const handlePrint = () => triggerPrint(true);

  // ── Copy plain text ───────────────────────────────────────────────────────
  const handleCopy = async () => {
    const w = validateForExport(resume);
    setWarnings(w);
    setShowWarning(w.length > 0);
    try {
      await navigator.clipboard.writeText(generatePlainText(resume));
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2500);
    } catch {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 2500);
    }
  };

  return (
    <div className="export-bar">

      {/* Toast */}
      {toast && (
        <div className="export-toast">
          <span className="export-toast-icon">✓</span>
          Opening print dialog — choose "Save as PDF"
        </div>
      )}

      {/* Warning banner */}
      {showWarning && warnings.length > 0 && (
        <div className="export-warning">
          <div className="export-warning-inner">
            <span className="export-warning-icon">⚠</span>
            <div className="export-warning-body">
              <span className="export-warning-title">Your resume may look incomplete.</span>
              <ul className="export-warning-list">
                {warnings.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
            <button className="export-warning-dismiss" onClick={() => setShowWarning(false)}>✕</button>
          </div>
        </div>
      )}

      {/* Action row */}
      <div className="export-actions">
        <div className="export-actions-left">
          <span className="export-label">Export</span>
        </div>
        <div className="export-actions-right">

          <button
            className={`btn btn-ghost export-btn ${copyState === "copied" ? "copied" : ""} ${copyState === "error" ? "error" : ""}`}
            onClick={handleCopy}
          >
            {copyState === "copied" ? <><CheckIcon /> Copied!</>
             : copyState === "error" ? <><AlertIcon /> Copy failed</>
             : <><CopyIcon /> Copy as Text</>}
          </button>

          <button className="btn btn-ghost export-btn" onClick={handlePrint}>
            <PrintIcon /> Print
          </button>

          <button className="btn btn-primary export-btn" onClick={handleDownloadPDF}>
            <DownloadIcon /> Download PDF
          </button>

        </div>
      </div>

    </div>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}
function PrintIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9"/>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
      <rect x="6" y="14" width="12" height="8"/>
    </svg>
  );
}
function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
function AlertIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}
