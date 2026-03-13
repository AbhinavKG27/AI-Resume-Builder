// ArtifactUpload — drag-and-drop / click-to-browse zone.
// Uploading a file here is what unlocks the Next Step button.

import { useState } from "react";
import Icon from "./Icon";
import "./ArtifactUpload.css";

export default function ArtifactUpload({ stepId, artifact, onArtifact }) {
  const [drag, setDrag] = useState(false);
  const hasFile = !!artifact;

  const handleFile = (file) => {
    if (file) onArtifact(stepId, file);
  };

  return (
    <div className="workspace-card">
      <h3>Step Artifact — Upload to Unlock Next Step</h3>

      <div
        className={`upload-zone ${hasFile ? "has-file" : ""} ${drag ? "drag" : ""}`}
        onDragOver={e  => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e      => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
      >
        {/* Hidden file input covers the entire zone */}
        <input
          type="file"
          accept="image/*,.pdf,.md,.txt,.zip"
          onChange={e => handleFile(e.target.files[0])}
        />

        <div className="upload-icon">
          <Icon name={hasFile ? "check" : "upload"} size={28} />
        </div>

        <div className="upload-label">
          {hasFile
            ? `✓ ${artifact.name}`
            : "Drop your artifact here, or click to browse"}
        </div>

        <div className="upload-hint">
          {hasFile
            ? `Uploaded at ${new Date(artifact.ts).toLocaleTimeString()}`
            : "Screenshots, PDFs, Markdown, or ZIPs accepted"}
        </div>
      </div>
    </div>
  );
}
