import { Controller, Get, Param, Query } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('talleristas')
  async getTalleristas(
    @Query('occupation') occupation?: string,
    @Query('city') city?: string,
    @Query('state') state?: string,
    @Query('search') search?: string,
  ) {
    return this.publicService.getTalleristas({ occupation, city, state, search });
  }

  @Get('talleristas/:id')
  async getTalleristaDetail(@Param('id') id: string) {
    return this.publicService.getTalleristaDetail(id);
  }

  @Get('collections/:id')
  async getCollectionDetail(@Param('id') id: string) {
    return this.publicService.getCollectionDetail(id);
  }

  @Get('filters/occupations')
  async getOccupations() {
    return this.publicService.getOccupations();
  }

  @Get('filters/locations')
  async getLocations() {
    return this.publicService.getLocations();
  }
}
