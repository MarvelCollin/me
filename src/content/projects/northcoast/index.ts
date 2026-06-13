import type { Project } from '../../../types';

const project: Project = {
  slug: 'northcoast',
  num: '09',
  name: 'Northcoast',
  year: '2022',
  role: 'Solo',
  stack: 'PWA · IndexedDB · GPS',
  client: 'Personal',
  tag: 'personal',
  desc: 'an offline sailing logbook PWA',
  brief: 'An offline-first sailing logbook.',
  body: [
    'Northcoast is a PWA sailing logbook that works without a network connection. Built for my dad, who sails small boats around the Java Sea and needed a log that worked out of cell range.',
    'Pure service worker architecture, IndexedDB for storage, device GPS for position fixes. Syncs when it finds wifi.',
    'He\'s used it on every trip for three years.',
  ],
  result: '3 years, continuous use',
  tone: 'navy',
  stills: ['Trip log', 'GPS fix', 'Sync state'],
};

export default project;
