import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyCloseEntity } from './monthly-close.entity';
import { MonthlyCloseController } from './monthly-close.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MonthlyCloseEntity])],
  controllers: [MonthlyCloseController],
})
export class MonthlyCloseModule {}
