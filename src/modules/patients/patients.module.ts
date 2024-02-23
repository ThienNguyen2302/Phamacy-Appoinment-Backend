import { Module } from '@nestjs/common';
import { MyLoggerModule } from '../../common/services/logger/logger.module';
import { CloudinaryModule } from '../../common/services/upload-cloud/cloudinary.module';
import { PatientsRepositoryModule } from '../../repositories/patients/patients.repository.module';
import { UserRepositoryModule } from '../../repositories/user/user.repository.module';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService],
  imports: [PatientsRepositoryModule, MyLoggerModule, CloudinaryModule, UserRepositoryModule],
})
export class PatientsModule {}
