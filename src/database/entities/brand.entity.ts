import {
  pgTable,
  text,
  uniqueIndex,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';

export const brands = pgTable(
  'brands',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar('name', { length: 120 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [uniqueIndex('uq_brand_name').on(t.name)],
).enableRLS();

export type Brand = typeof brands.$inferSelect;
export type NewBrand = typeof brands.$inferInsert;
