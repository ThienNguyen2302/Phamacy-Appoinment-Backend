import { Module } from '@nestjs/common';
import { MyLoggerModule } from '../../common/services/logger/logger.module';
import { PostgresModule } from '../../common/services/postgres/postgres.module';
import { PrescriptionTypesRepository } from './prescription_types.repository.service';

@Module({
  imports: [PostgresModule, MyLoggerModule],
  providers: [PrescriptionTypesRepository],
  exports: [PrescriptionTypesRepository],
})
export class PrescriptionTypesRepositoryModule {}
