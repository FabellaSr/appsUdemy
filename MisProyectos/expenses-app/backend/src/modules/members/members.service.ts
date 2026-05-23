import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../users/user.entity';

@Injectable()
export class MembersService {

  constructor(
    @InjectRepository(UserEntity)
    private membersRepository: Repository<UserEntity>,
  ) {}

  async create(data: {
    authId: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'MEMBER';
  }) {

    const member = this.membersRepository.create({
      authId: data.authId,
      email: data.email,
      name: data.name,
      role: data.role,
    });

    return this.membersRepository.save(member);
  }

  async list() {
    return this.membersRepository.find();
  }
  
  async getById(id: string) {
    return this.membersRepository.findOne({
      where: { id },
    });
}

  async remove(id: string) {
    return this.membersRepository.delete(id);
  }
  async update(id: string, body: UserEntity) {
    await this.membersRepository.update(id, body);

    return this.getById(id);
}
}