import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';
import { SourceVendorType, vendorTypes } from '../enums/source-vendor-type';
import { SourceTrustLevel, trustLevels } from '../enums/source-trust-level';

export const sources = pgTable(
  'source',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar('name', { length: 160 }).notNull(),
    domain: varchar('domain', { length: 200 }),
    country: varchar('country', { length: 2 }),
    vendorType: vendorTypes('vendor_type')
      .default(SourceVendorType.RETAILER)
      .notNull(),
    trustLevel: trustLevels('trust_level')
      .default(SourceTrustLevel.UNVERIFIED)
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  },
  (t) => [uniqueIndex('uq_source_name').on(t.name)],
).enableRLS();

export type Source = typeof sources.$inferSelect;
export type NewSource = typeof sources.$inferInsert;
