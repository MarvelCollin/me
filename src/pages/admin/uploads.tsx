import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, ClipboardEvent, DragEvent } from 'react';
import { uploadImage } from '../../lib/storage';

function filesFromClipboard(e: ClipboardEvent<HTMLDivElement>): File[] {
  return Array.from(e.clipboardData.items)
    .filter((i) => i.type.startsWith('image/'))
    .map((i) => i.getAsFile())
    .filter((f): f is File => f !== null);
}

export function UploadModal({ title, multiple, onClose, onAdd }: { title: string; multiple: boolean; onClose: () => void; onAdd: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => { boxRef.current?.focus(); }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const upload = async (files: File[]) => {
    setBusy(true); setErr('');
    try {
      for (const f of files) {
        if (!f.type.startsWith('image/')) continue;
        const url = await uploadImage(f);
        onAdd(url);
        if (!multiple) { onClose(); return; }
      }
    } catch (x) {
      setErr(x instanceof Error ? x.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLDivElement>) => {
    const files = filesFromClipboard(e);
    if (files.length) { e.preventDefault(); upload(files); }
  };
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) upload(Array.from(e.dataTransfer.files));
  };
  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) upload(Array.from(e.target.files));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        ref={boxRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onPaste={onPaste}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="modal-head">
          <h3>{title}{busy && <em> uploading…</em>}</h3>
          <button type="button" className="modal-x" onClick={onClose} aria-label="Close">×</button>
        </div>
        <label className="modal-drop">
          <span>{busy ? 'Uploading…' : 'Paste a screenshot with Ctrl+V, drop a file here, or click to browse'}</span>
          <input type="file" accept="image/*" multiple={multiple} onChange={onFile} />
        </label>
        {err && <p className="adm-err">{err}</p>}
        {multiple && <p className="modal-hint">Add as many as you like, then close.</p>}
      </div>
    </div>
  );
}

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

export function MultiImageDrop({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const valueRef = useRef(value);
  valueRef.current = value;

  const add = (url: string) => onChange([...valueRef.current, url]);
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i));

  return (
    <div className="fld">
      <span>{label}</span>
      {value.length > 0 && (
        <div className="img-grid">
          {value.map((url, i) => (
            <div className="img-cell" key={i}>
              <img src={url} alt="" />
              <button type="button" onClick={() => remove(i)}>×</button>
            </div>
          ))}
        </div>
      )}
      <button type="button" className="img-add" onClick={() => setOpen(true)}>+ Add images</button>
      {open && <UploadModal title={label} multiple onClose={() => setOpen(false)} onAdd={add} />}
    </div>
  );
}
