import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsRepositoryModule } from '../../repositories/appointments/appointments.repository.module';
import { MyLoggerModule } from '../../common/services/logger/logger.module';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [AppointmentsRepositoryModule, MyLoggerModule],
})
export class AppointmentsModule {}
