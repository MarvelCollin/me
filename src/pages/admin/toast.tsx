import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import { ToastCtx } from './lib/toast-context';

export function ToastHost({ children }: { children: ReactNode }) {
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
