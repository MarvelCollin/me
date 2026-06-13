import type { Project } from '../../../types';

const project: Project = {
  slug: 'saudade',
  num: '08',
  name: 'Saudade',
  year: '2023',
  role: 'Solo',
  stack: 'Next.js · Spotify API',
  client: 'Personal',
  tag: 'personal',
  desc: 'a music journal connected to Spotify',
  brief: 'A music journal that logs where you were when you heard a song.',
  body: [
    'Saudade connects to Spotify and asks one question for every saved song: where were you when you heard this? You answer in two sentences.',
    'Over time it builds a searchable archive of music memories, organized by feeling and location.',
    'Built for myself. Seven people use it.',
  ],
  result: '7 users, 6,400 entries',
  tone: 'rose',
  stills: ['Save flow', 'Memory map', 'Year list'],
};

export default project;
