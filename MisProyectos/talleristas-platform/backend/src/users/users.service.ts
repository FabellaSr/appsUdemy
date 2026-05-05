import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { Role } from '../common/roles.enum';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email }, relations: ['provider'] });
  }

  async findById(id: string) {
    const user = await this.repo.findOne({ where: { id }, relations: ['provider'] });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(data: { email: string; password: string; role?: Role }) {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = this.repo.create({
      email: data.email,
      password: hashed,
      role: data.role ?? Role.PROVIDER,
    });
    return this.repo.save(user);
  }

  async validatePassword(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
  }
}
