import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEsgReportDto {
  @IsString()
  company_name!: string;

  @Type(() => Number)
  @IsInt()
  reporting_year!: number;

  @Type(() => Number)
  @IsNumber()
  scope1_tco2e!: number;

  @Type(() => Number)
  @IsNumber()
  scope2_tco2e!: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  scope3_tco2e?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  energy_consumption_kwh?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
