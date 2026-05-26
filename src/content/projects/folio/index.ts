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
  desc: 'a distraction-free writing tool with a sense of humor',
  brief: 'iA Writer with one good joke per session.',
  body: [
    "Folio is a distraction-free writing tool. Like every other distraction-free writing tool, with one exception: it makes one small editorial joke per session about whatever you've written. Then it goes back to being quiet.",
    "Built in Tauri so it's 12MB instead of 350. React for the editor surface.",
    "Free, open source, downloaded around 3,000 times. No support emails. That's the goal.",
  ],
  result: '3k downloads, no tickets',
  tone: 'paper',
  stills: ['Writing surface', 'The joke moment', 'Export'],
};

export default project;
