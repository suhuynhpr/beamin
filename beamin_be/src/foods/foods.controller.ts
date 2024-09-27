import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FoodsService } from './foods.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FoodEntity } from './entities/food.entity';
import { UpdateFoodDto } from './dto/update-food.dto';
import { CreateFoodDto } from './dto/create-food.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CustomError } from 'src/common/custom-error';
@Controller('foods')
@ApiTags('Foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all foods with pagination and search' })
  @ApiResponse({ status: 200, type: [FoodEntity] })
  @ApiQuery({ name: 'search', required: false, type: String })
  async getAllFoods(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ): Promise<{ success: boolean; data: FoodEntity[]; total: number }> {
    const { foods, total } = await this.foodsService.getAllFoods(
      page,
      limit,
      search,
    );
    return {
      success: true,
      data: foods.map((food) => new FoodEntity(food)),
      total,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get food by ID' })
  @ApiResponse({ status: 200, type: FoodEntity })
  async getFoodById(
    @Param('id') id: string,
  ): Promise<{ success: boolean; data: FoodEntity }> {
    const food = await this.foodsService.getFoodById(parseInt(id));
    return {
      success: true,
      data: new FoodEntity(food),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new food' })
  @ApiResponse({ status: 201, type: FoodEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createFood(
    @Body() createFoodDto: CreateFoodDto,
  ): Promise<{ success: boolean; data: FoodEntity }> {
    // Check if the food already exists
    const existingFood = await this.foodsService.getFoodByName(
      createFoodDto.name,
    );

    if (existingFood) {
      throw new CustomError('Food already exists', HttpStatus.BAD_REQUEST);
    }
    const food = await this.foodsService.createFood(createFoodDto);
    return {
      success: true,
      data: new FoodEntity(food),
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update food by ID' })
  @ApiResponse({ status: 200, type: FoodEntity })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateFood(
    @Param('id') id: string,
    @Body() updateFoodDto: UpdateFoodDto,
  ): Promise<{ success: boolean; data: FoodEntity }> {
    const food = await this.foodsService.getFoodById(parseInt(id));
    if (!food) {
      throw new CustomError('Food not found', HttpStatus.NOT_FOUND);
    }
    const updatedFood = await this.foodsService.updateFood(
      parseInt(id),
      updateFoodDto,
    );

    return {
      success: true,
      data: new FoodEntity(updatedFood),
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete food by ID' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: FoodEntity })
  async deleteFood(
    @Param('id') id: string,
  ): Promise<{ success: boolean; data: FoodEntity }> {
    const food = await this.foodsService.getFoodById(parseInt(id));
    if (!food) {
      throw new CustomError('Food not found', HttpStatus.NOT_FOUND);
    }
    const deletedFood = await this.foodsService.deleteFood(id);
    return {
      success: true,
      data: new FoodEntity(deletedFood),
    };
  }
}
