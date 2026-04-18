import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from './work.entity';
import { WorkPhoto } from './work-photo.entity';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Work, WorkPhoto])],
  providers: [WorksService],
  controllers: [WorksController],
})
export class WorksModule {}
