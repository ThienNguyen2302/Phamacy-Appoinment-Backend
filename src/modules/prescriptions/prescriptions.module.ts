import { Module } from '@nestjs/common';
import { MyLoggerModule } from '../../common/services/logger/logger.module';
import { PrescriptionsRepositoryModule } from '../../repositories/prescriptions/prescriptions.repository.module';
import { PrescriptionsController } from './prescriptions.controller';
import { PrescriptionsService } from './prescriptions.service';
import { AppointmentsRepositoryModule } from '../../repositories/appointments/appointments.repository.module';

@Module({
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],
  imports: [PrescriptionsRepositoryModule, MyLoggerModule, AppointmentsRepositoryModule],
})
export class PrescriptionsModule {}
