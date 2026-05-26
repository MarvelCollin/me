import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

function initCursor() {
  const cur = document.getElementById('cur');
  if (!cur) return;
  let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
  addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
  const loop = () => {
    x += (tx - x) * 0.5;
    y += (ty - y) * 0.5;
    cur.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  };
  loop();
  const setHover = (on: boolean) => cur.classList.toggle('cur--hover', on);
  document.addEventListener('mouseover', (e) => {
    const t = (e.target as Element).closest('a,button,.row,.skill,.job,.award,.btn');
    if (t) setHover(true);
  });
  document.addEventListener('mouseout', (e) => {
    const related = e.relatedTarget as Element | null;
    if (!related || !related.closest?.('a,button,.row,.skill,.job,.award,.btn')) setHover(false);
  });
  addEventListener('mouseleave', () => { cur.style.opacity = '0'; });
  addEventListener('mouseenter', () => { cur.style.opacity = '1'; });
}

function initClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const tick = () => {
    const d = new Date();
    el.textContent = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };
  tick();
  setInterval(tick, 30000);
}

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

initCursor();
initClock();
