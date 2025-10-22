import { Controller } from '@nestjs/common';
import { ComponentService } from './component.service';

@Controller('component')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}
}
