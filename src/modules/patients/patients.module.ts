import { Module } from '@nestjs/common';
import { MyLoggerModule } from '../../common/services/logger/logger.module';
import { CloudinaryModule } from '../../common/services/upload-cloud/cloudinary.module';
import { RepositoryRepositoryModule } from '../../repositories/patients/patients.repository.module';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  imports: [RepositoryRepositoryModule, MyLoggerModule, CloudinaryModule],
})
export class PatientsModule {}
