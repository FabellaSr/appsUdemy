// modules/member-salaries/member-salaries.service.ts

import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { MemberSalaryEntity } from './member-salary.entity';

import { MemberSalaryDto } from './dto/member-salary.dto';

@Injectable()
export class MemberSalariesService {
  constructor(
    @InjectRepository(MemberSalaryEntity)
    private repo: Repository<MemberSalaryEntity>,
  ) {}

  list() {
    return this.repo.find({
      relations: ['user'],
      order: {
        year: 'DESC',
        month: 'DESC',
      },
    });
  }

  getByMonth( year: number,  month: number ) {
    return this.repo.find({
      where: {
        year,
        month,
      },
      relations: ['user'],
    });
  }

  create(dto: MemberSalaryDto) {
    return this.repo.save(
      this.repo.create(dto),
    );
  }

  async update( userId: string, dto: Partial<MemberSalaryDto>) {
    const salary = await this.repo.findOneBy({ userId });
    if (!salary) {
      throw new NotFoundException();
    }
    Object.assign(salary, dto);
    return this.repo.save(salary);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}