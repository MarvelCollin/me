import { PROJECTS, projectBySlug } from '../content/projects';
import { WorkTable } from '../components/WorkTable';
import { Thumbnail } from '../components/Thumbnail';

export function Home() {
  return (
    <div data-screen-label="Home">
      <section className="page">
        <div className="hero">
          <h1>
            Marvel Collin, <span className="dim">a full-stack developer</span> who spends too long on the <span className="ac">typography</span>.
          </h1>
          <div className="hero-meta">
            <p>I work across the stack, interface to index, and prefer projects where I can touch <b>the database and the kerning</b> in the same week. Currently a founding engineer at a stealth devtools company. Open to commissions: studios, founders, editors.</p>
            <div className="hero-meta-right">
              <p>Jakarta · GMT+7</p>
              <p>Available Q3 to Q4 2026</p>
              <a className="link" href="#/contact">Write me →</a>
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
            <h2>Helios, <span className="dim">in some depth.</span></h2>
            <p className="lede">
              <b>Helios</b> is a residential solar dashboard for a rooftop co-op in Bandung. The brief: <i>make the numbers feel less like a bill</i>. We built an interface that wakes, peaks, and rests with the sun outside the window, and rendered the sun in WebGL because the marketing team asked for a logo and we gave them weather.
            </p>
          </div>
          <a className="case-shot" href="#/work/helios" style={{ display: 'block', cursor: 'none' }}>
            <Thumbnail p={projectBySlug('helios')!} />
            <span className="label">Helios · v1.4 · production</span>
            <span className="acc">Open the project →</span>
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
