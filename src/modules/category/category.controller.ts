import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { SessionGuard } from '../auth/guards/session.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    summary: 'List categories',
    description: 'Get all categories',
  })
  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @ApiOperation({
    summary: 'Create category',
    description: 'Create a new category',
  })
  @Post()
  @UseGuards(SessionGuard)
  async create(@Body() categoryDto: CreateCategoryDto) {
    return await this.categoryService.create(categoryDto);
  }

  @ApiOperation({
    summary: 'Update brand',
    description: 'Update a brand by id',
  })
  @ApiParam({ name: 'id', type: String, description: 'Brand id' })
  @Put(':id')
  @UseGuards(SessionGuard)
  async update(
    @Param('id') id: string,
    @Body() categoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(id, categoryDto);
  }
}
