/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Req,
  Res,
  Param,
  Post,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { EsgReportService } from './esg-report.service';
import { CreateEsgReportDto } from './dto/create-esg-report.dto';
import { SelectStrategyVariantDto } from './dto/select-strategy-variant.dto';
import { response, type Request, type Response } from 'express';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { User } from '@prisma/client';

@Controller('esg-reports')
export class EsgReportController {
  constructor(private readonly esgReportService: EsgReportService) {}

  @Post('/create')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Req() request: Request,
    @Res() response: Response,
    @Body() dto: CreateEsgReportDto,
  ) {
    try {
      const user = (request as Request & { user?: User }).user;

      const result = await this.esgReportService.create({
        dto,
        organizationId: user?.organizationId || 'default-org-id',
      });
      return response.status(200).json({
        success: true,
        data: result,
        message: 'ESG report created successfully',
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Error creating ESG report',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() request: Request, @Res() response: Response,@Query('page') page: string = '1',
  @Query('limit') limit: string = '10') {
    try {

      // Todo: Implement the redis caching layer
      // Todo: Implement the pagination and filtering logic in the service layer
      const user = (request as Request & { user?: User }).user;
      const result = await this.esgReportService.findAll(
        user?.organizationId || 'default-org-id',
        parseInt(page, 10),
        parseInt(limit, 10),
      );
      return response.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Error fetching ESG reports',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Req() request: Request, @Res() response: Response,@Param('id') id: string) {
    try {
       const user = (request as Request & { user?: User }).user;
      const result =  await this.esgReportService.findOne(id, user?.organizationId || 'default-org-id');
    return response.status(200).json({
      success: true,
      data: result,
    });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: 'Error fetching ESG report',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }

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
