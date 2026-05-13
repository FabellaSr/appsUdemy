import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseEntity } from '../expenses/expense.entity';
import { CategoryEntity } from '../categories/category.entity';
import { UserEntity } from '../users/user.entity';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseEntity, CategoryEntity, UserEntity])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
