import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CollectionStatus } from '@prisma/client';

@Injectable()
export class PublicService {
  constructor(private prisma: PrismaService) {}

  async getTalleristas(filters?: {
    occupation?: string;
    city?: string;
    state?: string;
    search?: string;
  }) {
    const where: any = {
      isActive: true,
      collections: {
        some: {
          status: CollectionStatus.PUBLISHED,
        },
      },
    };

    if (filters?.occupation) {
      where.occupation = { contains: filters.occupation };
    }

    if (filters?.city) {
      where.city = { contains: filters.city };
    }

    if (filters?.state) {
      where.state = { contains: filters.state };
    }

    if (filters?.search) {
      where.OR = [
        { businessName: { contains: filters.search } },
        { occupation: { contains: filters.search } },
        { description: { contains: filters.search } },
      ];
    }

    const talleristas = await this.prisma.userProfile.findMany({
      where,
      select: {
        id: true,
        businessName: true,
        occupation: true,
        description: true,
        city: true,
        state: true,
        featuredImage: true,
        collections: {
          where: { status: CollectionStatus.PUBLISHED },
          select: {
            id: true,
            images: {
              take: 1,
              orderBy: { order: 'asc' },
              select: { url: true },
            },
          },
          take: 1,
        },
      },
      orderBy: { businessName: 'asc' },
    });

    return talleristas.map((t) => ({
      id: t.id,
      businessName: t.businessName,
      occupation: t.occupation,
      description: t.description,
      city: t.city,
      state: t.state,
      featuredImage: t.featuredImage || t.collections[0]?.images[0]?.url || null,
    }));
  }

  async getTalleristaDetail(id: string) {
    const tallerista = await this.prisma.userProfile.findFirst({
      where: {
        id,
        isActive: true,
      },
      include: {
        collections: {
          where: { status: CollectionStatus.PUBLISHED },
          include: {
            images: {
              orderBy: { order: 'asc' },
            },
          },
          orderBy: { publishedAt: 'desc' },
        },
      },
    });

    if (!tallerista) {
      throw new NotFoundException('Tallerista no encontrado');
    }

    return tallerista;
  }

  async getCollectionDetail(collectionId: string) {
    const collection = await this.prisma.collection.findFirst({
      where: {
        id: collectionId,
        status: CollectionStatus.PUBLISHED,
      },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        userProfile: {
          select: {
            id: true,
            businessName: true,
            occupation: true,
            city: true,
            state: true,
          },
        },
      },
    });

    if (!collection) {
      throw new NotFoundException('Colección no encontrada');
    }

    return collection;
  }

  async getOccupations() {
    const occupations = await this.prisma.userProfile.findMany({
      where: { isActive: true },
      select: { occupation: true },
      distinct: ['occupation'],
    });

    return occupations.map((o) => o.occupation).filter(Boolean);
  }

  async getLocations() {
    const locations = await this.prisma.userProfile.findMany({
      where: { isActive: true },
      select: { city: true, state: true },
      distinct: ['city', 'state'],
    });

    return {
      cities: [...new Set(locations.map((l) => l.city).filter(Boolean))],
      states: [...new Set(locations.map((l) => l.state).filter(Boolean))],
    };
  }
}
