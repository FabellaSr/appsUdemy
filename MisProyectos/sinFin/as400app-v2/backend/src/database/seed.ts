import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import sql from 'mssql';
import { connectSql, getSqlPool } from './sqlserver';

/** Split a SQL script on GO batch separators (case-insensitive, line-anchored). */
function splitBatches(script: string): string[] {
  return script
    .split(/^\s*GO\s*;?\s*$/gim)
    .map((b) => b.trim())
    .filter((b) => b.length > 0);
}

async function execScript(pool: sql.ConnectionPool, file: string, label: string) {
  // Resolve relative to this file so it works in both src (ts-node) and dist (node).
  const candidates = [
    path.join(__dirname, file),
    path.join(__dirname, '..', '..', 'src', 'database', file),
  ];
  const found = candidates.find((p) => fs.existsSync(p));
  if (!found) {
    throw new Error(`[mssql] ${label} file not found. Tried: ${candidates.join(', ')}`);
  }
  const raw = fs.readFileSync(found, 'utf8');
  const batches = splitBatches(raw);
  for (const batch of batches) {
    await pool.request().batch(batch);
  }
  console.log(`[mssql] ${label} OK (${batches.length} batch${batches.length === 1 ? '' : 'es'})`);
}

export async function runSqlSeed(maxRetries = 5, delayMs = 3000): Promise<void> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const pool = getSqlPool();
      await execScript(pool, 'schema.sql', 'schema');
      await execScript(pool, 'seed.sql', 'seed');
      return;
    } catch (err) {
      lastErr = err;
      console.warn(`[mssql] seed attempt ${attempt}/${maxRetries} failed:`, (err as Error).message);
      if (attempt < maxRetries) await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw lastErr;
}

// Allow running standalone: `npm run seed`
if (require.main === module) {
  (async () => {
    try {
      await connectSql();
      await runSqlSeed();
      console.log('[mssql] standalone seed completed');
      process.exit(0);
    } catch (err) {
      console.error('[mssql] standalone seed failed:', err);
      process.exit(1);
    }
  })();
}
