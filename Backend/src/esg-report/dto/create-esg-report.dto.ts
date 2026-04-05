import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateEsgReportDto {
  @Type(() => Number)
  @IsInt()
  reportingYear!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  scope1!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  scope2!: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  scope3!: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  energyKwh?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
