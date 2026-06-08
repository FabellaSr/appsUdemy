import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { IStorageProvider } from './storage.service';

@Injectable()
export class S3StorageService implements IStorageProvider {
  private s3Client: S3Client;
  private bucket: string;
  private region: string;

  constructor(private configService: ConfigService) {
    this.region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    this.bucket = this.configService.get<string>('AWS_S3_BUCKET', '');

    const endpoint = this.configService.get<string>('AWS_ENDPOINT');

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID', ''),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY', ''),
      },
      ...(endpoint && {
        endpoint,
        forcePathStyle: true, // Necesario para LocalStack
      }),
    });
  }

  async upload(buffer: Buffer, filename: string, mimeType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: filename,
      Body: buffer,
      ContentType: mimeType,
    });

    await this.s3Client.send(command);

    // Retornar URL pública
    const endpoint = this.configService.get<string>('AWS_ENDPOINT');
    if (endpoint) {
      // LocalStack URL
      return `${endpoint}/${this.bucket}/${filename}`;
    }

    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${filename}`;
  }

  async delete(url: string): Promise<void> {
    // Extraer key de la URL
    const key = this.extractKeyFromUrl(url);
    if (!key) return;

    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await this.s3Client.send(command);
  }

  async getPresignedUrl(filename: string, mimeType: string): Promise<{ url: string; fields?: Record<string, string> }> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: filename,
      ContentType: mimeType,
    });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });

    return { url };
  }

  private extractKeyFromUrl(url: string): string | null {
    try {
      const urlObj = new URL(url);
      // Quitar el leading slash
      return urlObj.pathname.slice(1);
    } catch {
      return null;
    }
  }
}
