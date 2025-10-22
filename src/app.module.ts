import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { BrandModule } from './modules/brand/brand.module';
import { SourceModule } from './modules/source/source.module';
import { ListingModule } from './modules/listing/listing.module';
import { CategoryModule } from './modules/category/category.module';
import { ComponentModule } from './modules/component/component.module';

@Module({
  imports: [
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
