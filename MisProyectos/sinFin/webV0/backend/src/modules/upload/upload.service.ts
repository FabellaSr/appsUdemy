import { Injectable, BadRequestException } from '@nestjs/common';
import { StorageService } from '../../services/storage/storage.service';
import { WatermarkService } from '../../services/watermark/watermark.service';
import { CollectionsService } from '../collections/collections.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private readonly ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  constructor(
    private storageService: StorageService,
    private watermarkService: WatermarkService,
    private collectionsService: CollectionsService,
  ) {}

  async uploadCollectionImage(
    userId: string,
    collectionId: string,
    file: Express.Multer.File,
  ) {
    // Validar archivo
    this.validateFile(file);

    // Aplicar watermark
    const processedBuffer = await this.watermarkService.applyWatermark(file.buffer);

    // Generar nombre único
    const extension = file.originalname.split('.').pop();
    const filename = `collections/${collectionId}/${uuidv4()}.${extension}`;

    // Subir a storage
    const url = await this.storageService.upload(processedBuffer, filename, file.mimetype);

    // Agregar imagen a la colección
    const image = await this.collectionsService.addImage(userId, collectionId, {
      url,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
    });

    return image;
  }

  async uploadProfileImage(userId: string, file: Express.Multer.File) {
    // Validar archivo
    this.validateFile(file);

    // Procesar imagen (sin watermark para perfil)
    const extension = file.originalname.split('.').pop();
    const filename = `profiles/${userId}/${uuidv4()}.${extension}`;

    // Subir a storage
    const url = await this.storageService.upload(file.buffer, filename, file.mimetype);

    return { url };
  }

  async uploadPaymentProof(userId: string, file: Express.Multer.File) {
    // Validar archivo
    this.validateFile(file);

    const extension = file.originalname.split('.').pop();
    const filename = `proofs/${userId}/${uuidv4()}.${extension}`;

    // Subir a storage
    const url = await this.storageService.upload(file.buffer, filename, file.mimetype);

    return { url };
  }

  async getPresignedUrl(filename: string, mimeType: string) {
    return this.storageService.getPresignedUrl(filename, mimeType);
  }

  async deleteFile(url: string) {
    return this.storageService.delete(url);
  }

  private validateFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se proporcionó archivo');
    }

    if (file.size > this.MAX_FILE_SIZE) {
      throw new BadRequestException('El archivo excede el tamaño máximo de 10MB');
    }

    if (!this.ALLOWED_TYPES.includes(file.mimetype)) {
      throw new BadRequestException('Tipo de archivo no permitido. Solo JPEG, PNG, GIF, WebP');
    }
  }
}
