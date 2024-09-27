// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Category, Food } from '@prisma/client';

export class FoodEntity implements Food {
  constructor(partial: Partial<FoodEntity>) {
    Object.assign(this, partial);
  }
  updatedAt: Date;
  categoryId: number;
  kind: string;
  address: string;

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
  category: Category;
}
