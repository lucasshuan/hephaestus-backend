import { enumToPgEnum } from '@/common/helpers';
import { pgEnum } from 'drizzle-orm/pg-core';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export const userRoles = pgEnum('user_roles', enumToPgEnum(UserRole));
