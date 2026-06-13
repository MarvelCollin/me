import { useContent, findWork } from '../content/store';
import { WorkTable } from '../components/WorkTable';
import { Thumbnail } from '../components/Thumbnail';

export function Home() {
  const { works } = useContent();
  const helios = findWork(works, 'helios');
  return (
    <div data-screen-label="Home">
      <section className="page">
        <div className="hero">
          <h1>
            Marvel Collin, <span className="dim">full-stack developer</span> based in <span className="ac">Jakarta</span>.
          </h1>
          <div className="hero-meta">
            <p>I build web applications from database to interface. Seven years of shipping products, mostly in TypeScript and React, with detours into Rust and Go when the problem calls for it. Currently a founding engineer at a devtools startup.</p>
            <div className="hero-meta-right">
              <p>Jakarta · GMT+7</p>
              <p>Available Q3 to Q4 2026</p>
              <a className="link" href="#/contact">Get in touch →</a>
            </div>
          </div>
        </div>
        <div className="home-work">
          <p className="home-work-label">Selected work · {String(Math.min(works.length, 6)).padStart(2, '0')} / {String(works.length).padStart(2, '0')}</p>
          <WorkTable list={works.slice(0, 6)} />
          <div style={{ marginTop: 24, fontSize: 14, color: 'var(--fg-dim)' }}>
            <a href="#/work" style={{ borderBottom: '1px solid var(--accent-soft)', color: 'var(--accent)', paddingBottom: 1 }}>All {works.length} projects →</a>
          </div>
        </div>
        {helios && (
          <div className="case">
            <div className="top">
              <h2>{helios.name}</h2>
              <p className="lede">
                <b>{helios.name}</b> {helios.body[0]}
              </p>
            </div>
            <a className="case-shot" href={'#/work/' + helios.slug}>
              <Thumbnail p={helios} />
              <span className="label">{helios.name} · {helios.year} · production</span>
              <span className="acc">View project →</span>
            </a>
            <div className="case-meta">
              <div className="c"><div className="k">Client</div><div className="v">{helios.client}</div></div>
              <div className="c"><div className="k">Role</div><div className="v">{helios.role}</div></div>
              <div className="c"><div className="k">Stack</div><div className="v">{helios.stack}</div></div>
              <div className="c"><div className="k">Result</div><div className="v">{helios.result}</div></div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
