import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'node:path';

type SupportedDB = 'mssql' | 'postgres';

export const sqlConfig = (): TypeOrmModuleOptions => {
  const db = (process.env.DB_TYPE ?? 'mssql') as SupportedDB;
  const isPostgres = db === 'postgres';

  const base = {
    host: process.env.SQL_HOST ?? 'localhost',
    port: Number(process.env.SQL_PORT ?? (isPostgres ? 5432 : 1433)),
    username: process.env.SQL_USER ?? (isPostgres ? 'postgres' : 'sa'),
    password: process.env.SQL_PASSWORD ?? '',
    database: process.env.SQL_DB ?? 'expenses',
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    synchronize: process.env.NODE_ENV !== 'production',
  };

  if (isPostgres) {
    return { type: 'postgres', ...base };
  }

  return {
    type: 'mssql',
    ...base,
    options: { encrypt: false, trustServerCertificate: true },
  };
};
