import { pgTable, text, uniqueIndex, foreignKey } from 'drizzle-orm/pg-core';
import { components } from './component.entity';
import { features } from './feature.entity';

export const componentFeatures = pgTable(
  'component_features',
  {
    componentId: text('component_id').notNull(),
    featureId: text('feature_id').notNull(),
    valueText: text('value_text').notNull(),
  },
  (t) => [
    uniqueIndex('uq_comp_feature').on(t.componentId, t.featureId),
    foreignKey({
      name: 'fk_component_feature_component',
      columns: [t.componentId],
      foreignColumns: [components.id],
    }).onDelete('cascade'),
    foreignKey({
      name: 'fk_component_feature_feature',
      columns: [t.featureId],
      foreignColumns: [features.id],
    }).onDelete('cascade'),
  ],
);

export type ComponentFeature = typeof componentFeatures.$inferSelect;
export type NewComponentFeature = typeof componentFeatures.$inferInsert;
