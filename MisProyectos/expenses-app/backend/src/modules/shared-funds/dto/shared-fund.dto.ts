import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class SharedFundDto {
  @IsNumber()
  @Type(() => Number)
  year: number;

  @IsNumber()
  @Type(() => Number)
  month: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  targetAmount: number;
}