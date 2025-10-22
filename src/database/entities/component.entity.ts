import {
  pgTable,
  text,
  varchar,
  foreignKey,
  index,
  uniqueIndex,
  timestamp,
} from 'drizzle-orm/pg-core';
import { categories } from './category.entity';
import { brands } from './brand.entity';
import { ComponentTier, componentTiers } from '../enums/component_tier';

export const components = pgTable(
  'component',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar('name', { length: 180 }).notNull(),
    brandId: text('brand_id'),
    categoryId: text('category_id'),
    model: varchar('model', { length: 120 }),
    tier: componentTiers('tier').default(ComponentTier.ENTRY).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  },
  (t) => [
    uniqueIndex('uq_component_name').on(t.name),
    index('idx_component_brand').on(t.brandId),
    index('idx_component_category').on(t.categoryId),
    foreignKey({
      name: 'fk_component_brand',
      columns: [t.brandId],
      foreignColumns: [brands.id],
    }).onDelete('set null'),
    foreignKey({
      name: 'fk_component_category',
      columns: [t.categoryId],
      foreignColumns: [categories.id],
    }).onDelete('set null'),
  ],
).enableRLS();

export type Component = typeof components.$inferSelect;
export type NewComponent = typeof components.$inferInsert;
