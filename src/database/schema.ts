import { features } from 'process';
import { accounts } from './entities/account.entity';
import { brands } from './entities/brand.entity';
import { categories } from './entities/category.entity';
import { components } from './entities/component.entity';
import { componentFeatures } from './entities/component_feature.entity';
import { listingPrices } from './entities/listing_price.entity';
import { listings } from './entities/listing.entity';
import { sessions } from './entities/session.entity';
import { sources } from './entities/source.entity';
import { users } from './entities/user.entity';
import { verifications } from './entities/verification.entity';
import { componentTiers } from './enums/component-tier';
import { userRoles } from './enums/user-role';

export const schema = {
  accounts,
  brands,
  categories,
  componentFeatures,
  components,
  features,
  listingPrices,
  listings,
  sessions,
  sources,
  users,
  verifications,
  componentTiers,
  userRoles,
};
