import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ categories: CategoryEntity[]; total: number }> {
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

    const [categories, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        skip,
        take: limit * 1,
        where,
      }),
      this.prisma.category.count({ where }),
    ]);

    return { categories, total };
  }

  async findOne(id: number): Promise<CategoryEntity> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async create(data: CreateCategoryDto): Promise<CategoryEntity> {
    return this.prisma.category.create({ data });
  }

  async update(id: number, data: UpdateCategoryDto): Promise<CategoryEntity> {
    return this.prisma.category.update({ where: { id }, data });
  }

  async delete(id: number): Promise<CategoryEntity> {
    return this.prisma.category.delete({ where: { id } });
  }
}
