import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedFundEntity } from './shared-fund.entity';

import { SharedFundsService } from './shared-funds.service';
import { SharedFundsController } from './shared-funds.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SharedFundEntity,
    ]),
  ],

  controllers: [
    SharedFundsController,
  ],

  providers: [
    SharedFundsService,
  ],

  exports: [
    SharedFundsService,
  ],
})
export class SharedFundsModule {}