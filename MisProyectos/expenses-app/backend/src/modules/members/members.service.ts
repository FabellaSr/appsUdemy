import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(UserEntity)
    private membersRepository: Repository<UserEntity>,
  ) {}

  async list() {
    return this.membersRepository.find({
      select: ['id', 'email', 'name', 'role'],
    });
  }

  async getById(id: string) {
    const user = await this.membersRepository.findOne({
      where: { id },
      select: ['id', 'email', 'name', 'role'],
    });
    if (!user) throw new NotFoundException('Miembro no encontrado');
    return user;
  }

  async update(id: string, body: Partial<Pick<UserEntity, 'name' | 'role'>>) {
    await this.membersRepository.update(id, body);
    return this.getById(id);
  }

  async remove(id: string) {
    return this.membersRepository.delete(id);
  }
}