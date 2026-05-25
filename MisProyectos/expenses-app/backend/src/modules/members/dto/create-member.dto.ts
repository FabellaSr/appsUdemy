import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {

  @ApiProperty()
  email!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({
    enum: ['ADMIN', 'MEMBER']
  })
  role!: 'ADMIN' | 'MEMBER';

  @ApiProperty()
  authId!: string;
}