import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ComponentService } from './component.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { SessionGuard } from '../auth/guards/session.guard';
import { UpdateComponentDto } from './dtos/update-component.dto';
import { CreateComponentDto } from './dtos/create-component.dto';

@Controller('component')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @ApiOperation({
    summary: 'List components',
    description: 'Get all components',
  })
  @Get()
  async findAll() {
    return await this.componentService.findAll();
  }

  @ApiOperation({
    summary: 'Create component',
    description: 'Create a new component',
  })
  @Post()
  @UseGuards(SessionGuard)
  async create(@Body() componentDto: CreateComponentDto) {
    return await this.componentService.create(componentDto);
  }

  @ApiOperation({
    summary: 'Update component',
    description: 'Update a component by id',
  })
  @ApiParam({ name: 'id', type: String, description: 'Component id' })
  @Put(':id')
  @UseGuards(SessionGuard)
  async update(
    @Param('id') id: string,
    @Body() componentDto: UpdateComponentDto,
  ) {
    return await this.componentService.update(id, componentDto);
  }
}
