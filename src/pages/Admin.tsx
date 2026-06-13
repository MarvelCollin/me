import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { FormEvent, ClipboardEvent, DragEvent, ChangeEvent, ReactNode } from 'react';
import { useContent } from '../content/store';
import { isAuthed, login, logout } from '../lib/auth';
import { TONE_NAMES } from '../content/tones';
import { uploadImage } from '../lib/storage';
import * as api from '../lib/api';
import type { Project } from '../types';

type Tab = 'works' | 'skills' | 'experience' | 'education' | 'recognition';

const lines = (v: string): string[] => v.split('\n').map((s) => s.trim()).filter(Boolean);
const unlines = (v: string[]): string => v.join('\n');

const ToastCtx = createContext<(message: string) => void>(() => {});
const useToast = () => useContext(ToastCtx);

function ToastHost({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const push = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toast-host">
        {toasts.map((t) => <div className="toast" key={t.id}>{t.message}</div>)}
      </div>
    </ToastCtx.Provider>
  );
}

function TextField({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="fld">
      <span>{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function AreaField({ label, value, onChange, rows = 3, hint }: { label: string; value: string; onChange: (v: string) => void; rows?: number; hint?: string }) {
  return (
    <label className="fld">
      <span>{label}{hint && <em> {hint}</em>}</span>
      <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="fld">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function filesFromClipboard(e: ClipboardEvent<HTMLDivElement>): File[] {
  return Array.from(e.clipboardData.items)
    .filter((i) => i.type.startsWith('image/'))
    .map((i) => i.getAsFile())
    .filter((f): f is File => f !== null);
}

function UploadModal({ title, multiple, onClose, onAdd }: { title: string; multiple: boolean; onClose: () => void; onAdd: (url: string) => void }) {
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

function ImageDrop({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) {
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

function MultiImageDrop({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
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

interface WorkForm {
  slug: string; num: string; name: string; year: string; role: string; stack: string;
  client: string; tag: string; desc: string; brief: string; body: string; result: string;
  tone: string; stills: string; cover: string; images: string;
}

const emptyWork: WorkForm = {
  slug: '', num: '', name: '', year: '', role: '', stack: '', client: '', tag: 'client',
  desc: '', brief: '', body: '', result: '', tone: 'warm', stills: '', cover: '', images: '',
};

function workToForm(p: Project): WorkForm {
  return {
    slug: p.slug, num: p.num, name: p.name, year: p.year, role: p.role, stack: p.stack,
    client: p.client, tag: p.tag, desc: p.desc, brief: p.brief, body: unlines(p.body),
    result: p.result, tone: p.tone, stills: unlines(p.stills), cover: p.cover ?? '',
    images: unlines(p.images ?? []),
  };
}

function formToWork(f: WorkForm): api.WorkInput {
  return {
    slug: f.slug.trim(), num: f.num.trim(), name: f.name.trim(), year: f.year.trim(),
    role: f.role.trim(), stack: f.stack.trim(), client: f.client.trim(), tag: f.tag,
    desc: f.desc.trim(), brief: f.brief.trim(), body: lines(f.body), result: f.result.trim(),
    tone: f.tone, stills: lines(f.stills), cover: f.cover.trim() || undefined,
    images: lines(f.images),
  };
}

function WorksSection() {
  const { works, refresh } = useContent();
  const toast = useToast();
  const [form, setForm] = useState<WorkForm>(emptyWork);
  const [editId, setEditId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k: keyof WorkForm) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const reset = () => { setForm(emptyWork); setEditId(null); setErr(''); };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const input = formToWork(form);
      if (editId) await api.updateWork(editId, input);
      else await api.createWork(input);
      await refresh();
      toast(editId ? 'Project updated' : 'Project created');
      reset();
    } catch (x) {
      setErr(x instanceof Error ? x.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    setBusy(true); setErr('');
    try {
      await api.deleteWork(id);
      await refresh();
      toast('Project deleted');
      if (editId === id) reset();
    } catch (x) {
      setErr(x instanceof Error ? x.message : 'Delete failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="adm-grid">
      <form className="adm-form" onSubmit={save}>
        <h3>{editId ? 'Edit work' : 'New work'}</h3>
        <div className="row2">
          <TextField label="Slug" value={form.slug} onChange={set('slug')} />
          <TextField label="Num" value={form.num} onChange={set('num')} />
        </div>
        <div className="row2">
          <TextField label="Name" value={form.name} onChange={set('name')} />
          <TextField label="Year" value={form.year} onChange={set('year')} />
        </div>
        <div className="row2">
          <TextField label="Role" value={form.role} onChange={set('role')} />
          <TextField label="Stack" value={form.stack} onChange={set('stack')} />
        </div>
        <div className="row2">
          <TextField label="Client" value={form.client} onChange={set('client')} />
          <SelectField label="Tag" value={form.tag} onChange={set('tag')} options={['client', 'product', 'personal']} />
        </div>
        <TextField label="Desc" value={form.desc} onChange={set('desc')} />
        <TextField label="Brief" value={form.brief} onChange={set('brief')} />
        <AreaField label="Body" hint="(one paragraph per line)" value={form.body} onChange={set('body')} rows={5} />
        <TextField label="Result" value={form.result} onChange={set('result')} />
        <SelectField label="Tone" value={form.tone} onChange={set('tone')} options={TONE_NAMES} />
        <ImageDrop label="Cover" value={form.cover} onChange={set('cover')} />
        <AreaField label="Stills" hint="(one per line)" value={form.stills} onChange={set('stills')} />
        <MultiImageDrop label="Images" value={lines(form.images)} onChange={(arr) => set('images')(arr.join('\n'))} />
        {err && <p className="adm-err">{err}</p>}
        <div className="adm-actions">
          <button type="submit" className="adm-btn primary" disabled={busy}>{busy ? 'Saving…' : editId ? 'Update' : 'Create'}</button>
          {editId && <button type="button" className="adm-btn" onClick={reset} disabled={busy}>Cancel</button>}
        </div>
      </form>
      <div className="adm-list">
        <h3>Works ({works.length})</h3>
        {works.map((p) => (
          <div className="adm-item" key={p.id}>
            <div>
              <div className="t">{p.num} · {p.name}</div>
              <div className="s">{p.tag} · {p.year}</div>
            </div>
            <div className="adm-item-actions">
              <button onClick={() => { setForm(workToForm(p)); setEditId(p.id); setErr(''); }}>Edit</button>
              <button className="danger" onClick={() => remove(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SkillForm { name: string; opinion: string; }
const emptySkill: SkillForm = { name: '', opinion: '' };

function SkillsSection() {
  const { skills, refresh } = useContent();
  const toast = useToast();
  const [form, setForm] = useState<SkillForm>(emptySkill);
  const [editId, setEditId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k: keyof SkillForm) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const reset = () => { setForm(emptySkill); setEditId(null); setErr(''); };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const input: api.SkillInput = { name: form.name.trim(), opinion: form.opinion.trim() };
      if (editId) await api.updateSkill(editId, input);
      else await api.createSkill(input);
      await refresh();
      toast(editId ? 'Skill updated' : 'Skill created');
      reset();
    } catch (x) {
      setErr(x instanceof Error ? x.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this skill?')) return;
    setBusy(true); setErr('');
    try {
      await api.deleteSkill(id);
      await refresh();
      if (editId === id) reset();
    } catch (x) {
      setErr(x instanceof Error ? x.message : 'Delete failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="adm-grid">
      <form className="adm-form" onSubmit={save}>
        <h3>{editId ? 'Edit skill' : 'New skill'}</h3>
        <TextField label="Name" value={form.name} onChange={set('name')} />
        <AreaField label="Opinion" value={form.opinion} onChange={set('opinion')} />
        {err && <p className="adm-err">{err}</p>}
        <div className="adm-actions">
          <button type="submit" className="adm-btn primary" disabled={busy}>{busy ? 'Saving…' : editId ? 'Update' : 'Create'}</button>
          {editId && <button type="button" className="adm-btn" onClick={reset} disabled={busy}>Cancel</button>}
        </div>
      </form>
      <div className="adm-list">
        <h3>Skills ({skills.length})</h3>
        {skills.map((s) => (
          <div className="adm-item" key={s.id}>
            <div>
              <div className="t">{s.name}</div>
              <div className="s">{s.opinion}</div>
            </div>
            <div className="adm-item-actions">
              <button onClick={() => { setForm({ name: s.name, opinion: s.opinion }); setEditId(s.id); setErr(''); }}>Edit</button>
              <button className="danger" onClick={() => remove(s.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ExpForm { yr: string; role: string; where: string; note: string; }
const emptyExp: ExpForm = { yr: '', role: '', where: '', note: '' };

function ExperienceSection() {
  const { experience, refresh } = useContent();
  const [form, setForm] = useState<ExpForm>(emptyExp);
  const [editId, setEditId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k: keyof ExpForm) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const reset = () => { setForm(emptyExp); setEditId(null); setErr(''); };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const input: api.ExperienceInput = { yr: form.yr.trim(), role: form.role.trim(), where: form.where.trim(), note: form.note.trim() };
      if (editId) await api.updateExperience(editId, input);
      else await api.createExperience(input);
      await refresh();
      reset();
    } catch (x) {
      setErr(x instanceof Error ? x.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    setBusy(true); setErr('');
    try {
      await api.deleteExperience(id);
      await refresh();
      if (editId === id) reset();
    } catch (x) {
      setErr(x instanceof Error ? x.message : 'Delete failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="adm-grid">
      <form className="adm-form" onSubmit={save}>
        <h3>{editId ? 'Edit experience' : 'New experience'}</h3>
        <TextField label="Year" value={form.yr} onChange={set('yr')} />
        <TextField label="Role" value={form.role} onChange={set('role')} />
        <TextField label="Where" value={form.where} onChange={set('where')} />
        <AreaField label="Note" value={form.note} onChange={set('note')} />
        {err && <p className="adm-err">{err}</p>}
        <div className="adm-actions">
          <button type="submit" className="adm-btn primary" disabled={busy}>{busy ? 'Saving…' : editId ? 'Update' : 'Create'}</button>
          {editId && <button type="button" className="adm-btn" onClick={reset} disabled={busy}>Cancel</button>}
        </div>
      </form>
      <div className="adm-list">
        <h3>Experience ({experience.length})</h3>
        {experience.map((j) => (
          <div className="adm-item" key={j.id}>
            <div>
              <div className="t">{j.role} <span className="s">at {j.where}</span></div>
              <div className="s">{j.yr}</div>
            </div>
            <div className="adm-item-actions">
              <button onClick={() => { setForm({ yr: j.yr, role: j.role, where: j.where, note: j.note }); setEditId(j.id); setErr(''); }}>Edit</button>
              <button className="danger" onClick={() => remove(j.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface AwardForm { yr: string; name: string; where: string; image: string; }
const emptyAward: AwardForm = { yr: '', name: '', where: '', image: '' };

function RecognitionSection() {
  const { recognition, refresh } = useContent();
  const [form, setForm] = useState<AwardForm>(emptyAward);
  const [editId, setEditId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k: keyof AwardForm) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const reset = () => { setForm(emptyAward); setEditId(null); setErr(''); };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const input: api.RecognitionInput = { yr: form.yr.trim(), name: form.name.trim(), where: form.where.trim(), image: form.image.trim() || undefined };
      if (editId) await api.updateRecognition(editId, input);
      else await api.createRecognition(input);
      await refresh();
      reset();
    } catch (x) {
      setErr(x instanceof Error ? x.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this recognition?')) return;
    setBusy(true); setErr('');
    try {
      await api.deleteRecognition(id);
      await refresh();
      if (editId === id) reset();
    } catch (x) {
      setErr(x instanceof Error ? x.message : 'Delete failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="adm-grid">
      <form className="adm-form" onSubmit={save}>
        <h3>{editId ? 'Edit recognition' : 'New recognition'}</h3>
        <TextField label="Year" value={form.yr} onChange={set('yr')} />
        <TextField label="Name" value={form.name} onChange={set('name')} />
        <TextField label="Where" value={form.where} onChange={set('where')} />
        <ImageDrop label="Photo" value={form.image} onChange={set('image')} />
        {err && <p className="adm-err">{err}</p>}
        <div className="adm-actions">
          <button type="submit" className="adm-btn primary" disabled={busy}>{busy ? 'Saving…' : editId ? 'Update' : 'Create'}</button>
          {editId && <button type="button" className="adm-btn" onClick={reset} disabled={busy}>Cancel</button>}
        </div>
      </form>
      <div className="adm-list">
        <h3>Recognition ({recognition.length})</h3>
        {recognition.map((a) => (
          <div className="adm-item" key={a.id}>
            <div>
              <div className="t">{a.name}</div>
              <div className="s">{a.yr} · {a.where}</div>
            </div>
            <div className="adm-item-actions">
              <button onClick={() => { setForm({ yr: a.yr, name: a.name, where: a.where, image: a.image ?? '' }); setEditId(a.id); setErr(''); }}>Edit</button>
              <button className="danger" onClick={() => remove(a.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface EduForm { yr: string; degree: string; school: string; note: string; }
const emptyEdu: EduForm = { yr: '', degree: '', school: '', note: '' };

function EducationSection() {
  const { education, refresh } = useContent();
  const [form, setForm] = useState<EduForm>(emptyEdu);
  const [editId, setEditId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const set = (k: keyof EduForm) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const reset = () => { setForm(emptyEdu); setEditId(null); setErr(''); };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      const input: api.EducationInput = { yr: form.yr.trim(), degree: form.degree.trim(), school: form.school.trim(), note: form.note.trim() };
      if (editId) await api.updateEducation(editId, input);
      else await api.createEducation(input);
      await refresh();
      reset();
    } catch (x) {
      setErr(x instanceof Error ? x.message : 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this education entry?')) return;
    setBusy(true); setErr('');
    try {
      await api.deleteEducation(id);
      await refresh();
      if (editId === id) reset();
    } catch (x) {
      setErr(x instanceof Error ? x.message : 'Delete failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="adm-grid">
      <form className="adm-form" onSubmit={save}>
        <h3>{editId ? 'Edit education' : 'New education'}</h3>
        <TextField label="Period" value={form.yr} onChange={set('yr')} />
        <TextField label="Degree" value={form.degree} onChange={set('degree')} />
        <TextField label="School" value={form.school} onChange={set('school')} />
        <AreaField label="Note" value={form.note} onChange={set('note')} />
        {err && <p className="adm-err">{err}</p>}
        <div className="adm-actions">
          <button type="submit" className="adm-btn primary" disabled={busy}>{busy ? 'Saving…' : editId ? 'Update' : 'Create'}</button>
          {editId && <button type="button" className="adm-btn" onClick={reset} disabled={busy}>Cancel</button>}
        </div>
      </form>
      <div className="adm-list">
        <h3>Education ({education.length})</h3>
        {education.map((e) => (
          <div className="adm-item" key={e.id}>
            <div>
              <div className="t">{e.degree} <span className="s">{e.school}</span></div>
              <div className="s">{e.yr}</div>
            </div>
            <div className="adm-item-actions">
              <button onClick={() => { setForm({ yr: e.yr, degree: e.degree, school: e.school, note: e.note }); setEditId(e.id); setErr(''); }}>Edit</button>
              <button className="danger" onClick={() => remove(e.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Gate({ onPass }: { onPass: () => void }) {
  const [pw, setPw] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr('');
    const res = await login(pw);
    setBusy(false);
    if (res.ok) onPass();
    else { setErr(res.error || 'Sign in failed.'); setPw(''); }
  };

  return (
    <div className="adm-gate">
      <form onSubmit={submit}>
        <h1>Admin</h1>
        <p className="note">Enter the admin password to continue.</p>
        <input
          type="password"
          autoComplete="current-password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          autoFocus
        />
        {err && <p className="adm-err">{err}</p>}
        <button type="submit" className="adm-btn primary" disabled={busy || !pw}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </div>
  );
}

function Panel({ onLogout }: { onLogout: () => void }) {
  const { loading, error } = useContent();
  const [tab, setTab] = useState<Tab>('works');
  const tabs: { k: Tab; label: string }[] = [
    { k: 'works', label: 'Works' },
    { k: 'skills', label: 'Skills' },
    { k: 'experience', label: 'Experience' },
    { k: 'education', label: 'Education' },
    { k: 'recognition', label: 'Licenses & Awards' },
  ];

  return (
    <div>
      <div className="adm-head">
        <h1>Admin</h1>
        <button className="adm-btn" onClick={onLogout}>Log out</button>
      </div>
      <div className="adm-tabs">
        {tabs.map((t) => (
          <button key={t.k} className={tab === t.k ? 'on' : ''} onClick={() => setTab(t.k)}>{t.label}</button>
        ))}
      </div>
      {error && <p className="adm-err">{error}</p>}
      {loading && <p className="note">Loading…</p>}
      {tab === 'works' && <WorksSection />}
      {tab === 'skills' && <SkillsSection />}
      {tab === 'experience' && <ExperienceSection />}
      {tab === 'education' && <EducationSection />}
      {tab === 'recognition' && <RecognitionSection />}
    </div>
  );
}

export function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => { isAuthed().then(setAuthed); }, []);

  return (
    <div data-screen-label="Admin">
      <section className="page admin">
        {authed === null && <p className="note">…</p>}
        {authed === false && <Gate onPass={() => setAuthed(true)} />}
        {authed === true && <Panel onLogout={() => { logout(); setAuthed(false); }} />}
      </section>
    </div>
  );
}
