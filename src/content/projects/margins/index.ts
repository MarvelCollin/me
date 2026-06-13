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
  desc: 'a web annotation tool for engineering teams',
  brief: 'Inline annotation and discussion for internal docs.',
  body: [
    'Margins is a web annotation tool forked from Hypothesis, built for engineering teams to mark up internal docs and specs. Inline comments, threaded discussion, full-text search across all team annotations.',
    'I built the browser extension UI and the Rails search/indexing backend.',
    'Deployed to 40 teams in a single org, processing about 3,000 annotations per month.',
  ],
  result: '40 teams, ~3k annotations/month',
  tone: 'plum',
  stills: ['Annotation popover', 'Thread view', 'Search'],
};

export default project;
