import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  foodId: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
