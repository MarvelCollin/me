import { readFileSync, readdirSync } from 'node:fs';
import { Client } from 'pg';

function loadEnv() {
  let raw = '';
  try { raw = readFileSync('.env', 'utf8'); } catch { return; }
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}

loadEnv();

const url = process.env.SUPABASE_DB_URL;
if (!url) {
  console.error('Missing SUPABASE_DB_URL in .env');
  process.exit(1);
}

const mode = process.argv[2] || 'all';
const files = [];

if (mode === 'all' || mode === 'migrate') {
  const dir = 'supabase/migrations';
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.sql')).sort()) files.push(`${dir}/${f}`);
}
if (mode === 'all' || mode === 'seed') files.push('supabase/seed.sql');

const client = new Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
try {
  await client.connect();
  for (const f of files) {
    process.stdout.write(`running ${f} ... `);
    await client.query(readFileSync(f, 'utf8'));
    console.log('ok');
  }
  console.log('done');
} catch (e) {
  console.error('\nfailed:', e.message);
  if (e.code === 'ENOTFOUND' || e.code === 'ETIMEDOUT') {
    console.error('Could not reach the database host. Copy the exact "Connection string" (URI) from');
    console.error('Supabase dashboard -> Project Settings -> Database into SUPABASE_DB_URL in .env');
    console.error('(the pooler URI works on all networks).');
  }
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
