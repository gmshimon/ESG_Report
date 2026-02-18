import { Module } from '@nestjs/common';
import { EsgReportService } from './esg-report.service';
import { EsgReportController } from './esg-report.controller';

@Module({
  controllers: [EsgReportController],
  providers: [EsgReportService],
})
export class EsgReportModule {}
