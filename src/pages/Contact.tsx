import { Mag } from '../components/Mag';

export function Contact() {
  return (
    <div data-screen-label="Contact">
      <section className="contact">
        <h1>Let's make <span className="ac">something</span> <span className="dim">that lingers a little longer than a homepage.</span></h1>
        <p className="lede">
          I take on a small number of commissions each year, mostly with studios, founders, and editors. I reply to every honest email within a working day. If you have a brief or a budget, or just a project that has been bothering you, write it down and send it over.
        </p>
        <div className="contact-row">
          <div className="col">
            <h4>Direct</h4>
            <a href="mailto:hello@marvel.dev">hello@marvel.dev</a>
            <a href="tel:+62811">+62 811 0000 0000</a>
            <p style={{ fontSize: 14, marginTop: 8 }}>Replies within a working day.</p>
          </div>
          <div className="col">
            <h4>Elsewhere</h4>
            <a href="#">github / marvelcollin</a>
            <a href="#">twitter / @marvelcollin</a>
            <a href="#">read.cv / marvel</a>
            <a href="#">are.na / marvel-collin</a>
          </div>
          <div className="col">
            <h4>For studios &amp; founders</h4>
            <p>Open Q3 to Q4 2026.</p>
            <p>Indicative day rate on request.</p>
            <p>Briefs welcomed in any format: pdf, doc, voice note, half-finished sentence.</p>
          </div>
        </div>
        <div style={{ marginTop: 60, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Mag><a className="btn primary" href="mailto:hello@marvel.dev">Write the email →</a></Mag>
          <Mag><a className="btn" href="#">Download CV ↓</a></Mag>
          <Mag><a className="btn" href="#">Book a 20 min →</a></Mag>
        </div>
      </section>
    </div>
  );
}
