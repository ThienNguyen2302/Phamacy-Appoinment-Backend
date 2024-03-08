import { Module } from '@nestjs/common';
import { MyLoggerModule } from '../../common/services/logger/logger.module';
import { PrescriptionTypesRepositoryModule } from '../../repositories/prescription_types/prescription_types.repository.module';
import { PrescriptionTypesController } from './prescription_types.controller';
import { PrescriptionTypesService } from './prescription_types.service';

@Module({
  controllers: [PrescriptionTypesController],
  providers: [PrescriptionTypesService],
  imports: [PrescriptionTypesRepositoryModule, MyLoggerModule],
})
export class PrescriptionTypesModule {}
