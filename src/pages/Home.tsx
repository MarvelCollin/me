import { useContent, findWork } from '../content/store';
import { WorkTable } from '../components/WorkTable';
import { Thumbnail } from '../components/Thumbnail';

export function Home() {
  const { works } = useContent();
  const feature = findWork(works, 'tetrimosuv');
  return (
    <div data-screen-label="Home">
      <section className="page">
        <div className="hero">
          <h1>
            Marvel Collin, <span className="dim">full-stack developer</span> building from <span className="ac">Indonesia</span>.
          </h1>
          <div className="hero-meta">
            <p>I'm a Computer Science student at BINUS University and a full-stack engineer on the lab's R&D team. I build web apps from database to interface in TypeScript, React, Go, and .NET. On the side I make games, ML experiments, and award-winning robotics.</p>
            <div className="hero-meta-right">
              <p>Open to collaborations</p>
              <a className="link" href="/contact">Get in touch →</a>
            </div>
          </div>
        </div>
        <div className="home-work">
          <p className="home-work-label">Selected work · {String(Math.min(works.length, 6)).padStart(2, '0')} / {String(works.length).padStart(2, '0')}</p>
          <WorkTable list={works.slice(0, 6)} />
          <div style={{ marginTop: 24, fontSize: 14, color: 'var(--fg-dim)' }}>
            <a href="/work" style={{ borderBottom: '1px solid var(--accent-soft)', color: 'var(--accent)', paddingBottom: 1 }}>All {works.length} projects →</a>
          </div>
        </div>
        {feature && (
          <div className="case">
            <div className="top">
              <h2>{feature.name}</h2>
              <p className="lede">
                <b>{feature.name}</b> {feature.body[0]}
              </p>
            </div>
            <a className="case-shot" href={'/work/' + feature.slug}>
              <Thumbnail p={feature} />
              <span className="label">{feature.name} · {feature.year}</span>
              <span className="acc">View project →</span>
            </a>
            <div className="case-meta">
              <div className="c"><div className="k">Type</div><div className="v">{feature.tag}</div></div>
              <div className="c"><div className="k">Role</div><div className="v">{feature.role}</div></div>
              <div className="c"><div className="k">Stack</div><div className="v">{feature.stack}</div></div>
              <div className="c"><div className="k">Result</div><div className="v">{feature.result}</div></div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
