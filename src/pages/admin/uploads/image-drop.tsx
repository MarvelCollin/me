import { useState } from 'react';
import { UploadModal } from './upload-modal';

export function ImageDrop({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fld">
      <span>{label}</span>
      <button type="button" className="img-trigger" onClick={() => setOpen(true)}>
        {value
          ? <img src={value} alt="" className="img-prev" />
          : <span className="img-hint">Click to add image</span>}
      </button>
      {value && (
        <div className="img-row">
          <button type="button" className="img-clear" onClick={() => onChange('')}>Remove</button>
        </div>
      )}
      {open && <UploadModal title={label} multiple={false} onClose={() => setOpen(false)} onAdd={onChange} />}
    </div>
  );
}
