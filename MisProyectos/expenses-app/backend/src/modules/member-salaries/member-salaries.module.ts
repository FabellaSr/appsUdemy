// modules/member-salaries/member-salaries.module.ts

import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { MemberSalaryEntity } from './member-salary.entity';

import { MemberSalariesService } from './member-salaries.service';

import { MemberSalariesController } from './member-salaries.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemberSalaryEntity,
    ]),
  ],

  controllers: [
    MemberSalariesController,
  ],

  providers: [
    MemberSalariesService,
  ],

  exports: [
    MemberSalariesService,
  ],
})
export class MemberSalariesModule {}