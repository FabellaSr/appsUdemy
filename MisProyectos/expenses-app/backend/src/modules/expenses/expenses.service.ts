import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { ExpenseEntity } from './expense.entity';
import { CreateExpenseDto } from './dto/expense.dto';

@Injectable()
export class ExpensesService {
  constructor(@InjectRepository(ExpenseEntity) private repo: Repository<ExpenseEntity>) {}

  list(filter: { month?: number; year?: number; userId?: string }) {
    const where: any = {};
    if (filter.userId) where.userId = filter.userId;
    if (filter.month && filter.year) {
      const start = new Date(filter.year, filter.month - 1, 1).toISOString().slice(0, 10);
      const end = new Date(filter.year, filter.month, 0).toISOString().slice(0, 10);
      where.date = Between(start, end);
    }
    return this.repo.find({ where, order: { date: 'DESC' } });
  }

  create(dto: CreateExpenseDto, userId: string, receiptUrl?: string) {
    console.log("llega"+dto.amount);
    return this.repo.save(this.repo.create({ ...dto, userId: dto.userId ?? userId, receiptUrl }));
  }

  async update(id: string, dto: Partial<CreateExpenseDto>) {
    const e = await this.repo.findOneBy({ id });
    if (!e) throw new NotFoundException();
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  remove(id: string) { return this.repo.delete(id); }
}
