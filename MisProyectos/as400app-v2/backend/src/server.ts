import 'dotenv/config';
import { app } from './app';
import { connectMongo } from './database/mongo';
import { connectSql } from './database/sqlserver';
import { runSqlSeed } from './database/seed';

const PORT = Number(process.env.PORT ?? 4000);

(async () => {
  try {
    await connectMongo();
    await connectSql();
    await runSqlSeed();
  } catch (err) {
    console.error('[startup] DB connection / seed failed (continuing in degraded mode):', err);
  }
  app.listen(PORT, () => console.log(`API listening on :${PORT}`));
})();
