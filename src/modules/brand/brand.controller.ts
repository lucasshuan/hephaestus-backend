import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dtos/create-brand.dto';
import { ApiCookieAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { SessionGuard } from '../auth/guards/session.guard';
import { UpdateBrandDto } from './dtos/update-brand.dto';

@ApiCookieAuth('session')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({
    summary: 'List brands',
    description: 'Get all brands.',
  })
  @Get()
  async findAll() {
    return await this.brandService.findAll();
  }

  @ApiOperation({
    summary: 'Create brand',
    description: 'Create a new brand.',
  })
  @Post()
  @UseGuards(SessionGuard)
  async create(@Body() brandDto: CreateBrandDto) {
    return await this.brandService.create(brandDto);
  }

  @ApiOperation({
    summary: 'Update brand',
    description: 'Update a brand by id.',
  })
  @ApiParam({ name: 'id', type: String, description: 'Brand id' })
  @Put(':id')
  @UseGuards(SessionGuard)
  async update(@Param('id') id: string, @Body() brandDto: UpdateBrandDto) {
    return await this.brandService.update(id, brandDto);
  }
}
