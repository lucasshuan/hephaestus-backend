import { Injectable } from '@nestjs/common';
import { SourceRepository } from './source.repository';
import { UpdateSourceDto } from './dtos/update-source.dto';
import { CreateSourceDto } from './dtos/create-source.dto';

@Injectable()
export class SourceService {
  constructor(private readonly sourceRepository: SourceRepository) {}

  async findAll() {
    return await this.sourceRepository.selectAll();
  }

  async create(sourceDto: CreateSourceDto) {
    return await this.sourceRepository.insert(sourceDto);
  }

  async update(id: string, sourceDto: UpdateSourceDto) {
    return await this.sourceRepository.update(id, sourceDto);
  }
}
