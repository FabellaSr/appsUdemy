import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../users/user.entity';

@Injectable()
export class MembersService {

  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
  ) {}

  async create(data: {
    authId: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'MEMBER';
  }) {

    const member = this.repo.create({
      authId: data.authId,
      email: data.email,
      name: data.name,
      role: data.role,
    });

    return this.repo.save(member);
  }

  async list() {
    return this.repo.find();
  }

  async remove(id: string) {
    return this.repo.delete(id);
  }
}