import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaymentType, PaymentStatus, CollectionStatus } from '@prisma/client';
import { CreatePaymentDto } from './dto/payment.dto';
import { MailerService } from '../../services/mailer/mailer.service';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async createCollectionPayment(userId: string, createDto: CreatePaymentDto) {
    const profile = await this.getProfileByUserId(userId);

    // Verificar que la colección existe y pertenece al usuario
    const collection = await this.prisma.collection.findFirst({
      where: {
        id: createDto.collectionId,
        userProfileId: profile.id,
      },
    });

    if (!collection) {
      throw new NotFoundException('Colección no encontrada');
    }

    // Obtener precio actual
    const pricing = await this.prisma.pricing.findFirst({
      where: {
        type: PaymentType.COLLECTION,
        isActive: true,
      },
    });

    if (!pricing) {
      throw new BadRequestException('No hay precio configurado para colecciones');
    }

    // Crear pago
    const payment = await this.prisma.payment.create({
      data: {
        userProfileId: profile.id,
        collectionId: collection.id,
        type: PaymentType.COLLECTION,
        amount: pricing.price,
        currency: pricing.currency,
        status: PaymentStatus.PENDING,
        reference: createDto.reference,
        proofUrl: createDto.proofUrl,
        notes: createDto.notes,
      },
    });

    // Actualizar estado de la colección
    await this.prisma.collection.update({
      where: { id: collection.id },
      data: { status: CollectionStatus.PENDING_APPROVAL },
    });

    return payment;
  }

  async createMaintenancePayment(userId: string, createDto: Omit<CreatePaymentDto, 'collectionId'>) {
    const profile = await this.getProfileByUserId(userId);

    // Obtener precio actual
    const pricing = await this.prisma.pricing.findFirst({
      where: {
        type: PaymentType.MONTHLY_MAINTENANCE,
        isActive: true,
      },
    });

    if (!pricing) {
      throw new BadRequestException('No hay precio configurado para mantenimiento');
    }

    // Calcular período
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Crear pago
    return this.prisma.payment.create({
      data: {
        userProfileId: profile.id,
        type: PaymentType.MONTHLY_MAINTENANCE,
        amount: pricing.price,
        currency: pricing.currency,
        status: PaymentStatus.PENDING,
        reference: createDto.reference,
        proofUrl: createDto.proofUrl,
        notes: createDto.notes,
        periodStart,
        periodEnd,
      },
    });
  }

  async uploadProof(userId: string, paymentId: string, proofUrl: string) {
    const profile = await this.getProfileByUserId(userId);

    const payment = await this.prisma.payment.findFirst({
      where: {
        id: paymentId,
        userProfileId: profile.id,
      },
    });

    if (!payment) {
      throw new NotFoundException('Pago no encontrado');
    }

    return this.prisma.payment.update({
      where: { id: paymentId },
      data: { proofUrl },
    });
  }

  async getPaymentsByUser(userId: string) {
    const profile = await this.getProfileByUserId(userId);

    return this.prisma.payment.findMany({
      where: { userProfileId: profile.id },
      include: {
        collection: {
          select: { title: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMaintenanceStatus(userId: string) {
    const profile = await this.getProfileByUserId(userId);

    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const payment = await this.prisma.payment.findFirst({
      where: {
        userProfileId: profile.id,
        type: PaymentType.MONTHLY_MAINTENANCE,
        periodStart: { gte: currentMonth },
        status: PaymentStatus.APPROVED,
      },
    });

    return {
      isPaid: !!payment,
      currentPeriod: {
        month: now.toLocaleString('es-MX', { month: 'long' }),
        year: now.getFullYear(),
      },
      lastPayment: payment,
    };
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
