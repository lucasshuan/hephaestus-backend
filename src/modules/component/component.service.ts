import { Injectable } from '@nestjs/common';
import { ComponentRepository } from './component.repository';
import { UpdateComponentDto } from './dtos/update-component.dto';
import { CreateComponentDto } from './dtos/create-component.dto';

@Injectable()
export class ComponentService {
  constructor(private readonly componentRepository: ComponentRepository) {}

  async findAll() {
    return await this.componentRepository.selectAll();
  }

  async create(componentDto: CreateComponentDto) {
    return await this.componentRepository.insert(componentDto);
  }

  async update(id: string, componentDto: UpdateComponentDto) {
    return await this.componentRepository.update(id, componentDto);
  }
}
