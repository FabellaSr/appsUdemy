// modules/shared-funds/shared-funds.service.ts

import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { SharedFundEntity } from './shared-fund.entity';
import { SharedFundDto } from './dto/shared-fund.dto';

@Injectable()
export class SharedFundsService {
  constructor(
    @InjectRepository(SharedFundEntity)
    private repo: Repository<SharedFundEntity>,
  ) {}

  list() {
    return this.repo.find({
      order: {
        year: 'DESC',
        month: 'DESC',
      },
    });
  }

  getByMonth(year: number, month: number) {
    return this.repo.findOne({
      where: {
        year,
        month,
      },
    });
  }

  create(dto: SharedFundDto) {
    return this.repo.save(
      this.repo.create(dto),
    );
  }

  async update(
    id: number,
    dto: Partial<SharedFundDto>,
  ) {
    const fund = await this.repo.findOneBy({ id });

    if (!fund) {
      throw new NotFoundException();
    }

    Object.assign(fund, dto);

    return this.repo.save(fund);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}