import { IsString, IsEmail, IsOptional, MaxLength } from 'class-validator';

export class CreateContactMessageDto {
  @IsString()
  userProfileId: string;

  @IsString()
  @MaxLength(255)
  senderName: string;

  @IsEmail()
  senderEmail: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  senderPhone?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  subject?: string;

  @IsString()
  @MaxLength(2000)
  message: string;
}
