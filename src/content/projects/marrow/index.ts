import type { Project } from '../../../types';

const project: Project = {
  slug: 'marrow',
  num: '04',
  name: 'Marrow',
  year: '2024',
  role: 'Full-stack',
  stack: 'Rust · Yjs · WebSocket',
  client: 'Marrow.io',
  tag: 'product',
  desc: 'realtime CRDT collab for design documents',
  brief: 'A CRDT collaboration engine for design tools.',
  body: [
    'Marrow is a realtime collaboration engine backed by CRDTs, designed to be embedded in design tools. Similar to Figma\'s multiplayer model but as a pluggable library.',
    'I built the Rust server (Yjs-compatible), TypeScript client bindings, and the cursor-presence layer. Tested with 24 simultaneous editors at 200ms simulated latency.',
    'Currently powers two production design tools in early access.',
  ],
  result: 'Powers 2 production design tools',
  tone: 'slate',
  stills: ['Collab cursors', 'Sync timeline', 'Conflict resolution'],
};

export default project;
