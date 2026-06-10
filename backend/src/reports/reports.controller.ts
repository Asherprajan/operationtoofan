import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Get('track/:trackingId')
  findByTrackingId(@Param('trackingId') trackingId: string) {
    return this.reportsService.findByTrackingId(trackingId);
  }
}
