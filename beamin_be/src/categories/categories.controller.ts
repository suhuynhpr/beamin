import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CustomError } from 'src/common/custom-error';

@Controller('category')
@ApiTags('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: [CategoryEntity] })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ): Promise<{ success: boolean; data: CategoryEntity[]; total: number }> {
    const { categories, total } = await this.categoriesService.findAll(
      page,
      limit,
      search,
    );
    return {
      success: true,
      data: categories.map((category) => new CategoryEntity(category)),
      total,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiResponse({ status: 200, type: CategoryEntity })
  async findOne(
    @Param('id') id: string,
  ): Promise<{ success: boolean; data: CategoryEntity }> {
    const category = await this.categoriesService.findOne(parseInt(id));
    return {
      success: true,
      data: new CategoryEntity(category),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, type: CategoryEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() data: CreateCategoryDto,
  ): Promise<{ success: boolean; data: CategoryEntity }> {
    const category = await this.categoriesService.create(data);
    return {
      success: true,
      data: new CategoryEntity(category),
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiResponse({ status: 200, type: CategoryEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto,
  ): Promise<{ success: boolean; data: CategoryEntity }> {
    const category = await this.categoriesService.findOne(parseInt(id));
    if (!category) {
      throw new CustomError('Category not found', HttpStatus.NOT_FOUND);
    }
    const deleteCategory = await this.categoriesService.update(
      parseInt(id),
      data,
    );
    return {
      success: true,
      data: new CategoryEntity(deleteCategory),
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiResponse({ status: 200, type: CategoryEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async delete(
    @Param('id') id: string,
  ): Promise<{ success: boolean; data: CategoryEntity }> {
    const category = await this.categoriesService.findOne(parseInt(id));
    if (!category) {
      throw new CustomError('Category not found', HttpStatus.NOT_FOUND);
    }
    const deleteCategory = await this.categoriesService.delete(parseInt(id));
    return {
      success: true,
      data: new CategoryEntity(deleteCategory),
    };
  }
}
