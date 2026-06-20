import { useEffect, useState } from 'react';
import { isAuthed, logout } from '../../lib/auth';
import { Gate } from './gate';
import { Panel } from './panel';

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
