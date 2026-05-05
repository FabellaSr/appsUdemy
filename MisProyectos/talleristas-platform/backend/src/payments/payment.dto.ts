import { IsEnum, IsIn, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsUUID() providerId: string;
  @IsNumber() @Min(0) amount: number;
  @IsOptional() @IsString() currency?: string;
  @IsOptional() @IsString() concept?: string;
  @IsOptional() @IsIn(['pending', 'paid', 'cancelled']) status?: 'pending' | 'paid' | 'cancelled';
}

export class UpdatePaymentDto {
  @IsOptional() @IsIn(['pending', 'paid', 'cancelled']) status?: 'pending' | 'paid' | 'cancelled';
  @IsOptional() @IsString() concept?: string;
}
