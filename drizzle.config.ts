import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: ['./drizzle/schema', './drizzle/enum'],
  out: './drizzle',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
