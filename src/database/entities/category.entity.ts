import {
  pgTable,
  text,
  varchar,
  uniqueIndex,
  foreignKey,
  timestamp,
} from 'drizzle-orm/pg-core';

export const categories = pgTable(
  'categories',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: varchar('name', { length: 120 }).notNull(),
    parentCategoryId: text('parent_category_id'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),
  },
  (t) => [
    uniqueIndex('uq_category_name').on(t.name),
    foreignKey({
      name: 'fk_category_parent',
      columns: [t.parentCategoryId],
      foreignColumns: [t.id],
    }).onDelete('set null'),
  ],
).enableRLS();

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
