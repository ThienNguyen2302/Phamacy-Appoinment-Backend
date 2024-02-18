import { Module } from '@nestjs/common';
import { MyLoggerModule } from '../../common/services/logger/logger.module';
import { PostgresModule } from '../../common/services/postgres/postgres.module';
import { UserRepository } from './user.repository.service';

@Module({
  imports: [PostgresModule, MyLoggerModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserRepositoryModule {}
