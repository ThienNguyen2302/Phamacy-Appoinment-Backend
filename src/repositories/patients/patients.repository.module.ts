import { Module } from '@nestjs/common';
import { MyLoggerModule } from '../../common/services/logger/logger.module';
import { PostgresModule } from '../../common/services/postgres/postgres.module';
import { PatientsRepository } from './patients.repository.service';

@Module({
  imports: [PostgresModule, MyLoggerModule],
  providers: [PatientsRepository],
  exports: [PatientsRepository],
})
export class RepositoryRepositoryModule {}
