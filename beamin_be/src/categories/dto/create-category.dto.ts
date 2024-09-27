// src/users/dto/create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example:
      'https://cdn-icons-png.freepik.com/512/1404/1404945.png?ga=GA1.1.1183214101.1726492474',
  })
  @IsString()
  @IsNotEmpty()
  image: string;
}
