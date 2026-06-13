import type { Project } from '../../../types';

const project: Project = {
  slug: 'atlas',
  num: '07',
  name: 'Atlas',
  year: '2023',
  role: 'Creative dev',
  stack: 'Svelte · MapLibre · WebGL',
  client: 'Studio Black',
  tag: 'client',
  desc: 'a lightweight map app for slow connections',
  brief: 'A travel map that works on 3G.',
  body: [
    'Atlas is a map application for travelers on slow connections. 52kb gzipped including the map renderer, vector tiles, and a custom offline cache.',
    'Built with Svelte for the shell and MapLibre with a custom WebGL tile renderer. First contentful paint on 3G: 1.4 seconds.',
    'Won a GSAP showcase mention for the elevation transitions.',
  ],
  result: 'FCP 1.4s on 3G',
  tone: 'ocean',
  stills: ['Map render', 'Offline mode', 'Elevation transitions'],
};

export default project;
