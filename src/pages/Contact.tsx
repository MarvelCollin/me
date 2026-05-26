import { Mag } from '../components/Mag';

export function Contact() {
  return (
    <div data-screen-label="Contact">
      <section className="contact">
        <a className="contact-email" href="mailto:hello@marvel.dev">hello@marvel.dev</a>
        <p className="contact-note">
          I take on a small number of commissions each year with studios, founders, and editors. Briefs welcomed in any format. I reply within a working day.
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
          <Mag><a className="btn primary" href="mailto:hello@marvel.dev">Write the email →</a></Mag>
          <Mag><a className="btn" href="#">Download CV ↓</a></Mag>
          <Mag><a className="btn" href="#">Book 20 min →</a></Mag>
        </div>
      </section>
    </div>
  );
}
