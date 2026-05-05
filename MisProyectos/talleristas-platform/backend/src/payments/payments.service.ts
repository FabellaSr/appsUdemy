import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto, UpdatePaymentDto } from './payment.dto';
import { Role } from '../common/roles.enum';

@Injectable()
export class PaymentsService {
  constructor(@InjectRepository(Payment) private repo: Repository<Payment>) {}

  findForUser(user: { role: Role; providerId: string | null }) {
    if (user.role === Role.ADMIN) {
      return this.repo.find({ relations: ['provider'], order: { createdAt: 'DESC' } });
    }
    return this.repo.find({
      where: { provider: { id: user.providerId } as any },
      order: { createdAt: 'DESC' },
    });
  }

  create(dto: CreatePaymentDto) {
    const payment = this.repo.create({
      ...dto,
      provider: { id: dto.providerId } as any,
      paidAt: dto.status === 'paid' ? new Date() : null,
    });
    return this.repo.save(payment);
  }

  async update(id: string, dto: UpdatePaymentDto) {
    const payment = await this.repo.findOne({ where: { id } });
    if (!payment) throw new NotFoundException('Payment not found');
    Object.assign(payment, dto);
    if (dto.status === 'paid' && !payment.paidAt) payment.paidAt = new Date();
    return this.repo.save(payment);
  }
}
