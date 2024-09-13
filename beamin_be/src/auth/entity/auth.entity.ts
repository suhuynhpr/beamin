//src/auth/entity/auth.entity.ts

import { ApiProperty } from '@nestjs/swagger';

class AuthData {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  expires_in: number;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty()
  user_id: number;
}

export class AuthEntity {
  @ApiProperty()
  success: boolean;

  @ApiProperty({ type: AuthData })
  data: AuthData;
}
