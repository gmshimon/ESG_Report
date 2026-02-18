/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EsgReportService } from './esg-report.service';
import { CreateEsgReportDto } from './dto/create-esg-report.dto';
import { SelectStrategyVariantDto } from './dto/select-strategy-variant.dto';

@Controller('esg-reports')
export class EsgReportController {
  constructor(private readonly esgReportService: EsgReportService) {}

  @Post()
  create(@Body() dto: CreateEsgReportDto) {
    return this.esgReportService.create(dto);
  }

  @Get()
  findAll() {
    return this.esgReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.esgReportService.findOne(id);
  }

  @Post(':id/strategies')
  generateStrategies(@Param('id') id: string) {
    return this.esgReportService.generateStrategy(id);
  }

  @Put(':id/selection')
  selectStrategy(
    @Param('id') id: string,
    @Body() body: SelectStrategyVariantDto,
  ) {
    return this.esgReportService.selectVariant(id, body);
  }
}
