import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { dataSourceOptions } from './database/data-source';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProvidersModule } from './providers/providers.module';
import { WorksModule } from './works/works.module';
import { UploadsModule } from './uploads/uploads.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ServeStaticModule.forRoot({
      rootPath: process.env.UPLOADS_DIR ?? join(process.cwd(), 'uploads'),
      serveRoot: '/api/static',
    }),
    AuthModule,
    UsersModule,
    ProvidersModule,
    WorksModule,
    UploadsModule,
    PaymentsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
