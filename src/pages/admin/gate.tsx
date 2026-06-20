import { useState } from 'react';
import type { FormEvent } from 'react';
import { login } from '../../lib/auth';

export function Gate({ onPass }: { onPass: () => void }) {
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
