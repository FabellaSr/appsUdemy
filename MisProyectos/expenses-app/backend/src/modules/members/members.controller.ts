import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../../middleware/jwt-auth.guard';
import { RolesGuard } from '../../middleware/roles.guard';
import { Roles } from '../../middleware/roles.decorator';
import { UserEntity } from '../users/user.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { MembersService } from './members.service';

@ApiTags('members')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService,) {}
  @Get() list() { 
    return this.membersService.list(); }
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.membersService.getById(id);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: CreateMemberDto,
  ) {
    return this.membersService.update(id, body);
  }
  @Post()
  add(@Body() body: CreateMemberDto) {
    return this.membersService.create(body);
  }
  
   @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(id);
  }
}
function Put(arg0: string): (target: MembersController, propertyKey: "update", descriptor: TypedPropertyDescriptor<(id: string, body: CreateMemberDto) => any>) => void | TypedPropertyDescriptor<...> {
  throw new Error('Function not implemented.');
}

