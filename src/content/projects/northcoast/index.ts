import type { Project } from '../../../types';

const project: Project = {
  slug: 'northcoast',
  num: '09',
  name: 'Northcoast',
  year: '2022',
  role: 'Solo',
  stack: 'PWA · IndexedDB · GPS',
  client: 'For my dad',
  tag: 'personal',
  desc: 'an offline sailing log for my dad',
  brief: 'A logbook that works in the middle of the sea.',
  body: [
    'Northcoast is an offline-first sailing logbook I built for my dad. He sails small boats around the Java sea and complained that no existing logbook worked when he was out of range, which was most of the time.',
    'Pure PWA, IndexedDB for storage, the device GPS for position fixes. Syncs when it sees wifi again.',
    "He's used it on every trip for three years. The first thing he says when he gets home is 'check the boat log.'",
  ],
  result: '3 years in continuous use, by one user',
  tone: 'navy',
  stills: ['Trip log', 'GPS fix', 'Sync state'],
};

export default project;
