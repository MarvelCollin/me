import { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../content/projects';
import { Thumbnail } from '../components/Thumbnail';

export function Work() {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(0);
  const spreadRefs = useRef<(HTMLDivElement | null)[]>([]);
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.tag === filter);
  const layouts = ['v-a', 'v-b', 'v-a', 'v-c', 'v-b', 'v-a', 'v-b', 'v-c', 'v-a', 'v-b'];

  useEffect(() => {
    spreadRefs.current = spreadRefs.current.slice(0, filtered.length);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            const idx = Number((e.target as HTMLElement).dataset.idx);
            if (e.intersectionRatio > 0.35) setActive(idx);
          }
        });
      },
      { threshold: [0.15, 0.35, 0.6], rootMargin: '-10% 0px -25% 0px' }
    );
    spreadRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [filtered.length]);

  const current = filtered[active];

  return (
    <div data-screen-label="Work">
      <section className="page work-stage">
        <aside className="work-progress" aria-hidden>
          <div className="wp-rail" />
          <div className="wp-now">
            <span className="wp-num">{current?.num ?? '00'}</span>
            <span className="wp-of">/ {String(filtered.length).padStart(2, '0')}</span>
          </div>
          <div className="wp-name">{current?.name ?? ''}</div>
          <div className="wp-tag">{current?.tag ?? ''}</div>
        </aside>

        <div className="work-head story">
          <div className="story-rail">
            <span className="story-chapter">Ch. 01</span>
            <span className="story-line" />
            <span className="story-tick">2021 → 2025</span>
          </div>
          <div className="story-body">
            <p className="story-kicker">— a short archive of</p>
            <h1 className="story-title">
              <span className="ln">
                <em className="num">ten</em>
                <span> projects,</span>
              </span>
              <span className="ln">
                <span>built across</span>
                <em className="num alt">four</em>
              </span>
              <span className="ln dim">
                <span>quiet</span> <span className="it">years.</span>
              </span>
            </h1>
            <div className="story-foot">
              <p className="story-blurb">
                Some were shipped at midnight. Some never shipped at all.
                <br />Each one taught me something the previous couldn't.
              </p>
              <span className="story-arrow" aria-hidden>↓ scroll the shelf</span>
            </div>
          </div>
        </div>

        <div className="work-filter">
          <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>All ({PROJECTS.length})</button>
          <button className={filter === 'client' ? 'on' : ''} onClick={() => setFilter('client')}>Client ({PROJECTS.filter(p => p.tag === 'client').length})</button>
          <button className={filter === 'product' ? 'on' : ''} onClick={() => setFilter('product')}>Product ({PROJECTS.filter(p => p.tag === 'product').length})</button>
          <button className={filter === 'personal' ? 'on' : ''} onClick={() => setFilter('personal')}>Personal ({PROJECTS.filter(p => p.tag === 'personal').length})</button>
        </div>

        <div className="work-spread">
          {filtered.map((p, i) => {
            const v = layouts[PROJECTS.indexOf(p) % layouts.length] || 'v-a';
            return (
              <div
                key={p.slug}
                ref={(el) => { spreadRefs.current[i] = el; }}
                data-idx={i}
                className={'spread ' + v}
              >
                <div className="chapter-mark">
                  <span className="cm-no">Ch. {String(i + 2).padStart(2, '0')}</span>
                  <span className="cm-line" />
                  <span className="cm-title">{p.name}<i> — {p.tag}</i></span>
                  <span className="cm-yr">{p.year}</span>
                </div>
                <a className="thumb" href={'#/work/' + p.slug} style={{ cursor: 'none' }}>
                  <Thumbnail p={p} />
                  <span className="corner">№ {p.num} · {p.year}</span>
                  <span className="corner r">{p.tag}</span>
                  <span className="name-overlay">{p.name} <span className="it">, {p.brief.toLowerCase().replace(/\.$/, '')}.</span></span>
                </a>
                <div className="meta">
                  <div className="num">№ {p.num} / 010</div>
                  <h3>{p.name}</h3>
                  <p className="desc-line">{p.desc}.</p>
                  <div className="mini-specs">
                    <span>{p.year}</span>
                    <span className="dot">·</span>
                    <span>{p.stack}</span>
                  </div>
                  <a className="read" href={'#/work/' + p.slug}>Read the project →</a>
                </div>
              </div>
            );
          })}
          <div className="story-end">
            <span className="se-line" />
            <span className="se-text">— end of the shelf —</span>
            <span className="se-line" />
          </div>
        </div>
      </section>
    </div>
  );
}
