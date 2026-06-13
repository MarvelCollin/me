import { useContent, findWork, workIndex } from '../content/store';
import { Thumbnail } from '../components/Thumbnail';
import { img } from '../lib/img';

export function ProjectDetail({ slug }: { slug: string }) {
  const { works: PROJECTS, loading } = useContent();
  const p = findWork(PROJECTS, slug);
  if (!p) {
    if (loading) {
      return (
        <div data-screen-label="Project">
          <section className="page">
            <p className="note">Loading…</p>
          </section>
        </div>
      );
    }
    return (
      <div data-screen-label="Project · 404">
        <section className="page">
          <a className="story-back" href="/work"><span className="arr">←</span> All projects</a>
          <h1 style={{ fontSize: 48, fontWeight: 500, letterSpacing: '-.02em' }}>Not found.</h1>
          <p style={{ marginTop: 14, color: 'var(--fg-dim)' }}>No project matches "{slug}".</p>
        </section>
      </div>
    );
  }

  const idx = workIndex(PROJECTS, slug);
  const prev = idx > 0 ? PROJECTS[idx - 1] : null;
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;
  const sections = [
    { label: 'Context', body: p.body[0] },
  ].filter(a => a.body);

  return (
    <div data-screen-label={'Project · ' + p.name}>
      <a className="story-back" href="/work"><span className="arr">←</span> All projects</a>
      <div className="story">
        <div className="story-hero">
          <div className="story-hero-bg">
            <Thumbnail p={p} />
          </div>
          <div className="story-hero-text">
            <span className="num">{p.num} · {p.year}</span>
            <h1>{p.name}</h1>
            <p className="tagline"><b>{p.brief}</b></p>
          </div>
        </div>
        <div className="story-meta">
          <div className="meta-grid">
            <div className="col"><div className="k">Client</div><div className="v">{p.client}</div></div>
            <div className="col"><div className="k">Role</div><div className="v">{p.role}</div></div>
            <div className="col"><div className="k">Stack</div><div className="v">{p.stack}</div></div>
            <div className="col"><div className="k">Year</div><div className="v">{p.year}</div></div>
          </div>
        </div>
        {sections.map((section, i) => (
          <div className="story-act" key={i}>
            <div className="marker">{section.label}</div>
            <div className="body">
              {i === 0 && <p className="pull">{p.brief}</p>}
              <p>{section.body}</p>
            </div>
          </div>
        ))}
        <div className="story-image">
          <div className="image-bg">
            <Thumbnail p={p} />
          </div>
          <div className="image-text">
            <div className="top">{p.name} · {p.year}</div>
            <div className="bottom">
              <div className="caption">{p.name}</div>
            </div>
          </div>
        </div>
        <div className="story-stills">
          {p.stills.map((s, i) => (
            <div className="still" key={i}>
              {p.images?.[i]
                ? <img src={img(p.images[i], 1400)} alt={s} loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
                : <Thumbnail p={p} />}
              <span className="lbl">{String(i + 1).padStart(2, '0')} · {s}</span>
            </div>
          ))}
        </div>
        <div className="story-next">
          <div className="grid">
            <div className="nav-block">
              <span className="l">{prev ? '← Previous' : '← Back'}</span>
              {prev
                ? <a className="name" href={'/work/' + prev.slug}>{prev.name}</a>
                : <a className="name" href="/work">All projects</a>}
            </div>
            <div className="nav-block r">
              <span className="l">{next ? 'Next →' : '→ Back'}</span>
              {next
                ? <a className="name" href={'/work/' + next.slug}>{next.name}</a>
                : <a className="name" href="/work">All projects</a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
