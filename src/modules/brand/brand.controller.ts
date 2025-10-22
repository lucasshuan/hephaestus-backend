import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BrandService } from './brand.service';
import { NewBrand } from '@/database/entities/brand.entity';
import { CreateBrandDto } from './dtos/create-brand.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({
    summary: 'List brands',
    description: 'Get all brands',
  })
  @Get()
  async findAll() {
    return await this.brandService.findAll();
  }

  @ApiOperation({
    summary: 'Create brand',
    description: 'Create a new brand',
  })
  @Post()
  async create(brandDto: CreateBrandDto) {
    return await this.brandService.create(brandDto);
  }

  @ApiOperation({
    summary: 'Update brand',
    description: 'Update a brand by id',
  })
  @ApiParam({ name: 'id', type: String, description: 'Brand id' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() brandDto: Partial<NewBrand>) {
    return await this.brandService.update(id, brandDto);
  }
}
