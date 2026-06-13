import { createContext, useContext, useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Project, Skill, HistoryItem, Award } from '../types';
import { fetchWorks, fetchSkills, fetchExperience, fetchRecognition } from '../lib/api';

interface ContentState {
  works: Project[];
  skills: Skill[];
  experience: HistoryItem[];
  recognition: Award[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const ContentContext = createContext<ContentState | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [works, setWorks] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<HistoryItem[]>([]);
  const [recognition, setRecognition] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [w, s, e, r] = await Promise.all([
        fetchWorks(),
        fetchSkills(),
        fetchExperience(),
        fetchRecognition(),
      ]);
      setWorks(w);
      setSkills(s);
      setExperience(e);
      setRecognition(r);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <ContentContext.Provider value={{ works, skills, experience, recognition, loading, error, refresh }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): ContentState {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}

export function findWork(works: Project[], slug: string): Project | undefined {
  return works.find((p) => p.slug === slug);
}

export function workIndex(works: Project[], slug: string): number {
  return works.findIndex((p) => p.slug === slug);
}
