import { Module } from '@nestjs/common';
import { MyLoggerModule } from '../../common/services/logger/logger.module';
import { CloudinaryModule } from '../../common/services/upload-cloud/cloudinary.module';
import { DoctorRepositoryModule } from '../../repositories/doctor/doctor.repository.module';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService],
  imports: [DoctorRepositoryModule, MyLoggerModule, CloudinaryModule],
})
export class DoctorModule {}
