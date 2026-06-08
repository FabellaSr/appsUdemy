import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../../prisma/prisma.service';
import * as templates from './templates';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  private from: string;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.from = this.configService.get<string>('MAIL_FROM', 'Talleristas <noreply@talleristas.com>');

    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT', 587),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string, templateName: string) {
    try {
      await this.transporter.sendMail({
        from: this.from,
        to,
        subject,
        html,
      });

      // Log email enviado
      await this.prisma.emailLog.create({
        data: {
          to,
          subject,
          template: templateName,
          status: 'sent',
        },
      });

      return true;
    } catch (error) {
      // Log error
      await this.prisma.emailLog.create({
        data: {
          to,
          subject,
          template: templateName,
          status: 'failed',
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        },
      });

      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendPasswordReset(to: string, token: string, firstName: string) {
    const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;
    const html = templates.passwordReset(firstName, resetUrl);
    return this.sendEmail(to, 'Restablecer tu contraseña - Talleristas', html, 'password-reset');
  }

  async sendPaymentApproved(to: string, firstName: string, amount: string, type: string) {
    const html = templates.paymentApproved(firstName, amount, type);
    return this.sendEmail(to, 'Pago aprobado - Talleristas', html, 'payment-approved');
  }

  async sendPaymentRejected(to: string, firstName: string, amount: string, reason: string) {
    const html = templates.paymentRejected(firstName, amount, reason);
    return this.sendEmail(to, 'Pago rechazado - Talleristas', html, 'payment-rejected');
  }

  async sendCollectionApproved(to: string, firstName: string, collectionTitle: string) {
    const html = templates.collectionApproved(firstName, collectionTitle);
    return this.sendEmail(to, 'Colección aprobada y publicada - Talleristas', html, 'collection-approved');
  }

  async sendCollectionRejected(to: string, firstName: string, collectionTitle: string, reason: string) {
    const html = templates.collectionRejected(firstName, collectionTitle, reason);
    return this.sendEmail(to, 'Colección rechazada - Talleristas', html, 'collection-rejected');
  }

  async sendWelcome(to: string, firstName: string) {
    const html = templates.welcome(firstName);
    return this.sendEmail(to, 'Bienvenido a Talleristas', html, 'welcome');
  }
}
