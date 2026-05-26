import { useEffect } from 'react';
import { PROJECTS, projectBySlug, projectIndex } from '../content/projects';
import { Thumbnail } from '../components/Thumbnail';

export function ProjectDetail({ slug }: { slug: string }) {
  useEffect(() => {
    const heroBg = document.querySelector<HTMLElement>('.story-hero-bg');
    const onScroll = () => {
      const y = window.scrollY;
      if (heroBg) heroBg.style.transform = `translateY(${y * 0.35}px)`;
      document.querySelectorAll<HTMLElement>('.story-image .image-bg').forEach(el => {
        const par = el.closest<HTMLElement>('.story-image');
        if (!par) return;
        const r = par.getBoundingClientRect();
        el.style.transform = `translateY(${(r.top - window.innerHeight / 2 + r.height / 2) * -0.22}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  const p = projectBySlug(slug);
  if (!p) {
    return (
      <div data-screen-label="Project · 404">
        <section className="page">
          <a className="story-back" href="#/work"><span className="arr">←</span> All projects</a>
          <h1 style={{ fontSize: 48, fontWeight: 500, letterSpacing: '-.02em' }}>That project isn't here.</h1>
          <p style={{ marginTop: 14, color: 'var(--fg-dim)' }}>The slug "{slug}" doesn't match anything on the shelf.</p>
        </section>
      </div>
    );
  }

  const idx = projectIndex(slug);
  const prev = idx > 0 ? PROJECTS[idx - 1] : null;
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;
  const acts = [
    { marker: 'The brief',   body: p.body[0] },
    { marker: 'The work',    body: p.body[1] },
    { marker: 'The outcome', body: p.body[2] },
  ].filter(a => a.body);

  return (
    <div data-screen-label={'Project · ' + p.name}>
      <a className="story-back" href="#/work"><span className="arr">←</span> All projects</a>
      <div className="story">
        <div className="story-hero">
          <div className="story-hero-bg">
            <Thumbnail p={p} />
          </div>
          <div className="story-hero-text">
            <span className="num">№ {p.num} · {p.year}</span>
            <h1>{p.name}</h1>
            <p className="tagline"><b>{p.brief}</b></p>
          </div>
        </div>
        <div className="story-meta">
          <div className="meta-grid">
            <div className="col"><div className="k">Client</div><div className="v">{p.client}</div></div>
            <div className="col"><div className="k">Role</div><div className="v">{p.role}</div></div>
            <div className="col"><div className="k">Stack</div><div className="v">{p.stack}</div></div>
            <div className="col"><div className="k">Year · Result</div><div className="v">{p.year} · <span className="acc">{p.result}</span></div></div>
          </div>
        </div>
        {acts.map((act, i) => (
          <div className="story-act" key={i}>
            <div className="marker">{act.marker}</div>
            <div className="body">
              {i === 0 && <p className="pull">{p.brief.replace(/\.$/, '')}</p>}
              <p>{act.body}</p>
            </div>
          </div>
        ))}
        <div className="story-image">
          <div className="image-bg">
            <Thumbnail p={p} />
          </div>
          <div className="image-text">
            <div className="top">{p.name} · {p.year} · visual direction</div>
            <div className="bottom">
              <p className="quote"><span className="acc">{p.result}</span></p>
              <div className="caption">{p.name} · selected stills</div>
            </div>
          </div>
        </div>
        <div className="story-result">
          <div className="block">
            <div>
              <span className="label">Outcome</span>
              <div className="number"><span className="ac">{p.result}</span></div>
            </div>
            <p>{p.body[p.body.length - 1]}</p>
          </div>
        </div>
        <div className="story-stills">
          {p.stills.map((s, i) => (
            <div className="still" key={i}>
              {p.images?.[i]
                ? <img src={p.images[i]} alt={s} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                : <Thumbnail p={p} />}
              <span className="lbl">Plate {String(i + 1).padStart(2, '0')} · {s}</span>
            </div>
          ))}
        </div>
        <div className="story-next">
          <div className="grid">
            <div className="nav-block">
              <span className="l">{prev ? '← Previous' : '← Back to index'}</span>
              {prev
                ? <a className="name" href={'#/work/' + prev.slug}>{prev.name}</a>
                : <a className="name" href="#/work">The whole shelf</a>}
            </div>
            <div className="nav-block r">
              <span className="l">{next ? 'Next →' : '→ Back to index'}</span>
              {next
                ? <a className="name" href={'#/work/' + next.slug}>{next.name}</a>
                : <a className="name" href="#/work">The whole shelf</a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
