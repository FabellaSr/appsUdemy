import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { StorageModule } from '../../services/storage/storage.module';
import { WatermarkModule } from '../../services/watermark/watermark.module';
import { CollectionsModule } from '../collections/collections.module';
import * as multer from 'multer';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        storage: multer.memoryStorage(),
        limits: {
          fileSize: 10 * 1024 * 1024, // 10MB
        },
        fileFilter: (req, file, cb) => {
          if (file.mimetype.match(/^image\/(jpeg|jpg|png|gif|webp)$/)) {
            cb(null, true);
          } else {
            cb(new Error('Solo se permiten imágenes (JPEG, PNG, GIF, WebP)'), false);
          }
        },
      }),
      inject: [ConfigService],
    }),
    StorageModule,
    WatermarkModule,
    CollectionsModule,
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
