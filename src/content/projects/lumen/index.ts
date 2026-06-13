import type { Project } from '../../../types';

const project: Project = {
  slug: 'lumen',
  num: '05',
  name: 'Lumen',
  year: '2024',
  role: 'Solo · Design + Eng',
  stack: 'Next.js · SQLite',
  client: 'Personal',
  tag: 'personal',
  desc: 'a private film catalog and journal',
  brief: 'A personal film journal without the social features.',
  body: [
    'Lumen is a private film catalog. No feed, no followers, no recommendation algorithm. You log what you watched and write a few notes about it.',
    'Built solo over three weekends. Runs on SQLite. Small enough to back up by email.',
    'Used by about 80 people through a closed invite. No plans to scale it.',
  ],
  result: '~80 active users',
  tone: 'gold',
  stills: ['Watch list', 'Entry page', 'Year in review'],
};

export default project;
