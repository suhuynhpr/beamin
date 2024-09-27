import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateOrderDto) {
    return 'create';
    // return this.prisma.order.create({
    //   data: { ...data, userId: Number(data.userId) }, // Ensure userId is a number
    // });
  }

  async findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({ where: { id } });
  }

  async update(id: number, data: CreateOrderDto) {
    return 'update';
    // return this.prisma.order.update({
    //   where: { id },
    //   data,
    // });
  }

  async remove(id: number) {
    return this.prisma.order.delete({ where: { id } });
  }
}
