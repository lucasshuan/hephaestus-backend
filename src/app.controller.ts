import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiOperation({
    summary: 'Health check',
    description: 'Returns OK if the application is running normally.',
  })
  @Get('health')
  getHealth() {
    return { status: 'OK' };
  }
}
