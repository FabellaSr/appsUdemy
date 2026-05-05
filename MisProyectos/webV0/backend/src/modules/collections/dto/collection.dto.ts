import { IsString, IsOptional, IsArray, ValidateNested, IsInt, Min, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCollectionDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateCollectionDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class ImageOrderDto {
  @IsString()
  imageId: string;

  @IsInt()
  @Min(0)
  order: number;
}

export class ReorderImagesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageOrderDto)
  imageOrders: ImageOrderDto[];
}
