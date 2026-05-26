import { useState } from 'react';
import { PROJECTS } from '../content/projects';
import { Thumbnail } from '../components/Thumbnail';

export function Work() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.tag === filter);
  const layouts = ['v-a', 'v-b', 'v-a', 'v-c', 'v-b', 'v-a', 'v-b', 'v-c', 'v-a', 'v-b'];
  return (
    <div data-screen-label="Work">
      <section className="page">
        <div className="work-head">
          <h1>The whole shelf: <span className="dim">ten projects, four years, one developer.</span></h1>
          <p className="note">Most were not on the front page of anyone's portfolio template. A few were. I list them all because both kinds taught me something I needed.</p>
        </div>
        <div className="work-filter">
          <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>All ({PROJECTS.length})</button>
          <button className={filter === 'client' ? 'on' : ''} onClick={() => setFilter('client')}>Client ({PROJECTS.filter(p => p.tag === 'client').length})</button>
          <button className={filter === 'product' ? 'on' : ''} onClick={() => setFilter('product')}>Product ({PROJECTS.filter(p => p.tag === 'product').length})</button>
          <button className={filter === 'personal' ? 'on' : ''} onClick={() => setFilter('personal')}>Personal ({PROJECTS.filter(p => p.tag === 'personal').length})</button>
        </div>
        <div className="work-spread">
          {filtered.map((p) => {
            const v = layouts[PROJECTS.indexOf(p) % layouts.length] || 'v-a';
            return (
              <div key={p.slug} className={'spread ' + v}>
                <a className="thumb" href={'#/work/' + p.slug} style={{ cursor: 'none' }}>
                  <Thumbnail p={p} />
                  <span className="corner">№ {p.num} · {p.year}</span>
                  <span className="corner r">{p.tag}</span>
                  <span className="name-overlay">{p.name} <span className="it">, {p.brief.toLowerCase().replace(/\.$/, '')}.</span></span>
                </a>
                <div className="meta">
                  <div className="num">№ {p.num} / 010</div>
                  <h3>
                    {p.name}
                    <span className="desc">{p.desc}.</span>
                  </h3>
                  <p className="info">{p.body[0]}</p>
                  <div className="specs">
                    <span><b>Role:</b> {p.role}</span>
                    <span><b>Stack:</b> {p.stack}</span>
                    <span><b>Client:</b> {p.client}</span>
                    <span><b>Year:</b> {p.year}</span>
                  </div>
                  <a className="read" href={'#/work/' + p.slug}>Read the project →</a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
