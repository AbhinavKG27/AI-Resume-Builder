import "./FormField.css";

// Generic input / textarea field used across the builder form
export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  rows = 3,
  hint,
}) {
  return (
    <div className="form-field">
      {label && <label className="form-label">{label}</label>}
      {type === "textarea" ? (
        <textarea
          className="form-input form-textarea"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <input
          className="form-input"
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
      {hint && <p className="form-hint">{hint}</p>}
    </div>
  );
}
