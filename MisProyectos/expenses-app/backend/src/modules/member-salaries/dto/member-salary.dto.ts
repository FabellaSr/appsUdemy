import { IsUUID, IsInt, IsPositive, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class MemberSalaryDto {
  @IsUUID()
  userId!: string;

  @IsInt()
  @Min(2000)
  @Max(2100)
  @Type(() => Number)
  year!: number;

  @IsInt()
  @Min(1)
  @Max(12)
  @Type(() => Number)
  month!: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  salary!: number;
}