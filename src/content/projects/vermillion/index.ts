import type { Project } from '../../../types';

const project: Project = {
  slug: 'vermillion',
  num: '03',
  name: 'Vermillion',
  year: '2024',
  role: 'Founding engineer',
  stack: 'Next.js · Lexical · Postgres',
  client: 'Vermillion Labs (acquired)',
  tag: 'product',
  desc: 'a CMS built around the editor, not the database',
  brief: 'An editor-first CMS for writers.',
  body: [
    'Vermillion is a CMS where the editor drives the data model, not the other way around. Writers get a Lexical-based editing surface with custom blocks, an outline pane, and a backend that infers schema from content.',
    'I was the founding engineer. We shipped to 600 paying customers over 18 months.',
    'The company was acquired in 2024 by a publishing platform that wanted the editor technology.',
  ],
  result: 'Acquired, 2024',
  tone: 'vermillion',
  stills: ['Editor surface', 'Outline pane', 'Publish flow'],
};

export default project;
