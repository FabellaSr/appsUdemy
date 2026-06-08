import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@CurrentUser('userId') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Put('profile')
  async updateProfile(
    @CurrentUser('userId') userId: string,
    @Body() updateDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(userId, updateDto);
  }

  @Get('dashboard/stats')
  async getDashboardStats(@CurrentUser('userId') userId: string) {
    return this.usersService.getDashboardStats(userId);
  }

  @Get('payments')
  async getPaymentHistory(@CurrentUser('userId') userId: string) {
    return this.usersService.getPaymentHistory(userId);
  }

  @Get('messages')
  async getMessages(@CurrentUser('userId') userId: string) {
    return this.usersService.getMessages(userId);
  }

  @Put('messages/:id/read')
  async markMessageAsRead(
    @CurrentUser('userId') userId: string,
    @Param('id') messageId: string,
  ) {
    return this.usersService.markMessageAsRead(userId, messageId);
  }
}
