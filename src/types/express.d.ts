import { User } from '@/database/entities/user.entity';
import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    cookies?: Record<string, string>;
    user?: User;
  }
}
