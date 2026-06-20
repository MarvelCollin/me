import { supabase } from '../supabase';

export function guard<T>(data: T | null, error: { message: string } | null): T {
  if (error) throw new Error(error.message);
  return data as T;
}

export async function nextSort(table: string): Promise<number> {
  const { data } = await supabase.from(table).select('sort').order('sort', { ascending: false }).limit(1);
  const top = (data as { sort: number }[] | null)?.[0]?.sort;
  return typeof top === 'number' ? top + 1 : 0;
}
