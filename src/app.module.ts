import { UserModule } from './modules/user/user.module';
import { BrandModule } from './modules/brand/brand.module';
import { SourceModule } from './modules/source/source.module';
import { ListingModule } from './modules/listing/listing.module';
import { CategoryModule } from './modules/category/category.module';
import { ComponentModule } from './modules/component/component.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { schema } from './database/schema';
import { Module } from '@nestjs/common';
import Joi from 'joi';
import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'tst', 'prd').default('dev'),
        POSTGRES_URL: Joi.string().uri().required(),
        DB_SSL_REJECT_UNAUTHORIZED: Joi.boolean().default(false),
        DB_MAX_POOL: Joi.number().default(10),
      }),
    }),
    DrizzlePGModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pg: {
          connection: 'pool',
          config: {
            connectionString: config.get<string>('SUPABASE_DB_URL'),
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
    UserModule,
    BrandModule,
    SourceModule,
    ListingModule,
    CategoryModule,
    ComponentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
