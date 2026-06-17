import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'node:path';

export const sqlConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.SQL_HOST ?? 'localhost',
  port: Number(process.env.SQL_PORT ?? 5432),
  username: process.env.SQL_USER ?? 'postgres',
  password: process.env.SQL_PASSWORD ?? '',
  database: process.env.SQL_DB ?? 'expenses',
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  // En producción (Railway/Supabase) desactivar synchronize y usar el script SQL
  synchronize: process.env.NODE_ENV !== 'production',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});
