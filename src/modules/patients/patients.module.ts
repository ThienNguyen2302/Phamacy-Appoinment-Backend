import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { RepositoryRepositoryModule } from '../../repositories/patients/patients.repository.module';
import { MyLoggerModule } from '../../common/services/logger/logger.module';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  imports: [RepositoryRepositoryModule, MyLoggerModule],
})
export class PatientsModule {}
