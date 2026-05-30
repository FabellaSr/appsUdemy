
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../middleware/jwt-auth.guard';
import { RolesGuard } from '../../middleware/roles.guard';
import { Roles } from '../../middleware/roles.decorator';

import { SharedFundsService } from './shared-funds.service';
import { SharedFundDto } from './dto/shared-fund.dto';

@ApiTags('shared-funds')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('shared-funds')
export class SharedFundsController {
  constructor(private svc: SharedFundsService) {}

  @Get()
  list() {
    return this.svc.list();
  }

  @Get('current')
  @ApiQuery({ name: 'year', type: Number })
  @ApiQuery({ name: 'month', type: Number })
  current(
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    return this.svc.getByMonth(Number(year), Number(month));
  }

  /**
   * Devuelve cuánto debe aportar cada miembro al fondo
   * de forma proporcional a su salario del mes.
   *
   * GET /shared-funds/:year/:month/breakdown
   */
  @Get(':year/:month/breakdown')
  breakdown(
    @Param('year', ParseIntPipe) year: number,
    @Param('month', ParseIntPipe) month: number,
  ) {
    return this.svc.getBreakdown(year, month);
  }

  @Roles('ADMIN')
  @Post()
  create(@Body() dto: SharedFundDto) { 
    return this.svc.create(dto);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<SharedFundDto>,
  ) {
    return this.svc.update(Number(id), dto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(Number(id));
  }
}