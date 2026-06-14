import { supabase } from './supabase';

const AUTH_ID = 'admin@portfolio.local';

export async function login(password: string): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase.auth.signInWithPassword({ email: AUTH_ID, password });
  if (error) return { ok: false, error: 'Incorrect password.' };
  return { ok: true };
}

export async function isAuthed(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

export async function logout(): Promise<void> {
  await supabase.auth.signOut();
}
