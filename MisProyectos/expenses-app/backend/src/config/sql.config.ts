import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'node:path';

export const sqlConfig = (): TypeOrmModuleOptions => ({
  type: 'mssql',
  host: process.env.SQL_HOST ?? 'localhost',
  port: Number(process.env.SQL_PORT ?? 1433),
  username: process.env.SQL_USER ?? 'sa',
  password: process.env.SQL_PASSWORD ?? '',
  database: process.env.SQL_DB ?? 'expenses',
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  synchronize: process.env.NODE_ENV !== 'production',
  options: { encrypt: false, trustServerCertificate: true },
});
