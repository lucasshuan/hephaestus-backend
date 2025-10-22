import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCookieAuth, ApiOperation } from '@nestjs/swagger';

@ApiCookieAuth('session')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'List users',
    description: 'Get all users.',
  })
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }
}
