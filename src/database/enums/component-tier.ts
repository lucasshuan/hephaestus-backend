import { enumToPgEnum } from '@/common/helpers';
import { pgEnum } from 'drizzle-orm/pg-core';

export enum ComponentTier {
  BUDGET = 'budget',
  ENTRY = 'entry',
  MID = 'mid',
  HIGH = 'high',
  ENTHUSIAST = 'enthusiast',
}

export const componentTiers = pgEnum(
  'component_tiers',
  enumToPgEnum(ComponentTier),
);
