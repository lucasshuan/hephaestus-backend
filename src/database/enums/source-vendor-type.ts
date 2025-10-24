import { enumToPgEnum } from '@/common/helpers';
import { pgEnum } from 'drizzle-orm/pg-core';

export enum SourceVendorType {
  RETAILER = 'retailer',
  MARKETPLACE = 'marketplace',
  MANUFACTURER = 'manufacturer',
  DISTRIBUTOR = 'distributor',
  AGGREGATOR = 'aggregator',
}

export const vendorTypes = pgEnum(
  'source_vendor_types',
  enumToPgEnum(SourceVendorType),
);
