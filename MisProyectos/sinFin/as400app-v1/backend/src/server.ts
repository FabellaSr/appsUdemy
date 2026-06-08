import 'dotenv/config';
import { app } from './app';
import { connectMongo } from './database/mongo';
import { connectSql } from './database/sqlserver';

const PORT = Number(process.env.PORT ?? 4000);

(async () => {
  try {
    await connectMongo();
    await connectSql();
  } catch (err) {
    console.error('[startup] DB connection failed (continuing in degraded mode):', err);
  }
  app.listen(PORT, () => console.log(`API listening on :${PORT}`));
})();
