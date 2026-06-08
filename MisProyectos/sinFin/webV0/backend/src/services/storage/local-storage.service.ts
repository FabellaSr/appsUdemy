import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import { IStorageProvider } from './storage.service';

@Injectable()
export class LocalStorageService implements IStorageProvider {
  private uploadDir: string;
  private baseUrl: string;

  constructor(private configService: ConfigService) {
    this.uploadDir = this.configService.get<string>('UPLOAD_DIR', './uploads');
    this.baseUrl = this.configService.get<string>('BASE_URL', 'http://localhost:4000');
  }

  async upload(buffer: Buffer, filename: string, mimeType: string): Promise<string> {
    const filePath = path.join(this.uploadDir, filename);
    const dir = path.dirname(filePath);

    // Crear directorio si no existe
    await fs.mkdir(dir, { recursive: true });

    // Escribir archivo
    await fs.writeFile(filePath, buffer);

    // Retornar URL relativa
    return `/uploads/${filename}`;
  }

  async delete(url: string): Promise<void> {
    // Extraer path del archivo
    const relativePath = url.replace('/uploads/', '');
    const filePath = path.join(this.uploadDir, relativePath);

    try {
      await fs.unlink(filePath);
    } catch (error) {
      // Ignorar si el archivo no existe
      console.warn(`Could not delete file: ${filePath}`);
    }
  }

  async getPresignedUrl(filename: string, mimeType: string): Promise<{ url: string }> {
    // Para storage local, retornamos la URL de upload directa
    return {
      url: `${this.baseUrl}/api/v1/upload/direct?filename=${encodeURIComponent(filename)}`,
    };
  }
}
