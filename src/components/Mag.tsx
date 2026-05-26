import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export function Mag({ children, k = 0.35, className = '' }: { children: ReactNode; k?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const m = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * k}px,${y * k}px)`;
    };
    const l = () => { el.style.transform = 'translate(0,0)'; };
    el.addEventListener('mousemove', m);
    el.addEventListener('mouseleave', l);
    return () => {
      el.removeEventListener('mousemove', m);
      el.removeEventListener('mouseleave', l);
    };
  }, [k]);
  return <span ref={ref} className={'mag ' + className}>{children}</span>;
}
