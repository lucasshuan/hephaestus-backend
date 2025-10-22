import { Module } from '@nestjs/common';
import { ComponentController } from './component.controller';
import { ComponentService } from './component.service';
import { DatabaseModule } from '@/database/database.module';
import { ComponentRepository } from './component.repository';

@Module({
  imports: [DatabaseModule],
  providers: [ComponentService, ComponentRepository],
  controllers: [ComponentController],
})
export class ComponentModule {}
