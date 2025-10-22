import 'dotenv/config';
import { Config } from 'drizzle-kit';

export default {
  schema: ['./src/database/entities', './src/database/enums'],
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
