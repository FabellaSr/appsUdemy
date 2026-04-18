import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProviderDto {
  @IsEmail() email: string;
  @IsString() @MinLength(6) password: string;
  @IsString() @MaxLength(255) fullName: string;
  @IsOptional() @IsString() @MaxLength(255) trade?: string;
  @IsOptional() @IsString() bio?: string;
  @IsOptional() @IsString() @MaxLength(50) phone?: string;
  @IsOptional() @IsString() @MaxLength(255) city?: string;
}

export class UpdateProviderDto {
  @IsOptional() @IsString() @MaxLength(255) fullName?: string;
  @IsOptional() @IsString() @MaxLength(255) trade?: string;
  @IsOptional() @IsString() bio?: string;
  @IsOptional() @IsString() @MaxLength(50) phone?: string;
  @IsOptional() @IsString() @MaxLength(255) city?: string;
  @IsOptional() @IsString() avatarUrl?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
