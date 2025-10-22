import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll() {
    return await this.categoryRepository.selectAll();
  }

  async create(input: CreateCategoryDto) {
    return await this.categoryRepository.insert(input);
  }

  async update(id: string, input: UpdateCategoryDto) {
    return await this.categoryRepository.update(id, input);
  }
}
