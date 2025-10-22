import {
  pgTable,
  text,
  varchar,
  uniqueIndex,
  foreignKey,
  timestamp,
} from 'drizzle-orm/pg-core';
import { categories } from './category.entity';

export const features = pgTable(
  'features',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    categoryId: text('category_id').notNull(),
    name: varchar('name', { length: 120 }).notNull(),
    key: varchar('key', { length: 120 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  },
  (t) => [
    uniqueIndex('uq_feature_cat_key').on(t.categoryId, t.key),
    foreignKey({
      name: 'fk_feature_category',
      columns: [t.categoryId],
      foreignColumns: [categories.id],
    }).onDelete('cascade'),
  ],
).enableRLS();

export type Feature = typeof features.$inferSelect;
export type NewFeature = typeof features.$inferInsert;
