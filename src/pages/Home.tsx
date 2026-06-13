import { PROJECTS, projectBySlug } from '../content/projects';
import { WorkTable } from '../components/WorkTable';
import { Thumbnail } from '../components/Thumbnail';

export function Home() {
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
          <p className="home-work-label">Selected work · 06 / 10</p>
          <WorkTable list={PROJECTS.slice(0, 6)} />
          <div style={{ marginTop: 24, fontSize: 14, color: 'var(--fg-dim)' }}>
            <a href="#/work" style={{ borderBottom: '1px solid var(--accent-soft)', color: 'var(--accent)', paddingBottom: 1 }}>All ten projects →</a>
          </div>
        </div>
        <div className="case">
          <div className="top">
            <h2>Helios</h2>
            <p className="lede">
              <b>Helios</b> is a solar dashboard for a rooftop co-op in Bandung. 142 households track their energy production through an interface that reflects the actual sun position, rendered in WebGL and tinted by live weather data.
            </p>
          </div>
          <a className="case-shot" href="#/work/helios">
            <Thumbnail p={projectBySlug('helios')!} />
            <span className="label">Helios · v1.4 · production</span>
            <span className="acc">View project →</span>
          </a>
          <div className="case-meta">
            <div className="c"><div className="k">Client</div><div className="v">Solar co-op, Bandung</div></div>
            <div className="c"><div className="k">Role</div><div className="v">Full-stack + design</div></div>
            <div className="c"><div className="k">Stack</div><div className="v">Next · Postgres · three.js</div></div>
            <div className="c"><div className="k">Result</div><div className="v">+38% daily engagement</div></div>
          </div>
        </div>
      </section>
    </div>
  );
}
