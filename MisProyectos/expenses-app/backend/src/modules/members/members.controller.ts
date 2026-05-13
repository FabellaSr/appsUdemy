import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../../middleware/jwt-auth.guard';
import { RolesGuard } from '../../middleware/roles.guard';
import { Roles } from '../../middleware/roles.decorator';
import { UserEntity } from '../users/user.entity';

@ApiTags('members')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('members')
export class MembersController {
  constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {}
  @Get() list() { return this.repo.find(); }
  @Post() add(@Body() body: { email: string; name: string; role: 'ADMIN' | 'MEMBER'; authId: string }) {
    return this.repo.save(this.repo.create(body));
  }
  @Delete(':id') remove(@Param('id') id: string) { return this.repo.delete(id); }
}
