import { Controller } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ApiCookieAuth } from '@nestjs/swagger';

@ApiCookieAuth('session')
@Controller('listings')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  async findAll() {
    return this.listingService.findAll();
  }
}
