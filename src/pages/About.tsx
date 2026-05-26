import { SKILLS, HISTORY, AWARDS } from '../content/about';

export function About() {
  return (
    <div data-screen-label="About">
      <section className="page">
        <div className="about-bio">
          <p className="about-lede">
            I'm Marvel, a full-stack developer who spends too long on the typography. Seven years in, ten projects deep, still in love with the part where a button finally feels right.
          </p>
          <p className="about-body">
            I work across the stack, interface to index. I prefer projects where I can touch the database and the kerning in the same week, and I take typography about as seriously as performance. Outside the editor: bad coffee, good light, a worrying number of bookmarks.
          </p>
          <p className="about-body">
            I write occasionally, ship monthly, and answer email within a working day.
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
            <span className="l">A short history</span>
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
