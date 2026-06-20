import { useState } from 'react';
import type { Project, HoverState } from '../types';
import { Thumbnail } from './Thumbnail';

export function WorkTable({ list }: { list: Project[] }) {
  const [hover, setHover] = useState<HoverState | null>(null);
  return (
    <div className="w-full">
      {list.map((p) => (
        <a
          key={p.num}
          href={'/work/' + p.slug}
          className="group relative grid grid-cols-[40px_1fr_220px_100px_40px] items-baseline gap-6 border-b border-line py-6 transition-[padding] duration-[0.35s] ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:pl-[14px] max-[900px]:grid-cols-[30px_1fr_40px]"
          onMouseMove={(e) => setHover({ p, x: e.clientX, y: e.clientY })}
          onMouseLeave={() => setHover(null)}
        >
          <span className="text-[12px] tabular-nums text-muted">{p.num}</span>
          <span className="text-[22px] font-medium leading-[1.15] transition-colors group-hover:text-accent">
            {p.name} <span className="font-light text-fg-dim">{p.desc}</span>
          </span>
          <span className="text-[13px] font-light text-fg-dim max-[900px]:hidden">{p.role}</span>
          <span className="text-[13px] tabular-nums text-muted max-[900px]:hidden">{p.year}</span>
          <span className="justify-self-end text-[18px] text-muted transition-[transform,color] duration-[0.35s] group-hover:translate-x-[6px] group-hover:text-accent">→</span>
        </a>
      ))}
      {hover && (
        <div
          className="pointer-events-none fixed z-[60] h-[180px] w-[280px] overflow-hidden border border-line bg-bg-3"
          style={{ left: hover.x, top: hover.y, transform: 'translate(28px,-50%)' }}
        >
          <Thumbnail p={hover.p} />
          <div className="absolute left-[14px] top-3 z-[2] font-sans text-[10px] uppercase tracking-[0.12em] text-[rgba(247,244,234,0.85)] [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">
            {hover.p.num} · {hover.p.year}
          </div>
          <div className="absolute bottom-[14px] left-[14px] z-[2] text-[20px] font-medium text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
            {hover.p.name}
          </div>
        </div>
      )}
    </div>
  );
}
