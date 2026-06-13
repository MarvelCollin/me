export function Contact() {
  return (
    <div data-screen-label="Contact">
      <section className="contact">
        <a className="contact-email" href="mailto:hello@marvel.dev">hello@marvel.dev</a>
        <p className="contact-note">
          I take on contract work with studios, founders, and small teams. Send a brief in any format and I'll reply within a working day.
        </p>
        <div className="contact-links">
          <a href="#">github</a>
          <a href="#">twitter</a>
          <a href="#">read.cv</a>
          <a href="#">are.na</a>
        </div>
        <div className="contact-meta">
          <span>Jakarta, Indonesia · GMT+7</span>
          <span>Open Q3 to Q4 2026</span>
          <span>Day rate on request</span>
        </div>
        <div className="contact-actions">
          <a className="btn primary" href="mailto:hello@marvel.dev">Send email →</a>
          <a className="btn" href="#">Download CV ↓</a>
          <a className="btn" href="#">Book 20 min →</a>
        </div>
      </section>
    </div>
  );
}
