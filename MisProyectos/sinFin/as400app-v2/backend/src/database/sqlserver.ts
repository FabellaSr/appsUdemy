import sql from 'mssql';

let pool: sql.ConnectionPool | null = null;

export const connectSql = async () => {
  pool = await new sql.ConnectionPool({
    server: process.env.MSSQL_HOST!,
    port: Number(process.env.MSSQL_PORT ?? 1433),
    user: process.env.MSSQL_USER!,
    password: process.env.MSSQL_PASSWORD!,
    database: process.env.MSSQL_DB!,
    options: { trustServerCertificate: true, encrypt: false },
  }).connect();
  console.log('[mssql] connected');
};

export const getSqlPool = () => {
  if (!pool) throw new Error('SQL pool not initialized');
  return pool;
};
