/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEsgReportDto } from './dto/create-esg-report.dto';
import { SelectStrategyVariantDto } from './dto/select-strategy-variant.dto';

@Injectable()
export class EsgReportService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    dto,
    organizationId,
  }: {
    dto: CreateEsgReportDto;
    organizationId: string;
  }) {
    return await this.prisma.eSGRecord.create({
      data: { ...dto, organizationId },
    });
  }

  async findAll(organizationId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [records, total] = await this.prisma.$transaction([
      this.prisma.eSGRecord.findMany({
        where: { organizationId },
        skip,
        take: limit,
        select: {
          id: true,
          reportingYear: true,
          scope1: true,
          scope2: true,
          scope3: true,
          energyKwh: true,
          notes: true,
          createdAt: true,
          organization: {
            select: {
              name: true,
            },
          },
          strategies: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.eSGRecord.count({ where: { organizationId } }),
    ]);

    return {
      data: records,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
        limit,
      },
    };
  }

  async findOne(id: string) {
    const report = await this.prisma.eSGRecord.findUnique({ where: { id } });
    if (!report) {
      throw new NotFoundException('ESG report not found');
    }
    return report;
  }

  /**
   * Mock strategy generation: deterministic canned texts that reference inputs.
   */
  generateStrategy(id: string) {
    //     const report = await this.findOne(id);
    //     const { companyName, reportingYear, scope1Tco2e, scope2Tco2e } = report;

    //     const short = `${companyName} plans to cut direct (Scope 1) emissions of ${scope1Tco2e} tCO2e and purchased power (Scope 2) of ${scope2Tco2e} tCO2e in ${reportingYear} by tightening energy controls and expanding renewables.`;

    //     const neutral = `${companyName} will target its ${scope1Tco2e} tCO2e Scope 1 footprint through fleet efficiency and leak detection, while reducing ${scope2Tco2e} tCO2e Scope 2 emissions via green tariffs and onsite solar. Progress will be reviewed quarterly in ${reportingYear} with supplier engagement and staff training.`;

    //     const detailed = `Strategy for ${companyName} (${reportingYear}):
    // - Scope 1 (${scope1Tco2e} tCO2e): implement telematics for fleet, preventive maintenance, and rapid leak repair.
    // - Scope 2 (${scope2Tco2e} tCO2e): shift 50% load to renewable PPAs, add sub-metering, and phase LED retrofits.
    // - Governance: quarterly ESG steering review; publish KPIs; align incentives.
    // - Next 12 months: prioritize top 3 sites by energy use; negotiate REC/GO mix; pilot internal carbon price.`;

    //     return this.prisma.strategy.update({
    //       where: { id },
    //       data: {
    //         strategyShort: short,
    //         strategyNeutral: neutral,
    //         strategyDetailed: detailed,
    //         selectedVariant: null,
    //       },
    //     });
    return id;
  }

  async selectVariant(id: string, dto: SelectStrategyVariantDto) {
    // Ensure report exists
    await this.findOne(id);
    // return this.prisma.eSGRecord.update({
    //   where: { id },
    //   data: { selectedVariant: dto.variant },
    // });
    return { id, selectedVariant: dto.variant };
  }
}
