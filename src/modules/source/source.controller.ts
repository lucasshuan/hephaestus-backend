import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SourceService } from './source.service';
import { ApiCookieAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { SessionGuard } from '../auth/guards/session.guard';
import { UpdateSourceDto } from './dtos/update-source.dto';
import { CreateSourceDto } from './dtos/create-source.dto';

@ApiCookieAuth('session')
@Controller('sources')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @ApiOperation({
    summary: 'List sources',
    description: 'Get all sources',
  })
  @Get()
  async findAll() {
    return await this.sourceService.findAll();
  }

  @ApiOperation({
    summary: 'Create source',
    description: 'Create a new source',
  })
  @Post()
  @UseGuards(SessionGuard)
  async create(@Body() sourceDto: CreateSourceDto) {
    return await this.sourceService.create(sourceDto);
  }

  @ApiOperation({
    summary: 'Update source',
    description: 'Update a source by id',
  })
  @ApiParam({ name: 'id', type: String, description: 'Source id' })
  @Put(':id')
  @UseGuards(SessionGuard)
  async update(@Param('id') id: string, @Body() sourceDto: UpdateSourceDto) {
    return await this.sourceService.update(id, sourceDto);
  }
}
