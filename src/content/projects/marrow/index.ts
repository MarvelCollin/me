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
  brief: 'Collaboration that survives 200ms of latency.',
  body: [
    "Marrow is a CRDT-backed realtime collaboration engine for design documents. Think Figma's cursor model, but pluggable into your own canvas.",
    'I worked across the stack: Rust on the server (Yjs-compatible), TypeScript bindings on the client, and the cursor-presence layer that makes it feel alive. Tested with 24 simultaneous editors and 200ms simulated latency.',
    'Now powers two production design tools in early access.',
  ],
  result: 'Powers 2 production design tools',
  tone: 'slate',
  stills: ['Collab cursors', 'Sync timeline', 'Conflict resolution'],
};

export default project;
