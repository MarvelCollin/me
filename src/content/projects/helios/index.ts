import type { Project } from '../../../types';

const project: Project = {
  slug: 'helios',
  num: '01',
  name: 'Helios',
  year: '2025',
  role: 'Full-stack � Design',
  stack: 'Next.js � Postgres � three.js',
  client: 'Solar co-op, Bandung',
  tag: 'client',
  desc: 'a rooftop-solar dashboard for a co-op in Bandung',
  brief: 'Make the numbers feel less like a bill.',
  body: [
    'Helios is a residential solar dashboard for a rooftop cooperative in Bandung, 142 households watching their roofs make electricity. The brief was, in full, four words: make the numbers feel less like a bill.',
    'We built an interface that wakes, peaks, and rests with the sun outside the window. The hero shows the actual sun, rendered in WebGL (not a logo, not an icon), pulled from solar-position math and tinted by the day\'s weather forecast. The numbers stay simple. The motion does the explaining.',
    'Engagement went up 38% in the first month. The marketing team had asked for a logo. We sent them weather, instead.',
  ],
  result: '+38% daily engagement',
  tone: 'warm',
  stills: ['Hero � sun render', 'Daily reading', 'Household breakdown'],
};

export default project;
