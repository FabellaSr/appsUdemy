import { Controller, Get } from '@nestjs/common';
import { PricingService } from './pricing.service';

@Controller('pricing')
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  @Get()
  async getActivePrices() {
    return this.pricingService.findActive();
  }

  @Get('collection')
  async getCollectionPrice() {
    return this.pricingService.getCollectionPrice();
  }

  @Get('maintenance')
  async getMaintenancePrice() {
    return this.pricingService.getMaintenancePrice();
  }
}
