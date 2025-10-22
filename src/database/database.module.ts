import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { schema } from './schema';

@Module({
  imports: [
    DrizzlePGModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pg: {
          connection: 'pool',
          config: {
            connectionString: config.getOrThrow<string>('POSTGRES_URL'),
            ssl: {
              rejectUnauthorized: config.get<boolean>(
                'DB_SSL_REJECT_UNAUTHORIZED',
              ),
            },
            max: config.get<number>('DB_MAX_POOL'),
          },
        },
        config: { schema },
      }),
    }),
  ],
  exports: [DrizzlePGModule],
})
export class DatabaseModule {}
