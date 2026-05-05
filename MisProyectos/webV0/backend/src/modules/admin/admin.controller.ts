import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '../auth/schemas/user.schema';
import { UpdatePricingDto, CreatePricingDto, RejectDto } from './dto/admin.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Dashboard
  @Get('dashboard')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  // Usuarios
  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Put('users/:id/toggle-status')
  async toggleUserStatus(@Param('id') userId: string) {
    return this.adminService.toggleUserStatus(userId);
  }

  // Colecciones
  @Get('collections')
  async getAllCollections() {
    return this.adminService.getAllCollections();
  }

  @Get('collections/pending')
  async getPendingCollections() {
    return this.adminService.getPendingCollections();
  }

  @Post('collections/:id/approve')
  async approveCollection(@Param('id') collectionId: string) {
    return this.adminService.approveCollection(collectionId);
  }

  @Post('collections/:id/reject')
  async rejectCollection(
    @Param('id') collectionId: string,
    @Body() rejectDto: RejectDto,
  ) {
    return this.adminService.rejectCollection(collectionId, rejectDto.reason);
  }

  // Pagos
  @Get('payments')
  async getAllPayments() {
    return this.adminService.getAllPayments();
  }

  @Get('payments/pending')
  async getPendingPayments() {
    return this.adminService.getPendingPayments();
  }

  @Post('payments/:id/approve')
  async approvePayment(
    @CurrentUser('userId') adminUserId: string,
    @Param('id') paymentId: string,
  ) {
    return this.adminService.approvePayment(adminUserId, paymentId);
  }

  @Post('payments/:id/reject')
  async rejectPayment(
    @CurrentUser('userId') adminUserId: string,
    @Param('id') paymentId: string,
    @Body() rejectDto: RejectDto,
  ) {
    return this.adminService.rejectPayment(adminUserId, paymentId, rejectDto.reason);
  }

  // Pricing
  @Get('pricing')
  async getAllPricing() {
    return this.adminService.getAllPricing();
  }

  @Post('pricing')
  async createPricing(@Body() createDto: CreatePricingDto) {
    return this.adminService.createPricing(createDto);
  }

  @Put('pricing/:id')
  async updatePricing(
    @Param('id') pricingId: string,
    @Body() updateDto: UpdatePricingDto,
  ) {
    return this.adminService.updatePricing(pricingId, updateDto);
  }
}
