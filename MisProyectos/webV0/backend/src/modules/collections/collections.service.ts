import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CollectionStatus } from '@prisma/client';
import { CreateCollectionDto, UpdateCollectionDto, ReorderImagesDto } from './dto/collection.dto';

@Injectable()
export class CollectionsService {
  private readonly MAX_IMAGES_PER_COLLECTION = 10;

  constructor(private prisma: PrismaService) {}

  async findAllByUser(userId: string) {
    const profile = await this.getProfileByUserId(userId);

    return this.prisma.collection.findMany({
      where: { userProfileId: profile.id },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { images: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, collectionId: string) {
    const profile = await this.getProfileByUserId(userId);

    const collection = await this.prisma.collection.findFirst({
      where: {
        id: collectionId,
        userProfileId: profile.id,
      },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!collection) {
      throw new NotFoundException('Colección no encontrada');
    }

    return collection;
  }

  async create(userId: string, createDto: CreateCollectionDto) {
    const profile = await this.getProfileByUserId(userId);

    return this.prisma.collection.create({
      data: {
        userProfileId: profile.id,
        title: createDto.title,
        description: createDto.description,
        status: CollectionStatus.DRAFT,
      },
    });
  }

  async update(userId: string, collectionId: string, updateDto: UpdateCollectionDto) {
    const collection = await this.findOne(userId, collectionId);

    return this.prisma.collection.update({
      where: { id: collection.id },
      data: {
        title: updateDto.title,
        description: updateDto.description,
      },
    });
  }

  async delete(userId: string, collectionId: string) {
    const collection = await this.findOne(userId, collectionId);

    // No permitir borrar colecciones publicadas
    if (collection.status === CollectionStatus.PUBLISHED) {
      throw new ForbiddenException('No puedes eliminar una colección publicada. Ocúltala primero.');
    }

    await this.prisma.collection.delete({
      where: { id: collection.id },
    });

    return { message: 'Colección eliminada correctamente' };
  }

  async requestPublication(userId: string, collectionId: string) {
    const collection = await this.findOne(userId, collectionId);

    if (collection.images.length === 0) {
      throw new BadRequestException('La colección debe tener al menos una imagen');
    }

    // Verificar si ya está pagada
    if (!collection.isPaid) {
      return this.prisma.collection.update({
        where: { id: collection.id },
        data: { status: CollectionStatus.PENDING_PAYMENT },
      });
    }

    // Si ya está pagada, ir directamente a pendiente de aprobación
    return this.prisma.collection.update({
      where: { id: collection.id },
      data: { status: CollectionStatus.PENDING_APPROVAL },
    });
  }

  async publish(userId: string, collectionId: string) {
    const collection = await this.findOne(userId, collectionId);

    if (!collection.isPaid || !collection.isApproved) {
      throw new ForbiddenException('La colección debe estar pagada y aprobada para publicar');
    }

    return this.prisma.collection.update({
      where: { id: collection.id },
      data: {
        status: CollectionStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });
  }

  async hide(userId: string, collectionId: string) {
    const collection = await this.findOne(userId, collectionId);

    return this.prisma.collection.update({
      where: { id: collection.id },
      data: { status: CollectionStatus.HIDDEN },
    });
  }

  async addImage(
    userId: string,
    collectionId: string,
    imageData: { url: string; thumbnailUrl?: string; originalName: string; mimeType: string; size: number },
  ) {
    const collection = await this.findOne(userId, collectionId);

    // Verificar límite de imágenes
    const imageCount = await this.prisma.collectionImage.count({
      where: { collectionId: collection.id },
    });

    if (imageCount >= this.MAX_IMAGES_PER_COLLECTION) {
      throw new BadRequestException(`Máximo ${this.MAX_IMAGES_PER_COLLECTION} imágenes por colección`);
    }

    return this.prisma.collectionImage.create({
      data: {
        collectionId: collection.id,
        url: imageData.url,
        thumbnailUrl: imageData.thumbnailUrl,
        originalName: imageData.originalName,
        mimeType: imageData.mimeType,
        size: imageData.size,
        order: imageCount,
      },
    });
  }

  async removeImage(userId: string, collectionId: string, imageId: string) {
    const collection = await this.findOne(userId, collectionId);

    const image = await this.prisma.collectionImage.findFirst({
      where: {
        id: imageId,
        collectionId: collection.id,
      },
    });

    if (!image) {
      throw new NotFoundException('Imagen no encontrada');
    }

    await this.prisma.collectionImage.delete({
      where: { id: imageId },
    });

    return { message: 'Imagen eliminada correctamente' };
  }

  async reorderImages(userId: string, collectionId: string, reorderDto: ReorderImagesDto) {
    const collection = await this.findOne(userId, collectionId);

    const updates = reorderDto.imageOrders.map((item) =>
      this.prisma.collectionImage.update({
        where: {
          id: item.imageId,
          collectionId: collection.id,
        },
        data: { order: item.order },
      }),
    );

    await this.prisma.$transaction(updates);

    return { message: 'Orden actualizado correctamente' };
  }

  private async getProfileByUserId(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { mongoUserId: userId },
    });

    if (!profile) {
      throw new NotFoundException('Perfil no encontrado');
    }

    return profile;
  }
}
