import type { Project } from '../../../types';

const project: Project = {
  slug: 'helios',
  num: '01',
  name: 'Helios',
  year: '2025',
  role: 'Full-stack + Design',
  stack: 'Next.js · Postgres · three.js',
  client: 'Solar co-op, Bandung',
  tag: 'client',
  desc: 'a rooftop-solar dashboard for a co-op in Bandung',
  brief: 'A solar energy dashboard for 142 households.',
  body: [
    'Helios is a residential solar dashboard for a rooftop cooperative in Bandung. 142 households use it to track their energy production, consumption, and savings.',
    'The main feature is a real-time sun visualization rendered in WebGL, positioned using solar-position calculations and tinted by live weather data. The rest of the interface focuses on making energy numbers readable without requiring any technical background.',
    'Daily engagement increased 38% in the first month after launch.',
  ],
  result: '+38% daily engagement',
  tone: 'warm',
  stills: ['Hero with sun render', 'Daily reading view', 'Household breakdown'],
};

export default project;
