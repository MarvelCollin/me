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
  repo?: string;
}
