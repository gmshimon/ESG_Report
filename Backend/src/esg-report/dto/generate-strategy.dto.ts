import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GenerateStrategyDto {
  @IsString()
  company_name!: string;

  @Type(() => Number)
  @IsNumber()
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
