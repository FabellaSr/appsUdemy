import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../users/user.entity';
import { Provider } from '../providers/provider.entity';
import { Work } from '../works/work.entity';
import { WorkPhoto } from '../works/work-photo.entity';
import { Payment } from '../payments/payment.entity';
import { Notification } from '../notifications/notification.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mssql',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '1433', 10),
  username: process.env.DB_USERNAME ?? 'sa',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'talleristas',
  entities: [User, Provider, Work, WorkPhoto, Payment, Notification],
  synchronize: process.env.NODE_ENV !== 'production',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  extra: { connectionTimeout: 30000, requestTimeout: 30000 },
};

export const AppDataSource = new DataSource(dataSourceOptions);
