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
  brief: 'A CMS for people who actually write.',
  body: [
    'Vermillion was a content management system built backwards from the typical CMS. The editor came first; the database came second. Writers got a real writing surface: Lexical, custom blocks, a real outline pane, and a backend that figured itself out from what got typed.',
    'I was the founding engineer. We shipped to 600 paying customers over 18 months, then sold the company to a larger publishing platform that mostly wanted the editor.',
    'Lessons: building for writers is mostly about not getting in the way. Every modal we removed made the product feel faster.',
  ],
  result: 'Acquired, 2024',
  tone: 'vermillion',
  stills: ['Editor surface', 'Outline pane', 'Publish flow'],
};

export default project;
