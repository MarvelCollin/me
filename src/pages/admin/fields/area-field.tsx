export function AreaField({ label, value, onChange, rows = 3, hint }: { label: string; value: string; onChange: (v: string) => void; rows?: number; hint?: string }) {
  return (
    <label className="fld">
      <span>{label}{hint && <em> {hint}</em>}</span>
      <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
