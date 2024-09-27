import { IsInt, IsNotEmpty, IsString } from 'class-validator';

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

  @IsInt()
  @IsNotEmpty()
  totalPrice: number;

  @IsString()
  @IsNotEmpty()
  status: string; // Use enum if you want to restrict to specific values
}
