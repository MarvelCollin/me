import type { Project } from '../types';
import { TONES } from '../content/tones';
import { img } from '../lib/img';

export function Thumbnail({ p }: { p: Project }) {
  if (p.cover) {
    return (
      <span className="ph-wrap" style={{ position: 'absolute', inset: 0, display: 'block' }}>
        <img
          src={img(p.cover)}
          alt={p.name}
          loading="lazy"
          decoding="async"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </span>
    );
  }
  const tone = TONES[p.tone] || TONES['warm'];
  return (
    <span className="ph-wrap" style={{ position: 'absolute', inset: 0, display: 'block' }}>
      <span style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at ${tone.pos}, ${tone.glow} 0%, transparent 55%), linear-gradient(180deg, ${tone.tint}, transparent 70%)` }}></span>
      <span className="ph-tex"></span>
    </span>
  );
}
