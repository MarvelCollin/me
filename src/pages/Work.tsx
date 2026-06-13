import { useEffect, useRef, useState } from 'react';
import { useContent } from '../content/store';
import { Thumbnail } from '../components/Thumbnail';

export function Work() {
  const { works: PROJECTS, loading } = useContent();
  const [filter, setFilter] = useState('all');
  const spreadRefs = useRef<(HTMLDivElement | null)[]>([]);
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.tag === filter);
  const layouts = ['v-a', 'v-b', 'v-a', 'v-c', 'v-b', 'v-a', 'v-b', 'v-c', 'v-a', 'v-b'];

  useEffect(() => {
    spreadRefs.current = spreadRefs.current.slice(0, filtered.length);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: [0.15], rootMargin: '-10% 0px -25% 0px' }
    );
    spreadRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [filtered.length]);

  return (
    <div data-screen-label="Work">
      <section className="page work-stage">
        <div className="work-head">
          <h1>Projects</h1>
          <p className="note">Ten projects from 2021 to 2025. Client work, products, and personal tools.</p>
        </div>

        <div className="work-filter">
          <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>All ({PROJECTS.length})</button>
          <button className={filter === 'client' ? 'on' : ''} onClick={() => setFilter('client')}>Client ({PROJECTS.filter(p => p.tag === 'client').length})</button>
          <button className={filter === 'product' ? 'on' : ''} onClick={() => setFilter('product')}>Product ({PROJECTS.filter(p => p.tag === 'product').length})</button>
          <button className={filter === 'personal' ? 'on' : ''} onClick={() => setFilter('personal')}>Personal ({PROJECTS.filter(p => p.tag === 'personal').length})</button>
        </div>

        <div className="work-spread">
          {loading && PROJECTS.length === 0 && <p className="note">Loading projects…</p>}
          {filtered.map((p, i) => {
            const v = layouts[PROJECTS.indexOf(p) % layouts.length] || 'v-a';
            return (
              <div
                key={p.slug}
                ref={(el) => { spreadRefs.current[i] = el; }}
                data-idx={i}
                className={'spread ' + v}
              >
                <a className="thumb" href={'#/work/' + p.slug}>
                  <Thumbnail p={p} />
                  <span className="corner">{p.num} · {p.year}</span>
                  <span className="corner r">{p.tag}</span>
                  <span className="name-overlay">{p.name}</span>
                </a>
                <div className="meta">
                  <div className="num">{p.num} / {String(PROJECTS.length).padStart(2, '0')}</div>
                  <h3>{p.name}</h3>
                  <p className="desc-line">{p.desc}</p>
                  <div className="mini-specs">
                    <span>{p.year}</span>
                    <span className="dot">·</span>
                    <span>{p.stack}</span>
                  </div>
                  <a className="read" href={'#/work/' + p.slug}>View project →</a>
                </div>
              </div>
            );
          })}
          <div className="story-end">
            <span className="se-line" />
            <span className="se-text">End of list</span>
            <span className="se-line" />
          </div>
        </div>
      </section>
    </div>
  );
}
