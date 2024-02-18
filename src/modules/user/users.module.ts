import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { MyLoggerModule } from '../../common/services/logger/logger.module';
import { UserRepositoryModule } from '../../repositories/user/user.repository.module';

@Module({
  imports: [MyLoggerModule, UserRepositoryModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
