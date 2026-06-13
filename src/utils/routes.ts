import type { ParsedRoute } from '../types';

export function parseRoute(r: string): ParsedRoute {
  if (r.startsWith('/work/')) return { kind: 'project', slug: r.slice(6).replace(/\/$/, '') };
  if (r === '/work') return { kind: 'work' };
  if (r === '/about') return { kind: 'about' };
  if (r === '/contact') return { kind: 'contact' };
  if (r === '/admin') return { kind: 'admin' };
  return { kind: 'home' };
}

export function runTransition(_toRoute: string): Promise<void> {
  return new Promise(resolve => {
    const o = document.createElement('div');
    o.className = 'pt-overlay';
    o.style.opacity = '0';
    document.body.appendChild(o);
    o.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 280, easing: 'ease', fill: 'forwards' }
    ).finished.then(() => {
      resolve();
      o.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 320, easing: 'ease', fill: 'forwards' }
      ).finished.then(() => o.remove());
    });
  });
}
