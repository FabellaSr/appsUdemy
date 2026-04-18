import { IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateNotificationDto {
  @IsUUID() providerId: string;
  @IsString() @MaxLength(255) title: string;
  @IsString() message: string;
}
