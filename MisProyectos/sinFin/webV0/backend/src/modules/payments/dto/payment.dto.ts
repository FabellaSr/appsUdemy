import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  collectionId: string;

  @IsString()
  @IsOptional()
  reference?: string;

  @IsUrl()
  @IsOptional()
  proofUrl?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateMaintenancePaymentDto {
  @IsString()
  @IsOptional()
  reference?: string;

  @IsUrl()
  @IsOptional()
  proofUrl?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UploadProofDto {
  @IsUrl()
  proofUrl: string;
}
