import {
  Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,
} from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto, UpdateProviderDto } from './provider.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { Role } from '../common/roles.enum';
import { CurrentUser } from '../common/current-user.decorator';

@Controller('providers')
export class ProvidersController {
  constructor(private svc: ProvidersService) {}

  @Get() findAll() { return this.svc.findAllPublic(); }

  @Get(':id') findOne(@Param('id') id: string) { return this.svc.findOne(id); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post() create(@Body() dto: CreateProviderDto) { return this.svc.create(dto); }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.PROVIDER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProviderDto, @CurrentUser() user: any) {
    return this.svc.update(id, dto, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id') remove(@Param('id') id: string) { return this.svc.softDelete(id); }
}
