import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './notification.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { Role } from '../common/roles.enum';
import { CurrentUser } from '../common/current-user.decorator';

@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NotificationsController {
  constructor(private svc: NotificationsService) {}

  @Roles(Role.ADMIN, Role.PROVIDER)
  @Get()
  list(@CurrentUser() user: any) { return this.svc.findForUser(user); }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateNotificationDto) { return this.svc.create(dto); }

  @Roles(Role.ADMIN, Role.PROVIDER)
  @Patch(':id/read')
  read(@Param('id') id: string, @CurrentUser() user: any) {
    return this.svc.markRead(id, user);
  }
}
