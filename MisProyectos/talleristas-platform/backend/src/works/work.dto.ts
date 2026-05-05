import { IsArray, IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateWorkDto {
  @IsString() @MaxLength(255) title: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() @MaxLength(100) category?: string;
  @IsOptional() @IsArray() photoUrls?: string[];
}

export class UpdateWorkDto {
  @IsOptional() @IsString() @MaxLength(255) title?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() @MaxLength(100) category?: string;
  @IsOptional() @IsBoolean() isPublished?: boolean;
  @IsOptional() @IsArray() photoUrls?: string[];
}
