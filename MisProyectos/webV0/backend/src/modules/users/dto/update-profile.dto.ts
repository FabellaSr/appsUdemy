import { IsString, IsOptional, IsUrl, IsObject, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  businessName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  occupation?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  phone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  address?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  city?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  state?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  country?: string;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsObject()
  @IsOptional()
  socialLinks?: Record<string, string>;
}
