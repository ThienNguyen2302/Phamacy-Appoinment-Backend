import { Module } from '@nestjs/common';
import { PostgresModule } from '../../common/services/postgres/postgres.module';
import { MyLoggerModule } from '../../common/services/logger/logger.module';
import { AppointmentsRepository } from './appointments.repository.service';

@Module({
  imports: [PostgresModule, MyLoggerModule],
  providers: [AppointmentsRepository],
  exports: [AppointmentsRepository],
})
export class AppointmentsRepositoryModule {}
