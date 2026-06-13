export interface Project {
  id: string;
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
  id: string;
  name: string;
  opinion: string;
  sort: number;
}

export interface HistoryItem {
  id: string;
  yr: string;
  role: string;
  where: string;
  note: string;
  sort: number;
}

export interface Award {
  id: string;
  yr: string;
  name: string;
  where: string;
  image?: string;
  sort: number;
}

export interface Education {
  id: string;
  yr: string;
  degree: string;
  school: string;
  note: string;
  sort: number;
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
  | { kind: 'admin' }
  | { kind: 'project'; slug: string };
