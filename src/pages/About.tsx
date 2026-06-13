import { useContent } from '../content/store';

export function About() {
  const { skills: SKILLS, experience: HISTORY, recognition: AWARDS } = useContent();
  return (
    <div data-screen-label="About">
      <section className="page">
        <div className="about-bio">
          <p className="about-lede">
            Full-stack developer, seven years in. I build web applications and care about the details that make them feel right.
          </p>
          <p className="about-body">
            I work across the stack from Postgres to React. Most of my time goes to TypeScript, but I reach for Rust or Go when performance matters. I've shipped CMS platforms, realtime collaboration engines, data dashboards, and a few tools nobody asked for.
          </p>
          <p className="about-body">
            Based in Jakarta. Open to contract work and collaborations.
          </p>
        </div>
        <div className="about-strip">
          <div>
            <span className="about-k">Now</span>
            <span>Founding engineer, stealth devtools.</span>
          </div>
          <div>
            <span className="about-k">Based</span>
            <span>Jakarta, Indonesia · GMT+7</span>
          </div>
          <div>
            <span className="about-k">Available</span>
            <span>Q3 to Q4 2026</span>
          </div>
          <div>
            <span className="about-k">Elsewhere</span>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="#">github</a>
              <a href="#">read.cv</a>
              <a href="#">are.na</a>
              <a href="#">twitter</a>
            </div>
          </div>
        </div>
        <div className="about-section">
          <div className="sec-label">
            <span className="l">Skills</span>
            <span className="r">2018 to now</span>
          </div>
          <div className="skills-list">
            {SKILLS.map((s, i) => (
              <div className="skill" key={i}>
                <div className="name">{s.name} <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'ui-monospace,monospace', marginLeft: 6 }}>{s.years}</span></div>
                <div className="opinion">{s.opinion}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-section">
          <div className="sec-label">
            <span className="l">Experience</span>
            <span className="r">2019 to present</span>
          </div>
          <div className="history">
            {HISTORY.map((j, i) => (
              <div className="job" key={i}>
                <div className="yr">{j.yr}</div>
                <div>
                  <div className="role">{j.role} <span className="at">at {j.where}</span></div>
                  <div className="note">{j.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-section">
          <div className="sec-label">
            <span className="l">Recognition</span>
            <span className="r">2020 to 2024</span>
          </div>
          <div className="awards">
            {AWARDS.map((a, i) => (
              <div className="award" key={i}>
                <div className="yr">{a.yr}</div>
                <div className="name">{a.name}</div>
                <div className="where">{a.where}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
