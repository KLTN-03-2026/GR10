import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('revenue-by-month')
  getRevenueByMonth(@Query('year') year: string) {
    return this.statisticsService.getRevenueByMonth(+year);
  }

  @Get('export-revenue-by-month')
  exportRevenueByMonth(@Query('year') year: string, @Res() res: Response) {
    return this.statisticsService.exportRevenueByMonth(+year, res);
  }

  @Get('export-revenue-detail')
  exportRevenueDetail(@Query('year') year: string, @Res() res: Response) {
    return this.statisticsService.exportRevenueByMonthDetail(+year, res);
  }
}
