import type { Project } from './IProject';
import type { Skill } from './ISkill';
import type { HistoryItem } from './IHistoryItem';
import type { Award } from './IAward';
import type { Education } from './IEducation';

export interface ContentState {
  works: Project[];
  skills: Skill[];
  experience: HistoryItem[];
  recognition: Award[];
  education: Education[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}
