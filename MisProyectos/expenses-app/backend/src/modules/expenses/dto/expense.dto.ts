import { IsDateString, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsDateString() date!: string;
  @IsString() categoryId!: string;
  @IsString() concept!: string;
  @IsNumber() @Min(0) amount!: number;
  @IsOptional() @IsString() userId?: string;
}
