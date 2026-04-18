import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, UpdatePaymentDto } from './payment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { Role } from '../common/roles.enum';
import { CurrentUser } from '../common/current-user.decorator';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
  constructor(private svc: PaymentsService) {}

  @Roles(Role.ADMIN, Role.PROVIDER)
  @Get()
  list(@CurrentUser() user: any) { return this.svc.findForUser(user); }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreatePaymentDto) { return this.svc.create(dto); }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePaymentDto) {
    return this.svc.update(id, dto);
  }
}
