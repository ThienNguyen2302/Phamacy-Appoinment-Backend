import { Module } from '@nestjs/common';
import { MyLoggerModule } from '../../common/services/logger/logger.module';
import { UserRepositoryModule } from '../../repositories/user/user.repository.module';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';

@Module({
  imports: [MyLoggerModule, UserRepositoryModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
