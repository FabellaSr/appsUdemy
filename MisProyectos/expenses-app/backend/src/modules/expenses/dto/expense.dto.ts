import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty()
  @IsDateString() date!: string;
  @ApiProperty()
  @IsString() categoryId!: string;
  @ApiProperty()
  @IsString() concept!: string;
  @ApiProperty()
  @Type(() => Number)
  @ApiProperty()
  @IsNumber()
  @ApiProperty()
  @Min(0)
  @ApiProperty()
  amount!: number;
  @ApiProperty()
  @IsOptional() @IsString() userId?: string;
}
