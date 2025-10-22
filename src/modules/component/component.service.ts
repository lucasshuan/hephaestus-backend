import { Injectable } from '@nestjs/common';
import { ComponentRepository } from './component.repository';

@Injectable()
export class ComponentService {
  constructor(private readonly componentRepository: ComponentRepository) {}
}
