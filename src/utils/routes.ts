import type { ParsedRoute } from '../types';

export function parseRoute(r: string): ParsedRoute {
  if (r.startsWith('/work/')) return { kind: 'project', slug: r.slice(6).replace(/\/$/, '') };
  if (r === '/work') return { kind: 'work' };
  if (r === '/about') return { kind: 'about' };
  if (r === '/contact') return { kind: 'contact' };
  return { kind: 'home' };
}

export function runTransition(toRoute: string): Promise<void> {
  return new Promise(resolve => {
    const o = document.createElement('div');
    o.className = 'pt-overlay';
    document.body.appendChild(o);
    const parsed = parseRoute(toRoute);
    if (parsed.kind === 'home') {
      o.style.transform = 'translateY(-100%)';
      o.animate(
        [{ transform: 'translateY(-100%)' }, { transform: 'translateY(0)' }],
        { duration: 440, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' }
      ).finished.then(() => {
        resolve();
        o.animate(
          [{ transform: 'translateY(0)' }, { transform: 'translateY(100%)' }],
          { duration: 500, easing: 'cubic-bezier(.2,0,.3,1)', fill: 'forwards' }
        ).finished.then(() => o.remove());
      });
    } else if (parsed.kind === 'work') {
      o.className = 'pt-overlay shutter';
      o.innerHTML = '<div class="pane"></div><div class="pane"></div>';
      const t = o.firstElementChild as HTMLElement;
      const b = o.lastElementChild as HTMLElement;
      t.style.transform = 'translateY(-101%)';
      b.style.transform = 'translateY(101%)';
      t.animate(
        [{ transform: 'translateY(-101%)' }, { transform: 'translateY(0)' }],
        { duration: 440, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' }
      ).finished.then(() => {
        resolve();
        t.animate(
          [{ transform: 'translateY(0)' }, { transform: 'translateY(-101%)' }],
          { duration: 500, easing: 'cubic-bezier(.2,0,.3,1)', fill: 'forwards' }
        ).finished.then(() => o.remove());
      });
      b.animate(
        [{ transform: 'translateY(101%)' }, { transform: 'translateY(0)' }],
        { duration: 440, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' }
      ).finished.then(() => {
        b.animate(
          [{ transform: 'translateY(0)' }, { transform: 'translateY(101%)' }],
          { duration: 500, easing: 'cubic-bezier(.2,0,.3,1)', fill: 'forwards' }
        );
      });
    } else if (parsed.kind === 'project') {
      o.style.transform = 'translateY(100%)';
      o.animate(
        [{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }],
        { duration: 460, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' }
      ).finished.then(() => {
        resolve();
        o.animate(
          [{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }],
          { duration: 520, easing: 'cubic-bezier(.2,0,.3,1)', fill: 'forwards' }
        ).finished.then(() => o.remove());
      });
    } else if (parsed.kind === 'about') {
      o.style.transform = 'translateX(101%)';
      o.animate(
        [{ transform: 'translateX(101%)' }, { transform: 'translateX(0)' }],
        { duration: 450, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' }
      ).finished.then(() => {
        resolve();
        o.animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-101%)' }],
          { duration: 500, easing: 'cubic-bezier(.2,0,.3,1)', fill: 'forwards' }
        ).finished.then(() => o.remove());
      });
    } else if (parsed.kind === 'contact') {
      o.style.clipPath = 'circle(0% at 50% 50%)';
      o.animate(
        [{ clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(150% at 50% 50%)' }],
        { duration: 500, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' }
      ).finished.then(() => {
        resolve();
        o.animate(
          [{ clipPath: 'circle(150% at 50% 50%)' }, { clipPath: 'circle(0% at 50% 50%)' }],
          { duration: 540, easing: 'cubic-bezier(.2,0,.3,1)', fill: 'forwards' }
        ).finished.then(() => o.remove());
      });
    } else {
      resolve();
      o.remove();
    }
  });
}
