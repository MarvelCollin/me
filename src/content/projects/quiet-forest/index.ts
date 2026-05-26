import type { Project } from '../../../types';

const project: Project = {
  slug: 'quiet-forest',
  num: '02',
  name: 'Quiet Forest',
  year: '2025',
  role: 'Lead engineer',
  stack: 'SwiftUI · AudioKit',
  client: 'Quiet Co.',
  tag: 'client',
  desc: 'a meditation app that turns your breath into ambient music',
  brief: 'Breath in, music out. Nothing else on screen.',
  body: [
    'Quiet Forest is a meditation app that turns your breath into ambient music. You wear AirPods, put the phone face-down, and the app listens. Inhale, the strings rise. Exhale, the pads settle.',
    'I led engineering across SwiftUI, AudioKit and a small C++ DSP layer. The hardest part was getting the breath detection to work at studio level without false positives during a yawn or a sigh.',
    'Launched into the App Store top 50 wellness apps the first week. The team kept it there.',
  ],
  result: 'App Store top 50, week one',
  tone: 'sage',
  stills: ['Listening state', 'Breath waveform', 'Session end'],
};

export default project;
