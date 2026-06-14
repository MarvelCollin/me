import { useState } from 'react';
import { useContent } from '../content/store';
import { WorkGallery3D } from '../components/WorkGallery3D';

export function Work() {
  const { works: PROJECTS, loading } = useContent();
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);
  const filters = [
    { key: 'all', label: `All (${PROJECTS.length})` },
    { key: 'client', label: `Client (${PROJECTS.filter((p) => p.tag === 'client').length})` },
    { key: 'product', label: `Product (${PROJECTS.filter((p) => p.tag === 'product').length})` },
    { key: 'personal', label: `Personal (${PROJECTS.filter((p) => p.tag === 'personal').length})` },
  ];

  return (
    <div data-screen-label="Work">
      <section className="relative z-10 mx-auto max-w-[1320px] px-10 pt-[140px] max-[900px]:px-[22px] max-[900px]:pt-[100px]">
        <div className="border-b border-line pb-[60px]">
          <h1 className="max-w-[18ch] font-sans text-[clamp(40px,5.6vw,80px)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Projects
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-fg-dim">
            Ten projects from 2021 to 2025. Client work, products, and personal tools.
          </p>
        </div>
        <div className="mt-6 mb-2 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={
                'cursor-pointer border px-[14px] py-[7px] text-xs tracking-[0.04em] transition-colors ' +
                (filter === f.key
                  ? 'border-accent bg-accent text-bg'
                  : 'border-line text-fg-dim hover:border-muted hover:text-fg')
              }
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>
      {loading && PROJECTS.length === 0 ? (
        <p className="mx-auto max-w-[1320px] px-10 py-20 text-sm text-fg-dim">Loading projects…</p>
      ) : (
        <WorkGallery3D key={filter} projects={filtered} />
      )}
    </div>
  );
}
