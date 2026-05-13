import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonthlyCloseEntity } from './monthly-close.entity';
import { JwtAuthGuard } from '../../middleware/jwt-auth.guard';
import { RolesGuard } from '../../middleware/roles.guard';
import { Roles } from '../../middleware/roles.decorator';

@ApiTags('monthly-close')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('monthly-close')
export class MonthlyCloseController {
  constructor(@InjectRepository(MonthlyCloseEntity) private repo: Repository<MonthlyCloseEntity>) {}

  @Get() list() { return this.repo.find({ order: { year: 'DESC', month: 'DESC' } }); }

  @Roles('ADMIN') @Post('open')
  async open(@Body() body: { year: number; month: number }) {
    const existing = await this.repo.findOneBy({ year: body.year, month: body.month });
    if (existing) { existing.closed = false; existing.closedAt = undefined; return this.repo.save(existing); }
    return this.repo.save(this.repo.create({ ...body, closed: false }));
  }

  @Roles('ADMIN') @Post('close')
  async close(@Body() body: { year: number; month: number }) {
    const existing = await this.repo.findOneBy({ year: body.year, month: body.month })
      ?? this.repo.create({ ...body });
    existing.closed = true;
    existing.closedAt = new Date();
    return this.repo.save(existing);
  }
}
