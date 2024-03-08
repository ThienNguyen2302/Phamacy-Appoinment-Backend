import { Module } from '@nestjs/common';
import { MyLoggerModule } from '../../common/services/logger/logger.module';
import { PostgresModule } from '../../common/services/postgres/postgres.module';
import { PrescriptionsRepository } from './prescriptions.repository.service';

@Module({
  imports: [PostgresModule, MyLoggerModule],
  providers: [PrescriptionsRepository],
  exports: [PrescriptionsRepository],
})
export class PrescriptionsRepositoryModule {}
