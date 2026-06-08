import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MailerService } from '../../services/mailer/mailer.service';
import { CreateContactMessageDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  async sendMessage(createDto: CreateContactMessageDto) {
    // Verificar que el tallerista existe
    const profile = await this.prisma.userProfile.findUnique({
      where: { id: createDto.userProfileId },
    });

    if (!profile) {
      throw new NotFoundException('Tallerista no encontrado');
    }

    // Guardar mensaje
    const message = await this.prisma.contactMessage.create({
      data: {
        userProfileId: createDto.userProfileId,
        senderName: createDto.senderName,
        senderEmail: createDto.senderEmail,
        senderPhone: createDto.senderPhone,
        subject: createDto.subject,
        message: createDto.message,
      },
    });

    // TODO: Notificar al tallerista por email
    // await this.mailerService.sendNewContactNotification(...)

    return {
      success: true,
      message: 'Mensaje enviado correctamente',
    };
  }

  async getMessagesByProfile(profileId: string) {
    return this.prisma.contactMessage.findMany({
      where: { userProfileId: profileId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(messageId: string) {
    return this.prisma.contactMessage.update({
      where: { id: messageId },
      data: { isRead: true },
    });
  }
}
