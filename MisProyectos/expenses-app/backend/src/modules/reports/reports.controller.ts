import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import * as ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../../middleware/jwt-auth.guard';

@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private svc: ReportsService) {}

  @Get('monthly')
  monthly(@Query('year') year: string, @Query('month') month: string) {
    return this.svc.monthly(Number(year), Number(month));
  }

  @Get('member')
  member(@Query('userId') userId: string, @Query('year') year: string, @Query('month') month: string) {
    return this.svc.member(userId, Number(year), Number(month));
  }

  @Get('export/excel')
  async excel(@Query('year') year: string, @Query('month') month: string, @Res() res: Response) {
    const data = await this.svc.monthly(Number(year), Number(month));
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Resumen');
    ws.addRow(['Categoría', 'Total', '%']);
    data.byCategory.forEach((c) => ws.addRow([c.categoryName, c.total, c.pct]));
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=report-${year}-${month}.xlsx`);
    await wb.xlsx.write(res);
    res.end();
  }

  @Get('export/pdf')
  async pdf(@Query('year') year: string, @Query('month') month: string, @Res() res: Response) {
    const data = await this.svc.monthly(Number(year), Number(month));
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=report-${year}-${month}.pdf`);
    doc.pipe(res);
    doc.fontSize(18).text(`Reporte ${month}/${year}`);
    doc.moveDown();
    doc.fontSize(12).text(`Total: $${data.totalAmount}`);
    doc.moveDown();
    data.byCategory.forEach((c) => doc.text(`${c.categoryName}: $${c.total} (${c.pct}%)`));
    doc.end();
  }
}
