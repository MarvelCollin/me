export interface Project {
  slug: string;
  num: string;
  name: string;
  year: string;
  role: string;
  stack: string;
  client: string;
  tag: string;
  desc: string;
  brief: string;
  body: string[];
  result: string;
  tone: string;
  stills: string[];
  cover?: string;
  images?: string[];
}

export interface Tone {
  glow: string;
  tint: string;
  pos: string;
}

export interface Skill {
  name: string;
  years: string;
  opinion: string;
}

export interface HistoryItem {
  yr: string;
  role: string;
  where: string;
  note: string;
}

export interface Award {
  yr: string;
  name: string;
  where: string;
}

export interface HoverState {
  p: Project;
  x: number;
  y: number;
}

export type ParsedRoute =
  | { kind: 'home' }
  | { kind: 'work' }
  | { kind: 'about' }
  | { kind: 'contact' }
  | { kind: 'project'; slug: string };
