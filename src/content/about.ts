import type { Skill, HistoryItem, Award } from '../types';

export const SKILLS: Skill[] = [
  { name: 'TypeScript',      years: '7y', opinion: 'Strict mode, satisfies, the works. I write more types than code.' },
  { name: 'React',           years: '7y', opinion: 'Shipped 12+ React apps. Server components are fine, actually.' },
  { name: 'Next.js',         years: '5y', opinion: 'App router is fine, actually. Edge runtime when it helps.' },
  { name: 'Node / Bun',      years: '6y', opinion: 'Bun for dev. Node for prod, until it isn\'t.' },
  { name: 'Postgres',        years: '6y', opinion: 'Joins are a love language. Full-text search beats every vendor.' },
  { name: 'Rust',            years: '3y', opinion: 'For the times JavaScript gives up. Tauri changed my life.' },
  { name: 'Go',              years: '4y', opinion: 'Backends that hum at 4am. Concurrency without the dread.' },
  { name: 'Three.js / GLSL', years: '4y', opinion: 'Pixels with intent, math with patience. Mostly patience.' },
  { name: 'Figma',           years: '5y', opinion: 'Where the mess gets organized. The hands-on design surface I trust.' },
  { name: 'Tailwind',        years: '4y', opinion: 'Yes. I\'ll fight you. Composes faster than your CSS-in-JS.' },
];

export const HISTORY: HistoryItem[] = [
  { yr: '2024 to present', role: 'Founding engineer', where: 'Stealth devtools',            note: 'Devtools for design-first teams. Editor surface, CRDT, the whole stack, including the typography.' },
  { yr: '2022 to 2024',   role: 'Senior full-stack',  where: 'Northcoast Studio · Jakarta', note: 'Shipped 14 client builds. Most were not Awwwards-bait, most were boring CMS work that paid the rent. A few weren\'t.' },
  { yr: '2020 to 2022',   role: 'Product engineer',   where: 'Vermillion Labs',             note: 'CMS surface, editor, the parts that ship to users every day.' },
  { yr: '2019 to 2020',   role: 'Frontend developer', where: 'Folio Co.',                  note: 'First job. Late nights I now regret. Learned what \'over-engineered\' means firsthand.' },
];

export const AWARDS: Award[] = [
  { yr: '2025', name: 'Site of the Day',   where: 'Awwwards · Helios' },
  { yr: '2024', name: 'Developer Award',   where: 'CSSDA · Vermillion' },
  { yr: '2024', name: 'FWA of the Day',    where: 'FWA · Marrow' },
  { yr: '2023', name: 'Honorable Mention', where: 'Awwwards · Lumen' },
  { yr: '2023', name: 'GSAP Showcase',     where: 'GreenSock · Atlas' },
  { yr: '2022', name: 'Best Independent',  where: 'Hover.dev · Margins' },
];
