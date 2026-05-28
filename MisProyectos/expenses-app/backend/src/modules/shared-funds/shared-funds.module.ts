import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedFundEntity } from './shared-fund.entity';
import { SharedFundsService } from './shared-funds.service';
import { SharedFundsController } from './shared-funds.controller';

// Necesitamos MemberSalariesService para calcular el breakdown
import { MemberSalariesModule } from '../member-salaries/member-salaries.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SharedFundEntity]),
    MemberSalariesModule, // <-- da acceso a MemberSalariesService
  ],
  controllers: [SharedFundsController],
  providers: [SharedFundsService],
  exports: [SharedFundsService],
})
export class SharedFundsModule {}