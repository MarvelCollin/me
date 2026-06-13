import type { Project } from '../../../types';

const project: Project = {
  slug: 'folio',
  num: '06',
  name: 'Folio',
  year: '2023',
  role: 'Solo',
  stack: 'Tauri · React',
  client: 'Personal',
  tag: 'personal',
  desc: 'a lightweight distraction-free writing app',
  brief: 'A minimal desktop writing app, 12MB.',
  body: [
    'Folio is a distraction-free writing tool built with Tauri and React. At 12MB it\'s a fraction of the size of Electron alternatives.',
    'The one unusual feature: it generates a short editorial comment about your writing once per session, then goes quiet again.',
    'Free and open source. About 3,000 downloads, zero support tickets.',
  ],
  result: '3k downloads',
  tone: 'paper',
  stills: ['Writing surface', 'Comment feature', 'Export'],
};

export default project;
