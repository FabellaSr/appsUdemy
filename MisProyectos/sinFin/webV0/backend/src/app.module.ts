import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PricingModule } from './modules/pricing/pricing.module';
import { UploadModule } from './modules/upload/upload.module';
import { ContactModule } from './modules/contact/contact.module';
import { AdminModule } from './modules/admin/admin.module';
import { PublicModule } from './modules/public/public.module';

// Services
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './services/mailer/mailer.module';
import { StorageModule } from './services/storage/storage.module';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),

    // MongoDB para autenticación
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI', 'mongodb://localhost:27017/talleristas_auth'),
      }),
      inject: [ConfigService],
    }),

    // Prisma para SQL Server
    PrismaModule,

    // Core Services
    MailerModule,
    StorageModule,

    // Feature Modules
    AuthModule,
    UsersModule,
    CollectionsModule,
    PaymentsModule,
    PricingModule,
    UploadModule,
    ContactModule,
    AdminModule,
    PublicModule,
  ],
})
export class AppModule {}
