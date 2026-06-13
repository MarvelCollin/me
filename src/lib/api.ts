import { supabase, TABLES } from './supabase';
import type { Project, Skill, HistoryItem, Award, Education } from '../types';

export type WorkInput = Omit<Project, 'id'>;
export type SkillInput = Omit<Skill, 'id' | 'sort'>;
export type ExperienceInput = Omit<HistoryItem, 'id' | 'sort'>;
export type RecognitionInput = Omit<Award, 'id' | 'sort'>;
export type EducationInput = Omit<Education, 'id' | 'sort'>;

interface WorkRow {
  id: string;
  slug: string;
  num: string;
  name: string;
  year: string;
  role: string;
  stack: string;
  client: string;
  tag: string;
  description: string;
  brief: string;
  body: string[];
  result: string;
  tone: string;
  stills: string[];
  cover: string | null;
  images: string[] | null;
  repo: string | null;
}

interface SkillRow {
  id: string;
  name: string;
  opinion: string;
  sort: number;
}

interface ExperienceRow {
  id: string;
  yr: string;
  role: string;
  place: string;
  note: string;
  sort: number;
}

interface RecognitionRow {
  id: string;
  yr: string;
  name: string;
  place: string;
  image: string | null;
  sort: number;
}

function rowToWork(r: WorkRow): Project {
  return {
    id: r.id,
    slug: r.slug,
    num: r.num,
    name: r.name,
    year: r.year,
    role: r.role,
    stack: r.stack,
    client: r.client,
    tag: r.tag,
    desc: r.description,
    brief: r.brief,
    body: r.body ?? [],
    result: r.result,
    tone: r.tone,
    stills: r.stills ?? [],
    cover: r.cover ?? undefined,
    images: r.images ?? undefined,
    repo: r.repo ?? undefined,
  };
}

function workToRow(w: WorkInput) {
  return {
    slug: w.slug,
    num: w.num,
    name: w.name,
    year: w.year,
    role: w.role,
    stack: w.stack,
    client: w.client,
    tag: w.tag,
    description: w.desc,
    brief: w.brief,
    body: w.body,
    result: w.result,
    tone: w.tone,
    stills: w.stills,
    cover: w.cover ?? null,
    images: w.images ?? null,
    repo: w.repo ?? null,
  };
}

function rowToExperience(r: ExperienceRow): HistoryItem {
  return { id: r.id, yr: r.yr, role: r.role, where: r.place, note: r.note, sort: r.sort };
}

function experienceToRow(e: ExperienceInput) {
  return { yr: e.yr, role: e.role, place: e.where, note: e.note };
}

function rowToRecognition(r: RecognitionRow): Award {
  return { id: r.id, yr: r.yr, name: r.name, where: r.place, image: r.image ?? undefined, sort: r.sort };
}

function recognitionToRow(a: RecognitionInput) {
  return { yr: a.yr, name: a.name, place: a.where, image: a.image ?? null };
}

function guard<T>(data: T | null, error: { message: string } | null): T {
  if (error) throw new Error(error.message);
  return data as T;
}

async function nextSort(table: string): Promise<number> {
  const { data } = await supabase.from(table).select('sort').order('sort', { ascending: false }).limit(1);
  const top = (data as { sort: number }[] | null)?.[0]?.sort;
  return typeof top === 'number' ? top + 1 : 0;
}

export async function fetchWorks(): Promise<Project[]> {
  const { data, error } = await supabase.from(TABLES.works).select('*').order('num', { ascending: true });
  return guard(data as WorkRow[] | null, error).map(rowToWork);
}

export async function createWork(input: WorkInput): Promise<void> {
  const { error } = await supabase.from(TABLES.works).insert(workToRow(input));
  if (error) throw new Error(error.message);
}

export async function updateWork(id: string, input: WorkInput): Promise<void> {
  const { error } = await supabase.from(TABLES.works).update(workToRow(input)).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteWork(id: string): Promise<void> {
  const { error } = await supabase.from(TABLES.works).delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function fetchSkills(): Promise<Skill[]> {
  const { data, error } = await supabase.from(TABLES.skills).select('*').order('sort', { ascending: true });
  return guard(data as SkillRow[] | null, error);
}

export async function createSkill(input: SkillInput): Promise<void> {
  const sort = await nextSort(TABLES.skills);
  const { error } = await supabase.from(TABLES.skills).insert({ ...input, sort });
  if (error) throw new Error(error.message);
}

export async function updateSkill(id: string, input: SkillInput): Promise<void> {
  const { error } = await supabase.from(TABLES.skills).update(input).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteSkill(id: string): Promise<void> {
  const { error } = await supabase.from(TABLES.skills).delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function fetchExperience(): Promise<HistoryItem[]> {
  const { data, error } = await supabase.from(TABLES.experience).select('*').order('sort', { ascending: true });
  return guard(data as ExperienceRow[] | null, error).map(rowToExperience);
}

export async function createExperience(input: ExperienceInput): Promise<void> {
  const sort = await nextSort(TABLES.experience);
  const { error } = await supabase.from(TABLES.experience).insert({ ...experienceToRow(input), sort });
  if (error) throw new Error(error.message);
}

export async function updateExperience(id: string, input: ExperienceInput): Promise<void> {
  const { error } = await supabase.from(TABLES.experience).update(experienceToRow(input)).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteExperience(id: string): Promise<void> {
  const { error } = await supabase.from(TABLES.experience).delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function fetchRecognition(): Promise<Award[]> {
  const { data, error } = await supabase.from(TABLES.recognition).select('*').order('sort', { ascending: true });
  return guard(data as RecognitionRow[] | null, error).map(rowToRecognition);
}

export async function createRecognition(input: RecognitionInput): Promise<void> {
  const sort = await nextSort(TABLES.recognition);
  const { error } = await supabase.from(TABLES.recognition).insert({ ...recognitionToRow(input), sort });
  if (error) throw new Error(error.message);
}

export async function updateRecognition(id: string, input: RecognitionInput): Promise<void> {
  const { error } = await supabase.from(TABLES.recognition).update(recognitionToRow(input)).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteRecognition(id: string): Promise<void> {
  const { error } = await supabase.from(TABLES.recognition).delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function fetchEducation(): Promise<Education[]> {
  const { data, error } = await supabase.from(TABLES.education).select('*').order('sort', { ascending: true });
  return guard(data as Education[] | null, error);
}

export async function createEducation(input: EducationInput): Promise<void> {
  const sort = await nextSort(TABLES.education);
  const { error } = await supabase.from(TABLES.education).insert({ ...input, sort });
  if (error) throw new Error(error.message);
}

export async function updateEducation(id: string, input: EducationInput): Promise<void> {
  const { error } = await supabase.from(TABLES.education).update(input).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteEducation(id: string): Promise<void> {
  const { error } = await supabase.from(TABLES.education).delete().eq('id', id);
  if (error) throw new Error(error.message);
}
