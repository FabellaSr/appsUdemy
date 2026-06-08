import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private prisma: PrismaService,
  ) {}

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const profile = await this.prisma.userProfile.findUnique({
      where: { mongoUserId: userId },
      include: {
        collections: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
      },
      profile,
    };
  }

  async updateProfile(userId: string, updateDto: UpdateProfileDto) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { mongoUserId: userId },
    });

    if (!profile) {
      throw new NotFoundException('Perfil no encontrado');
    }

    return this.prisma.userProfile.update({
      where: { mongoUserId: userId },
      data: {
        businessName: updateDto.businessName,
        occupation: updateDto.occupation,
        description: updateDto.description,
        phone: updateDto.phone,
        address: updateDto.address,
        city: updateDto.city,
        state: updateDto.state,
        country: updateDto.country,
        website: updateDto.website,
        socialLinks: updateDto.socialLinks ? JSON.stringify(updateDto.socialLinks) : undefined,
      },
    });
  }

  async updateFeaturedImage(userId: string, imageUrl: string) {
    return this.prisma.userProfile.update({
      where: { mongoUserId: userId },
      data: { featuredImage: imageUrl },
    });
  }

  async getDashboardStats(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { mongoUserId: userId },
    });

    if (!profile) {
      throw new NotFoundException('Perfil no encontrado');
    }

    const [totalCollections, publishedCollections, pendingPayments, totalMessages] =
      await Promise.all([
        this.prisma.collection.count({ where: { userProfileId: profile.id } }),
        this.prisma.collection.count({
          where: { userProfileId: profile.id, status: 'PUBLISHED' },
        }),
        this.prisma.payment.count({
          where: { userProfileId: profile.id, status: 'PENDING' },
        }),
        this.prisma.contactMessage.count({
          where: { userProfileId: profile.id, isRead: false },
        }),
      ]);

    return {
      totalCollections,
      publishedCollections,
      pendingPayments,
      unreadMessages: totalMessages,
    };
  }

  async getPaymentHistory(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { mongoUserId: userId },
    });

    if (!profile) {
      throw new NotFoundException('Perfil no encontrado');
    }

    return this.prisma.payment.findMany({
      where: { userProfileId: profile.id },
      orderBy: { createdAt: 'desc' },
      include: {
        collection: {
          select: { title: true },
        },
      },
    });
  }

  async getMessages(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { mongoUserId: userId },
    });

    if (!profile) {
      throw new NotFoundException('Perfil no encontrado');
    }

    return this.prisma.contactMessage.findMany({
      where: { userProfileId: profile.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markMessageAsRead(userId: string, messageId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { mongoUserId: userId },
    });

    if (!profile) {
      throw new NotFoundException('Perfil no encontrado');
    }

    return this.prisma.contactMessage.update({
      where: { id: messageId, userProfileId: profile.id },
      data: { isRead: true },
    });
  }
}
