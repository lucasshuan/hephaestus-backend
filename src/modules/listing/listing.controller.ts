import { Controller } from '@nestjs/common';
import { ListingService } from './listing.service';

@Controller('listing')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}
}
