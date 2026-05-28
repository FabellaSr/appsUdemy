import { Body, Controller, Delete,Put, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
    @Body() body: UserEntity,
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
 

