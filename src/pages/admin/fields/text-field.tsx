export function TextField({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="fld">
      <span>{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
