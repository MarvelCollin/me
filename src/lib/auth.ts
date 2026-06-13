const SESSION_KEY = 'pk_admin_session';

async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function sessionToken(): Promise<string> {
  return sha256('pk-session::' + import.meta.env.VITE_ADMIN_PASSWORD);
}

export async function login(input: string): Promise<boolean> {
  const expected = import.meta.env.VITE_ADMIN_PASSWORD;
  if (!expected) return false;
  const inputHash = await sha256(input);
  const expectedHash = await sha256(expected);
  if (!constantTimeEqual(inputHash, expectedHash)) return false;
  sessionStorage.setItem(SESSION_KEY, await sessionToken());
  return true;
}

export async function isAuthed(): Promise<boolean> {
  const stored = sessionStorage.getItem(SESSION_KEY);
  if (!stored) return false;
  return constantTimeEqual(stored, await sessionToken());
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
