import { SKILLS, HISTORY, AWARDS } from '../content/about';

export function About() {
  return (
    <div data-screen-label="About">
      <section className="page">
        <div className="about-grid">
          <div>
            <p className="about-lede">
              <b>I'm Marvel</b>, a full-stack developer who spends too long on the typography. Seven years in, ten projects deep, still in love with the part where <span className="ac">a button finally feels right</span>.
            </p>
            <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.55, color: 'var(--fg-dim)', maxWidth: '54ch' }}>
              I work across the stack, interface to index. I prefer projects where I can touch the database and the kerning in the same week, and I take typography about as seriously as performance. Outside the editor: bad coffee, good light, a worrying number of bookmarks.
            </p>
            <p style={{ marginTop: 14, fontSize: 18, lineHeight: 1.55, color: 'var(--fg-dim)', maxWidth: '54ch' }}>
              I write occasionally, ship monthly, and answer email within a working day.
            </p>
          </div>
          <aside className="about-aside">
            <div className="item">
              <div className="k">Now</div>
              <div className="v">Founding engineer at a <a href="#">stealth devtools</a> company.</div>
            </div>
            <div className="item">
              <div className="k">Based</div>
              <div className="v">Jakarta, Indonesia · GMT+7</div>
            </div>
            <div className="item">
              <div className="k">Available</div>
              <div className="v">Q3 to Q4 2026, for selected work.</div>
            </div>
            <div className="item">
              <div className="k">Elsewhere</div>
              <div className="v">
                <a href="#">github</a> · <a href="#">read.cv</a> · <a href="#">are.na</a> · <a href="#">twitter</a>
              </div>
            </div>
          </aside>
        </div>
        <div className="about-section">
          <div className="sec-label">
            <span className="l">What the hands know</span>
            <span className="r">Ten disciplines · honest opinions</span>
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
            <span className="l">Awards</span>
            <span className="r">Six commendations, six honest reactions</span>
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
