import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { ExpenseEntity } from '../expenses/expense.entity';
import { CategoryEntity } from '../categories/category.entity';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ExpenseEntity) private expenses: Repository<ExpenseEntity>,
    @InjectRepository(CategoryEntity) private categories: Repository<CategoryEntity>,
    @InjectRepository(UserEntity) private users: Repository<UserEntity>,
  ) {}

  async monthly(year: number, month: number) {
    const start = new Date(year, month - 1, 1).toISOString().slice(0, 10);
    const end = new Date(year, month, 0).toISOString().slice(0, 10);
    const items = await this.expenses.find({ where: { date: Between(start, end) } });
    const cats = await this.categories.find();
    const users = await this.users.find();

    const totalAmount = items.reduce((s, e) => s + Number(e.amount), 0);
    const byCategory = cats.map((c) => {
      const total = items.filter((e) => e.categoryId === c.id).reduce((s, e) => s + Number(e.amount), 0);
      return {
        categoryId: c.id,
        categoryName: c.name,
        total,
        pct: totalAmount ? Math.round((total / totalAmount) * 100) : 0,
      };
    });
    
    const byMember = users.map((u) => ({
      userId: u.id,
      userName: u.name,
      total: items.filter((e) => e.userId === u.authId).reduce((s, e) => s + Number(e.amount), 0),
    }));
    
    return { totalAmount, byCategory, byMember, recent: items.slice(0, 10) };
  }

  async member(userId: string, year: number, month: number) {
    const start = new Date(year, month - 1, 1).toISOString().slice(0, 10);
    const end = new Date(year, month, 0).toISOString().slice(0, 10);
    const expenses = await this.expenses.find({ where: { userId, date: Between(start, end) } });
    const total = expenses.reduce((s, e) => s + Number(e.amount), 0);
    return { total, expenses };
  }
}
