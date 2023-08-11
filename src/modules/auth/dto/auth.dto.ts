import { ApiProperty, PickType } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: `User's username`,
    type: String,
  })
  username: string;
  @ApiProperty({
    description: `User's password`,
    type: String,
  })
  password: string;
}

export class UserSessionDto {
  @ApiProperty({
    description: `User's ID`,
    type: Number,
  })
  id: number;
  @ApiProperty({
    description: `User's username`,
    type: String,
  })
  username: string;
  @ApiProperty({
    description: `User's role`,
    type: String,
  })
  role: string;
}

export class SessionDto {
  @ApiProperty({
    description: `User session info`,
    type: UserSessionDto,
  })
  user: UserSessionDto;
  @ApiProperty({
    description: `Session token`,
    type: String,
  })
  token: string;
  @ApiProperty({
    description: `Refresh token`,
    type: String,
  })
  refreshToken: string;
}
