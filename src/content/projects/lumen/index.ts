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
  desc: "a personal film catalog, Letterboxd's introvert cousin",
  brief: "Letterboxd for people who don't want feeds.",
  body: [
    'Lumen is a personal film catalog. No feed, no followers, no scoring algorithm. Just a private journal that remembers what you watched and asks gentle questions about it.',
    'Built solo over three weekends. Runs on SQLite. The whole thing is small enough to back up by email.',
    'Used by ~80 friends through a closed invite. I have no plans to scale it.',
  ],
  result: '80 quiet users',
  tone: 'gold',
  stills: ['Watch list', 'Entry page', 'Year in review'],
};

export default project;
