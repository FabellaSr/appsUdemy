import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3StorageService } from './s3-storage.service';
import { LocalStorageService } from './local-storage.service';

export interface IStorageProvider {
  upload(buffer: Buffer, filename: string, mimeType: string): Promise<string>;
  delete(url: string): Promise<void>;
  getPresignedUrl(filename: string, mimeType: string): Promise<{ url: string; fields?: Record<string, string> }>;
}

@Injectable()
export class StorageService implements IStorageProvider {
  private provider: IStorageProvider;

  constructor(
    private configService: ConfigService,
    private s3Storage: S3StorageService,
    private localStorage: LocalStorageService,
  ) {
    const storageProvider = this.configService.get<string>('STORAGE_PROVIDER', 'local');
    
    if (storageProvider === 's3') {
      this.provider = this.s3Storage;
      console.log('📦 Using S3 storage provider');
    } else {
      this.provider = this.localStorage;
      console.log('📦 Using local storage provider');
    }
  }

  async upload(buffer: Buffer, filename: string, mimeType: string): Promise<string> {
    return this.provider.upload(buffer, filename, mimeType);
  }

  async delete(url: string): Promise<void> {
    return this.provider.delete(url);
  }

  async getPresignedUrl(filename: string, mimeType: string): Promise<{ url: string; fields?: Record<string, string> }> {
    return this.provider.getPresignedUrl(filename, mimeType);
  }
}
