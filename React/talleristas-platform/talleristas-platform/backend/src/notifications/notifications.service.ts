import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './notification.dto';
import { Role } from '../common/roles.enum';

@Injectable()
export class NotificationsService {
  constructor(@InjectRepository(Notification) private repo: Repository<Notification>) {}

  findForUser(user: { role: Role; providerId: string | null }) {
    if (user.role === Role.ADMIN) {
      return this.repo.find({ relations: ['provider'], order: { createdAt: 'DESC' } });
    }
    return this.repo.find({
      where: { provider: { id: user.providerId } as any },
      order: { createdAt: 'DESC' },
    });
  }

  create(dto: CreateNotificationDto) {
    const n = this.repo.create({
      title: dto.title,
      message: dto.message,
      provider: { id: dto.providerId } as any,
    });
    return this.repo.save(n);
  }

  async markRead(id: string, user: { role: Role; providerId: string | null }) {
    const n = await this.repo.findOne({ where: { id }, relations: ['provider'] });
    if (!n) throw new NotFoundException();
    if (user.role !== Role.ADMIN && n.provider.id !== user.providerId) {
      throw new ForbiddenException();
    }
    n.isRead = true;
    return this.repo.save(n);
  }
}
