import { ApiProperty } from '@nestjs/swagger';
import { Food } from '@prisma/client';

export class FoodEntity implements Food {
  constructor(partial: Partial<FoodEntity>) {
    Object.assign(this, partial);
  }

  categoryId: number;

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
