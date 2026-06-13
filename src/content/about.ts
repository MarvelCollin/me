import type { Skill, HistoryItem, Award } from '../types';

export const SKILLS: Skill[] = [
  { name: 'TypeScript',      years: '7y', opinion: 'Strict mode everywhere. Most of my work is in TS.' },
  { name: 'React',           years: '7y', opinion: '12+ production apps. Comfortable with server components.' },
  { name: 'Next.js',         years: '5y', opinion: 'App router, edge runtime, ISR. Production experience across all of it.' },
  { name: 'Node / Bun',      years: '6y', opinion: 'Node for production, Bun for local dev and scripting.' },
  { name: 'Postgres',        years: '6y', opinion: 'Schema design, full-text search, query optimization.' },
  { name: 'Rust',            years: '3y', opinion: 'Used for performance-critical backends and Tauri desktop apps.' },
  { name: 'Go',              years: '4y', opinion: 'Backend services, CLI tools, anything that needs to run reliably.' },
  { name: 'Three.js / GLSL', years: '4y', opinion: 'WebGL data visualization and interactive 3D interfaces.' },
  { name: 'Figma',           years: '5y', opinion: 'Design my own interfaces. Comfortable going from wireframe to code.' },
  { name: 'Tailwind',        years: '4y', opinion: 'Primary styling approach for new projects.' },
];

export const HISTORY: HistoryItem[] = [
  { yr: '2024 to present', role: 'Founding engineer', where: 'Stealth devtools',            note: 'Building a design-first developer tool. Editor surface, CRDT sync, full-stack ownership.' },
  { yr: '2022 to 2024',   role: 'Senior full-stack',  where: 'Northcoast Studio · Jakarta', note: 'Shipped 14 client projects. Mix of marketing sites, CMS builds, and product prototypes.' },
  { yr: '2020 to 2022',   role: 'Product engineer',   where: 'Vermillion Labs',             note: 'Built the CMS editor surface and publish pipeline. Company was acquired in 2024.' },
  { yr: '2019 to 2020',   role: 'Frontend developer', where: 'Folio Co.',                  note: 'First role. Built writing tool interfaces in React and Tauri.' },
];

export const AWARDS: Award[] = [
  { yr: '2025', name: 'Site of the Day',   where: 'Awwwards · Helios' },
  { yr: '2024', name: 'Developer Award',   where: 'CSSDA · Vermillion' },
  { yr: '2024', name: 'FWA of the Day',    where: 'FWA · Marrow' },
  { yr: '2023', name: 'Honorable Mention', where: 'Awwwards · Lumen' },
  { yr: '2023', name: 'GSAP Showcase',     where: 'GreenSock · Atlas' },
  { yr: '2022', name: 'Best Independent',  where: 'Hover.dev · Margins' },
];
