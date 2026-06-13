import { useContent } from '../content/store';

export function About() {
  const { skills: SKILLS, experience: HISTORY, recognition: AWARDS } = useContent();
  return (
    <div data-screen-label="About">
      <section className="page">
        <div className="about-bio">
          <p className="about-lede">
            Computer Science student at BINUS University and a full-stack engineer. I build web applications and care about the details that make them feel right.
          </p>
          <p className="about-body">
            I work across the stack — TypeScript and React on the front, Go, .NET Core, and PHP on the back, with microservices and RabbitMQ in production on the BINUS laboratory platform. On the side I build games with Three.js, ML experiments in Python, and award-winning robotics.
          </p>
          <p className="about-body">
            Based in Jakarta. Open to collaborations and interesting projects.
          </p>
        </div>
        <div className="about-strip">
          <div>
            <span className="about-k">Now</span>
            <span>Full-stack engineer, BINUS R&D.</span>
          </div>
          <div>
            <span className="about-k">Based</span>
            <span>Jakarta, Indonesia · GMT+7</span>
          </div>
          <div>
            <span className="about-k">Studying</span>
            <span>Computer Science, BINUS University</span>
          </div>
          <div>
            <span className="about-k">Elsewhere</span>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="https://github.com/MarvelCollin" target="_blank" rel="noreferrer">github</a>
              <a href="https://www.linkedin.com/in/marvel-collin-0244a21ba/" target="_blank" rel="noreferrer">linkedin</a>
              <a href="https://www.instagram.com/marvelcolin_/" target="_blank" rel="noreferrer">instagram</a>
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
                <div className="name">{s.name}</div>
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
            <span className="l">Licenses & Awards</span>
            <span className="r">2022 to 2025</span>
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
