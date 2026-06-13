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
  brief: 'A breath-reactive meditation app for iOS.',
  body: [
    'Quiet Forest is an iOS meditation app that generates ambient music from your breathing pattern. It uses AirPods microphones for breath detection and maps inhale/exhale to musical parameters in real time.',
    'I led engineering across SwiftUI, AudioKit, and a C++ DSP layer. The main challenge was reliable breath detection without false positives from ambient noise, yawns, or sighs.',
    'Hit the App Store top 50 in wellness during launch week.',
  ],
  result: 'App Store top 50, week one',
  tone: 'sage',
  stills: ['Listening state', 'Breath waveform', 'Session end'],
};

export default project;
