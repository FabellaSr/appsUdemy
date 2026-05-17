import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class CategoryDto {
  @ApiProperty()
  @IsString() name!: string;
  @ApiProperty()
  @IsOptional() @IsString() color?: string;
}
