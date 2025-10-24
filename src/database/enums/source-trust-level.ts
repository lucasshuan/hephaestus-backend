import { enumToPgEnum } from '@/common/helpers';
import { pgEnum } from 'drizzle-orm/pg-core';

export enum SourceTrustLevel {
  OFFICIAL = 'official',
  VERIFIED = 'verified',
  COMMUNITY = 'community',
  UNVERIFIED = 'unverified',
}

export const trustLevels = pgEnum(
  'source_trust_levels',
  enumToPgEnum(SourceTrustLevel),
);
