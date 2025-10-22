import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
