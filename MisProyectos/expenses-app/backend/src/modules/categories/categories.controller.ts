import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { JwtAuthGuard } from '../../middleware/jwt-auth.guard';
import { RolesGuard } from '../../middleware/roles.guard';
import { Roles } from '../../middleware/roles.decorator';

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private svc: CategoriesService) {}
  @Get() list() { return this.svc.list(); }
  @Roles('ADMIN') @Post() create(@Body() dto: CategoryDto) { return this.svc.create(dto); }
  @Roles('ADMIN') @Patch(':id') update(@Param('id') id: string, @Body() dto: Partial<CategoryDto>) { return this.svc.update(id, dto); }
  @Roles('ADMIN') @Delete(':id') remove(@Param('id') id: string) { return this.svc.remove(id); }
}
