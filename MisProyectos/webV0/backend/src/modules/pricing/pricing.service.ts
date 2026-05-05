import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PricingType } from '@prisma/client';

@Injectable()
export class PricingService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.pricing.findMany({
      orderBy: { type: 'asc' },
    });
  }

  async findActive() {
    return this.prisma.pricing.findMany({
      where: { isActive: true },
      orderBy: { type: 'asc' },
    });
  }

  async findByType(type: PricingType) {
    return this.prisma.pricing.findFirst({
      where: { type, isActive: true },
    });
  }

  async getCollectionPrice() {
    const pricing = await this.findByType(PricingType.COLLECTION);
    if (!pricing) {
      throw new NotFoundException('Precio de colección no configurado');
    }
    return pricing;
  }

  async getMaintenancePrice() {
    const pricing = await this.findByType(PricingType.MONTHLY_MAINTENANCE);
    if (!pricing) {
      throw new NotFoundException('Precio de mantenimiento no configurado');
    }
    return pricing;
  }
}
