import { IsString, IsOptional, IsNumber, IsBoolean, IsEnum, Min } from 'class-validator';
import { PricingType } from '@prisma/client';

export class UpdatePricingDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class CreatePricingDto {
  @IsEnum(PricingType)
  type: PricingType;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;
}

export class RejectDto {
  @IsString()
  reason: string;
}
