import { Industry } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

class OrganizationDto {
  @IsString()
  name!: string;
  @IsString()
  slug!: string;
  @IsString()
  industry?: Industry;
  @IsString()
  country?: string;
  @IsString()
  website?: string;
  @IsString()
  description?: string;
}

export class SignupDto {
  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  confirmPassword!: string;

  @ValidateNested()
  @Type(() => OrganizationDto)
  organization!: OrganizationDto;
}
