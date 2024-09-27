import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
@Injectable()
export class FoodsService {
  constructor(private prisma: PrismaService) { }

  async getAllFoods(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;
    const where = search
      ? {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
          { category: { name: { contains: search } } },
        ],
      }
      : {};

    const [foods, total] = await this.prisma.$transaction([
      this.prisma.food.findMany({
        skip,
        take: limit * 1,
        where,
      }),
      this.prisma.food.count({ where }),
    ]);

    return { foods, total };
  }

  async getFoodById(id: number) {
    return this.prisma.food.findUnique({ where: { id } });
  }

  async getFoodByName(name: string) {
    return this.prisma.food.findFirst({ where: { name } });
  }

  async createFood(data: CreateFoodDto) {
    return this.prisma.food.create({ data });
  }

  async updateFood(id: number, data: UpdateFoodDto) {
    return this.prisma.food.update({ where: { id }, data });
  }

  async deleteFood(id: string) {
    return this.prisma.food.delete({ where: { id: parseInt(id) } });
  }
}
