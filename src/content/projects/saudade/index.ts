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
  desc: 'a music journal that asks where you were when you heard it',
  brief: 'A music journal with one prompt: where were you?',
  body: [
    "Saudade is a music journal. Connect Spotify, and for every song you save, the app asks one question: where were you when you heard this? You answer in two sentences. That's it.",
    'Over time you get a small atlas of music memories. Search by feeling. Re-read your past selves.',
    'Built for myself. Six other people use it. None of us have feeds.',
  ],
  result: '7 users, 6,400 entries',
  tone: 'rose',
  stills: ['Save flow', 'Memory map', 'Year list'],
};

export default project;
