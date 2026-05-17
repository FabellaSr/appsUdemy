import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/expense.dto';
import { JwtAuthGuard } from '../../middleware/jwt-auth.guard';
import { multerConfig } from '../../config/multer.config';

@ApiTags('expenses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private svc: ExpensesService) {}

  @Get()
  list(@Query('month') month?: string, @Query('year') year?: string, @Query('userId') userId?: string) {
    return this.svc.list({
      month: month ? Number(month) : undefined,
      year: year ? Number(year) : undefined,
      userId,
    });
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('receipt', multerConfig))
  create(@Body() dto: CreateExpenseDto, @UploadedFile() file: Express.Multer.File | undefined, @Req() req: any) {    
    const url = file ? `/uploads/${file.filename}` : undefined;
    return this.svc.create(dto, req.user.id, url);
  }

  @Patch(':id') update(@Param('id') id: string, @Body() dto: Partial<CreateExpenseDto>) { return this.svc.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.svc.remove(id); }
}
