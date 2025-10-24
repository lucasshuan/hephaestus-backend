import { UserModule } from './modules/user/user.module';
import { BrandModule } from './modules/brand/brand.module';
import { SourceModule } from './modules/source/source.module';
import { ListingModule } from './modules/listing/listing.module';
import { CategoryModule } from './modules/category/category.module';
import { ComponentModule } from './modules/component/component.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import Joi from 'joi';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('local', 'development', 'production')
          .default('local'),
        DATABASE_URL: Joi.string().uri().required(),
        API_BASE_URL: Joi.string().uri().required(),
        AFTER_LOGIN_REDIRECT_URL: Joi.string().uri().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        DB_SSL_REJECT_UNAUTHORIZED: Joi.boolean().default(false),
        DB_MAX_POOL: Joi.number().default(10),
      }),
    }),
    AuthModule,
    BrandModule,
    SourceModule,
    ListingModule,
    CategoryModule,
    ComponentModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
