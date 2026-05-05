import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { PrismaService } from '../../prisma/prisma.service';
import { MailerService } from '../../services/mailer/mailer.service';
import { PaymentStatus, CollectionStatus, PricingType } from '@prisma/client';
import { UpdatePricingDto } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  // ===== USUARIOS =====
  async getAllUsers() {
    const users = await this.userModel.find().select('-password').lean();
    
    // Obtener perfiles de SQL Server
    const profiles = await this.prisma.userProfile.findMany({
      include: {
        _count: {
          select: { collections: true, payments: true },
        },
      },
    });

    const profileMap = new Map(profiles.map(p => [p.mongoUserId, p]));

    return users.map(user => ({
      ...user,
      profile: profileMap.get(user._id.toString()) || null,
    }));
  }

  async toggleUserStatus(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    user.isActive = !user.isActive;
    await user.save();

    // Actualizar perfil en SQL Server
    await this.prisma.userProfile.updateMany({
      where: { mongoUserId: userId },
      data: { isActive: user.isActive },
    });

    return { isActive: user.isActive };
  }

  // ===== COLECCIONES =====
  async getAllCollections() {
    return this.prisma.collection.findMany({
      include: {
        userProfile: true,
        images: {
          take: 1,
          orderBy: { order: 'asc' },
        },
        _count: {
          select: { images: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPendingCollections() {
    return this.prisma.collection.findMany({
      where: { status: CollectionStatus.PENDING_APPROVAL },
      include: {
        userProfile: true,
        images: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async approveCollection(collectionId: string) {
    const collection = await this.prisma.collection.findUnique({
      where: { id: collectionId },
      include: { userProfile: true },
    });

    if (!collection) {
      throw new NotFoundException('Colección no encontrada');
    }

    await this.prisma.collection.update({
      where: { id: collectionId },
      data: {
        isApproved: true,
        status: CollectionStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });

    // Obtener email del usuario
    const user = await this.userModel.findById(collection.userProfile.mongoUserId);
    if (user) {
      await this.mailerService.sendCollectionApproved(
        user.email,
        user.firstName,
        collection.title,
      );
    }

    return { message: 'Colección aprobada y publicada' };
  }

  async rejectCollection(collectionId: string, reason: string) {
    const collection = await this.prisma.collection.findUnique({
      where: { id: collectionId },
      include: { userProfile: true },
    });

    if (!collection) {
      throw new NotFoundException('Colección no encontrada');
    }

    await this.prisma.collection.update({
      where: { id: collectionId },
      data: { status: CollectionStatus.DRAFT },
    });

    // Notificar al usuario
    const user = await this.userModel.findById(collection.userProfile.mongoUserId);
    if (user) {
      await this.mailerService.sendCollectionRejected(
        user.email,
        user.firstName,
        collection.title,
        reason,
      );
    }

    return { message: 'Colección rechazada' };
  }

  // ===== PAGOS =====
  async getAllPayments() {
    return this.prisma.payment.findMany({
      include: {
        userProfile: true,
        collection: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPendingPayments() {
    return this.prisma.payment.findMany({
      where: { status: PaymentStatus.PENDING },
      include: {
        userProfile: true,
        collection: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async approvePayment(adminUserId: string, paymentId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: { userProfile: true, collection: true },
    });

    if (!payment) {
      throw new NotFoundException('Pago no encontrado');
    }

    await this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.APPROVED,
        approvedBy: adminUserId,
        approvedAt: new Date(),
      },
    });

    // Si es pago de colección, marcar colección como pagada
    if (payment.collectionId) {
      await this.prisma.collection.update({
        where: { id: payment.collectionId },
        data: {
          isPaid: true,
          status: CollectionStatus.PENDING_APPROVAL,
        },
      });
    }

    // Notificar al usuario
    const user = await this.userModel.findById(payment.userProfile.mongoUserId);
    if (user) {
      await this.mailerService.sendPaymentApproved(
        user.email,
        user.firstName,
        payment.amount.toString(),
        payment.type,
      );
    }

    return { message: 'Pago aprobado' };
  }

  async rejectPayment(adminUserId: string, paymentId: string, reason: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: { userProfile: true },
    });

    if (!payment) {
      throw new NotFoundException('Pago no encontrado');
    }

    await this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: PaymentStatus.REJECTED,
        rejectedReason: reason,
        approvedBy: adminUserId,
        approvedAt: new Date(),
      },
    });

    // Notificar al usuario
    const user = await this.userModel.findById(payment.userProfile.mongoUserId);
    if (user) {
      await this.mailerService.sendPaymentRejected(
        user.email,
        user.firstName,
        payment.amount.toString(),
        reason,
      );
    }

    return { message: 'Pago rechazado' };
  }

  // ===== PRICING =====
  async getAllPricing() {
    return this.prisma.pricing.findMany({
      orderBy: { type: 'asc' },
    });
  }

  async updatePricing(pricingId: string, updateDto: UpdatePricingDto) {
    const pricing = await this.prisma.pricing.findUnique({
      where: { id: pricingId },
    });

    if (!pricing) {
      throw new NotFoundException('Precio no encontrado');
    }

    return this.prisma.pricing.update({
      where: { id: pricingId },
      data: {
        name: updateDto.name,
        description: updateDto.description,
        price: updateDto.price,
        isActive: updateDto.isActive,
      },
    });
  }

  async createPricing(data: {
    type: PricingType;
    name: string;
    description?: string;
    price: number;
  }) {
    return this.prisma.pricing.create({
      data: {
        type: data.type,
        name: data.name,
        description: data.description,
        price: data.price,
      },
    });
  }

  // ===== DASHBOARD =====
  async getDashboardStats() {
    const [
      totalUsers,
      activeUsers,
      totalCollections,
      publishedCollections,
      pendingPayments,
      pendingCollections,
    ] = await Promise.all([
      this.userModel.countDocuments(),
      this.userModel.countDocuments({ isActive: true }),
      this.prisma.collection.count(),
      this.prisma.collection.count({ where: { status: CollectionStatus.PUBLISHED } }),
      this.prisma.payment.count({ where: { status: PaymentStatus.PENDING } }),
      this.prisma.collection.count({ where: { status: CollectionStatus.PENDING_APPROVAL } }),
    ]);

    // Ingresos del mes
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyRevenue = await this.prisma.payment.aggregate({
      where: {
        status: PaymentStatus.APPROVED,
        approvedAt: { gte: startOfMonth },
      },
      _sum: { amount: true },
    });

    return {
      totalUsers,
      activeUsers,
      totalCollections,
      publishedCollections,
      pendingPayments,
      pendingCollections,
      monthlyRevenue: monthlyRevenue._sum.amount || 0,
    };
  }
}
