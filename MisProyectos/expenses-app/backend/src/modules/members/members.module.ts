import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { MembersController } from './members.controller';

@Module({
  imports: [UsersModule],
  controllers: [MembersController],
})
export class MembersModule {}
