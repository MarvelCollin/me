import type { Project } from '../../../types';

const project: Project = {
  slug: 'margins',
  num: '10',
  name: 'Margins',
  year: '2022',
  role: 'Full-stack',
  stack: 'WebExt · Rails',
  client: 'Folio Co.',
  tag: 'client',
  desc: 'a Hypothesis fork for engineering teams',
  brief: 'Code review for prose, sort of.',
  body: [
    'Margins is a web annotation tool, a fork of Hypothesis, built for engineering teams to mark up internal docs and shared specs. Inline comments, threaded discussion, search across all team annotations.',
    'Shipped to 40 teams inside a single org. Internal tool, internal scope, but the kind of work that quietly changes how a company writes.',
    'I worked on the browser extension surface and the Rails search/index backend.',
  ],
  result: '40 teams, ~3,000 annotations / month',
  tone: 'plum',
  stills: ['Annotation popover', 'Thread view', 'Search'],
};

export default project;
