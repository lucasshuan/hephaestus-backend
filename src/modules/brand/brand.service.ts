import { Injectable } from '@nestjs/common';
import { BrandRepository } from './brand.repository';
import { NewBrand } from '@/database/entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(private readonly brandRepository: BrandRepository) {}

  async findAll() {
    return await this.brandRepository.selectAll();
  }

  async create(input: NewBrand) {
    return await this.brandRepository.insert(input);
  }

  async update(id: string, input: Partial<NewBrand>) {
    return await this.brandRepository.update(id, input);
  }
}
