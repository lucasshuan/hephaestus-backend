import {
  pgTable,
  text,
  numeric,
  timestamp,
  foreignKey,
} from 'drizzle-orm/pg-core';
import { listings } from './listing.entity';

export const listingPrices = pgTable(
  'listing_prices',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    listingId: text('listing_id').notNull(),
    price: numeric('price', { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  },
  (t) => [
    foreignKey({
      name: 'fk_listing_price_listing',
      columns: [t.listingId],
      foreignColumns: [listings.id],
    }).onDelete('cascade'),
  ],
);

export type ListingPrice = typeof listingPrices.$inferSelect;
export type NewListingPrice = typeof listingPrices.$inferInsert;
