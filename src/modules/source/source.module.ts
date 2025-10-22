import { Module } from '@nestjs/common';
import { SourceService } from './source.service';
import { SourceController } from './source.controller';
import { DatabaseModule } from '@/database/database.module';
import { SourceRepository } from './source.repository';

@Module({
  imports: [DatabaseModule],
  providers: [SourceService, SourceRepository],
  controllers: [SourceController],
})
export class SourceModule {}
