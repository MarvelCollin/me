import type { Project, Tone } from '../../types';

const mods = import.meta.glob<{ default: Project }>('./*/index.ts', { eager: true });

export const PROJECTS: Project[] = Object.values(mods)
  .map(m => m.default)
  .sort((a, b) => a.num.localeCompare(b.num));

export const TONES: Record<string, Tone> = {
  warm:       { glow: 'rgba(212,178,72,.55)',  tint: 'rgba(212,178,72,.18)',  pos: '68% 38%' },
  sage:       { glow: 'rgba(140,160,108,.50)', tint: 'rgba(140,160,108,.20)', pos: '30% 50%' },
  vermillion: { glow: 'rgba(178,68,52,.40)',   tint: 'rgba(178,68,52,.14)',   pos: '50% 30%' },
  slate:      { glow: 'rgba(115,128,150,.45)', tint: 'rgba(115,128,150,.18)', pos: '75% 60%' },
  gold:       { glow: 'rgba(195,160,80,.50)',  tint: 'rgba(195,160,80,.20)',  pos: '40% 70%' },
  paper:      { glow: 'rgba(190,180,150,.40)', tint: 'rgba(190,180,150,.18)', pos: '55% 45%' },
  ocean:      { glow: 'rgba(95,135,165,.45)',  tint: 'rgba(95,135,165,.18)',  pos: '35% 60%' },
  rose:       { glow: 'rgba(180,120,110,.45)', tint: 'rgba(180,120,110,.18)', pos: '60% 40%' },
  navy:       { glow: 'rgba(80,108,130,.45)',  tint: 'rgba(80,108,130,.18)',  pos: '50% 70%' },
  plum:       { glow: 'rgba(140,98,128,.42)',  tint: 'rgba(140,98,128,.18)',  pos: '45% 35%' },
};

export function projectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug);
}

export function projectIndex(slug: string): number {
  return PROJECTS.findIndex(p => p.slug === slug);
}
