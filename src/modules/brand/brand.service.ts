import { Injectable } from '@nestjs/common';
import { BrandRepository } from './brand.repository';
import { CreateBrandDto } from './dtos/create-brand.dto';
import { UpdateBrandDto } from './dtos/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async findAll() {
    return await this.brandRepository.selectAll();
  }

  async create(input: CreateBrandDto) {
    return await this.brandRepository.insert(input);
  }

  async update(id: string, input: UpdateBrandDto) {
    return await this.brandRepository.update(id, input);
  }
}
