import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) { }

  async create(createOrderDto: CreateOrderDto) {
    const { userId, foodId, quantity } = createOrderDto;

    // Tìm món ăn
    const food = await this.prisma.food.findUnique({ where: { id: foodId } });
    if (!food) {
      throw new Error(`Món ăn ${foodId} không tồn tại`);
    }

    // Kiểm tra tồn kho
    if (food.stock < quantity) {
      throw new Error(`Số lượng món ăn ${foodId} không đủ`);
    }

    // Tính toán tổng giá
    const totalPrice = food.price ? quantity * food.price : 0;

    // Tạo đơn hàng
    const order = await this.prisma.order.create({
      data: {
        userId: userId,
        foodId: foodId,
        quantity: quantity,
        totalPrice: totalPrice,
      },
    });

    // Trừ tồn kho
    await this.prisma.food.update({
      where: { id: foodId },
      data: { stock: { decrement: quantity } },
    });

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const { status } = updateOrderDto;
    return await this.prisma.order.update({
      where: { id: id },
      data: { status: status },
    });
  }
}
