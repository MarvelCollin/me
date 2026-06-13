import { useState } from 'react';
import type { Project, HoverState } from '../types';
import { Thumbnail } from './Thumbnail';

export function WorkTable({ list }: { list: Project[] }) {
  const [hover, setHover] = useState<HoverState | null>(null);
  return (
    <div className="wt">
      {list.map(p => (
        <a
          key={p.num}
          href={'/work/' + p.slug}
          className="row"
          onMouseMove={(e) => setHover({ p, x: e.clientX, y: e.clientY })}
          onMouseLeave={() => setHover(null)}
        >
          <span className="num">{p.num}</span>
          <span className="name">{p.name} <span className="desc">{p.desc}</span></span>
          <span className="role">{p.role}</span>
          <span className="year">{p.year}</span>
          <span className="arr">→</span>
        </a>
      ))}
      {hover && (
        <div className="pv on" style={{ left: hover.x, top: hover.y, transform: 'translate(28px,-50%)' }}>
          <Thumbnail p={hover.p} />
          <div className="pv-label">{hover.p.num} · {hover.p.year}</div>
          <div className="pv-name">{hover.p.name}</div>
        </div>
      )}
    </div>
  );
}
