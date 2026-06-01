import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../middleware/jwt-auth.guard';

import { RolesGuard } from '../../middleware/roles.guard';

import { Roles } from '../../middleware/roles.decorator';

import { MemberSalariesService } from './member-salaries.service';

import { MemberSalaryDto } from './dto/member-salary.dto';
import { UpdateMemberSalaryDto } from './dto/update-member-salary.dto';

@ApiTags('member-salaries')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('member-salaries')
export class MemberSalariesController {
  constructor(
    private svc: MemberSalariesService,
  ) { }

  @Get()
  list() {
    return this.svc.list();
  } 

  @Get('current')
  current(
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    return this.svc.getByMonth(
      Number(year),
      Number(month),
    );
  }

  @Roles('ADMIN')
  @Post()
  create(@Body() dto: MemberSalaryDto) {
    return this.svc.create(dto);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMemberSalaryDto,) {
    //console.log("aca", dto, id);
    return this.svc.update(id, dto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(Number(id));
  }
}