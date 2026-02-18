/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum } from 'class-validator';

export enum StrategyVariantDto {
  short = 'short',
  neutral = 'neutral',
  detailed = 'detailed',
}

export class SelectStrategyVariantDto {
  @IsEnum(StrategyVariantDto)
  variant!: StrategyVariantDto;
}
