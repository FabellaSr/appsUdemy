import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { sqlConfig } from './config/sql.config';
import { mongoConfig } from './config/mongo.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { MembersModule } from './modules/members/members.module';
import { ReportsModule } from './modules/reports/reports.module';
import { MonthlyCloseModule } from './modules/monthly-close/monthly-close.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(sqlConfig()),
    MongooseModule.forRoot(mongoConfig().uri),
    AuthModule,
    UsersModule,
    CategoriesModule,
    ExpensesModule,
    MembersModule,
    ReportsModule,
    MonthlyCloseModule,
  ],
})
export class AppModule {}
