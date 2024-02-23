import { Module } from '@nestjs/common';
import { MyLoggerModule } from '../../common/services/logger/logger.module';
import { PostgresModule } from '../../common/services/postgres/postgres.module';
import { DoctorRepository } from './doctor.repository.service';

@Module({
  imports: [PostgresModule, MyLoggerModule],
  providers: [DoctorRepository],
  exports: [DoctorRepository],
})
export class DoctorRepositoryModule {}
