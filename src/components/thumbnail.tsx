import { memo } from 'react';
import type { Project } from '../Interface';
import { TONES } from '../content/tones';
import { img } from '../lib/img';

export const Thumbnail = memo(function Thumbnail({ p }: { p: Project }) {
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
      <span style={{ position: 'absolute', inset: 0, background: `radial-gradient(120% 85% at ${tone.pos}, ${tone.glow}, transparent 70%), radial-gradient(85% 65% at ${tone.pos}, ${tone.glow}, transparent 52%), linear-gradient(155deg, ${tone.tint}, transparent 60%)` }}></span>
      <span className="ph-tex"></span>
    </span>
  );
});
