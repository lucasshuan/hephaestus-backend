import { Injectable } from '@nestjs/common';
import { SourceRepository } from './source.repository';

@Injectable()
export class SourceService {
  constructor(private readonly sourceRepository: SourceRepository) {}
}
