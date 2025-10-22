import {
  pgTable,
  text,
  boolean,
  timestamp,
  varchar,
  uniqueIndex,
  index,
  foreignKey,
} from 'drizzle-orm/pg-core';
import { components } from './component.entity';
import { sources } from './source.entity';

export const listings = pgTable(
  'listings',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    componentId: text('component_id').notNull(),
    sourceId: text('source_id').notNull(),
    url: varchar('url', { length: 2048 }).notNull(),
    available: boolean('available').default(true).notNull(),
    currency: varchar('currency', { length: 3 }).default('BRL').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  },
  (t) => [
    uniqueIndex('uq_listing_source_component').on(t.sourceId, t.componentId),
    index('idx_listing_component').on(t.componentId),
    index('idx_listing_source').on(t.sourceId),
    foreignKey({
      name: 'fk_listing_component',
      columns: [t.componentId],
      foreignColumns: [components.id],
    }).onDelete('cascade'),
    foreignKey({
      name: 'fk_listing_source',
      columns: [t.sourceId],
      foreignColumns: [sources.id],
    }).onDelete('cascade'),
  ],
);

export type Listing = typeof listings.$inferSelect;
export type NewListing = typeof listings.$inferInsert;
