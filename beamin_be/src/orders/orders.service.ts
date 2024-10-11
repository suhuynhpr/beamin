import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

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

  async deleteOrder(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) {
      throw new Error(`Đơn hàng ${orderId} không tồn tại`);
    }

    // Trả lại số lượng vào kho
    await this.prisma.food.update({
      where: { id: order.foodId },
      data: { stock: { increment: order.quantity } },
    });

    // Xóa đơn hàng
    await this.prisma.order.delete({ where: { id: orderId } });
  }

  async updateQuantity(orderId: number, newQuantity: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) {
      throw new Error(`Đơn hàng ${orderId} không tồn tại`);
    }

    const food = await this.prisma.food.findUnique({
      where: { id: order.foodId },
    });
    if (!food) {
      throw new Error(`Món ăn ${order.foodId} không tồn tại`);
    }

    // Kiểm tra tồn kho
    if (food.stock + order.quantity < newQuantity) {
      throw new Error(`Số lượng món ăn ${order.foodId} không đủ`);
    }

    // Cập nhật số lượng
    await this.prisma.order.update({
      where: { id: orderId },
      data: {
        quantity: newQuantity,
        totalPrice: food.price ? newQuantity * food.price : 0,
      },
    });

    // Cập nhật tồn kho
    await this.prisma.food.update({
      where: { id: order.foodId },
      data: {
        stock: {
          increment: order.quantity - newQuantity,
        },
      },
    });
  }
}
