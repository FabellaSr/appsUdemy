import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreatePaymentDto, CreateMaintenancePaymentDto, UploadProofDto } from './dto/payment.dto';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  async getPayments(@CurrentUser('userId') userId: string) {
    return this.paymentsService.getPaymentsByUser(userId);
  }

  @Get('maintenance/status')
  async getMaintenanceStatus(@CurrentUser('userId') userId: string) {
    return this.paymentsService.getMaintenanceStatus(userId);
  }

  @Post('collection')
  async createCollectionPayment(
    @CurrentUser('userId') userId: string,
    @Body() createDto: CreatePaymentDto,
  ) {
    return this.paymentsService.createCollectionPayment(userId, createDto);
  }

  @Post('maintenance')
  async createMaintenancePayment(
    @CurrentUser('userId') userId: string,
    @Body() createDto: CreateMaintenancePaymentDto,
  ) {
    return this.paymentsService.createMaintenancePayment(userId, createDto);
  }

  @Put(':id/proof')
  async uploadProof(
    @CurrentUser('userId') userId: string,
    @Param('id') paymentId: string,
    @Body() uploadDto: UploadProofDto,
  ) {
    return this.paymentsService.uploadProof(userId, paymentId, uploadDto.proofUrl);
  }
}
