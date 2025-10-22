import { Controller, Get } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ApiCookieAuth, ApiOperation } from '@nestjs/swagger';

@ApiCookieAuth('session')
@Controller('listings')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @ApiOperation({
    summary: 'List listings',
    description: 'Get all listings.',
  })
  @Get()
  async findAll() {
    return this.listingService.findAll();
  }
}
