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
  desc: 'a slow-internet map for travelers, no JS bloat',
  brief: 'A map you can read on a 3G connection.',
  body: [
    'Atlas is a map application designed for travelers on slow connections. We aggressively trimmed JavaScript (52kb gzipped including the map renderer), used vector tiles, and built our own offline cache.',
    'Built with Svelte for the shell and MapLibre + a custom WebGL tile renderer for the actual map. First contentful paint on 3G: 1.4s.',
    'Won a GSAP showcase mention for the elevation transitions. The animations are basically all CSS.',
  ],
  result: 'FCP 1.4s on 3G',
  tone: 'ocean',
  stills: ['Map render', 'Offline mode', 'Elevation transitions'],
};

export default project;
